let outings = [
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
    source: "https://www.smcgov.org/parks/coyote-point-recreation-area-activities",
    sourceName: "San Mateo County Parks",
    updated: "7월 12일 직접 확인",
    lastReviewedAt: "2026-07-12",
    confidenceStatus: "human_verified",
    address: "1701 Coyote Point Drive, San Mateo, CA 94401",
    why: "2-5세 구역이 따로 있는 성과 용 테마 놀이터라 어린아이와 움직이기 좋아요.",
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
    dateBucket: "anytime",
    timeLabel: "상시 방문",
    city: "San Mateo",
    distance: 4.6,
    age: "2-6세",
    price: "paid",
    reservation: "티켓 확인",
    source: "https://curiodyssey.org/visit/",
    sourceName: "CuriOdyssey",
    updated: "7월 12일 직접 확인",
    lastReviewedAt: "2026-07-12",
    confidenceStatus: "human_verified",
    address: "1651 Coyote Point Drive, San Mateo, CA 94401",
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
    dateBucket: "anytime",
    timeLabel: "화-일 운영",
    city: "Palo Alto",
    distance: 16.2,
    age: "1-5세",
    price: "paid",
    reservation: "티켓 권장",
    source: "https://www.paloaltozoo.org/Visit",
    sourceName: "Palo Alto Junior Museum & Zoo",
    updated: "7월 12일 직접 확인",
    lastReviewedAt: "2026-07-12",
    confidenceStatus: "human_verified",
    address: "1451 Middlefield Road, Palo Alto, CA 94301",
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

function ageRangeFromLabel(label) {
  const value = String(label || "").replace(/\s+/g, "");
  const monthRange = value.match(/(\d+)개월-(\d+)개월/);
  if (monthRange) return { minAgeMonths: Number(monthRange[1]), maxAgeMonths: Number(monthRange[2]) };

  const mixedRange = value.match(/(\d+)개월-(\d+)세/);
  if (mixedRange) return { minAgeMonths: Number(mixedRange[1]), maxAgeMonths: (Number(mixedRange[2]) + 1) * 12 - 1 };

  const yearRange = value.match(/(\d+)-(\d+)세/);
  if (yearRange) return { minAgeMonths: Number(yearRange[1]) * 12, maxAgeMonths: (Number(yearRange[2]) + 1) * 12 - 1 };

  if (/가족|전연령/.test(value)) return { minAgeMonths: 0, maxAgeMonths: 216 };
  return { minAgeMonths: 0, maxAgeMonths: 72 };
}

const officialSourceHosts = new Set([
  "bayareadiscoverymuseum.org",
  "bibliocommons.com",
  "cdm.org",
  "cityofsanmateo.org",
  "creativity.org",
  "curiodyssey.org",
  "ebparks.org",
  "fairyland.org",
  "gateway.bibliocommons.com",
  "grpg.org",
  "happyhollow.org",
  "hiller.org",
  "lawrencehallofscience.org",
  "lindsaywildlife.org",
  "oaklandzoo.org",
  "paloalto.gov",
  "paloaltozoo.org",
  "presidio.gov",
  "randallmuseum.org",
  "sanjoseca.gov",
  "sccld.org",
  "sfpl.org",
  "sfrecpark.org",
  "sfzoo.org",
  "smcgov.org",
  "ssfca.gov",
  "traintown.com",
  "visithalfmoonbay.org"
]);
const outingTypes = new Set(["storytime", "park", "indoor", "museum", "seasonal"]);
const outingSettings = new Set(["indoor", "outdoor"]);
const outingPrices = new Set(["free", "paid"]);
const confidenceStatuses = new Set(["human_verified", "source_confirmed", "recheck", "stale"]);
const regionLabels = {
  sf: "San Francisco",
  peninsula: "Peninsula",
  "south-bay": "South Bay",
  "east-bay": "East Bay",
  "north-bay": "North Bay"
};

function regionForCity(city) {
  const normalizedCity = String(city || "").toLowerCase();
  if (["san mateo", "south san francisco", "san carlos", "palo alto", "half moon bay", "redwood city", "burlingame", "belmont", "foster city"].some((name) => normalizedCity.includes(name))) return "peninsula";
  if (normalizedCity.includes("san francisco")) return "sf";
  if (["san jose", "cupertino", "santa clara", "sunnyvale", "mountain view", "los gatos", "milpitas"].some((name) => normalizedCity.includes(name))) return "south-bay";
  if (["oakland", "berkeley", "walnut creek", "fremont", "hayward", "alameda", "concord", "pleasanton", "richmond"].some((name) => normalizedCity.includes(name))) return "east-bay";
  if (["sausalito", "sonoma", "marin", "novato", "san rafael", "napa", "petaluma"].some((name) => normalizedCity.includes(name))) return "north-bay";
  return "other";
}

function reservationLevel(value) {
  const label = String(value || "");
  if (/불필요|필요 없음|예약 없이/.test(label)) return "none";
  if (/필요|권장|티켓|선착순|등록/.test(label)) return "required";
  return "check";
}

function practicalNoteKnown(value) {
  const note = String(value || "").trim();
  return Boolean(note) && !/확인|문의|정보 없음|알 수|준비 중/.test(note);
}

function safeText(value, fallback = "", maxLength = 500) {
  const text = String(value ?? fallback).replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
  return (text || fallback).slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function safeSourceUrl(value) {
  try {
    const url = new URL(String(value || ""));
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    const allowed = [...officialSourceHosts].some((host) => hostname === host || hostname.endsWith(`.${host}`));
    return url.protocol === "https:" && allowed ? url.href : null;
  } catch {
    return null;
  }
}

function inferredConfidenceStatus(item) {
  if (item.confidenceStatus) return item.confidenceStatus;
  if (String(item.updated).includes("자동")) return "source_confirmed";
  if (String(item.updated).includes("공식 확인")) return "human_verified";
  if (String(item.updated).includes("후보") || String(item.updated).includes("리뷰")) return "stale";
  return "recheck";
}

function normalizeOuting(item) {
  const ageRange = ageRangeFromLabel(item.age);
  const latitude = Number(item.location?.lat);
  const longitude = Number(item.location?.lng);
  const notes = item.notes || {};
  const confidenceStatus = inferredConfidenceStatus(item);
  const city = safeText(item.city, "Bay Area", 100);
  const reservation = safeText(item.reservation, "공식 페이지 확인", 180);
  return {
    ...item,
    id: safeText(item.id, "unknown", 180),
    name: safeText(item.name, "이름을 확인 중인 장소", 180),
    type: outingTypes.has(item.type) ? item.type : "seasonal",
    setting: outingSettings.has(item.setting) ? item.setting : "indoor",
    timeLabel: safeText(item.timeLabel, "운영시간 확인", 120),
    city,
    region: regionForCity(city),
    distance: Number.isFinite(Number(item.distance)) ? Number(item.distance) : Number.POSITIVE_INFINITY,
    age: safeText(item.age, "가족", 80),
    minAgeMonths: Number.isFinite(item.minAgeMonths) ? item.minAgeMonths : ageRange.minAgeMonths,
    maxAgeMonths: Number.isFinite(item.maxAgeMonths) ? item.maxAgeMonths : ageRange.maxAgeMonths,
    price: outingPrices.has(item.price) ? item.price : "paid",
    reservation,
    reservationLevel: reservationLevel(reservation),
    source: safeSourceUrl(item.source),
    sourceName: safeText(item.sourceName, "공식 운영기관", 140),
    updated: safeText(item.updated, "확인 시각 없음", 120),
    why: safeText(item.why, "공식 페이지에서 세부 정보를 확인해 주세요.", 500),
    address: safeText(item.address, "", 220),
    notes: {
      parking: safeText(notes.parking, "공식 페이지에서 주차 정보를 확인하세요.", 300),
      bathroom: safeText(notes.bathroom, "공식 페이지에서 화장실 정보를 확인하세요.", 300),
      stroller: safeText(notes.stroller, "공식 페이지에서 유모차 동선을 확인하세요.", 300)
    },
    bathroomKnown: practicalNoteKnown(notes.bathroom),
    strollerKnown: practicalNoteKnown(notes.stroller),
    location: Number.isFinite(latitude) && Number.isFinite(longitude) ? { lat: latitude, lng: longitude } : null,
    confidenceStatus: confidenceStatuses.has(confidenceStatus) ? confidenceStatus : "recheck"
  };
}

const locationOptions = {
  "san-mateo": { name: "San Mateo", lat: 37.5630, lng: -122.3255 },
  "san-francisco": { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
  "palo-alto": { name: "Palo Alto", lat: 37.4419, lng: -122.1430 },
  "san-jose": { name: "San Jose", lat: 37.3382, lng: -121.8863 },
  oakland: { name: "Oakland", lat: 37.8044, lng: -122.2712 }
};

let storedLocationKey = "san-mateo";
try {
  const candidate = localStorage.getItem("little-weekends-location");
  if (candidate && locationOptions[candidate]) storedLocationKey = candidate;
} catch {
  storedLocationKey = "san-mateo";
}

const evergreenIds = new Set(["coyote-point", "curiodyssey", "palo-alto-junior"]);
const staticOutings = outings.map(normalizeOuting).filter((item) => {
  if (!item.startDate) return true;
  const fallbackEnd = new Date(item.startDate).getTime() + 90 * 60000;
  const endTime = item.endDate ? new Date(item.endDate).getTime() : fallbackEnd;
  return Number.isFinite(endTime) && endTime >= Date.now();
});
const catalogEvergreenOutings = Array.isArray(window.LITTLE_WEEKENDS_EVERGREEN)
  ? window.LITTLE_WEEKENDS_EVERGREEN.map(normalizeOuting)
  : [];
const evergreenOutings = [...staticOutings.filter((item) => evergreenIds.has(item.id)), ...catalogEvergreenOutings];
outings = [...staticOutings, ...catalogEvergreenOutings];

const mapBounds = {
  north: 38.2033,
  south: 37.1897,
  west: -122.6445,
  east: -121.5871
};

const state = {
  date: "today",
  distance: "25",
  region: "all",
  age: "toddler",
  type: "all",
  setting: "all",
  price: "all",
  time: "all",
  reservation: "all",
  bathroomKnown: false,
  strollerKnown: false,
  view: window.matchMedia("(min-width: 901px)").matches ? "split" : "list",
  sort: "recommended",
  mobileSection: "home",
  savedOnly: false,
  saved: new Set(),
  search: "",
  selectedId: null,
  locationKey: storedLocationKey
};

try {
  state.saved = new Set(JSON.parse(localStorage.getItem("little-weekends-saved") || "[]"));
} catch {
  state.saved = new Set();
}

const cardsEl = document.querySelector("#cards");
const mapEl = document.querySelector("#mapCanvas");
const summaryEl = document.querySelector("#resultSummary");
const summaryEyebrowEl = document.querySelector("#summaryEyebrow");
const summaryTitleEl = document.querySelector("#summaryTitle");
const syncStatusEl = document.querySelector("#syncStatus");
const contentGrid = document.querySelector("#contentGrid");
const detailDialog = document.querySelector("#detailDialog");
const detailBody = document.querySelector("#detailBody");
const locationDialog = document.querySelector("#locationDialog");

function persistSaved() {
  localStorage.setItem("little-weekends-saved", JSON.stringify([...state.saved]));
}

function trustStatus(item) {
  if (item.confidenceStatus === "human_verified") {
    return { key: "verified", icon: "✓", short: item.updated, detail: `${item.sourceName}의 공식 정보와 세부 내용을 사람이 확인했어요.` };
  }
  if (item.confidenceStatus === "source_confirmed") {
    return { key: "source-confirmed", icon: "✓", short: item.updated, detail: `${item.sourceName}의 공식 출처에서 자동으로 확인했어요. 일정 변경 가능성은 공식 페이지에서 최종 확인해 주세요.` };
  }
  if (item.confidenceStatus === "stale") {
    return { key: "stale", icon: "!", short: "정보가 오래되었어요", detail: "현재 정보가 충분히 확인되지 않았어요. 방문 전 공식 페이지를 확인해 주세요." };
  }
  return { key: "recheck", icon: "!", short: "방문 전 일정 확인", detail: `${item.sourceName}의 공식 페이지에서 운영 여부를 다시 확인해 주세요.` };
}

function selectedLocation() {
  return locationOptions[state.locationKey] || locationOptions["san-mateo"];
}

function distanceBetweenMiles(left, right) {
  const toRadians = (value) => value * Math.PI / 180;
  const earthRadiusMiles = 3958.8;
  const latitudeDelta = toRadians(right.lat - left.lat);
  const longitudeDelta = toRadians(right.lng - left.lng);
  const a = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(toRadians(left.lat)) * Math.cos(toRadians(right.lat)) * Math.sin(longitudeDelta / 2) ** 2;
  return earthRadiusMiles * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function distanceFor(item) {
  if (!item.location || !Number.isFinite(item.location.lat) || !Number.isFinite(item.location.lng)) return item.distance;
  return Math.round(distanceBetweenMiles(selectedLocation(), item.location) * 10) / 10;
}

const ageFilterRanges = {
  toddler: { min: 12, max: 47 },
  age1: { min: 12, max: 23 },
  age2: { min: 24, max: 35 },
  age3: { min: 36, max: 47 }
};

function ageMatches(item) {
  if (state.age === "all") return true;
  const range = ageFilterRanges[state.age] || ageFilterRanges.toddler;
  return item.minAgeMonths <= range.max && item.maxAgeMonths >= range.min;
}

function recommendationScore(item) {
  const toddlerRange = ageFilterRanges.toddler;
  const ageWidth = Math.max(0, item.maxAgeMonths - item.minAgeMonths);
  const fullyToddlerFocused = item.minAgeMonths >= toddlerRange.min && item.maxAgeMonths <= toddlerRange.max;
  let score = Math.max(0, 30 - distanceFor(item) * 1.25);

  score += fullyToddlerFocused ? 28 : ageWidth <= 36 ? 20 : ageWidth <= 72 ? 10 : 3;
  score += { human_verified: 18, source_confirmed: 12, recheck: 0, stale: -18 }[item.confidenceStatus] || 0;
  if (item.price === "free") score += 4;
  if (String(item.reservation).includes("불필요")) score += 4;

  if (item.startDate) {
    const hoursUntilStart = (new Date(item.startDate).getTime() - Date.now()) / 3600000;
    if (hoursUntilStart >= -1 && hoursUntilStart <= 6) score += 20;
    else if (hoursUntilStart > 6 && hoursUntilStart <= 24) score += 12;
    else if (hoursUntilStart < -1) score -= 20;
  } else {
    score += 6;
  }

  return score;
}

function diversifyRecommended(entries) {
  const firstOfSeries = [];
  const repeatedSeries = [];
  const seenSeries = new Set();

  entries.forEach((entry) => {
    const seriesKey = `${normalizeSearchText(entry.item.name)}|${normalizeSearchText(entry.item.city)}`;
    if (seenSeries.has(seriesKey)) repeatedSeries.push(entry);
    else {
      seenSeries.add(seriesKey);
      firstOfSeries.push(entry);
    }
  });

  return [...firstOfSeries, ...repeatedSeries];
}

function dateLabel() {
  return { today: "오늘", tomorrow: "내일", week: "이번 주", weekend: "이번 주말", nextweek: "다음 주", anytime: "언제든" }[state.date];
}

function nextWeekRangeLabel(includeSuffix = false) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date()).filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
  const today = new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), 12));
  const daysUntilMonday = today.getUTCDay() === 0 ? 1 : 8 - today.getUTCDay();
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() + daysUntilMonday);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 6);
  const startLabel = `${start.getUTCMonth() + 1}월 ${start.getUTCDate()}일`;
  const endLabel = start.getUTCMonth() === end.getUTCMonth() ? `${end.getUTCDate()}일` : `${end.getUTCMonth() + 1}월 ${end.getUTCDate()}일`;
  return `${startLabel}-${endLabel}${includeSuffix ? " 일정" : ""}`;
}

