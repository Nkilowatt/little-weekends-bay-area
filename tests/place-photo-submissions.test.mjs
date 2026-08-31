import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";

import { handlePlacePhotoRequest, imageTypeFromBytes, reviewer } from "../worker/place-photos.js";

class D1Statement {
  constructor(database, sql, values = []) { this.database = database; this.sql = sql; this.values = values; }
  bind(...values) { return new D1Statement(this.database, this.sql, values); }
  async all() { return { results: this.database.prepare(this.sql).all(...this.values) }; }
  async first() { return this.database.prepare(this.sql).get(...this.values) || null; }
  async run() { return this.database.prepare(this.sql).run(...this.values); }
}

class TestD1 {
  constructor(database) { this.database = database; }
  prepare(sql) { return new D1Statement(this.database, sql); }
  async batch(statements) { return Promise.all(statements.map((statement) => statement.run())); }
}

class TestR2 {
  constructor() { this.objects = new Map(); this.failPut = false; }
  async put(key, body, options = {}) {
    if (this.failPut) throw new Error("fixture R2 failure");
    this.objects.set(key, { bytes: new Uint8Array(body), options });
  }
  async get(key) {
    const object = this.objects.get(key);
    if (!object) return null;
    return { body: object.bytes, httpMetadata: object.options.httpMetadata, httpEtag: `"${key}"` };
  }
  async delete(key) { this.objects.delete(key); }
}

function environment() {
  const database = new DatabaseSync(":memory:");
  database.exec(`
    CREATE TABLE events (
      id TEXT PRIMARY KEY, place_key TEXT NOT NULL DEFAULT '', venue_name TEXT NOT NULL DEFAULT '',
      name TEXT NOT NULL, city TEXT NOT NULL, address TEXT NOT NULL DEFAULT '', start_at TEXT NOT NULL,
      active INTEGER NOT NULL DEFAULT 1
    );
  `);
  const uploads = new TestR2();
  const transformedBytes = new Uint8Array([0x52, 0x49, 0x46, 0x46, 0x04, 0, 0, 0, 0x57, 0x45, 0x42, 0x50, 1, 2, 3, 4]);
  return {
    database,
    env: {
      DB: new TestD1(database),
      UPLOADS: uploads,
      IMAGES: {
        input() {
          return {
            transform() {
              return {
                async output() {
                  return { response: () => new Response(transformedBytes, { headers: { "Content-Type": "image/webp" } }) };
                },
              };
            },
          };
        },
      },
      PHOTO_UPLOADS_ENABLED: "true",
      PHOTO_REVIEWER_EMAILS: "owner@example.com",
    },
    uploads,
  };
}

function jpegFile(valid = true) {
  const bytes = new Uint8Array(96);
  if (valid) bytes.set([0xff, 0xd8, 0xff], 0);
  return new File([bytes], "visit.jpg", { type: "image/jpeg" });
}

function submissionRequest(file = jpegFile(), options = {}) {
  const form = new FormData();
  form.set("photo", file);
  form.set("placeKey", "foster-city-library-family-place");
  form.set("requestId", options.requestId || crypto.randomUUID());
  form.set("deviceId", options.deviceId || "device_secret_12345678901234567890");
  form.set("takenOn", "2026-08-29");
  if (!options.omitConsent) form.set("rightsConfirmed", "true");
  form.set("peopleConsentConfirmed", "true");
  form.set("publicLicenseConfirmed", "true");
  return new Request("https://little-weekends.test/api/place-photos", {
    method: "POST",
    headers: { Origin: "https://little-weekends.test", "Sec-Fetch-Site": "same-origin" },
    body: form,
  });
}

const catalog = {
  "foster-city-library-family-place": {
    name: "Foster City Library",
    city: "Foster City",
    address: "1000 E Hillsdale Boulevard, Foster City, CA 94404",
  },
};

function reviewerHeaders(email = "owner@example.com") {
  return { "oai-authenticated-user-email": email, "oai-authenticated-user-id": "site-user-1" };
}

test("image signatures reject declared images whose bytes do not match", () => {
  assert.equal(imageTypeFromBytes(new Uint8Array([0xff, 0xd8, 0xff, 0])), "image/jpeg");
  assert.equal(imageTypeFromBytes(new Uint8Array(16)), null);
});

