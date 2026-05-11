const outings = [
  {
    id: "sfpl-main-toddler",
    name: "SFPL Main Toddler Storytime",
    type: "storytime",
    setting: "indoor",
    dateBucket: "today",
    timeLabel: "오늘 10:30 AM",
    city: "San Francisco",
    distance: 17.4,
    age: "16개월-2세",
    price: "free",
    reservation: "예약 불필요",
    source: "https://sfpl.org/kids/kids/events/storytime-sfpl",
    sourceName: "San Francisco Public Library",
    updated: "공식 캘린더 확인 필요",
    why: "짧은 노래와 책 중심이라 첫 도서관 프로그램으로 부담이 낮아요.",
    notes: {
      parking: "도심 지점이라 대중교통 또는 유료 주차를 먼저 확인하세요.",
      bathroom: "도서관 내 화장실 이용 가능.",
      stroller: "엘리베이터 접근 가능 여부를 방문 전 확인하세요."
    },
    map: { x: 40, y: 28 }
  },
  {
    id: "san-mateo-hillsdale",
    name: "Hillsdale Toddler Storytime",
    type: "storytime",
    setting: "indoor",
    dateBucket: "week",
    timeLabel: "월요일 10:30 AM",
    city: "San Mateo",
    distance: 2.1,
    age: "1-3세",
    price: "free",
    reservation: "선착순",
    source: "https://www.cityofsanmateo.org/4256/Childrens-Programs-and-Storytimes",
    sourceName: "San Mateo Public Library",
    updated: "공식 페이지 확인 필요",
    why: "가까운 평일 오전 선택지. 공간 제한이 있어 일찍 도착하는 편이 좋아요.",
    notes: {
      parking: "도서관 주변 주차 가능성을 확인하세요.",
      bathroom: "도서관 내 화장실 이용 가능.",
      stroller: "입장 대기 공간이 붐빌 수 있어 접이식 유모차가 편해요."
    },
    map: { x: 50, y: 54 }
  },
  {
    id: "coyote-point",
    name: "Coyote Point Magic Mountain Playground",
    type: "park",
    setting: "outdoor",
    dateBucket: "anytime",
    timeLabel: "상시 방문",
    city: "San Mateo",
    distance: 4.4,
    age: "1-5세",
    price: "paid",
    reservation: "예약 불필요",
    source: "https://www.smcgov.org/parks/coyote-point-recreation-area",
    sourceName: "San Mateo County Parks",
    updated: "장소 정보 리뷰 필요",
    why: "넓은 야외 공간과 놀이터가 있어 에너지를 빼기 좋아요.",
    notes: {
      parking: "카운티 공원 주차/입장 요금을 확인하세요.",
      bathroom: "공원 화장실 위치를 지도에서 먼저 확인하세요.",
      stroller: "포장 산책로 구간은 유모차 이동이 쉬운 편입니다."
    },
    map: { x: 52, y: 49 }
  },
  {
    id: "curiodyssey",
    name: "CuriOdyssey",
    type: "museum",
    setting: "indoor",
    dateBucket: "weekend",
    timeLabel: "주말 오전",
    city: "San Mateo",
    distance: 4.6,
    age: "2-6세",
    price: "paid",
    reservation: "티켓 확인",
    source: "https://curiodyssey.org/",
    sourceName: "CuriOdyssey",
    updated: "공식 운영시간 확인 필요",
    why: "짧은 실내 전시와 야외 동물 관찰을 함께 할 수 있어 날씨가 애매할 때 좋아요.",
    notes: {
      parking: "Coyote Point 방문 요금과 주차 조건을 함께 확인하세요.",
      bathroom: "시설 내 화장실 이용 가능.",
      stroller: "전시 공간 혼잡 시간에는 작은 유모차가 편해요."
    },
    map: { x: 55, y: 49 }
  },
  {
    id: "palo-alto-junior",
    name: "Palo Alto Junior Museum & Zoo",
    type: "museum",
    setting: "indoor",
    dateBucket: "weekend",
    timeLabel: "토요일 9:30 AM",
    city: "Palo Alto",
    distance: 16.2,
    age: "1-5세",
    price: "paid",
    reservation: "티켓 권장",
    source: "https://www.paloaltozoo.org/",
    sourceName: "Palo Alto Junior Museum & Zoo",
    updated: "공식 운영시간 확인 필요",
    why: "유아에게 맞는 작은 규모라 오래 걷지 않아도 볼거리가 있어요.",
    notes: {
      parking: "인근 공공 주차 옵션을 확인하세요.",
      bathroom: "시설 내 화장실 이용 가능.",
      stroller: "전시 동선이 짧아 유모차와 도보를 섞기 좋습니다."
    },
    map: { x: 66, y: 73 }
  },
  {
    id: "cupertino-library",
    name: "Cupertino Library Toddler Storytime",
    type: "storytime",
    setting: "indoor",
    dateBucket: "week",
    timeLabel: "화요일 10:30 AM",
    city: "Cupertino",
    distance: 25,
    age: "1-3세",
    price: "free",
    reservation: "공식 일정 확인",
    source: "https://sccld.org/cupertino/",
    sourceName: "Santa Clara County Library District",
    updated: "공식 캘린더 확인 필요",
    why: "도서관 일정이 반복되는 편이라 주간 루틴 후보로 좋아요.",
    notes: {
      parking: "도서관 주차 정보를 확인하세요.",
      bathroom: "도서관 내 화장실 이용 가능.",
      stroller: "실내 이동은 쉬우나 프로그램실 혼잡도를 확인하세요."
    },
    map: { x: 78, y: 82 }
  },
  {
    id: "ssf-toddler",
    name: "South San Francisco Toddler Storytime",
    type: "storytime",
    setting: "indoor",
    dateBucket: "week",
    timeLabel: "화요일 10:30 AM",
    city: "South San Francisco",
    distance: 12.6,
    age: "18개월-3세",
    price: "free",
    reservation: "공식 일정 확인",
    source: "https://www.ssfca.gov/Events/0226-Toddler-Storytime",
    sourceName: "City of South San Francisco",
    updated: "공식 페이지 확인 필요",
    why: "18개월-3세로 연령대가 뚜렷해서 아이 수준을 맞추기 쉬워요.",
    notes: {
      parking: "Civic Campus 주차 정보를 확인하세요.",
      bathroom: "시설 내 화장실 이용 가능.",
      stroller: "2층 위치와 엘리베이터 동선을 확인하세요."
    },
    map: { x: 45, y: 39 }
  },
  {
    id: "seasonal-farm",
    name: "Seasonal Farm Morning",
    type: "seasonal",
    setting: "outdoor",
    dateBucket: "weekend",
    timeLabel: "일요일 9:00 AM",
    city: "Half Moon Bay",
    distance: 18.8,
    age: "2-5세",
    price: "paid",
    reservation: "예약 가능성 높음",
    source: "https://www.visithalfmoonbay.org/",
    sourceName: "Half Moon Bay visitor resources",
    updated: "큐레이션 후보",
    why: "계절감이 강하고 사진보다 실제 체험 만족도가 높은 주말 후보예요.",
    notes: {
      parking: "농장별 주차 조건이 달라 공식 페이지 확인이 필요합니다.",
      bathroom: "휴대용 화장실만 있는 곳도 있어 사전 확인이 중요합니다.",
      stroller: "흙길이 많아 왜건 또는 아기띠가 나을 수 있어요."
    },
    map: { x: 30, y: 62 }
  }
];

