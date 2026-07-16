import assert from "node:assert/strict";
import test from "node:test";

import {
  eventCountLooksAnomalous,
  parseBayAreaDiscoveryMuseumEvents,
  parseBurlingameLibraryEvents,
  parseCuriOdysseyDailyEvents,
  parsePaloAltoFamilyEvents,
  parseRedwoodCityEvents,
  parseSanFranciscoRecParkEvents,
  parseSanMateoCityEvents,
  parseSanMateoCountyLibraryEvents,
  parseSanMateoStorytimes,
  parseSouthSanFranciscoStorytimes,
  redwoodCityEffectiveEnd,
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
  burlingame: `
    <div class="calendars"><ol><li>
      <h3><span>Baby Storytime for Ages 0 - 2 Years</span></h3>
      <div class="subHeader"><div class="date">July&nbsp;13,&nbsp;2026,&nbsp;10:30 AM&thinsp;-&thinsp;11:00 AM</div><div class="eventLocation"><div class="name">Lane Community Room, Burlingame Public Library, Main</div></div></div>
      <p class="icalDescription">Stories and songs for babies and their families.</p>
    </li></ol></div>
  `,
  paloAlto: `
    <div class="list-item-container homepage-show"><article>
      <a href="https://www.paloalto.gov/Events-Directory/Community-Services/Family-Movie-Night-Series-2026">
        <h2 class="list-item-title">Family Movie Night Series 2026</h2>
        <p class="clearfix"><span class="list-item-block-date"><span class="part-date">17</span><span class="part-month">Jul</span><span class="part-year">2026</span></span>
        <span class="list-item-block-desc">Join the Community Services Department for Family Movie Night.</span></p>
        <p class="list-item-address">Mitchell Park Athletic Field, 600 East Meadow Drive, Palo Alto, CA 94303</p>
        <p class="tagged-as-list">Community Events</p>
      </a>
    </article></div>
  `,
  sanFranciscoRecPark: `
    <li><h3><a id="eventTitle_10044"><span>Union Square Daily Programming: Toddler Tuesdays</span></a></h3>
      <div class="hidden" itemscope itemtype="http://schema.org/Event"><span itemprop="name">Union Square Daily Programming: Toddler Tuesdays</span><span itemprop="startDate">2026-07-14T10:00:00</span><p itemprop="description">Come out for Toddler Tuesdays from 10 am to 11:30 am.</p>
      <span itemprop="location"><span itemprop="name">Union Square</span><span itemprop="address"><span itemprop="streetAddress">Post and Stockton</span></span></span></div><p>Toddler Tuesdays</p>
    </li>
  `,
};