test("visitor photos remain private until an allowlisted reviewer approves them", async () => {
  const { env, database, uploads } = environment();
  const created = await handlePlacePhotoRequest(submissionRequest(), env, catalog);
  assert.equal(created.status, 201);
  const receipt = await created.json();
  assert.equal(receipt.status, "pending");
  assert.match(receipt.manageToken, /^[A-Za-z0-9_-]{24,120}$/);
  const stored = database.prepare("SELECT * FROM place_photo_submissions").get();
  assert.equal(stored.status, "pending");
  assert.equal(stored.manage_token_hash.includes(receipt.manageToken), false);
  assert.equal(uploads.objects.size, 1);

  const hidden = await handlePlacePhotoRequest(new Request("https://little-weekends.test/api/place-photos?placeKey=foster-city-library-family-place"), env, catalog);
  assert.deepEqual((await hidden.json()).photos["foster-city-library-family-place"], []);

  const anonymousAdmin = await handlePlacePhotoRequest(new Request("https://little-weekends.test/api/admin/place-photos"), env, catalog);
  assert.equal(anonymousAdmin.status, 401);
  const forbiddenAdmin = await handlePlacePhotoRequest(new Request("https://little-weekends.test/api/admin/place-photos", { headers: reviewerHeaders("other@example.com") }), env, catalog);
  assert.equal(forbiddenAdmin.status, 403);
  assert.equal(reviewer(new Request("https://little-weekends.test", { headers: reviewerHeaders() }), env).userId, "site-user-1");

  const approved = await handlePlacePhotoRequest(new Request(`https://little-weekends.test/api/admin/place-photos/${receipt.submissionId}`, {
    method: "PATCH",
    headers: { ...reviewerHeaders(), Origin: "https://little-weekends.test", "Sec-Fetch-Site": "same-origin", "Content-Type": "application/json" },
    body: JSON.stringify({ action: "approve", featured: true }),
  }), env, catalog);
  assert.equal(approved.status, 200);

  const visible = await handlePlacePhotoRequest(new Request("https://little-weekends.test/api/place-photos?placeKey=foster-city-library-family-place"), env, catalog);
  const publicPhotos = (await visible.json()).photos["foster-city-library-family-place"];
  assert.equal(publicPhotos.length, 1);
  assert.equal(publicPhotos[0].provider, "community");

  const image = await handlePlacePhotoRequest(new Request(`https://little-weekends.test${publicPhotos[0].src}`), env, catalog);
  assert.equal(image.status, 200);
  assert.equal(image.headers.get("content-type"), "image/webp");

  const withdrawn = await handlePlacePhotoRequest(new Request(`https://little-weekends.test/api/place-photos/submissions/${receipt.submissionId}`, {
    method: "DELETE",
    headers: { Origin: "https://little-weekends.test", "Sec-Fetch-Site": "same-origin", "X-Photo-Manage-Token": receipt.manageToken },
  }), env, catalog);
  assert.equal(withdrawn.status, 200);
  assert.equal(uploads.objects.size, 0);
  assert.equal(database.prepare("SELECT status FROM place_photo_submissions").get().status, "withdrawn");
});

test("uploads reject mismatched image bytes before object storage", async () => {
  const { env, uploads } = environment();
  const response = await handlePlacePhotoRequest(submissionRequest(jpegFile(false)), env, catalog);
  assert.equal(response.status, 400);
  assert.equal(uploads.objects.size, 0);
});

test("uploads require all consent and enforce idempotency and the daily device limit", async () => {
  const { env, uploads } = environment();
  const missingConsent = await handlePlacePhotoRequest(submissionRequest(jpegFile(), { omitConsent: true }), env, catalog);
  assert.equal(missingConsent.status, 400);
  assert.equal(uploads.objects.size, 0);

  const requestId = crypto.randomUUID();
  const first = await handlePlacePhotoRequest(submissionRequest(jpegFile(), { requestId }), env, catalog);
  const duplicate = await handlePlacePhotoRequest(submissionRequest(jpegFile(), { requestId }), env, catalog);
  assert.equal(first.status, 201);
  assert.equal(duplicate.status, 200);
  assert.equal((await first.json()).submissionId, (await duplicate.json()).submissionId);
  assert.equal(uploads.objects.size, 1);

  assert.equal((await handlePlacePhotoRequest(submissionRequest(), env, catalog)).status, 201);
  assert.equal((await handlePlacePhotoRequest(submissionRequest(), env, catalog)).status, 201);
  const limited = await handlePlacePhotoRequest(submissionRequest(), env, catalog);
  assert.equal(limited.status, 429);
  assert.equal(uploads.objects.size, 3);
});

test("R2 and D1 partial failures never leave an orphaned public submission", async () => {
  const r2Failure = environment();
  r2Failure.uploads.failPut = true;
  await assert.rejects(() => handlePlacePhotoRequest(submissionRequest(), r2Failure.env, catalog), /R2 failure/);
  assert.equal(r2Failure.database.prepare("SELECT COUNT(*) AS count FROM place_photo_submissions").get().count, 0);

  const d1Failure = environment();
  await handlePlacePhotoRequest(new Request("https://little-weekends.test/api/place-photos?placeKey=foster-city-library-family-place"), d1Failure.env, catalog);
  d1Failure.database.exec(`CREATE TRIGGER reject_photo_insert BEFORE INSERT ON place_photo_submissions
    BEGIN SELECT RAISE(FAIL, 'fixture D1 failure'); END;`);
  await assert.rejects(() => handlePlacePhotoRequest(submissionRequest(), d1Failure.env, catalog), /fixture D1 failure/);
  assert.equal(d1Failure.uploads.objects.size, 0);
});
