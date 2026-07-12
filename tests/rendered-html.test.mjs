import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { ageRangeFromLabel, dateBucket } from "../worker/event-sync.js";

const root = new URL("../", import.meta.url);

test("primary HTML exposes the P0 discovery controls", async () => {
  const html = await readFile(new URL("index.html", root), "utf8");

  assert.match(html, /rel="canonical" href="https:\/\/little-weekends-bay-area\.cashmire2\.chatgpt\.site\/"/);
  assert.match(html, /id="ageFilter"/);
  assert.match(html, /value="toddler">1-3세/);
  assert.match(html, /id="locationDialog"/);
  assert.match(html, /data-location-key="oakland"/);
});

test("client bundle includes dynamic distance, trust, and recommendation logic", async () => {
  const script = await readFile(new URL("app.js", root), "utf8");

  assert.match(script, /function distanceFor\(item\)/);
  assert.match(script, /function recommendationScore\(item\)/);
  assert.match(script, /confidenceStatus === "source_confirmed"/);
  assert.match(script, /little-weekends-location/);
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
  assert.match(worker, /connect-src 'self'/);
  assert.match(eventSync, /min_age_months/);
  assert.match(eventSync, /confidence_status/);
});
