import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

import { ageRangeFromLabel, dateBucket, placeKeyForVenue } from "../worker/event-sync.js";

const root = new URL("../", import.meta.url);

test("primary HTML exposes the P0 and P1 discovery controls", async () => {
  const html = await readFile(new URL("index.html", root), "utf8");

  assert.match(html, /rel="canonical" href="https:\/\/little-weekends-bay-area\.cashmire2\.chatgpt\.site\/"/);
  assert.match(html, /id="addChildAge"/);
  assert.match(html, /id="childAgeRows"/);
  assert.match(html, /id="familyProfileButton"/);
  assert.match(html, /id="familyAgeEmpty"[^>]*>나이를 추가하지 않으면 0–6세 대상 활동/);
  assert.match(html, /id="clearFamilyAges"/);
  assert.match(html, /id="clearPlaceNotes"/);
  assert.match(html, /id="locationDialog"/);
  assert.match(html, /data-location-key="oakland"/);
  assert.match(html, /data-location-key="redwood-city"/);
  assert.match(html, /data-location-key="menlo-park"/);
  assert.match(html, /data-location-key="mountain-view"/);
  assert.match(html, /data-location-key="sunnyvale"/);
  assert.match(html, /data-location-key="cupertino"/);
  assert.match(html, /data-location-key="santa-clara"/);
  assert.match(html, /data-location-key="campbell"/);
  assert.match(html, /data-location-key="los-gatos"/);
  assert.match(html, /data-date="today"[\s\S]*data-date="tomorrow"[\s\S]*data-date="weekend"/);
  assert.match(html, /data-discovery="places"[\s\S]*행사 없어도 갈 곳/);
  assert.match(html, /value="tomorrow">내일/);
  assert.match(html, /id="regionFilter"/);
  assert.match(html, /id="timeFilter"/);
  assert.match(html, /id="reservationFilter"/);
  assert.match(html, /id="bathroomFilter"/);
  assert.match(html, /id="strollerFilter"/);
  assert.match(html, /id="sharePlanDialog"/);
  assert.match(html, /id="feedback"[\s\S]*data-feedback-open/);
  assert.match(html, /id="feedbackDialog"/);
  assert.match(html, /id="feedbackForm"/);
  assert.match(html, /name="category" value="place_request"/);
  assert.match(html, /name="category" value="photo_report"/);
  assert.match(html, /id="photoUploadDialog"/);
  assert.match(html, /id="placePhotoFile"[^>]*accept="image\/jpeg,image\/png,image\/webp"/);
  assert.match(html, /원본 최대 30MB · 큰 사진은 자동 최적화/);
  assert.match(html, /id="photoRecoveryCode"/);
  assert.match(html, /id="importPhotoRecovery"/);
  assert.match(html, /id="feedbackMessage"/);
  assert.match(html, /id="feedbackEmail"/);
  assert.match(html, /class="footer-feedback"[\s\S]*의견 보내기/);
  assert.match(html, /href="terms\.html">이용약관/);
  assert.match(html, /href="privacy\.html">개인정보처리방침/);
  assert.match(html, /evergreen-outings\.js\?v=11/);
  assert.match(html, /park-expansion\.js\?v=3/);
  assert.match(html, /place-images\.js\?v=3/);
  assert.match(html, /styles\.css\?v=33/);
  assert.match(html, /yeon-sung-korean-400\.woff2\?v=1/);
  assert.match(html, /lee-seoyun-korean-400\.woff2\?v=1/);
  assert.match(html, /planning\.js\?v=4/);
  assert.match(html, /family-state\.js\?v=1/);
  assert.match(html, /app\.js\?v=40/);
  assert.match(html, /id="distanceFilter"><option value="10">10 mi/);
  assert.match(html, /id="mobileMoment" hidden/);
  assert.match(html, /id="mobileMomentImage" alt="" width="1200" height="600"/);
  assert.doesNotMatch(html, /mobileMomentCaption|mobileMomentTitle|<figcaption/);
});

