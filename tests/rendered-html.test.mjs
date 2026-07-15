import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { ageRangeFromLabel, dateBucket } from "../worker/event-sync.js";

const root = new URL("../", import.meta.url);

test("primary HTML exposes the P0 and P1 discovery controls", async () => {
  const html = await readFile(new URL("index.html", root), "utf8");

  assert.match(html, /rel="canonical" href="https:\/\/little-weekends-bay-area\.cashmire2\.chatgpt\.site\/"/);
  assert.match(html, /id="ageFilter"/);
  assert.match(html, /value="toddler">1-3세/);
  assert.match(html, /id="locationDialog"/);
  assert.match(html, /data-location-key="oakland"/);
  assert.match(html, /data-location-key="redwood-city"/);
  assert.match(html, /value="tomorrow">내일/);
  assert.match(html, /id="regionFilter"/);
  assert.match(html, /id="timeFilter"/);
  assert.match(html, /id="reservationFilter"/);
  assert.match(html, /id="bathroomFilter"/);
  assert.match(html, /id="strollerFilter"/);
  assert.match(html, /evergreen-outings\.js\?v=3/);
  assert.match(html, /styles\.css\?v=19/);
  assert.match(html, /yeon-sung-korean-400\.woff2\?v=1/);
  assert.match(html, /lee-seoyun-korean-400\.woff2\?v=1/);
  assert.match(html, /planning\.js\?v=1/);
  assert.match(html, /app\.js\?v=19/);
  assert.match(html, /id="distanceFilter"><option value="10">10 mi/);
});

test("client bundle includes decision filters, recovery actions, and detail alternatives", async () => {
  const script = await readFile(new URL("app.js", root), "utf8");

  assert.match(script, /function distanceFor\(item\)/);
  assert.match(script, /function recommendationScore\(item\)/);
  assert.match(script, /confidenceStatus === "source_confirmed"/);
  assert.match(script, /confidenceStatus === "recurring_estimate"/);
  assert.match(script, /confidenceStatus === "date_confirmed"/);
  assert.match(script, /little-weekends-location/);
  assert.match(script, /"redwoodcity\.org"/);
  assert.match(script, /function regionForCity\(city\)/);
  assert.match(script, /function matchesTime\(item\)/);
  assert.match(script, /function recommendationReasons\(item\)/);
  assert.match(script, /function nearbyAlternatives\(item\)/);
  assert.match(script, /function shareOuting\(item\)/);
  assert.match(script, /function downloadCalendar\(item\)/);
  assert.match(script, /function openPendingOuting\(\)/);
  assert.match(script, /groupSavedItems\(items, pacificDateKey\(\)\)/);
  assert.match(script, /little-weekends-nap-window/);
  assert.match(script, /emptyExpandDistance/);
});

test("age labels normalize to month ranges", () => {
  assert.deepEqual(ageRangeFromLabel("18개월-3세"), { minAgeMonths: 18, maxAgeMonths: 47 });
  assert.deepEqual(ageRangeFromLabel("1-3세"), { minAgeMonths: 12, maxAgeMonths: 47 });
  assert.deepEqual(ageRangeFromLabel("4-11세"), { minAgeMonths: 48, maxAgeMonths: 143 });
  assert.deepEqual(ageRangeFromLabel("가족·전 연령"), { minAgeMonths: 0, maxAgeMonths: 216 });
});

test("event date buckets retain Pacific-day semantics", () => {
  const now = new Date("2026-07-12T16:00:00.000Z");

  assert.equal(dateBucket("2026-07-12T17:00:00.000Z", now), "today");
  assert.equal(dateBucket("2026-07-13T17:00:00.000Z", now), "nextweek");
});

test("Sites build contains the event API and security policy", async () => {
  const worker = await readFile(new URL("dist/server/index.js", root), "utf8");
  const eventSync = await readFile(new URL("dist/server/event-sync.js", root), "utf8");

  assert.match(worker, /pathname === "\/api\/outings"/);
  assert.match(worker, /"\/evergreen-outings\.js"/);
  assert.match(worker, /"\/planning\.js"/);
  assert.match(worker, /connect-src 'self'/);
  assert.match(eventSync, /min_age_months/);
  assert.match(eventSync, /confidence_status/);
  assert.match(eventSync, /end_at/);
  assert.match(eventSync, /active_event_count/);
  assert.match(eventSync, /data_revision/);
  assert.match(eventSync, /REFRESH_ATTEMPT_COOLDOWN_MS/);
  assert.match(eventSync, /targetSources = force \? sources/);
  assert.match(eventSync, /events\.length \? "public, max-age=300/);
});

test("Sites build serves both Korean webfonts", async () => {
  const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url));
  const fontRoutes = [
    "/assets/fonts/yeon-sung-korean-400.woff2",
    "/assets/fonts/lee-seoyun-korean-400.woff2",
  ];

  for (const route of fontRoutes) {
    const response = await worker.fetch(new Request(`https://little-weekends.test${route}`), {}, {});
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "font/woff2");
    assert.ok((await response.arrayBuffer()).byteLength > 100_000);
  }
});

test("typography scale and Korean wrapping remain intentionally readable", async () => {
  const css = await readFile(new URL("styles.css", root), "utf8");

  assert.match(css, /font-size:\s*115%/);
  assert.match(css, /line-break:\s*strict/);
  assert.match(css, /word-break:\s*keep-all/);
  assert.match(css, /overflow-wrap:\s*break-word/);
  assert.match(css, /\.toast \{[^}]*white-space:\s*normal/);
});