function syncTimeLabel(value) {
  if (!value) return "자동 업데이트 대기 중";
  return `${new Intl.DateTimeFormat("ko-KR", {
    timeZone: "America/Los_Angeles",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value))} 자동 확인`;
}

function activeFilterCount() {
  return Number(state.date !== "today")
    + Number(state.distance !== "25")
    + Number(state.region !== "all")
    + Number(state.age !== "toddler")
    + Number(state.type !== "all")
    + Number(state.setting !== "all")
    + Number(state.price !== "all")
    + Number(state.time !== "all")
    + Number(state.reservation !== "all")
    + Number(state.bathroomKnown)
    + Number(state.strollerKnown)
    + Number(Boolean(state.search));
}

let toastTimer;
function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

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
    storytime: "책",
    park: "공원",
    indoor: "실내",
    museum: "전시",
    seasonal: "행사"
  }[type] || "장소";
}

function itemImage(item) {
  const imageContext = `${item.name || ""} ${item.why || ""} ${item.sourceName || ""} ${item.source || ""}`.toLowerCase();

  if (/bubble|버블|discovery museum/.test(imageContext)) return "assets/photos/bubble-play.webp";
  if (/animal|wildlife|otter|reptile|turtle|bee|nature|curiodyssey|동물|자연/.test(imageContext)) {
    return "assets/photos/animal-encounter.webp";
  }
  if (/music|concert|dance|puppet|theater|theatre|performance|storyland|공연|음악|콘서트/.test(imageContext)) {
    return "assets/photos/family-music-performance.webp";
  }
  if (/maker|craft|art|steam|robot|lego|create|paint|print|만들기|공예|미술/.test(imageContext)) {
    return "assets/photos/maker-activity.webp";
  }
  if (item.type === "storytime") return "assets/photos/library-storytime.webp";
  if (item.type === "park") return "assets/photos/nature-playground.webp";
  if (item.type === "museum") return "assets/photos/bubble-play.webp";
  if (item.type === "indoor") return "assets/photos/maker-activity.webp";
  return "assets/photos/bay-family-hero.webp";
}

