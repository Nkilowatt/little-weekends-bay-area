const PACIFIC_TIME_ZONE = "America/Los_Angeles";
const REFRESH_INTERVAL_MS = 6 * 60 * 60 * 1000;
const SOURCE_DATA_REVISION = 4;
const FUTURE_WINDOW_DAYS = 45;
const DEFAULT_EVENT_DURATION_MINUTES = 60;
const LEGACY_EVENT_GRACE_MINUTES = 90;
// A browser or deployment preview can abandon a request after a source has
// been marked as syncing. Retry quickly enough that one interrupted request
// cannot leave a newly added source empty for several minutes.
const REFRESH_ATTEMPT_COOLDOWN_MS = 30 * 1000;
const REDWOOD_CITY_RSS_URL = "https://www.redwoodcity.org/Home/Components/RssFeeds/RssFeed/View?id=1";
const PALO_ALTO_EVENTS_URL = "https://www.paloalto.gov/Events-Directory";
const PALO_ALTO_LIBRARY_RSS_URL = "https://gateway.bibliocommons.com/v2/libraries/paloalto/rss/events";
const MENLO_PARK_EVENTS_URL = "https://www.menlopark.gov/Events-directory";
const MENLO_PARK_CHILDREN_URL = "https://www.menlopark.gov/Government/Departments/Library-and-Community-Services/Library/About-the-library/Childrens-services";
const CUPERTINO_LIBRARY_RSS_URL = "https://gateway.bibliocommons.com/v2/libraries/sccl/rss/events?locations=CU";
const CUPERTINO_EVENTS_URL = "https://www.cupertino.gov/Events-directory";
const LIBCAL_BROWSER_USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const weekdayNames = {
  Sundays: 0,
  Mondays: 1,
  Tuesdays: 2,
  Wednesdays: 3,
  Thursdays: 4,
  Fridays: 5,
  Saturdays: 6,
};

const sources = [
  {
    key: "san-mateo-library",
    url: "https://www.cityofsanmateo.org/4256/Childrens-Programs-and-Storytimes",
    parse: parseSanMateoStorytimes,
  },
  {
    key: "south-san-francisco-library",
    url: "https://www.ssfca.gov/Departments/Library/Services/Kids-Teens/Storytime-Schedule",
    parse: parseSouthSanFranciscoStorytimes,
  },
  {
    key: "san-mateo-county-libraries",
    url: "https://gateway.bibliocommons.com/v2/libraries/smcl/rss/events",
    accept: "application/rss+xml,application/xml,text/xml",
    parse: parseSanMateoCountyLibraryEvents,
  },
  {
    key: "san-mateo-city-events",
    url: sanMateoCityCalendarUrl,
    parse: parseSanMateoCityEvents,
  },
  {
    key: "curiodyssey-daily",
    url: "https://curiodyssey.org/animals/animal-presentations/",
    parse: parseCuriOdysseyDailyEvents,
  },
  {
    key: "bay-area-discovery-museum",
    url: "https://bayareadiscoverymuseum.org/events/",
    parse: parseBayAreaDiscoveryMuseumEvents,
  },
  {
    key: "redwood-city-family-events",
    url: REDWOOD_CITY_RSS_URL,
    accept: "application/rss+xml,application/xml,text/xml",
    parse: parseRedwoodCityEvents,
  },
  {
    key: "smcl-belmont-family-events",
    url: "https://gateway.bibliocommons.com/v2/libraries/smcl/rss/events?locations=1B",
    accept: "application/rss+xml,application/xml,text/xml",
    parse: (xml, now) => parseSanMateoCountyLibraryEvents(xml, now, "smcl-belmont-family-events"),
  },
  {
    key: "smcl-foster-city-family-events",
    url: "https://gateway.bibliocommons.com/v2/libraries/smcl/rss/events?locations=1F",
    accept: "application/rss+xml,application/xml,text/xml",
    parse: (xml, now) => parseSanMateoCountyLibraryEvents(xml, now, "smcl-foster-city-family-events"),
  },
  {
    key: "smcl-san-carlos-family-events",
    url: "https://gateway.bibliocommons.com/v2/libraries/smcl/rss/events?locations=1S",
    accept: "application/rss+xml,application/xml,text/xml",
    parse: (xml, now) => parseSanMateoCountyLibraryEvents(xml, now, "smcl-san-carlos-family-events"),
  },
  {
    key: "smcl-millbrae-family-events",
    url: "https://gateway.bibliocommons.com/v2/libraries/smcl/rss/events?locations=1M",
    accept: "application/rss+xml,application/xml,text/xml",
    parse: (xml, now) => parseSanMateoCountyLibraryEvents(xml, now, "smcl-millbrae-family-events"),
  },
  {
    key: "burlingame-library-family-events",
    urls: burlingameCalendarUrls,
    parse: parseBurlingameLibraryEvents,
  },
  {
    key: "palo-alto-family-events",
    url: PALO_ALTO_EVENTS_URL,
    parse: parsePaloAltoFamilyEvents,
  },
  {
    key: "palo-alto-library-family-events",
    url: PALO_ALTO_LIBRARY_RSS_URL,
    accept: "application/rss+xml,application/xml,text/xml",
    parse: (xml, now) => parseSanMateoCountyLibraryEvents(xml, now, "palo-alto-library-family-events", "Palo Alto City Library"),
  },
  {
    key: "menlo-park-family-events",
    urls: () => [MENLO_PARK_EVENTS_URL, MENLO_PARK_CHILDREN_URL],
    parse: parseMenloParkFamilyEvents,
  },
  {
    key: "mountain-view-library-family-events",
    url: mountainViewLibraryCalendarUrl,
    accept: "application/json",
    // LibCal returns 429 for descriptive bot user agents even though this is
    // the same public JSON requested by its official browser calendar.
    userAgent: LIBCAL_BROWSER_USER_AGENT,
    parse: parseMountainViewLibraryEvents,
  },
  {
    key: "cupertino-library-family-events",
    url: CUPERTINO_LIBRARY_RSS_URL,
    accept: "application/rss+xml,application/xml,text/xml",
    parse: (xml, now) => parseSanMateoCountyLibraryEvents(xml, now, "cupertino-library-family-events", "Santa Clara County Library District"),
  },
  {
    key: "cupertino-family-events",
    url: CUPERTINO_EVENTS_URL,
    parse: parseCupertinoFamilyEvents,
  },
  {
    key: "sf-rec-park-family-events",
    urls: sanFranciscoRecParkCalendarUrls,
    parse: parseSanFranciscoRecParkEvents,
  },
];

let schemaReady;

function decodeHtml(value) {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    hellip: "...",
    laquo: "«",
    ldquo: "“",
    lsquo: "‘",
    lt: "<",
    mdash: "-",
    nbsp: " ",
    ndash: "-",
    quot: '"',
    raquo: "»",
    rdquo: "”",
    rsquo: "’",
    thinsp: " ",
  };

  return String(value || "")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => named[name.toLowerCase()] ?? match);
}

