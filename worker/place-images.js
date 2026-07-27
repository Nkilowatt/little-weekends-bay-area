const PLACE_ID_PATTERN = /^[A-Za-z0-9_-]{1,220}$/;
const GOOGLE_PLACE_ID_PATTERN = /^[A-Za-z0-9_-]{8,300}$/;
const MATCH_RETRY_MS = 30 * 24 * 60 * 60 * 1000;
const MAX_MATCH_DISTANCE_METERS = 1200;
const GOOGLE_HOST_PATTERN = /(^|\.)google(?:apis|usercontent)?\.com$/;

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex",
    },
  });
}

function safeText(value, maxLength = 300) {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function normalizedPlaceText(value) {
  return safeText(value, 500)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function meaningfulTokens(value) {
  const ignored = new Set(["the", "of", "and", "at", "city", "ca", "california", "family", "place"]);
  return new Set(normalizedPlaceText(value).split(" ").filter((token) => token.length > 1 && !ignored.has(token)));
}

function tokenSimilarity(left, right) {
  const leftTokens = meaningfulTokens(left);
  const rightTokens = meaningfulTokens(right);
  if (!leftTokens.size || !rightTokens.size) return 0;
  const overlap = [...leftTokens].filter((token) => rightTokens.has(token)).length;
  return overlap / Math.min(leftTokens.size, rightTokens.size);
}

function streetNumber(value) {
  return normalizedPlaceText(value).match(/^\d+[a-z]?/)?.[0] || "";
}

function distanceMeters(left, right) {
  const toRadians = (degrees) => degrees * Math.PI / 180;
  const latitudeDelta = toRadians(Number(right?.lat) - Number(left?.lat));
  const longitudeDelta = toRadians(Number(right?.lng) - Number(left?.lng));
  const leftLatitude = toRadians(Number(left?.lat));
  const rightLatitude = toRadians(Number(right?.lat));
  const haversine = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(leftLatitude) * Math.cos(rightLatitude) * Math.sin(longitudeDelta / 2) ** 2;
  return 6371000 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

export function matchPlaceCandidate(place, candidates) {
  if (!place?.location || !Array.isArray(candidates)) return null;
  const expectedStreetNumber = streetNumber(place.address);

  return candidates
    .map((candidate) => {
      if (!candidate?.id || !candidate.location) return null;
      const candidateLatitude = Number(candidate.location.latitude);
      const candidateLongitude = Number(candidate.location.longitude);
      if (!Number.isFinite(candidateLatitude) || !Number.isFinite(candidateLongitude)) return null;
      const distance = distanceMeters(place.location, {
        lat: candidateLatitude,
        lng: candidateLongitude,
      });
      const nameSimilarity = tokenSimilarity(place.name, candidate.displayName?.text);
      const candidateStreetNumber = streetNumber(candidate.formattedAddress);
      const addressMatch = Boolean(expectedStreetNumber && candidateStreetNumber === expectedStreetNumber);
      if (distance > MAX_MATCH_DISTANCE_METERS) return null;
      if (nameSimilarity < (addressMatch ? 0.34 : 0.5)) return null;
      return {
        candidate,
        distance,
        nameSimilarity,
        addressMatch,
        score: nameSimilarity * 100 + (addressMatch ? 55 : 0) - Math.min(distance, 1000) / 25,
      };
    })
    .filter(Boolean)
    .toSorted((left, right) => right.score - left.score)[0] || null;
}

function safeGoogleUrl(value) {
  try {
    const url = new URL(String(value || ""));
    return url.protocol === "https:" && GOOGLE_HOST_PATTERN.test(url.hostname.toLowerCase()) ? url.href : null;
  } catch {
    return null;
  }
}

function imageHeaders(contentType) {
  return {
    "Content-Type": contentType,
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "noindex",
  };
}

async function ensurePlaceImageSchema(db) {
  if (!db?.prepare) return;
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS place_image_sources (
      place_key TEXT PRIMARY KEY NOT NULL,
      google_place_id TEXT,
      match_status TEXT NOT NULL,
      matched_name TEXT,
      matched_address TEXT,
      matched_latitude REAL,
      matched_longitude REAL,
      distance_meters REAL,
      checked_at TEXT NOT NULL
    )`),
    db.prepare("CREATE INDEX IF NOT EXISTS place_image_sources_status_idx ON place_image_sources (match_status, checked_at)"),
  ]);
}

async function savedPlaceSource(db, placeKey) {
  if (!db?.prepare) return null;
  return db.prepare(`SELECT place_key, google_place_id, match_status, matched_name, matched_address,
      matched_latitude, matched_longitude, distance_meters, checked_at
    FROM place_image_sources WHERE place_key = ?`).bind(placeKey).first();
}

async function savePlaceSource(db, placeKey, source) {
  if (!db?.prepare) return;
  await db.prepare(`INSERT INTO place_image_sources (
      place_key, google_place_id, match_status, matched_name, matched_address,
      matched_latitude, matched_longitude, distance_meters, checked_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(place_key) DO UPDATE SET
      google_place_id = excluded.google_place_id,
      match_status = excluded.match_status,
      matched_name = excluded.matched_name,
      matched_address = excluded.matched_address,
      matched_latitude = excluded.matched_latitude,
      matched_longitude = excluded.matched_longitude,
      distance_meters = excluded.distance_meters,
      checked_at = excluded.checked_at`)
    .bind(
      placeKey,
      source.googlePlaceId || null,
      source.matchStatus,
      source.matchedName || null,
      source.matchedAddress || null,
      Number.isFinite(source.matchedLatitude) ? source.matchedLatitude : null,
      Number.isFinite(source.matchedLongitude) ? source.matchedLongitude : null,
      Number.isFinite(source.distanceMeters) ? source.distanceMeters : null,
      source.checkedAt,
    )
    .run();
}

async function googleJson(fetcher, url, options) {
  const response = await fetcher(url, options);
  if (!response.ok) throw new Error(`GOOGLE_${response.status}`);
  return response.json();
}

async function searchGooglePlace(place, apiKey, fetcher) {
  const payload = {
    textQuery: `${place.name}, ${place.address || `${place.city}, California`}`,
    maxResultCount: 5,
    languageCode: "en",
    regionCode: "US",
    locationBias: {
      circle: {
        center: {
          latitude: place.location.lat,
          longitude: place.location.lng,
        },
        radius: 1500,
      },
    },
  };
  const response = await googleJson(fetcher, "https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.location",
    },
    body: JSON.stringify(payload),
  });
  return matchPlaceCandidate(place, response.places || []);
}

async function resolveGooglePlaceId(placeKey, place, env, fetcher) {
  await ensurePlaceImageSchema(env.DB);
  const saved = await savedPlaceSource(env.DB, placeKey);
  if (saved?.match_status === "matched" && GOOGLE_PLACE_ID_PATTERN.test(saved.google_place_id || "")) {
    return saved.google_place_id;
  }
  const checkedAt = saved?.checked_at ? new Date(saved.checked_at).getTime() : 0;
  if (saved && Number.isFinite(checkedAt) && Date.now() - checkedAt < MATCH_RETRY_MS) return null;

  const matched = await searchGooglePlace(place, env.GOOGLE_MAPS_API_KEY, fetcher);
  const now = new Date().toISOString();
  if (!matched) {
    await savePlaceSource(env.DB, placeKey, { matchStatus: "recheck", checkedAt: now });
    return null;
  }

  const candidate = matched.candidate;
  await savePlaceSource(env.DB, placeKey, {
    googlePlaceId: candidate.id,
    matchStatus: "matched",
    matchedName: candidate.displayName?.text,
    matchedAddress: candidate.formattedAddress,
    matchedLatitude: candidate.location?.latitude,
    matchedLongitude: candidate.location?.longitude,
    distanceMeters: matched.distance,
    checkedAt: now,
  });
  return candidate.id;
}

async function googlePlacePhotos(placeId, apiKey, fetcher) {
  const response = await googleJson(
    fetcher,
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "photos",
      },
    },
  );
  return Array.isArray(response.photos) ? response.photos : [];
}

function selectedPhoto(photos, requestedIndex = null) {
  const candidates = photos
    .map((photo, index) => ({ photo, index }))
    .filter(({ photo }) => (
      /^places\/[^/]+\/photos\/[^/]+$/.test(String(photo?.name || ""))
      && Number(photo.widthPx) > 0
      && Number(photo.heightPx) > 0
    ));
  if (!candidates.length) return null;
  if (Number.isInteger(requestedIndex)) {
    const requested = candidates.find(({ index }) => index === requestedIndex);
    if (requested) return requested;
  }
  return candidates.find(({ photo }) => Number(photo.widthPx) / Number(photo.heightPx) >= 1.15) || candidates[0];
}

function placePhotoPayload(placeKey, place, selected) {
  const attribution = selected.photo.authorAttributions?.[0] || {};
  const creator = safeText(attribution.displayName, 120);
  return {
    src: `/api/place-image?id=${encodeURIComponent(placeKey)}&mode=place-photo&index=${selected.index}`,
    detailSrc: `/api/place-image?id=${encodeURIComponent(placeKey)}&mode=place-photo&index=${selected.index}`,
    kind: "actual",
    provider: "google_places",
    label: "Google Maps",
    alt: `${place.name} 장소 사진`,
    creator,
    creatorUrl: safeGoogleUrl(attribution.uri),
    credit: creator ? `${creator} · Google Maps` : "Google Maps",
    sourceUrl: safeGoogleUrl(selected.photo.googleMapsUri),
    reportUrl: safeGoogleUrl(selected.photo.flagContentUri),
  };
}

function bearingDegrees(from, to) {
  const toRadians = (degrees) => degrees * Math.PI / 180;
  const toDegrees = (radians) => radians * 180 / Math.PI;
  const fromLatitude = toRadians(from.lat);
  const toLatitude = toRadians(to.lat);
  const longitudeDelta = toRadians(to.lng - from.lng);
  const y = Math.sin(longitudeDelta) * Math.cos(toLatitude);
  const x = Math.cos(fromLatitude) * Math.sin(toLatitude)
    - Math.sin(fromLatitude) * Math.cos(toLatitude) * Math.cos(longitudeDelta);
  return (toDegrees(Math.atan2(y, x)) + 360) % 360;
}

async function streetViewMetadata(place, apiKey, fetcher) {
  const url = new URL("https://maps.googleapis.com/maps/api/streetview/metadata");
  url.searchParams.set("location", `${place.location.lat},${place.location.lng}`);
  url.searchParams.set("radius", "250");
  url.searchParams.set("source", "outdoor");
  url.searchParams.set("key", apiKey);
  const response = await googleJson(fetcher, url, {});
  if (response.status !== "OK" || !response.location) return null;
  const panoramaLocation = { lat: Number(response.location.lat), lng: Number(response.location.lng) };
  if (!Number.isFinite(panoramaLocation.lat) || !Number.isFinite(panoramaLocation.lng)) return null;
  if (distanceMeters(place.location, panoramaLocation) > 350) return null;
  return {
    ...response,
    panoramaLocation,
    heading: bearingDegrees(panoramaLocation, place.location),
  };
}

function streetViewPayload(placeKey, place, metadata) {
  const mapsUrl = new URL("https://www.google.com/maps/search/");
  mapsUrl.searchParams.set("api", "1");
  mapsUrl.searchParams.set("query", `${place.location.lat},${place.location.lng}`);
  return {
    src: `/api/place-image?id=${encodeURIComponent(placeKey)}&mode=streetview&layout=card`,
    detailSrc: `/api/place-image?id=${encodeURIComponent(placeKey)}&mode=streetview&layout=detail`,
    kind: "actual",
    provider: "streetview",
    label: "Google Maps 거리뷰",
    alt: `${place.name} 주변 거리뷰`,
    credit: safeText(metadata.copyright, 160) || "Google Maps",
    sourceUrl: mapsUrl.href,
    capturedAt: /^\d{4}(?:-\d{2})?$/.test(String(metadata.date || "")) ? metadata.date : "",
  };
}

async function placeImageMetadata(placeKey, place, env, fetcher) {
  let placeId = null;
  try {
    placeId = await resolveGooglePlaceId(placeKey, place, env, fetcher);
    if (placeId) {
      const photos = await googlePlacePhotos(placeId, env.GOOGLE_MAPS_API_KEY, fetcher);
      const photo = selectedPhoto(photos);
      if (photo) return { image: placePhotoPayload(placeKey, place, photo), source: "google_places" };
    }
  } catch {
    placeId = null;
  }

  try {
    const metadata = await streetViewMetadata(place, env.GOOGLE_MAPS_API_KEY, fetcher);
    if (metadata) return { image: streetViewPayload(placeKey, place, metadata), source: "streetview" };
  } catch {
    return { image: null, source: null };
  }
  return { image: null, source: null };
}

async function placePhotoResponse(placeKey, place, requestedIndex, env, fetcher) {
  const placeId = await resolveGooglePlaceId(placeKey, place, env, fetcher);
  if (!placeId) return jsonResponse({ error: "장소 사진을 찾지 못했어요." }, 404);
  const photos = await googlePlacePhotos(placeId, env.GOOGLE_MAPS_API_KEY, fetcher);
  const selected = selectedPhoto(photos, requestedIndex);
  if (!selected) return jsonResponse({ error: "장소 사진을 찾지 못했어요." }, 404);
  const url = new URL(`https://places.googleapis.com/v1/${selected.photo.name}/media`);
  url.searchParams.set("maxWidthPx", "960");
  url.searchParams.set("key", env.GOOGLE_MAPS_API_KEY);
  const response = await fetcher(url, { redirect: "follow" });
  const contentType = response.headers.get("content-type") || "";
  if (!response.ok || !contentType.startsWith("image/")) {
    return jsonResponse({ error: "장소 사진을 불러오지 못했어요." }, 502);
  }
  return new Response(response.body, {
    status: 200,
    headers: imageHeaders(contentType),
  });
}

async function streetViewResponse(place, layout, env, fetcher) {
  const metadata = await streetViewMetadata(place, env.GOOGLE_MAPS_API_KEY, fetcher);
  if (!metadata) return jsonResponse({ error: "거리뷰를 찾지 못했어요." }, 404);
  const url = new URL("https://maps.googleapis.com/maps/api/streetview");
  url.searchParams.set("size", layout === "detail" ? "640x360" : "480x600");
  url.searchParams.set("location", `${metadata.panoramaLocation.lat},${metadata.panoramaLocation.lng}`);
  url.searchParams.set("heading", metadata.heading.toFixed(1));
  url.searchParams.set("pitch", "0");
  url.searchParams.set("fov", "90");
  url.searchParams.set("return_error_code", "true");
  url.searchParams.set("key", env.GOOGLE_MAPS_API_KEY);
  const response = await fetcher(url);
  const contentType = response.headers.get("content-type") || "";
  if (!response.ok || !contentType.startsWith("image/")) {
    return jsonResponse({ error: "거리뷰를 불러오지 못했어요." }, 502);
  }
  return new Response(response.body, {
    status: 200,
    headers: imageHeaders(contentType),
  });
}

export async function handlePlaceImageRequest(request, env, catalog, fetcher = fetch) {
  const url = new URL(request.url);
  if (url.pathname !== "/api/place-image") return null;
  if (request.method !== "GET") return jsonResponse({ error: "지원하지 않는 요청이에요." }, 405);

  const configured = Boolean(env?.GOOGLE_MAPS_API_KEY);
  if (url.searchParams.get("mode") === "status") {
    return jsonResponse({
      configured,
      providers: configured ? ["google_places", "streetview"] : [],
    });
  }
  if (!configured) return jsonResponse({ configured: false, image: null });

  const placeKey = url.searchParams.get("id") || "";
  if (!PLACE_ID_PATTERN.test(placeKey)) return jsonResponse({ error: "장소를 확인할 수 없어요." }, 400);
  const place = catalog?.[placeKey];
  if (!place?.name || !place?.location) return jsonResponse({ error: "등록되지 않은 장소예요." }, 404);

  const mode = url.searchParams.get("mode") || "metadata";
  try {
    if (mode === "place-photo") {
      const index = Number(url.searchParams.get("index"));
      return placePhotoResponse(placeKey, place, Number.isInteger(index) ? index : null, env, fetcher);
    }
    if (mode === "streetview") {
      return streetViewResponse(place, url.searchParams.get("layout"), env, fetcher);
    }
    const result = await placeImageMetadata(placeKey, place, env, fetcher);
    return jsonResponse({ configured: true, ...result });
  } catch {
    return jsonResponse({ configured: true, image: null, error: "장소 사진을 잠시 불러오지 못했어요." }, 502);
  }
}
