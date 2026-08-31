const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const MAX_DEVICE_UPLOADS_PER_DAY = 3;
const MAX_PENDING_PER_PLACE = 12;
const CONSENT_VERSION = "2026-08-v1";
const PLACE_KEY_PATTERN = /^[a-z0-9][a-z0-9-]{2,219}$/i;
const REQUEST_ID_PATTERN = /^[0-9a-f-]{36}$/i;
const SECRET_PATTERN = /^[A-Za-z0-9_-]{24,120}$/;
const SUBMISSION_ID_PATTERN = /^photo_[0-9a-f-]{36}$/i;
const REPORT_ID_PATTERN = /^report_[0-9a-f-]{36}$/i;
const ACCEPTED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

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

function safeText(value, maxLength = 180) {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function safeDate(value) {
  const text = String(value || "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return null;
  const date = new Date(`${text}T12:00:00Z`);
  return Number.isFinite(date.getTime()) ? text : null;
}

function randomToken(byteLength = 24) {
  const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function hashValue(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(value || "")));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function imageTypeFromBytes(bytes) {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (bytes.length >= 8 && [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((value, index) => bytes[index] === value)) return "image/png";
  if (bytes.length >= 12
    && String.fromCharCode(...bytes.slice(0, 4)) === "RIFF"
    && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP") return "image/webp";
  return null;
}

function uploadConfigured(env) {
  return Boolean(env?.DB
    && env?.UPLOADS
    && env?.IMAGES
    && reviewerEmails(env).size > 0
    && String(env?.PHOTO_UPLOADS_ENABLED || "").toLowerCase() === "true");
}

function reviewerEmails(env) {
  return new Set(String(env?.PHOTO_REVIEWER_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean));
}

function reviewer(request, env) {
  const email = safeText(request.headers.get("oai-authenticated-user-email"), 254).toLowerCase();
  const userId = safeText(request.headers.get("oai-authenticated-user-id"), 180);
  return email && userId && reviewerEmails(env).has(email) ? { email, userId } : null;
}

function reviewerResponse(request, env) {
  const email = safeText(request.headers.get("oai-authenticated-user-email"), 254).toLowerCase();
  if (!email) return jsonResponse({ error: "ChatGPT 로그인이 필요해요.", signIn: "/signin-with-chatgpt?return_to=%2Fadmin%2Fphotos" }, 401);
  if (!reviewer(request, env)) return jsonResponse({ error: "사진 검수 권한이 없어요." }, 403);
  return null;
}

function schemaStatements(db) {
  return [
    db.prepare(`CREATE TABLE IF NOT EXISTS place_photo_submissions (
      id TEXT PRIMARY KEY NOT NULL,
      request_id TEXT NOT NULL UNIQUE,
      place_key TEXT NOT NULL,
      place_name TEXT NOT NULL,
      object_key TEXT,
      status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'withdrawn', 'expired')),
      content_type TEXT NOT NULL,
      byte_size INTEGER NOT NULL,
      taken_on TEXT,
      device_hash TEXT NOT NULL,
      retry_token_hash TEXT NOT NULL DEFAULT '',
      manage_token_hash TEXT NOT NULL,
      consent_version TEXT NOT NULL,
      consent_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      reviewed_at TEXT,
      reviewer_user_id TEXT,
      rejection_reason TEXT,
      is_featured INTEGER NOT NULL DEFAULT 0,
      deleted_at TEXT
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS place_photo_reports (
      id TEXT PRIMARY KEY NOT NULL,
      request_id TEXT NOT NULL UNIQUE,
      photo_id TEXT NOT NULL,
      place_key TEXT NOT NULL,
      message TEXT NOT NULL,
      email TEXT,
      status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'resolved', 'dismissed')),
      created_at TEXT NOT NULL,
      resolved_at TEXT,
      resolved_by_user_id TEXT,
      resolution TEXT
    )`),
    db.prepare("CREATE INDEX IF NOT EXISTS place_photo_submissions_status_created_idx ON place_photo_submissions (status, created_at DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS place_photo_submissions_place_status_featured_idx ON place_photo_submissions (place_key, status, is_featured DESC, reviewed_at DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS place_photo_submissions_device_created_idx ON place_photo_submissions (device_hash, created_at DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS place_photo_reports_status_created_idx ON place_photo_reports (status, created_at DESC)"),
    db.prepare("CREATE INDEX IF NOT EXISTS place_photo_reports_photo_status_idx ON place_photo_reports (photo_id, status)"),
  ];
}

const schemaPromises = new WeakMap();
async function ensureSchema(db) {
  if (!schemaPromises.has(db)) schemaPromises.set(db, db.batch(schemaStatements(db)));
  await schemaPromises.get(db);
}

async function placeRecord(env, catalog, placeKey) {
  const curated = catalog?.[placeKey];
  if (curated) return { placeKey, name: curated.name, city: curated.city, address: curated.address };
  const row = await env.DB.prepare(`SELECT place_key, venue_name, name, city, address FROM events
    WHERE place_key = ? AND active = 1 ORDER BY start_at DESC LIMIT 1`).bind(placeKey).first();
  if (!row) return null;
  return {
    placeKey,
    name: safeText(row.venue_name || row.name, 180),
    city: safeText(row.city, 100),
    address: safeText(row.address, 220),
  };
}

function publicPhoto(row) {
  return {
    id: row.id,
    placeKey: row.place_key,
    src: `/api/place-photo/${encodeURIComponent(row.id)}`,
    detailSrc: `/api/place-photo/${encodeURIComponent(row.id)}`,
    kind: "actual",
    provider: "community",
    label: "방문자 제공 사진",
    alt: `${row.place_name} 방문자 제공 장소 사진`,
    capturedAt: row.taken_on || "",
    featured: Boolean(row.is_featured),
  };
}

async function listPublicPhotos(request, env) {
  if (!env?.DB) return jsonResponse({ photos: {} }, 200, { "Cache-Control": "public, max-age=60" });
  await ensureSchema(env.DB);
  const url = new URL(request.url);
  const placeKeys = [...new Set(String(url.searchParams.get("placeKeys") || url.searchParams.get("placeKey") || "")
    .split(",")
    .filter((key) => PLACE_KEY_PATTERN.test(key)))]
    .slice(0, 50);
  if (!placeKeys.length) return jsonResponse({ photos: {} }, 200, { "Cache-Control": "public, max-age=60" });
  const placeholders = placeKeys.map(() => "?").join(", ");
  const result = await env.DB.prepare(`SELECT * FROM place_photo_submissions
    WHERE status = 'approved' AND place_key IN (${placeholders})
    ORDER BY place_key, is_featured DESC, reviewed_at DESC`).bind(...placeKeys).all();
  const photos = Object.fromEntries(placeKeys.map((key) => [key, []]));
  (result.results || []).forEach((row) => {
    if (photos[row.place_key]?.length < 6) photos[row.place_key].push(publicPhoto(row));
  });
  return jsonResponse({ photos }, 200, { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" });
}

async function transformedImage(file, env) {
  const declaredType = safeText(file.type, 80).toLowerCase();
  if (!ACCEPTED_IMAGE_TYPES.has(declaredType)) throw new Error("UNSUPPORTED_TYPE");
  if (file.size < 64 || file.size > MAX_UPLOAD_BYTES) throw new Error(file.size > MAX_UPLOAD_BYTES ? "PAYLOAD_TOO_LARGE" : "INVALID_IMAGE");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const detectedType = imageTypeFromBytes(bytes);
  if (!detectedType || detectedType !== declaredType) throw new Error("INVALID_IMAGE");
  const transformed = await env.IMAGES
    .input(new Blob([bytes], { type: detectedType }).stream())
    .transform({ width: 1600, fit: "scale-down" })
    .output({ format: "image/webp", quality: 82 });
  const response = transformed.response ? transformed.response() : transformed;
  if (!response?.ok) throw new Error("INVALID_IMAGE");
  const body = await response.arrayBuffer();
  if (!body.byteLength || body.byteLength > MAX_UPLOAD_BYTES) throw new Error("INVALID_IMAGE");
  return body;
}

async function createSubmission(request, env, catalog) {
  if (!mutationAllowed(request)) return jsonResponse({ error: "허용되지 않은 요청이에요." }, 403);
  if (!uploadConfigured(env)) return jsonResponse({ error: "사진 업로드를 준비 중이에요." }, 503);
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_UPLOAD_BYTES + 65536) return jsonResponse({ error: "사진은 10MB 이하만 올릴 수 있어요." }, 413);
  await ensureSchema(env.DB);
  const form = await request.formData();
  const placeKey = safeText(form.get("placeKey"), 220);
  const requestId = safeText(form.get("requestId"), 60);
  const deviceId = safeText(form.get("deviceId"), 120);
  const retryToken = safeText(form.get("retryToken"), 160);
  const file = form.get("photo");
  if (!PLACE_KEY_PATTERN.test(placeKey)) return jsonResponse({ error: "장소를 확인할 수 없어요." }, 400);
  if (!REQUEST_ID_PATTERN.test(requestId) || !SECRET_PATTERN.test(deviceId) || !SECRET_PATTERN.test(retryToken)) {
    return jsonResponse({ error: "업로드 요청을 다시 준비해 주세요." }, 400);
  }
  if (!(file instanceof File)) return jsonResponse({ error: "올릴 사진을 선택해 주세요." }, 400);
  if (!["true", true].includes(form.get("rightsConfirmed"))
    || !["true", true].includes(form.get("peopleConsentConfirmed"))
    || !["true", true].includes(form.get("publicLicenseConfirmed"))) {
    return jsonResponse({ error: "사진 권리와 공개 동의를 모두 확인해 주세요." }, 400);
  }
  const place = await placeRecord(env, catalog, placeKey);
  if (!place) return jsonResponse({ error: "등록된 장소를 찾지 못했어요." }, 404);
  const deviceHash = await hashValue(deviceId);
  const retryTokenHash = await hashValue(retryToken);
  const existing = await env.DB.prepare("SELECT id, status, retry_token_hash FROM place_photo_submissions WHERE request_id = ?").bind(requestId).first();
  if (existing) {
    if (!existing.retry_token_hash || existing.retry_token_hash !== retryTokenHash) {
      return jsonResponse({ error: "이 업로드 요청을 복구할 수 없어요. 새로 제출해 주세요." }, 409);
    }
    const replacementManageToken = randomToken(32);
    await env.DB.prepare("UPDATE place_photo_submissions SET manage_token_hash = ? WHERE id = ?")
      .bind(await hashValue(replacementManageToken), existing.id).run();
    return jsonResponse({ ok: true, submissionId: existing.id, status: existing.status, manageToken: replacementManageToken, recovered: true }, 200);
  }
  const since = new Date(Date.now() - 86400000).toISOString();
  const daily = await env.DB.prepare("SELECT COUNT(*) AS count FROM place_photo_submissions WHERE device_hash = ? AND created_at >= ?")
    .bind(deviceHash, since).first();
  if (Number(daily?.count || 0) >= MAX_DEVICE_UPLOADS_PER_DAY) return jsonResponse({ error: "하루에 사진을 3장까지 올릴 수 있어요." }, 429);
  const pending = await env.DB.prepare("SELECT COUNT(*) AS count FROM place_photo_submissions WHERE place_key = ? AND status = 'pending'")
    .bind(placeKey).first();
  if (Number(pending?.count || 0) >= MAX_PENDING_PER_PLACE) return jsonResponse({ error: "이 장소는 검수 대기 사진이 많아요. 잠시 후 다시 시도해 주세요." }, 429);

  let body;
  try {
    body = await transformedImage(file, env);
  } catch (error) {
    if (error?.message === "PAYLOAD_TOO_LARGE") return jsonResponse({ error: "사진은 10MB 이하만 올릴 수 있어요." }, 413);
    if (error?.message === "UNSUPPORTED_TYPE") return jsonResponse({ error: "JPEG, PNG, WebP 사진만 올릴 수 있어요." }, 415);
    return jsonResponse({ error: "사진 파일을 읽지 못했어요. 다른 사진을 선택해 주세요." }, 400);
  }

  const id = `photo_${crypto.randomUUID()}`;
  const manageToken = randomToken(32);
  const objectKey = `place-photos/${id}.webp`;
  const now = new Date().toISOString();
  await env.UPLOADS.put(objectKey, body, { httpMetadata: { contentType: "image/webp" } });
  try {
    await env.DB.prepare(`INSERT INTO place_photo_submissions (
      id, request_id, place_key, place_name, object_key, status, content_type, byte_size, taken_on,
      device_hash, retry_token_hash, manage_token_hash, consent_version, consent_at, created_at, is_featured
    ) VALUES (?, ?, ?, ?, ?, 'pending', 'image/webp', ?, ?, ?, ?, ?, ?, ?, ?, 0)`)
      .bind(id, requestId, placeKey, place.name, objectKey, body.byteLength, safeDate(form.get("takenOn")), deviceHash, retryTokenHash, await hashValue(manageToken), CONSENT_VERSION, now, now)
      .run();
  } catch (error) {
    await env.UPLOADS.delete(objectKey);
    throw error;
  }
  return jsonResponse({ ok: true, submissionId: id, status: "pending", manageToken }, 201);
}

async function managedSubmission(request, env, id) {
  if (!env?.DB || !SUBMISSION_ID_PATTERN.test(id)) return jsonResponse({ error: "제출 내역을 찾지 못했어요." }, 404);
  await ensureSchema(env.DB);
  const token = safeText(request.headers.get("x-photo-manage-token"), 160);
  if (!SECRET_PATTERN.test(token)) return jsonResponse({ error: "사진 관리 키가 필요해요." }, 401);
  const row = await env.DB.prepare("SELECT * FROM place_photo_submissions WHERE id = ?").bind(id).first();
  if (!row || row.manage_token_hash !== await hashValue(token)) return jsonResponse({ error: "사진 관리 권한이 없어요." }, 403);
  if (request.method === "GET") {
    return jsonResponse({ id: row.id, placeKey: row.place_key, placeName: row.place_name, status: row.status, rejectionReason: row.rejection_reason || "", createdAt: row.created_at });
  }
  if (request.method === "DELETE") {
    if (!mutationAllowed(request)) return jsonResponse({ error: "허용되지 않은 요청이에요." }, 403);
    const now = new Date().toISOString();
    await env.DB.prepare("UPDATE place_photo_submissions SET status = 'withdrawn', object_key = NULL, is_featured = 0, deleted_at = ? WHERE id = ?")
      .bind(now, id).run();
    if (row.object_key) await env.UPLOADS?.delete(row.object_key);
    return jsonResponse({ ok: true, status: "withdrawn" });
  }
  return jsonResponse({ error: "지원하지 않는 요청 방식이에요." }, 405, { Allow: "GET, DELETE" });
}

async function streamPhoto(request, env, id, allowPending = false) {
  if (!env?.DB || !env?.UPLOADS || !SUBMISSION_ID_PATTERN.test(id)) return new Response("Not found", { status: 404 });
  await ensureSchema(env.DB);
  const row = await env.DB.prepare("SELECT status, object_key FROM place_photo_submissions WHERE id = ?").bind(id).first();
  if (!row?.object_key || (!allowPending && row.status !== "approved")) return new Response("Not found", { status: 404 });
  const object = await env.UPLOADS.get(row.object_key);
  if (!object) return new Response("Not found", { status: 404 });
  return new Response(object.body, {
    headers: {
      "Content-Type": object.httpMetadata?.contentType || "image/webp",
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      ...(object.httpEtag ? { ETag: object.httpEtag } : {}),
    },
  });
}

async function adminList(request, env, catalog) {
  await ensureSchema(env.DB);
  const status = new URL(request.url).searchParams.get("status") || "pending";
  const allowedStatus = ["pending", "approved", "rejected", "withdrawn", "expired"].includes(status) ? status : "pending";
  const result = await env.DB.prepare("SELECT * FROM place_photo_submissions WHERE status = ? ORDER BY created_at DESC LIMIT 100")
    .bind(allowedStatus).all();
  const counts = await env.DB.prepare("SELECT status, COUNT(*) AS count FROM place_photo_submissions GROUP BY status").all();
  const reportCounts = await env.DB.prepare("SELECT status, COUNT(*) AS count FROM place_photo_reports GROUP BY status").all();
  const reports = await env.DB.prepare(`SELECT r.*, p.place_name, p.status AS photo_status, p.object_key
    FROM place_photo_reports r
    LEFT JOIN place_photo_submissions p ON p.id = r.photo_id
    WHERE r.status = 'new'
    ORDER BY r.created_at ASC LIMIT 100`).all();
  const approvedPlaces = await env.DB.prepare("SELECT DISTINCT place_key FROM place_photo_submissions WHERE status = 'approved'").all();
  const actualPhotoPlaces = new Set(Object.entries(catalog || {})
    .filter(([, place]) => place?.hasVerifiedActualPhoto)
    .map(([placeKey]) => placeKey));
  (approvedPlaces.results || []).forEach((row) => actualPhotoPlaces.add(row.place_key));
  return jsonResponse({
    submissions: (result.results || []).map((row) => ({
      id: row.id,
      placeKey: row.place_key,
      placeName: row.place_name,
      status: row.status,
      takenOn: row.taken_on,
      createdAt: row.created_at,
      reviewedAt: row.reviewed_at,
      consentVersion: row.consent_version,
      consentAt: row.consent_at,
      rejectionReason: row.rejection_reason || "",
      featured: Boolean(row.is_featured),
      previewUrl: `/api/admin/place-photos/${encodeURIComponent(row.id)}/image`,
    })),
    reports: (reports.results || []).map((row) => ({
      id: row.id,
      photoId: row.photo_id,
      placeKey: row.place_key,
      placeName: row.place_name || row.place_key,
      message: row.message,
      email: row.email || "",
      status: row.status,
      photoStatus: row.photo_status || "missing",
      createdAt: row.created_at,
      previewUrl: row.object_key ? `/api/admin/place-photos/${encodeURIComponent(row.photo_id)}/image` : "",
    })),
    metrics: {
      counts: Object.fromEntries((counts.results || []).map((row) => [row.status, Number(row.count || 0)])),
      reportCounts: Object.fromEntries((reportCounts.results || []).map((row) => [row.status, Number(row.count || 0)])),
      approvedCommunityPlaces: (approvedPlaces.results || []).length,
      actualPhotoPlaces: actualPhotoPlaces.size,
      catalogPlaces: Object.keys(catalog || {}).length,
    },
  });
}

async function adminUpdate(request, env, id, actingReviewer) {
  if (!mutationAllowed(request)) return jsonResponse({ error: "허용되지 않은 요청이에요." }, 403);
  if (!SUBMISSION_ID_PATTERN.test(id)) return jsonResponse({ error: "제출 내역을 찾지 못했어요." }, 404);
  const body = await request.json().catch(() => ({}));
  const action = safeText(body.action, 40);
  const row = await env.DB.prepare("SELECT * FROM place_photo_submissions WHERE id = ?").bind(id).first();
  if (!row) return jsonResponse({ error: "제출 내역을 찾지 못했어요." }, 404);
  const now = new Date().toISOString();
  if (action === "approve") {
    const featured = body.featured === true;
    const statements = [];
    if (featured) statements.push(env.DB.prepare("UPDATE place_photo_submissions SET is_featured = 0 WHERE place_key = ?").bind(row.place_key));
    statements.push(env.DB.prepare(`UPDATE place_photo_submissions
      SET status = 'approved', reviewed_at = ?, reviewer_user_id = ?, rejection_reason = NULL, is_featured = ?
      WHERE id = ?`).bind(now, actingReviewer.userId, featured ? 1 : 0, id));
    await env.DB.batch(statements);
    return jsonResponse({ ok: true, status: "approved", featured });
  }
  if (action === "feature" && row.status === "approved") {
    await env.DB.batch([
      env.DB.prepare("UPDATE place_photo_submissions SET is_featured = 0 WHERE place_key = ?").bind(row.place_key),
      env.DB.prepare("UPDATE place_photo_submissions SET is_featured = 1, reviewed_at = ?, reviewer_user_id = ? WHERE id = ?").bind(now, actingReviewer.userId, id),
    ]);
    return jsonResponse({ ok: true, status: "approved", featured: true });
  }
  if (["reject", "delete"].includes(action)) {
    const status = action === "reject" ? "rejected" : "withdrawn";
    const reason = safeText(body.reason, 300) || (action === "reject" ? "검수 기준에 맞지 않음" : "운영자 삭제");
    await env.DB.prepare(`UPDATE place_photo_submissions
      SET status = ?, object_key = NULL, reviewed_at = ?, reviewer_user_id = ?, rejection_reason = ?, is_featured = 0, deleted_at = ?
      WHERE id = ?`).bind(status, now, actingReviewer.userId, reason, now, id).run();
    if (row.object_key) await env.UPLOADS?.delete(row.object_key);
    return jsonResponse({ ok: true, status });
  }
  return jsonResponse({ error: "검수 작업을 확인해 주세요." }, 400);
}

async function adminReportUpdate(request, env, id, actingReviewer) {
  if (!mutationAllowed(request)) return jsonResponse({ error: "허용되지 않은 요청이에요." }, 403);
  if (!REPORT_ID_PATTERN.test(id)) return jsonResponse({ error: "신고 내역을 찾지 못했어요." }, 404);
  const body = await request.json().catch(() => ({}));
  const action = safeText(body.action, 40);
  const report = await env.DB.prepare(`SELECT r.*, p.object_key, p.status AS photo_status
    FROM place_photo_reports r LEFT JOIN place_photo_submissions p ON p.id = r.photo_id
    WHERE r.id = ?`).bind(id).first();
  if (!report) return jsonResponse({ error: "신고 내역을 찾지 못했어요." }, 404);
  if (report.status !== "new") return jsonResponse({ error: "이미 처리된 신고예요." }, 409);
  const now = new Date().toISOString();

  if (["resolve", "dismiss"].includes(action)) {
    const status = action === "dismiss" ? "dismissed" : "resolved";
    const resolution = action === "dismiss" ? "no_action" : "kept_public";
    await env.DB.prepare(`UPDATE place_photo_reports
      SET status = ?, resolved_at = ?, resolved_by_user_id = ?, resolution = ? WHERE id = ?`)
      .bind(status, now, actingReviewer.userId, resolution, id).run();
    return jsonResponse({ ok: true, status, resolution });
  }

  if (action === "takedown") {
    await env.DB.batch([
      env.DB.prepare(`UPDATE place_photo_submissions
        SET status = 'withdrawn', object_key = NULL, is_featured = 0, reviewed_at = ?, reviewer_user_id = ?,
          rejection_reason = '사진 신고 후 공개 중단', deleted_at = ? WHERE id = ?`)
        .bind(now, actingReviewer.userId, now, report.photo_id),
      env.DB.prepare(`UPDATE place_photo_reports
        SET status = 'resolved', resolved_at = ?, resolved_by_user_id = ?, resolution = 'takedown'
        WHERE photo_id = ? AND status = 'new'`).bind(now, actingReviewer.userId, report.photo_id),
    ]);
    if (report.object_key) await env.UPLOADS?.delete(report.object_key);
    return jsonResponse({ ok: true, status: "resolved", resolution: "takedown" });
  }
  return jsonResponse({ error: "신고 처리 작업을 확인해 주세요." }, 400);
}

export function adminPhotoPageResponse(request, env, html) {
  const url = new URL(request.url);
  if (url.pathname.replace(/\/$/, "") !== "/admin/photos") return null;
  const email = safeText(request.headers.get("oai-authenticated-user-email"), 254).toLowerCase();
  if (!email) return Response.redirect(new URL("/signin-with-chatgpt?return_to=%2Fadmin%2Fphotos", request.url), 302);
  if (!reviewer(request, env)) return new Response("사진 검수 권한이 없습니다.", { status: 403, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "private, no-store", "X-Frame-Options": "DENY" } });
}

export async function handlePlacePhotoRequest(request, env, catalog = {}) {
  const url = new URL(request.url);
  if (url.pathname === "/api/place-photos/status") {
    return jsonResponse({ configured: uploadConfigured(env), moderationConfigured: reviewerEmails(env).size > 0 });
  }
  if (url.pathname === "/api/place-photos") {
    if (request.method === "GET") return listPublicPhotos(request, env);
    if (request.method === "POST") return createSubmission(request, env, catalog);
    return jsonResponse({ error: "지원하지 않는 요청 방식이에요." }, 405, { Allow: "GET, POST" });
  }
  const managedMatch = url.pathname.match(/^\/api\/place-photos\/submissions\/(photo_[0-9a-f-]{36})$/i);
  if (managedMatch) return managedSubmission(request, env, managedMatch[1]);
  const publicImageMatch = url.pathname.match(/^\/api\/place-photo\/(photo_[0-9a-f-]{36})$/i);
  if (publicImageMatch && request.method === "GET") return streamPhoto(request, env, publicImageMatch[1], false);

  if (url.pathname === "/api/admin/place-photos") {
    const denied = reviewerResponse(request, env);
    if (denied) return denied;
    if (request.method === "GET") return adminList(request, env, catalog);
    return jsonResponse({ error: "지원하지 않는 요청 방식이에요." }, 405, { Allow: "GET" });
  }
  const adminImageMatch = url.pathname.match(/^\/api\/admin\/place-photos\/(photo_[0-9a-f-]{36})\/image$/i);
  if (adminImageMatch) {
    const denied = reviewerResponse(request, env);
    if (denied) return denied;
    return request.method === "GET" ? streamPhoto(request, env, adminImageMatch[1], true) : jsonResponse({ error: "지원하지 않는 요청 방식이에요." }, 405);
  }
  const adminUpdateMatch = url.pathname.match(/^\/api\/admin\/place-photos\/(photo_[0-9a-f-]{36})$/i);
  if (adminUpdateMatch) {
    const denied = reviewerResponse(request, env);
    if (denied) return denied;
    return request.method === "PATCH"
      ? adminUpdate(request, env, adminUpdateMatch[1], reviewer(request, env))
      : jsonResponse({ error: "지원하지 않는 요청 방식이에요." }, 405, { Allow: "PATCH" });
  }
  const adminReportMatch = url.pathname.match(/^\/api\/admin\/photo-reports\/(report_[0-9a-f-]{36})$/i);
  if (adminReportMatch) {
    const denied = reviewerResponse(request, env);
    if (denied) return denied;
    return request.method === "PATCH"
      ? adminReportUpdate(request, env, adminReportMatch[1], reviewer(request, env))
      : jsonResponse({ error: "지원하지 않는 요청 방식이에요." }, 405, { Allow: "PATCH" });
  }
  return null;
}

export async function purgeExpiredPlacePhotos(env) {
  if (!env?.DB || !env?.UPLOADS) return;
  await ensureSchema(env.DB);
  const pendingCutoff = new Date(Date.now() - 30 * 86400000).toISOString();
  const auditCutoff = new Date(Date.now() - 30 * 86400000).toISOString();
  const stale = await env.DB.prepare("SELECT id, object_key FROM place_photo_submissions WHERE status = 'pending' AND created_at < ?")
    .bind(pendingCutoff).all();
  for (const row of stale.results || []) {
    if (row.object_key) await env.UPLOADS.delete(row.object_key);
  }
  await env.DB.prepare(`UPDATE place_photo_submissions
    SET status = 'expired', object_key = NULL, is_featured = 0, deleted_at = ?
    WHERE status = 'pending' AND created_at < ?`).bind(new Date().toISOString(), pendingCutoff).run();
  await env.DB.prepare(`DELETE FROM place_photo_submissions
    WHERE status IN ('rejected', 'withdrawn', 'expired') AND COALESCE(deleted_at, created_at) < ?`).bind(auditCutoff).run();
}

export { imageTypeFromBytes, placeRecord, reviewer };
