import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";

import { handleSharedPlanRequest, sanitizeItems } from "../worker/shared-plans.js";

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
  database.exec("PRAGMA foreign_keys = ON");
  return { DB: new TestD1(database) };
}

function outing(id, name) {
  return {
    id,
    name,
    type: "storytime",
    setting: "indoor",
    dateBucket: "weekend",
    timeLabel: "토요일 10:30 AM",
    startDate: "2026-07-18T17:30:00.000Z",
    endDate: "2026-07-18T18:15:00.000Z",
    city: "Redwood City",
    distance: 2.4,
    age: "1-3세",
    minAgeMonths: 12,
    maxAgeMonths: 47,
    price: "free",
    reservation: "예약 불필요",
    source: "https://www.redwoodcity.org/event",
    sourceName: "City of Redwood City",
    updated: "공식 출처 자동 확인",
    why: "가족이 함께 참여하기 좋아요.",
    address: "1044 Middlefield Road, Redwood City, CA",
    confidenceStatus: "source_confirmed",
    notes: { parking: "주변 주차", bathroom: "건물 내", stroller: "접근 가능" },
    location: { lat: 37.4852, lng: -122.2364 },
  };
}

function mutationRequest(path, method, body, extraHeaders = {}) {
  return new Request(`https://little-weekends.test${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Origin: "https://little-weekends.test",
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  });
}

test("shared plan links separate viewing, editing, and family responses", async () => {
  const env = testEnvironment();
  const first = outing("family-storytime", "Family Storytime");
  const second = outing("music-morning", "Music Morning");
  const createResponse = await handleSharedPlanRequest(
    mutationRequest("/api/plans", "POST", { title: "토요일 가족 계획", items: [first, second] }),
    env,
  );
  assert.equal(createResponse.status, 201);
  const created = await createResponse.json();
  assert.match(created.viewToken, /^[A-Za-z0-9_-]{20,80}$/);
  assert.match(created.editToken, /^[A-Za-z0-9_-]{20,80}$/);

  const viewResponse = await handleSharedPlanRequest(
    new Request(`https://little-weekends.test/api/plans/${created.viewToken}`),
    env,
  );
  const viewed = await viewResponse.json();
  assert.equal(viewed.canEdit, false);
  assert.equal(viewed.items.length, 2);
  assert.equal(viewed.editToken, undefined);

  const editResponse = await handleSharedPlanRequest(
    new Request(`https://little-weekends.test/api/plans/${created.viewToken}`, {
      headers: { "X-Plan-Edit-Token": created.editToken },
    }),
    env,
  );
  assert.equal((await editResponse.json()).canEdit, true);

  const voteResponse = await handleSharedPlanRequest(
    mutationRequest(`/api/plans/${created.viewToken}/responses`, "PUT", {
      participantId: "familymember_12345",
      name: "민지",
      itemId: first.id,
      response: "going",
    }),
    env,
  );
  assert.equal(voteResponse.status, 200);
  assert.deepEqual((await voteResponse.json()).responses.map(({ name, response }) => ({ name, response })), [
    { name: "민지", response: "going" },
  ]);

  const patchResponse = await handleSharedPlanRequest(
    mutationRequest(`/api/plans/${created.viewToken}`, "PATCH", {
      title: "업데이트된 가족 계획",
      items: [first],
    }, { "X-Plan-Edit-Token": created.editToken }),
    env,
  );
  const patched = await patchResponse.json();
  assert.equal(patched.title, "업데이트된 가족 계획");
  assert.equal(patched.items.length, 1);
  assert.equal(patched.responses.length, 1);

  const forbidden = await handleSharedPlanRequest(
    mutationRequest(`/api/plans/${created.viewToken}`, "PATCH", { title: "변조" }),
    env,
  );
  assert.equal(forbidden.status, 403);
});

test("shared plans reject cross-site writes and cap stored snapshots", async () => {
  const env = testEnvironment();
  const request = mutationRequest("/api/plans", "POST", { items: [outing("one", "One")] }, {
    Origin: "https://attacker.test",
    "Sec-Fetch-Site": "cross-site",
  });
  assert.equal((await handleSharedPlanRequest(request, env)).status, 403);

  const items = Array.from({ length: 35 }, (_, index) => outing(`item-${index}`, `Item ${index}`));
  items.push(outing("item-0", "Duplicate"));
  assert.equal(sanitizeItems(items).length, 30);
});

test("built Sites worker routes shared plan requests to persistent storage", async () => {
  const env = testEnvironment();
  const { default: worker } = await import("../dist/server/index.js");
  const response = await worker.fetch(
    mutationRequest("/api/plans", "POST", { title: "통합 테스트", items: [outing("worker-route", "Worker Route")] }),
    env,
    {},
  );
  assert.equal(response.status, 201);
  assert.match((await response.json()).viewToken, /^[A-Za-z0-9_-]{20,80}$/);
});
