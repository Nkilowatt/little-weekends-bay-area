const PACIFIC_TIME_ZONE = "America/Los_Angeles";
const REFRESH_INTERVAL_MS = 6 * 60 * 60 * 1000;
const FUTURE_WINDOW_DAYS = 45;

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

function makeEvent({ sourceKey, sourceUrl, sourceName, name, dateKey, time, location, setting = "indoor" }) {
  const clock = parseClock(time);
  if (!clock) return null;
  const startAt = pacificIso(dateKey, clock);
  const type = /storytime|cuentos|move and groove/i.test(name) ? "storytime" : "seasonal";
  const id = `${sourceKey}-${dateKey}-${clock.replace(":", "")}-${slugify(name)}-${slugify(location.label)}`;
  return {
    id,
    sourceKey,
    name,
    type,
    setting,
    startAt,
    city: location.city,
    distance: location.distance,
    age: ageForProgram(name),
    price: "free",
    reservation: "예약 불필요 · 정원은 현장 상황에 따라 달라요",
    sourceUrl,
    sourceName,
    why: setting === "outdoor"
      ? "공식 일정에서 확인한 야외 스토리타임으로 책과 바깥놀이를 한 번에 즐기기 좋아요."
      : "공식 도서관 일정에서 자동 확인한 영유아 프로그램이에요.",
    notes: {
      parking: location.parking,
      bathroom: location.bathroom,
      stroller: location.stroller,
    },
    latitude: location.latitude,
    longitude: location.longitude,
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

function createSchemaStatements(db) {
  return [
    db.prepare(`CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY NOT NULL,
      source_key TEXT NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      setting TEXT NOT NULL,
      start_at TEXT NOT NULL,
      city TEXT NOT NULL,
      distance REAL NOT NULL,
      age TEXT NOT NULL,
      price TEXT NOT NULL,
      reservation TEXT NOT NULL,
      source_url TEXT NOT NULL,
      source_name TEXT NOT NULL,
      verified_at TEXT NOT NULL,
      why TEXT NOT NULL,
      notes_json TEXT NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
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
  schemaReady ||= db.batch(createSchemaStatements(db));
  await schemaReady;
}

function upsertStatement(db, event, verifiedAt) {
  return db.prepare(`INSERT INTO events (
    id, source_key, name, type, setting, start_at, city, distance, age, price,
    reservation, source_url, source_name, verified_at, why, notes_json,
    latitude, longitude, active, last_seen_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
  ON CONFLICT(id) DO UPDATE SET
    name = excluded.name,
    type = excluded.type,
    setting = excluded.setting,
    start_at = excluded.start_at,
    city = excluded.city,
    distance = excluded.distance,
    age = excluded.age,
    price = excluded.price,
    reservation = excluded.reservation,
    source_url = excluded.source_url,
    source_name = excluded.source_name,
    verified_at = excluded.verified_at,
    why = excluded.why,
    notes_json = excluded.notes_json,
    latitude = excluded.latitude,
    longitude = excluded.longitude,
    active = 1,
    last_seen_at = excluded.last_seen_at`).bind(
      event.id,
      event.sourceKey,
      event.name,
      event.type,
      event.setting,
      event.startAt,
      event.city,
      event.distance,
      event.age,
      event.price,
      event.reservation,
      event.sourceUrl,
      event.sourceName,
      verifiedAt,
      event.why,
      JSON.stringify(event.notes),
      event.latitude,
      event.longitude,
      verifiedAt,
    );
}

async function syncSource(db, source, now) {
  const attemptedAt = now.toISOString();
  try {
    const response = await fetch(source.url, {
      headers: {
        Accept: "text/html,application/xhtml+xml",
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
  const status = await env.DB.prepare("SELECT MAX(last_success_at) AS last_success_at FROM sync_state").first();
  const lastSuccess = status?.last_success_at ? new Date(status.last_success_at).getTime() : 0;
  if (!force && Date.now() - lastSuccess < REFRESH_INTERVAL_MS) {
    return { refreshed: false, reason: "fresh" };
  }

  const now = new Date();
  const results = await Promise.all(sources.map((source) => syncSource(env.DB, source, now)));
  await env.DB.prepare("DELETE FROM events WHERE start_at < ?").bind(new Date(Date.now() - 86400000).toISOString()).run();
  return { refreshed: true, results };
}

function dateBucket(startAt, now = new Date()) {
  const eventDate = pacificDateKey(new Date(startAt));
  const today = pacificDateKey(now);
  const difference = dayDifference(eventDate, today);
  const todayWeekday = utcDateFromKey(today).getUTCDay();
  const eventWeekday = utcDateFromKey(eventDate).getUTCDay();
  const currentWeekEnd = 7 - todayWeekday;
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
    name: row.name,
    type: row.type,
    setting: row.setting,
    dateBucket: dateBucket(row.start_at, now),
    startDate: row.start_at,
    timeLabel: koreanTimeLabel(row.start_at),
    city: row.city,
    distance: row.distance,
    age: row.age,
    price: row.price,
    reservation: row.reservation,
    source: row.source_url,
    sourceName: row.source_name,
    updated: `${verifiedLabel(row.verified_at)} 공식 확인 · 자동`,
    why: row.why,
    notes: JSON.parse(row.notes_json),
    location: { lat: row.latitude, lng: row.longitude },
  };
}

async function queryOutings(db, now) {
  const start = new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString();
  const end = new Date(Date.now() + FUTURE_WINDOW_DAYS * 86400000).toISOString();
  const result = await db.prepare(`SELECT * FROM events
    WHERE active = 1 AND start_at >= ? AND start_at <= ?
    ORDER BY start_at ASC`).bind(start, end).all();
  return (result.results || []).map((row) => rowToOuting(row, now));
}

async function syncMetadata(db) {
  const result = await db.prepare("SELECT source_key, status, last_attempt_at, last_success_at, message, event_count FROM sync_state ORDER BY source_key").all();
  const rows = result.results || [];
  const successes = rows.map((row) => row.last_success_at).filter(Boolean).sort();
  return {
    lastSyncedAt: successes.at(-1) || null,
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
  const metadata = await syncMetadata(env.DB);
  const lastSuccess = metadata.lastSyncedAt ? new Date(metadata.lastSyncedAt).getTime() : 0;
  const isStale = Date.now() - lastSuccess >= REFRESH_INTERVAL_MS;

  if (!events.length) {
    await refreshOutings(env, true);
    events = await queryOutings(env.DB, now);
  } else if (isStale) {
    const refresh = refreshOutings(env, true);
    if (context?.waitUntil) context.waitUntil(refresh);
    else await refresh;
  }

  const currentMetadata = events.length ? await syncMetadata(env.DB) : metadata;
  return Response.json({
    events,
    status: events.length ? "ok" : "fallback",
    lastSyncedAt: currentMetadata.lastSyncedAt,
    sources: currentMetadata.sources,
    refreshIntervalHours: REFRESH_INTERVAL_MS / 3600000,
  }, {
    headers: {
      "Cache-Control": "public, max-age=300, stale-while-revalidate=300",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export {
  dateBucket,
  getOutingsResponse,
  parseSanMateoStorytimes,
  parseSouthSanFranciscoStorytimes,
  refreshOutings,
};
