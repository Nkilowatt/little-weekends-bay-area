(function attachPlanningHelpers(global) {
  "use strict";

  const PACIFIC_TIME_ZONE = "America/Los_Angeles";

  function dateKey(value, timeZone = PACIFIC_TIME_ZONE) {
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const date = value ? new Date(value) : new Date();
    if (!Number.isFinite(date.getTime())) return "";
    return new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(date);
  }

  function addDays(key, days) {
    const [year, month, day] = key.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day + days, 12));
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
  }

  function weekday(key) {
    const [year, month, day] = key.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day, 12)).getUTCDay();
  }

  function deepLinkUrl(currentUrl, id) {
    const url = new URL(currentUrl);
    url.searchParams.set("outing", id);
    url.hash = "";
    return url.toString();
  }

  function clearDeepLinkUrl(currentUrl) {
    const url = new URL(currentUrl);
    url.searchParams.delete("outing");
    url.hash = "";
    return url.toString();
  }

  function groupSavedItems(items, today = dateKey()) {
    const currentWeekday = weekday(today);
    const mondayOffset = (currentWeekday + 6) % 7;
    const saturday = addDays(today, 5 - mondayOffset);
    const sunday = addDays(today, 6 - mondayOffset);
    const nextMonday = addDays(today, 7 - mondayOffset);
    const nextSunday = addDays(today, 13 - mondayOffset);
    const groups = [
      { key: "past", label: "지난 일정", items: [] },
      { key: "today", label: "오늘", items: [] },
      { key: "thisweek", label: "이번 주", items: [] },
      { key: "weekend", label: "이번 주말", items: [] },
      { key: "nextweek", label: "다음 주", items: [] },
      { key: "later", label: "그 이후", items: [] },
      { key: "anytime", label: "언제든 갈 수 있는 곳", items: [] }
    ];
    const groupMap = Object.fromEntries(groups.map((group) => [group.key, group]));

    items.forEach((item) => {
      const itemKey = item.startDate ? dateKey(item.startDate) : "";
      let groupKey = "anytime";
      if (itemKey) {
        if (itemKey < today) groupKey = "past";
        else if (itemKey === today) groupKey = "today";
        else if (itemKey < saturday) groupKey = "thisweek";
        else if (itemKey <= sunday) groupKey = "weekend";
        else if (itemKey >= nextMonday && itemKey <= nextSunday) groupKey = "nextweek";
        else groupKey = "later";
      }
      groupMap[groupKey].items.push(item);
    });

    groups.forEach((group) => {
      group.items.sort((left, right) => {
        if (!left.startDate || !right.startDate) return String(left.name).localeCompare(String(right.name), "ko");
        return new Date(left.startDate) - new Date(right.startDate);
      });
    });

    return groups.filter((group) => group.items.length);
  }

  function timeParts(value, timeZone = PACIFIC_TIME_ZONE) {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    }).formatToParts(new Date(value));
    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    return Number(values.hour) * 60 + Number(values.minute);
  }

  function effectiveEndTime(item) {
    if (!item?.startDate || item.confidenceStatus === "date_confirmed") return null;
    const start = new Date(item.startDate);
    if (!Number.isFinite(start.getTime())) return null;
    const suppliedEnd = item.endDate ? new Date(item.endDate) : null;
    if (suppliedEnd && Number.isFinite(suppliedEnd.getTime()) && suppliedEnd > start) return suppliedEnd;
    return new Date(start.getTime() + 90 * 60000);
  }

  function outingTimeStatus(item, now = new Date()) {
    if (!item?.startDate) return { key: "place", label: "방문 가능 장소" };
    const start = new Date(item.startDate);
    if (!Number.isFinite(start.getTime())) return { key: "unknown", label: "시간 확인 필요" };
    if (item.confidenceStatus === "date_confirmed") {
      return dateKey(start) < dateKey(now)
        ? { key: "ended", label: "종료" }
        : { key: "time_unknown", label: "시간 확인 필요" };
    }
    const end = effectiveEndTime(item);
    if (end && now >= end) return { key: "ended", label: "종료" };
    if (now >= start) return { key: "ongoing", label: "진행 중" };
    const minutesUntilStart = (start - now) / 60000;
    if (minutesUntilStart <= 120) return { key: "soon", label: "곧 시작" };
    return { key: "scheduled", label: "시간 지정 일정" };
  }

  function isOutingCurrent(item, now = new Date()) {
    return outingTimeStatus(item, now).key !== "ended";
  }

  function parseClock(value) {
    const match = /^(\d{2}):(\d{2})$/.exec(String(value || ""));
    if (!match) return NaN;
    const minutes = Number(match[1]) * 60 + Number(match[2]);
    return Number(match[1]) < 24 && Number(match[2]) < 60 ? minutes : NaN;
  }

  function detectPlanIssues(items, napWindow = {}, timeZone = PACIFIC_TIME_ZONE) {
    const issues = Object.fromEntries(items.map((item) => [item.id, []]));
    const timedItems = items.map((item) => {
      if (!item.startDate || item.confidenceStatus === "date_confirmed") return null;
      const start = new Date(item.startDate);
      if (!Number.isFinite(start.getTime())) return null;
      const suppliedEnd = item.endDate ? new Date(item.endDate) : null;
      const end = suppliedEnd && Number.isFinite(suppliedEnd.getTime()) && suppliedEnd > start
        ? suppliedEnd
        : new Date(start.getTime() + 90 * 60000);
      return { item, start, end, day: dateKey(start, timeZone) };
    }).filter(Boolean);

    const addIssue = (id, message) => {
      if (!issues[id].includes(message)) issues[id].push(message);
    };

    timedItems.forEach((left, index) => {
      timedItems.slice(index + 1).forEach((right) => {
        if (left.day !== right.day) return;
        if (left.start < right.end && right.start < left.end) {
          addIssue(left.item.id, "다른 저장 일정과 시간이 겹쳐요");
          addIssue(right.item.id, "다른 저장 일정과 시간이 겹쳐요");
        }
      });
    });

    const napStart = parseClock(napWindow.start);
    const napEnd = parseClock(napWindow.end);
    if (napWindow.enabled && Number.isFinite(napStart) && Number.isFinite(napEnd) && napStart < napEnd) {
      timedItems.forEach(({ item, start, end, day }) => {
        const localStart = timeParts(start, timeZone);
        const endDay = dateKey(end, timeZone);
        const localEnd = endDay === day ? timeParts(end, timeZone) : 24 * 60;
        if (localStart < napEnd && napStart < localEnd) addIssue(item.id, "설정한 낮잠 시간과 겹쳐요");
      });
    }

    return issues;
  }

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

  function calendarDate(key) {
    return key.replace(/-/g, "");
  }

  function buildCalendarFile(item, detailUrl, now = new Date()) {
    if (!item?.startDate) return null;
    const start = new Date(item.startDate);
    if (!Number.isFinite(start.getTime())) return null;
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Little Weekends Bay Area//Weekend Plan//KO",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${escapeCalendarText(item.id)}@little-weekends-bay-area`,
      `DTSTAMP:${utcCalendarTime(now)}`
    ];

    if (item.confidenceStatus === "date_confirmed") {
      const startKey = dateKey(start);
      lines.push(`DTSTART;VALUE=DATE:${calendarDate(startKey)}`);
      lines.push(`DTEND;VALUE=DATE:${calendarDate(addDays(startKey, 1))}`);
    } else {
      const suppliedEnd = item.endDate ? new Date(item.endDate) : null;
      const end = suppliedEnd && Number.isFinite(suppliedEnd.getTime()) && suppliedEnd > start
        ? suppliedEnd
        : new Date(start.getTime() + 90 * 60000);
      lines.push(`DTSTART:${utcCalendarTime(start)}`);
      lines.push(`DTEND:${utcCalendarTime(end)}`);
    }

    const notes = [item.why];
    if (item.confidenceStatus === "recurring_estimate") notes.push("반복 일정 예상입니다. 방문 전 공식 페이지에서 시간을 확인해 주세요.");
    if (item.confidenceStatus === "date_confirmed") notes.push("날짜만 확인된 행사입니다. 공식 페이지에서 시작 시간을 확인해 주세요.");
    if (item.source) notes.push(`공식 정보: ${item.source}`);
    if (detailUrl) notes.push(`저장한 일정 보기: ${detailUrl}`);

    lines.push(`SUMMARY:${escapeCalendarText(item.name)}`);
    lines.push(`LOCATION:${escapeCalendarText(item.address || item.city)}`);
    lines.push(`DESCRIPTION:${escapeCalendarText(notes.filter(Boolean).join("\n"))}`);
    if (detailUrl) lines.push(`URL:${escapeCalendarText(detailUrl)}`);
    lines.push("END:VEVENT", "END:VCALENDAR", "");

    const safeName = String(item.name || "little-weekends")
      .normalize("NFKD")
      .replace(/[^a-zA-Z0-9가-힣]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 64) || "little-weekends";

    return { content: lines.join("\r\n"), filename: `${safeName}.ics` };
  }

  global.LITTLE_WEEKENDS_PLANNING = {
    buildCalendarFile,
    clearDeepLinkUrl,
    deepLinkUrl,
    detectPlanIssues,
    effectiveEndTime,
    groupSavedItems,
    isOutingCurrent,
    outingTimeStatus
  };
})(typeof window === "object" ? window : globalThis);
