const PACIFIC_TIME_ZONE = "America/Los_Angeles";
const REFRESH_INTERVAL_MS = 6 * 60 * 60 * 1000;
const FUTURE_WINDOW_DAYS = 45;
const DEFAULT_EVENT_DURATION_MINUTES = 60;
const LEGACY_EVENT_GRACE_MINUTES = 90;
const REFRESH_ATTEMPT_COOLDOWN_MS = 5 * 60 * 1000;

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
}) {
  const clock = parseClock(time);
  if (!clock) return null;
  const startAt = pacificIso(dateKey, clock);
  const endAt = new Date(new Date(startAt).getTime() + durationMinutes * 60000).toISOString();
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
    confidenceStatus: "source_confirmed",
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

function parseSanMateoCountyLibraryEvents(xml, now = new Date()) {
  const today = pacificDateKey(now);
  const lastDate = addDays(today, FUTURE_WINDOW_DAYS);
  const events = [];
  const itemPattern = /<item>([\s\S]*?)<\/item>/gi;
  let item;

  while ((item = itemPattern.exec(xml))) {
    const block = item[1];
    const categories = xmlValues(block, "category");
    const audienceMatch = categories.some((category) => /Preschoolers \(0-5\)|All Ages/i.test(category));
    const childMatch = categories.some((category) => /Children \(6-11\)/i.test(category));
    const name = xmlValue(block, "title");
    const broadlyKidFriendly = /animal|music|puppet|magic|play|dance|family|kids|craft|maker|steam|story/i.test(`${name} ${categories.join(" ")}`);
    if (!audienceMatch && !(childMatch && broadlyKidFriendly)) continue;
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
      sourceKey: sources[2].key,
      sourceUrl: xmlValue(block, "link"),
      sourceName: "San Mateo County Libraries",
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

  return events;
}

function sanMateoCityCalendarUrl(now = new Date()) {
  const parts = dateParts(now);
  return `https://www.cityofsanmateo.org/calendar.aspx?CID=0&month=${Number(parts.month)}&view=list&year=${parts.year}`;
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
    if (/cancelled|commission|meeting|senior|planning/i.test(context)) continue;
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
      event_count INTEGER NOT NULL DEFAULT 0
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
  })();
  await schemaReady;
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

async function syncSource(db, source, now) {
  const attemptedAt = now.toISOString();
  try {
    await db.prepare(`INSERT INTO sync_state (source_key, status, last_attempt_at, last_success_at, message, event_count)
      VALUES (?, 'syncing', ?, NULL, NULL, 0)
      ON CONFLICT(source_key) DO UPDATE SET
        status = 'syncing',
        last_attempt_at = excluded.last_attempt_at,
        message = NULL`).bind(source.key, attemptedAt).run();
    const sourceUrl = typeof source.url === "function" ? source.url(now) : source.url;
    const response = await fetch(sourceUrl, {
      headers: {
        Accept: source.accept || "text/html,application/xhtml+xml",
        "User-Agent": "LittleWeekendsBayArea/1.0 (+https://little-weekends-bay-area.cashmire2.chatgpt.site)",
      },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`공식 페이지 응답 ${response.status}`);
    const events = source.parse(await response.text(), now);
    if (!events.length) throw new Error("일정 형식이 바뀌어 이벤트를 읽지 못했어요");

    await db.batch([
      db.prepare("UPDATE events SET active = 0 WHERE source_key = ?").bind(source.key),
      ...events.map((event) => upsertStatement(db, event, attemptedAt)),
      db.prepare(`INSERT INTO sync_state (source_key, status, last_attempt_at, last_success_at, message, event_count)
        VALUES (?, 'ok', ?, ?, NULL, ?)
        ON CONFLICT(source_key) DO UPDATE SET
          status = 'ok',
          last_attempt_at = excluded.last_attempt_at,
          last_success_at = excluded.last_success_at,
          message = NULL,
          event_count = excluded.event_count`).bind(source.key, attemptedAt, attemptedAt, events.length),
    ]);
    return { source: source.key, status: "ok", count: events.length };
  } catch (error) {
    const message = error instanceof Error ? error.message.slice(0, 240) : "알 수 없는 수집 오류";
    await db.prepare(`INSERT INTO sync_state (source_key, status, last_attempt_at, last_success_at, message, event_count)
      VALUES (?, 'failed', ?, NULL, ?, 0)
      ON CONFLICT(source_key) DO UPDATE SET
        status = 'failed',
        last_attempt_at = excluded.last_attempt_at,
        message = excluded.message`).bind(source.key, attemptedAt, message).run();
    return { source: source.key, status: "failed", count: 0, message };
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

function rowToOuting(row, now) {
  return {
    id: row.id,
    sourceKey: row.source_key,
    name: row.name,
    type: row.type,
    setting: row.setting,
    dateBucket: dateBucket(row.start_at, now),
    startDate: row.start_at,
    endDate: row.end_at,
    timeLabel: koreanTimeLabel(row.start_at),
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
    notes: JSON.parse(row.notes_json),
    location: { lat: row.latitude, lng: row.longitude },
    confidenceStatus: row.confidence_status || "source_confirmed",
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
  return (result.results || []).map((row) => rowToOuting(row, now));
}

function sourceIsCurrent(row, now) {
  const lastSuccess = row.last_success_at ? new Date(row.last_success_at).getTime() : 0;
  return row.status === "ok"
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
  getOutingsResponse,
  parseBayAreaDiscoveryMuseumEvents,
  parseCuriOdysseyDailyEvents,
  parseSanMateoCityEvents,
  parseSanMateoCountyLibraryEvents,
  parseSanMateoStorytimes,
  parseSouthSanFranciscoStorytimes,
  refreshOutings,
  sourceIsCurrent,
};
