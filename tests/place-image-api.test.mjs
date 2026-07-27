import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";

import { handlePlaceImageRequest, matchPlaceCandidate } from "../worker/place-images.js";

class D1Statement {
  constructor(database, sql, values = []) {
    this.database = database;
    this.sql = sql;
    this.values = values;
  }

  bind(...values) {
    return new D1Statement(this.database, this.sql, values);
  }

  async first() {
    return this.database.prepare(this.sql).get(...this.values) || null;
  }

  async run() {
    return this.database.prepare(this.sql).run(...this.values);
  }
}

class TestD1 {
  constructor(database) {
    this.database = database;
  }

  prepare(sql) {
    return new D1Statement(this.database, sql);
  }

  async batch(statements) {
    const results = [];
    for (const statement of statements) results.push(await statement.run());
    return results;
  }
}

const place = {
  name: "Foster City Library",
  city: "Foster City",
  address: "1000 E Hillsdale Boulevard, Foster City, CA 94404",
  location: { lat: 37.5592, lng: -122.2712 },
};
const catalog = { "foster-city-library-family-place": place };
const googlePlaceId = "ChIJFosterCityLibrary123";

function testEnvironment(configured = true) {
  const database = new DatabaseSync(":memory:");
  return {
    env: {
      DB: new TestD1(database),
      ...(configured ? { GOOGLE_MAPS_API_KEY: "test-server-key" } : {}),
    },
    database,
  };
}

function googleCandidate() {
  return {
    id: googlePlaceId,
    displayName: { text: "Foster City Library" },
    formattedAddress: "1000 E Hillsdale Blvd, Foster City, CA 94404, USA",
    location: { latitude: 37.55919, longitude: -122.27121 },
  };
}

function photoFetcher(calls) {
  return async (input, options = {}) => {
    const url = new URL(String(input));
    calls.push({ url, options });
    if (url.pathname.endsWith("/places:searchText")) {
      return Response.json({ places: [googleCandidate()] });
    }
    if (url.pathname === `/v1/places/${googlePlaceId}`) {
      return Response.json({
        photos: [{
          name: `places/${googlePlaceId}/photos/photo-token`,
          widthPx: 1600,
          heightPx: 900,
          authorAttributions: [{
            displayName: "Local Guide",
            uri: "https://www.google.com/maps/contrib/123",
          }],
          googleMapsUri: "https://www.google.com/maps/place/?q=place_id:test",
          flagContentUri: "https://www.google.com/local/imagery/report/",
        }],
      });
    }
    if (url.pathname.endsWith("/media")) {
      return new Response(new Uint8Array([255, 216, 255, 217]), {
        headers: { "Content-Type": "image/jpeg" },
      });
    }
    throw new Error(`Unexpected Google request: ${url}`);
  };
}

test("place image endpoint remains safely disabled without a server key", async () => {
  const { env } = testEnvironment(false);
  const statusResponse = await handlePlaceImageRequest(
    new Request("https://little-weekends.test/api/place-image?mode=status"),
    env,
    catalog,
  );
  assert.deepEqual(await statusResponse.json(), { configured: false, providers: [] });

  const imageResponse = await handlePlaceImageRequest(
    new Request("https://little-weekends.test/api/place-image?id=foster-city-library-family-place"),
    env,
    catalog,
  );
  assert.deepEqual(await imageResponse.json(), { configured: false, image: null });
});

test("place matching rejects distant or unrelated candidates", () => {
  assert.equal(matchPlaceCandidate(place, [{
    ...googleCandidate(),
    displayName: { text: "Unrelated Restaurant" },
    formattedAddress: "2000 Other Street, Foster City, CA",
  }]), null);
  assert.equal(matchPlaceCandidate(place, [{
    ...googleCandidate(),
    displayName: { text: "Unrelated Restaurant" },
  }]), null);

  const match = matchPlaceCandidate(place, [googleCandidate()]);
  assert.equal(match.candidate.id, googlePlaceId);
  assert.ok(match.distance < 50);
  assert.equal(match.addressMatch, true);
});

test("Google Places photos are proxied while only the matched place ID is retained", async () => {
  const { env, database } = testEnvironment();
  const calls = [];
  const fetcher = photoFetcher(calls);
  const metadataResponse = await handlePlaceImageRequest(
    new Request("https://little-weekends.test/api/place-image?id=foster-city-library-family-place"),
    env,
    catalog,
    fetcher,
  );
  assert.equal(metadataResponse.status, 200);
  const metadata = await metadataResponse.json();
  assert.equal(metadata.source, "google_places");
  assert.equal(metadata.image.provider, "google_places");
  assert.match(metadata.image.src, /mode=place-photo/);
  assert.equal(metadata.image.creator, "Local Guide");

  const stored = database.prepare("SELECT * FROM place_image_sources").get();
  assert.equal(stored.google_place_id, googlePlaceId);
  assert.equal(stored.match_status, "matched");
  assert.equal(JSON.stringify(stored).includes("photo-token"), false);

  const imageResponse = await handlePlaceImageRequest(
    new Request(`https://little-weekends.test${metadata.image.src}`),
    env,
    catalog,
    fetcher,
  );
  assert.equal(imageResponse.status, 200);
  assert.equal(imageResponse.headers.get("content-type"), "image/jpeg");
  assert.equal(imageResponse.headers.get("cache-control"), "private, no-store");
  assert.deepEqual([...new Uint8Array(await imageResponse.arrayBuffer())], [255, 216, 255, 217]);
  assert.equal(calls.filter(({ url }) => url.pathname.endsWith("/places:searchText")).length, 1);
});

test("Street View becomes the fallback when a matched place has no Places photos", async () => {
  const { env } = testEnvironment();
  const fetcher = async (input) => {
    const url = new URL(String(input));
    if (url.pathname.endsWith("/places:searchText")) {
      return Response.json({ places: [googleCandidate()] });
    }
    if (url.pathname === `/v1/places/${googlePlaceId}`) {
      return Response.json({ photos: [] });
    }
    if (url.pathname.endsWith("/streetview/metadata")) {
      return Response.json({
        status: "OK",
        location: { lat: 37.55925, lng: -122.2713 },
        date: "2025-09",
        copyright: "© Google",
      });
    }
    throw new Error(`Unexpected Google request: ${url}`);
  };

  const response = await handlePlaceImageRequest(
    new Request("https://little-weekends.test/api/place-image?id=foster-city-library-family-place"),
    env,
    catalog,
    fetcher,
  );
  const payload = await response.json();
  assert.equal(payload.source, "streetview");
  assert.equal(payload.image.provider, "streetview");
  assert.match(payload.image.src, /mode=streetview&layout=card/);
  assert.equal(payload.image.capturedAt, "2025-09");
});