test("client bundle includes decision filters, recovery actions, and detail alternatives", async () => {
  const script = await readFile(new URL("app.js", root), "utf8");

  assert.match(script, /function distanceFor\(item\)/);
  assert.match(script, /function recommendationScore\(item\)/);
  assert.match(script, /prioritizeCityCoverage\(\[\.\.\.firstOfSeries, \.\.\.repeatedSeries\]\)/);
  assert.match(script, /"foster city", "fostercity", "포스터시티"/);
  assert.match(script, /confidenceStatus === "source_confirmed"/);
  assert.match(script, /confidenceStatus === "recurring_estimate"/);
  assert.match(script, /confidenceStatus === "date_confirmed"/);
  assert.match(script, /little-weekends-location/);
  assert.match(script, /"redwoodcity\.org"/);
  assert.match(script, /"santaclaraca\.gov"/);
  assert.match(script, /"campbellca\.gov"/);
  assert.match(script, /"losgatosca\.gov"/);
  assert.match(script, /"sunnyvale\.ca\.gov"/);
  assert.match(script, /function regionForCity\(city\)/);
  assert.match(script, /function matchesTime\(item\)/);
  assert.match(script, /function recommendationReasons\(item\)/);
  assert.match(script, /function nearbyAlternatives\(item\)/);
  assert.match(script, /function sfBranchContext\(items\)/);
  assert.match(script, /id="sfBranchSelect"/);
  assert.match(script, /function detailLocationMarkup\(item\)/);
  assert.match(script, /세부 위치 확인 중/);
  assert.match(script, /id="copyAddress"/);
  assert.match(script, /function shareOuting\(item\)/);
  assert.match(script, /const calendarHref = buildCalendarUrl\(item, detailUrl\)/);
  assert.match(script, /URL\.createObjectURL/);
  assert.match(script, /URL\.revokeObjectURL/);
  assert.match(script, /function openPendingOuting\(\)/);
  assert.match(script, /groupSavedItems\(items, pacificDateKey\(\)\)/);
  assert.match(script, /little-weekends-nap-window/);
  assert.match(script, /function syncPublishedPlan\(showDialog = false\)/);
  assert.match(script, /function loadSharedPlan\(silent = false\)/);
  assert.match(script, /function updateSharedResponse\(itemId, response\)/);
  assert.match(script, /X-Plan-Edit-Token/);
  assert.match(script, /emptyExpandDistance/);
  assert.match(script, /오늘 열리는 일정/);
  assert.match(script, /내일 열리는 일정/);
  assert.match(script, /이번 주말에만 열리는 일정/);
  assert.match(script, /행사 없어도 갈 수 있는 가까운 곳/);
  assert.match(script, /state\.discoveryMode = "places"/);
  assert.match(script, /function placeFeatureLabels\(item\)/);
  assert.match(script, /return detail \? "출발 전 공식 운영시간 확인" : ""/);
  assert.match(script, /const timeMarkup = timeLabel \? `<span class="card-time">/);
  assert.match(script, /시간표 없이 떠나는 나들이/);
  assert.match(script, /itemImageCaption\(item\)/);
  assert.match(script, /function registeredPlaceImage\(item\)/);
  assert.match(script, /function itemImageAttribution\(item\)/);
  assert.match(script, /function bindOutingImageFailure\(imageElement, item\)/);
  assert.match(script, /function observeRemotePlaceImage\(imageElement, item\)/);
  assert.match(script, /function scheduleRemotePlaceImage\(item\)/);
  assert.match(script, /Google Maps 거리뷰/);
  assert.match(script, /data-outing-image-id/);
  assert.ok(script.includes("assets\\/(?:photos|places)"));
  assert.match(script, /function itemImageBadgeClass\(item\)/);
  assert.match(script, /원본 보기/);
  assert.match(script, /이 장소의 실제 사진이 아닙니다\. 활동 유형을 보여주는 예시 이미지입니다\./);
  assert.match(script, /amenityRow\("기저귀 교환대"/);
  assert.match(script, /isOutingCurrent\(item\)/);
  assert.match(script, /const mobileMomentScenes = Object\.freeze/);
  assert.match(script, /function stableMomentIndex\(value\)/);
  assert.match(script, /function mobileMomentScene\(\)/);
  assert.match(script, /function syncMobileMoment\(\)/);
  assert.match(script, /filterOpen: false/);
  assert.match(script, /function openFeedbackDialog\(report = null\)/);
  assert.match(script, /fetch\("\/api\/feedback"/);
  assert.match(script, /function feedbackContext\(\)/);
  assert.match(script, /little-weekends-child-ages:v1/);
  assert.match(script, /little-weekends-place-notes:v1/);
  assert.match(script, /little-weekends-photo-submissions:v1/);
  assert.match(script, /little-weekends-photo-upload-retry:v1/);
  assert.match(script, /function uploadRetryFor\(file, placeKey\)/);
  assert.match(script, /PHOTO_SOURCE_MAX_BYTES = 30 \* 1024 \* 1024/);
  assert.match(script, /async function preparePhotoForUpload\(file\)/);
  assert.match(script, /data\.set\("retryToken", retry\.retryToken\)/);
  assert.match(script, /pendingChildAgeDraft = \{ years: "", months: "" \}/);
  assert.doesNotMatch(script, /state\.childAgesMonths\.push\(24\)/);
  assert.match(script, /같은 브라우저 프로필을 쓰는 사람에게는 보일 수 있어요/);
  assert.match(script, /function ageEvidenceMarkup\(item\)/);
  assert.match(script, /familyAgeMatches\(item\.minAgeMonths, item\.maxAgeMonths, state\.childAgesMonths\)/);
  assert.match(script, /아이 \$\{state\.childAgesMonths\.length\}명 중 \$\{count\}명에게 맞아요/);
  assert.match(script, /fetch\("\/api\/place-photos"/);
  assert.match(script, /X-Photo-Manage-Token/);
  assert.match(script, /age: state\.childAgesMonths\.length \? "family-age-filter-active" : "all-preschool"/);
  assert.doesNotMatch(script, /context:[\s\S]{0,300}window\.location\.search/);
  assert.match(script, /function setFilterPanelOpen\(open, \{ restoreFocus = false \} = \{\}\)/);
  assert.match(script, /const shouldRenderMap = visibleView === "map" \|\| visibleView === "split"/);
  const renderSource = script.slice(script.indexOf("function render()"), script.indexOf("async function loadAutomaticOutings()"));
  assert.doesNotMatch(renderSource, /filterPanelEl\.hidden = true/);
  assert.match(renderSource, /if \(!sharedMode && shouldRenderMap\)/);
  assert.match(renderSource, /mapEl\.replaceChildren\(\)/);
  assert.equal((script.match(/assets\/mobile-moments\/[a-z-]+\.jpg/g) || []).length, 9);
  assert.doesNotMatch(script, /mobileMomentTitleEl/);
});

test("age labels normalize to month ranges", () => {
  assert.deepEqual(ageRangeFromLabel("18개월-3세"), { minAgeMonths: 18, maxAgeMonths: 47 });
  assert.deepEqual(ageRangeFromLabel("0-18개월"), { minAgeMonths: 0, maxAgeMonths: 18 });
  assert.deepEqual(ageRangeFromLabel("1-3세"), { minAgeMonths: 12, maxAgeMonths: 47 });
  assert.deepEqual(ageRangeFromLabel("4-11세"), { minAgeMonths: 48, maxAgeMonths: 143 });
  assert.deepEqual(ageRangeFromLabel("가족·전 연령"), { minAgeMonths: 0, maxAgeMonths: 216 });
});

test("family ages enforce 0–83 month boundaries and all-child matching", async () => {
  const context = {};
  context.globalThis = context;
  vm.runInNewContext(await readFile(new URL("family-state.js", root), "utf8"), context);
  const family = context.LittleWeekendsFamilyState;

  assert.deepEqual(Array.from(family.normalizeChildAges([0, 83, 84, -1, "24", 1.5])), [0, 83, 24]);
  assert.deepEqual(Array.from(family.normalizeChildAges({ corrupted: true })), []);
  assert.equal(family.familyAgeMatches(0, 83, []), true);
  assert.equal(family.familyAgeMatches(12, 83, []), true);
  assert.equal(family.familyAgeMatches(84, 143, []), false);
  assert.equal(family.familyAgeMatches(0, 83, [0, 83]), true);
  assert.equal(family.familyAgeMatches(12, 47, [24, 60]), false);
  assert.equal(family.familyAgeMatchCount(12, 47, [24, 60]), 1);
});

test("event place keys are stable across repeat events and distinguish addresses", () => {
  const first = placeKeyForVenue("Foster City Library", "1000 E Hillsdale Blvd.", "Foster City");
  const repeated = placeKeyForVenue("  FOSTER CITY LIBRARY ", "1000 E Hillsdale Blvd", "foster city");
  const otherAddress = placeKeyForVenue("Foster City Library", "999 E Hillsdale Blvd", "Foster City");
  assert.equal(first, repeated);
  assert.notEqual(first, otherAddress);
  assert.equal(placeKeyForVenue("", "", "Foster City"), "");
});

test("event date buckets retain Pacific-day semantics", () => {
  const now = new Date("2026-07-12T16:00:00.000Z");

  assert.equal(dateBucket("2026-07-12T17:00:00.000Z", now), "today");
  assert.equal(dateBucket("2026-07-13T17:00:00.000Z", now), "nextweek");
});

test("Sites build contains the event API and security policy", async () => {
  const worker = await readFile(new URL("dist/server/index.js", root), "utf8");
  const eventSync = await readFile(new URL("dist/server/event-sync.js", root), "utf8");
  const placeImages = await readFile(new URL("dist/server/place-images.js", root), "utf8");
  const sharedPlans = await readFile(new URL("dist/server/shared-plans.js", root), "utf8");
  const feedback = await readFile(new URL("dist/server/feedback.js", root), "utf8");
  const placePhotos = await readFile(new URL("dist/server/place-photos.js", root), "utf8");
  const migration = await readFile(new URL("drizzle/0003_shared_plans.sql", root), "utf8");
  const locationMigration = await readFile(new URL("drizzle/0004_event_location.sql", root), "utf8");
  const placeImageMigration = await readFile(new URL("drizzle/0005_place_image_sources.sql", root), "utf8");
  const feedbackMigration = await readFile(new URL("drizzle/0006_feedback_submissions.sql", root), "utf8");
  const familyMigration = await readFile(new URL("drizzle/0007_family_places_photos.sql", root), "utf8");
  const moderationMigration = await readFile(new URL("drizzle/0008_photo_moderation_recovery.sql", root), "utf8");

  assert.match(worker, /pathname === "\/api\/outings"/);
  assert.match(worker, /handleCalendarRequest/);
  assert.match(worker, /"\/evergreen-outings\.js"/);
  assert.match(worker, /"\/park-expansion\.js"/);
  assert.match(worker, /"\/place-images\.js"/);
  assert.match(worker, /"\/planning\.js"/);
  assert.match(worker, /"\/family-state\.js"/);
  assert.match(worker, /handleSharedPlanRequest/);
  assert.match(worker, /handleFeedbackRequest/);
  assert.match(worker, /handlePlaceImageRequest/);
  assert.match(worker, /handlePlacePhotoRequest/);
  assert.match(worker, /adminPhotoPageResponse/);
  assert.match(worker, /purgeExpiredPlacePhotos/);
  assert.match(worker, /placeImageCatalog/);
  assert.match(worker, /connect-src 'self'/);
  assert.match(eventSync, /min_age_months/);
  assert.match(eventSync, /confidence_status/);
  assert.match(eventSync, /end_at/);
  assert.match(eventSync, /venue_name/);
  assert.match(eventSync, /address/);
  assert.match(eventSync, /active_event_count/);
  assert.match(eventSync, /data_revision/);
  assert.match(eventSync, /place_key/);
  assert.match(eventSync, /REFRESH_ATTEMPT_COOLDOWN_MS/);
  assert.match(eventSync, /targetSources = force \? sources/);
  assert.match(eventSync, /events\.length \? "public, max-age=300/);
  assert.match(sharedPlans, /shared_plan_responses/);
  assert.match(sharedPlans, /x-plan-edit-token/);
  assert.match(sharedPlans, /photos\|places/);
  assert.match(placeImages, /places:searchText/);
  assert.match(placeImages, /mode === "streetview"/);
  assert.match(placeImages, /GOOGLE_MAPS_API_KEY/);
  assert.match(feedback, /feedback_submissions/);
  assert.match(feedback, /ON CONFLICT\(request_id\) DO NOTHING/);
  assert.match(placePhotos, /PHOTO_UPLOADS_ENABLED/);
  assert.match(placePhotos, /status IN \('pending', 'approved', 'rejected', 'withdrawn', 'expired'\)/);
  assert.match(placePhotos, /format: "image\/webp"/);
  assert.match(placePhotos, /PHOTO_REVIEWER_EMAILS/);
  assert.match(migration, /CREATE TABLE IF NOT EXISTS shared_plans/);
  assert.match(migration, /FOREIGN KEY \(plan_token, item_id\)/);
  assert.match(locationMigration, /ADD COLUMN venue_name/);
  assert.match(locationMigration, /ADD COLUMN address/);
  assert.match(placeImageMigration, /CREATE TABLE IF NOT EXISTS `place_image_sources`/);
  assert.match(placeImageMigration, /google_place_id/);
  assert.match(feedbackMigration, /CREATE TABLE IF NOT EXISTS `feedback_submissions`/);
  assert.match(feedbackMigration, /status_created_idx/);
  assert.match(familyMigration, /ADD COLUMN `place_key`/);
  assert.match(familyMigration, /CREATE TABLE `place_photo_submissions`/);
  assert.match(familyMigration, /place_status_featured_idx/);
  assert.match(moderationMigration, /retry_token_hash/);
  assert.match(moderationMigration, /CREATE TABLE `place_photo_reports`/);
  assert.match(moderationMigration, /place_photo_reports_photo_status_idx/);
});

test("Sites build serves both Korean webfonts", async () => {
  const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url));
  const fontRoutes = [
    "/assets/fonts/yeon-sung-korean-400.woff2",
    "/assets/fonts/lee-seoyun-korean-400.woff2",
  ];

  for (const route of fontRoutes) {
    const response = await worker.fetch(new Request(`https://little-weekends.test${route}`), {}, {});
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "font/woff2");
    assert.ok((await response.arrayBuffer()).byteLength > 100_000);
  }
});

