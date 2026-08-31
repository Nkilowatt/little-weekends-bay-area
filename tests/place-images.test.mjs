import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const root = new URL("../", import.meta.url);

function lookupKey(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9가-힣]+/g, " ")
    .trim();
}

async function loadCatalogAndImages() {
  const context = { window: {} };
  for (const filename of ["evergreen-outings.js", "park-expansion.js", "place-images.js"]) {
    vm.runInNewContext(await readFile(new URL(filename, root), "utf8"), context);
  }
  return {
    catalog: context.window.LITTLE_WEEKENDS_EVERGREEN,
    images: context.window.LITTLE_WEEKENDS_PLACE_IMAGES,
  };
}

test("verified place-image registry is complete, licensed, and catalog-linked", async () => {
  const { catalog, images } = await loadCatalogAndImages();
  const entries = Object.entries(images);
  const catalogIds = new Set(catalog.map((item) => item.id));

  assert.equal(entries.length, 60);
  assert.equal(new Set(entries.map(([, image]) => image.src)).size, entries.length);

  for (const [id, image] of entries) {
    assert.ok(catalogIds.has(id), `${id} must refer to a curated catalog place`);
    assert.equal(image.kind, "actual");
    assert.match(image.src, /^assets\/places\/[a-z0-9-]+\.(?:jpe?g|webp)$/);
    assert.ok(image.alt.length >= 8);
    assert.ok(image.creator);
    assert.ok(image.credit);
    assert.match(image.license, /^(?:CC0|CC BY(?:-SA)? [234]\.0)$/);
    assert.match(image.licenseUrl, /^https:\/\/creativecommons\.org\//);
    if (/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/.test(image.sourceUrl)) {
      assert.ok(Number.isInteger(image.commonsPageId));
    } else {
      assert.match(image.sourceUrl, /^https:\/\/www\.flickr\.com\/photos\//);
      assert.match(image.credit, /Openverse/);
      assert.equal(image.commonsPageId, null);
    }
    assert.match(image.verifiedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(Array.isArray(image.aliases) && image.aliases.length >= 1);
    assert.match(image.reviewFocus, /^(?:family_decision|venue_context)$/);
    assert.doesNotMatch(`${image.alt} ${image.sourceUrl}`, /\b(?:gun|weapon|cannon|artillery)\b/i);

    const file = await stat(new URL(image.src, root));
    assert.ok(file.size > 40_000, `${image.src} should contain an optimized production photo`);
  }
});

test("place-image aliases remain unambiguous for exact venue matching", async () => {
  const { images } = await loadCatalogAndImages();
  const aliases = Object.entries(images).flatMap(([id, image]) => (
    [id, ...image.aliases].map((alias) => [lookupKey(alias), id])
  ));
  const seen = new Map();

  for (const [alias, id] of aliases) {
    assert.ok(alias);
    assert.ok(!seen.has(alias) || seen.get(alias) === id, `${alias} maps to more than one place`);
    seen.set(alias, id);
  }
});