const searchAliasGroups = [
  ["storytime", "스토리타임", "스토리", "동화", "책읽기", "책", "이야기"],
  ["park", "공원", "놀이터", "야외놀이"],
  ["museum", "뮤지엄", "박물관", "과학관", "동물원", "zoo"],
  ["seasonal", "시즌", "특별행사", "이벤트", "행사", "공연"],
  ["indoor", "실내", "안", "inside"],
  ["outdoor", "야외", "바깥", "outside"],
  ["free", "무료", "공짜"],
  ["paid", "유료", "티켓"],
  ["toddler", "유아", "아이", "아기", "어린이", "키즈", "kids"],
  ["family", "가족", "패밀리"],
  ["san mateo", "sanmateo", "산마테오"],
  ["south san francisco", "southsf", "ssf", "사우스샌프란시스코", "사우스에스에프"],
  ["san francisco", "sf", "샌프란시스코"],
  ["palo alto", "paloalto", "팔로알토"],
  ["half moon bay", "halfmoonbay", "하프문베이"]
];

function normalizeSearchText(value) {
  return String(value || "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function searchAliases(token) {
  const group = searchAliasGroups.find((aliases) =>
    aliases.some((alias) => normalizeSearchText(alias) === token)
  );
  return group ? group.map(normalizeSearchText) : [token];
}

function editDistance(left, right) {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex];
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const substitutionCost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1;
      current[rightIndex] = Math.min(
        current[rightIndex - 1] + 1,
        previous[rightIndex] + 1,
        previous[rightIndex - 1] + substitutionCost
      );
    }
    previous.splice(0, previous.length, ...current);
  }

  return previous[right.length];
}

