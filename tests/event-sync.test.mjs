import assert from "node:assert/strict";
import test from "node:test";

import {
  eventCountLooksAnomalous,
  parseBayAreaDiscoveryMuseumEvents,
  parseBurlingameLibraryEvents,
  parseCampbellFamilyEvents,
  parseCupertinoFamilyEvents,
  parseCuriOdysseyDailyEvents,
  parseLosGatosFamilyEvents,
  parseLosGatosLibraryEvents,
  parseMenloParkFamilyEvents,
  parseMountainViewLibraryEvents,
  parsePaloAltoFamilyEvents,
  parseRedwoodCityEvents,
  parseSantaClaraCityEvents,
  parseSantaClaraLibraryEvents,
  parseSanFranciscoLibraryEvents,
  parseSanFranciscoRecParkEvents,
  parseSanMateoCityEvents,
  parseSanMateoCountyLibraryEvents,
  parseSanMateoStorytimes,
  parseSouthSanFranciscoStorytimes,
  redwoodCityEffectiveEnd,
  sanFranciscoLibraryCalendarUrls,
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
  paloAltoLibrary: `
    <rss><channel><item><title>Little Ones Storytime</title><category>Kids Storytimes</category><category>Babies (under 2)</category><category>Pre-schoolers (3-5)</category>
      <bc:is_cancelled>false</bc:is_cancelled><bc:is_virtual>false</bc:is_virtual><bc:start_date>2026-07-15T17:30:00.000Z</bc:start_date><bc:end_date>2026-07-15T18:00:00.000Z</bc:end_date><bc:start_date_local>2026-07-15T10:30:00</bc:start_date_local>
      <link>https://paloalto.bibliocommons.com/events/fixture</link><bc:location><bc:name>Children's Library</bc:name><bc:city>Palo Alto</bc:city><bc:number>1276</bc:number><bc:street>Harriet St</bc:street><bc:latitude>37.4462</bc:latitude><bc:longitude>-122.1478</bc:longitude></bc:location><bc:registration_info><bc:is_required>false</bc:is_required><bc:is_full>false</bc:is_full></bc:registration_info></item></channel></rss>
  `,
  menloPark: `
    <h3>Storytime schedule</h3><table><tbody><tr><td>Tuesdays</td><td>7:15 p.m.</td><td>Belle Haven Library<br>100 Terminal Ave.</td></tr></tbody></table>
    <div class="list-item-container homepage-show"><article><a href="https://www.menlopark.gov/events/family-puppet"><h2 class="list-item-title">Family Puppet Show</h2><p class="event-date published-on small-text">Saturday, July 18, 2026 | 10:00 AM to 11:00 AM</p><p>Stories and puppets for little ones.</p><p class="list-item-address">Menlo Park Library, 800 Alma St., Menlo Park, CA 94025</p><p class="tagged-as-list">Events for families, Events for children</p></a></article></div>
  `,
  mountainViewLibrary: JSON.stringify([{ id: 1, title: "Toddler Storytime", start: "2026-07-16T10:30:00", end: "2026-07-16T11:00:00", url: "https://mountainview.libcal.com/event/1", short_desc: "Stories and songs for toddlers.", location: "1st Floor Program Room", audiences: "Toddlers, Families", categories: "Storytime", in_person_registration: false }]),
  cupertinoLibrary: `
    <rss><channel><item><title>Toddler Storytime</title><category>Early Learning &amp; Storytimes</category><category>Kids: Toddlers</category>
      <bc:is_cancelled>false</bc:is_cancelled><bc:is_virtual>false</bc:is_virtual><bc:start_date>2026-07-16T17:30:00.000Z</bc:start_date><bc:end_date>2026-07-16T18:00:00.000Z</bc:end_date><bc:start_date_local>2026-07-16T10:30:00</bc:start_date_local>
      <link>https://sccl.bibliocommons.com/events/fixture</link><bc:location><bc:name>Cupertino Library</bc:name><bc:city>Cupertino</bc:city><bc:number>10800</bc:number><bc:street>Torre Ave</bc:street><bc:latitude>37.3183</bc:latitude><bc:longitude>-122.0287</bc:longitude></bc:location><bc:registration_info><bc:is_required>false</bc:is_required><bc:is_full>false</bc:is_full></bc:registration_info></item></channel></rss>
  `,
  cupertinoCity: `
    <div class="list-item-container homepage-show"><article><a href="https://www.cupertino.gov/events/family-movie"><h2 class="list-item-title">Movies in the Park</h2><p class="clearfix"><span class="list-item-block-date"><span class="part-date">18</span><span class="part-month">Jul</span><span class="part-year">2026</span></span><span class="list-item-block-desc">A free family movie outdoors.</span></p><p class="list-item-address">Creekside Park, 10455 Miller Avenue, Cupertino, CA 95014</p><p class="tagged-as-list">Kids &amp; family, City Wide Events</p></a></article></div>
  `,
  santaClaraLibrary: `
    <rss><channel><item><title>NORTHSIDE: Baby &amp; Me Storytime (0-1.5 years) (07/22/2026 10:30 AM - 11:00 AM)</title>
      <description>Storytime for babies from birth to 1.5 years old with songs and fingerplays.</description>
      <link>https://www.santaclaraca.gov/Home/Components/Calendar/Event/fixture/</link>
      <eventStartDate>7/22/2026 10:30:00 AM</eventStartDate><eventEndDate>7/22/2026 11:00:00 AM</eventEndDate>
    </item></channel></rss>
  `,
  santaClaraCity: `
    <rss><channel><item><title>Celebrate Santa Clara Family Night Market (07/18/2026 2:00 PM - 4:00 PM)</title>
      <description>A free family night market celebration with music and kids activities.</description>
      <link>https://www.santaclaraca.gov/Home/Components/Calendar/Event/city-fixture/</link>
      <eventStartDate>7/18/2026 2:00:00 PM</eventStartDate><eventEndDate>7/18/2026 4:00:00 PM</eventEndDate>
    </item></channel></rss>
  `,
  campbellLibrary: `
    <rss><channel><item><title>Toddler Storytime</title><category>Early Learning &amp; Storytimes</category><category>Kids: Toddlers</category>
      <bc:is_cancelled>false</bc:is_cancelled><bc:is_virtual>false</bc:is_virtual><bc:start_date>2026-07-22T17:30:00.000Z</bc:start_date><bc:end_date>2026-07-22T18:00:00.000Z</bc:end_date><bc:start_date_local>2026-07-22T10:30:00</bc:start_date_local>
      <link>https://sccl.bibliocommons.com/events/campbell-fixture</link><bc:location><bc:name>Campbell Library</bc:name><bc:city>Campbell</bc:city><bc:number>77</bc:number><bc:street>Harrison Ave</bc:street><bc:latitude>37.2882</bc:latitude><bc:longitude>-121.9432</bc:longitude></bc:location><bc:registration_info><bc:is_required>false</bc:is_required><bc:is_full>false</bc:is_full></bc:registration_info></item></channel></rss>
  `,
  campbellCity: `
    <div class="hidden" itemscope itemtype="http://schema.org/Event"><span itemprop="name">Touch-A-Truck Family Day</span><span itemprop="startDate">2026-07-18T09:30:00</span><p itemprop="description">Families and kids can explore community vehicles for free.</p><span itemprop="location"><span itemprop="name">Campbell Community Center</span><span itemprop="address"><span itemprop="streetAddress">1 W. Campbell Ave.</span></span></span></div><p></p>
  `,
  losGatosLibrary: JSON.stringify([{ id: 2, title: "Storytime (Ages 0-5)", start: "2026-07-21T11:00:00", end: "2026-07-21T11:30:00", url: "https://losgatosca.libcal.com/event/2", short_desc: "Babies, toddlers, and their families sing, read, and dance together.", location: "Children's Room", audiences: "Children", categories: "Kids, Storytime", in_person_registration: false }]),
  losGatosCity: `
    <div class="hidden" itemscope itemtype="http://schema.org/Event"><span itemprop="name">Los Gatos Music in the Park</span><span itemprop="startDate">2026-07-26T17:00:00</span><p itemprop="description">A family-friendly outdoor concert.</p><span itemprop="location"><span itemprop="name">Civic Center Lawn</span><span itemprop="address"><span itemprop="streetAddress">110 E. Main Street</span></span></span></div><p></p>
  `,
  sanFranciscoLibrary: `
    <div data-views-row-index="0" class="geolocation-location js-hide" data-lat="37.7753" data-lng="-122.393">
      <h4 class="field-content">Mission Bay</h4><a href="/locations/mission-bay">View branch page</a>
      <span class="address-line1">960 4th Street</span><span class="postal-code">94158</span>
    </div>
    <article about="/events/2026/07/13/storytime-toddlers" class="event event--teaser event--babies-toddlers-or-preschoolers teaser">
      <span class="date-display-range">Monday, 7/13/2026, 10:30 - 11:00</span>
      <h2 class="event__title"><span>Storytime: For Toddlers</span></h2>
      <div class="event__audience">Babies, Toddlers or Preschoolers</div>
      <div class="event__location"><a href="/locations/mission-bay">Mission Bay</a></div>
    </article>
    <article about="/events/2026/07/14/activity-family-music" class="event event--teaser event--babies-toddlers-or-preschoolers teaser">
      <span class="date-display-range">Tuesday, 7/14/2026, 3:00 - 3:45</span>
      <h2 class="event__title"><span>Activity: Family Music Circle</span></h2>
      <div class="event__audience">Babies, Toddlers or Preschoolers</div>
      <div class="event__location"><a href="/locations/mission-bay">Mission Bay</a></div>
    </article>
    <article about="/events/2026/07/15/canceled-storytime" class="event event--teaser event--babies-toddlers-or-preschoolers teaser">
      <span class="date-display-range">Wednesday, 7/15/2026, 10:30 - 11:00</span>
      <h2 class="event__title"><span>Canceled Storytime: For Families</span></h2>
      <div class="event__audience">Babies, Toddlers or Preschoolers</div>
      <div class="event__location"><a href="/locations/mission-bay">Mission Bay</a></div>
    </article>
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
    parseSanMateoCountyLibraryEvents(fixtures.paloAltoLibrary, now, "palo-alto-library-family-events", "Palo Alto City Library"),
    parseMenloParkFamilyEvents(fixtures.menloPark, now),
    parseMountainViewLibraryEvents(fixtures.mountainViewLibrary, now),
    parseSanMateoCountyLibraryEvents(fixtures.cupertinoLibrary, now, "cupertino-library-family-events", "Santa Clara County Library District"),
    parseCupertinoFamilyEvents(fixtures.cupertinoCity, now),
    parseSantaClaraLibraryEvents(fixtures.santaClaraLibrary, now),
    parseSantaClaraCityEvents(fixtures.santaClaraCity, now),
    parseSanMateoCountyLibraryEvents(fixtures.campbellLibrary, now, "campbell-library-family-events", "Santa Clara County Library District"),
    parseCampbellFamilyEvents(fixtures.campbellCity, now),
    parseLosGatosLibraryEvents(fixtures.losGatosLibrary, now),
    parseLosGatosFamilyEvents(fixtures.losGatosCity, now),
    parseSanFranciscoLibraryEvents(fixtures.sanFranciscoLibrary, now),
    parseSanFranciscoRecParkEvents(fixtures.sanFranciscoRecPark, now),
  ];

  parsed.forEach((events) => assert.ok(events.length > 0));
  parsed.flat().forEach((event) => {
    assert.match(event.sourceUrl, /^https:\/\//);
    assert.ok(new Date(event.endAt) > new Date(event.startAt));
    assert.ok(Number.isFinite(event.minAgeMonths));
    assert.ok(Number.isFinite(event.maxAgeMonths));
  });

  const allEvents = parsed.flat();
  const redwoodEvent = allEvents.find((event) => event.sourceKey === "redwood-city-family-events");
  assert.equal(redwoodEvent.city, "Redwood City");
  assert.equal(redwoodEvent.age, "2-5세");
  assert.equal(new Date(redwoodEvent.endAt) - new Date(redwoodEvent.startAt), 30 * 60000);

  const burlingameEvent = allEvents.find((event) => event.sourceKey === "burlingame-library-family-events");
  assert.equal(burlingameEvent.city, "Burlingame");
  assert.equal(burlingameEvent.age, "0-2세");
  assert.equal(new Date(burlingameEvent.endAt) - new Date(burlingameEvent.startAt), 30 * 60000);

  const paloAltoEvent = allEvents.find((event) => event.sourceKey === "palo-alto-family-events");
  assert.equal(paloAltoEvent.city, "Palo Alto");
  assert.equal(paloAltoEvent.confidenceStatus, "date_confirmed");

  assert.ok(allEvents.some((event) => event.sourceKey === "palo-alto-library-family-events" && event.city === "Palo Alto"));
  assert.ok(allEvents.some((event) => event.sourceKey === "menlo-park-family-events" && event.city === "Menlo Park"));
  assert.ok(allEvents.some((event) => event.sourceKey === "mountain-view-library-family-events" && event.city === "Mountain View"));
  assert.ok(allEvents.some((event) => event.sourceKey === "cupertino-library-family-events" && event.city === "Cupertino"));
  assert.ok(allEvents.some((event) => event.sourceKey === "cupertino-family-events" && event.city === "Cupertino"));
  assert.ok(allEvents.some((event) => event.sourceKey === "santa-clara-library-family-events" && event.city === "Santa Clara"));
  assert.ok(allEvents.some((event) => event.sourceKey === "santa-clara-family-events" && event.city === "Santa Clara"));
  assert.ok(allEvents.some((event) => event.sourceKey === "campbell-library-family-events" && event.city === "Campbell"));
  assert.ok(allEvents.some((event) => event.sourceKey === "campbell-family-events" && event.city === "Campbell"));
  assert.ok(allEvents.some((event) => event.sourceKey === "los-gatos-library-family-events" && event.city === "Los Gatos"));
  assert.ok(allEvents.some((event) => event.sourceKey === "los-gatos-family-events" && event.city === "Los Gatos"));
  assert.ok(allEvents.some((event) => event.sourceKey === "san-francisco-library-family-events" && event.city === "San Francisco"));

  const sanFranciscoEvent = allEvents.find((event) => event.sourceKey === "sf-rec-park-family-events");
  assert.equal(sanFranciscoEvent.city, "San Francisco");
  assert.equal(sanFranciscoEvent.age, "1-6세·가족");
});

test("source health requires success, freshness, and active future events", () => {
  const healthy = {
    status: "ok",
    last_success_at: "2026-07-12T15:00:00.000Z",
    active_event_count: 4,
    data_revision: 6,
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

test("south peninsula and west valley sources retain toddler-friendly branch coverage", () => {
  const paloAlto = parseSanMateoCountyLibraryEvents(fixtures.paloAltoLibrary, now, "palo-alto-library-family-events", "Palo Alto City Library");
  const menloPark = parseMenloParkFamilyEvents(fixtures.menloPark, now);
  const mountainView = parseMountainViewLibraryEvents(fixtures.mountainViewLibrary, now);
  const cupertinoLibrary = parseSanMateoCountyLibraryEvents(fixtures.cupertinoLibrary, now, "cupertino-library-family-events", "Santa Clara County Library District");
  const cupertinoCity = parseCupertinoFamilyEvents(fixtures.cupertinoCity, now);

  assert.ok(paloAlto.some((event) => event.city === "Palo Alto" && event.minAgeMonths === 0));
  assert.ok(menloPark.filter((event) => event.type === "storytime").length >= 6);
  assert.ok(mountainView.some((event) => event.city === "Mountain View" && event.name === "Toddler Storytime"));
  assert.ok(cupertinoLibrary.some((event) => event.city === "Cupertino" && event.type === "storytime"));
  assert.ok(cupertinoCity.some((event) => event.city === "Cupertino" && event.confidenceStatus === "date_confirmed"));
});

test("Santa Clara, Campbell, and Los Gatos retain both library and local-event coverage", () => {
  const santaClaraLibrary = parseSantaClaraLibraryEvents(fixtures.santaClaraLibrary, now);
  const santaClaraCity = parseSantaClaraCityEvents(fixtures.santaClaraCity, now);
  const campbellLibrary = parseSanMateoCountyLibraryEvents(fixtures.campbellLibrary, now, "campbell-library-family-events", "Santa Clara County Library District");
  const campbellCity = parseCampbellFamilyEvents(fixtures.campbellCity, now);
  const losGatosLibrary = parseLosGatosLibraryEvents(fixtures.losGatosLibrary, now);
  const losGatosCity = parseLosGatosFamilyEvents(fixtures.losGatosCity, now);

  assert.ok(santaClaraLibrary.some((event) => event.city === "Santa Clara" && event.type === "storytime" && event.maxAgeMonths <= 18));
  assert.ok(santaClaraCity.some((event) => event.city === "Santa Clara" && event.type === "seasonal"));
  assert.ok(campbellLibrary.some((event) => event.city === "Campbell" && event.type === "storytime"));
  assert.ok(campbellCity.some((event) => event.city === "Campbell" && event.name.includes("Touch-A-Truck")));
  assert.ok(losGatosLibrary.some((event) => event.city === "Los Gatos" && event.name === "Storytime (Ages 0-5)"));
  assert.ok(losGatosCity.some((event) => event.city === "Los Gatos" && event.name === "Los Gatos Music in the Park"));
});

test("San Francisco library coverage keeps paginated branch-level early-childhood events", () => {
  const urls = sanFranciscoLibraryCalendarUrls(now);
  const events = parseSanFranciscoLibraryEvents(fixtures.sanFranciscoLibrary, now);

  assert.equal(urls.length, 12);
  assert.ok(urls.every((url) => url.includes("field_event_audience_target_id=26")));
  assert.ok(urls.every((url) => url.includes("items_per_page=50")));
  assert.ok(urls.some((url) => url.endsWith("page=11")));
  assert.equal(events.length, 2);
  assert.ok(events.every((event) => event.city === "San Francisco" && event.sourceName === "San Francisco Public Library"));
  assert.ok(events.every((event) => event.sourceUrl.startsWith("https://sfpl.org/events/2026/")));
  assert.ok(events.every((event) => event.latitude === 37.7753 && event.longitude === -122.393));
  assert.equal(events[0].age, "18개월-3세");
  assert.equal(new Date(events[0].endAt) - new Date(events[0].startAt), 30 * 60000);
  assert.equal(new Date(events[1].endAt) - new Date(events[1].startAt), 45 * 60000);
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