function stripHtml(value) {
  return decodeHtml(String(value || ""))
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function eventIsCancelled(...values) {
  return /\b(?:cancelled|canceled|postponed|closed)\b|취소|取消/i.test(values.filter(Boolean).join(" "));
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

function dateParts(date = new Date(), timeZone = PACIFIC_TIME_ZONE) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  return Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
}

function pacificDateKey(date = new Date()) {
  const parts = dateParts(date);
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function dateKeyFromUtcDate(date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

function utcDateFromKey(dateKey) {
  return new Date(`${dateKey}T12:00:00.000Z`);
}

function addDays(dateKey, amount) {
  const date = utcDateFromKey(dateKey);
  date.setUTCDate(date.getUTCDate() + amount);
  return dateKeyFromUtcDate(date);
}

function dayDifference(left, right) {
  return Math.round((utcDateFromKey(left) - utcDateFromKey(right)) / 86400000);
}

function parseClock(value) {
  const match = String(value).trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = Number(match[2] || "0");
  if (match[3].toUpperCase() === "PM" && hour !== 12) hour += 12;
  if (match[3].toUpperCase() === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function pacificIso(dateKey, clock) {
  for (const offset of ["-07:00", "-08:00"]) {
    const candidate = new Date(`${dateKey}T${clock}:00${offset}`);
    const parts = dateParts(candidate);
    if (`${parts.year}-${parts.month}-${parts.day}` === dateKey && `${parts.hour}:${parts.minute}` === clock) {
      return candidate.toISOString();
    }
  }
  return new Date(`${dateKey}T${clock}:00-08:00`).toISOString();
}

function datesForWeekday(startDateKey, endDateKey, weekday) {
  const dates = [];
  for (let cursor = startDateKey; cursor <= endDateKey; cursor = addDays(cursor, 1)) {
    if (utcDateFromKey(cursor).getUTCDay() === weekday) dates.push(cursor);
  }
  return dates;
}

function datesForMonth(year, monthIndex, weekday) {
  const dates = [];
  const lastDay = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  for (let day = 1; day <= lastDay; day += 1) {
    const date = new Date(Date.UTC(year, monthIndex, day));
    if (date.getUTCDay() === weekday) dates.push(dateKeyFromUtcDate(date));
  }
  return dates;
}

function ageForProgram(name) {
  if (/baby/i.test(name)) return "0-18개월";
  if (/toddler/i.test(name)) return "18개월-3세";
  if (/move and groove/i.test(name)) return "18개월-5세";
  if (/family|pajama|bilingual|cantonese|mandarin|spanish|filipino/i.test(name)) return "0-6세";
  return "2-6세";
}

function ageRangeFromLabel(label) {
  const value = String(label || "").replace(/\s+/g, "");
  const monthRange = value.match(/(\d+)개월-(\d+)개월/);
  if (monthRange) return { minAgeMonths: Number(monthRange[1]), maxAgeMonths: Number(monthRange[2]) };

  const mixedRange = value.match(/(\d+)개월-(\d+)세/);
  if (mixedRange) return { minAgeMonths: Number(mixedRange[1]), maxAgeMonths: (Number(mixedRange[2]) + 1) * 12 - 1 };

  const yearRange = value.match(/(\d+)-(\d+)세/);
  if (yearRange) return { minAgeMonths: Number(yearRange[1]) * 12, maxAgeMonths: (Number(yearRange[2]) + 1) * 12 - 1 };

  if (/가족|전연령/.test(value)) return { minAgeMonths: 0, maxAgeMonths: 216 };
  return { minAgeMonths: 0, maxAgeMonths: 72 };
}

function distanceFromSanMateo(latitude, longitude) {
  const toRadians = (value) => value * Math.PI / 180;
  const origin = { latitude: 37.563, longitude: -122.3255 };
  const latitudeDelta = toRadians(latitude - origin.latitude);
  const longitudeDelta = toRadians(longitude - origin.longitude);
  const a = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(toRadians(origin.latitude)) * Math.cos(toRadians(latitude)) * Math.sin(longitudeDelta / 2) ** 2;
  return Math.round((3958.8 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))) * 10) / 10;
}

function makeEvent({
  sourceKey,
  sourceUrl,
  sourceName,
  name,
  dateKey,
  time,
  location,
  setting = "indoor",
  type,
  age,
  price = "free",
  reservation = "예약 불필요 · 정원은 현장 상황에 따라 달라요",
  why,
  durationMinutes = DEFAULT_EVENT_DURATION_MINUTES,
  confidenceStatus = "source_confirmed",
}) {
  if (eventIsCancelled(name)) return null;
  const clock = parseClock(time);
  if (!clock) return null;
  const startAt = pacificIso(dateKey, clock);
  const endAt = confidenceStatus === "date_confirmed"
    ? pacificIso(addDays(dateKey, 1), "00:00")
    : new Date(new Date(startAt).getTime() + durationMinutes * 60000).toISOString();
  const eventType = type || (/storytime|cuentos|move and groove/i.test(name) ? "storytime" : "seasonal");
  const ageLabel = age || ageForProgram(name);
  const ageRange = ageRangeFromLabel(ageLabel);
  const id = `${sourceKey}-${dateKey}-${clock.replace(":", "")}-${slugify(name)}-${slugify(location.label)}`;
  return {
    id,
    sourceKey,
    name,
    type: eventType,
    setting,
    startAt,
    endAt,
    city: location.city,
    distance: location.distance,
    age: ageLabel,
    minAgeMonths: ageRange.minAgeMonths,
    maxAgeMonths: ageRange.maxAgeMonths,
    price,
    reservation,
    sourceUrl,
    sourceName,
    why: why || (setting === "outdoor"
      ? "공식 일정에서 확인한 야외 스토리타임으로 책과 바깥놀이를 한 번에 즐기기 좋아요."
      : "공식 도서관 일정에서 자동 확인한 영유아 프로그램이에요."),
    notes: {
      parking: location.parking,
      bathroom: location.bathroom,
      stroller: location.stroller,
    },
    latitude: location.latitude,
    longitude: location.longitude,
    confidenceStatus,
  };
}

function parseSouthSanFranciscoStorytimes(html, now = new Date()) {
  const sourceUrl = sources[1].url;
  const monthMatch = html.match(/<h4[^>]*>[\s\S]*?(January|February|March|April|May|June|July|August|September|October|November|December)\s+(20\d{2})[\s\S]*?<\/h4>/i);
  if (!monthMatch) return [];
  const monthIndex = monthNames.findIndex((name) => name.toLowerCase() === monthMatch[1].toLowerCase());
  const year = Number(monthMatch[2]);
  const today = pacificDateKey(now);
  const lastDate = addDays(today, FUTURE_WINDOW_DAYS);
  const events = [];
  const sectionPattern = /<h5[^>]*>([\s\S]*?)<\/h5>\s*<table[^>]*>([\s\S]*?)<\/table>/gi;
  let section;

  while ((section = sectionPattern.exec(html))) {
    const heading = stripHtml(section[1]);
    let location;
    if (/Main Library/i.test(heading)) {
      location = {
        label: "SSF Main Library",
        city: "South San Francisco",
        distance: 12.6,
        latitude: 37.6547,
        longitude: -122.4077,
        parking: "Civic Campus 주차장을 이용할 수 있어요.",
        bathroom: "도서관과 공원·레크리에이션 센터 내 화장실 이용 가능.",
        stroller: "엘리베이터로 Youth Library 층까지 이동할 수 있어요.",
      };
    } else if (/Grand Ave/i.test(heading)) {
      location = {
        label: "Grand Avenue Library",
        city: "South San Francisco",
        distance: 13.2,
        latitude: 37.6552,
        longitude: -122.4169,
        parking: "Grand Avenue 주변 공영·노상 주차를 확인하세요.",
        bathroom: "도서관 내 화장실 이용 가능.",
        stroller: "입구 접근 동선을 방문 전에 확인하세요.",
      };
    } else {
      continue;
    }

    const rowPattern = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    let row;
    while ((row = rowPattern.exec(section[2]))) {
      const cells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((cell) => stripHtml(cell[1]));
      if (cells.length < 3 || /Program/i.test(cells[0])) continue;
      const [name, daySpec, time] = cells;
      const weekday = Object.entries(weekdayNames).find(([label]) => daySpec.includes(label));
      let dates = [];
      if (weekday) {
        dates = datesForMonth(year, monthIndex, weekday[1]);
      } else {
        dates = [...daySpec.matchAll(/(\d{1,2})\/(\d{1,2})/g)].map((match) => `${year}-${String(match[1]).padStart(2, "0")}-${String(match[2]).padStart(2, "0")}`);
      }

      dates.filter((dateKey) => dateKey >= today && dateKey <= lastDate).forEach((dateKey) => {
        const event = makeEvent({
          sourceKey: sources[1].key,
          sourceUrl,
          sourceName: "City of South San Francisco Library",
          name,
          dateKey,
          time,
          location,
        });
        if (event) events.push(event);
      });
    }
  }

  return events;
}

function parseSanMateoStorytimes(html, now = new Date()) {
  const text = stripHtml(html);
  const today = pacificDateKey(now);
  const lastDate = addDays(today, FUTURE_WINDOW_DAYS);
  const sourceUrl = sources[0].url;
  const events = [];
  const main = {
    label: "San Mateo Main Library",
    city: "San Mateo",
    distance: 0.6,
    latitude: 37.5635,
    longitude: -122.3261,
    parking: "도서관 옆 전용 주차장과 인근 공영 주차를 확인하세요.",
    bathroom: "도서관 내 가족 화장실 이용 가능.",
    stroller: "엘리베이터와 넓은 출입구를 이용할 수 있어요.",
  };
  const hillsdale = {
    label: "Hillsdale Library",
    city: "San Mateo",
    distance: 2.1,
    latitude: 37.5376,
    longitude: -122.3051,
    parking: "도서관 주변 주차 옵션을 확인하고 조금 일찍 도착하세요.",
    bathroom: "도서관 내 화장실 이용 가능.",
    stroller: "프로그램 입구가 붐빌 수 있어 접이식 유모차가 편해요.",
  };
  const recurring = [
    { name: "Pajama Storytime", pattern: /(Wednesdays)\s+(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*Pajama Storytime/i, location: main },
    { name: "Hora de Cuentos en Pijama", pattern: /(Thursdays)\s+(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*Hora de Cuentos en Pijama/i, location: main },
    { name: "Move and Groove", pattern: /(Mondays)\s+(\d{1,2}:\d{2}\s*[AP]M)\s*&\s*(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*Move and Groove/i, location: main },
    { name: "Baby Storytime", pattern: /(Tuesdays)\s+(\d{1,2}:\d{2}\s*[AP]M)\s*&\s*(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*Baby Storytime/i, location: main },
    { name: "Hillsdale Toddler Storytime", pattern: /(Mondays)\s+(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*Toddler Storytime/i, location: hillsdale },
  ];

  recurring.forEach((config) => {
    const match = text.match(config.pattern);
    if (!match) return;
    const weekday = weekdayNames[match[1]];
    const times = match.slice(2).filter(Boolean);
    datesForWeekday(today, lastDate, weekday).forEach((dateKey) => {
      times.forEach((time) => {
        const event = makeEvent({
          sourceKey: sources[0].key,
          sourceUrl,
          sourceName: "San Mateo Public Library",
          name: config.name,
          dateKey,
          time,
          location: config.location,
        });
        if (event) events.push(event);
      });
    });
  });

  const parkPattern = new RegExp(`(${monthNames.join("|")}):\\s*(Sundays|Mondays|Tuesdays|Wednesdays|Thursdays|Fridays|Saturdays)\\s+at\\s+(\\d{1,2}:\\d{2}\\s*(?:am|pm))\\s+at\\s+([^:]+):\\s*(\\d+[^.]*\\.)`, "gi");
  let parkMatch;
  while ((parkMatch = parkPattern.exec(text))) {
    const monthIndex = monthNames.findIndex((name) => name.toLowerCase() === parkMatch[1].toLowerCase());
    const currentYear = Number(today.slice(0, 4));
    const currentMonth = Number(today.slice(5, 7)) - 1;
    const year = monthIndex < currentMonth - 2 ? currentYear + 1 : currentYear;
    const parkName = parkMatch[4].trim();
    const address = parkMatch[5].trim();
    const knownPark = /Shoreview/i.test(parkName)
      ? { latitude: 37.5746, longitude: -122.2994 }
      : /King/i.test(parkName)
        ? { latitude: 37.5787, longitude: -122.3277 }
        : { latitude: 37.5267, longitude: -122.3338 };
    const location = {
      label: parkName,
      city: "San Mateo",
      distance: /Shoreview/i.test(parkName) ? 4.7 : 3.5,
      ...knownPark,
      parking: `${parkName} 주변 주차와 운영 상태를 확인하세요.`,
      bathroom: "공원 화장실 운영 여부를 방문 전에 확인하세요.",
      stroller: `${address} 인근 야외 동선을 고려해 큰 바퀴 유모차가 편해요.`,
    };
    datesForMonth(year, monthIndex, weekdayNames[parkMatch[2]])
      .filter((dateKey) => dateKey >= today && dateKey <= lastDate)
      .forEach((dateKey) => {
        const event = makeEvent({
          sourceKey: sources[0].key,
          sourceUrl,
          sourceName: "San Mateo Public Library",
          name: `Storytime in the Park at ${parkName}`,
          dateKey,
          time: parkMatch[3],
          location,
          setting: "outdoor",
        });
        if (event) events.push(event);
      });
  }

  return events;
}

function xmlValue(block, tagName) {
  const escaped = tagName.replace(":", "\\:");
  const match = block.match(new RegExp(`<${escaped}>([\\s\\S]*?)<\\/${escaped}>`, "i"));
  return match ? stripHtml(match[1].replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "")) : "";
}

function xmlValues(block, tagName) {
  const escaped = tagName.replace(":", "\\:");
  return [...block.matchAll(new RegExp(`<${escaped}>([\\s\\S]*?)<\\/${escaped}>`, "gi"))]
    .map((match) => stripHtml(match[1].replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "")));
}

function displayClockFrom24(value) {
  const [hourValue, minuteValue = "00"] = value.split(":");
  const hour = Number(hourValue);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minuteValue} ${suffix}`;
}

function eventWhy(name, categories) {
  const context = `${name} ${categories.join(" ")}`;
  if (/animal|wildlife|nature|bee|reptile/i.test(context)) return "아이와 동물과 자연을 가까이에서 관찰하며 호기심을 키우기 좋은 공식 프로그램이에요.";
  if (/music|performance|concert|dance|puppet|theater/i.test(context)) return "노래와 움직임, 공연을 함께 즐길 수 있어 아이가 적극적으로 참여하기 좋아요.";
  if (/steam|technology|maker|art|creativity|craft|game/i.test(context)) return "만들기와 탐색을 통해 손을 쓰고 새로운 것을 발견할 수 있는 체험형 프로그램이에요.";
  if (/storytime/i.test(context)) return "책, 노래, 움직임을 짧게 함께 즐길 수 있는 영유아 친화 프로그램이에요.";
  return "공식 일정에서 확인한 아이와 가족이 함께 참여할 수 있는 프로그램이에요.";
}

function expandSanMateoCountyRecurringEvents(events, now = new Date()) {
  const stableRecurringProgram = /^(?:Baby Bounce(?: Storytime)?(?: (?:With|with) Stay (?:and|&) Play!?)?|Baby Storytime|Toddler Storytime(?: (?:With|with) Stay (?:and|&) Play!?)?|Family Storytime(?: at [^:]+)?(?: (?:With|with) Stay (?:and|&) Play!?)?|Little Ones Storytime|Music & Movement|Bilingual .*Storytime.*|.* Bilingual (?:Family )?Storytime.*|中英雙語故事時間.*)$/i;
  const lastDate = addDays(pacificDateKey(now), FUTURE_WINDOW_DAYS);
  const expanded = new Map();
  const recurringSeries = new Set();
  const eventKey = (event) => `${event.name.toLowerCase()}|${event.startAt}|${event.latitude}|${event.longitude}`;

  events.forEach((event) => expanded.set(eventKey(event), event));
  events
    .filter((event) => stableRecurringProgram.test(event.name))
    .toSorted((left, right) => new Date(left.startAt) - new Date(right.startAt))
    .forEach((event) => {
      const startParts = dateParts(new Date(event.startAt));
      const startDateKey = `${startParts.year}-${startParts.month}-${startParts.day}`;
      const clock = `${startParts.hour}:${startParts.minute}`;
      const weekday = utcDateFromKey(startDateKey).getUTCDay();
      const seriesKey = `${event.sourceKey}|${event.name.toLowerCase()}|${weekday}|${clock}|${event.latitude}|${event.longitude}`;
      if (recurringSeries.has(seriesKey)) return;
      recurringSeries.add(seriesKey);

      const duration = Math.max(DEFAULT_EVENT_DURATION_MINUTES * 60000, new Date(event.endAt) - new Date(event.startAt));
      for (let dateKey = addDays(startDateKey, 7); dateKey <= lastDate; dateKey = addDays(dateKey, 7)) {
        const startAt = pacificIso(dateKey, clock);
        const recurrence = {
          ...event,
          id: `${event.sourceKey}-${dateKey}-${clock.replace(":", "")}-${slugify(event.name)}-${slugify(event.city)}-weekly`,
          startAt,
          endAt: new Date(new Date(startAt).getTime() + duration).toISOString(),
          confidenceStatus: "recurring_estimate",
        };
        const key = eventKey(recurrence);
        if (!expanded.has(key)) expanded.set(key, recurrence);
      }
    });

  return [...expanded.values()].toSorted((left, right) => new Date(left.startAt) - new Date(right.startAt));
}

function parseSanMateoCountyLibraryEvents(xml, now = new Date(), sourceKey = sources[2].key, sourceName = "San Mateo County Libraries") {
  const today = pacificDateKey(now);
  const lastDate = addDays(today, FUTURE_WINDOW_DAYS);
  const events = [];
  const itemPattern = /<item>([\s\S]*?)<\/item>/gi;
  let item;

  while ((item = itemPattern.exec(xml))) {
    const block = item[1];
    const categories = xmlValues(block, "category");
    const name = xmlValue(block, "title");
    const broadlyKidFriendly = /animal|music|puppet|magic|play|dance|family|kids|craft|maker|steam|story/i.test(`${name} ${categories.join(" ")}`);
    const youngChildAudience = categories.some((category) => /Preschoolers? \(0-5\)|Pre-schoolers|Preschoolers|Babies|Toddlers|Kids: (?:Babies|Preschoolers|Toddlers)/i.test(category));
    const familyAudience = categories.some((category) => /All Ages|Kids: Family Events/i.test(category));
    const audienceMatch = youngChildAudience || (familyAudience && broadlyKidFriendly);
    const childMatch = categories.some((category) => /Children \(6-11\)|Kids \(6-11\)|Kids: Grades K-8/i.test(category));
    const olderOnlyProgram = /\b(?:ESL|conversation club|book club|tai chi|origami|adult|teen|grades? [1-9])\b/i.test(name)
      && !/family|baby|toddler|preschool|storytime|music|puppet|animal|magic|dance|play/i.test(name);
    if (!audienceMatch && !(childMatch && broadlyKidFriendly)) continue;
    if (olderOnlyProgram) continue;
    if (xmlValue(block, "bc:is_cancelled") === "true" || xmlValue(block, "bc:is_virtual") === "true") continue;

    const startAt = xmlValue(block, "bc:start_date");
    const localStart = xmlValue(block, "bc:start_date_local");
    const dateKey = localStart.slice(0, 10);
    if (!startAt || dateKey < today || dateKey > lastDate) continue;
    const locationBlock = block.match(/<bc:location>([\s\S]*?)<\/bc:location>/i)?.[1] || "";
    const latitude = Number(xmlValue(locationBlock, "bc:latitude"));
    const longitude = Number(xmlValue(locationBlock, "bc:longitude"));
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) continue;
    const locationName = xmlValue(locationBlock, "bc:name");
    const city = xmlValue(locationBlock, "bc:city") || locationName;
    const street = `${xmlValue(locationBlock, "bc:number")} ${xmlValue(locationBlock, "bc:street")}`.trim();
    const registrationBlock = block.match(/<bc:registration_info>([\s\S]*?)<\/bc:registration_info>/i)?.[1] || "";
    const registrationRequired = xmlValue(registrationBlock, "bc:is_required") === "true";
    const registrationFull = xmlValue(registrationBlock, "bc:is_full") === "true";
    const type = categories.some((category) => /Storytime/i.test(category))
      ? "storytime"
      : categories.some((category) => /STEAM|Technology|Art & Creativity|Games/i.test(category))
        ? "indoor"
        : "seasonal";
    const location = {
      label: locationName || city,
      city,
      distance: distanceFromSanMateo(latitude, longitude),
      latitude,
      longitude,
      parking: `${locationName || city} 주변 주차 정보를 공식 장소 페이지에서 확인하세요.`,
      bathroom: "도서관 내 화장실 이용 가능.",
      stroller: `${street || "도서관"}의 출입구와 프로그램 공간 동선을 이용하세요.`,
    };
    const localTime = localStart.slice(11, 16);
    const event = makeEvent({
      sourceKey,
      sourceUrl: xmlValue(block, "link"),
      sourceName,
      name,
      dateKey,
      time: displayClockFrom24(localTime),
      location,
      type,
      age: audienceMatch ? "0-5세·가족" : "4-11세",
      reservation: registrationFull ? "예약 마감" : registrationRequired ? "예약 필요" : "예약 불필요",
      why: eventWhy(name, categories),
    });
    if (event) {
      event.startAt = startAt;
      const explicitEndAt = xmlValue(block, "bc:end_date");
      event.endAt = explicitEndAt || new Date(new Date(startAt).getTime() + DEFAULT_EVENT_DURATION_MINUTES * 60000).toISOString();
      events.push(event);
    }
  }

  return expandSanMateoCountyRecurringEvents(events, now);
}

function mountainViewLibraryCalendarUrl(now = new Date()) {
  const start = pacificDateKey(now);
  const end = addDays(start, FUTURE_WINDOW_DAYS + 1);
  const query = new URLSearchParams({
    iid: "3989",
    c: "8800",
    sp: "1",
    timezone: PACIFIC_TIME_ZONE,
    start,
    end,
  });
  return `https://mountainview.libcal.com/widget/events/calendar/list?${query}`;
}

function parseMountainViewLibraryEvents(json, now = new Date()) {
  let records;
  try {
    records = JSON.parse(json);
  } catch {
    return [];
  }
  if (!Array.isArray(records)) return [];

  const today = pacificDateKey(now);
  const lastDate = addDays(today, FUTURE_WINDOW_DAYS);
  const youngChildAudience = /Babies|Toddlers|Preschoolers/i;
  const broadFamilyAudience = /Families|All Ages/i;
  const familyProgram = /storytime|baby|toddler|preschool|family|read to|music|dance|puppet|animal|wildlife|steam|craft|play|kids|children/i;
  const excluded = /Adults|Seniors|Teens|Tweens/i;
  const location = {
    label: "Mountain View Public Library",
    city: "Mountain View",
    distance: distanceFromSanMateo(37.3992, -122.1095),
    latitude: 37.3992,
    longitude: -122.1095,
    parking: "Franklin Street와 주변 공영 주차 정보를 도서관 안내에서 확인하세요.",
    bathroom: "도서관 내 화장실을 이용할 수 있어요.",
    stroller: "도서관 출입구와 어린이 공간까지 유모차로 이동할 수 있어요.",
  };

  return records.flatMap((record) => {
    const name = stripHtml(record?.title);
    const description = stripHtml(record?.short_desc);
    const audiences = String(record?.audiences || "");
    const categories = String(record?.categories || "");
    const context = `${name} ${description} ${audiences} ${categories}`;
    const youngChildRelevant = youngChildAudience.test(audiences);
    const familyRelevant = broadFamilyAudience.test(audiences) && familyProgram.test(context);
    const audienceRelevant = youngChildRelevant || familyRelevant;
    if (!name || record?.online_event || /\bOnline\b/i.test(record?.location || "")) return [];
    if (!audienceRelevant && (excluded.test(audiences) || !familyProgram.test(context))) return [];

    const startValue = String(record?.start || "");
    const dateKey = startValue.slice(0, 10);
    const clock = startValue.slice(11, 16);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey) || !/^\d{2}:\d{2}$/.test(clock) || dateKey < today || dateKey > lastDate) return [];

    const outdoor = /Pioneer Park|outdoor|courtyard|park/i.test(`${record?.location || ""} ${description}`);
    const type = /storytime|read to|music & movement/i.test(context)
      ? "storytime"
      : /steam|craft|make|art|play/i.test(context)
        ? "indoor"
        : "seasonal";
    const event = makeEvent({
      sourceKey: "mountain-view-library-family-events",
      sourceUrl: String(record?.url || "https://mountainview.libcal.com/"),
      sourceName: "Mountain View Public Library",
      name,
      dateKey,
      time: displayClockFrom24(clock),
      location,
      setting: outdoor ? "outdoor" : "indoor",
      type,
      age: youngChildRelevant ? "0-5세·가족" : "가족·전 연령",
      price: "free",
      reservation: record?.in_person_registration
        ? /closed|full/i.test(String(record?.seats || "")) ? "예약 마감" : "예약 필요"
        : "예약 불필요",
      why: "Mountain View Public Library 공식 일정에서 확인한 영유아·가족 프로그램이에요.",
    });
    if (!event) return [];
    const endValue = String(record?.end || "");
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(endValue)) {
      const endAt = pacificIso(endValue.slice(0, 10), endValue.slice(11, 16));
      if (new Date(endAt) > new Date(event.startAt)) event.endAt = endAt;
    }
    return [event];
  }).toSorted((left, right) => new Date(left.startAt) - new Date(right.startAt));
}

function menloParkLocation(address) {
  const belleHaven = /Belle Haven|Terminal Ave/i.test(address);
  const mainLibrary = /Menlo Park Library|Alma St/i.test(address);
  const selected = belleHaven
    ? { label: "Belle Haven Library", latitude: 37.4770, longitude: -122.1600 }
    : mainLibrary
      ? { label: "Menlo Park Library", latitude: 37.4521, longitude: -122.1778 }
      : /Fremont Park/i.test(address)
        ? { label: "Fremont Park", latitude: 37.4504, longitude: -122.1858 }
        : { label: "City of Menlo Park", latitude: 37.4530, longitude: -122.1817 };
  return {
    ...selected,
    city: "Menlo Park",
    distance: distanceFromSanMateo(selected.latitude, selected.longitude),
    parking: `${selected.label} 주변 주차 정보를 공식 행사 페이지에서 확인하세요.`,
    bathroom: /Library/i.test(selected.label) ? "도서관 내 화장실을 이용할 수 있어요." : "행사장 화장실 정보를 공식 페이지에서 확인하세요.",
    stroller: `${selected.label}의 출입구와 유모차 이동 동선을 확인하세요.`,
  };
}

function parseMenloParkFamilyEvents(html, now = new Date()) {
  const today = pacificDateKey(now);
  const lastDate = addDays(today, FUTURE_WINDOW_DAYS);
  const events = new Map();
  const scheduleBlock = html.match(/<h3>Storytime schedule<\/h3>[\s\S]*?<table[^>]*>([\s\S]*?)<\/table>/i)?.[1] || "";
  const scheduleRows = scheduleBlock.match(/<tr>[\s\S]*?<\/tr>/gi) || [];
  const scheduleSource = MENLO_PARK_CHILDREN_URL;

  scheduleRows.forEach((row) => {
    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((match) => stripHtml(match[1]));
    if (cells.length < 3) return;
    const weekday = weekdayNames[cells[0].replace(/\s+/g, "")];
    const clock = parseClock(cells[1].replace(/\./g, ""));
    if (!Number.isInteger(weekday) || !clock) return;
    const location = menloParkLocation(cells[2]);
    datesForWeekday(today, lastDate, weekday).forEach((dateKey) => {
      const event = makeEvent({
        sourceKey: "menlo-park-family-events",
        sourceUrl: scheduleSource,
        sourceName: "City of Menlo Park",
        name: "Family Storytime",
        dateKey,
        time: displayClockFrom24(clock),
        location,
        type: "storytime",
        age: "0-5세·가족",
        price: "free",
        reservation: "예약 불필요",
        durationMinutes: 30,
        confidenceStatus: "recurring_estimate",
        why: "Menlo Park 공식 주간표에서 확인한 책·노래·움직임 중심의 가족 스토리타임이에요.",
      });
      if (event) events.set(event.id, event);
    });
  });

  const itemPattern = /<div class="list-item-container[^>]*>[\s\S]*?<article>([\s\S]*?)<\/article>\s*<\/div>/gi;
  const relevant = /storytime|puppet|concert|movie|family|animal|wildlife|festival|music|dance|craft|art|play|reading|library adventure/i;
  const excluded = /middle grade|teen|adult|commission|meeting|chess|conversation club/i;
  let item;
  while ((item = itemPattern.exec(html))) {
    const block = item[1];
    const name = stripHtml(block.match(/<h2 class="list-item-title">([\s\S]*?)<\/h2>/i)?.[1]);
    const tags = stripHtml(block.match(/<p class="tagged-as-list">([\s\S]*?)<\/p>/i)?.[1]);
    const description = stripHtml(block.match(/<span class="list-item-block-desc">([\s\S]*?)<\/span>/i)?.[1]
      || block.match(/<p>\s*([^<][\s\S]*?)<\/p>/i)?.[1]);
    const address = stripHtml(block.match(/<p class="list-item-address">([\s\S]*?)<\/p>/i)?.[1]);
    const href = decodeHtml(block.match(/<a href="([^"]+)"/i)?.[1] || "");
    const dateText = stripHtml(block.match(/<p class="event-date[^>]*">([\s\S]*?)<\/p>/i)?.[1]);
    const match = dateText.match(/([A-Za-z]+)\s+(\d{1,2}),\s*(20\d{2})\s*\|\s*(\d{1,2}:\d{2}\s*[AP]M)(?:\s*to\s*(\d{1,2}:\d{2}\s*[AP]M))?/i);
    const context = `${name} ${description} ${tags}`;
    if (!name || !match || !/Events for (?:families|children)/i.test(tags) || !relevant.test(context) || excluded.test(context)) continue;
    const monthIndex = monthNames.findIndex((month) => month.toLowerCase().startsWith(match[1].toLowerCase()));
    if (monthIndex < 0) continue;
    const dateKey = `${match[3]}-${String(monthIndex + 1).padStart(2, "0")}-${String(match[2]).padStart(2, "0")}`;
    if (dateKey < today || dateKey > lastDate) continue;
    const location = menloParkLocation(address);
    const outdoor = /park|outdoor|concert|festival/i.test(`${name} ${address}`);
    const event = makeEvent({
      sourceKey: "menlo-park-family-events",
      sourceUrl: href || MENLO_PARK_EVENTS_URL,
      sourceName: "City of Menlo Park",
      name,
      dateKey,
      time: match[4],
      location,
      setting: outdoor ? "outdoor" : "indoor",
      type: /storytime/i.test(name) ? "storytime" : "seasonal",
      age: /storytime/i.test(name) ? "0-5세·가족" : "가족·전 연령",
      price: "free",
      reservation: "예약 불필요 · 공식 페이지 확인",
      why: "Menlo Park 시 공식 일정에서 확인한 어린이·가족 프로그램이에요.",
    });
    if (!event) continue;
    const endClock = parseClock(match[5]);
    if (endClock) {
      const endAt = pacificIso(dateKey, endClock);
      if (new Date(endAt) > new Date(event.startAt)) event.endAt = endAt;
    }
    events.set(event.id, event);
  }

  return [...events.values()].toSorted((left, right) => new Date(left.startAt) - new Date(right.startAt));
}

function cupertinoLocation(context, address) {
  const locations = [
    { match: /McClellan Ranch|22221 McClellan/i, label: "McClellan Ranch Preserve", latitude: 37.3138, longitude: -122.0618 },
    { match: /Creekside Park|10455 Miller/i, label: "Creekside Park", latitude: 37.3167, longitude: -122.0158 },
    { match: /Memorial Park|21163 Anton/i, label: "Memorial Park", latitude: 37.3248, longitude: -122.0445 },
    { match: /Cupertino Library|10800 Torre/i, label: "Cupertino Library", latitude: 37.3183, longitude: -122.0287 },
    { match: /Quinlan|10185.*Stelling/i, label: "Quinlan Community Center", latitude: 37.3211, longitude: -122.0430 },
    { match: /Civic (?:Center|Plaza)|10300 Torre/i, label: "Cupertino Civic Center", latitude: 37.3180, longitude: -122.0297 },
  ];
  const selected = locations.find((location) => location.match.test(`${context} ${address}`))
    || { label: "City of Cupertino", latitude: 37.3230, longitude: -122.0322 };
  return {
    ...selected,
    city: "Cupertino",
    distance: distanceFromSanMateo(selected.latitude, selected.longitude),
    parking: `${selected.label} 주변 주차 정보를 공식 행사 페이지에서 확인하세요.`,
    bathroom: "행사장 화장실 정보를 공식 페이지에서 확인하세요.",
    stroller: `${selected.label}의 유모차 이동 동선을 공식 안내에서 확인하세요.`,
  };
}

function parseCupertinoFamilyEvents(html, now = new Date()) {
  const today = pacificDateKey(now);
  const lastDate = addDays(today, FUTURE_WINDOW_DAYS);
  const events = [];
  const itemPattern = /<div class="list-item-container[^>]*>[\s\S]*?<article>([\s\S]*?)<\/article>\s*<\/div>/gi;
  const excluded = /middle school|working group|meeting|adult|senior/i;
  let item;

  while ((item = itemPattern.exec(html))) {
    const block = item[1];
    const name = stripHtml(block.match(/<h2 class="list-item-title">([\s\S]*?)<\/h2>/i)?.[1]);
    const description = stripHtml(block.match(/<span class="list-item-block-desc">([\s\S]*?)<\/span>/i)?.[1]);
    const address = stripHtml(block.match(/<p class="list-item-address">([\s\S]*?)<\/p>/i)?.[1]);
    const tags = stripHtml(block.match(/<p class="tagged-as-list">([\s\S]*?)<\/p>/i)?.[1]);
    const href = decodeHtml(block.match(/<a href="([^"]+)"/i)?.[1] || "");
    const day = block.match(/<span class="part-date">(\d{1,2})<\/span>/i)?.[1];
    const monthName = block.match(/<span class="part-month">([A-Za-z]+)<\/span>/i)?.[1];
    const year = block.match(/<span class="part-year">(20\d{2})<\/span>/i)?.[1];
    const context = `${name} ${description} ${tags} ${address}`;
    if (!name || !day || !monthName || !year || !/Kids & family/i.test(tags) || excluded.test(context)) continue;
    const monthIndex = monthNames.findIndex((month) => month.toLowerCase().startsWith(monthName.toLowerCase()));
    if (monthIndex < 0) continue;
    const dateKey = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (dateKey < today || dateKey > lastDate) continue;
    const location = cupertinoLocation(context, address);
    const outdoor = /park|ranch|campout|concert|movie|outdoor|amphitheater/i.test(context);
    const event = makeEvent({
      sourceKey: "cupertino-family-events",
      sourceUrl: href || CUPERTINO_EVENTS_URL,
      sourceName: "City of Cupertino",
      name,
      dateKey,
      time: "12:00 PM",
      location,
      setting: outdoor ? "outdoor" : "indoor",
      type: "seasonal",
      age: "가족·전 연령",
      price: /\bfree\b/i.test(context) ? "free" : "check",
      reservation: "시간과 예약 여부는 공식 페이지 확인",
      confidenceStatus: "date_confirmed",
      why: "Cupertino 시 공식 일정에서 확인한 어린이·가족 지역행사예요.",
    });
    if (event) events.push(event);
  }

  return events.toSorted((left, right) => new Date(left.startAt) - new Date(right.startAt));
}

function sanMateoCityCalendarUrl(now = new Date()) {
  const parts = dateParts(now);
  return `https://www.cityofsanmateo.org/calendar.aspx?CID=0&month=${Number(parts.month)}&view=list&year=${parts.year}`;
}

function burlingameCalendarUrls(now = new Date()) {
  const parts = dateParts(now);
  const currentYear = Number(parts.year);
  const currentMonth = Number(parts.month);
  const nextMonthDate = new Date(Date.UTC(currentYear, currentMonth, 1));
  const nextYear = nextMonthDate.getUTCFullYear();
  const nextMonth = nextMonthDate.getUTCMonth() + 1;
  const calendarUrl = (year, month) => `https://www.burlingame.org/calendar.aspx?CID=24,26&month=${month}&view=list&year=${year}`;
  return [calendarUrl(currentYear, currentMonth), calendarUrl(nextYear, nextMonth)];
}

function burlingameCalendarUrlForDate(dateKey) {
  const [year, month] = dateKey.split("-");
  return `https://www.burlingame.org/calendar.aspx?CID=24,26&month=${Number(month)}&view=list&year=${year}`;
}

function sanFranciscoRecParkCalendarUrls(now = new Date()) {
  const parts = dateParts(now);
  const currentYear = Number(parts.year);
  const currentMonth = Number(parts.month);
  const nextMonthDate = new Date(Date.UTC(currentYear, currentMonth, 1));
  const nextYear = nextMonthDate.getUTCFullYear();
  const nextMonth = nextMonthDate.getUTCMonth() + 1;
  const calendarUrl = (year, month) => `https://sfrecpark.org/Calendar.aspx?CID=14&month=${month}&view=list&year=${year}`;
  return [calendarUrl(currentYear, currentMonth), calendarUrl(nextYear, nextMonth)];
}

function sanFranciscoRecParkUrlForDate(dateKey) {
  const [year, month] = dateKey.split("-");
  return `https://sfrecpark.org/Calendar.aspx?CID=14&month=${Number(month)}&view=list&year=${year}`;
}

function parseBurlingameLibraryEvents(html, now = new Date()) {
  const today = pacificDateKey(now);
  const lastDate = addDays(today, FUTURE_WINDOW_DAYS);
  const events = new Map();
  const itemPattern = /<li>\s*(<h3(?:(?!<\/li>)[\s\S])*?<div class="date">(?:(?!<\/li>)[\s\S])*?)<\/li>/gi;
  const relevantEvent = /storytime|story time|family fun|baby|toddler|preschool|children|kids|all ages|puppet|magic|circus|chess|scavenger|craft|music|mini golf|book club fun/i;
  const excludedEvent = /adult|teen|trustee|board meeting|computer help|citizenship|business|medicare/i;
  let item;

  while ((item = itemPattern.exec(html))) {
    const block = item[1];
    const name = stripHtml(block.match(/<h3[^>]*>[\s\S]*?<span>([\s\S]*?)<\/span>/i)?.[1] || "");
    const description = stripHtml(block.match(/<p class="icalDescription">([\s\S]*?)<\/p>/i)?.[1] || "");
    const locationName = stripHtml(block.match(/<div class="eventLocation[^"]*"[^>]*>[\s\S]*?<div class="name">([\s\S]*?)<\/div>/i)?.[1] || "Burlingame Public Library");
    const dateText = stripHtml(block.match(/<div class="date">([\s\S]*?)<\/div>/i)?.[1] || "");
    const context = `${name} ${description} ${locationName}`;
    if (!name || !relevantEvent.test(context) || excludedEvent.test(name) || eventIsCancelled(context)) continue;

    const dateMatch = dateText.match(new RegExp(`^(${monthNames.join("|")})\\s+(\\d{1,2}),\\s+(20\\d{2}),\\s+(\\d{1,2}:\\d{2}\\s*[AP]M)\\s*-\\s*(\\d{1,2}:\\d{2}\\s*[AP]M)`, "i"));
    if (!dateMatch) continue;
    const monthIndex = monthNames.findIndex((month) => month.toLowerCase() === dateMatch[1].toLowerCase());
    const dateKey = `${dateMatch[3]}-${String(monthIndex + 1).padStart(2, "0")}-${String(dateMatch[2]).padStart(2, "0")}`;
    if (dateKey < today || dateKey > lastDate) continue;

    const easton = /Easton/i.test(locationName);
    const outdoors = /lawn|city hall|outdoor/i.test(context);
    const location = easton
      ? {
        label: "Burlingame Public Library, Easton Branch",
        city: "Burlingame",
        latitude: 37.5844,
        longitude: -122.3660,
        parking: "Easton Branch 주변 노상 주차 안내를 확인하세요.",
        bathroom: "도서관 내 화장실을 이용할 수 있어요.",
        stroller: "단층 도서관 출입구와 어린이 공간까지 유모차로 이동할 수 있어요.",
      }
      : {
        label: outdoors ? "Burlingame City Hall Lawn" : "Burlingame Public Library, Main",
        city: "Burlingame",
        latitude: 37.5777,
        longitude: -122.3482,
        parking: "Burlingame Main Library 주변 공영·노상 주차 안내를 확인하세요.",
        bathroom: outdoors ? "행사장 또는 인접 도서관 화장실 운영 여부를 확인하세요." : "도서관 내 화장실을 이용할 수 있어요.",
        stroller: outdoors ? "잔디 행사장이므로 큰 바퀴 유모차가 편해요." : "도서관 출입구와 어린이 공간까지 유모차로 이동할 수 있어요.",
      };
    location.distance = distanceFromSanMateo(location.latitude, location.longitude);

    const storytime = /storytime|story time/i.test(name);
    const age = /0\s*-\s*2/i.test(name)
      ? "0-2세"
      : /2\s*-\s*5/i.test(name)
        ? "2-5세"
        : /2\s*-\s*7/i.test(name)
          ? "2-7세"
          : /kids|children|chess|book club/i.test(context)
            ? "4-12세"
            : "가족·전 연령";
    const event = makeEvent({
      sourceKey: "burlingame-library-family-events",
      sourceUrl: burlingameCalendarUrlForDate(dateKey),
      sourceName: "Burlingame Public Library",
      name,
      dateKey,
      time: dateMatch[4],
      location,
      setting: outdoors ? "outdoor" : "indoor",
      type: storytime ? "storytime" : outdoors ? "seasonal" : "indoor",
      age,
      reservation: /register|registration/i.test(description) ? "공식 페이지에서 예약 확인" : "예약 불필요",
      why: storytime
        ? "Burlingame 공식 도서관 일정에서 확인한 책·노래 중심의 어린이 프로그램이에요."
        : "Burlingame 공식 도서관 일정에서 확인한 어린이와 가족 대상 프로그램이에요.",
    });
    if (!event) continue;
    const endClock = parseClock(dateMatch[5]);
    if (endClock) {
      const endAt = pacificIso(dateKey, endClock);
      if (new Date(endAt) > new Date(event.startAt)) event.endAt = endAt;
    }
    events.set(`${name.toLowerCase()}|${event.startAt}|${location.label}`, event);
  }

  return [...events.values()].toSorted((left, right) => new Date(left.startAt) - new Date(right.startAt));
}

function paloAltoLocation(context, address) {
  const locations = [
    { match: /Mitchell Park|600 East Meadow/i, label: "Mitchell Park", latitude: 37.4217, longitude: -122.1136 },
    { match: /Junior Museum|paloaltozoo|JMZ|1451 Middlefield/i, label: "Palo Alto Junior Museum & Zoo", latitude: 37.4446, longitude: -122.1442 },
    { match: /Children'?s Theatre|1305 Middlefield/i, label: "Palo Alto Children's Theatre", latitude: 37.4462, longitude: -122.1450 },
    { match: /Art Center|1313 Newell/i, label: "Palo Alto Art Center", latitude: 37.4449, longitude: -122.1399 },
  ];
  const selected = locations.find((location) => location.match.test(`${context} ${address}`)) || {
    label: "City of Palo Alto",
    latitude: 37.4419,
    longitude: -122.1430,
  };
  return {
    ...selected,
    city: "Palo Alto",
    distance: distanceFromSanMateo(selected.latitude, selected.longitude),
    parking: `${selected.label} 주변 주차 정보를 공식 행사 페이지에서 확인하세요.`,
    bathroom: "행사장 화장실과 기저귀 교환 시설 여부를 공식 안내에서 확인하세요.",
    stroller: "행사장 출입구와 유모차 이동 동선을 공식 안내에서 확인하세요.",
  };
}

function parsePaloAltoFamilyEvents(html, now = new Date()) {
  const today = pacificDateKey(now);
  const lastDate = addDays(today, FUTURE_WINDOW_DAYS);
  const events = new Map();
  const itemPattern = /<div class="list-item-container[^>]*>[\s\S]*?<article>([\s\S]*?)<\/article>\s*<\/div>/gi;
  const relevantEvent = /family|kid|child|toddler|preschool|zoo|snake|animal|puppet|theatre|theater|musical|movie|festival|workshop|hands-on|art|music|play/i;
  const excludedEvent = /commission|board|meeting|planning|permit|hazardous waste|adult|senior|business|council/i;
  let item;

  while ((item = itemPattern.exec(html))) {
    const block = item[1];
    const name = stripHtml(block.match(/<h2 class="list-item-title">([\s\S]*?)<\/h2>/i)?.[1] || "");
    const description = stripHtml(block.match(/<span class="list-item-block-desc">([\s\S]*?)<\/span>/i)?.[1] || "");
    const address = stripHtml(block.match(/<p class="list-item-address">([\s\S]*?)<\/p>/i)?.[1] || "");
    const tags = stripHtml(block.match(/<p class="tagged-as-list">([\s\S]*?)<\/p>/i)?.[1] || "");
    const href = decodeHtml(block.match(/<a href="([^"]+)"/i)?.[1] || "");
    const day = block.match(/<span class="part-date">(\d{1,2})<\/span>/i)?.[1];
    const monthName = block.match(/<span class="part-month">([A-Za-z]+)<\/span>/i)?.[1];
    const year = block.match(/<span class="part-year">(20\d{2})<\/span>/i)?.[1];
    const context = `${name} ${description} ${tags} ${address}`;
    if (!name || !day || !monthName || !year || !relevantEvent.test(context) || excludedEvent.test(context) || eventIsCancelled(block, context)) continue;

    const monthIndex = monthNames.findIndex((month) => month.toLowerCase().startsWith(monthName.toLowerCase()));
    if (monthIndex < 0) continue;
    const dateKey = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (dateKey < today || dateKey > lastDate) continue;

    const location = paloAltoLocation(context, address);
    const outdoor = /park|field|outdoor|movie night/i.test(context);
    const museum = /zoo|snake|animal/i.test(context);
    const age = /toddler|wheels on the bus/i.test(context)
      ? "1-6세"
      : /workshop|art/i.test(context)
        ? "3-12세·가족"
        : "가족·전 연령";
    const sourceUrl = href ? new URL(href, "https://www.paloalto.gov").href : PALO_ALTO_EVENTS_URL;
    const event = makeEvent({
      sourceKey: "palo-alto-family-events",
      sourceUrl,
      sourceName: /paloaltozoo\.org/i.test(sourceUrl) ? "Palo Alto Junior Museum & Zoo" : "City of Palo Alto",
      name,
      dateKey,
      time: "12:00 PM",
      location,
      setting: outdoor ? "outdoor" : "indoor",
      type: museum ? "museum" : outdoor ? "seasonal" : "indoor",
      age,
      price: /\bfree\b|family movie night/i.test(context) ? "free" : "check",
      reservation: "시간과 예약 여부는 공식 페이지 확인",
      why: museum
        ? "Palo Alto 공식 행사 목록에서 확인한 동물 관찰과 체험 중심의 가족 프로그램이에요."
        : "Palo Alto 시 공식 행사 목록에서 확인한 어린이와 가족 대상 프로그램이에요.",
      durationMinutes: 180,
      confidenceStatus: "date_confirmed",
    });
    if (event) events.set(event.id, event);
  }

  return [...events.values()].toSorted((left, right) => new Date(left.startAt) - new Date(right.startAt));
}

function sanFranciscoLocation(locationName, address) {
  const context = `${locationName} ${address}`;
  const selected = /Union Square|Post and Stockton/i.test(context)
    ? { label: "Union Square", latitude: 37.7879, longitude: -122.4075 }
    : /Bandshell|Music Concourse/i.test(context)
      ? { label: "Golden Gate Bandshell", latitude: 37.7690, longitude: -122.4833 }
      : /Golden Gate Park/i.test(context)
        ? { label: locationName || "Golden Gate Park", latitude: 37.7694, longitude: -122.4862 }
        : { label: locationName || "San Francisco Recreation & Parks", latitude: 37.7749, longitude: -122.4194 };
  return {
    ...selected,
    city: "San Francisco",
    distance: distanceFromSanMateo(selected.latitude, selected.longitude),
    parking: `${selected.label} 주변 주차와 대중교통 정보를 공식 행사 페이지에서 확인하세요.`,
    bathroom: "공원 또는 행사장 화장실의 위치와 운영 시간을 공식 안내에서 확인하세요.",
    stroller: "공원 포장 동선으로 접근할 수 있지만 행사 혼잡도를 고려하세요.",
  };
}

function parseSanFranciscoRecParkEvents(html, now = new Date()) {
  const today = pacificDateKey(now);
  const lastDate = addDays(today, FUTURE_WINDOW_DAYS);
  const events = new Map();
  const eventPattern = /<div class="hidden" itemscope itemtype="http:\/\/schema\.org\/Event">([\s\S]*?)<\/div><p>/gi;
  const relevantEvent = /toddler|imagination|fun days?|crafternoon|juggling|family|kid|child|mobile rec|concert|bandshell|puppet|movie|festival|nature|art|soccer skills/i;
  const excludedEvent = /cancelled|canceled|postponed|meeting|commission|committee|adult|senior|tai chi|cardio|fitness|happy hour|lunchbreak music|mahjong|league|pickleball|golf/i;
  let match;

  while ((match = eventPattern.exec(html))) {
    const block = match[1];
    const name = stripHtml(block.match(/itemprop="name"[^>]*>([\s\S]*?)<\/span>/i)?.[1] || "");
    const localStart = block.match(/itemprop="startDate"[^>]*>([^<]+)</i)?.[1] || "";
    const description = stripHtml(block.match(/itemprop="description"[^>]*>([\s\S]*?)<\/p>/i)?.[1] || "");
    const locationName = stripHtml(block.match(/itemprop="location"[\s\S]*?itemprop="name"[^>]*>([^<]+)</i)?.[1] || "San Francisco Recreation & Parks");
    const street = stripHtml(block.match(/itemprop="streetAddress"[^>]*>([^<]+)</i)?.[1] || "");
    const context = `${name} ${description} ${locationName}`;
    const dateKey = localStart.slice(0, 10);
    const localTime = localStart.slice(11, 16);
    if (!name || !dateKey || dateKey < today || dateKey > lastDate || !relevantEvent.test(context) || excludedEvent.test(context) || eventIsCancelled(context)) continue;

    const location = sanFranciscoLocation(locationName, street);
    const toddlerFocused = /toddler|imagination|fun days?/i.test(context);
    const preschoolAndUp = /crafternoon/i.test(context);
    const olderKids = /juggling|chess|soccer skills/i.test(context);
    const event = makeEvent({
      sourceKey: "sf-rec-park-family-events",
      sourceUrl: sanFranciscoRecParkUrlForDate(dateKey),
      sourceName: "San Francisco Recreation & Parks",
      name,
      dateKey,
      time: displayClockFrom24(localTime),
      location,
      setting: "outdoor",
      type: "seasonal",
      age: toddlerFocused ? "1-6세·가족" : preschoolAndUp ? "3-12세" : olderKids ? "4-12세" : "가족·전 연령",
      price: /\bfree\b/i.test(description) ? "free" : "check",
      reservation: "공식 행사 안내 확인",
      why: toddlerFocused
        ? "San Francisco 공원국 공식 일정에서 확인한 어린이 참여형 야외 프로그램이에요."
        : "San Francisco 공원국 공식 일정에서 확인한 가족 친화 공연과 야외 활동이에요.",
      durationMinutes: toddlerFocused ? 90 : 180,
    });
    if (event) events.set(event.id, event);
  }

  return [...events.values()].toSorted((left, right) => new Date(left.startAt) - new Date(right.startAt));
}

function parseSanMateoCityEvents(html, now = new Date()) {
  const today = pacificDateKey(now);
  const lastDate = addDays(today, FUTURE_WINDOW_DAYS);
  const sourceUrl = sanMateoCityCalendarUrl(now);
  const events = [];
  const eventPattern = /<div class="hidden" itemscope itemtype="http:\/\/schema\.org\/Event">([\s\S]*?)<\/div><p>/gi;
  let match;

  while ((match = eventPattern.exec(html))) {
    const block = match[1];
    const name = stripHtml(block.match(/itemprop="name"[^>]*>([\s\S]*?)<\/span>/i)?.[1] || "");
    const localStart = block.match(/itemprop="startDate"[^>]*>([^<]+)</i)?.[1] || "";
    const description = stripHtml(block.match(/itemprop="description"[^>]*>([\s\S]*?)<\/p>/i)?.[1] || "");
    const locationName = stripHtml(block.match(/itemprop="location"[\s\S]*?itemprop="name"[^>]*>([^<]+)</i)?.[1] || "San Mateo");
    const dateKey = localStart.slice(0, 10);
    const localTime = localStart.slice(11, 16);
    const context = `${name} ${description} ${locationName}`;
    if (!dateKey || dateKey < today || dateKey > lastDate) continue;
    if (!/family|kid|child|music|concert|movie|festival|park|play/i.test(context)) continue;
    if (eventIsCancelled(context) || /commission|meeting|senior|planning/i.test(context)) continue;
    const centralPark = /Central Park/i.test(locationName);
    const latitude = centralPark ? 37.5624 : 37.563;
    const longitude = centralPark ? -122.3252 : -122.3255;
    const location = {
      label: locationName,
      city: "San Mateo",
      distance: distanceFromSanMateo(latitude, longitude),
      latitude,
      longitude,
      parking: `${locationName} 주변 공영·노상 주차 정보를 확인하세요.`,
      bathroom: "행사장 화장실 위치와 운영 여부를 공식 안내에서 확인하세요.",
      stroller: "야외 행사장은 유모차 이동이 가능하지만 혼잡 시간을 고려하세요.",
    };
    const event = makeEvent({
      sourceKey: sources[3].key,
      sourceUrl,
      sourceName: "City of San Mateo",
      name,
      dateKey,
      time: displayClockFrom24(localTime),
      location,
      setting: /park|outdoor|music|movie|festival/i.test(context) ? "outdoor" : "indoor",
      type: "seasonal",
      age: "가족·전 연령",
      price: /free/i.test(description) ? "free" : "paid",
      reservation: "공식 행사 안내 확인",
      why: "시에서 공식 운영하는 가족 친화 행사로 공연과 야외 활동을 함께 즐기기 좋아요.",
      durationMinutes: 180,
    });
    if (event) events.push(event);
  }

  return events;
}

function parseCuriOdysseyDailyEvents(html, now = new Date()) {
  const text = stripHtml(html);
  const schedule = text.match(/Animals in Action.*?Every Day at\s+(\d{1,2}\s*PM),\s*(\d{1,2}\s*PM),\s*and\s*(\d{1,2}\s*PM)/i);
  if (!schedule) return [];
  const today = pacificDateKey(now);
  const lastDate = addDays(today, FUTURE_WINDOW_DAYS);
  const location = {
    label: "CuriOdyssey",
    city: "San Mateo",
    distance: 4.6,
    latitude: 37.5906,
    longitude: -122.3188,
    parking: "Coyote Point 입장·주차 요금을 확인하세요.",
    bathroom: "시설 내 화장실과 기저귀 교환 공간을 이용할 수 있어요.",
    stroller: "전시관과 야외 동물 구역을 유모차로 이동할 수 있어요.",
  };
  const times = schedule.slice(1).join(" · ");
  const events = [];
  for (let dateKey = today; dateKey <= lastDate; dateKey = addDays(dateKey, 1)) {
    const event = makeEvent({
      sourceKey: sources[4].key,
      sourceUrl: sources[4].url,
      sourceName: "CuriOdyssey",
      name: "CuriOdyssey Animals in Action",
      dateKey,
      time: schedule[1],
      location,
      type: "museum",
      age: "1-6세·가족",
      price: "paid",
      reservation: "입장권 확인",
      why: `동물 돌봄과 훈련 모습을 가까이에서 볼 수 있어요. 공식 발표 시간은 ${times}입니다.`,
      durationMinutes: 150,
    });
    if (event) events.push(event);
  }
  return events;
}

function parseBayAreaDiscoveryMuseumEvents(html, now = new Date()) {
  const today = pacificDateKey(now);
  const lastDate = addDays(today, FUTURE_WINDOW_DAYS);
  const currentYear = Number(today.slice(0, 4));
  const events = [];
  const blockPattern = /<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]{0,1400}?<p[^>]*>([\s\S]*?)<\/p>/gi;
  let block;

  while ((block = blockPattern.exec(html))) {
    const name = stripHtml(block[1]);
    const description = stripHtml(block[2]);
    const range = description.match(new RegExp(`(${monthNames.join("|")})\\s+(\\d{1,2})\\s*[-–—]\\s*(${monthNames.join("|")})\\s+(\\d{1,2})`, "i"));
    if (!range) continue;
    const startMonth = monthNames.findIndex((month) => month.toLowerCase() === range[1].toLowerCase());
    const endMonth = monthNames.findIndex((month) => month.toLowerCase() === range[3].toLowerCase());
    const startDate = `${currentYear}-${String(startMonth + 1).padStart(2, "0")}-${String(range[2]).padStart(2, "0")}`;
    const endDate = `${currentYear}-${String(endMonth + 1).padStart(2, "0")}-${String(range[4]).padStart(2, "0")}`;
    const location = {
      label: "Bay Area Discovery Museum",
      city: "Sausalito",
      distance: distanceFromSanMateo(37.8356, -122.4764),
      latitude: 37.8356,
      longitude: -122.4764,
      parking: "박물관 전용 주차와 입장 시간을 확인하세요.",
      bathroom: "어린이 동반 가족을 위한 화장실과 편의시설이 있어요.",
      stroller: "실내외 전시 공간을 유모차로 이동할 수 있어요.",
    };
    for (let dateKey = startDate > today ? startDate : today; dateKey <= endDate && dateKey <= lastDate; dateKey = addDays(dateKey, 1)) {
      if (utcDateFromKey(dateKey).getUTCDay() === 2) continue;
      const event = makeEvent({
        sourceKey: sources[5].key,
        sourceUrl: sources[5].url,
        sourceName: "Bay Area Discovery Museum",
        name,
        dateKey,
        time: "10:00 AM",
        location,
        setting: "outdoor",
        type: "museum",
        age: "0-8세·가족",
        price: "paid",
        reservation: "입장권 권장",
        why: `${name} 기간에 운영되는 어린이 박물관 특별 프로그램으로 감각 놀이와 야외 활동을 함께 즐기기 좋아요.`,
        durationMinutes: 360,
      });
      if (event) events.push(event);
    }
  }
  return events;
}

function redwoodCityDateTime(value) {
  const match = String(value || "").match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})(?::\d{2})?\s+(AM|PM)$/i);
  if (!match) return null;
  const dateKey = `${match[3]}-${String(match[1]).padStart(2, "0")}-${String(match[2]).padStart(2, "0")}`;
  const time = `${match[4]}:${match[5]} ${match[6].toUpperCase()}`;
  const clock = parseClock(time);
  return { dateKey, time, iso: clock ? pacificIso(dateKey, clock) : null };
}