function fuzzyMatches(token, words) {
  const threshold = token.length >= 6 ? 2 : token.length >= 3 ? 1 : 0;
  if (!threshold) return false;

  return words.some((word) =>
    Math.abs(word.length - token.length) <= threshold && editDistance(token, word) <= threshold
  );
}

function searchFields(item) {
  const categoryText = [
    item.type,
    typeLabel(item.type),
    item.setting,
    item.setting === "indoor" ? "실내" : "야외",
    item.price,
    item.price === "free" ? "무료" : "유료",
    item.age
  ].join(" ");
  const detailText = [
    item.timeLabel,
    item.why,
    item.reservation,
    item.sourceName,
    ...Object.values(item.notes || {})
  ].join(" ");

  return [
    { text: normalizeSearchText(item.name), weight: 60 },
    { text: normalizeSearchText(item.city), weight: 45 },
    { text: normalizeSearchText(categoryText), weight: 30 },
    { text: normalizeSearchText(detailText), weight: 12 }
  ];
}

function searchScore(item, query) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return 0;

  const fields = searchFields(item);
  const allWords = fields.flatMap((field) => field.text.split(" ").filter(Boolean));
  const tokens = normalizedQuery.split(" ").filter(Boolean);
  let score = fields[0].text.includes(normalizedQuery) ? 100 : 0;

  for (const token of tokens) {
    const aliases = searchAliases(token);
    let tokenScore = 0;

    fields.forEach((field) => {
      if (aliases.some((alias) => field.text.includes(alias))) {
        tokenScore = Math.max(tokenScore, field.weight);
      }
    });

    if (!tokenScore && fuzzyMatches(token, allWords)) tokenScore = 6;
    if (!tokenScore) return -1;
    score += tokenScore;
  }

  return score;
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
  const originPoint = projectLocation(selectedLocation());
  return `
    <img class="bay-map-base" src="assets/bay-area-location-map.svg" alt="" aria-hidden="true" />
    <span class="current-location-marker" style="left: ${originPoint.x}%; top: ${originPoint.y}%;" title="${selectedLocation().name} 기준 위치" aria-label="${selectedLocation().name} 기준 위치"></span>
    <a
      class="map-attribution"
      href="https://commons.wikimedia.org/wiki/File:United_States_San_Francisco_Bay_Area_location_map.svg"
      target="_blank"
      rel="noopener noreferrer"
    >Map: NordNordWest, CC BY-SA 3.0</a>
  `;
}

function pacificDateKey(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  if (!Number.isFinite(date.getTime())) return "";
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date).filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function addDaysToDateKey(dateKey, days) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days, 12));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

function matchesDate(item) {
  if (state.date === "anytime") return true;
  if (state.date === "tomorrow") {
    if (!item.startDate) return item.dateBucket === "anytime";
    return pacificDateKey(item.startDate) === addDaysToDateKey(pacificDateKey(), 1);
  }
  if (state.date === "week") return item.dateBucket === "today" || item.dateBucket === "week" || item.dateBucket === "anytime";
  if (state.date === "weekend") return item.dateBucket === "weekend" || item.dateBucket === "anytime";
  if (state.date === "nextweek") return item.dateBucket === "nextweek";
  return item.dateBucket === "today" || item.dateBucket === "anytime";
}

function matchesTime(item) {
  if (state.time === "all" || !item.startDate) return true;
  const hour = Number(new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    hourCycle: "h23"
  }).format(new Date(item.startDate)));
  if (!Number.isFinite(hour)) return false;
  if (state.time === "morning") return hour < 12;
  if (state.time === "afternoon") return hour >= 12 && hour < 17;
  return hour >= 17;
}

function outingKindLabel(item) {
  if (!item.startDate) return "상시 장소";
  const itemDate = pacificDateKey(item.startDate);
  const today = pacificDateKey();
  if (itemDate === today) return "오늘 일정";
  if (itemDate === addDaysToDateKey(today, 1)) return "내일 일정";
  return "시간 지정 일정";
}

