const listEl = document.querySelector("#adminPhotoList");
const statusEl = document.querySelector("#adminStatus");
const metricsEl = document.querySelector("#adminMetrics");
const statusSelect = document.querySelector("#photoStatus");

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function dateLabel(value) {
  if (!value) return "촬영일 미입력";
  return new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric" }).format(new Date(`${value}T12:00:00`));
}

function renderMetrics(metrics = {}) {
  const counts = metrics.counts || {};
  const coverage = metrics.catalogPlaces ? Math.round((metrics.actualPhotoPlaces || 0) / metrics.catalogPlaces * 100) : 0;
  metricsEl.innerHTML = [
    ["검수 대기", counts.pending || 0],
    ["승인 사진", counts.approved || 0],
    ["거절", counts.rejected || 0],
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
        <div class="admin-photo-checklist"><span>✓ 제출자가 촬영·사용 권리를 확인함</span><span>✓ 식별 가능한 사람·미성년자의 동의를 확인함</span><span>✓ Little Weekends 공개 사용에 동의함</span></div>
        ${photo.rejectionReason ? `<p class="admin-status">처리 사유: ${escapeHtml(photo.rejectionReason)}</p>` : ""}
        <label class="admin-reason"><span>거절·삭제 사유</span><textarea maxlength="300" placeholder="예: 장소를 확인하기 어렵거나 개인정보가 노출됨"></textarea></label>
        <div class="admin-photo-actions">
          ${photo.status === "pending" ? '<button class="primary-action" data-action="approve" type="button">승인하고 대표로 지정</button><button class="secondary-action" data-action="reject" type="button">거절</button>' : ""}
          ${photo.status === "approved" && !photo.featured ? '<button class="secondary-action" data-action="feature" type="button">대표로 지정</button>' : ""}
          ${["pending", "approved"].includes(photo.status) ? '<button class="danger" data-action="delete" type="button">공개 중단·삭제</button>' : ""}
        </div>
      </div>
    </article>`;
}

async function updatePhoto(card, action) {
  const buttons = card.querySelectorAll("button");
  buttons.forEach((button) => { button.disabled = true; });
  statusEl.textContent = "사진 상태를 업데이트하고 있어요.";
  const response = await fetch(`/api/admin/place-photos/${encodeURIComponent(card.dataset.photoId)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, featured: true, reason: card.querySelector("textarea")?.value || "" }),
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    statusEl.textContent = payload.error || "사진 상태를 바꾸지 못했어요.";
    buttons.forEach((button) => { button.disabled = false; });
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
  statusEl.textContent = `${payload.submissions.length}개 사진을 표시하고 있어요.`;
  listEl.innerHTML = payload.submissions.length ? payload.submissions.map(cardMarkup).join("") : '<div class="admin-empty">이 상태의 사진이 없어요.</div>';
  listEl.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", () => updatePhoto(button.closest("[data-photo-id]"), button.dataset.action)));
}

statusSelect.addEventListener("change", loadPhotos);
loadPhotos();
