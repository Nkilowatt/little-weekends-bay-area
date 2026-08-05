import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const root = new URL("../", import.meta.url);

async function planningHelpers() {
  const script = await readFile(new URL("planning.js", root), "utf8");
  const context = { URL };
  vm.runInNewContext(script, context);
  return context.LITTLE_WEEKENDS_PLANNING;
}

test("shared outing links open the exact event", async () => {
  const { clearDeepLinkUrl, deepLinkUrl } = await planningHelpers();
  const detailUrl = deepLinkUrl("https://little-weekends.test/?ref=friend#discover", "redwood-family-day");

  assert.equal(detailUrl, "https://little-weekends.test/?ref=friend&outing=redwood-family-day");
  assert.equal(clearDeepLinkUrl(detailUrl), "https://little-weekends.test/?ref=friend");
});

test("saved outings are grouped into useful planning windows", async () => {
  const { groupSavedItems } = await planningHelpers();
  const items = [
    { id: "today", name: "Today", startDate: "2026-07-13T17:00:00.000Z" },
    { id: "week", name: "Week", startDate: "2026-07-15T17:00:00.000Z" },
    { id: "weekend", name: "Weekend", startDate: "2026-07-18T17:00:00.000Z" },
    { id: "next", name: "Next", startDate: "2026-07-21T17:00:00.000Z" },
    { id: "later", name: "Later", startDate: "2026-08-01T17:00:00.000Z" },
    { id: "anytime", name: "Anytime", startDate: null }
  ];

  const groups = groupSavedItems(items, "2026-07-13");
  assert.deepEqual(Array.from(groups, (group) => group.key), ["today", "thisweek", "weekend", "nextweek", "later", "anytime"]);
  assert.deepEqual(Array.from(groups, (group) => group.items[0].id), ["today", "week", "weekend", "next", "later", "anytime"]);
});

test("recommended previews include nearby cities before repeating one city", async () => {
  const { prioritizeCityCoverage } = await planningHelpers();
  const entries = [
    { item: { id: "sm-1", city: "San Mateo" } },
    { item: { id: "sm-2", city: "San Mateo" } },
    { item: { id: "sm-3", city: "San Mateo" } },
    { item: { id: "burl-1", city: "Burlingame" } },
    { item: { id: "burl-2", city: "Burlingame" } },
    { item: { id: "foster-1", city: "Foster City" } },
    { item: { id: "belmont-1", city: "Belmont" } }
  ];

  const result = prioritizeCityCoverage(entries);
  const preview = Array.from(result.slice(0, 5), (entry) => entry.item);
  const previewCities = preview.map((item) => item.city);
  const cityPreviewCounts = [...new Set(previewCities)]
    .map((city) => previewCities.filter((value) => value === city).length);

  assert.ok(preview.some((item) => item.id === "foster-1"));
  assert.ok(Math.max(...cityPreviewCounts) <= 2);
  assert.deepEqual(Array.from(result, (entry) => entry.item.id).toSorted(), entries.map((entry) => entry.item.id).toSorted());
});

test("plan warnings identify schedule and nap conflicts without inventing a time", async () => {
  const { detectPlanIssues } = await planningHelpers();
  const items = [
    { id: "first", startDate: "2026-07-18T20:00:00.000Z", endDate: "2026-07-18T21:00:00.000Z", confidenceStatus: "source_confirmed" },
    { id: "second", startDate: "2026-07-18T20:30:00.000Z", endDate: "2026-07-18T21:30:00.000Z", confidenceStatus: "source_confirmed" },
    { id: "date-only", startDate: "2026-07-18T19:00:00.000Z", confidenceStatus: "date_confirmed" }
  ];

  const issues = detectPlanIssues(items, { enabled: true, start: "13:00", end: "15:00" });
  assert.deepEqual(Array.from(issues.first), ["다른 저장 일정과 시간이 겹쳐요", "설정한 낮잠 시간과 겹쳐요"]);
  assert.deepEqual(Array.from(issues.second), ["다른 저장 일정과 시간이 겹쳐요", "설정한 낮잠 시간과 겹쳐요"]);
  assert.deepEqual(Array.from(issues["date-only"]), []);
});