test("Sites build serves public terms and privacy pages for map content", async () => {
  const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url));
  for (const route of ["/terms.html", "/privacy.html"]) {
    const response = await worker.fetch(new Request(`https://little-weekends.test${route}`), {}, {});
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "text/html; charset=utf-8");
    const html = await response.text();
    assert.match(html, /Google/);
    assert.match(html, /방문자 사진/);
    assert.match(html, /styles\.css\?v=33/);
  }
});

test("photo moderation page requires ChatGPT login and the exact reviewer allowlist", async () => {
  const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url));
  const env = { PHOTO_REVIEWER_EMAILS: "owner@example.com" };
  const anonymous = await worker.fetch(new Request("https://little-weekends.test/admin/photos"), env, {});
  assert.equal(anonymous.status, 302);
  assert.match(anonymous.headers.get("location"), /signin-with-chatgpt/);

  const forbidden = await worker.fetch(new Request("https://little-weekends.test/admin/photos", {
    headers: { "oai-authenticated-user-email": "other@example.com", "oai-authenticated-user-id": "user-2" },
  }), env, {});
  assert.equal(forbidden.status, 403);

  const allowed = await worker.fetch(new Request("https://little-weekends.test/admin/photos", {
    headers: { "oai-authenticated-user-email": "owner@example.com", "oai-authenticated-user-id": "user-1" },
  }), env, {});
  assert.equal(allowed.status, 200);
  assert.match(await allowed.text(), /방문자 사진 검수/);
});