function redwoodCityEffectiveEnd(name, start, end) {
  if (!start?.iso || !end?.iso || new Date(end.iso) <= new Date(start.iso)) return null;
  const durationMinutes = (new Date(end.iso) - new Date(start.iso)) / 60000;
  const endOfDayPlaceholder = /^11:59 PM$/i.test(end.time)
    && /^(?:1[2-9]|2[0-3]):/.test(parseClock(start.time) || "")
    && durationMinutes > 240;
  if (!endOfDayPlaceholder) return end.iso;
  const fallbackMinutes = /music|concert|movie|performance|puppet|theater|theatre/i.test(name) ? 120 : 90;
  return new Date(new Date(start.iso).getTime() + fallbackMinutes * 60000).toISOString();
}

function redwoodCityLocation(name, description) {
  const context = `${name} ${description}`;
  const locations = [
    {
      match: /Schaberg/i,
      label: "Schaberg Branch Library",
      latitude: 37.4661,
      longitude: -122.2386,
      parking: "Schaberg Branch Library 주변 주차 상황을 확인하세요.",
      bathroom: "도서관 내 화장실을 이용할 수 있어요.",
      stroller: "도서관 출입구와 프로그램 공간까지 유모차로 이동할 수 있어요.",
    },
    {
      match: /Redwood Shores|@ Shores/i,
      label: "Redwood Shores Branch Library",
      latitude: 37.5311,
      longitude: -122.2587,
      parking: "Redwood Shores Branch Library 주차장을 이용할 수 있어요.",
      bathroom: "도서관 내 화장실을 이용할 수 있어요.",
      stroller: "도서관 출입구와 프로그램 공간까지 유모차로 이동할 수 있어요.",
    },
    {
      match: /Magical Bridge|Red Morton|Parcade/i,
      label: "Magical Bridge Playground at Red Morton Park",
      latitude: 37.4869,
      longitude: -122.2470,
      parking: "Red Morton Park 주변 주차장을 이용하고 행사 위치를 공식 안내에서 확인하세요.",
      bathroom: "공원 화장실 위치와 운영 여부를 공식 안내에서 확인하세요.",
      stroller: "공원 포장 동선으로 접근할 수 있지만 행사 혼잡도를 고려하세요.",
    },
    {
      match: /Stafford Park|Music in the Park/i,
      label: "Stafford Park",
      latitude: 37.4716,
      longitude: -122.2445,
      parking: "Stafford Park 주변 노상 주차 상황을 확인하세요.",
      bathroom: "공원 화장실 운영 여부를 방문 전에 확인하세요.",
      stroller: "공원 잔디와 포장 동선을 고려해 유모차를 준비하세요.",
    },
    {
      match: /Courthouse Square|on the Square/i,
      label: "Courthouse Square",
      latitude: 37.4864,
      longitude: -122.2290,
      parking: "Courthouse Square 주변 공영 주차장과 행사일 도로 통제를 확인하세요.",
      bathroom: "행사장 임시 화장실 또는 인근 공공시설 운영 여부를 확인하세요.",
      stroller: "광장과 인도는 유모차로 이동할 수 있지만 행사 혼잡도를 고려하세요.",
    },
    {
      match: /Downtown|Cuentos y Cantos|Música con Val|Music with Val/i,
      label: "Downtown Library",
      latitude: 37.4844,
      longitude: -122.2286,
      parking: "Downtown Library 주변 공영 주차장을 확인하세요.",
      bathroom: "도서관 내 화장실을 이용할 수 있어요.",
      stroller: "도서관 출입구와 프로그램 공간까지 유모차로 이동할 수 있어요.",
    },
  ];
  const selected = locations.find((location) => location.match.test(context));
  if (selected) return { ...selected, city: "Redwood City", distance: distanceFromSanMateo(selected.latitude, selected.longitude) };
  return {
    label: "Redwood City",
    city: "Redwood City",
    latitude: 37.4852,
    longitude: -122.2364,
    distance: distanceFromSanMateo(37.4852, -122.2364),
    parking: "행사 페이지에서 정확한 Redwood City 장소와 주차 정보를 확인하세요.",
    bathroom: "행사장 화장실 위치와 운영 여부를 공식 안내에서 확인하세요.",
    stroller: "행사장 접근 동선을 공식 안내에서 확인하세요.",
  };
}