const state = {
  date: "today",
  distance: "25",
  type: "all",
  setting: "all",
  price: "all",
  view: "split",
  sort: "recommended",
  savedOnly: false,
  saved: new Set(),
  search: ""
};

const cardsEl = document.querySelector("#cards");
const mapEl = document.querySelector("#mapCanvas");
const summaryEl = document.querySelector("#resultSummary");
const contentGrid = document.querySelector("#contentGrid");
const detailDialog = document.querySelector("#detailDialog");
const detailBody = document.querySelector("#detailBody");

function typeLabel(type) {
  return {
    storytime: "스토리타임",
    park: "공원/놀이터",
    indoor: "실내 놀이",
    museum: "뮤지엄",
    seasonal: "시즌"
  }[type] || type;
}

function typeInitial(type) {
  return {
    storytime: "B",
    park: "P",
    indoor: "I",
    museum: "M",
    seasonal: "S"
  }[type] || "L";
}

function matchesDate(item) {
  if (state.date === "anytime") return true;
  if (state.date === "week") return item.dateBucket === "today" || item.dateBucket === "week" || item.dateBucket === "anytime";
  if (state.date === "weekend") return item.dateBucket === "weekend" || item.dateBucket === "anytime";
  return item.dateBucket === "today" || item.dateBucket === "anytime";
}

