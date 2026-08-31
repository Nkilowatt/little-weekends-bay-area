const MAX_BODY_BYTES = 65536;
const MAX_PLAN_ITEMS = 30;
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{20,80}$/;
const RESPONSE_VALUES = new Set(["going", "maybe"]);

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

function safeText(value, maxLength, fallback = "") {
  const text = String(value ?? fallback)
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return (text || fallback).slice(0, maxLength);
}

function safeNumber(value, fallback = null) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function safeDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date.toISOString() : null;
}

function safeAmenity(value, fallbackText = "") {
  const fallback = safeText(fallbackText, 300);
  const fallbackKnown = Boolean(fallback) && !/확인|문의|정보 없음|알 수|준비 중/.test(fallback);
  const status = value?.status === "confirmed" ? "confirmed" : value?.status === "unknown" ? "unknown" : fallbackKnown ? "confirmed" : "unknown";
  return {
    status,
    text: status === "confirmed" ? safeText(value?.text, 300, fallback || "확인됨") : "확인되지 않음",
  };
}

function sanitizeSnapshot(item) {
  const notes = item?.notes || {};
  const amenities = item?.amenities || {};
  const latitude = safeNumber(item?.location?.lat);
  const longitude = safeNumber(item?.location?.lng);
  return {
    id: safeText(item?.id, 180),
    placeKey: /^[a-z0-9][a-z0-9-]{2,219}$/i.test(String(item?.placeKey || "")) ? String(item.placeKey) : null,
    name: safeText(item?.name, 180, "이름을 확인 중인 장소"),
    type: safeText(item?.type, 30, "seasonal"),
    setting: safeText(item?.setting, 30, "indoor"),
    dateBucket: safeText(item?.dateBucket, 30, "anytime"),
    timeLabel: safeText(item?.timeLabel, 120, "운영시간 확인"),
    startDate: safeDate(item?.startDate),
    endDate: safeDate(item?.endDate),
    city: safeText(item?.city, 100, "Bay Area"),
    distance: safeNumber(item?.distance, 0),
    age: safeText(item?.age, 80, "가족"),
    minAgeMonths: safeNumber(item?.minAgeMonths, 0),
    maxAgeMonths: safeNumber(item?.maxAgeMonths, 216),
    price: safeText(item?.price, 20, "check"),
    reservation: safeText(item?.reservation, 180, "공식 페이지 확인"),
    source: safeText(item?.source, 500),
    sourceName: safeText(item?.sourceName, 140, "공식 운영기관"),
    updated: safeText(item?.updated, 120, "공유 당시 정보"),
    why: safeText(item?.why, 500, "공식 페이지에서 세부 정보를 확인해 주세요."),
    venueName: safeText(item?.venueName, 180),
    address: safeText(item?.address, 220),
    confidenceStatus: safeText(item?.confidenceStatus, 40, "recheck"),
    notes: {
      parking: safeText(notes.parking, 300, "공식 페이지에서 주차 정보를 확인하세요."),
      bathroom: safeText(notes.bathroom, 300, "공식 페이지에서 화장실 정보를 확인하세요."),
      stroller: safeText(notes.stroller, 300, "공식 페이지에서 유모차 동선을 확인하세요."),
      changingTable: safeText(notes.changingTable, 300, "확인되지 않음"),
    },
    amenities: {
      parking: safeAmenity(amenities.parking, notes.parking),
      bathroom: safeAmenity(amenities.bathroom, notes.bathroom),
      stroller: safeAmenity(amenities.stroller, notes.stroller),
      changingTable: safeAmenity(amenities.changingTable, notes.changingTable),
    },
    image: /^assets\/(?:photos|places)\/[a-z0-9-]+\.(?:webp|jpe?g)$/i.test(String(item?.image?.src || ""))
      ? {
        src: item.image.src,
        kind: item.image.kind === "actual" ? "actual" : "context",
        alt: safeText(item.image.alt, 180),
        creator: safeText(item.image.creator, 120),
        credit: safeText(item.image.credit, 180),
        license: safeText(item.image.license, 80),
        licenseUrl: safeText(item.image.licenseUrl, 500),
        sourceUrl: safeText(item.image.sourceUrl, 500),
        verifiedAt: /^\d{4}-\d{2}-\d{2}$/.test(String(item.image.verifiedAt || ""))
          ? item.image.verifiedAt
          : "",
      }
      : null,
    location: latitude === null || longitude === null ? null : { lat: latitude, lng: longitude },
  };
}

