import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";

import { handleFeedbackRequest } from "../worker/feedback.js";

class D1Statement {
  constructor(database, sql, values = []) {
    this.database = database;
    this.sql = sql;
    this.values = values;
  }

  bind(...values) {
    return new D1Statement(this.database, this.sql, values);
  }

  async all() {
    return { results: this.database.prepare(this.sql).all(...this.values) };
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

function testEnvironment() {
  const database = new DatabaseSync(":memory:");
  return { database, env: { DB: new TestD1(database) } };
}

function feedbackRequest(body, extraHeaders = {}) {
  return new Request("https://little-weekends.test/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://little-weekends.test",
      "Sec-Fetch-Site": "same-origin",
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  });
}

function validFeedback(overrides = {}) {
  return {
    requestId: "1d7f248f-fc1c-4cbb-b7c5-bccfdf729de9",
    category: "place_request",
    message: "Fremont의 주말 스토리타임도 보고 싶어요.",
    email: "parent@example.com",
    website: "",
    context: {
      page: "/",
      locationKey: "san-mateo",
      locationName: "San Mateo",
      filters: { date: "weekend", distance: "10" },
      editToken: "must-not-be-stored",
    },
    ...overrides,
  };
}

test("feedback submissions are sanitized and stored with limited page context", async () => {
  const { database, env } = testEnvironment();
  const response = await handleFeedbackRequest(feedbackRequest(validFeedback()), env);

  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { ok: true });
  const row = database.prepare("SELECT * FROM feedback_submissions").get();
  assert.equal(row.category, "place_request");
  assert.equal(row.email, "parent@example.com");
  assert.equal(row.status, "new");
  const context = JSON.parse(row.context_json);
  assert.equal(context.locationName, "San Mateo");
  assert.equal(context.filters.date, "weekend");
  assert.equal(context.editToken, undefined);
});

test("feedback request ids make retries idempotent", async () => {
  const { database, env } = testEnvironment();
  const body = validFeedback();
  assert.equal((await handleFeedbackRequest(feedbackRequest(body), env)).status, 201);
  assert.equal((await handleFeedbackRequest(feedbackRequest(body), env)).status, 201);
  assert.equal(database.prepare("SELECT COUNT(*) AS count FROM feedback_submissions").get().count, 1);
});

test("public photo reports are validated and routed to the moderation queue", async () => {
  const { database, env } = testEnvironment();
  database.exec(`CREATE TABLE place_photo_submissions (
    id TEXT PRIMARY KEY, place_key TEXT NOT NULL, status TEXT NOT NULL
  )`);
  const photoId = `photo_${crypto.randomUUID()}`;
  database.prepare("INSERT INTO place_photo_submissions (id, place_key, status) VALUES (?, ?, 'approved')")
    .run(photoId, "foster-city-library-family-place");
  const body = validFeedback({
    category: "photo_report",
    message: "사진에 식별 가능한 개인정보가 보여요.",
    context: { photoId, placeKey: "foster-city-library-family-place" },
  });
  const response = await handleFeedbackRequest(feedbackRequest(body), env);
  assert.equal(response.status, 201);
  assert.equal((await response.json()).photoReport, true);
  const report = database.prepare("SELECT * FROM place_photo_reports").get();
  assert.equal(report.photo_id, photoId);
  assert.equal(report.status, "new");
  assert.equal(database.prepare("SELECT category FROM feedback_submissions").get().category, "photo_report");
});

test("feedback rejects cross-site and invalid submissions without storing them", async () => {
  const { database, env } = testEnvironment();
  const crossSite = feedbackRequest(validFeedback(), {
    Origin: "https://attacker.test",
    "Sec-Fetch-Site": "cross-site",
  });
  assert.equal((await handleFeedbackRequest(crossSite, env)).status, 403);

  const invalid = feedbackRequest(validFeedback({ message: "짧음" }));
  assert.equal((await handleFeedbackRequest(invalid, env)).status, 400);
  assert.throws(() => database.prepare("SELECT COUNT(*) FROM feedback_submissions").get(), /no such table/);
});

test("feedback honeypot submissions return success without persistence", async () => {
  const { database, env } = testEnvironment();
  const response = await handleFeedbackRequest(feedbackRequest(validFeedback({ website: "https://spam.test" })), env);
  assert.equal(response.status, 201);
  assert.throws(() => database.prepare("SELECT COUNT(*) FROM feedback_submissions").get(), /no such table/);
});

test("built Sites worker routes feedback submissions to D1", async () => {
  const { database, env } = testEnvironment();
  const { default: worker } = await import("../dist/server/index.js");
  const response = await worker.fetch(feedbackRequest(validFeedback()), env, {});
  assert.equal(response.status, 201);
  assert.equal(database.prepare("SELECT COUNT(*) AS count FROM feedback_submissions").get().count, 1);
});