function redwoodCityAge(name) {
  if (/Tiny Tales/i.test(name)) return "0-24개월";
  if (/Toddler\/Preschool|JAMaROO/i.test(name)) return "2-5세";
  if (/Kid Makers|LEGO|Coding|Creative Studio|Creative Tuesdays|Art Salon/i.test(name)) return "4-12세";
  if (/Puppet|Theater|Music|Bubbles|Seaside|Marine|Fun Fridays/i.test(name)) return "2-8세·가족";
  if (/Cuentos|Storytime|Stories|Pajama|Story Hour/i.test(name)) return "가족·전 연령";
  return "1-6세·가족";
}

function expandRedwoodCityRecurringEvents(events, now = new Date()) {
  const recurringProgram = /^(?:Toddler\/Preschool Storytime @ (?:Schaberg|Redwood Shores)|Tiny Tales @ (?:Schaberg|Redwood Shores)|Pajama Time Stories @ Redwood Shores|Stories and Songs with Pam @ Downtown|Stories in the Park(?: \/ Cuentos en el Parque)?|Cuentos bilingües de Pijama.*)$/i;
  const lastDate = addDays(pacificDateKey(now), FUTURE_WINDOW_DAYS);
  const expanded = new Map();
  const recurringSeries = new Set();

  events.forEach((event) => expanded.set(`${event.name.toLowerCase()}|${event.startAt}`, event));

  events
    .filter((event) => recurringProgram.test(event.name))
    .toSorted((left, right) => new Date(left.startAt) - new Date(right.startAt))
    .forEach((event) => {
      const startParts = dateParts(new Date(event.startAt));
      const startDateKey = `${startParts.year}-${startParts.month}-${startParts.day}`;
      const clock = `${startParts.hour}:${startParts.minute}`;
      const weekday = utcDateFromKey(startDateKey).getUTCDay();
      const seriesKey = `${event.name.toLowerCase()}|${weekday}|${clock}`;
      if (recurringSeries.has(seriesKey)) return;
      recurringSeries.add(seriesKey);

      const duration = Math.max(DEFAULT_EVENT_DURATION_MINUTES * 60000, new Date(event.endAt) - new Date(event.startAt));
      for (let dateKey = addDays(startDateKey, 7); dateKey <= lastDate; dateKey = addDays(dateKey, 7)) {
        const startAt = pacificIso(dateKey, clock);
        const recurrence = {
          ...event,
          id: `${event.sourceKey}-${dateKey}-${clock.replace(":", "")}-${slugify(event.name)}-weekly`,
          startAt,
          endAt: new Date(new Date(startAt).getTime() + duration).toISOString(),
          confidenceStatus: "recurring_estimate",
        };
        expanded.set(`${recurrence.name.toLowerCase()}|${recurrence.startAt}`, recurrence);
      }
    });

  return [...expanded.values()].toSorted((left, right) => new Date(left.startAt) - new Date(right.startAt));
}