function sanitizeItems(items) {
  if (!Array.isArray(items)) return [];
  const unique = new Map();
  items.slice(0, MAX_PLAN_ITEMS).forEach((item) => {
    const snapshot = sanitizeSnapshot(item);
    if (snapshot.id && !unique.has(snapshot.id)) unique.set(snapshot.id, snapshot);
  });
  return [...unique.values()];
}

function randomToken(byteLength = 18) {
  const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function hashEditToken(token) {
  const bytes = new TextEncoder().encode(token);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
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

function mutationAllowed(request) {
  const url = new URL(request.url);
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (origin && origin !== url.origin) return false;
  return fetchSite !== "cross-site";
}

function schemaStatements(db) {
  return [
    db.prepare(`CREATE TABLE IF NOT EXISTS shared_plans (
      view_token TEXT PRIMARY KEY NOT NULL,
      edit_token_hash TEXT NOT NULL,
      title TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS shared_plan_items (
      plan_token TEXT NOT NULL,
      item_id TEXT NOT NULL,
      position INTEGER NOT NULL,
      snapshot_json TEXT NOT NULL,
      PRIMARY KEY (plan_token, item_id),
      FOREIGN KEY (plan_token) REFERENCES shared_plans(view_token) ON DELETE CASCADE
    )`),
    db.prepare("CREATE INDEX IF NOT EXISTS shared_plan_items_position_idx ON shared_plan_items (plan_token, position)"),
    db.prepare(`CREATE TABLE IF NOT EXISTS shared_plan_responses (
      plan_token TEXT NOT NULL,
      item_id TEXT NOT NULL,
      participant_id TEXT NOT NULL,
      participant_name TEXT NOT NULL,
      response TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      PRIMARY KEY (plan_token, item_id, participant_id),
      FOREIGN KEY (plan_token, item_id) REFERENCES shared_plan_items(plan_token, item_id) ON DELETE CASCADE
    )`),
  ];
}

async function ensureSharedPlanSchema(db) {
  await db.batch(schemaStatements(db));
}

function itemInsert(db, planToken, item, position) {
  return db.prepare(`INSERT INTO shared_plan_items (plan_token, item_id, position, snapshot_json)
    VALUES (?, ?, ?, ?)`)
    .bind(planToken, item.id, position, JSON.stringify(item));
}

function itemUpsert(db, planToken, item, position) {
  return db.prepare(`INSERT INTO shared_plan_items (plan_token, item_id, position, snapshot_json)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(plan_token, item_id) DO UPDATE SET
      position = excluded.position,
      snapshot_json = excluded.snapshot_json`)
    .bind(planToken, item.id, position, JSON.stringify(item));
}

async function planRecord(db, planToken) {
  return db.prepare(`SELECT view_token, edit_token_hash, title, created_at, updated_at
    FROM shared_plans WHERE view_token = ?`).bind(planToken).first();
}

async function canEditPlan(plan, editToken) {
  if (!plan || !TOKEN_PATTERN.test(editToken || "")) return false;
  return await hashEditToken(editToken) === plan.edit_token_hash;
}

async function serializedPlan(db, plan, canEdit) {
  const [itemResult, responseResult] = await Promise.all([
    db.prepare(`SELECT item_id, snapshot_json FROM shared_plan_items
      WHERE plan_token = ? ORDER BY position ASC`).bind(plan.view_token).all(),
    db.prepare(`SELECT item_id, participant_id, participant_name, response, updated_at
      FROM shared_plan_responses WHERE plan_token = ? ORDER BY updated_at ASC`).bind(plan.view_token).all(),
  ]);
  const items = (itemResult.results || []).map((row) => {
    try {
      return JSON.parse(row.snapshot_json);
    } catch {
      return null;
    }
  }).filter(Boolean);
  const responses = (responseResult.results || []).map((row) => ({
    itemId: row.item_id,
    participantId: row.participant_id,
    name: row.participant_name,
    response: row.response,
    updatedAt: row.updated_at,
  }));
  return {
    viewToken: plan.view_token,
    title: plan.title,
    createdAt: plan.created_at,
    updatedAt: plan.updated_at,
    canEdit,
    items,
    responses,
  };
}

async function createPlan(request, env) {
  if (!mutationAllowed(request)) return jsonResponse({ error: "허용되지 않은 요청이에요." }, 403);
  const body = await readJsonBody(request);
  const items = sanitizeItems(body.items);
  if (!items.length) return jsonResponse({ error: "공유할 일정을 하나 이상 저장해 주세요." }, 400);
  const title = safeText(body.title, 80, "우리 가족 주말 계획");
  const viewToken = randomToken();
  const editToken = randomToken(24);
  const editTokenHash = await hashEditToken(editToken);
  const now = new Date().toISOString();
  await env.DB.batch([
    env.DB.prepare(`INSERT INTO shared_plans (view_token, edit_token_hash, title, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)`).bind(viewToken, editTokenHash, title, now, now),
    ...items.map((item, index) => itemInsert(env.DB, viewToken, item, index)),
  ]);
  return jsonResponse({ viewToken, editToken, title, createdAt: now }, 201);
}

async function getPlan(request, env, planToken) {
  const plan = await planRecord(env.DB, planToken);
  if (!plan) return jsonResponse({ error: "공유 계획을 찾지 못했어요." }, 404);
  const canEdit = await canEditPlan(plan, request.headers.get("x-plan-edit-token"));
  return jsonResponse(await serializedPlan(env.DB, plan, canEdit));
}

async function updatePlan(request, env, planToken) {
  if (!mutationAllowed(request)) return jsonResponse({ error: "허용되지 않은 요청이에요." }, 403);
  const plan = await planRecord(env.DB, planToken);
  if (!plan) return jsonResponse({ error: "공유 계획을 찾지 못했어요." }, 404);
  if (!await canEditPlan(plan, request.headers.get("x-plan-edit-token"))) {
    return jsonResponse({ error: "편집 링크가 필요해요." }, 403);
  }
  const body = await readJsonBody(request);
  const title = Object.hasOwn(body, "title") ? safeText(body.title, 80, "우리 가족 주말 계획") : plan.title;
  const hasItems = Object.hasOwn(body, "items");
  if (hasItems && !Array.isArray(body.items)) return jsonResponse({ error: "일정 목록을 다시 확인해 주세요." }, 400);
  const items = hasItems ? sanitizeItems(body.items) : null;
  const now = new Date().toISOString();
  const statements = [
    env.DB.prepare("UPDATE shared_plans SET title = ?, updated_at = ? WHERE view_token = ?")
      .bind(title, now, planToken),
  ];
  if (hasItems) {
    if (items.length) {
      statements.push(...items.map((item, index) => itemUpsert(env.DB, planToken, item, index)));
      const placeholders = items.map(() => "?").join(", ");
      statements.push(env.DB.prepare(`DELETE FROM shared_plan_items
        WHERE plan_token = ? AND item_id NOT IN (${placeholders})`)
        .bind(planToken, ...items.map((item) => item.id)));
    } else {
      statements.push(env.DB.prepare("DELETE FROM shared_plan_items WHERE plan_token = ?").bind(planToken));
    }
  }
  await env.DB.batch(statements);
  const updatedPlan = await planRecord(env.DB, planToken);
  return jsonResponse(await serializedPlan(env.DB, updatedPlan, true));
}

async function updateResponse(request, env, planToken) {
  if (!mutationAllowed(request)) return jsonResponse({ error: "허용되지 않은 요청이에요." }, 403);
  const plan = await planRecord(env.DB, planToken);
  if (!plan) return jsonResponse({ error: "공유 계획을 찾지 못했어요." }, 404);
  const body = await readJsonBody(request);
  const participantId = safeText(body.participantId, 80);
  const name = safeText(body.name, 30);
  const itemId = safeText(body.itemId, 180);
  const response = safeText(body.response, 20);
  if (!/^[A-Za-z0-9_-]{12,80}$/.test(participantId) || !name || !itemId) {
    return jsonResponse({ error: "이름과 응답 정보를 확인해 주세요." }, 400);
  }
  const item = await env.DB.prepare(`SELECT item_id FROM shared_plan_items
    WHERE plan_token = ? AND item_id = ?`).bind(planToken, itemId).first();
  if (!item) return jsonResponse({ error: "계획에 없는 일정이에요." }, 404);
  if (response === "clear") {
    await env.DB.prepare(`DELETE FROM shared_plan_responses
      WHERE plan_token = ? AND item_id = ? AND participant_id = ?`)
      .bind(planToken, itemId, participantId).run();
  } else if (RESPONSE_VALUES.has(response)) {
    await env.DB.prepare(`INSERT INTO shared_plan_responses
      (plan_token, item_id, participant_id, participant_name, response, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(plan_token, item_id, participant_id) DO UPDATE SET
        participant_name = excluded.participant_name,
        response = excluded.response,
        updated_at = excluded.updated_at`)
      .bind(planToken, itemId, participantId, name, response, new Date().toISOString()).run();
  } else {
    return jsonResponse({ error: "응답을 다시 선택해 주세요." }, 400);
  }
  const currentPlan = await planRecord(env.DB, planToken);
  return jsonResponse(await serializedPlan(env.DB, currentPlan, false));
}

async function handleSharedPlanRequest(request, env) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api/plans")) return null;
  if (!env?.DB) return jsonResponse({ error: "공유 계획 저장소를 사용할 수 없어요." }, 503);
  try {
    await ensureSharedPlanSchema(env.DB);
    if (url.pathname === "/api/plans") {
      if (request.method === "POST") return createPlan(request, env);
      return jsonResponse({ error: "지원하지 않는 요청이에요." }, 405, { Allow: "POST" });
    }
    const responseMatch = /^\/api\/plans\/([A-Za-z0-9_-]{20,80})\/responses$/.exec(url.pathname);
    if (responseMatch) {
      if (request.method === "PUT") return updateResponse(request, env, responseMatch[1]);
      return jsonResponse({ error: "지원하지 않는 요청이에요." }, 405, { Allow: "PUT" });
    }
    const planMatch = /^\/api\/plans\/([A-Za-z0-9_-]{20,80})$/.exec(url.pathname);
    if (!planMatch) return jsonResponse({ error: "공유 계획 주소가 올바르지 않아요." }, 404);
    if (request.method === "GET") return getPlan(request, env, planMatch[1]);
    if (request.method === "PATCH") return updatePlan(request, env, planMatch[1]);
    return jsonResponse({ error: "지원하지 않는 요청이에요." }, 405, { Allow: "GET, PATCH" });
  } catch (error) {
    if (error?.message === "PAYLOAD_TOO_LARGE") return jsonResponse({ error: "공유 계획이 너무 커요." }, 413);
    if (error?.message === "INVALID_JSON") return jsonResponse({ error: "요청 내용을 읽지 못했어요." }, 400);
    return jsonResponse({ error: "공유 계획을 처리하지 못했어요." }, 500);
  }
}

export {
  handleSharedPlanRequest,
  hashEditToken,
  sanitizeItems,
};