test("calendar downloads use exact times when known and all-day dates otherwise", async () => {
  const { buildCalendarFile } = await planningHelpers();
  const exact = buildCalendarFile({
    id: "storytime",
    name: "Family Storytime",
    city: "Redwood City",
    address: "1044 Middlefield Road",
    why: "가족 행사",
    startDate: "2026-07-13T10:30:00-07:00",
    endDate: "2026-07-13T11:15:00-07:00",
    confidenceStatus: "source_confirmed",
    source: "https://example.test/event"
  }, "https://little-weekends.test/?outing=storytime", new Date("2026-07-13T12:00:00.000Z"));

  assert.match(exact.content, /DTSTART:20260713T173000Z/);
  assert.match(exact.content, /DTEND:20260713T181500Z/);
  assert.match(exact.content, /URL:https:\/\/little-weekends\.test\/\?outing=storytime/);

  const dateOnly = buildCalendarFile({
    id: "festival",
    name: "Family Festival",
    city: "San Mateo",
    startDate: "2026-07-15T19:00:00.000Z",
    confidenceStatus: "date_confirmed"
  }, "https://little-weekends.test/?outing=festival");

  assert.match(dateOnly.content, /DTSTART;VALUE=DATE:20260715/);
  assert.match(dateOnly.content, /DTEND;VALUE=DATE:20260716/);
  assert.doesNotMatch(dateOnly.content, /DTSTART:20260715T/);
});

test("calendar actions point to a same-origin ICS response instead of a temporary blob", async () => {
  const { buildCalendarUrl } = await planningHelpers();
  const calendarUrl = new URL(buildCalendarUrl({
    id: "family-storytime",
    name: "가족 스토리타임",
    address: "1044 Middlefield Road",
    why: "아이와 함께 듣는 이야기 시간",
    startDate: "2026-07-13T10:30:00-07:00",
    endDate: "2026-07-13T11:15:00-07:00",
    confidenceStatus: "source_confirmed",
    source: "https://example.test/event",
  }, "https://little-weekends.test/?outing=family-storytime"));

  assert.equal(calendarUrl.origin, "https://little-weekends.test");
  assert.equal(calendarUrl.pathname, "/calendar.ics");
  assert.equal(calendarUrl.searchParams.get("id"), "family-storytime");
  assert.equal(calendarUrl.searchParams.get("name"), "가족 스토리타임");
  assert.equal(calendarUrl.searchParams.get("start"), "2026-07-13T17:30:00.000Z");
  assert.equal(calendarUrl.searchParams.get("detail"), "https://little-weekends.test/?outing=family-storytime");
});

test("outing time status removes ended events and keeps date-only events for their Pacific day", async () => {
  const { isOutingCurrent, outingTimeStatus } = await planningHelpers();
  const now = new Date("2026-07-16T05:30:00.000Z");
  const ended = { startDate: "2026-07-16T01:00:00.000Z", endDate: "2026-07-16T03:00:00.000Z", confidenceStatus: "source_confirmed" };
  const ongoing = { startDate: "2026-07-16T05:00:00.000Z", endDate: "2026-07-16T06:00:00.000Z", confidenceStatus: "source_confirmed" };
  const soon = { startDate: "2026-07-16T06:00:00.000Z", endDate: "2026-07-16T07:00:00.000Z", confidenceStatus: "source_confirmed" };
  const dateOnly = { startDate: "2026-07-15T19:00:00.000Z", confidenceStatus: "date_confirmed" };

  assert.equal(isOutingCurrent(ended, now), false);
  assert.equal(outingTimeStatus(ongoing, now).key, "ongoing");
  assert.equal(outingTimeStatus(soon, now).key, "soon");
  assert.equal(outingTimeStatus(dateOnly, now).key, "time_unknown");
});
