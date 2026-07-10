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
    location: { lat: 37.7793, lng: -122.4156 }
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
    location: { lat: 37.5376, lng: -122.3051 }
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
    location: { lat: 37.5902, lng: -122.3204 },
    pinOffset: { x: -2.2, y: 1.8 }
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
    location: { lat: 37.5906, lng: -122.3188 },
    pinOffset: { x: 2.2, y: -1.8 }
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
    location: { lat: 37.4441, lng: -122.1396 }
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
    location: { lat: 37.3182, lng: -122.0290 }
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
    location: { lat: 37.6547, lng: -122.4077 }
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
    location: { lat: 37.4636, lng: -122.4286 }
  },
  {
    id: "hillsdale-toddler-2026-07-13",
    name: "Hillsdale Toddler Storytime",
    type: "storytime",
    setting: "indoor",
    dateBucket: "nextweek",
    startDate: "2026-07-13T10:30:00-07:00",
    timeLabel: "7월 13일 월요일 10:30 AM",
    city: "San Mateo",
    distance: 2.1,
    age: "18개월-3세",
    price: "free",
    reservation: "예약 불필요 · 정원 35명",
    source: "https://www.cityofsanmateo.org/4256/Childrens-Programs-and-Storytimes",
    sourceName: "San Mateo Public Library",
    updated: "7월 10일 공식 확인",
    why: "가장 가까운 다음 주 평일 오전 일정으로, 노래와 짧은 이야기를 편하게 즐기기 좋아요.",
    notes: {
      parking: "Hillsdale Library 주변 주차 옵션을 확인하고 조금 일찍 도착하세요.",
      bathroom: "도서관 내 화장실 이용 가능.",
      stroller: "정원이 35명이라 입구가 붐빌 수 있어 접이식 유모차가 편해요."
    },
    location: { lat: 37.5376, lng: -122.3051 }
  },
  {
    id: "ssf-toddler-2026-07-14",
    name: "South San Francisco Toddler Storytime",
    type: "storytime",
    setting: "indoor",
    dateBucket: "nextweek",
    startDate: "2026-07-14T10:30:00-07:00",
    timeLabel: "7월 14일 화요일 10:30 AM",
    city: "South San Francisco",
    distance: 12.6,
    age: "18개월-6세",
    price: "free",
    reservation: "예약 불필요",
    source: "https://www.ssfca.gov/Events/0726-Toddler-Storytime",
    sourceName: "City of South San Francisco",
    updated: "7월 10일 공식 확인",
    why: "이야기와 노래를 30분 동안 진행해 긴 프로그램이 아직 어려운 아이에게 잘 맞아요.",
    notes: {
      parking: "Civic Campus 주차장을 이용할 수 있어요.",
      bathroom: "도서관과 공원·레크리에이션 센터 내 화장실 이용 가능.",
      stroller: "2층 Youth Library까지 엘리베이터 동선을 이용하세요."
    },
    location: { lat: 37.6547, lng: -122.4077 }
  },
  {
    id: "shoreview-storytime-2026-07-15",
    name: "Storytime in the Park at Shoreview",
    type: "storytime",
    setting: "outdoor",
    dateBucket: "nextweek",
    startDate: "2026-07-15T10:30:00-07:00",
    timeLabel: "7월 15일 수요일 10:30 AM",
    city: "San Mateo",
    distance: 4.7,
    age: "0-5세",
    price: "free",
    reservation: "예약 불필요",
    source: "https://www.cityofsanmateo.org/4256/Childrens-Programs-and-Storytimes",
    sourceName: "San Mateo Public Library",
    updated: "7월 10일 공식 확인",
    why: "Shoreview Park 잔디에서 책과 바깥놀이를 한 번에 해결할 수 있는 가까운 오전 일정이에요.",
    notes: {
      parking: "950 Ocean View Avenue 주변 공원 주차 상황을 확인하세요.",
      bathroom: "공원 화장실 운영 여부를 방문 전에 확인하세요.",
      stroller: "야외 잔디 구간을 고려해 큰 바퀴 유모차나 돗자리가 편해요."
    },
    location: { lat: 37.5746, lng: -122.2994 }
  },
  {
    id: "grand-pajama-2026-07-15",
    name: "Grand Pajama Storytime",
    type: "storytime",
    setting: "indoor",
    dateBucket: "nextweek",
    startDate: "2026-07-15T18:00:00-07:00",
    timeLabel: "7월 15일 수요일 6:00 PM",
    city: "South San Francisco",
    distance: 12.2,
    age: "가족",
    price: "free",
    reservation: "예약 불필요",
    source: "https://www.ssfca.gov/Events/Grand-Pajama-Storytime",
    sourceName: "City of South San Francisco",
    updated: "7월 10일 공식 확인",
    why: "잠옷 차림으로 이야기와 노래를 즐기는 저녁 프로그램이라 낮 일정이 어려운 날에 좋아요.",
    notes: {
      parking: "Grand Avenue Library 인근 노상 주차를 확인하세요.",
      bathroom: "도서관 내 화장실 이용 가능.",
      stroller: "30분 프로그램이라 가벼운 유모차로 이동하기 좋아요."
    },
    location: { lat: 37.6555, lng: -122.4102 }
  },
  {
    id: "grand-musical-2026-07-16",
    name: "Grand Musical Storytime",
    type: "storytime",
    setting: "indoor",
    dateBucket: "nextweek",
    startDate: "2026-07-16T10:30:00-07:00",
    timeLabel: "7월 16일 목요일 10:30 AM",
    city: "South San Francisco",
    distance: 12.2,
    age: "유아-미취학",
    price: "free",
    reservation: "예약 불필요",
    source: "https://www.ssfca.gov/Events/Grand-Musical-Storytime",
    sourceName: "City of South San Francisco",
    updated: "7월 10일 공식 확인",
    why: "책 읽기보다 노래와 리듬에 더 잘 반응하는 아이에게 맞는 30분 프로그램이에요.",
    notes: {
      parking: "Grand Avenue Library 인근 노상 주차를 확인하세요.",
      bathroom: "도서관 내 화장실 이용 가능.",
      stroller: "프로그램 공간이 붐빌 수 있어 작은 유모차가 편해요."
    },
    location: { lat: 37.6555, lng: -122.4102 },
    pinOffset: { x: 2.4, y: -1.8 }
  },
  {
    id: "ssf-movie-night-2026-07-17",
    name: "Movie Night + Field Day",
    type: "seasonal",
    setting: "outdoor",
    dateBucket: "nextweek",
    startDate: "2026-07-17T18:00:00-07:00",
    timeLabel: "7월 17일 금요일 6:00 PM",
    city: "South San Francisco",
    distance: 11.8,
    age: "전 연령",
    price: "free",
    reservation: "예약 불필요",
    source: "https://www.ssfca.gov/Departments/Parks-Recreation/Events/Movie-Night-in-the-Park-Field-Day",
    sourceName: "City of South San Francisco",
    updated: "7월 10일 공식 확인",
    why: "영화 전 가족 활동과 무료 핫도그가 있고, 8시 30분부터 야외에서 Zootopia 2를 상영해요.",
    notes: {
      parking: "Orange Memorial Park Meadow 주변 여러 무료 주차장을 이용할 수 있어요.",
      bathroom: "행사 중 1인용 화장실과 이동식 화장실이 운영됩니다.",
      stroller: "잔디 행사라 담요와 함께 큰 바퀴 유모차가 편해요."
    },
    location: { lat: 37.6542, lng: -122.4278 }
  },
  {
    id: "filipino-storytime-2026-07-18",
    name: "Filipino Bilingual Storytime",
    type: "storytime",
    setting: "indoor",
    dateBucket: "nextweek",
    startDate: "2026-07-18T11:30:00-07:00",
    timeLabel: "7월 18일 토요일 11:30 AM",
    city: "South San Francisco",
    distance: 12.6,
    age: "가족",
    price: "free",
    reservation: "공식 일정 확인",
    source: "https://www.ssfca.gov/Departments/Library/Services/Kids-Teens/Storytime-Schedule",
    sourceName: "City of South San Francisco",
    updated: "7월 10일 공식 확인",
    why: "필리핀어와 영어를 함께 접하며 가족 단위로 참여할 수 있는 토요일 오전 일정이에요.",
    notes: {
      parking: "Civic Campus 주차장을 이용할 수 있어요.",
      bathroom: "시설 내 화장실 이용 가능.",
      stroller: "메인 도서관의 엘리베이터와 유모차 동선을 이용하세요."
    },
    location: { lat: 37.6547, lng: -122.4077 },
    pinOffset: { x: -2.4, y: 1.8 }
  },
  {
    id: "rhythm-builders-2026-07-18",
    name: "The Rhythm Builders: Fun with Drums",
    type: "seasonal",
    setting: "indoor",
    dateBucket: "nextweek",
    startDate: "2026-07-18T14:00:00-07:00",
    timeLabel: "7월 18일 토요일 2:00 PM",
    city: "South San Francisco",
    distance: 12.6,
    age: "가족",
    price: "free",
    reservation: "예약 불필요",
    source: "https://www.ssfca.gov/Events/0726-Summer-Learning-Challenge-The-Rhythm-Builders-Fun-with-Drums",
    sourceName: "City of South San Francisco",
    updated: "7월 10일 공식 확인",
    why: "콜앤리스폰스, 움직임, 이야기와 음악이 섞인 참여형 드럼 공연이라 에너지를 쓰기 좋아요.",
    notes: {
      parking: "Civic Campus 주차장을 이용할 수 있어요.",
      bathroom: "시설 내 화장실 이용 가능.",
      stroller: "1층 Council Chambers 행사라 이동이 비교적 쉬워요."
    },
    location: { lat: 37.6547, lng: -122.4077 },
    pinOffset: { x: 2.4, y: 1.8 }
  }
];

