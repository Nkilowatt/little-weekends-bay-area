import assert from "node:assert/strict";
import test from "node:test";

import {
  parseBayAreaDiscoveryMuseumEvents,
  parseCuriOdysseyDailyEvents,
  parseSanMateoCityEvents,
  parseSanMateoCountyLibraryEvents,
  parseSanMateoStorytimes,
  parseSouthSanFranciscoStorytimes,
  sourceIsCurrent,
} from "../worker/event-sync.js";

const now = new Date("2026-07-12T16:00:00.000Z");

const fixtures = {
  sanMateo: "<main>Mondays 10:30 AM - Toddler Storytime</main>",
  southSanFrancisco: `
    <h4>July 2026</h4>
    <h5>Main Library</h5>
    <table><tr><td>Toddler Storytime</td><td>Mondays</td><td>10:30 AM</td></tr></table>
  `,
  countyLibrary: `
    <rss><channel><item>
      <title>Family Storytime</title>
      <category>Preschoolers (0-5)</category><category>Storytime</category>
      <bc:is_cancelled>false</bc:is_cancelled><bc:is_virtual>false</bc:is_virtual>
      <bc:start_date>2026-07-13T17:00:00.000Z</bc:start_date>
      <bc:end_date>2026-07-13T18:00:00.000Z</bc:end_date>
      <bc:start_date_local>2026-07-13T10:00:00</bc:start_date_local>
      <link>https://smcl.bibliocommons.com/events/fixture</link>
      <bc:location><bc:name>Fixture Library</bc:name><bc:city>San Mateo</bc:city><bc:number>1</bc:number><bc:street>Main St</bc:street><bc:latitude>37.56</bc:latitude><bc:longitude>-122.32</bc:longitude></bc:location>
      <bc:registration_info><bc:is_required>false</bc:is_required><bc:is_full>false</bc:is_full></bc:registration_info>
    </item></channel></rss>
  `,
  city: `
    <div class="hidden" itemscope itemtype="http://schema.org/Event">
      <span itemprop="name">Family Music in the Park</span>
      <span itemprop="startDate">2026-07-18T10:00</span>
      <p itemprop="description">Free family concert for kids</p>
      <span itemprop="location"><span itemprop="name">Central Park</span></span>
    </div><p></p>
  `,
  curiodyssey: "<main>Animals in Action Every Day at 12 PM, 1 PM, and 2 PM</main>",
  discoveryMuseum: "<section><h3>Bubble Bash</h3><p>June 6 - September 7</p></section>",
};

test("all six official-source parsers retain their expected fixture contract", () => {
  const parsed = [
    parseSanMateoStorytimes(fixtures.sanMateo, now),
    parseSouthSanFranciscoStorytimes(fixtures.southSanFrancisco, now),
    parseSanMateoCountyLibraryEvents(fixtures.countyLibrary, now),
    parseSanMateoCityEvents(fixtures.city, now),
    parseCuriOdysseyDailyEvents(fixtures.curiodyssey, now),
    parseBayAreaDiscoveryMuseumEvents(fixtures.discoveryMuseum, now),
  ];

  parsed.forEach((events) => assert.ok(events.length > 0));
  parsed.flat().forEach((event) => {
    assert.match(event.sourceUrl, /^https:\/\//);
    assert.ok(new Date(event.endAt) > new Date(event.startAt));
    assert.ok(Number.isFinite(event.minAgeMonths));
    assert.ok(Number.isFinite(event.maxAgeMonths));
  });
});

test("source health requires success, freshness, and active future events", () => {
  const healthy = {
    status: "ok",
    last_success_at: "2026-07-12T15:00:00.000Z",
    active_event_count: 4,
  };

  assert.equal(sourceIsCurrent(healthy, now), true);
  assert.equal(sourceIsCurrent({ ...healthy, status: "failed" }, now), false);
  assert.equal(sourceIsCurrent({ ...healthy, active_event_count: 0 }, now), false);
  assert.equal(sourceIsCurrent({ ...healthy, last_success_at: "2026-07-12T08:00:00.000Z" }, now), false);
});

test("museum-wide programs carry an end time instead of a six-hour grace window", () => {
  const curiodyssey = parseCuriOdysseyDailyEvents(fixtures.curiodyssey, now)[0];
  const discoveryMuseum = parseBayAreaDiscoveryMuseumEvents(fixtures.discoveryMuseum, now)[0];

  assert.equal(new Date(curiodyssey.endAt) - new Date(curiodyssey.startAt), 150 * 60000);
  assert.equal(new Date(discoveryMuseum.endAt) - new Date(discoveryMuseum.startAt), 360 * 60000);
});