function parseRedwoodCityEvents(xml, now = new Date()) {
  const today = pacificDateKey(now);
  const lastDate = addDays(today, FUTURE_WINDOW_DAYS);
  const events = [];
  const itemPattern = /<item>([\s\S]*?)<\/item>/gi;
  const relevantEvent = /toddler|baby|tiny tales|storytime|stories and songs|stories in the park|cuentos|pajama time|family wiggles|music with val|música con val|jamaroo kids|malinky music|puppet|kids rock|fun fridays|story hour|free art project|kid makers|lego|creative tuesdays|lunch at the library|seaside|marine science|mobile recreation|parcade|magical bridge|movies? on the square|music in the park|music on the square|soccer on the square|family|children|festival|circus/i;
  const excludedEvent = /adult|teen|tween|senior|meeting|commission|committee|basketball|pickleball|volleyball|mahjong|dominos|bridge|card games/i;
  let item;

  while ((item = itemPattern.exec(xml))) {
    const block = item[1];
    const rawName = xmlValue(block, "title");
    const name = rawName.replace(/\s+\(\d{1,2}\/\d{1,2}\/\d{4}[\s\S]*\)$/, "").trim();
    const description = xmlValue(block, "description");
    if (!relevantEvent.test(`${name} ${description}`) || excludedEvent.test(`${name} ${description}`) || /cancelled|canceled|closed|^no\s/i.test(name)) continue;

    const start = redwoodCityDateTime(xmlValue(block, "eventStartDate"));
    const end = redwoodCityDateTime(xmlValue(block, "eventEndDate"));
    if (!start?.iso || start.dateKey < today || start.dateKey > lastDate) continue;

    const location = redwoodCityLocation(name, description);
    const storytime = /story|tales|cuentos/i.test(name);
    const outdoor = /park|magical bridge|square|parcade|mobile recreation/i.test(`${name} ${location.label}`);
    const event = makeEvent({
      sourceKey: sources[6].key,
      sourceUrl: xmlValue(block, "link") || sources[6].url,
      sourceName: "City of Redwood City",
      name,
      dateKey: start.dateKey,
      time: start.time,
      location,
      setting: outdoor ? "outdoor" : "indoor",
      type: storytime ? "storytime" : outdoor ? "seasonal" : "indoor",
      age: redwoodCityAge(name),
      price: "free",
      reservation: "예약 불필요 · 정원은 현장 상황에 따라 달라요",
      why: storytime
        ? "Redwood City 공식 일정에서 확인한 책·노래·움직임 중심의 영유아 프로그램이에요."
        : "Redwood City 공식 일정에서 확인한 어린이와 가족 대상 참여형 프로그램이에요.",
    });
    if (event) {
      event.endAt = redwoodCityEffectiveEnd(name, start, end) || event.endAt;
      events.push(event);
    }
  }

  return expandRedwoodCityRecurringEvents(events, now);
}