function recommendationReasons(item) {
  const reasons = [];
  const ageWidth = Math.max(0, item.maxAgeMonths - item.minAgeMonths);
  if (ageWidth <= 36 && item.minAgeMonths <= 36 && item.maxAgeMonths >= 23) reasons.push("유아 연령 집중");
  if (distanceFor(item) <= 5) reasons.push("5 mi 안쪽");
  if (item.price === "free") reasons.push("무료");
  if (item.reservationLevel === "none") reasons.push("예약 불필요");
  if (item.confidenceStatus === "human_verified") reasons.push("사람이 확인");
  if (item.setting === "indoor") reasons.push("실내");
  return reasons.slice(0, 2);
}

function filteredOutings() {
  let result = outings.map((item) => ({
    item,
    searchScore: searchScore(item, state.search),
    recommendationScore: recommendationScore(item)
  })).filter(({ item, searchScore: itemSearchScore }) => {
    const searchMatch = !state.search || itemSearchScore >= 0;
    const savedMatch = !state.savedOnly || state.saved.has(item.id);
    const distanceMatch = distanceFor(item) <= Number(state.distance);
    const regionMatch = state.region === "all" || item.region === state.region;
    const ageMatch = ageMatches(item);
    const typeMatch = state.type === "all" || item.type === state.type;
    const settingMatch = state.setting === "all" || item.setting === state.setting;
    const priceMatch = state.price === "all" || item.price === state.price;
    const reservationMatch = state.reservation === "all" || item.reservationLevel === state.reservation;
    const bathroomMatch = !state.bathroomKnown || item.bathroomKnown;
    const strollerMatch = !state.strollerKnown || item.strollerKnown;
    return searchMatch && savedMatch && matchesDate(item) && matchesTime(item) && distanceMatch && regionMatch && ageMatch && typeMatch && settingMatch && priceMatch && reservationMatch && bathroomMatch && strollerMatch;
  });

  if (state.sort === "recommended") {
    result = result.toSorted((a, b) => {
      const searchDifference = state.search ? b.searchScore - a.searchScore : 0;
      return searchDifference || b.recommendationScore - a.recommendationScore || distanceFor(a.item) - distanceFor(b.item);
    });
    result = diversifyRecommended(result);
  }

  if (state.sort === "nearest") {
    result = result.toSorted((a, b) => distanceFor(a.item) - distanceFor(b.item));
  }

  if (state.sort === "soonest") {
    const order = { today: 0, week: 1, weekend: 2, nextweek: 3, anytime: 4 };
    result = result.toSorted((a, b) => {
      if (a.item.startDate && b.item.startDate) return new Date(a.item.startDate) - new Date(b.item.startDate);
      return order[a.item.dateBucket] - order[b.item.dateBucket];
    });
  }

  return result.map(({ item }) => item);
}

