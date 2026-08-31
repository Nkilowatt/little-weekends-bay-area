const listEl = document.querySelector("#adminPhotoList");
const statusEl = document.querySelector("#adminStatus");
const metricsEl = document.querySelector("#adminMetrics");
const statusSelect = document.querySelector("#photoStatus");
const reportListEl = document.querySelector("#adminReportList");
const reportStatusEl = document.querySelector("#adminReportStatus");

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function dateLabel(value) {
  if (!value) return "촬영일 미입력";
  return new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric" }).format(new Date(`${value}T12:00:00`));
}

function dateTimeLabel(value) {
  if (!value) return "시각 확인 불가";
  return new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function renderMetrics(metrics = {}) {
  const counts = metrics.counts || {};
  const coverage = metrics.catalogPlaces ? Math.round((metrics.actualPhotoPlaces || 0) / metrics.catalogPlaces * 100) : 0;
  metricsEl.innerHTML = [
    ["검수 대기", counts.pending || 0],
    ["승인 사진", counts.approved || 0],
    ["거절", counts.rejected || 0],
    ["미처리 신고", metrics.reportCounts?.new || 0],
    ["장소 사진 커버리지", `${coverage}%`],
  ].map(([label, value]) => `<div class="admin-metric"><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong></div>`).join("");
}

function cardMarkup(photo) {
  const reviewed = photo.reviewedAt ? ` · 검수 ${new Intl.DateTimeFormat("ko-KR").format(new Date(photo.reviewedAt))}` : "";
  return `
    <article class="admin-photo-card" data-photo-id="${escapeHtml(photo.id)}">
      <img src="${escapeHtml(photo.previewUrl)}" alt="${escapeHtml(photo.placeName)} 검수 사진" />
      <div class="admin-photo-copy">
        <h2>${escapeHtml(photo.placeName)}</h2>
        <div class="admin-photo-meta"><span>${escapeHtml(photo.placeKey)}</span><span>${dateLabel(photo.takenOn)} · 제출 ${new Intl.DateTimeFormat("ko-KR").format(new Date(photo.createdAt))}${reviewed}</span><span>상태: ${escapeHtml(photo.status)}${photo.featured ? " · 대표 사진" : ""}</span></div>
        <div class="admin-photo-checklist"><span>검수 기준: 장소를 쉽게 알아볼 수 있고 가족의 방문 결정에 도움이 되는 장면인지 확인</span><span>✓ 제출자가 촬영·사용 권리를 확인함</span><span>✓ 식별 가능한 사람·미성년자의 동의를 확인함</span><span>✓ Little Weekends 공개 사용에 동의함</span><span>동의 ${escapeHtml(photo.consentVersion || "버전 확인 불가")} · ${escapeHtml(dateTimeLabel(photo.consentAt))}</span></div>
        ${photo.rejectionReason ? `<p class="admin-status">처리 사유: ${escapeHtml(photo.rejectionReason)}</p>` : ""}
        <label class="admin-reason"><span>거절·삭제 사유</span><textarea maxlength="300" placeholder="예: 장소를 확인하기 어렵거나 개인정보가 노출됨"></textarea></label>
        <div class="admin-photo-actions">
          ${photo.status === "pending" ? '<button class="secondary-action" data-action="approve" data-featured="false" type="button">승인</button><button class="primary-action" data-action="approve" data-featured="true" type="button">승인하고 대표로 지정</button><button class="secondary-action" data-action="reject" type="button">거절</button>' : ""}
          ${photo.status === "approved" && !photo.featured ? '<button class="secondary-action" data-action="feature" type="button">대표로 지정</button>' : ""}
          ${["pending", "approved"].includes(photo.status) ? '<button class="danger" data-action="delete" type="button">공개 중단·삭제</button>' : ""}
        </div>
      </div>
    </article>`;
}

async function updatePhoto(card, action, featured = false) {
  const buttons = card.querySelectorAll("button");
  buttons.forEach((button) => { button.disabled = true; });
  statusEl.textContent = "사진 상태를 업데이트하고 있어요.";
  const response = await fetch(`/api/admin/place-photos/${encodeURIComponent(card.dataset.photoId)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, featured, reason: card.querySelector("textarea")?.value || "" }),
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    statusEl.textContent = payload.error || "사진 상태를 바꾸지 못했어요.";
    buttons.forEach((button) => { button.disabled = false; });
    return;
  }
  await loadPhotos();
}

function reportMarkup(report) {
  const preview = report.previewUrl
    ? `<img src="${escapeHtml(report.previewUrl)}" alt="${escapeHtml(report.placeName)} 신고 사진" />`
    : '<div class="admin-report-placeholder">이미 공개 중단됨</div>';
  return `<article class="admin-report-card" data-report-id="${escapeHtml(report.id)}">
    ${preview}
    <div class="admin-report-copy"><h3>${escapeHtml(report.placeName)}</h3><p>${escapeHtml(report.message)}</p><small>${escapeHtml(dateTimeLabel(report.createdAt))} · ${escapeHtml(report.photoStatus)}${report.email ? ` · ${escapeHtml(report.email)}` : ""}</small><small>${escapeHtml(report.photoId)}</small></div>
    <div class="admin-report-actions"><button class="secondary-action" data-report-action="dismiss" type="button">문제 없음</button><button class="danger" data-report-action="takedown" type="button">즉시 공개 중단</button></div>
  </article>`;
}

async function updateReport(card, action) {
  if (action === "takedown" && !window.confirm("이 사진을 즉시 비공개 처리하고 파일을 삭제할까요?")) return;
  card.querySelectorAll("button").forEach((button) => { button.disabled = true; });
  reportStatusEl.textContent = "신고를 처리하고 있어요.";
  const response = await fetch(`/api/admin/photo-reports/${encodeURIComponent(card.dataset.reportId)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    reportStatusEl.textContent = payload.error || "신고를 처리하지 못했어요.";
    card.querySelectorAll("button").forEach((button) => { button.disabled = false; });
    return;
  }
  await loadPhotos();
}

async function loadPhotos() {
  statusEl.textContent = "검수 목록을 불러오고 있어요.";
  const response = await fetch(`/api/admin/place-photos?status=${encodeURIComponent(statusSelect.value)}`, { headers: { Accept: "application/json" }, cache: "no-store" });
  if (response.status === 401) {
    const payload = await response.json().catch(() => ({}));
    window.location.assign(payload.signIn || "/signin-with-chatgpt?return_to=%2Fadmin%2Fphotos");
    return;
  }
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    statusEl.textContent = payload.error || "검수 목록을 불러오지 못했어요.";
    return;
  }
  const payload = await response.json();
  renderMetrics(payload.metrics);
  const reports = Array.isArray(payload.reports) ? payload.reports : [];
  reportStatusEl.textContent = reports.length ? `${reports.length}건을 먼저 확인해 주세요.` : "새 신고가 없어요.";
  reportListEl.innerHTML = reports.length ? reports.map(reportMarkup).join("") : '<div class="admin-empty">처리할 사진 신고가 없어요.</div>';
  reportListEl.querySelectorAll("[data-report-action]").forEach((button) => button.addEventListener("click", () => updateReport(button.closest("[data-report-id]"), button.dataset.reportAction)));
  statusEl.textContent = `${payload.submissions.length}개 사진을 표시하고 있어요.`;
  listEl.innerHTML = payload.submissions.length ? payload.submissions.map(cardMarkup).join("") : '<div class="admin-empty">이 상태의 사진이 없어요.</div>';
  listEl.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", () => updatePhoto(button.closest("[data-photo-id]"), button.dataset.action, button.dataset.featured === "true")));
}

statusSelect.addEventListener("change", loadPhotos);
loadPhotos();