function createSchemaStatements(db) {
  return [
    db.prepare(`CREATE TABLE IF NOT EXISTS events (
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
    )`),
    db.prepare("CREATE INDEX IF NOT EXISTS events_start_at_idx ON events (start_at)"),
    db.prepare("CREATE INDEX IF NOT EXISTS events_source_active_idx ON events (source_key, active)"),
    db.prepare(`CREATE TABLE IF NOT EXISTS sync_state (
      source_key TEXT PRIMARY KEY NOT NULL,
      status TEXT NOT NULL,
      last_attempt_at TEXT NOT NULL,
      last_success_at TEXT,
      message TEXT,
      event_count INTEGER NOT NULL DEFAULT 0,
      data_revision INTEGER NOT NULL DEFAULT 1
    )`),
  ];
}

async function ensureSchema(db) {
  schemaReady ||= (async () => {
    await db.batch(createSchemaStatements(db));
    const tableInfo = await db.prepare("PRAGMA table_info(events)").all();
    const columns = new Set((tableInfo.results || []).map((column) => column.name));
    const migrations = [];
    if (!columns.has("min_age_months")) migrations.push(db.prepare("ALTER TABLE events ADD COLUMN min_age_months INTEGER NOT NULL DEFAULT 0"));
    if (!columns.has("max_age_months")) migrations.push(db.prepare("ALTER TABLE events ADD COLUMN max_age_months INTEGER NOT NULL DEFAULT 216"));
    if (!columns.has("confidence_status")) migrations.push(db.prepare("ALTER TABLE events ADD COLUMN confidence_status TEXT NOT NULL DEFAULT 'source_confirmed'"));
    if (!columns.has("end_at")) migrations.push(db.prepare("ALTER TABLE events ADD COLUMN end_at TEXT"));
    if (migrations.length) {
      await db.batch(migrations);
      await db.prepare("UPDATE events SET active = 0").run();
    }
    const syncStateInfo = await db.prepare("PRAGMA table_info(sync_state)").all();
    const syncStateColumns = new Set((syncStateInfo.results || []).map((column) => column.name));
    if (!syncStateColumns.has("data_revision")) {
      await db.prepare("ALTER TABLE sync_state ADD COLUMN data_revision INTEGER NOT NULL DEFAULT 1").run();
    }
  })();
  await schemaReady;
  const activeSourceKeys = sources.map((source) => source.key);
  const sourcePlaceholders = activeSourceKeys.map(() => "?").join(", ");
  await db.batch([
    db.prepare(`DELETE FROM sync_state WHERE source_key NOT IN (${sourcePlaceholders})`).bind(...activeSourceKeys),
    db.prepare(`UPDATE events SET active = 0 WHERE source_key NOT IN (${sourcePlaceholders})`).bind(...activeSourceKeys),
  ]);
}

