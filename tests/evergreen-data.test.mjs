import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const root = new URL("../", import.meta.url);

test("curated evergreen catalog covers the core peninsula library baseline", async () => {
  const script = await readFile(new URL("evergreen-outings.js", root), "utf8");
  const context = { window: {} };
  vm.runInNewContext(script, context);
  const catalog = context.window.LITTLE_WEEKENDS_EVERGREEN;

  assert.ok(catalog.length >= 48);
  assert.equal(new Set(catalog.map((item) => item.id)).size, catalog.length);
  assert.ok(catalog.every((item) => item.confidenceStatus === "human_verified"));
  assert.ok(catalog.every((item) => item.lastReviewedAt >= "2026-07-12" && item.lastReviewedAt <= "2026-07-17"));
  assert.ok(catalog.every((item) => new URL(item.source).protocol === "https:"));
  assert.ok(new Set(catalog.map((item) => item.city)).size >= 8);
  ["San Francisco", "Belmont", "Foster City", "San Carlos", "Millbrae", "Burlingame", "Palo Alto", "Menlo Park", "Mountain View", "Sunnyvale", "Cupertino", "Santa Clara", "Campbell", "Los Gatos"].forEach((city) => {
    assert.ok(catalog.some((item) => item.city === city));
  });
  ["sfpl-main-library-family-place", "sfpl-mission-bay-library-family-place", "sfpl-noe-valley-library-family-place", "sfpl-glen-park-library-family-place", "sfpl-richmond-library-family-place", "sfpl-sunset-library-family-place"].forEach((id) => {
    assert.ok(catalog.some((item) => item.id === id));
  });
  ["sunnyvale-public-library-family-place", "sunnyvale-magical-bridge-playground"].forEach((id) => {
    assert.ok(catalog.some((item) => item.id === id));
  });
});

test("client rendering has output escaping and an official-source allowlist", async () => {
  const script = await readFile(new URL("app.js", root), "utf8");

  assert.match(script, /function escapeHtml\(value\)/);
  assert.match(script, /function safeSourceUrl\(value\)/);
  assert.match(script, /officialSourceHosts/);
  assert.match(script, /escapeHtml\(item\.name\)/);
  assert.match(script, /sourceAction = item\.source/);
  assert.match(script, /outings = \[\.\.\.staticOutings, \.\.\.catalogEvergreenOutings\]/);
});