test("photo moderation UI separates approval from featuring and exposes consent and report handling", async () => {
  const html = await readFile(new URL("admin/photos.html", root), "utf8");
  const script = await readFile(new URL("admin/photos.js", root), "utf8");
  assert.match(html, /id="adminReportList"/);
  assert.match(script, /photo\.consentVersion/);
  assert.match(script, /photo\.consentAt/);
  assert.match(script, /data-featured="false"/);
  assert.match(script, /data-featured="true"/);
  assert.match(script, /\/api\/admin\/photo-reports\//);
  assert.match(script, /data-report-action="takedown"/);
});

test("Sites build packages the Worker-side image decoder, resizer, and WebP encoder", async () => {
  const codecModule = await readFile(new URL("../dist/server/image-codecs.js", import.meta.url), "utf8");
  assert.match(codecModule, /mozjpeg_dec\.wasm/);
  assert.match(codecModule, /squoosh_png_bg\.wasm/);
  assert.match(codecModule, /squoosh_resize_bg\.wasm/);
  assert.match(codecModule, /webp_enc_simd\.wasm/);
  for (const path of [
    "jpeg/codec/dec/mozjpeg_dec.wasm",
    "png/codec/pkg/squoosh_png_bg.wasm",
    "resize/lib/resize/pkg/squoosh_resize_bg.wasm",
    "webp/codec/dec/webp_dec.wasm",
    "webp/codec/enc/webp_enc_simd.wasm",
  ]) {
    assert.ok((await readFile(new URL(`../dist/server/image-codecs-vendor/${path}`, import.meta.url))).byteLength > 20_000);
  }
});

test("Sites build serves calendar actions as real ICS responses", async () => {
  const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url));
  const url = new URL("https://little-weekends.test/calendar.ics");
  url.searchParams.set("id", "storytime");
  url.searchParams.set("name", "가족 스토리타임");
  url.searchParams.set("start", "2026-07-18T17:30:00.000Z");
  url.searchParams.set("end", "2026-07-18T18:15:00.000Z");
  const response = await worker.fetch(new Request(url), {}, {});

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "text/calendar; charset=utf-8");
  assert.match(await response.text(), /BEGIN:VCALENDAR[\s\S]*SUMMARY:가족 스토리타임[\s\S]*END:VCALENDAR/);
});

