import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const root = new URL("../", import.meta.url);

test("curated evergreen catalog covers the core peninsula library baseline", async () => {
  const script = await readFile(new URL("evergreen-outings.js", root), "utf8");
  const parkExpansionScript = await readFile(new URL("park-expansion.js", root), "utf8");
  const context = { window: {} };
  vm.runInNewContext(script, context);
  vm.runInNewContext(parkExpansionScript, context);
  const catalog = context.window.LITTLE_WEEKENDS_EVERGREEN;
  const parks = catalog.filter((item) => item.type === "park");
  const unverifiedHours = catalog.filter((item) => item.timeLabel === "운영시간 확인");

  assert.ok(catalog.length >= 128);
  assert.ok(parks.length >= 91);
  assert.equal(new Set(catalog.map((item) => item.id)).size, catalog.length);
  assert.equal(new Set(parks.map((item) => `${item.name}|${item.city}`)).size, parks.length);
  assert.ok(catalog.every((item) => item.confidenceStatus === "human_verified"));
  assert.ok(catalog.every((item) => item.lastReviewedAt >= "2026-07-12" && item.lastReviewedAt <= "2026-07-25"));
  assert.ok(catalog.every((item) => new URL(item.source).protocol === "https:"));
  assert.ok(catalog.every((item) => item.ageEvidence?.url === item.source));
  assert.ok(catalog.every((item) => /^(?:official_program|official_facility|official_audience|editorial_review)$/.test(item.ageEvidence?.basis || "")));
  assert.ok(catalog.every((item) => /^\d{4}-\d{2}-\d{2}$/.test(item.ageEvidence?.verifiedAt || "")));
  assert.ok(new Set(parks.map((item) => item.city)).size >= 26);
  ["San Francisco", "Belmont", "Foster City", "San Carlos", "Millbrae", "Burlingame", "Palo Alto", "Menlo Park", "Mountain View", "Sunnyvale", "Cupertino", "Santa Clara", "Campbell", "Los Gatos"].forEach((city) => {
    assert.ok(catalog.some((item) => item.city === city));
  });
  ["sfpl-main-library-family-place", "sfpl-mission-bay-library-family-place", "sfpl-noe-valley-library-family-place", "sfpl-glen-park-library-family-place", "sfpl-richmond-library-family-place", "sfpl-sunset-library-family-place"].forEach((id) => {
    assert.ok(catalog.some((item) => item.id === id));
  });
  ["sunnyvale-public-library-family-place", "sunnyvale-magical-bridge-playground"].forEach((id) => {
    assert.ok(catalog.some((item) => item.id === id));
  });
  [
    "san-mateo-beresford-park-playground",
    "san-mateo-indian-springs-playground",
    "san-mateo-lakeshore-park-playground",
    "menlo-park-nealon-all-abilities-playground",
    "mountain-view-rengstorff-magical-bridge",
    "cupertino-jollyman-inclusive-playground",
    "santa-clara-central-park-magical-bridge",
    "campbell-john-d-morgan-playgrounds",
    "los-gatos-oak-meadow-park-playground",
  ].forEach((id) => {
    assert.ok(catalog.some((item) => item.id === id));
  });
  ["San Mateo", "Menlo Park", "Mountain View", "Sunnyvale", "Cupertino", "Santa Clara", "Campbell", "Los Gatos"].forEach((city) => {
    assert.ok(catalog.some((item) => item.city === city && item.type === "park"));
  });
  ["San Francisco", "San Mateo", "Redwood City", "Menlo Park", "Palo Alto", "Mountain View", "Sunnyvale", "Cupertino", "Santa Clara", "Campbell", "Los Gatos", "San Jose", "Oakland", "Berkeley"].forEach((city) => {
    assert.ok(parks.filter((item) => item.city === city).length >= 5, `${city} should have at least five parks`);
  });
  assert.ok(parks.every((item) => item.address && item.location));
  assert.ok(parks.every((item) => item.location.lat >= 37.18 && item.location.lat <= 38.30));
  assert.ok(parks.every((item) => item.location.lng >= -122.65 && item.location.lng <= -121.70));
  assert.ok(parks.every((item) => item.why));
  assert.ok(parks.filter((item) => item.placeFeatures?.length).length >= 71);
  assert.ok(parks.every((item) => item.notes?.parking && item.notes?.bathroom && item.notes?.stroller));
  assert.ok(unverifiedHours.length <= 24, `too many places still lack verified hours: ${unverifiedHours.length}`);
  assert.ok(catalog.some((item) => item.id === "mountain-view-cuesta-park" && item.timeLabel === "매일 6 AM-일몰 30분 후"));
  assert.ok(catalog.some((item) => item.id === "belmont-library-family-place" && item.timeLabel.includes("월-목 10 AM-8 PM")));
});

test("client rendering has output escaping and an official-source allowlist", async () => {
  const script = await readFile(new URL("app.js", root), "utf8");

  assert.match(script, /function escapeHtml\(value\)/);
  assert.match(script, /function safeSourceUrl\(value\)/);
  assert.match(script, /officialSourceHosts/);
  ["alamedaca.gov", "belmont.gov", "berkeleyca.gov", "cityoflarkspur.org", "cityofsancarlos.org", "dalycity.org", "fostercity.org", "marincounty.gov", "oaklandca.gov", "santaclaracounty.gov", "ssf.net"].forEach((host) => {
    assert.ok(script.includes(`"${host}"`), `${host} should be an allowed official source`);
  });
  assert.match(script, /escapeHtml\(item\.name\)/);
  assert.match(script, /sourceAction = item\.source/);
  assert.match(script, /outings = \[\.\.\.staticOutings, \.\.\.catalogEvergreenOutings\]/);
});