const mapBounds = {
  north: 38.2033,
  south: 37.1897,
  west: -122.6445,
  east: -121.5871
};

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
const summaryEyebrowEl = document.querySelector("#summaryEyebrow");
const summaryTitleEl = document.querySelector("#summaryTitle");
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

function projectLocation(location) {
  const x = ((location.lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * 100;
  const y = ((mapBounds.north - location.lat) / (mapBounds.north - mapBounds.south)) * 100;
  return {
    x: Math.min(96, Math.max(4, x)),
    y: Math.min(96, Math.max(4, y))
  };
}

function shiftedPoint(point, offset = {}) {
  return {
    x: Math.min(96, Math.max(4, point.x + (offset.x || 0))),
    y: Math.min(96, Math.max(4, point.y + (offset.y || 0)))
  };
}

function mapLabel(name, location, className = "", offset = {}) {
  const point = shiftedPoint(projectLocation(location), offset);
  const classes = ["map-label", className].filter(Boolean).join(" ");
  return `<span class="${classes}" style="left: ${point.x}%; top: ${point.y}%;">${name}</span>`;
}

function projectPin(item) {
  return shiftedPoint(projectLocation(item.location), item.pinOffset);
}

function mapLabelText(name, left, top, className = "") {
  const classes = ["map-region-label", className].filter(Boolean).join(" ");
  return `<span class="${classes}" style="left: ${left}%; top: ${top}%;">${name}</span>`;
}

function mapPoint(name, location, className = "") {
  const point = projectLocation(location);
  const classes = ["map-point", className].filter(Boolean).join(" ");
  return `<span class="${classes}" style="left: ${point.x}%; top: ${point.y}%;" aria-hidden="true">${name}</span>`;
}

function renderMapBase() {
  return `
    <img class="bay-map-base" src="assets/bay-area-location-map.svg" alt="" aria-hidden="true" />
    <a
      class="map-attribution"
      href="https://commons.wikimedia.org/wiki/File:United_States_San_Francisco_Bay_Area_location_map.svg"
      target="_blank"
      rel="noopener noreferrer"
    >Map: NordNordWest, CC BY-SA 3.0</a>
  `;
}

function matchesDate(item) {
  if (state.date === "anytime") return true;
  if (state.date === "week") return item.dateBucket === "today" || item.dateBucket === "week" || item.dateBucket === "anytime";
  if (state.date === "weekend") return item.dateBucket === "weekend" || item.dateBucket === "anytime";
  if (state.date === "nextweek") return item.dateBucket === "nextweek";
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
    const order = { today: 0, week: 1, weekend: 2, nextweek: 3, anytime: 4 };
    result = result.toSorted((a, b) => {
      if (a.startDate && b.startDate) return new Date(a.startDate) - new Date(b.startDate);
      return order[a.dateBucket] - order[b.dateBucket];
    });
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
    ${renderMapBase()}
    ${mapLabel("San Francisco", { lat: 37.7749, lng: -122.4194 }, "", { x: 16, y: 5 })}
    ${mapLabel("South SF", { lat: 37.6547, lng: -122.4077 }, "", { x: -7, y: 1 })}
    ${mapLabel("San Mateo", { lat: 37.5630, lng: -122.3255 }, "", { x: -7, y: 5 })}
    ${mapLabel("Half Moon Bay", { lat: 37.4636, lng: -122.4286 }, "coast", { x: -4, y: 6 })}
    ${mapLabel("Palo Alto", { lat: 37.4419, lng: -122.1430 }, "", { x: 12, y: 2 })}
    ${mapLabel("Cupertino", { lat: 37.3229, lng: -122.0322 }, "", { x: -5, y: -3 })}
    ${mapPoint("SF", { lat: 37.7749, lng: -122.4194 })}
    ${mapPoint("SM", { lat: 37.5630, lng: -122.3255 })}
    ${mapPoint("PA", { lat: 37.4419, lng: -122.1430 })}
    ${mapLabelText("Pacific Coast", 16, 78)}
    ${mapLabelText("San Francisco Bay", 52, 45, "bay")}
  `;

  items.forEach((item) => {
    const point = projectPin(item);
    const pin = document.createElement("button");
    pin.className = `map-pin ${item.type}`;
    pin.type = "button";
    pin.style.left = `${point.x}%`;
    pin.style.top = `${point.y}%`;
    pin.title = item.name;
    pin.setAttribute("aria-label", `${item.name}, ${item.city}`);
    pin.textContent = typeInitial(item.type);
    pin.addEventListener("click", () => openDetail(item.id));
    mapEl.append(pin);
  });
}

function render() {
  const items = filteredOutings();
  const summaries = {
    today: ["오늘의 추천", "낮잠 전후로 다녀오기 좋은 곳"],
    week: ["이번 주 추천", "평일 루틴에 넣기 좋은 곳"],
    weekend: ["이번 주말 추천", "가족이 함께 다녀오기 좋은 곳"],
    nextweek: ["7월 13-19일", "다음 주에 열리는 유아 친화 행사"],
    anytime: ["전체 추천", "날짜에 구애받지 않고 가볼 만한 곳"]
  };
  const [eyebrow, title] = summaries[state.date];
  summaryEyebrowEl.textContent = eyebrow;
  summaryTitleEl.textContent = title;
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
        <a class="primary-action" href="${item.source}" target="_blank" rel="noopener noreferrer">공식 페이지</a>
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