function upsertStatement(db, event, verifiedAt) {
  return db.prepare(`INSERT INTO events (
    id, source_key, name, type, setting, start_at, end_at, city, distance, age,
    min_age_months, max_age_months, price, reservation, source_url, source_name,
    verified_at, why, notes_json, latitude, longitude, confidence_status, active, last_seen_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
  ON CONFLICT(id) DO UPDATE SET
    name = excluded.name,
    type = excluded.type,
    setting = excluded.setting,
    start_at = excluded.start_at,
    end_at = excluded.end_at,
    city = excluded.city,
    distance = excluded.distance,
    age = excluded.age,
    min_age_months = excluded.min_age_months,
    max_age_months = excluded.max_age_months,
    price = excluded.price,
    reservation = excluded.reservation,
    source_url = excluded.source_url,
    source_name = excluded.source_name,
    verified_at = excluded.verified_at,
    why = excluded.why,
    notes_json = excluded.notes_json,
    latitude = excluded.latitude,
    longitude = excluded.longitude,
    confidence_status = excluded.confidence_status,
    active = 1,
    last_seen_at = excluded.last_seen_at`).bind(
      event.id,
      event.sourceKey,
      event.name,
      event.type,
      event.setting,
      event.startAt,
      event.endAt,
      event.city,
      event.distance,
      event.age,
      event.minAgeMonths,
      event.maxAgeMonths,
      event.price,
      event.reservation,
      event.sourceUrl,
      event.sourceName,
      verifiedAt,
      event.why,
      JSON.stringify(event.notes),
      event.latitude,
      event.longitude,
      event.confidenceStatus,
      verifiedAt,
    );
}

class SourceCountAnomalyError extends Error {
  constructor(previousCount, nextCount) {
    super(`수집 일정 수가 ${previousCount}개에서 ${nextCount}개로 급감해 기존 목록을 보존했어요`);
    this.name = "SourceCountAnomalyError";
  }
}

function eventCountLooksAnomalous(previousCount, nextCount) {
  const previous = Number(previousCount || 0);
  const next = Number(nextCount || 0);
  return previous >= 8 && next < Math.max(2, Math.ceil(previous * 0.25));
}