function renderCards(items) {
  cardsEl.innerHTML = "";

  if (!items.length) {
    const expandDistanceAction = state.distance !== "25" ? '<button class="primary-action" type="button" id="emptyExpandDistance">25 mi로 넓히기</button>' : "";
    const includeAnytimeAction = state.date !== "anytime" ? '<button class="secondary-action" type="button" id="emptyIncludeAnytime">상시 장소 함께 보기</button>' : "";
    cardsEl.innerHTML = `<div class="empty-state"><strong>이 조건에 맞는 후보가 아직 없어요.</strong><p>중요한 조건은 남기고 탐색 범위만 넓혀 보세요.</p><div class="empty-actions">${expandDistanceAction}${includeAnytimeAction}<button class="secondary-action" type="button" id="emptyReset">조건 초기화</button></div></div>`;
    cardsEl.querySelector("#emptyExpandDistance")?.addEventListener("click", () => {
      state.distance = "25";
      document.querySelector("#distanceFilter").value = "25";
      render();
    });
    cardsEl.querySelector("#emptyIncludeAnytime")?.addEventListener("click", () => {
      state.date = "anytime";
      document.querySelector("#dateFilter").value = "anytime";
      render();
    });
    cardsEl.querySelector("#emptyReset").addEventListener("click", resetFilters);
    return;
  }

  items.forEach((item) => {
    const trust = trustStatus(item);
    const distance = distanceFor(item);
    const reasons = recommendationReasons(item);
    const reasonMarkup = reasons.map((reason) => `<span>${escapeHtml(reason)}</span>`).join("");
    const card = document.createElement("article");
    card.className = `outing-card${state.selectedId === item.id ? " is-selected" : ""}`;
    card.innerHTML = `
      <button class="card-open" type="button" aria-label="${escapeHtml(item.name)} 상세 보기"></button>
      <span class="card-image" aria-hidden="true"><img src="${itemImage(item)}" alt="" loading="lazy" /></span>
      <span class="card-content">
        <span class="time-row"><span class="schedule-label"><span class="outing-kind">${escapeHtml(outingKindLabel(item))}</span><span class="card-time">${escapeHtml(item.timeLabel)}</span></span><button class="heart ${state.saved.has(item.id) ? "is-saved" : ""}" data-save-card="${escapeHtml(item.id)}" type="button" aria-label="${state.saved.has(item.id) ? "저장 해제" : "저장"}" aria-pressed="${state.saved.has(item.id)}">${state.saved.has(item.id) ? "저장됨" : "저장"}</button></span>
        <h3>${escapeHtml(item.name)}</h3>
        <span class="card-place"><span>${escapeHtml(item.city)}</span><span>${distance.toFixed(1)} mi</span><span>${escapeHtml(typeLabel(item.type))}</span></span>
        <span class="essentials"><span class="essential"><small>연령</small>${escapeHtml(item.age)}</span><span class="essential"><small>환경</small>${item.setting === "indoor" ? "실내" : "야외"}</span><span class="essential"><small>비용</small>${item.price === "free" ? "무료" : "유료"}</span><span class="essential"><small>예약</small>${escapeHtml(item.reservation)}</span></span>
        <span class="recommendation-cues" aria-label="추천 이유">${reasonMarkup}</span>
        <p class="why">${escapeHtml(item.why)}</p>
        <span class="trust ${trust.key}">${escapeHtml(trust.short)}</span>
      </span>
    `;
    card.querySelector(".card-open").addEventListener("click", () => {
      state.selectedId = item.id;
      openDetail(item.id);
      render();
    });
    const saveControl = card.querySelector("[data-save-card]");
    const saveFromCard = (event) => { event.preventDefault(); toggleSaved(item.id); };
    saveControl.addEventListener("click", saveFromCard);
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

  items.filter((item) => item.location).forEach((item) => {
    const point = projectPin(item);
    const pin = document.createElement("button");
    pin.className = `map-pin ${item.type}${state.selectedId === item.id ? " is-selected" : ""}`;
    pin.type = "button";
    pin.style.left = `${point.x}%`;
    pin.style.top = `${point.y}%`;
    pin.title = item.name;
    pin.setAttribute("aria-label", `${item.name}, ${item.city}`);
    pin.innerHTML = `<span>${typeInitial(item.type)}</span>`;
    pin.addEventListener("click", () => selectMapItem(item.id));
    mapEl.append(pin);
  });
}

function selectMapItem(id) {
  state.selectedId = id;
  const item = outings.find((outing) => outing.id === id);
  const preview = document.querySelector("#mapPreview");
  const trust = trustStatus(item);
  const distance = distanceFor(item);
  preview.hidden = false;
  preview.innerHTML = `<button type="button" aria-label="${escapeHtml(item.name)} 상세 보기"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.timeLabel)}, ${distance.toFixed(1)} mi<br />${escapeHtml(trust.short)}</span></button>`;
  preview.querySelector("button").addEventListener("click", () => openDetail(id));
  renderMap(filteredOutings());
}

function render() {
  const items = filteredOutings();
  const summaries = {
    today: ["오늘의 추천", "낮잠 전에 다녀오기 좋은 가까운 곳"],
    tomorrow: ["내일의 추천", "내일 일정과 언제든 갈 수 있는 곳"],
    week: ["이번 주 추천", "평일 루틴에 넣기 좋은 곳"],
    weekend: ["이번 주말 추천", "가족이 함께 다녀오기 좋은 곳"],
    nextweek: [nextWeekRangeLabel(), "다음 주에 열리는 유아 친화 행사"],
    anytime: ["전체 추천", "날짜에 구애받지 않고 가볼 만한 곳"]
  };
  const [eyebrow, title] = summaries[state.date];
  summaryEyebrowEl.textContent = eyebrow;
  summaryTitleEl.textContent = title;
  summaryEl.textContent = `${items.length}개 후보를 찾았어요.`;
  document.querySelector("#filterResultCount").textContent = items.length;
  document.querySelector("#filterCount").textContent = activeFilterCount();
  document.querySelector("#savedCount").textContent = state.saved.size;
  document.querySelector("#mobileSavedCount").textContent = state.saved.size;
  document.querySelector("#locationName").textContent = selectedLocation().name;
  document.querySelector("#mapLocationLabel").textContent = `${selectedLocation().name} 중심`;
  const contextParts = [state.savedOnly ? "저장한 곳" : `${selectedLocation().name} 중심`, dateLabel()];
  if (state.region !== "all") contextParts.push(regionLabels[state.region]);
  if (state.time !== "all") contextParts.push({ morning: "오전", afternoon: "오후", evening: "저녁" }[state.time]);
  document.querySelector("#listContext").textContent = contextParts.join(" · ");
  document.querySelectorAll("[data-location-key]").forEach((button) => {
    const active = button.dataset.locationKey === state.locationKey;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelector("#saveToggle").classList.toggle("is-active", state.savedOnly);
  document.querySelector("#saveToggle").setAttribute("aria-pressed", state.savedOnly);
  contentGrid.className = `content-grid is-${state.view}`;
  document.querySelectorAll("[data-view]").forEach((button) => {
    const active = button.dataset.view === state.view;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll("[data-mobile-action]").forEach((button) => {
    const active = button.dataset.mobileAction === state.mobileSection;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderCards(items);
  renderMap(items);
}

async function loadAutomaticOutings() {
  syncStatusEl.textContent = "공식 도서관 일정 확인 중";
  document.querySelector("#nextWeekRange").textContent = nextWeekRangeLabel(true);
  try {
    const response = await fetch("/api/outings", { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("자동 일정 API를 불러오지 못했어요.");
    const payload = await response.json();
    if (!Array.isArray(payload.events) || !payload.events.length) throw new Error("새 일정이 아직 준비되지 않았어요.");
    outings = [...evergreenOutings, ...payload.events.map(normalizeOuting)];
    const activeSources = Number(payload.currentSourceCount || 0);
    const sourceCount = Number(payload.sourceCount || (Array.isArray(payload.sources) ? payload.sources.length : 0));
    syncStatusEl.textContent = payload.status === "ok"
      ? `${syncTimeLabel(payload.lastSyncedAt)} · 공식 수집처 ${activeSources}곳`
      : `일부 출처 갱신 지연 · 현재 ${activeSources}/${sourceCount}곳 반영`;
    render();
  } catch {
    outings = [...staticOutings, ...catalogEvergreenOutings];
    syncStatusEl.textContent = "자동 확인 지연 · 기존 확인 목록 표시 중";
    render();
  }
}

function toggleSaved(id) {
  const item = outings.find((outing) => outing.id === id);
  if (state.saved.has(id)) {
    state.saved.delete(id);
    showToast(`${item.name} 저장을 해제했어요.`);
  } else {
    state.saved.add(id);
    showToast(`${item.name}을 저장했어요.`);
  }
  persistSaved();
  render();
}

function nearbyAlternatives(item) {
  const seenSeries = new Set([`${normalizeSearchText(item.name)}|${normalizeSearchText(item.city)}`]);
  return outings
    .filter((candidate) => {
      if (candidate.id === item.id || candidate.minAgeMonths > 47 || candidate.maxAgeMonths < 12) return false;
      const seriesKey = `${normalizeSearchText(candidate.name)}|${normalizeSearchText(candidate.city)}`;
      if (seenSeries.has(seriesKey)) return false;
      seenSeries.add(seriesKey);
      return true;
    })
    .toSorted((left, right) => {
      const locationDifference = distanceBetweenMiles(item.location || selectedLocation(), left.location || selectedLocation())
        - distanceBetweenMiles(item.location || selectedLocation(), right.location || selectedLocation());
      return locationDifference || recommendationScore(right) - recommendationScore(left);
    })
    .slice(0, 3);
}

async function shareOuting(item) {
  const shareUrl = `${window.location.origin}${window.location.pathname}`;
  const shareData = {
    title: item.name,
    text: `${item.name} · ${item.timeLabel} · ${item.city}`,
    url: shareUrl
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    await navigator.clipboard.writeText(`${shareData.text}\n${shareUrl}`);
    showToast("나들이 정보와 링크를 복사했어요.");
  } catch (error) {
    if (error?.name !== "AbortError") showToast("공유하지 못했어요. 잠시 후 다시 시도해 주세요.");
  }
}

function openDetail(id) {
  const item = outings.find((outing) => outing.id === id);
  if (!item) return;

  const isSaved = state.saved.has(id);
  const trust = trustStatus(item);
  const distance = distanceFor(item);
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address || `${item.name}, ${item.city}, CA`)}`;
  const sourceAction = item.source
    ? `<a class="primary-action" href="${escapeHtml(item.source)}" target="_blank" rel="noopener noreferrer">${trust.key === "verified" || trust.key === "source-confirmed" ? "공식 정보 보기" : "공식 일정 확인"}</a>`
    : "";
  const alternatives = nearbyAlternatives(item);
  const alternativesMarkup = alternatives.map((alternative) => {
    const nearbyDistance = alternative.location && item.location ? distanceBetweenMiles(item.location, alternative.location) : distanceFor(alternative);
    return `<button class="alternative-button" data-alternative-id="${escapeHtml(alternative.id)}" type="button"><span><strong>${escapeHtml(alternative.name)}</strong><small>${escapeHtml(alternative.city)} · ${nearbyDistance.toFixed(1)} mi</small></span><b>보기</b></button>`;
  }).join("");
  detailBody.innerHTML = `
    <figure class="detail-visual"><img src="${itemImage(item)}" alt="" /><figcaption>장소 이해를 돕는 분위기 참고 이미지입니다.</figcaption></figure>
    <article class="detail-body">
      <div class="detail-title"><p class="detail-category">${escapeHtml(typeLabel(item.type))}, ${escapeHtml(item.city)}</p><h2>${escapeHtml(item.name)}</h2><p>${escapeHtml(item.why)}</p></div>
      <div class="decision-grid">
        <div class="decision-item"><small>언제</small><strong>${escapeHtml(item.timeLabel)}</strong></div><div class="decision-item"><small>거리</small><strong>${distance.toFixed(1)} mi</strong></div><div class="decision-item"><small>연령</small><strong>${escapeHtml(item.age)}</strong></div><div class="decision-item"><small>환경</small><strong>${item.setting === "indoor" ? "실내" : "야외"}</strong></div><div class="decision-item"><small>비용</small><strong>${item.price === "free" ? "무료" : "유료"}</strong></div><div class="decision-item"><small>예약</small><strong>${escapeHtml(item.reservation)}</strong></div>
      </div>
      <div class="trust-panel ${trust.key}"><strong>${escapeHtml(trust.short)}</strong><span>${escapeHtml(trust.detail)}</span></div>
      <div class="detail-notes">
        <div class="note-row"><strong>주차</strong><span>${escapeHtml(item.notes.parking)}</span></div><div class="note-row"><strong>화장실</strong><span>${escapeHtml(item.notes.bathroom)}</span></div><div class="note-row"><strong>유모차</strong><span>${escapeHtml(item.notes.stroller)}</span></div><div class="note-row"><strong>예상 체류</strong><span>${item.type === "storytime" ? "30-60분" : "60-90분"} 정도를 추천해요.</span></div><div class="note-row"><strong>날씨 대응</strong><span>${item.setting === "indoor" ? "실내 활동이라 비 오는 날에도 좋아요." : "출발 전 기온과 공원 운영 상태를 확인하세요."}</span></div>
      </div>
      <section class="nearby-alternatives" aria-labelledby="nearbyTitle"><h3 id="nearbyTitle">가까운 대안</h3><div class="alternative-list">${alternativesMarkup}</div></section>
      <div class="detail-actions">
        ${sourceAction}<a class="secondary-action" href="${escapeHtml(directions)}" target="_blank" rel="noopener noreferrer">길찾기</a><button class="secondary-action" type="button" id="shareDetail">공유</button><button class="secondary-action" type="button" id="saveDetail">${isSaved ? "저장됨" : "저장"}</button>
      </div>
    </article>
  `;

  detailBody.querySelector("#saveDetail").addEventListener("click", () => { toggleSaved(id); openDetail(id); });
  detailBody.querySelector("#shareDetail").addEventListener("click", () => shareOuting(item));
  detailBody.querySelectorAll("[data-alternative-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedId = button.dataset.alternativeId;
      openDetail(button.dataset.alternativeId);
      render();
    });
  });

  if (!detailDialog.open) detailDialog.showModal();
}

document.querySelectorAll("[data-date]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".quick-card").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    state.date = button.dataset.date;
    if (state.date === "nextweek") {
      state.savedOnly = false;
      state.distance = "25";
      state.region = "all";
      state.type = "all";
      state.setting = "all";
      state.price = "all";
      state.time = "all";
      state.reservation = "all";
      state.bathroomKnown = false;
      state.strollerKnown = false;
      state.search = "";
      state.sort = "soonest";
      state.view = "list";
      state.mobileSection = "home";
      document.querySelector("#distanceFilter").value = "25";
      document.querySelector("#regionFilter").value = "all";
      document.querySelector("#typeFilter").value = "all";
      document.querySelector("#settingFilter").value = "all";
      document.querySelector("#priceFilter").value = "all";
      document.querySelector("#timeFilter").value = "all";
      document.querySelector("#reservationFilter").value = "all";
      document.querySelector("#bathroomFilter").checked = false;
      document.querySelector("#strollerFilter").checked = false;
      document.querySelector("#sortSelect").value = "soonest";
      document.querySelector("#searchInput").value = "";
    }
    document.querySelector("#dateFilter").value = state.date;
    render();
  });
});

document.querySelectorAll("[data-setting], [data-price], [data-distance]").forEach((button) => {
  button.addEventListener("click", () => {
    const [key] = ["setting", "price", "distance"].filter((name) => button.dataset[name]);
    document.querySelectorAll(".quick-card").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    state[key] = button.dataset[key];
    document.querySelector(`#${key}Filter`).value = state[key];
    render();
  });
});

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-view]").forEach((item) => item.classList.remove("is-active"));
    document.querySelectorAll("[data-view]").forEach((item) => item.setAttribute("aria-pressed", "false"));
    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");
    state.view = button.dataset.view;
    state.mobileSection = button.dataset.view === "map" ? "map" : "home";
    render();
  });
});

