const MAX_BODY_BYTES = 16384;
const MAX_MESSAGE_LENGTH = 1200;
const MAX_EMAIL_LENGTH = 254;
const CATEGORY_VALUES = new Set(["place_request", "improvement", "correction", "photo_report", "other"]);
const REQUEST_ID_PATTERN = /^[0-9a-f-]{36}$/i;

function jsonResponse(payload, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
  });
}

function mutationAllowed(request) {
  const url = new URL(request.url);
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (origin && origin !== url.origin) return false;
  return fetchSite !== "cross-site";
}

async function readJsonBody(request) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_BODY_BYTES) throw new Error("PAYLOAD_TOO_LARGE");
  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) throw new Error("PAYLOAD_TOO_LARGE");
  try {
    return JSON.parse(text || "{}");
  } catch {
    throw new Error("INVALID_JSON");
  }
}

function safeSingleLine(value, maxLength) {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function safeMessage(value) {
  return String(value ?? "")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);
}

function safeContext(value) {
  const context = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const filters = context.filters && typeof context.filters === "object" && !Array.isArray(context.filters)
    ? context.filters
    : {};
  return {
    page: safeSingleLine(context.page, 120),
    locationKey: safeSingleLine(context.locationKey, 80),
    locationName: safeSingleLine(context.locationName, 100),
    outingId: safeSingleLine(context.outingId, 220),
    photoId: safeSingleLine(context.photoId, 80),
    placeKey: safeSingleLine(context.placeKey, 220),
    sharedPlan: Boolean(context.sharedPlan),
    filters: Object.fromEntries(
      ["date", "distance", "region", "age", "type", "setting", "price", "time", "reservation", "discoveryMode"]
        .map((key) => [key, safeSingleLine(filters[key], 80)])
        .filter(([, value]) => value),
    ),
  };
}

function validEmail(email) {
  return !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function ensureFeedbackSchema(db) {
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS feedback_submissions (
      id TEXT PRIMARY KEY NOT NULL,
      request_id TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL,
      message TEXT NOT NULL,
      email TEXT,
      context_json TEXT NOT NULL DEFAULT '{}',
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL
    )`),
    db.prepare("CREATE INDEX IF NOT EXISTS feedback_submissions_status_created_idx ON feedback_submissions (status, created_at DESC)"),
  ]);
}

async function createFeedback(request, env) {
  if (!mutationAllowed(request)) return jsonResponse({ error: "허용되지 않은 요청이에요." }, 403);
  const body = await readJsonBody(request);

  // Honeypot submissions receive a normal response but are intentionally not stored.
  if (safeSingleLine(body.website, 200)) return jsonResponse({ ok: true }, 201);

  const category = CATEGORY_VALUES.has(body.category) ? body.category : "";
  const message = safeMessage(body.message);
  const email = safeSingleLine(body.email, MAX_EMAIL_LENGTH).toLowerCase();
  const requestId = REQUEST_ID_PATTERN.test(String(body.requestId || "")) ? body.requestId : "";

  if (!category) return jsonResponse({ error: "의견 종류를 선택해 주세요." }, 400);
  if (message.length < 5) return jsonResponse({ error: "의견을 5자 이상 적어 주세요." }, 400);
  if (!validEmail(email)) return jsonResponse({ error: "이메일 주소 형식을 확인해 주세요." }, 400);
  if (!requestId) return jsonResponse({ error: "요청 식별자가 올바르지 않아요. 다시 시도해 주세요." }, 400);

  await ensureFeedbackSchema(env.DB);
  const id = `feedback_${crypto.randomUUID()}`;
  const createdAt = new Date().toISOString();
  await env.DB.prepare(`INSERT INTO feedback_submissions (
    id, request_id, category, message, email, context_json, status, created_at
  ) VALUES (?, ?, ?, ?, ?, ?, 'new', ?)
  ON CONFLICT(request_id) DO NOTHING`)
    .bind(id, requestId, category, message, email || null, JSON.stringify(safeContext(body.context)), createdAt)
    .run();

  return jsonResponse({ ok: true }, 201);
}

export async function handleFeedbackRequest(request, env) {
  const url = new URL(request.url);
  if (url.pathname !== "/api/feedback") return null;
  if (request.method !== "POST") {
    return jsonResponse({ error: "지원하지 않는 요청 방식이에요." }, 405, { Allow: "POST" });
  }
  try {
    return await createFeedback(request, env);
  } catch (error) {
    if (error?.message === "PAYLOAD_TOO_LARGE") return jsonResponse({ error: "의견이 너무 길어요. 내용을 줄여 주세요." }, 413);
    if (error?.message === "INVALID_JSON") return jsonResponse({ error: "의견 내용을 읽지 못했어요. 다시 시도해 주세요." }, 400);
    return jsonResponse({ error: "의견을 저장하지 못했어요. 잠시 후 다시 시도해 주세요." }, 500);
  }
}