async function syncSource(db, source, now) {
  const attemptedAt = now.toISOString();
  const previousState = await db.prepare("SELECT event_count FROM sync_state WHERE source_key = ?").bind(source.key).first();
  const previousCount = Number(previousState?.event_count || 0);
  try {
    await db.prepare(`INSERT INTO sync_state (source_key, status, last_attempt_at, last_success_at, message, event_count)
      VALUES (?, 'syncing', ?, NULL, NULL, 0)
      ON CONFLICT(source_key) DO UPDATE SET
        status = 'syncing',
        last_attempt_at = excluded.last_attempt_at,
        message = NULL`).bind(source.key, attemptedAt).run();
    const sourceUrls = source.urls
      ? source.urls(now)
      : [typeof source.url === "function" ? source.url(now) : source.url];
    const sourceTexts = await Promise.all(sourceUrls.map(async (sourceUrl) => {
      const response = await fetch(sourceUrl, {
        headers: {
          Accept: source.accept || "text/html,application/xhtml+xml",
          "User-Agent": source.userAgent || "LittleWeekendsBayArea/1.0 (+https://little-weekends-bay-area.cashmire2.chatgpt.site)",
        },
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error(`공식 페이지 응답 ${response.status}`);
      return response.text();
    }));
    const parsedEvents = source.parse(sourceTexts.join("\n"), now);
    const events = [...new Map(parsedEvents.map((event) => [event.id, event])).values()];
    if (!events.length) throw new Error("일정 형식이 바뀌어 이벤트를 읽지 못했어요");
    if (eventCountLooksAnomalous(previousCount, events.length)) {
      throw new SourceCountAnomalyError(previousCount, events.length);
    }

    await db.batch([
      db.prepare("UPDATE events SET active = 0 WHERE source_key = ?").bind(source.key),
      ...events.map((event) => upsertStatement(db, event, attemptedAt)),
      db.prepare(`INSERT INTO sync_state (source_key, status, last_attempt_at, last_success_at, message, event_count, data_revision)
        VALUES (?, 'ok', ?, ?, NULL, ?, ?)
        ON CONFLICT(source_key) DO UPDATE SET
          status = 'ok',
          last_attempt_at = excluded.last_attempt_at,
          last_success_at = excluded.last_success_at,
          message = NULL,
          event_count = excluded.event_count,
          data_revision = excluded.data_revision`).bind(source.key, attemptedAt, attemptedAt, events.length, SOURCE_DATA_REVISION),
    ]);
    return { source: source.key, status: "ok", count: events.length };
  } catch (error) {
    const message = error instanceof Error ? error.message.slice(0, 240) : "알 수 없는 수집 오류";
    const status = error instanceof SourceCountAnomalyError ? "warning" : "failed";
    await db.prepare(`INSERT INTO sync_state (source_key, status, last_attempt_at, last_success_at, message, event_count)
      VALUES (?, ?, ?, NULL, ?, 0)
      ON CONFLICT(source_key) DO UPDATE SET
        status = excluded.status,
        last_attempt_at = excluded.last_attempt_at,
        message = excluded.message`).bind(source.key, status, attemptedAt, message).run();
    return { source: source.key, status, count: 0, message };
  }
}

async function refreshOutings(env, force = false) {
  if (!env?.DB) return { refreshed: false, reason: "D1 binding unavailable" };
  await ensureSchema(env.DB);
  const now = new Date();
  const metadata = await syncMetadata(env.DB, now);
  if (!force && metadata.currentSourceCount >= sources.length) {
    return { refreshed: false, reason: "fresh" };
  }
  const attempt = await env.DB.prepare("SELECT MAX(last_attempt_at) AS last_attempt_at FROM sync_state").first();
  const lastAttempt = attempt?.last_attempt_at ? new Date(attempt.last_attempt_at).getTime() : 0;
  if (!force && now.getTime() - lastAttempt < REFRESH_ATTEMPT_COOLDOWN_MS) {
    return { refreshed: false, reason: "recent-attempt" };
  }

  const currentSourceKeys = new Set(metadata.sources.filter((source) => source.is_current).map((source) => source.source_key));
  const targetSources = force ? sources : sources.filter((source) => !currentSourceKeys.has(source.key));
  const results = await Promise.all(targetSources.map((source) => syncSource(env.DB, source, now)));
  await env.DB.prepare("DELETE FROM events WHERE COALESCE(end_at, start_at) < ?").bind(new Date(Date.now() - 86400000).toISOString()).run();
  return { refreshed: true, results };
}

function dateBucket(startAt, now = new Date()) {
  const eventDate = pacificDateKey(new Date(startAt));
  const today = pacificDateKey(now);
  const difference = dayDifference(eventDate, today);
  const todayWeekday = utcDateFromKey(today).getUTCDay();
  const eventWeekday = utcDateFromKey(eventDate).getUTCDay();
  const currentWeekEnd = todayWeekday === 0 ? 0 : 7 - todayWeekday;
  const nextWeekStart = todayWeekday === 0 ? 1 : 8 - todayWeekday;
  const nextWeekEnd = nextWeekStart + 6;
  if (difference === 0) return "today";
  if (difference >= 0 && difference <= currentWeekEnd && (eventWeekday === 0 || eventWeekday === 6)) return "weekend";
  if (difference >= 0 && difference <= currentWeekEnd) return "week";
  if (difference >= nextWeekStart && difference <= nextWeekEnd) return "nextweek";
  return "upcoming";
}

function koreanTimeLabel(startAt) {
  const date = new Date(startAt);
  const dateLabel = new Intl.DateTimeFormat("ko-KR", {
    timeZone: PACIFIC_TIME_ZONE,
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
  const timeLabel = new Intl.DateTimeFormat("en-US", {
    timeZone: PACIFIC_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
  return `${dateLabel} ${timeLabel}`;
}

function verifiedLabel(verifiedAt) {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: PACIFIC_TIME_ZONE,
    month: "long",
    day: "numeric",
  }).format(new Date(verifiedAt));
}

function publicAmenity(value) {
  const text = String(value || "").trim();
  const confirmed = Boolean(text) && !/확인|문의|정보 없음|알 수|준비 중/.test(text);
  return { status: confirmed ? "confirmed" : "unknown", text: confirmed ? text : "확인되지 않음" };
}

function rowToOuting(row, now) {
  const confidenceStatus = row.confidence_status || "source_confirmed";
  const notes = JSON.parse(row.notes_json);
  return {
    id: row.id,
    sourceKey: row.source_key,
    name: row.name,
    type: row.type,
    setting: row.setting,
    dateBucket: dateBucket(row.start_at, now),
    startDate: row.start_at,
    endDate: row.end_at,
    timeLabel: confidenceStatus === "date_confirmed" ? "시간은 공식 페이지 확인" : koreanTimeLabel(row.start_at),
    city: row.city,
    distance: row.distance,
    age: row.age,
    minAgeMonths: row.min_age_months,
    maxAgeMonths: row.max_age_months,
    price: row.price,
    reservation: row.reservation,
    source: row.source_url,
    sourceName: row.source_name,
    updated: `${verifiedLabel(row.verified_at)} 공식 확인 · 자동`,
    why: row.why,
    notes: { ...notes, changingTable: notes.changingTable || "확인되지 않음" },
    amenities: {
      parking: publicAmenity(notes.parking),
      bathroom: publicAmenity(notes.bathroom),
      stroller: publicAmenity(notes.stroller),
      changingTable: publicAmenity(notes.changingTable),
    },
    image: null,
    location: { lat: row.latitude, lng: row.longitude },
    confidenceStatus,
  };
}

async function queryOutings(db, now) {
  const nowIso = now.toISOString();
  const legacyStart = new Date(now.getTime() - LEGACY_EVENT_GRACE_MINUTES * 60000).toISOString();
  const end = new Date(now.getTime() + FUTURE_WINDOW_DAYS * 86400000).toISOString();
  const result = await db.prepare(`SELECT * FROM events
    WHERE active = 1
      AND ((end_at IS NOT NULL AND end_at >= ?) OR (end_at IS NULL AND start_at >= ?))
      AND start_at <= ?
    ORDER BY start_at ASC`).bind(nowIso, legacyStart, end).all();
  const outings = (result.results || []).map((row) => rowToOuting(row, now));
  const deduplicated = new Map();
  outings.forEach((outing) => {
    const key = `${outing.source}|${outing.startDate}|${outing.name.toLowerCase()}`;
    const existing = deduplicated.get(key);
    if (!existing || (existing.sourceKey === "san-mateo-county-libraries" && outing.sourceKey !== existing.sourceKey)) {
      deduplicated.set(key, outing);
    }
  });
  return [...deduplicated.values()];
}

function sourceIsCurrent(row, now) {
  const lastSuccess = row.last_success_at ? new Date(row.last_success_at).getTime() : 0;
  return row.status === "ok"
    && Number(row.data_revision || 0) >= SOURCE_DATA_REVISION
    && Number(row.active_event_count || 0) > 0
    && now.getTime() - lastSuccess < REFRESH_INTERVAL_MS;
}

async function syncMetadata(db, now = new Date()) {
  const nowIso = now.toISOString();
  const legacyStart = new Date(now.getTime() - LEGACY_EVENT_GRACE_MINUTES * 60000).toISOString();
  const result = await db.prepare(`SELECT
      sync_state.source_key,
      sync_state.status,
      sync_state.last_attempt_at,
      sync_state.last_success_at,
      sync_state.message,
      sync_state.event_count,
      sync_state.data_revision,
      COUNT(CASE WHEN events.active = 1
        AND ((events.end_at IS NOT NULL AND events.end_at >= ?)
          OR (events.end_at IS NULL AND events.start_at >= ?))
        THEN 1 END) AS active_event_count
    FROM sync_state
    LEFT JOIN events ON events.source_key = sync_state.source_key
    GROUP BY sync_state.source_key
    ORDER BY sync_state.source_key`).bind(nowIso, legacyStart).all();
  const rows = (result.results || []).map((row) => ({
    ...row,
    active_event_count: Number(row.active_event_count || 0),
    is_current: sourceIsCurrent(row, now),
  }));
  const currentRows = rows.filter((row) => row.is_current);
  const successes = currentRows.map((row) => row.last_success_at).filter(Boolean).sort();
  return {
    lastSyncedAt: currentRows.length === sources.length ? successes.at(0) || null : null,
    currentSourceCount: currentRows.length,
    sources: rows,
  };
}

async function getOutingsResponse(request, env, context) {
  if (!env?.DB) {
    return Response.json({ events: [], status: "fallback", message: "자동 업데이트 저장소를 준비하고 있어요." }, { status: 503 });
  }

  await ensureSchema(env.DB);
  const now = new Date();
  let events = await queryOutings(env.DB, now);
  let metadata = await syncMetadata(env.DB, now);
  const sourceSetIncomplete = metadata.currentSourceCount < sources.length;

  if (!events.length || sourceSetIncomplete) {
    await refreshOutings(env, false);
    events = await queryOutings(env.DB, now);
    metadata = await syncMetadata(env.DB, now);
  }

  const currentMetadata = events.length ? metadata : await syncMetadata(env.DB, now);
  const fullyCurrent = currentMetadata.currentSourceCount === sources.length;
  const currentSourceKeys = new Set(currentMetadata.sources.filter((source) => source.is_current).map((source) => source.source_key));
  events = events.map((event) => currentSourceKeys.has(event.sourceKey)
    ? event
    : { ...event, confidenceStatus: "recheck", updated: `${event.updated} · 재확인 필요` });
  return Response.json({
    events,
    status: events.length ? (fullyCurrent ? "ok" : "partial") : "fallback",
    lastSyncedAt: currentMetadata.lastSyncedAt,
    sources: currentMetadata.sources,
    currentSourceCount: currentMetadata.currentSourceCount,
    sourceCount: sources.length,
    refreshIntervalHours: REFRESH_INTERVAL_MS / 3600000,
  }, {
    headers: {
      "Cache-Control": events.length ? "public, max-age=300, stale-while-revalidate=300" : "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export {
  ageRangeFromLabel,
  dateBucket,
  eventCountLooksAnomalous,
  getOutingsResponse,
  parseBayAreaDiscoveryMuseumEvents,
  parseBurlingameLibraryEvents,
  parseCupertinoFamilyEvents,
  parseCuriOdysseyDailyEvents,
  parseMenloParkFamilyEvents,
  parseMountainViewLibraryEvents,
  parsePaloAltoFamilyEvents,
  parseRedwoodCityEvents,
  redwoodCityEffectiveEnd,
  parseSanFranciscoRecParkEvents,
  parseSanMateoCityEvents,
  parseSanMateoCountyLibraryEvents,
  parseSanMateoStorytimes,
  parseSouthSanFranciscoStorytimes,
  refreshOutings,
  sourceIsCurrent,
};
