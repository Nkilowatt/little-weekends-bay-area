import assert from "node:assert/strict";
import test from "node:test";

import {
  parseBayAreaDiscoveryMuseumEvents,
  parseCuriOdysseyDailyEvents,
  parseRedwoodCityCalendarPage,
  parseRedwoodCityEvents,
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
  redwoodCity: `
    <rss><channel><item>
      <title>Toddler/Preschool Storytime @ Schaberg (07/13/2026 10:30 AM - 11:00 AM)</title>
      <description>Designed for toddlers ages 2-5 with books and songs.</description>
      <link>https://www.redwoodcity.org/Home/Components/Calendar/Event/fixture/</link>
      <eventStartDate>7/13/2026 10:30:00 AM</eventStartDate>
      <eventEndDate>7/13/2026 11:00:00 AM</eventEndDate>
    </item></channel></rss>
  `,
  redwoodCityLibraryCalendar: `
    <div class="hidden" itemscope itemtype="http://schema.org/Event">
      <a href="/Home/Components/Calendar/Event/95353/"><span itemprop="name">Toddler/Preschool Storytime @ Redwood Shores</span></a>
      <span itemprop="startDate">2026-07-16T10:30</span>
      <span itemprop="endDate">2026-07-16T11:00</span>
      <p itemprop="description">Books, songs and movement for ages 2-5.</p>
      <span itemprop="location"><span itemprop="name">Redwood Shores Branch Library</span></span>
    </div><p></p>
    <div class="hidden" itemscope itemtype="http://schema.org/Event">
      <span itemprop="name">Teen Program: Movie Night</span>
      <span itemprop="startDate">2026-07-16T16:30</span>
      <p itemprop="description">For teens.</p>
    </div><p></p>
  `,
  redwoodCityFamilyCalendar: `
    <div class="hidden" itemscope itemtype="http://schema.org/Event">
      <a href="/Home/Components/Calendar/Event/96277/"><span itemprop="name">Movies on the Square: Family Night</span></a>
      <span itemprop="startDate">2026-07-18T18:00</span>
      <span itemprop="endDate">2026-07-18T20:00</span>
      <p itemprop="description">Free outdoor movie for families.</p>
      <span itemprop="location"><span itemprop="name">Courthouse Square</span></span>
    </div><p></p>
  `,
};

test("all seven official-source parsers retain their expected fixture contract", () => {
  const parsed = [
    parseSanMateoStorytimes(fixtures.sanMateo, now),
    parseSouthSanFranciscoStorytimes(fixtures.southSanFrancisco, now),
    parseSanMateoCountyLibraryEvents(fixtures.countyLibrary, now),
    parseSanMateoCityEvents(fixtures.city, now),
    parseCuriOdysseyDailyEvents(fixtures.curiodyssey, now),
    parseBayAreaDiscoveryMuseumEvents(fixtures.discoveryMuseum, now),
    parseRedwoodCityEvents(fixtures.redwoodCity, now),
  ];

  parsed.forEach((events) => assert.ok(events.length > 0));
  parsed.flat().forEach((event) => {
    assert.match(event.sourceUrl, /^https:\/\//);
    assert.ok(new Date(event.endAt) > new Date(event.startAt));
    assert.ok(Number.isFinite(event.minAgeMonths));
    assert.ok(Number.isFinite(event.maxAgeMonths));
  });

  const redwoodEvent = parsed.at(-1)[0];
  assert.equal(redwoodEvent.city, "Redwood City");
  assert.equal(redwoodEvent.age, "2-5세");
  assert.equal(new Date(redwoodEvent.endAt) - new Date(redwoodEvent.startAt), 30 * 60000);
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

test("Redwood City month calendars add Shores library and family events beyond the short RSS window", () => {
  const libraryEvents = parseRedwoodCityCalendarPage(
    fixtures.redwoodCityLibraryCalendar,
    now,
    "library",
    "https://www.redwoodcity.org/departments/library/events/kids-calendar-events/-curm-7/-cury-2026",
  );
  const familyEvents = parseRedwoodCityCalendarPage(
    fixtures.redwoodCityFamilyCalendar,
    now,
    "city",
    "https://www.redwoodcity.org/residents/redwood-city-events/city-events-calendar/-curm-7/-cury-2026",
  );

  assert.equal(libraryEvents.length, 1);
  assert.equal(libraryEvents[0].sourceKey, "redwood-city-library-calendar");
  assert.equal(libraryEvents[0].city, "Redwood City");
  assert.equal(libraryEvents[0].age, "2-5세");
  assert.match(libraryEvents[0].sourceUrl, /^https:\/\/www\.redwoodcity\.org\//);
  assert.equal(familyEvents.length, 1);
  assert.equal(familyEvents[0].sourceKey, "redwood-city-family-calendar");
  assert.equal(new Date(familyEvents[0].endAt) - new Date(familyEvents[0].startAt), 120 * 60000);
});

test("museum-wide programs carry an end time instead of a six-hour grace window", () => {
  const curiodyssey = parseCuriOdysseyDailyEvents(fixtures.curiodyssey, now)[0];
  const discoveryMuseum = parseBayAreaDiscoveryMuseumEvents(fixtures.discoveryMuseum, now)[0];

  assert.equal(new Date(curiodyssey.endAt) - new Date(curiodyssey.startAt), 150 * 60000);
  assert.equal(new Date(discoveryMuseum.endAt) - new Date(discoveryMuseum.startAt), 360 * 60000);
});