document.querySelectorAll("[data-mobile-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.mobileAction;
    if (action === "home") {
      state.savedOnly = false;
      state.view = "list";
      state.mobileSection = "home";
      render();
      document.querySelector("#discover").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (action === "search") {
      state.mobileSection = "search";
      render();
      const panel = document.querySelector("#searchPanel");
      panel.hidden = false;
      document.querySelector("#searchToggle").setAttribute("aria-expanded", "true");
      document.querySelector("#discover").scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => document.querySelector("#searchInput").focus(), 350);
      return;
    }
    state.savedOnly = true;
    state.view = "list";
    state.mobileSection = "saved";
    render();
    document.querySelector("#cards").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelector("#dateFilter").addEventListener("change", (event) => { state.date = event.target.value; render(); });

document.querySelector("#distanceFilter").addEventListener("change", (event) => {
  state.distance = event.target.value;
  render();
});

document.querySelector("#regionFilter").addEventListener("change", (event) => {
  state.region = event.target.value;
  render();
});

document.querySelector("#ageFilter").addEventListener("change", (event) => {
  state.age = event.target.value;
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

document.querySelector("#timeFilter").addEventListener("change", (event) => {
  state.time = event.target.value;
  render();
});

document.querySelector("#reservationFilter").addEventListener("change", (event) => {
  state.reservation = event.target.value;
  render();
});

document.querySelector("#bathroomFilter").addEventListener("change", (event) => {
  state.bathroomKnown = event.target.checked;
  render();
});

document.querySelector("#strollerFilter").addEventListener("change", (event) => {
  state.strollerKnown = event.target.checked;
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
  state.mobileSection = state.savedOnly ? "saved" : "home";
  render();
});

function resetFilters() {
  state.savedOnly = false;
  state.mobileSection = "home";
  state.date = "today";
  state.distance = "25";
  state.region = "all";
  state.age = "toddler";
  state.type = "all";
  state.setting = "all";
  state.price = "all";
  state.time = "all";
  state.reservation = "all";
  state.bathroomKnown = false;
  state.strollerKnown = false;
  state.search = "";
  document.querySelector("#dateFilter").value = "today";
  document.querySelector("#distanceFilter").value = "25";
  document.querySelector("#regionFilter").value = "all";
  document.querySelector("#ageFilter").value = "toddler";
  document.querySelector("#typeFilter").value = "all";
  document.querySelector("#settingFilter").value = "all";
  document.querySelector("#priceFilter").value = "all";
  document.querySelector("#timeFilter").value = "all";
  document.querySelector("#reservationFilter").value = "all";
  document.querySelector("#bathroomFilter").checked = false;
  document.querySelector("#strollerFilter").checked = false;
  document.querySelector("#searchInput").value = "";
  document.querySelectorAll(".quick-card").forEach((item) => item.classList.toggle("is-active", item.dataset.date === "today"));
  render();
}

document.querySelector("#resetFilters").addEventListener("click", resetFilters);
document.querySelector("#filterButton").addEventListener("click", () => { const panel = document.querySelector("#filterPanel"); panel.hidden = !panel.hidden; document.querySelector("#filterButton").setAttribute("aria-expanded", String(!panel.hidden)); });
document.querySelector("#closeFilters").addEventListener("click", () => { document.querySelector("#filterPanel").hidden = true; document.querySelector("#filterButton").setAttribute("aria-expanded", "false"); });
document.querySelector("#applyFilters").addEventListener("click", () => { document.querySelector("#filterPanel").hidden = true; document.querySelector("#filterButton").setAttribute("aria-expanded", "false"); document.querySelector("#cards").scrollIntoView({ behavior: "smooth", block: "start" }); });
document.querySelector("#searchToggle").addEventListener("click", () => { const panel = document.querySelector("#searchPanel"); panel.hidden = !panel.hidden; state.mobileSection = panel.hidden ? "home" : "search"; document.querySelector("#searchToggle").setAttribute("aria-expanded", String(!panel.hidden)); render(); if (!panel.hidden) document.querySelector("#searchInput").focus(); });

document.querySelector("#locationButton").addEventListener("click", () => {
  if (!locationDialog.open) locationDialog.showModal();
});

document.querySelectorAll("[data-location-key]").forEach((button) => {
  button.addEventListener("click", () => {
    state.locationKey = button.dataset.locationKey;
    state.selectedId = null;
    try {
      localStorage.setItem("little-weekends-location", state.locationKey);
    } catch {
      // The selected location still applies for the current session.
    }
    locationDialog.close();
    showToast(`${selectedLocation().name} 기준으로 거리를 다시 계산했어요.`);
    render();
  });
});

document.querySelector("#closeLocationDialog").addEventListener("click", () => locationDialog.close());
locationDialog.addEventListener("click", (event) => { if (event.target === locationDialog) locationDialog.close(); });

document.querySelector("#closeDialog").addEventListener("click", () => {
  detailDialog.close();
});

detailDialog.addEventListener("click", (event) => { if (event.target === detailDialog) detailDialog.close(); });

render();
loadAutomaticOutings();
