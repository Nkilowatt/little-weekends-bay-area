const PACIFIC_TIME_ZONE = "America/Los_Angeles";
const MAX_REQUEST_URL_LENGTH = 8192;

function escapeCalendarText(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function utcCalendarTime(value) {
  return new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function pacificDateKey(value) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: PACIFIC_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

function addDays(key, days) {
  const [year, month, day] = key.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days, 12));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

function calendarDate(key) {
  return key.replace(/-/g, "");
}

function safeHttpUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : "";
  } catch {
    return "";
  }
}

function foldCalendarLine(line) {
  const encoder = new TextEncoder();
  const output = [];
  let segment = "";
  let segmentLength = 0;
  let limit = 75;

  for (const character of line) {
    const characterLength = encoder.encode(character).length;
    if (segment && segmentLength + characterLength > limit) {
      output.push(segment);
      segment = ` ${character}`;
      segmentLength = 1 + characterLength;
      limit = 75;
      continue;
    }
    segment += character;
    segmentLength += characterLength;
  }

  output.push(segment);
  return output.join("\r\n");
}

function buildCalendarResponseFile(params, now = new Date()) {
  const name = String(params.get("name") || "").trim().slice(0, 180);
  const id = String(params.get("id") || "outing").trim().slice(0, 220);
  const start = new Date(params.get("start") || "");
  if (!name || !Number.isFinite(start.getTime())) return null;

  const suppliedEnd = params.get("end") ? new Date(params.get("end")) : null;
  const status = String(params.get("status") || "source_confirmed").slice(0, 40);
  const location = String(params.get("location") || "").trim().slice(0, 280);
  const why = String(params.get("why") || "").trim().slice(0, 360);
  const source = safeHttpUrl(params.get("source"));
  const detail = safeHttpUrl(params.get("detail"));
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Little Weekends Bay Area//Calendar Event//KO",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${escapeCalendarText(id)}@little-weekends-bay-area`,
    `DTSTAMP:${utcCalendarTime(now)}`,
  ];

  if (status === "date_confirmed") {
    const startKey = pacificDateKey(start);
    lines.push(`DTSTART;VALUE=DATE:${calendarDate(startKey)}`);
    lines.push(`DTEND;VALUE=DATE:${calendarDate(addDays(startKey, 1))}`);
  } else {
    const end = suppliedEnd && Number.isFinite(suppliedEnd.getTime()) && suppliedEnd > start
      ? suppliedEnd
      : new Date(start.getTime() + 90 * 60000);
    lines.push(`DTSTART:${utcCalendarTime(start)}`);
    lines.push(`DTEND:${utcCalendarTime(end)}`);
  }

  const notes = [why];
  if (status === "recurring_estimate") notes.push("반복 일정 예상입니다. 방문 전 공식 페이지에서 시간을 확인해 주세요.");
  if (status === "date_confirmed") notes.push("날짜만 확인된 행사입니다. 공식 페이지에서 시작 시간을 확인해 주세요.");
  if (source) notes.push(`공식 정보: ${source}`);
  if (detail) notes.push(`저장한 일정 보기: ${detail}`);

  lines.push(`SUMMARY:${escapeCalendarText(name)}`);
  if (location) lines.push(`LOCATION:${escapeCalendarText(location)}`);
  lines.push(`DESCRIPTION:${escapeCalendarText(notes.filter(Boolean).join("\n"))}`);
  if (detail) lines.push(`URL:${escapeCalendarText(detail)}`);
  lines.push("END:VEVENT", "END:VCALENDAR", "");

  const content = lines.map(foldCalendarLine).join("\r\n");
  return `\uFEFF${content}`;
}

export function handleCalendarRequest(request, now = new Date()) {
  const url = new URL(request.url);
  if (url.pathname !== "/calendar.ics") return null;
  if (request.method !== "GET") {
    return new Response("Method not allowed", {
      status: 405,
      headers: { Allow: "GET" },
    });
  }
  if (request.url.length > MAX_REQUEST_URL_LENGTH) {
    return new Response("Calendar request is too long", { status: 414 });
  }

  const content = buildCalendarResponseFile(url.searchParams, now);
  if (!content) {
    return new Response("Calendar event is invalid", {
      status: 400,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(content, {
    status: 200,
    headers: {
      "Cache-Control": "private, max-age=300",
      "Content-Disposition": 'inline; filename="little-weekends.ics"',
      "Content-Language": "ko",
      "Content-Type": "text/calendar; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
