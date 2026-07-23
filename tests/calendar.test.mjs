import assert from "node:assert/strict";
import test from "node:test";

import { handleCalendarRequest } from "../worker/calendar.js";

test("calendar endpoint returns an importable UTF-8 ICS event", async () => {
  const url = new URL("https://little-weekends.test/calendar.ics");
  url.searchParams.set("id", "family-storytime");
  url.searchParams.set("name", "가족 스토리타임");
  url.searchParams.set("start", "2026-07-13T17:30:00.000Z");
  url.searchParams.set("end", "2026-07-13T18:15:00.000Z");
  url.searchParams.set("location", "1044 Middlefield Road, Redwood City");
  url.searchParams.set("why", "아이와 함께 듣는 이야기 시간");
  url.searchParams.set("source", "https://example.test/event");
  url.searchParams.set("detail", "https://little-weekends.test/?outing=family-storytime");

  const response = handleCalendarRequest(
    new Request(url),
    new Date("2026-07-13T12:00:00.000Z"),
  );
  const bytes = new Uint8Array(await response.clone().arrayBuffer());
  const content = await response.text();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "text/calendar; charset=utf-8");
  assert.equal(response.headers.get("content-disposition"), 'inline; filename="little-weekends.ics"');
  assert.deepEqual(Array.from(bytes.slice(0, 3)), [0xef, 0xbb, 0xbf]);
  assert.match(content, /^BEGIN:VCALENDAR\r\n/);
  assert.match(content, /DTSTART:20260713T173000Z/);
  assert.match(content, /DTEND:20260713T181500Z/);
  assert.match(content, /SUMMARY:가족 스토리타임/);
  assert.match(content, /URL:https:\/\/little-weekends\.test\/\?outing=family-storytime/);
  content.split("\r\n").forEach((line) => {
    assert.ok(new TextEncoder().encode(line).length <= 75, `ICS line exceeds 75 bytes: ${line}`);
  });
});

test("calendar endpoint preserves Pacific dates for date-only events", async () => {
  const url = new URL("https://little-weekends.test/calendar.ics");
  url.searchParams.set("id", "family-festival");
  url.searchParams.set("name", "Family Festival");
  url.searchParams.set("start", "2026-07-15T19:00:00.000Z");
  url.searchParams.set("status", "date_confirmed");

  const response = handleCalendarRequest(new Request(url));
  const content = await response.text();

  assert.match(content, /DTSTART;VALUE=DATE:20260715/);
  assert.match(content, /DTEND;VALUE=DATE:20260716/);
  assert.doesNotMatch(content, /DTSTART:20260715T/);
});

test("calendar endpoint rejects incomplete event data", () => {
  const response = handleCalendarRequest(new Request("https://little-weekends.test/calendar.ics?name=Missing%20date"));
  assert.equal(response.status, 400);
});