test("Sites build serves all nine mobile moment photos", async () => {
  const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url));
  const routes = [
    "park-walk",
    "library-picture-book",
    "family-storytime",
    "playground-morning",
    "nature-trail",
    "rainy-puddles",
    "discovery-gallery",
    "community-festival",
    "music-movement",
  ];

  for (const name of routes) {
    const response = await worker.fetch(new Request(`https://little-weekends.test/assets/mobile-moments/${name}.jpg`), {}, {});
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "image/jpeg");
    assert.ok((await response.arrayBuffer()).byteLength > 80_000);
  }
});

test("Sites build serves every verified place photo", async () => {
  const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url));
  const context = { window: {} };
  vm.runInNewContext(await readFile(new URL("place-images.js", root), "utf8"), context);

  for (const image of Object.values(context.window.LITTLE_WEEKENDS_PLACE_IMAGES)) {
    const response = await worker.fetch(new Request(`https://little-weekends.test/${image.src}`), {}, {});
    assert.equal(response.status, 200);
    assert.equal(
      response.headers.get("content-type"),
      image.src.endsWith(".webp") ? "image/webp" : "image/jpeg",
    );
    assert.ok((await response.arrayBuffer()).byteLength > 40_000);
  }
});

test("typography scale and Korean wrapping remain intentionally readable", async () => {
  const css = await readFile(new URL("styles.css", root), "utf8");

  assert.match(css, /font-size:\s*115%/);
  assert.match(css, /\.image-kind-badge\s*\{[^}]*position:\s*absolute/);
  assert.match(css, /\.image-kind-badge\.is-context\s*\{[^}]*background:/);
  assert.match(css, /\.image-kind-badge\.is-actual\s*\{[^}]*background:/);
  assert.match(css, /\.detail-visual figcaption a\s*\{[^}]*text-underline-offset:/);
  assert.match(css, /\.card-image img\.is-streetview\s*\{[^}]*object-fit:\s*contain/);
  assert.match(css, /\.detail-visual img\.is-streetview\s*\{[^}]*object-fit:\s*contain/);
  assert.match(css, /--font-ui:\s*system-ui/);
  assert.match(css, /\.hero h1\s*\{[^}]*font-family:\s*var\(--font-display\)/);
  assert.match(css, /@media \(max-width:\s*768px\)[\s\S]*?\.hero h1\s*\{[^}]*font-family:\s*var\(--font-display-compact\)/);
  assert.match(css, /\.quick-heading h2, \.results-header h2\s*\{[^}]*font-family:\s*var\(--font-ui\)/);
  assert.match(css, /line-break:\s*strict/);
  assert.match(css, /word-break:\s*keep-all/);
  assert.match(css, /overflow-wrap:\s*break-word/);
  assert.match(css, /\.toast \{[^}]*white-space:\s*normal/);
  assert.match(css, /@media \(max-width:\s*768px\)[\s\S]*?\.map-canvas\s*\{[^}]*aspect-ratio:\s*auto[^}]*height:\s*65dvh[^}]*width:\s*100%/);
});