function filteredOutings() {
  let result = outings.filter((item) => {
    const searchText = `${item.name} ${item.city} ${item.type} ${item.why}`.toLowerCase();
    const searchMatch = !state.search || searchText.includes(state.search.toLowerCase());
    const savedMatch = !state.savedOnly || state.saved.has(item.id);
    const distanceMatch = item.distance <= Number(state.distance);
    const typeMatch = state.type === "all" || item.type === state.type;
    const settingMatch = state.setting === "all" || item.setting === state.setting;
    const priceMatch = state.price === "all" || item.price === state.price;
    return searchMatch && savedMatch && matchesDate(item) && distanceMatch && typeMatch && settingMatch && priceMatch;
  });

  if (state.sort === "nearest") {
    result = result.toSorted((a, b) => a.distance - b.distance);
  }

  if (state.sort === "soonest") {
    const order = { today: 0, week: 1, weekend: 2, anytime: 3 };
    result = result.toSorted((a, b) => order[a.dateBucket] - order[b.dateBucket]);
  }

  return result;
}

function renderCards(items) {
  cardsEl.innerHTML = "";

  if (!items.length) {
    cardsEl.innerHTML = '<div class="empty-state">조건에 맞는 후보가 없어요. 거리나 날짜를 조금 넓혀보세요.</div>';
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("button");
    card.className = "outing-card";
    card.type = "button";
    card.innerHTML = `
      <span class="thumb" aria-hidden="true">${typeInitial(item.type)}</span>
      <span>
        <span class="card-meta">
          <span>${item.timeLabel}</span>
          <span>${item.distance.toFixed(1)} mi</span>
          <span>${item.price === "free" ? "무료" : "유료"}</span>
          <span>${item.updated}</span>
        </span>
        <h3>${item.name}</h3>
        <span class="badges">
          <span class="badge">${typeLabel(item.type)}</span>
          <span class="badge">${item.setting === "indoor" ? "실내" : "야외"}</span>
          <span class="badge">${item.age}</span>
        </span>
        <p class="why">${item.why}</p>
      </span>
    `;
    card.addEventListener("click", () => openDetail(item.id));
    cardsEl.append(card);
  });
}

function renderMap(items) {
  mapEl.innerHTML = `
    <span class="map-label" style="left: 42%; top: 31%;">SF</span>
    <span class="map-label" style="left: 51%; top: 55%;">Peninsula</span>
    <span class="map-label" style="left: 75%; top: 82%;">South Bay</span>
  `;

  items.forEach((item) => {
    const pin = document.createElement("button");
    pin.className = `map-pin ${item.type}`;
    pin.type = "button";
    pin.style.left = `${item.map.x}%`;
    pin.style.top = `${item.map.y}%`;
    pin.title = item.name;
    pin.textContent = typeInitial(item.type);
    pin.addEventListener("click", () => openDetail(item.id));
    mapEl.append(pin);
  });
}

