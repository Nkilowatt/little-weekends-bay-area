import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";

import { getOutingsResponse } from "../worker/event-sync.js";

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
    return Promise.all(statements.map((statement) => statement.run()));
  }
}

const sourceKeys = [
  "san-mateo-library",
  "south-san-francisco-library",
  "san-mateo-county-libraries",
  "san-mateo-city-events",
  "curiodyssey-daily",
  "bay-area-discovery-museum",
  "redwood-city-family-events",
  "smcl-belmont-family-events",
  "smcl-foster-city-family-events",
  "smcl-san-carlos-family-events",
  "smcl-millbrae-family-events",
  "burlingame-library-family-events",
  "palo-alto-family-events",
  "sf-rec-park-family-events",
];

function seededDatabase() {
  const database = new DatabaseSync(":memory:");
  database.exec(`
    CREATE TABLE events (
      id TEXT PRIMARY KEY NOT NULL,
      source_key TEXT NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      setting TEXT NOT NULL,
      start_at TEXT NOT NULL,
      end_at TEXT,
      city TEXT NOT NULL,
      distance REAL NOT NULL,
      age TEXT NOT NULL,
      min_age_months INTEGER NOT NULL DEFAULT 0,
      max_age_months INTEGER NOT NULL DEFAULT 216,
      price TEXT NOT NULL,
      reservation TEXT NOT NULL,
      source_url TEXT NOT NULL,
      source_name TEXT NOT NULL,
      verified_at TEXT NOT NULL,
      why TEXT NOT NULL,
      notes_json TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      confidence_status TEXT NOT NULL DEFAULT 'source_confirmed',
      active INTEGER NOT NULL DEFAULT 1,
      last_seen_at TEXT NOT NULL
    );
    CREATE TABLE sync_state (
      source_key TEXT PRIMARY KEY NOT NULL,
      status TEXT NOT NULL,
      last_attempt_at TEXT NOT NULL,
      last_success_at TEXT,
      message TEXT,
      event_count INTEGER NOT NULL DEFAULT 0,
      data_revision INTEGER NOT NULL DEFAULT 1
    );
  `);

  const now = new Date();
  const startAt = new Date(now.getTime() + 3600000).toISOString();
  const endAt = new Date(now.getTime() + 7200000).toISOString();
  const eventInsert = database.prepare(`INSERT INTO events (
    id, source_key, name, type, setting, start_at, end_at, city, distance, age,
    min_age_months, max_age_months, price, reservation, source_url, source_name,
    verified_at, why, notes_json, latitude, longitude, confidence_status, active, last_seen_at
  ) VALUES (?, ?, ?, 'storytime', 'indoor', ?, ?, 'San Mateo', 1, '1-3세', 12, 47,
    'free', '예약 불필요', 'https://www.cityofsanmateo.org/', 'Official source', ?,
    'Fixture event', '{"parking":"","bathroom":"","stroller":""}', 37.56, -122.32,
    'source_confirmed', 1, ?)`);
  const syncInsert = database.prepare(`INSERT INTO sync_state
    (source_key, status, last_attempt_at, last_success_at, message, event_count, data_revision)
    VALUES (?, 'ok', ?, ?, NULL, 1, 3)`);

  sourceKeys.forEach((sourceKey, index) => {
    eventInsert.run(`event-${index}`, sourceKey, `Event ${index}`, startAt, endAt, now.toISOString(), now.toISOString());
    syncInsert.run(sourceKey, now.toISOString(), now.toISOString());
  });

  return { database, d1: new TestD1(database) };
}

test("API reports full coverage only when every source is current", async () => {
  const { d1 } = seededDatabase();
  const response = await getOutingsResponse(new Request("https://example.test/api/outings"), { DB: d1 }, {});
  const payload = await response.json();

  assert.equal(payload.status, "ok");
  assert.equal(payload.currentSourceCount, 14);
  assert.equal(payload.sourceCount, 14);
  assert.equal(payload.events.length, 14);
  assert.ok(payload.events.every((event) => event.endDate));
});

test("API marks stale-source events for recheck without retry amplification", async () => {
  const { database, d1 } = seededDatabase();
  database.prepare("UPDATE sync_state SET status = 'failed', message = 'fixture failure' WHERE source_key = ?")
    .run(sourceKeys[0]);

  const response = await getOutingsResponse(new Request("https://example.test/api/outings"), { DB: d1 }, {});
  const payload = await response.json();
  const staleSourceEvent = payload.events.find((event) => event.sourceKey === sourceKeys[0]);

  assert.equal(payload.status, "partial");
  assert.equal(payload.currentSourceCount, 13);
  assert.equal(staleSourceEvent.confidenceStatus, "recheck");
  assert.match(staleSourceEvent.updated, /재확인 필요/);
});

test("API omits events whose structured end time has passed", async () => {
  const { database, d1 } = seededDatabase();
  const now = new Date();
  database.prepare(`INSERT INTO events (
    id, source_key, name, type, setting, start_at, end_at, city, distance, age,
    min_age_months, max_age_months, price, reservation, source_url, source_name,
    verified_at, why, notes_json, latitude, longitude, confidence_status, active, last_seen_at
  ) VALUES ('expired-event', ?, 'Expired event', 'storytime', 'indoor', ?, ?, 'San Mateo', 1, '1-3세', 12, 47,
    'free', '예약 불필요', 'https://www.cityofsanmateo.org/', 'Official source', ?,
    'Expired fixture', '{}', 37.56, -122.32, 'source_confirmed', 1, ?)`)
    .run(sourceKeys[0], new Date(now.getTime() - 7200000).toISOString(), new Date(now.getTime() - 3600000).toISOString(), now.toISOString(), now.toISOString());

  const response = await getOutingsResponse(new Request("https://example.test/api/outings"), { DB: d1 }, {});
  const payload = await response.json();
  assert.equal(payload.events.some((event) => event.id === "expired-event"), false);
});