test("all official-source parser families retain their expected fixture contract", () => {
  const parsed = [
    parseSanMateoStorytimes(fixtures.sanMateo, now),
    parseSouthSanFranciscoStorytimes(fixtures.southSanFrancisco, now),
    parseSanMateoCountyLibraryEvents(fixtures.countyLibrary, now),
    parseSanMateoCityEvents(fixtures.city, now),
    parseCuriOdysseyDailyEvents(fixtures.curiodyssey, now),
    parseBayAreaDiscoveryMuseumEvents(fixtures.discoveryMuseum, now),
    parseRedwoodCityEvents(fixtures.redwoodCity, now),
    parseBurlingameLibraryEvents(fixtures.burlingame, now),
    parsePaloAltoFamilyEvents(fixtures.paloAlto, now),
    parseSanFranciscoRecParkEvents(fixtures.sanFranciscoRecPark, now),
  ];

  parsed.forEach((events) => assert.ok(events.length > 0));
  parsed.flat().forEach((event) => {
    assert.match(event.sourceUrl, /^https:\/\//);
    assert.ok(new Date(event.endAt) > new Date(event.startAt));
    assert.ok(Number.isFinite(event.minAgeMonths));
    assert.ok(Number.isFinite(event.maxAgeMonths));
  });

  const redwoodEvent = parsed.at(-4)[0];
  assert.equal(redwoodEvent.city, "Redwood City");
  assert.equal(redwoodEvent.age, "2-5세");
  assert.equal(new Date(redwoodEvent.endAt) - new Date(redwoodEvent.startAt), 30 * 60000);

  const burlingameEvent = parsed.at(-3)[0];
  assert.equal(burlingameEvent.city, "Burlingame");
  assert.equal(burlingameEvent.age, "0-2세");
  assert.equal(new Date(burlingameEvent.endAt) - new Date(burlingameEvent.startAt), 30 * 60000);

  const paloAltoEvent = parsed.at(-2)[0];
  assert.equal(paloAltoEvent.city, "Palo Alto");
  assert.equal(paloAltoEvent.confidenceStatus, "date_confirmed");

  const sanFranciscoEvent = parsed.at(-1)[0];
  assert.equal(sanFranciscoEvent.city, "San Francisco");
  assert.equal(sanFranciscoEvent.age, "1-6세·가족");
});

test("source health requires success, freshness, and active future events", () => {
  const healthy = {
    status: "ok",
    last_success_at: "2026-07-12T15:00:00.000Z",
    active_event_count: 4,
    data_revision: 3,
  };

  assert.equal(sourceIsCurrent(healthy, now), true);
  assert.equal(sourceIsCurrent({ ...healthy, status: "failed" }, now), false);
  assert.equal(sourceIsCurrent({ ...healthy, active_event_count: 0 }, now), false);
  assert.equal(sourceIsCurrent({ ...healthy, data_revision: 1 }, now), false);
  assert.equal(sourceIsCurrent({ ...healthy, last_success_at: "2026-07-12T08:00:00.000Z" }, now), false);
});

test("Redwood City recurring library programs extend beyond the short RSS window", () => {
  const events = parseRedwoodCityEvents(fixtures.redwoodCity, now);
  assert.ok(events.length >= 6);
  assert.ok(events.every((event) => event.city === "Redwood City"));
  assert.equal(events[0].age, "2-5세");
  assert.equal(new Date(events[1].startAt) - new Date(events[0].startAt), 7 * 86400000);
  assert.ok(new Date(events.at(-1).startAt) - new Date(events[0].startAt) >= 35 * 86400000);
  assert.equal(events[0].confidenceStatus, "source_confirmed");
  assert.ok(events.slice(1).every((event) => event.confidenceStatus === "recurring_estimate"));
});

test("Redwood City end-of-day placeholders use a practical program duration", () => {
  const start = { time: "6:00 PM", iso: "2026-07-16T01:00:00.000Z" };
  const placeholderEnd = { time: "11:59 PM", iso: "2026-07-16T06:59:00.000Z" };
  const normalEnd = { time: "7:00 PM", iso: "2026-07-16T02:00:00.000Z" };

  assert.equal(
    redwoodCityEffectiveEnd("Library Music in the Park", start, placeholderEnd),
    "2026-07-16T03:00:00.000Z",
  );
  assert.equal(redwoodCityEffectiveEnd("Family Storytime", start, placeholderEnd), "2026-07-16T02:30:00.000Z");
  assert.equal(redwoodCityEffectiveEnd("Family Storytime", start, normalEnd), normalEnd.iso);
});

test("county branch storytimes extend beyond each short branch RSS window", () => {
  const events = parseSanMateoCountyLibraryEvents(fixtures.countyLibrary, now, "smcl-belmont-family-events");
  assert.ok(events.length >= 6);
  assert.ok(events.every((event) => event.sourceKey === "smcl-belmont-family-events"));
  assert.ok(new Date(events.at(-1).startAt) - new Date(events[0].startAt) >= 35 * 86400000);
  assert.ok(events.slice(1).every((event) => event.confidenceStatus === "recurring_estimate"));
});

test("source count anomaly guard catches parser collapses without flagging normal drift", () => {
  assert.equal(eventCountLooksAnomalous(40, 6), true);
  assert.equal(eventCountLooksAnomalous(40, 12), false);
  assert.equal(eventCountLooksAnomalous(7, 1), false);
});

test("museum-wide programs carry an end time instead of a six-hour grace window", () => {
  const curiodyssey = parseCuriOdysseyDailyEvents(fixtures.curiodyssey, now)[0];
  const discoveryMuseum = parseBayAreaDiscoveryMuseumEvents(fixtures.discoveryMuseum, now)[0];

  assert.equal(new Date(curiodyssey.endAt) - new Date(curiodyssey.startAt), 150 * 60000);
  assert.equal(new Date(discoveryMuseum.endAt) - new Date(discoveryMuseum.startAt), 360 * 60000);
});