function render() {
  const items = filteredOutings();
  summaryEl.textContent = `${items.length}개 후보를 찾았어요.`;
  renderCards(items);
  renderMap(items);
}

function openDetail(id) {
  const item = outings.find((outing) => outing.id === id);
  if (!item) return;

  const isSaved = state.saved.has(id);
  detailBody.innerHTML = `
    <article class="detail-body">
      <div class="detail-hero">
        <p class="eyebrow">${typeLabel(item.type)} · ${item.city}</p>
        <h2>${item.name}</h2>
        <p>${item.why}</p>
      </div>

      <div class="detail-grid">
        <span class="badge">${item.timeLabel}</span>
        <span class="badge">${item.distance.toFixed(1)} mi</span>
        <span class="badge">${item.age}</span>
        <span class="badge">${item.setting === "indoor" ? "실내" : "야외"}</span>
        <span class="badge">${item.price === "free" ? "무료" : "유료"}</span>
        <span class="badge">${item.reservation}</span>
      </div>

      <div class="detail-notes">
        <div class="note-row">
          <strong>주차</strong>
          <span>${item.notes.parking}</span>
        </div>
        <div class="note-row">
          <strong>화장실</strong>
          <span>${item.notes.bathroom}</span>
        </div>
        <div class="note-row">
          <strong>유모차</strong>
          <span>${item.notes.stroller}</span>
        </div>
        <div class="note-row">
          <strong>업데이트 상태</strong>
          <span>${item.updated}</span>
        </div>
      </div>

      <div class="detail-actions">
        <a class="primary-action" href="${item.source}" target="_blank" rel="noreferrer">공식 페이지</a>
        <button class="secondary-action" type="button" id="saveDetail">${isSaved ? "저장 해제" : "저장"}</button>
      </div>
    </article>
  `;

  detailBody.querySelector("#saveDetail").addEventListener("click", () => {
    if (state.saved.has(id)) state.saved.delete(id);
    else state.saved.add(id);
    openDetail(id);
    render();
  });

  detailDialog.showModal();
}

document.querySelectorAll("[data-date]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-date]").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    state.date = button.dataset.date;
    render();
  });
});

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-view]").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    state.view = button.dataset.view;
    contentGrid.className = `content-grid is-${state.view}`;
  });
});

document.querySelector("#distanceFilter").addEventListener("change", (event) => {
  state.distance = event.target.value;
  render();
});

document.querySelector("#typeFilter").addEventListener("change", (event) => {
  state.type = event.target.value;
  render();
});

document.querySelector("#settingFilter").addEventListener("change", (event) => {
  state.setting = event.target.value;
  render();
});

document.querySelector("#priceFilter").addEventListener("change", (event) => {
  state.price = event.target.value;
  render();
});

document.querySelector("#sortSelect").addEventListener("change", (event) => {
  state.sort = event.target.value;
  render();
});

document.querySelector("#searchInput").addEventListener("input", (event) => {
  state.search = event.target.value.trim();
  render();
});

document.querySelector("#saveToggle").addEventListener("click", () => {
  state.savedOnly = !state.savedOnly;
  document.querySelector("#saveToggle").classList.toggle("is-active", state.savedOnly);
  render();
});

document.querySelector("#resetFilters").addEventListener("click", () => {
  state.distance = "25";
  state.type = "all";
  state.setting = "all";
  state.price = "all";
  document.querySelector("#distanceFilter").value = "25";
  document.querySelector("#typeFilter").value = "all";
  document.querySelector("#settingFilter").value = "all";
  document.querySelector("#priceFilter").value = "all";
  render();
});

document.querySelector("#closeDialog").addEventListener("click", () => {
  detailDialog.close();
});

render();
