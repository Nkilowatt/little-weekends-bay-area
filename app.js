let outings = [
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
    timeLabel: "운영시간 확인",
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
    why: "2-5세 구역이 따로 있는 성과 용을 본뜬 테마 놀이터라 어린아이와 움직이기 좋아요.",
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
    timeLabel: "운영시간 확인",
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

  const compactMonthRange = value.match(/(\d+)-(\d+)개월/);
  if (compactMonthRange) return { minAgeMonths: Number(compactMonthRange[1]), maxAgeMonths: Number(compactMonthRange[2]) };

  const mixedRange = value.match(/(\d+)개월-(\d+)세/);
  if (mixedRange) return { minAgeMonths: Number(mixedRange[1]), maxAgeMonths: (Number(mixedRange[2]) + 1) * 12 - 1 };

  const yearRange = value.match(/(\d+)-(\d+)세/);
  if (yearRange) return { minAgeMonths: Number(yearRange[1]) * 12, maxAgeMonths: (Number(yearRange[2]) + 1) * 12 - 1 };

  if (/가족|전연령/.test(value)) return { minAgeMonths: 0, maxAgeMonths: 216 };
  return { minAgeMonths: 0, maxAgeMonths: 83 };
}

const officialSourceHosts = new Set([
  "alamedaca.gov",
  "bayareadiscoverymuseum.org",
  "belmont.gov",
  "berkeleyca.gov",
  "bibliocommons.com",
  "burlingame.org",
  "campbellca.gov",
  "cdm.org",
  "ci.millbrae.ca.us",
  "cityoflarkspur.org",
  "cityofpaloalto.org",
  "cityofsanmateo.org",
  "cityofsancarlos.org",
  "creativity.org",
  "curiodyssey.org",
  "cupertino.gov",
  "dalycity.org",
  "ebparks.org",
  "fairyland.org",
  "fostercity.org",
  "gateway.bibliocommons.com",
  "grpg.org",
  "happyhollow.org",
  "hiller.org",
  "lawrencehallofscience.org",
  "libcal.com",
  "lindsaywildlife.org",
  "losgatosca.gov",
  "marincounty.gov",
  "menlopark.gov",
  "mountainview.gov",
  "oaklandca.gov",
  "oaklandzoo.org",
  "paloalto.gov",
  "paloaltozoo.org",
  "presidio.gov",
  "randallmuseum.org",
  "redwoodcity.org",
  "sanjoseca.gov",
  "santaclaracounty.gov",
  "santaclaraca.gov",
  "sccld.org",
  "sclibrary.org",
  "sfpl.org",
  "sfrecpark.org",
  "sfzoo.org",
  "smcgov.org",
  "smcl.org",
  "ssfca.gov",
  "ssf.net",
  "sunnyvale.ca.gov",
  "traintown.com",
  "visithalfmoonbay.org"
]);
const outingTypes = new Set(["storytime", "park", "indoor", "museum", "seasonal"]);
const outingSettings = new Set(["indoor", "outdoor"]);
const outingPrices = new Set(["free", "paid", "check"]);
const confidenceStatuses = new Set(["human_verified", "source_confirmed", "date_confirmed", "recurring_estimate", "recheck", "stale"]);
const imageMetadataHosts = new Set(["commons.wikimedia.org", "creativecommons.org"]);
const regionLabels = {
  sf: "San Francisco",
  peninsula: "Peninsula",
  "south-bay": "South Bay",
  "east-bay": "East Bay",
  "north-bay": "North Bay"
};

function regionForCity(city) {
  const normalizedCity = String(city || "").toLowerCase();
  if (["san mateo", "south san francisco", "san carlos", "palo alto", "menlo park", "half moon bay", "redwood city", "burlingame", "belmont", "foster city", "millbrae", "daly city"].some((name) => normalizedCity.includes(name))) return "peninsula";
  if (normalizedCity.includes("san francisco")) return "sf";
  if (["san jose", "cupertino", "santa clara", "sunnyvale", "mountain view", "campbell", "los gatos", "milpitas"].some((name) => normalizedCity.includes(name))) return "south-bay";
  if (["oakland", "berkeley", "walnut creek", "fremont", "hayward", "alameda", "concord", "pleasanton", "richmond"].some((name) => normalizedCity.includes(name))) return "east-bay";
  if (["sausalito", "sonoma", "marin", "novato", "san rafael", "napa", "petaluma", "greenbrae", "larkspur"].some((name) => normalizedCity.includes(name))) return "north-bay";
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

function normalizedAmenity(value, legacyText) {
  const suppliedStatus = value?.status === "confirmed" ? "confirmed" : value?.status === "unknown" ? "unknown" : null;
  const legacyKnown = practicalNoteKnown(legacyText);
  const status = suppliedStatus || (legacyKnown ? "confirmed" : "unknown");
  const text = status === "confirmed"
    ? safeText(value?.text, safeText(legacyText, "확인됨", 300), 300)
    : "확인되지 않음";
  return { status, text };
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

function safeImageMetadataUrl(value) {
  try {
    const url = new URL(String(value || ""));
    const hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    return url.protocol === "https:" && imageMetadataHosts.has(hostname) ? url.href : null;
  } catch {
    return null;
  }
}

function placeImageLookupKey(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9가-힣]+/g, " ")
    .trim();
}

function stablePlaceHash(value) {
  let hash = 2166136261;
  for (const character of String(value || "")) {
    hash ^= character.codePointAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36).padStart(7, "0");
}

function outingPlaceKey(item, venueName = "", address = "", city = "") {
  const supplied = String(item?.placeKey || "");
  if (/^[a-z0-9][a-z0-9-]{2,219}$/i.test(supplied)) return supplied;
  if (!item?.startDate && /^[a-z0-9][a-z0-9-]{2,219}$/i.test(String(item?.id || ""))) return String(item.id);
  const venue = placeImageLookupKey(venueName || item?.venueName);
  const locationAddress = placeImageLookupKey(address || item?.address);
  const locationCity = placeImageLookupKey(city || item?.city);
  if (!locationCity || (!venue && !locationAddress)) return null;
  return `venue-${stablePlaceHash(`${venue}|${locationAddress}|${locationCity}`)}`;
}

const placeImageRegistry = window.LITTLE_WEEKENDS_PLACE_IMAGES
  && typeof window.LITTLE_WEEKENDS_PLACE_IMAGES === "object"
  ? window.LITTLE_WEEKENDS_PLACE_IMAGES
  : {};
const placeImageAliases = new Map();
const communityPhotosByPlaceKey = new Map();
const requestedCommunityPlaceKeys = new Set();
let photoUploadStatusPromise = null;

Object.entries(placeImageRegistry).forEach(([id, image]) => {
  [id, ...(Array.isArray(image.aliases) ? image.aliases : [])].forEach((alias) => {
    const key = placeImageLookupKey(alias);
    if (key && !placeImageAliases.has(key)) placeImageAliases.set(key, image);
  });
});

function registeredPlaceImage(item) {
  const directMatch = placeImageRegistry[String(item?.id || "")];
  if (directMatch) return directMatch;

  const aliases = [item?.venueName, item?.name, item?.sourceName];
  for (const alias of aliases) {
    const match = placeImageAliases.get(placeImageLookupKey(alias));
    if (match) return match;
  }
  return null;
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
  const address = safeText(item.address, "", 220);
  const venueName = safeText(item.venueName, !item.startDate && address ? item.name : "", 180);
  const placeKey = outingPlaceKey(item, venueName, address, city);
  const reservation = safeText(item.reservation, "공식 페이지 확인", 180);
  const rawAgeEvidence = item.ageEvidence && typeof item.ageEvidence === "object" ? item.ageEvidence : {};
  const evidenceUrl = safeSourceUrl(rawAgeEvidence.url || item.source);
  const ageEvidence = evidenceUrl ? {
    url: evidenceUrl,
    basis: safeText(rawAgeEvidence.basis, item.startDate ? "official_program" : "editorial_review", 60),
    summary: safeText(rawAgeEvidence.summary, "공식 기관 정보와 가족 대상 시설 설명을 바탕으로 연령 범위를 검토했어요.", 220),
    verifiedAt: /^\d{4}-\d{2}-\d{2}$/.test(String(rawAgeEvidence.verifiedAt || item.lastReviewedAt || ""))
      ? String(rawAgeEvidence.verifiedAt || item.lastReviewedAt)
      : ""
  } : null;
  const placeFeatures = Array.isArray(item.placeFeatures)
    ? [...new Set(item.placeFeatures.map((feature) => safeText(feature, "", 40)).filter(Boolean))].slice(0, 5)
    : [];
  const rawAmenities = item.amenities || {};
  const amenities = {
    parking: normalizedAmenity(rawAmenities.parking, notes.parking),
    bathroom: normalizedAmenity(rawAmenities.bathroom, notes.bathroom),
    stroller: normalizedAmenity(rawAmenities.stroller, notes.stroller),
    changingTable: normalizedAmenity(rawAmenities.changingTable, notes.changingTable)
  };
  const candidateImage = item.image || {};
  const suppliedImage = /^assets\/(?:photos|places)\/[a-z0-9-]+\.(?:webp|jpe?g)$/i.test(String(candidateImage.src || ""))
    ? candidateImage
    : registeredPlaceImage(item) || {};
  const imageSrc = /^assets\/(?:photos|places)\/[a-z0-9-]+\.(?:webp|jpe?g)$/i.test(String(suppliedImage.src || ""))
    ? suppliedImage.src
    : "";
  return {
    ...item,
    id: safeText(item.id, "unknown", 180),
    placeKey,
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
    placeFeatures,
    source: safeSourceUrl(item.source),
    sourceName: safeText(item.sourceName, "공식 운영기관", 140),
    updated: safeText(item.updated, "확인 시각 없음", 120),
    ageEvidence,
    why: safeText(item.why, "공식 페이지에서 세부 정보를 확인해 주세요.", 500),
    venueName,
    address,
    notes: {
      parking: amenities.parking.text,
      bathroom: amenities.bathroom.text,
      stroller: amenities.stroller.text,
      changingTable: amenities.changingTable.text
    },
    amenities,
    image: imageSrc ? {
      src: imageSrc,
      kind: suppliedImage.kind === "actual" ? "actual" : "context",
      alt: safeText(suppliedImage.alt, "", 180),
      creator: safeText(suppliedImage.creator, "", 120),
      credit: safeText(suppliedImage.credit, "", 180),
      license: safeText(suppliedImage.license, "", 80),
      licenseUrl: safeImageMetadataUrl(suppliedImage.licenseUrl),
      sourceUrl: safeImageMetadataUrl(suppliedImage.sourceUrl),
      verifiedAt: /^\d{4}-\d{2}-\d{2}$/.test(String(suppliedImage.verifiedAt || ""))
        ? suppliedImage.verifiedAt
        : ""
    } : null,
    bathroomKnown: amenities.bathroom.status === "confirmed",
    strollerKnown: amenities.stroller.status === "confirmed",
    location: Number.isFinite(latitude) && Number.isFinite(longitude) ? { lat: latitude, lng: longitude } : null,
    confidenceStatus: confidenceStatuses.has(confidenceStatus) ? confidenceStatus : "recheck"
  };
}

const locationOptions = {
  "san-mateo": { name: "San Mateo", lat: 37.5630, lng: -122.3255 },
  "redwood-city": { name: "Redwood City", lat: 37.4852, lng: -122.2364 },
  "san-francisco": { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
  "palo-alto": { name: "Palo Alto", lat: 37.4419, lng: -122.1430 },
  "menlo-park": { name: "Menlo Park", lat: 37.4530, lng: -122.1817 },
  "mountain-view": { name: "Mountain View", lat: 37.3861, lng: -122.0839 },
  sunnyvale: { name: "Sunnyvale", lat: 37.3688, lng: -122.0363 },
  cupertino: { name: "Cupertino", lat: 37.3230, lng: -122.0322 },
  "santa-clara": { name: "Santa Clara", lat: 37.3541, lng: -121.9552 },
  campbell: { name: "Campbell", lat: 37.2872, lng: -121.9500 },
  "los-gatos": { name: "Los Gatos", lat: 37.2358, lng: -121.9624 },
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
const catalogPlaceIds = new Set(catalogEvergreenOutings.map((item) => item.id));
const catalogPlaceIdByNameCity = new Map();
const catalogPlaceIdByAddress = new Map();

catalogEvergreenOutings.forEach((item) => {
  const nameKey = `${placeImageLookupKey(item.name)}|${placeImageLookupKey(item.city)}`;
  const addressKey = placeImageLookupKey(item.address);
  if (nameKey !== "|" && !catalogPlaceIdByNameCity.has(nameKey)) catalogPlaceIdByNameCity.set(nameKey, item.id);
  if (addressKey && !catalogPlaceIdByAddress.has(addressKey)) catalogPlaceIdByAddress.set(addressKey, item.id);
});

function remotePlaceIdFor(item) {
  if (catalogPlaceIds.has(item?.id)) return item.id;
  const cityKey = placeImageLookupKey(item?.city);
  for (const name of [item?.venueName, item?.name]) {
    const match = catalogPlaceIdByNameCity.get(`${placeImageLookupKey(name)}|${cityKey}`);
    if (match) return match;
  }
  return catalogPlaceIdByAddress.get(placeImageLookupKey(item?.address)) || null;
}

const placeImageRequests = new Map();
const unavailablePlaceImages = new Set();
let placeImageProviderStatusPromise = null;
const remotePlaceImageObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      const item = findOutingById(entry.target.dataset.outingImageId);
      if (item) scheduleRemotePlaceImage(item);
    });
  }, { rootMargin: "320px 0px" })
  : null;

const mapBounds = {
  north: 38.2033,
  south: 37.1897,
  west: -122.6445,
  east: -121.5871
};

const {
  normalizeChildAges: validChildAges,
  familyAgeMatchCount,
  familyAgeMatches,
} = window.LittleWeekendsFamilyState;

let storedChildAgesMonths = [];
try {
  storedChildAgesMonths = validChildAges(JSON.parse(localStorage.getItem("little-weekends-child-ages:v1") || "[]"));
} catch {
  storedChildAgesMonths = [];
}

function validPlaceNotes(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).flatMap(([placeKey, note]) => {
    const text = String(note?.text || "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, " ").trim().slice(0, 500);
    if (!/^[a-z0-9][a-z0-9-]{2,219}$/i.test(placeKey) || !text) return [];
    const updatedAt = Number.isFinite(new Date(note?.updatedAt).getTime()) ? new Date(note.updatedAt).toISOString() : new Date().toISOString();
    return [[placeKey, { text, updatedAt }]];
  }));
}

let storedPlaceNotes = {};
try {
  storedPlaceNotes = validPlaceNotes(JSON.parse(localStorage.getItem("little-weekends-place-notes:v1") || "{}"));
} catch {
  storedPlaceNotes = {};
}

const state = {
  date: "today",
  distance: "10",
  region: "all",
  childAgesMonths: storedChildAgesMonths,
  placeNotesByKey: storedPlaceNotes,
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
  sharedPlan: null,
  sharedPlanLoading: false,
  sharedPlanError: "",
  search: "",
  selectedId: null,
  locationKey: storedLocationKey,
  expandedGroups: new Set(),
  sfVenue: "all",
  discoveryMode: "mixed",
  filterOpen: false
};
let pendingChildAgeDraft = null;

const {
  buildCalendarUrl,
  clearDeepLinkUrl,
  deepLinkUrl,
  detectPlanIssues,
  groupSavedItems,
  isOutingCurrent,
  outingTimeStatus,
  prioritizeCityCoverage
} = window.LITTLE_WEEKENDS_PLANNING;

const defaultNapWindow = { enabled: true, start: "13:00", end: "15:00" };
let napWindow = { ...defaultNapWindow };
try {
  const storedNapWindow = JSON.parse(localStorage.getItem("little-weekends-nap-window") || "null");
  if (storedNapWindow && typeof storedNapWindow === "object") napWindow = { ...defaultNapWindow, ...storedNapWindow };
} catch {
  napWindow = { ...defaultNapWindow };
}

const requestedOutingId = new URLSearchParams(window.location.search).get("outing");
let pendingOutingId = /^[a-z0-9-]{1,220}$/i.test(requestedOutingId || "") ? requestedOutingId : null;
const requestedPlanToken = new URLSearchParams(window.location.search).get("plan");
const requestedEditToken = new URLSearchParams(window.location.search).get("edit");
const sharedPlanToken = /^[A-Za-z0-9_-]{20,80}$/.test(requestedPlanToken || "") ? requestedPlanToken : null;
const sharedEditToken = /^[A-Za-z0-9_-]{20,80}$/.test(requestedEditToken || "") ? requestedEditToken : null;
state.sharedPlanLoading = Boolean(sharedPlanToken);
if (requestedPlanToken && !sharedPlanToken) state.sharedPlanError = "공유 계획 주소가 올바르지 않아요.";

let publishedPlan = null;
let publishedPlanSync = Promise.resolve();
let participantName = "";
let participantId = "";
try {
  const storedPublishedPlan = JSON.parse(localStorage.getItem("little-weekends-shared-plan") || "null");
  if (/^[A-Za-z0-9_-]{20,80}$/.test(storedPublishedPlan?.viewToken || "")
    && /^[A-Za-z0-9_-]{20,80}$/.test(storedPublishedPlan?.editToken || "")) publishedPlan = storedPublishedPlan;
  participantName = String(localStorage.getItem("little-weekends-participant-name") || "").slice(0, 30);
  participantId = String(localStorage.getItem("little-weekends-participant-id") || "");
  if (!/^[A-Za-z0-9_-]{12,80}$/.test(participantId)) {
    participantId = createParticipantId();
    localStorage.setItem("little-weekends-participant-id", participantId);
  }
} catch {
  participantId = createParticipantId();
}

let photoDeviceId = "";
let photoSubmissionReceipts = [];
let photoUploadRetryDraft = null;
try {
  photoDeviceId = String(localStorage.getItem("little-weekends-photo-device:v1") || "");
  if (!/^[A-Za-z0-9_-]{24,120}$/.test(photoDeviceId)) {
    photoDeviceId = createParticipantId();
    localStorage.setItem("little-weekends-photo-device:v1", photoDeviceId);
  }
  const receipts = JSON.parse(localStorage.getItem("little-weekends-photo-submissions:v1") || "[]");
  photoSubmissionReceipts = Array.isArray(receipts)
    ? receipts.filter((receipt) => /^photo_[0-9a-f-]{36}$/i.test(String(receipt?.id || "")) && /^[A-Za-z0-9_-]{24,120}$/.test(String(receipt?.manageToken || ""))).slice(0, 30)
    : [];
  const retryDraft = JSON.parse(localStorage.getItem("little-weekends-photo-upload-retry:v1") || "null");
  if (/^[0-9a-f-]{36}$/i.test(String(retryDraft?.requestId || ""))
    && /^[A-Za-z0-9_-]{24,120}$/.test(String(retryDraft?.retryToken || ""))
    && /^[a-z0-9][a-z0-9-]{2,219}$/i.test(String(retryDraft?.placeKey || ""))
    && Number.isFinite(Number(retryDraft?.createdAt))) photoUploadRetryDraft = retryDraft;
} catch {
  photoDeviceId = createParticipantId();
  photoSubmissionReceipts = [];
  photoUploadRetryDraft = null;
}

try {
  state.saved = new Set(JSON.parse(localStorage.getItem("little-weekends-saved") || "[]"));
} catch {
  state.saved = new Set();
}
if (!sharedPlanToken && new URLSearchParams(window.location.search).get("saved") === "1") {
  state.savedOnly = true;
  state.view = "list";
  state.mobileSection = "saved";
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
const sharePlanDialog = document.querySelector("#sharePlanDialog");
const sharePlanBody = document.querySelector("#sharePlanBody");
const feedbackDialog = document.querySelector("#feedbackDialog");
const feedbackForm = document.querySelector("#feedbackForm");
const feedbackSubmit = document.querySelector("#feedbackSubmit");
const feedbackStatus = document.querySelector("#feedbackStatus");
const feedbackSuccess = document.querySelector("#feedbackSuccess");
const photoUploadDialog = document.querySelector("#photoUploadDialog");
const photoUploadForm = document.querySelector("#photoUploadForm");
const photoUploadStatus = document.querySelector("#photoUploadStatus");
const photoUploadSubmit = document.querySelector("#photoUploadSubmit");
const photoPreview = document.querySelector("#photoPreview");
const photoPreviewImage = document.querySelector("#photoPreviewImage");
const photoSubmissionHistory = document.querySelector("#photoSubmissionHistory");
const photoRecoveryCode = document.querySelector("#photoRecoveryCode");
const photoRecoveryImport = document.querySelector("#photoRecoveryImport");
const photoRecoveryImportStatus = document.querySelector("#photoRecoveryImportStatus");
const familyProfileButton = document.querySelector("#familyProfileButton");
const mobileSearchMedia = window.matchMedia("(max-width: 768px)");
const mobileMomentEl = document.querySelector("#mobileMoment");
const mobileMomentImageEl = document.querySelector("#mobileMomentImage");
const filterPanelEl = document.querySelector("#filterPanel");
const filterButtonEl = document.querySelector("#filterButton");

const mobileMomentScenes = Object.freeze([
  {
    id: "park-walk",
    src: "assets/mobile-moments/park-walk.jpg",
    alt: "보호자와 어린아이가 손을 잡고 나무가 우거진 공원길을 걷는 활동 이미지"
  },
  {
    id: "library-picture-book",
    src: "assets/mobile-moments/library-picture-book.jpg",
    alt: "보호자와 어린아이가 햇살 드는 어린이 도서 공간에서 그림책을 함께 보는 활동 이미지"
  },
  {
    id: "family-storytime",
    src: "assets/mobile-moments/family-storytime.jpg",
    alt: "어린아이들과 보호자들이 도서관 바닥에 앉아 그림책 이야기를 듣는 활동 이미지"
  },
  {
    id: "playground-morning",
    src: "assets/mobile-moments/playground-morning.jpg",
    alt: "보호자가 가까이에서 지켜보는 가운데 어린아이가 나무 놀이터 계단을 오르는 활동 이미지"
  },
  {
    id: "nature-trail",
    src: "assets/mobile-moments/nature-trail.jpg",
    alt: "보호자와 어린아이가 숲길에 쪼그려 앉아 솔방울을 살펴보는 활동 이미지"
  },
  {
    id: "rainy-puddles",
    src: "assets/mobile-moments/rainy-puddles.jpg",
    alt: "비 오는 날 보호자와 노란 우비를 입은 어린아이가 물웅덩이를 걷는 활동 이미지"
  },
  {
    id: "discovery-gallery",
    src: "assets/mobile-moments/discovery-gallery.jpg",
    alt: "보호자와 어린아이가 어린이 체험 공간의 빛 테이블을 함께 살펴보는 활동 이미지"
  },
  {
    id: "community-festival",
    src: "assets/mobile-moments/community-festival.jpg",
    alt: "어린아이가 보호자의 어깨에 올라앉아 나무 아래 작은 동네 축제를 바라보는 활동 이미지"
  },
  {
    id: "music-movement",
    src: "assets/mobile-moments/music-movement.jpg",
    alt: "보호자와 어린아이들이 밝은 공간에서 천 스카프를 흔들며 음악 놀이를 하는 활동 이미지"
  }
]);

function stableMomentIndex(value) {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.codePointAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash) % mobileMomentScenes.length;
}

function mobileMomentScene() {
  const query = `${state.search} ${state.type}`.toLowerCase();
  const contextualScenes = [
    { pattern: /비|rain|puddle/, id: "rainy-puddles" },
    { pattern: /storytime|스토리|동화|이야기/, id: "family-storytime" },
    { pattern: /library|도서관|그림책|책/, id: "library-picture-book" },
    { pattern: /music|음악|노래|율동|dance|춤/, id: "music-movement" },
    { pattern: /festival|축제|행사|공연|seasonal/, id: "community-festival" },
    { pattern: /museum|박물관|뮤지엄|과학|체험|indoor/, id: "discovery-gallery" },
    { pattern: /playground|놀이터/, id: "playground-morning" },
    { pattern: /trail|nature|숲|자연/, id: "nature-trail" },
    { pattern: /park|공원|산책|outdoor/, id: "park-walk" }
  ];
  const matched = contextualScenes.find(({ pattern }) => pattern.test(query));
  if (matched) return mobileMomentScenes.find(({ id }) => id === matched.id);
  if (state.setting === "indoor") return mobileMomentScenes.find(({ id }) => id === "rainy-puddles");
  if (state.setting === "outdoor") return mobileMomentScenes.find(({ id }) => id === "nature-trail");
  const seed = `${pacificDateKey()}|${state.locationKey}|${state.date}`;
  return mobileMomentScenes[stableMomentIndex(seed)];
}

function syncMobileMoment() {
  if (!mobileSearchMedia.matches || isSharedPlanMode()) {
    mobileMomentEl.hidden = true;
    return;
  }
  const scene = mobileMomentScene();
  mobileMomentEl.hidden = false;
  if (mobileMomentImageEl.dataset.scene === scene.id) return;
  mobileMomentImageEl.dataset.scene = scene.id;
  mobileMomentImageEl.src = scene.src;
  mobileMomentImageEl.alt = scene.alt;
}

function persistSaved() {
  localStorage.setItem("little-weekends-saved", JSON.stringify([...state.saved]));
}

function persistChildAges() {
  try {
    localStorage.setItem("little-weekends-child-ages:v1", JSON.stringify(state.childAgesMonths));
  } catch {
    // The family filter still applies for the current session.
  }
}

function persistPlaceNotes() {
  try {
    localStorage.setItem("little-weekends-place-notes:v1", JSON.stringify(state.placeNotesByKey));
  } catch {
    showToast("메모를 이 기기에 저장하지 못했어요.");
  }
}

function placeNoteFor(item) {
  return item?.placeKey ? state.placeNotesByKey[item.placeKey] || null : null;
}

function syncFamilyProfile() {
  const summary = document.querySelector("#familyProfileSummary");
  const hint = document.querySelector("#familyProfileHint");
  if (!summary || !hint || !familyProfileButton) return;
  if (!state.childAgesMonths.length) {
    summary.textContent = "아이 나이 추가";
    hint.textContent = "나이를 넣으면 모든 아이에게 맞는 곳만 찾아드려요.";
  } else {
    const labels = state.childAgesMonths.map(childAgeLabel);
    summary.textContent = labels.length <= 3 ? labels.join(" · ") : `${labels.slice(0, 3).join(" · ")} 외 ${labels.length - 3}명`;
    hint.textContent = `${labels.length}명 모두에게 맞는 결과만 표시 중이에요.`;
  }
  familyProfileButton.setAttribute("aria-expanded", String(state.filterOpen));
}

function renderChildAgeRows() {
  const rows = document.querySelector("#childAgeRows");
  const empty = document.querySelector("#familyAgeEmpty");
  if (!rows || !empty) return;
  const savedRows = state.childAgesMonths.map((ageMonths, index) => {
    const years = Math.floor(ageMonths / 12);
    const months = ageMonths % 12;
    return `
      <div class="child-age-row" data-child-age-index="${index}">
        <span class="child-age-number">아이 ${index + 1}</span>
        <label><span>만 나이</span><select aria-label="아이 ${index + 1} 만 나이" data-child-years="${index}">${Array.from({ length: 7 }, (_, year) => `<option value="${year}" ${year === years ? "selected" : ""}>${year}세</option>`).join("")}</select></label>
        <label><span>개월</span><select aria-label="아이 ${index + 1} 개월" data-child-months="${index}">${Array.from({ length: 12 }, (_, month) => `<option value="${month}" ${month === months ? "selected" : ""}>${month}개월</option>`).join("")}</select></label>
        <button class="child-age-remove" data-remove-child-age="${index}" type="button" aria-label="아이 ${index + 1} 나이 삭제">삭제</button>
      </div>`;
  }).join("");
  const draftIndex = state.childAgesMonths.length;
  const draftRow = pendingChildAgeDraft ? `
    <div class="child-age-row is-draft" data-child-age-draft>
      <span class="child-age-number">아이 ${draftIndex + 1}</span>
      <label><span>만 나이</span><select aria-label="아이 ${draftIndex + 1} 만 나이" data-draft-years><option value="" ${pendingChildAgeDraft.years === "" ? "selected" : ""} disabled>선택</option>${Array.from({ length: 7 }, (_, year) => `<option value="${year}" ${String(year) === pendingChildAgeDraft.years ? "selected" : ""}>${year}세</option>`).join("")}</select></label>
      <label><span>개월</span><select aria-label="아이 ${draftIndex + 1} 개월" data-draft-months><option value="" ${pendingChildAgeDraft.months === "" ? "selected" : ""} disabled>선택</option>${Array.from({ length: 12 }, (_, month) => `<option value="${month}" ${String(month) === pendingChildAgeDraft.months ? "selected" : ""}>${month}개월</option>`).join("")}</select></label>
      <button class="child-age-remove" data-cancel-child-age type="button" aria-label="아이 ${draftIndex + 1} 나이 입력 취소">취소</button>
    </div>` : "";
  rows.innerHTML = savedRows + draftRow;
  empty.hidden = state.childAgesMonths.length > 0 || Boolean(pendingChildAgeDraft);

  rows.querySelectorAll("select").forEach((select) => select.addEventListener("change", (event) => {
    const index = Number(event.currentTarget.closest("[data-child-age-index]").dataset.childAgeIndex);
    const row = rows.querySelector(`[data-child-age-index="${index}"]`);
    const years = Number(row.querySelector("[data-child-years]").value);
    const months = Number(row.querySelector("[data-child-months]").value);
    state.childAgesMonths[index] = Math.min(83, years * 12 + months);
    persistChildAges();
    render();
  }));
  rows.querySelectorAll("[data-remove-child-age]").forEach((button) => button.addEventListener("click", () => {
    state.childAgesMonths.splice(Number(button.dataset.removeChildAge), 1);
    persistChildAges();
    renderChildAgeRows();
    render();
  }));
  rows.querySelectorAll("[data-draft-years], [data-draft-months]").forEach((select) => select.addEventListener("change", () => {
    const draft = rows.querySelector("[data-child-age-draft]");
    const years = draft.querySelector("[data-draft-years]").value;
    const months = draft.querySelector("[data-draft-months]").value;
    pendingChildAgeDraft = { years, months };
    if (years === "" || months === "") return;
    state.childAgesMonths.push(Math.min(83, Number(years) * 12 + Number(months)));
    pendingChildAgeDraft = null;
    persistChildAges();
    render();
  }));
  rows.querySelector("[data-cancel-child-age]")?.addEventListener("click", () => {
    pendingChildAgeDraft = null;
    renderChildAgeRows();
  });
  syncFamilyProfile();
}

function persistNapWindow() {
  localStorage.setItem("little-weekends-nap-window", JSON.stringify(napWindow));
}

function persistPublishedPlan() {
  if (publishedPlan) localStorage.setItem("little-weekends-shared-plan", JSON.stringify(publishedPlan));
  else localStorage.removeItem("little-weekends-shared-plan");
}

function createParticipantId() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID().replace(/-/g, "");
  return Array.from(crypto.getRandomValues(new Uint8Array(18)), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function persistPhotoReceipts() {
  try {
    localStorage.setItem("little-weekends-photo-submissions:v1", JSON.stringify(photoSubmissionReceipts.slice(0, 30)));
    return true;
  } catch {
    return false;
  }
}

function photoFileFingerprint(file, placeKey) {
  return `${placeKey}|${file.name}|${file.size}|${file.lastModified}|${file.type}`;
}

function uploadRetryFor(file, placeKey) {
  const fingerprint = photoFileFingerprint(file, placeKey);
  const fresh = photoUploadRetryDraft
    && photoUploadRetryDraft.fingerprint === fingerprint
    && Date.now() - Number(photoUploadRetryDraft.createdAt) < 24 * 60 * 60 * 1000;
  if (fresh) return photoUploadRetryDraft;
  photoUploadRetryDraft = {
    placeKey,
    fingerprint,
    requestId: createFeedbackRequestId(),
    retryToken: createParticipantId(),
    createdAt: Date.now(),
  };
  try { localStorage.setItem("little-weekends-photo-upload-retry:v1", JSON.stringify(photoUploadRetryDraft)); } catch { /* Current session can still retry. */ }
  return photoUploadRetryDraft;
}

function clearUploadRetry() {
  photoUploadRetryDraft = null;
  try { localStorage.removeItem("little-weekends-photo-upload-retry:v1"); } catch { /* No stored draft to clear. */ }
}

let activePhotoUploadItem = null;
let photoPreviewUrl = "";

function photoStatusLabel(status) {
  return {
    pending: "검수 대기 중",
    approved: "승인되어 공개 중",
    rejected: "승인되지 않음",
    withdrawn: "철회됨",
    expired: "검수 기간 만료",
  }[status] || "상태 확인 중";
}

function setPhotoUploadBackgroundInert(inert) {
  [document.querySelector(".site-header"), document.querySelector("main"), document.querySelector(".site-footer"), document.querySelector(".mobile-nav")]
    .filter(Boolean)
    .forEach((element) => { element.inert = inert; });
}

async function refreshPhotoSubmissionHistory(placeKey) {
  const receipts = photoSubmissionReceipts.filter((receipt) => receipt.placeKey === placeKey);
  if (!receipts.length) {
    photoSubmissionHistory.hidden = true;
    return;
  }
  photoSubmissionHistory.hidden = false;
  const details = await Promise.all(receipts.map(async (receipt) => {
    try {
      const response = await fetch(`/api/place-photos/submissions/${encodeURIComponent(receipt.id)}`, {
        headers: { Accept: "application/json", "X-Photo-Manage-Token": receipt.manageToken },
        cache: "no-store"
      });
      if (!response.ok) return { ...receipt, status: receipt.status || "unknown" };
      return { ...receipt, ...(await response.json()) };
    } catch {
      return { ...receipt, status: receipt.status || "unknown" };
    }
  }));
  details.forEach((detail) => {
    const receipt = photoSubmissionReceipts.find((candidate) => candidate.id === detail.id);
    if (receipt) receipt.status = detail.status;
    if (detail.status === "approved") requestedCommunityPlaceKeys.delete(placeKey);
  });
  persistPhotoReceipts();
  photoSubmissionHistory.querySelector("div").innerHTML = details.map((detail) => `
    <div class="photo-history-item" data-photo-receipt="${escapeHtml(detail.id)}">
      <span><strong>${escapeHtml(photoStatusLabel(detail.status))}</strong><small>${escapeHtml(detail.rejectionReason || new Intl.DateTimeFormat("ko-KR").format(new Date(detail.createdAt || Date.now())))}</small></span>
      ${["pending", "approved"].includes(detail.status) ? `<button type="button" data-withdraw-photo="${escapeHtml(detail.id)}">철회</button>` : ""}
    </div>`).join("");
  photoSubmissionHistory.querySelectorAll("[data-withdraw-photo]").forEach((button) => button.addEventListener("click", async () => {
    const receipt = photoSubmissionReceipts.find((candidate) => candidate.id === button.dataset.withdrawPhoto);
    if (!receipt) return;
    button.disabled = true;
    const response = await fetch(`/api/place-photos/submissions/${encodeURIComponent(receipt.id)}`, {
      method: "DELETE",
      headers: { "X-Photo-Manage-Token": receipt.manageToken }
    });
    if (!response.ok) {
      photoUploadStatus.textContent = "사진을 철회하지 못했어요. 잠시 후 다시 시도해 주세요.";
      photoUploadStatus.classList.add("is-error");
      button.disabled = false;
      return;
    }
    receipt.status = "withdrawn";
    requestedCommunityPlaceKeys.delete(placeKey);
    communityPhotosByPlaceKey.delete(placeKey);
    persistPhotoReceipts();
    await refreshPhotoSubmissionHistory(placeKey);
    void loadCommunityPhotos(outings.filter((item) => item.placeKey === placeKey));
  }));
  if (details.some((detail) => detail.status === "approved")) void loadCommunityPhotos(outings.filter((item) => item.placeKey === placeKey));
}

function openPhotoUploadDialog(item) {
  if (!item?.placeKey) return;
  if (detailDialog.open) detailDialog.close();
  activePhotoUploadItem = item;
  photoUploadForm.reset();
  photoUploadStatus.textContent = "";
  photoUploadStatus.classList.remove("is-error");
  photoRecoveryCode.hidden = true;
  photoRecoveryCode.querySelector("code").textContent = "";
  photoRecoveryImport.value = "";
  photoRecoveryImportStatus.textContent = "";
  document.querySelector("#photoUploadPlaceName").textContent = item.venueName || item.name;
  document.querySelector("#photoTakenOn").max = new Date().toISOString().slice(0, 10);
  if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
  photoPreviewUrl = "";
  photoPreview.hidden = true;
  photoPreviewImage.removeAttribute("src");
  setPhotoUploadBackgroundInert(true);
  photoUploadDialog.showModal();
  void refreshPhotoSubmissionHistory(item.placeKey);
  window.setTimeout(() => document.querySelector("#placePhotoFile").focus(), 0);
}

async function submitPlacePhoto(event) {
  event.preventDefault();
  if (!activePhotoUploadItem?.placeKey) return;
  const file = document.querySelector("#placePhotoFile").files?.[0];
  const consents = [...photoUploadForm.querySelectorAll(".photo-consents input")];
  if (!file) {
    photoUploadStatus.textContent = "올릴 사진을 선택해 주세요.";
    photoUploadStatus.classList.add("is-error");
    return;
  }
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 10 * 1024 * 1024) {
    photoUploadStatus.textContent = "JPEG, PNG, WebP 형식의 10MB 이하 사진을 선택해 주세요.";
    photoUploadStatus.classList.add("is-error");
    return;
  }
  if (!consents.every((checkbox) => checkbox.checked)) {
    photoUploadStatus.textContent = "사진 권리와 공개 동의를 모두 확인해 주세요.";
    photoUploadStatus.classList.add("is-error");
    return;
  }
  const retry = uploadRetryFor(file, activePhotoUploadItem.placeKey);
  const data = new FormData();
  data.set("photo", file);
  data.set("placeKey", activePhotoUploadItem.placeKey);
  data.set("requestId", retry.requestId);
  data.set("retryToken", retry.retryToken);
  data.set("deviceId", photoDeviceId);
  data.set("takenOn", document.querySelector("#photoTakenOn").value);
  data.set("rightsConfirmed", "true");
  data.set("peopleConsentConfirmed", "true");
  data.set("publicLicenseConfirmed", "true");
  photoUploadSubmit.disabled = true;
  photoUploadStatus.textContent = "개인정보를 제거하고 사진을 안전하게 준비하고 있어요.";
  photoUploadStatus.classList.remove("is-error");
  try {
    const response = await fetch("/api/place-photos", { method: "POST", body: data });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "사진을 올리지 못했어요.");
    if (!/^photo_[0-9a-f-]{36}$/i.test(String(payload.submissionId || "")) || !/^[A-Za-z0-9_-]{24,120}$/.test(String(payload.manageToken || ""))) {
      throw new Error("사진 관리 정보를 받지 못했어요. 같은 사진으로 다시 시도해 주세요.");
    }
    const existingReceipt = photoSubmissionReceipts.find((receipt) => receipt.id === payload.submissionId);
    if (existingReceipt) {
      Object.assign(existingReceipt, { manageToken: payload.manageToken, status: payload.status });
    } else {
      photoSubmissionReceipts.unshift({
        id: payload.submissionId,
        placeKey: activePhotoUploadItem.placeKey,
        placeName: activePhotoUploadItem.venueName || activePhotoUploadItem.name,
        manageToken: payload.manageToken,
        status: payload.status,
        createdAt: new Date().toISOString()
      });
    }
    const receiptStored = persistPhotoReceipts();
    clearUploadRetry();
    photoUploadForm.reset();
    if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    photoPreviewUrl = "";
    photoPreview.hidden = true;
    photoUploadStatus.textContent = payload.recovered
      ? "기존 검수 요청을 복구했어요. 승인 전에는 다른 사용자에게 보이지 않아요."
      : "검수 요청을 받았어요. 승인 전에는 다른 사용자에게 보이지 않아요.";
    if (!receiptStored) {
      const recoveryValue = `${payload.submissionId}:${payload.manageToken}`;
      photoRecoveryCode.querySelector("code").textContent = recoveryValue;
      photoRecoveryCode.hidden = false;
    }
    await refreshPhotoSubmissionHistory(activePhotoUploadItem.placeKey);
  } catch (error) {
    photoUploadStatus.textContent = error?.message || "사진을 올리지 못했어요. 잠시 후 다시 시도해 주세요.";
    photoUploadStatus.classList.add("is-error");
  } finally {
    photoUploadSubmit.disabled = false;
  }
}

document.querySelector("#copyPhotoRecoveryCode").addEventListener("click", async () => {
  const value = photoRecoveryCode.querySelector("code").textContent;
  if (!value) return;
  await copyText(value);
  showToast("사진 관리 코드를 복사했어요.");
});

document.querySelector("#importPhotoRecovery").addEventListener("click", async () => {
  const value = photoRecoveryImport.value.trim();
  const match = value.match(/^(photo_[0-9a-f-]{36}):([A-Za-z0-9_-]{24,120})$/i);
  if (!match || !activePhotoUploadItem?.placeKey) {
    photoRecoveryImportStatus.textContent = "관리 코드 형식을 확인해 주세요.";
    return;
  }
  const response = await fetch(`/api/place-photos/submissions/${encodeURIComponent(match[1])}`, {
    headers: { Accept: "application/json", "X-Photo-Manage-Token": match[2] },
    cache: "no-store"
  }).catch(() => null);
  if (!response?.ok) {
    photoRecoveryImportStatus.textContent = "이 관리 코드를 확인하지 못했어요.";
    return;
  }
  const detail = await response.json();
  if (detail.placeKey !== activePhotoUploadItem.placeKey) {
    photoRecoveryImportStatus.textContent = "현재 장소에 해당하는 관리 코드가 아니에요.";
    return;
  }
  const receipt = photoSubmissionReceipts.find((candidate) => candidate.id === detail.id);
  const values = { id: detail.id, placeKey: detail.placeKey, placeName: detail.placeName, manageToken: match[2], status: detail.status, createdAt: detail.createdAt };
  if (receipt) Object.assign(receipt, values);
  else photoSubmissionReceipts.unshift(values);
  if (!persistPhotoReceipts()) {
    photoRecoveryImportStatus.textContent = "코드는 맞지만 이 브라우저에 저장하지 못했어요. 코드를 계속 보관해 주세요.";
    return;
  }
  photoRecoveryImportStatus.textContent = "사진 관리 내역을 이 브라우저에 복구했어요.";
  await refreshPhotoSubmissionHistory(detail.placeKey);
});

function planUpdatedLabel(value) {
  if (!value) return "업데이트 시각 확인 중";
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "America/Los_Angeles",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

function trustStatus(item) {
  if (item.confidenceStatus === "human_verified") {
    return { key: "verified", icon: "✓", short: item.updated, detail: `${item.sourceName}의 공식 정보와 세부 내용을 사람이 확인했어요.` };
  }
  if (item.confidenceStatus === "source_confirmed") {
    return { key: "source-confirmed", icon: "✓", short: item.updated, detail: `${item.sourceName}의 공식 출처에서 자동으로 확인했어요. 일정 변경 가능성은 공식 페이지에서 최종 확인해 주세요.` };
  }
  if (item.confidenceStatus === "date_confirmed") {
    return { key: "date-confirmed", icon: "◷", short: "날짜 확인 · 시간은 공식 페이지 확인", detail: `${item.sourceName}의 공식 목록에서 행사 날짜를 확인했어요. 정확한 시작 시간은 공식 상세 페이지에서 확인해 주세요.` };
  }
  if (item.confidenceStatus === "recurring_estimate") {
    return { key: "recurring-estimate", icon: "↻", short: "반복 일정 예상 · 방문 전 확인", detail: `${item.sourceName}의 최근 공식 회차를 바탕으로 반복 일정을 예상했어요. 휴관과 일정 변경 가능성이 있어 방문 전 공식 페이지 확인이 필요해요.` };
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

function ageMatches(item) {
  return familyAgeMatches(item.minAgeMonths, item.maxAgeMonths, state.childAgesMonths);
}

function familyMatchCount(item) {
  return familyAgeMatchCount(item.minAgeMonths, item.maxAgeMonths, state.childAgesMonths);
}

function childAgeLabel(ageMonths) {
  const years = Math.floor(ageMonths / 12);
  const months = ageMonths % 12;
  if (!years) return `${months}개월`;
  return months ? `${years}세 ${months}개월` : `${years}세`;
}

function familyAgeSummary() {
  if (!state.childAgesMonths.length) return "0–6세 전체";
  if (state.childAgesMonths.length === 1) return childAgeLabel(state.childAgesMonths[0]);
  return `${state.childAgesMonths.length}명 모두`;
}

function recommendationScore(item) {
  const ageWidth = Math.max(0, item.maxAgeMonths - item.minAgeMonths);
  const familyFit = ageMatches(item);
  const preschoolFocused = item.minAgeMonths >= 0 && item.maxAgeMonths <= 83;
  let score = Math.max(0, 30 - distanceFor(item) * 1.25);

  if (state.childAgesMonths.length) score += familyFit ? Math.max(12, 34 - Math.max(0, ageWidth - 24) * 0.15) : 0;
  else score += preschoolFocused ? 24 : ageWidth <= 96 ? 12 : 5;
  score += { human_verified: 18, source_confirmed: 12, date_confirmed: 5, recurring_estimate: 2, recheck: 0, stale: -18 }[item.confidenceStatus] || 0;
  if (item.price === "free") score += 4;
  if (String(item.reservation).includes("불필요")) score += 4;
  if (!item.venueName) score -= 8;
  if (!item.address) score -= 12;

  if (item.startDate) {
    const hoursUntilStart = (new Date(item.startDate).getTime() - Date.now()) / 3600000;
    if (hoursUntilStart >= -1 && hoursUntilStart <= 6) score += 20;
    else if (hoursUntilStart > 6 && hoursUntilStart <= 24) score += 12;
    else if (hoursUntilStart < -1) score -= 20;
    if (state.date === "today" || state.date === "weekend") score += 24;
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

  return prioritizeCityCoverage([...firstOfSeries, ...repeatedSeries]);
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
  return Number(state.discoveryMode !== "places" && state.date !== "today")
    + Number(state.distance !== "10")
    + Number(state.region !== "all")
    + Number(state.childAgesMonths.length > 0)
    + Number(state.type !== "all")
    + Number(state.setting !== "all")
    + Number(state.price !== "all")
    + Number(state.time !== "all")
    + Number(state.reservation !== "all")
    + Number(state.bathroomKnown)
    + Number(state.strollerKnown)
    + Number(state.discoveryMode === "places")
    + Number(Boolean(state.search));
}

let toastTimer;
function showToast(message, action = null) {
  const toast = document.querySelector("#toast");
  toast.innerHTML = `<span>${escapeHtml(message)}</span>${action ? `<button type="button">${escapeHtml(action.label)}</button>` : ""}`;
  toast.querySelector("button")?.addEventListener("click", () => {
    action.run();
    toast.classList.remove("is-visible");
  });
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

const feedbackFieldDefaults = new Map([
  ["feedbackMessage", "5–1,200자로 적어주세요."],
  ["feedbackEmail", "답변이 필요할 때만 남겨주세요."]
]);
const feedbackTouched = new Set();
let currentFeedbackRequestId = "";
let reportingPhoto = null;

function createFeedbackRequestId() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));
  return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10).join("")}`;
}

function setFeedbackFieldState(field, error = "") {
  const helper = document.querySelector(`#${field.getAttribute("aria-describedby")}`);
  const wrapper = field.closest(".feedback-field");
  const invalid = Boolean(error);
  field.setAttribute("aria-invalid", String(invalid));
  wrapper.classList.toggle("is-success", !invalid && feedbackTouched.has(field.id) && Boolean(field.value.trim()));
  helper.textContent = error || feedbackFieldDefaults.get(field.id) || "";
  helper.classList.toggle("is-error", invalid);
  return !invalid;
}

function validateFeedbackField(field) {
  if (field.id === "feedbackMessage") {
    const length = field.value.trim().length;
    if (!length) return setFeedbackFieldState(field, "의견 내용이 비어 있어요. 추가할 장소나 불편했던 점을 적어 주세요.");
    if (length < 5) return setFeedbackFieldState(field, "내용이 너무 짧아요. 알아볼 수 있도록 5자 이상 적어 주세요.");
    return setFeedbackFieldState(field);
  }
  if (field.id === "feedbackEmail" && field.value && !field.validity.valid) {
    return setFeedbackFieldState(field, "이메일 주소 형식을 확인한 뒤 다시 적어 주세요.");
  }
  return setFeedbackFieldState(field);
}

function feedbackContext() {
  return {
    page: window.location.pathname,
    locationKey: state.locationKey,
    locationName: selectedLocation().name,
    outingId: state.selectedId || pendingOutingId || "",
    photoId: reportingPhoto?.photoId || "",
    placeKey: reportingPhoto?.placeKey || "",
    sharedPlan: Boolean(sharedPlanToken),
    filters: {
      date: state.date,
      distance: state.distance,
      region: state.region,
      age: state.childAgesMonths.length ? "family-age-filter-active" : "all-preschool",
      type: state.type,
      setting: state.setting,
      price: state.price,
      time: state.time,
      reservation: state.reservation,
      discoveryMode: state.discoveryMode
    }
  };
}

function setFeedbackBackgroundInert(inert) {
  [document.querySelector(".site-header"), document.querySelector("main"), document.querySelector(".site-footer"), document.querySelector(".mobile-nav")]
    .filter(Boolean)
    .forEach((element) => { element.inert = inert; });
}

function resetFeedbackView() {
  feedbackForm.reset();
  feedbackTouched.clear();
  feedbackForm.closest(".feedback-form-view").hidden = false;
  feedbackSuccess.hidden = true;
  feedbackStatus.textContent = "";
  feedbackSubmit.disabled = false;
  feedbackSubmit.removeAttribute("data-state");
  feedbackSubmit.querySelector(".feedback-submit-label").textContent = "의견 보내기";
  feedbackForm.querySelectorAll(".feedback-field input, .feedback-field textarea").forEach((field) => {
    field.setAttribute("aria-invalid", "false");
    field.closest(".feedback-field").classList.remove("is-success");
    const helper = document.querySelector(`#${field.getAttribute("aria-describedby")}`);
    helper.textContent = feedbackFieldDefaults.get(field.id) || "";
    helper.classList.remove("is-error");
  });
  currentFeedbackRequestId = createFeedbackRequestId();
  document.querySelector("#feedbackTitle").textContent = "Little Weekends에 알려주세요";
  document.querySelector(".feedback-heading p").textContent = "30초면 충분해요. 선택한 지역과 필터는 함께 전달되지만 정확한 위치는 저장하지 않아요.";
  feedbackForm.querySelector(".photo-report-option").hidden = true;
}

function openFeedbackDialog(report = null) {
  reportingPhoto = report && !(report instanceof Event) ? report : null;
  [detailDialog, locationDialog, sharePlanDialog, photoUploadDialog].forEach((dialog) => {
    if (dialog.open) dialog.close();
  });
  if (!currentFeedbackRequestId || !feedbackSuccess.hidden) resetFeedbackView();
  if (reportingPhoto) {
    const category = feedbackForm.querySelector("input[name='category'][value='photo_report']");
    if (category) {
      category.closest("label").hidden = false;
      category.checked = true;
    }
    document.querySelector("#feedbackTitle").textContent = "공개 사진 신고";
    document.querySelector(".feedback-heading p").textContent = "신고는 사진 검수자에게 바로 전달되며 필요하면 즉시 공개를 중단해요.";
    feedbackForm.querySelector("#feedbackMessage").placeholder = "이 사진을 신고하는 이유를 적어 주세요.";
  } else {
    const reportOption = feedbackForm.querySelector(".photo-report-option");
    reportOption.hidden = true;
    if (reportOption.querySelector("input").checked) feedbackForm.querySelector("input[name='category'][value='place_request']").checked = true;
    feedbackForm.querySelector("#feedbackMessage").placeholder = "예: Fremont의 주말 스토리타임도 보고 싶어요.";
  }
  setFeedbackBackgroundInert(true);
  feedbackDialog.showModal();
  window.setTimeout(() => feedbackForm.querySelector("input[name='category']:checked")?.focus(), 0);
}

function openPhotoReport(photoId, placeKey) {
  if (!/^photo_[0-9a-f-]{36}$/i.test(String(photoId || ""))) return;
  openFeedbackDialog({ photoId, placeKey });
}

async function submitFeedback(event) {
  event.preventDefault();
  const fields = [
    feedbackForm.querySelector("#feedbackMessage"),
    feedbackForm.querySelector("#feedbackEmail")
  ];
  fields.forEach((field) => feedbackTouched.add(field.id));
  const valid = fields.map(validateFeedbackField).every(Boolean);
  if (!valid) {
    fields.find((field) => field.getAttribute("aria-invalid") === "true")?.focus();
    return;
  }

  feedbackStatus.textContent = "";
  feedbackSubmit.disabled = true;
  feedbackSubmit.dataset.state = "loading";
  feedbackSubmit.querySelector(".feedback-submit-label").textContent = "보내는 중";

  const data = new FormData(feedbackForm);
  try {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestId: currentFeedbackRequestId,
        category: data.get("category"),
        message: data.get("message"),
        email: data.get("email"),
        website: data.get("website"),
        context: feedbackContext()
      })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "의견을 저장하지 못했어요. 잠시 후 다시 시도해 주세요.");

    feedbackSubmit.dataset.state = "success";
    feedbackForm.closest(".feedback-form-view").hidden = true;
    feedbackSuccess.querySelector("h2").textContent = reportingPhoto ? "사진 신고를 접수했어요" : "의견을 잘 받았어요";
    feedbackSuccess.querySelector("p").textContent = reportingPhoto ? "검수자가 확인하고 필요한 경우 사진을 즉시 비공개 처리할게요." : "보내주신 내용을 다음 개선에 꼼꼼히 반영할게요.";
    feedbackSuccess.hidden = false;
    currentFeedbackRequestId = "";
    if (feedbackDialog.open) feedbackSuccess.querySelector("button").focus();
  } catch (error) {
    feedbackSubmit.disabled = false;
    feedbackSubmit.dataset.state = "error";
    feedbackSubmit.querySelector(".feedback-submit-label").textContent = "다시 보내기";
    feedbackStatus.textContent = error.message;
  }
}

function syncResponsiveSearch() {
  const panel = document.querySelector("#searchPanel");
  const toggle = document.querySelector("#searchToggle");
  syncMobileMoment();
  if (mobileSearchMedia.matches) {
    panel.hidden = false;
    toggle.hidden = true;
    toggle.setAttribute("aria-expanded", "true");
    return;
  }
  toggle.hidden = false;
  if (!state.search && state.mobileSection !== "search") {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }
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

function categoryFallbackImage(item) {
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

function effectiveItemImage(item) {
  if (item.image?.src && item.image.kind === "actual" && !item.localImageFailed) return item.image;
  if (item.communityImage?.src && !item.communityImageFailed) return item.communityImage;
  if (item.remoteImage?.src && !item.remoteImageFailed) return item.remoteImage;
  if (item.image?.src && !item.localImageFailed) return item.image;
  return null;
}

function itemImage(item, { detail = false } = {}) {
  const image = effectiveItemImage(item);
  if (!image) return categoryFallbackImage(item);
  return detail && image.detailSrc ? image.detailSrc : image.src;
}

function itemImageKind(item) {
  return effectiveItemImage(item)?.kind === "actual" ? "actual" : "context";
}

function itemImageCaption(item) {
  const image = effectiveItemImage(item);
  if (image?.provider === "community") return "방문자 제공 사진";
  if (image?.provider === "google_places") {
    const creator = safeText(image.creator, "", 28);
    return creator ? `Google Maps · ${creator}` : "Google Maps";
  }
  if (image?.provider === "streetview") return "Google Maps 거리뷰";
  return itemImageKind(item) === "actual" ? "실제 장소" : "활동 예시";
}

function itemImageAlt(item) {
  return itemImageKind(item) === "actual" ? effectiveItemImage(item)?.alt || item.name : "";
}

function itemImageClass(item) {
  const provider = effectiveItemImage(item)?.provider;
  return provider === "streetview" ? "is-streetview" : provider === "google_places" ? "is-google-place" : provider === "community" ? "is-community" : "";
}

function itemImageBadgeClass(item) {
  return `image-kind-badge is-${itemImageKind(item)}${["google_places", "streetview"].includes(effectiveItemImage(item)?.provider) ? " is-google" : ""}`;
}

function itemImageAttribution(item) {
  const image = effectiveItemImage(item);
  if (!image || itemImageKind(item) !== "actual") {
    return "이 장소의 실제 사진이 아닙니다. 활동 유형을 보여주는 예시 이미지입니다.";
  }

  if (image.provider === "community") {
    const parts = ["Little Weekends 방문자가 제공하고 운영자가 검수한 사진"];
    if (image.capturedAt) parts.push(`${escapeHtml(image.capturedAt)} 촬영`);
    parts.push(`<button class="photo-attribution-report" type="button" data-report-photo="${escapeHtml(image.id)}">사진 신고</button>`);
    return parts.join(" · ");
  }

  if (image.provider === "google_places") {
    const parts = [
      image.creator && image.creatorUrl
        ? `촬영: <a href="${escapeHtml(image.creatorUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(image.creator)}</a>`
        : image.creator
          ? `촬영: ${escapeHtml(image.creator)}`
          : "장소 사진: Google Maps"
    ];
    if (image.sourceUrl) {
      parts.push(`<a href="${escapeHtml(image.sourceUrl)}" target="_blank" rel="noopener noreferrer"><span translate="no">Google Maps</span>에서 원본 보기</a>`);
    }
    if (image.reportUrl) {
      parts.push(`<a href="${escapeHtml(image.reportUrl)}" target="_blank" rel="noopener noreferrer">사진 신고</a>`);
    }
    return parts.join(" · ");
  }

  if (image.provider === "streetview") {
    const parts = [`${escapeHtml(image.credit || "Google Maps")} 거리뷰`];
    if (image.capturedAt) parts.push(`${escapeHtml(image.capturedAt)} 촬영`);
    if (image.sourceUrl) {
      parts.push(`<a href="${escapeHtml(image.sourceUrl)}" target="_blank" rel="noopener noreferrer"><span translate="no">Google Maps</span>에서 위치 보기</a>`);
    }
    return parts.join(" · ");
  }

  const credit = image.credit || image.creator;
  const license = image.license;
  const parts = [credit ? `사진: ${escapeHtml(credit)}` : "실제 장소 사진"];
  if (license && image.licenseUrl) {
    parts.push(`<a href="${escapeHtml(image.licenseUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(license)}</a>`);
  } else if (license) {
    parts.push(escapeHtml(license));
  }
  if (image.sourceUrl) {
    parts.push(`<a href="${escapeHtml(image.sourceUrl)}" target="_blank" rel="noopener noreferrer">원본 보기</a>`);
  }
  return parts.join(" · ");
}

function safeSameOriginPlaceImageUrl(value) {
  try {
    if (!/^https?:$/.test(window.location.protocol)) return null;
    const url = new URL(String(value || ""), window.location.origin);
    return url.origin === window.location.origin && url.pathname === "/api/place-image"
      ? `${url.pathname}${url.search}`
      : null;
  } catch {
    return null;
  }
}

function safeSameOriginCommunityPhotoUrl(value) {
  try {
    if (!/^https?:$/.test(window.location.protocol)) return null;
    const url = new URL(String(value || ""), window.location.origin);
    return url.origin === window.location.origin && /^\/api\/place-photo\/photo_[0-9a-f-]{36}$/i.test(url.pathname)
      ? url.pathname
      : null;
  } catch {
    return null;
  }
}

function normalizedCommunityPhoto(value) {
  if (!value || value.provider !== "community" || !/^photo_[0-9a-f-]{36}$/i.test(String(value.id || ""))) return null;
  const src = safeSameOriginCommunityPhotoUrl(value.src);
  if (!src) return null;
  return {
    id: value.id,
    src,
    detailSrc: safeSameOriginCommunityPhotoUrl(value.detailSrc) || src,
    kind: "actual",
    provider: "community",
    label: "방문자 제공 사진",
    alt: safeText(value.alt, "방문자 제공 장소 사진", 180),
    capturedAt: /^\d{4}-\d{2}-\d{2}$/.test(String(value.capturedAt || "")) ? value.capturedAt : "",
    featured: Boolean(value.featured)
  };
}

async function loadCommunityPhotos(items) {
  if (!/^https?:$/.test(window.location.protocol)) return;
  const placeKeys = [...new Set(items.map((item) => item.placeKey).filter(Boolean))]
    .filter((placeKey) => !requestedCommunityPlaceKeys.has(placeKey))
    .slice(0, 50);
  if (!placeKeys.length) return;
  placeKeys.forEach((placeKey) => requestedCommunityPlaceKeys.add(placeKey));
  try {
    const response = await fetch(`/api/place-photos?placeKeys=${encodeURIComponent(placeKeys.join(","))}`, { headers: { Accept: "application/json" } });
    if (!response.ok) return;
    const payload = await response.json();
    Object.entries(payload.photos || {}).forEach(([placeKey, photos]) => {
      const normalized = Array.isArray(photos) ? photos.map(normalizedCommunityPhoto).filter(Boolean) : [];
      communityPhotosByPlaceKey.set(placeKey, normalized);
    });
    outings.forEach((item) => {
      const photos = communityPhotosByPlaceKey.get(item.placeKey) || [];
      item.communityPhotos = photos;
      item.communityImage = photos[0] || null;
    });
    render();
    if (state.selectedId && detailDialog.open) openDetail(state.selectedId);
  } catch {
    // Existing image sources and activity examples remain available.
  }
}

function photoUploadsAvailable() {
  if (!photoUploadStatusPromise) {
    photoUploadStatusPromise = fetch("/api/place-photos/status", { headers: { Accept: "application/json" }, cache: "no-store" })
      .then(async (response) => response.ok && Boolean((await response.json()).configured))
      .catch(() => false);
  }
  return photoUploadStatusPromise;
}

function safeGoogleMetadataUrl(value) {
  try {
    const url = new URL(String(value || ""));
    const hostname = url.hostname.toLowerCase();
    const allowed = hostname === "google.com"
      || hostname.endsWith(".google.com")
      || hostname === "googleusercontent.com"
      || hostname.endsWith(".googleusercontent.com");
    return url.protocol === "https:" && allowed ? url.href : null;
  } catch {
    return null;
  }
}

function normalizedRemotePlaceImage(value) {
  if (!value || !["google_places", "streetview"].includes(value.provider)) return null;
  const src = safeSameOriginPlaceImageUrl(value.src);
  if (!src) return null;
  const detailSrc = safeSameOriginPlaceImageUrl(value.detailSrc) || src;
  return {
    src,
    detailSrc,
    kind: "actual",
    provider: value.provider,
    label: safeText(value.label, value.provider === "streetview" ? "Google Maps 거리뷰" : "Google Maps", 80),
    alt: safeText(value.alt, "", 180),
    creator: safeText(value.creator, "", 120),
    credit: safeText(value.credit, value.provider === "streetview" ? "Google Maps" : "", 180),
    creatorUrl: safeGoogleMetadataUrl(value.creatorUrl),
    sourceUrl: safeGoogleMetadataUrl(value.sourceUrl),
    reportUrl: safeGoogleMetadataUrl(value.reportUrl),
    capturedAt: /^\d{4}(?:-\d{2})?$/.test(String(value.capturedAt || "")) ? value.capturedAt : ""
  };
}

async function placeImageProviderAvailable() {
  if (!/^https?:$/.test(window.location.protocol)) return false;
  if (!placeImageProviderStatusPromise) {
    placeImageProviderStatusPromise = fetch("/api/place-image?mode=status", {
      headers: { Accept: "application/json" },
      cache: "no-store"
    })
      .then(async (response) => response.ok && Boolean((await response.json()).configured))
      .catch(() => false);
  }
  return placeImageProviderStatusPromise;
}

function refreshRenderedPlaceImage(item) {
  document.querySelectorAll("[data-outing-image-id]").forEach((imageElement) => {
    if (imageElement.dataset.outingImageId !== item.id) return;
    const detail = imageElement.dataset.imageLayout === "detail";
    imageElement.src = itemImage(item, { detail });
    imageElement.alt = itemImageAlt(item);
    imageElement.className = itemImageClass(item);
    const badge = imageElement.closest(".card-image, .detail-image")?.querySelector(".image-kind-badge");
    if (badge) {
      badge.className = itemImageBadgeClass(item);
      badge.textContent = itemImageCaption(item);
      if (["google_places", "streetview"].includes(effectiveItemImage(item)?.provider)) badge.setAttribute("translate", "no");
      else badge.removeAttribute("translate");
    }
  });
  if (state.selectedId === item.id && detailDialog.open) openDetail(item.id);
}

async function loadRemotePlaceImage(item) {
  const placeId = remotePlaceIdFor(item);
  const preferredImage = item.image?.kind === "actual" && !item.localImageFailed ? item.image : item.communityImage && !item.communityImageFailed ? item.communityImage : null;
  if (!placeId || unavailablePlaceImages.has(placeId) || preferredImage) return;
  if (!(await placeImageProviderAvailable())) return;

  if (!placeImageRequests.has(placeId)) {
    placeImageRequests.set(placeId, fetch(`/api/place-image?id=${encodeURIComponent(placeId)}`, {
      headers: { Accept: "application/json" },
      cache: "no-store"
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("PLACE_IMAGE_UNAVAILABLE");
        const payload = await response.json();
        const image = normalizedRemotePlaceImage(payload.image);
        if (!image) unavailablePlaceImages.add(placeId);
        return image;
      })
      .catch(() => {
        unavailablePlaceImages.add(placeId);
        return null;
      }));
  }

  const image = await placeImageRequests.get(placeId);
  if (!image || (item.image?.kind === "actual" && !item.localImageFailed) || (item.communityImage && !item.communityImageFailed)) return;
  item.remoteImage = image;
  item.remoteImageFailed = false;
  refreshRenderedPlaceImage(item);
}

function scheduleRemotePlaceImage(item) {
  if (!(item.image?.kind === "actual" && !item.localImageFailed) && !(item.communityImage && !item.communityImageFailed) && remotePlaceIdFor(item)) void loadRemotePlaceImage(item);
}

function observeRemotePlaceImage(imageElement, item) {
  if ((item.image?.kind === "actual" && !item.localImageFailed) || (item.communityImage && !item.communityImageFailed) || !remotePlaceIdFor(item)) return;
  if (remotePlaceImageObserver) {
    remotePlaceImageObserver.observe(imageElement);
  } else {
    scheduleRemotePlaceImage(item);
  }
}

function bindOutingImageFailure(imageElement, item) {
  imageElement.addEventListener("error", () => {
    const failed = effectiveItemImage(item);
    if (failed === item.image) item.localImageFailed = true;
    if (failed === item.communityImage) item.communityImageFailed = true;
    if (failed === item.remoteImage) item.remoteImageFailed = true;
    const fallback = categoryFallbackImage(item);
    const currentPath = imageElement.getAttribute("src") || "";
    if (currentPath === fallback) {
      imageElement.hidden = true;
      return;
    }
    imageElement.hidden = false;
    imageElement.src = fallback;
    imageElement.alt = "";
    imageElement.className = "";
    const badge = imageElement.closest(".card-image, .detail-image")?.querySelector(".image-kind-badge");
    if (badge) {
      badge.className = "image-kind-badge is-context";
      badge.textContent = "활동 예시";
    }
    scheduleRemotePlaceImage(item);
  });
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
  ["foster city", "fostercity", "포스터시티", "포스터 시티"],
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
    priceLabel(item.price),
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
    { text: normalizeSearchText(`${item.venueName} ${item.address}`), weight: 52 },
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
  if (item.confidenceStatus === "date_confirmed") return false;
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
  const timeStatus = outingTimeStatus(item);
  if (timeStatus.key === "place") return "방문 가능 장소";
  if (["ongoing", "soon", "time_unknown"].includes(timeStatus.key)) return timeStatus.label;
  const itemDate = pacificDateKey(item.startDate);
  const today = pacificDateKey();
  if (itemDate === today) return "오늘 일정";
  if (itemDate === addDaysToDateKey(today, 1)) return "내일 일정";
  return "시간 지정 일정";
}

function displayTimeLabel(item, { detail = false } = {}) {
  if (!item.startDate && item.timeLabel === "운영시간 확인") {
    return detail ? "출발 전 공식 운영시간 확인" : "";
  }
  return item.timeLabel;
}

function recommendationReasons(item) {
  const reasons = [];
  if (state.childAgesMonths.length === 1 && ageMatches(item)) reasons.push(`${childAgeLabel(state.childAgesMonths[0])}에 맞음`);
  if (state.childAgesMonths.length > 1 && ageMatches(item)) reasons.push(`${state.childAgesMonths.length}명 모두 맞아요`);
  if (item.reservationLevel === "none") reasons.push("예약 없이");
  if (distanceFor(item) <= 5) reasons.push("5 mi 안쪽");
  if (["human_verified", "source_confirmed"].includes(item.confidenceStatus)) reasons.push("공식 출처 확인");
  return reasons.slice(0, 2);
}

function cardReservationLabel(value) {
  return String(value || "확인 필요").replace(/^예약\s+/, "");
}

function priceLabel(value) {
  return value === "free" ? "무료" : value === "paid" ? "유료" : "비용 확인";
}

function findOutingById(id) {
  return outings.find((item) => item.id === id)
    || state.sharedPlan?.items.find((item) => item.id === id)
    || null;
}

function publicPageUrl() {
  return `${window.location.origin}${window.location.pathname}`;
}

function isSharedPlanMode() {
  return Boolean(sharedPlanToken || state.sharedPlanError);
}

function filteredOutings({ ignoreSfVenue = false, ignoreAge = false } = {}) {
  if (state.sharedPlan) return state.sharedPlan.items;
  if (state.sharedPlanLoading || state.sharedPlanError) return [];
  if (state.savedOnly) {
    return outings
      .filter((item) => state.saved.has(item.id))
      .toSorted((left, right) => {
        if (left.startDate && right.startDate) return new Date(left.startDate) - new Date(right.startDate);
        if (left.startDate) return -1;
        if (right.startDate) return 1;
        return String(left.name).localeCompare(String(right.name), "ko");
      });
  }

  let result = outings.map((item) => ({
    item,
    searchScore: searchScore(item, state.search),
    recommendationScore: recommendationScore(item)
  })).filter(({ item, searchScore: itemSearchScore }) => {
    const currentMatch = isOutingCurrent(item);
    const discoveryMatch = state.discoveryMode !== "places" || !item.startDate;
    const searchMatch = !state.search || itemSearchScore >= 0;
    const distanceMatch = distanceFor(item) <= Number(state.distance);
    const regionMatch = state.region === "all" || item.region === state.region;
    const ageMatch = ignoreAge || ageMatches(item);
    const typeMatch = state.type === "all" || item.type === state.type;
    const settingMatch = state.setting === "all" || item.setting === state.setting;
    const priceMatch = state.price === "all" || item.price === state.price;
    const reservationMatch = state.reservation === "all" || item.reservationLevel === state.reservation;
    const bathroomMatch = !state.bathroomKnown || item.bathroomKnown;
    const strollerMatch = !state.strollerKnown || item.strollerKnown;
    return currentMatch && discoveryMatch && searchMatch && matchesDate(item) && matchesTime(item) && distanceMatch && regionMatch && ageMatch && typeMatch && settingMatch && priceMatch && reservationMatch && bathroomMatch && strollerMatch;
  });

  if (state.sort === "recommended") {
    result = result.toSorted((a, b) => {
      const searchDifference = state.search ? b.searchScore - a.searchScore : 0;
      const placeTypeDifference = state.discoveryMode === "places"
        ? Number(b.item.type === "park") - Number(a.item.type === "park")
        : 0;
      const recommendationDifference = b.recommendationScore - a.recommendationScore;
      const startDifference = a.item.startDate && b.item.startDate
        ? new Date(a.item.startDate) - new Date(b.item.startDate)
        : 0;
      return searchDifference || placeTypeDifference || recommendationDifference || startDifference || distanceFor(a.item) - distanceFor(b.item);
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

  const items = result.map(({ item }) => item);
  if (ignoreSfVenue || state.sfVenue === "all") return items;
  return items.filter((item) => item.city === "San Francisco" && item.venueName === state.sfVenue);
}

function sfBranchContext(items) {
  if (state.sharedPlan || state.savedOnly || !items.length) return null;
  const sfItems = items.filter((item) =>
    item.city === "San Francisco"
    && item.sourceKey === "san-francisco-library-family-events"
    && item.venueName
  );
  const counts = new Map();
  sfItems.forEach((item) => counts.set(item.venueName, (counts.get(item.venueName) || 0) + 1));
  const options = [...counts.entries()]
    .map(([venueName, count]) => ({ venueName, count }))
    .toSorted((left, right) => left.venueName.localeCompare(right.venueName, "en"));
  const sfDominant = state.region === "sf" || sfItems.length >= items.length * 0.6;
  if (sfItems.length < 8 || options.length < 2 || !sfDominant) return null;
  return { count: sfItems.length, options };
}

function renderSfBranchControl(context) {
  if (!context) return;
  const control = document.createElement("section");
  control.className = "sf-branch-control";
  control.setAttribute("aria-label", "San Francisco 브랜치별 보기");
  control.innerHTML = `
    <label for="sfBranchSelect"><span>SF 브랜치</span><strong>지점별로 결과를 좁혀보세요.</strong></label>
    <select id="sfBranchSelect">
      <option value="all">모든 SF 브랜치 (${context.count})</option>
      ${context.options.map((option) => `<option value="${escapeHtml(option.venueName)}" ${state.sfVenue === option.venueName ? "selected" : ""}>${escapeHtml(option.venueName)} (${option.count})</option>`).join("")}
    </select>
  `;
  control.querySelector("#sfBranchSelect").addEventListener("change", (event) => {
    state.sfVenue = event.target.value;
    state.selectedId = null;
    render();
  });
  cardsEl.append(control);
}

function compactAddress(address, venueName = "") {
  const parts = String(address || "").split(",").map((part) => part.trim()).filter(Boolean);
  if (parts.length < 2 || !venueName) return parts[0] || "";
  const first = normalizeSearchText(parts[0]);
  const venue = normalizeSearchText(venueName);
  return first.includes(venue) || venue.includes(first) ? parts[1] : parts[0];
}

function cardLocationMarkup(item, distance) {
  const venue = item.venueName
    ? `<strong class="card-venue">${escapeHtml(item.venueName)}</strong>`
    : `<strong class="card-venue is-pending">세부 위치 확인 중</strong>`;
  const address = compactAddress(item.address, item.venueName);
  const locationLine = address
    ? `<span>${escapeHtml(address)}, ${escapeHtml(item.city)} · ${distance.toFixed(1)} mi</span>`
    : `<span>${escapeHtml(item.city)} · ${distance.toFixed(1)} mi</span><small>세부 위치 확인 중</small>`;
  return `<span class="card-location">${venue}<span class="card-address">${locationLine}</span></span>`;
}

function placeFeatureLabels(item) {
  if (item.startDate) return [];
  const features = [...(item.placeFeatures || [])];
  const context = normalizeSearchText(`${item.why} ${Object.values(item.notes || {}).join(" ")}`);
  if (!features.length && /유아|토들러|작은 아이|1 3세|2 5세|포용형/.test(context)) features.push("유아 친화");
  if (!features.some((feature) => /그늘|나무/.test(feature)) && /그늘|큰 나무|숲/.test(context)) features.push("그늘·나무");
  if (!features.some((feature) => /펜스|게이트/.test(feature)) && /펜스|게이트/.test(context)) features.push("펜스 있음");
  if (!features.some((feature) => /물놀이|물·모래/.test(feature)) && /물놀이|물 모래/.test(context)) features.push("물놀이");
  return [...new Set(features)].slice(0, 3);
}

function cardEssentialsMarkup(item) {
  if (!item.startDate) {
    return `
      <span class="essential"><small>연령</small>${escapeHtml(item.age)}</span>
      <span class="essential"><small>비용</small>${priceLabel(item.price)}</span>
      <span class="essential"><small>화장실</small>${item.bathroomKnown ? "확인" : "확인 필요"}</span>
      <span class="essential"><small>유모차</small>${item.strollerKnown ? "접근 가능" : "확인 필요"}</span>
    `;
  }
  return `
    <span class="essential"><small>연령</small>${escapeHtml(item.age)}</span>
    <span class="essential"><small>환경</small>${item.setting === "indoor" ? "실내" : "야외"}</span>
    <span class="essential"><small>비용</small>${priceLabel(item.price)}</span>
    <span class="essential"><small>예약</small>${escapeHtml(cardReservationLabel(item.reservation))}</span>
  `;
}

function createOutingCard(item, planIssues = []) {
    const trust = trustStatus(item);
    const distance = distanceFor(item);
    const timeLabel = displayTimeLabel(item);
    const timeMarkup = timeLabel ? `<span class="card-time">${escapeHtml(timeLabel)}</span>` : "";
    const reasons = recommendationReasons(item);
    const reasonMarkup = reasons.length
      ? `<span class="recommendation-cues" aria-label="추천 이유">${reasons.map((reason) => `<span>${escapeHtml(reason)}</span>`).join("")}</span>`
      : "";
    const issueMarkup = planIssues.length
      ? `<span class="plan-alert" aria-label="일정 확인 필요">${planIssues.map((issue) => `<span>${escapeHtml(issue)}</span>`).join("")}</span>`
      : "";
    const placeFeatures = placeFeatureLabels(item);
    const placeFeatureMarkup = placeFeatures.length
      ? `<span class="place-cues" aria-label="장소 특징">${placeFeatures.map((feature) => `<span>${escapeHtml(feature)}</span>`).join("")}</span>`
      : "";
    const privateNoteMarkup = placeNoteFor(item)
      ? '<span class="private-note-cue">나만의 메모 있음</span>'
      : "";
    const card = document.createElement("article");
    card.className = `outing-card${state.selectedId === item.id ? " is-selected" : ""}`;
    card.innerHTML = `
      <button class="card-open" type="button" aria-label="${escapeHtml(item.name)} 상세 보기"></button>
      <span class="card-media"><span class="card-image"><img src="${itemImage(item)}" alt="${escapeHtml(itemImageAlt(item))}" class="${itemImageClass(item)}" data-outing-image-id="${escapeHtml(item.id)}" data-image-layout="card" loading="lazy" /><span class="${itemImageBadgeClass(item)}"${["google_places", "streetview"].includes(effectiveItemImage(item)?.provider) ? ' translate="no"' : ""}>${escapeHtml(itemImageCaption(item))}</span></span></span>
      <span class="card-content">
        <span class="time-row"><span class="schedule-label"><span class="outing-kind">${escapeHtml(outingKindLabel(item))}</span>${timeMarkup}</span><button class="heart ${state.saved.has(item.id) ? "is-saved" : ""}" data-save-card="${escapeHtml(item.id)}" type="button" aria-label="${state.saved.has(item.id) ? "저장 해제" : "저장"}" aria-pressed="${state.saved.has(item.id)}">${state.saved.has(item.id) ? "저장됨" : "저장"}</button></span>
        <h3>${escapeHtml(item.name)}</h3>
        ${cardLocationMarkup(item, distance)}
        <span class="essentials">${cardEssentialsMarkup(item)}</span>
        ${placeFeatureMarkup}
        ${privateNoteMarkup}
        ${reasonMarkup}
        ${issueMarkup}
        <p class="why">${escapeHtml(item.why)}</p>
        <span class="trust ${trust.key}">${escapeHtml(trust.short)}</span>
      </span>
    `;
    card.querySelector(".card-open").addEventListener("click", () => {
      state.selectedId = item.id;
      openDetail(item.id);
      render();
    });
    const imageElement = card.querySelector("[data-outing-image-id]");
    bindOutingImageFailure(imageElement, item);
    observeRemotePlaceImage(imageElement, item);
    const saveControl = card.querySelector("[data-save-card]");
    const saveFromCard = (event) => { event.preventDefault(); toggleSaved(item.id); };
    saveControl.addEventListener("click", saveFromCard);
    return card;
}

function renderPlanControls(items, issues) {
  const issueCount = Object.values(issues).filter((messages) => messages.length).length;
  const overview = document.createElement("section");
  overview.className = "plan-overview";
  overview.setAttribute("aria-label", "주말 계획 설정");
  overview.innerHTML = `
    <div class="plan-overview-copy">
      <strong>${items.length}개 일정을 날짜별로 모았어요.</strong>
      <span>날짜별 정리, 낮잠·일정 충돌 확인, 캘린더 추가, 가족 공유를 한곳에서 할 수 있어요.</span>
      ${issueCount ? `<span class="plan-overview-warning">${issueCount}개 일정의 시간을 한 번 더 확인해 주세요.</span>` : ""}
    </div>
    <div class="plan-overview-actions">
      <div class="nap-controls">
        <label class="nap-toggle"><input id="napEnabled" type="checkbox" ${napWindow.enabled ? "checked" : ""} /><span>낮잠 충돌 표시</span></label>
        <span class="nap-time-range" aria-label="낮잠 시간">
          <label><span>시작</span><input id="napStart" type="time" value="${escapeHtml(napWindow.start)}" ${napWindow.enabled ? "" : "disabled"} /></label>
          <span aria-hidden="true">부터</span>
          <label><span>끝</span><input id="napEnd" type="time" value="${escapeHtml(napWindow.end)}" ${napWindow.enabled ? "" : "disabled"} /></label>
        </span>
      </div>
      <button class="primary-action plan-share-action" id="shareSavedPlan" type="button">계획 공유</button>
    </div>
  `;
  cardsEl.append(overview);

  overview.querySelector("#napEnabled").addEventListener("change", (event) => {
    napWindow.enabled = event.target.checked;
    persistNapWindow();
    render();
  });
  overview.querySelectorAll("input[type='time']").forEach((input) => {
    input.addEventListener("change", () => {
      const start = overview.querySelector("#napStart").value;
      const end = overview.querySelector("#napEnd").value;
      if (!start || !end || start >= end) {
        showToast("낮잠 종료 시간을 시작 시간보다 늦게 설정해 주세요.");
        render();
        return;
      }
      napWindow = { ...napWindow, start, end };
      persistNapWindow();
      render();
    });
  });
  overview.querySelector("#shareSavedPlan").addEventListener("click", async (event) => {
    event.currentTarget.disabled = true;
    event.currentTarget.textContent = "링크 준비 중";
    await syncPublishedPlan(true);
    event.currentTarget.disabled = false;
    event.currentTarget.textContent = "계획 공유";
  });
}

function planLinks(plan) {
  const viewUrl = new URL(publicPageUrl());
  viewUrl.searchParams.set("plan", plan.viewToken);
  const editUrl = new URL(viewUrl);
  if (plan.editToken) editUrl.searchParams.set("edit", plan.editToken);
  return { view: viewUrl.toString(), edit: plan.editToken ? editUrl.toString() : "" };
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const input = document.createElement("textarea");
    input.value = value;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.append(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  }
}

function showPlanShareDialog(plan) {
  const links = planLinks(plan);
  const editMarkup = links.edit
    ? `<div class="share-link-row"><label for="editPlanLink"><strong>편집 링크</strong><span>제목과 일정을 함께 바꿀 수 있어요.</span></label><div><input id="editPlanLink" type="text" readonly value="${escapeHtml(links.edit)}" /><button class="secondary-action" type="button" data-copy-plan="edit">복사</button></div></div>`
    : "";
  sharePlanBody.innerHTML = `
    <header class="share-plan-heading"><p>함께 정하는 주말</p><h2>가족에게 계획을 보내세요</h2><span>보기 링크에서는 일정 확인과 의견 남기기만 할 수 있어요.</span></header>
    <div class="share-link-list">
      <div class="share-link-row"><label for="viewPlanLink"><strong>보기 링크</strong><span>친구나 가족에게 보내기 좋은 안전한 링크예요.</span></label><div><input id="viewPlanLink" type="text" readonly value="${escapeHtml(links.view)}" /><button class="secondary-action" type="button" data-copy-plan="view">복사</button></div></div>
      ${editMarkup}
    </div>
    <p class="share-privacy">링크를 아는 사람은 계획과 참여자 이름을 볼 수 있어요. 편집 링크는 일정을 바꿀 사람에게만 보내세요.</p>
    <div class="share-plan-actions"><button class="primary-action" id="nativeSharePlan" type="button">보기 링크 보내기</button></div>
  `;
  sharePlanBody.querySelectorAll("[data-copy-plan]").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copyPlan === "edit" ? links.edit : links.view;
      await copyText(value);
      showToast(button.dataset.copyPlan === "edit" ? "편집 링크를 복사했어요." : "보기 링크를 복사했어요.");
    });
  });
  sharePlanBody.querySelector("#nativeSharePlan").addEventListener("click", async () => {
    try {
      if (navigator.share) await navigator.share({ title: plan.title, text: "이번 주말 계획을 같이 골라봐요.", url: links.view });
      else {
        await copyText(links.view);
        showToast("보기 링크를 복사했어요.");
      }
    } catch (error) {
      if (error?.name !== "AbortError") showToast("공유하지 못했어요. 잠시 후 다시 시도해 주세요.");
    }
  });
  if (!sharePlanDialog.open) sharePlanDialog.showModal();
}

async function planApi(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {})
    }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || "공유 계획을 처리하지 못했어요.");
    error.status = response.status;
    throw error;
  }
  return payload;
}

function currentSavedItems() {
  return outings.filter((item) => state.saved.has(item.id));
}

async function syncPublishedPlan(showDialog = false) {
  const items = currentSavedItems();
  await publishedPlanSync;
  if (!items.length && !publishedPlan) {
    showToast("공유할 일정을 먼저 저장해 주세요.");
    return null;
  }
  const title = publishedPlan?.title || "우리 가족 주말 계획";
  try {
    if (publishedPlan) {
      const payload = await planApi(`/api/plans/${publishedPlan.viewToken}`, {
        method: "PATCH",
        headers: { "X-Plan-Edit-Token": publishedPlan.editToken },
        body: JSON.stringify({ title, items })
      });
      publishedPlan = { ...publishedPlan, title: payload.title };
    } else {
      if (!items.length) return null;
      const payload = await planApi("/api/plans", {
        method: "POST",
        body: JSON.stringify({ title, items })
      });
      publishedPlan = {
        viewToken: payload.viewToken,
        editToken: payload.editToken,
        title: payload.title
      };
    }
    persistPublishedPlan();
    if (showDialog) showPlanShareDialog(publishedPlan);
    return publishedPlan;
  } catch (error) {
    if (publishedPlan && (error.status === 403 || error.status === 404)) {
      publishedPlan = null;
      persistPublishedPlan();
      return syncPublishedPlan(showDialog);
    }
    if (showDialog) showToast(error.message);
    return null;
  }
}

function queuePublishedPlanItemChange(itemId, saved) {
  if (!publishedPlan || isSharedPlanMode()) return;
  const plan = { ...publishedPlan };
  publishedPlanSync = publishedPlanSync.then(async () => {
    if (publishedPlan?.viewToken !== plan.viewToken) return;
    try {
      const current = await planApi(`/api/plans/${plan.viewToken}`, {
        headers: { "X-Plan-Edit-Token": plan.editToken }
      });
      const nextItems = current.items.filter((item) => item.id !== itemId);
      if (saved) {
        const item = findOutingById(itemId);
        if (item) nextItems.push(item);
      }
      const updated = await planApi(`/api/plans/${plan.viewToken}`, {
        method: "PATCH",
        headers: { "X-Plan-Edit-Token": plan.editToken },
        body: JSON.stringify({ title: current.title, items: nextItems })
      });
      publishedPlan = { ...publishedPlan, title: updated.title };
      persistPublishedPlan();
    } catch (error) {
      if ((error.status === 403 || error.status === 404) && publishedPlan?.viewToken === plan.viewToken) {
        publishedPlan = null;
        persistPublishedPlan();
      }
    }
  });
}

function applySharedPlan(payload, preserveEditor = false) {
  const editorAccess = preserveEditor && state.sharedPlan?.canEdit ? true : Boolean(payload.canEdit);
  state.sharedPlan = {
    ...payload,
    canEdit: editorAccess,
    items: Array.isArray(payload.items) ? payload.items.map(normalizeOuting) : [],
    responses: Array.isArray(payload.responses) ? payload.responses : []
  };
  state.sharedPlanLoading = false;
  state.sharedPlanError = "";
}

async function loadSharedPlan(silent = false) {
  if (!sharedPlanToken) return;
  if (!silent) {
    state.sharedPlanLoading = true;
    state.sharedPlanError = "";
    render();
  }
  try {
    const payload = await planApi(`/api/plans/${sharedPlanToken}`, {
      headers: sharedEditToken ? { "X-Plan-Edit-Token": sharedEditToken } : {}
    });
    applySharedPlan(payload);
    render();
    openPendingOuting();
  } catch (error) {
    if (silent) return;
    state.sharedPlanLoading = false;
    state.sharedPlanError = error.message;
    render();
  }
}

async function patchSharedPlan(changes, successMessage) {
  if (!sharedPlanToken || !sharedEditToken || !state.sharedPlan?.canEdit) return null;
  try {
    const payload = await planApi(`/api/plans/${sharedPlanToken}`, {
      method: "PATCH",
      headers: { "X-Plan-Edit-Token": sharedEditToken },
      body: JSON.stringify(changes)
    });
    applySharedPlan(payload);
    if (publishedPlan?.viewToken === sharedPlanToken) {
      publishedPlan = { ...publishedPlan, title: payload.title };
      persistPublishedPlan();
    }
    render();
    if (successMessage) showToast(successMessage);
    return payload;
  } catch (error) {
    showToast(error.message);
    return null;
  }
}

async function updateSharedResponse(itemId, response) {
  const name = participantName.replace(/\s+/g, " ").trim().slice(0, 30);
  if (!name) {
    showToast("의견에 표시할 이름을 먼저 적어 주세요.");
    const input = document.querySelector("#participantName");
    input?.focus();
    return;
  }
  try {
    const payload = await planApi(`/api/plans/${sharedPlanToken}/responses`, {
      method: "PUT",
      body: JSON.stringify({ participantId, name, itemId, response })
    });
    applySharedPlan(payload, true);
    render();
    showToast(response === "clear" ? "의견을 지웠어요." : "의견을 남겼어요.");
  } catch (error) {
    showToast(error.message);
  }
}

function renderSharedPlanControls(items) {
  const overview = document.createElement("section");
  overview.className = "shared-plan-overview";
  overview.setAttribute("aria-label", "공유 계획 참여");
  const titleMarkup = state.sharedPlan.canEdit
    ? `<div class="shared-title-edit"><label for="sharedPlanTitle">계획 이름</label><div><input id="sharedPlanTitle" type="text" maxlength="80" value="${escapeHtml(state.sharedPlan.title)}" /><button class="secondary-action" id="saveSharedTitle" type="button">이름 저장</button></div></div>`
    : `<div class="shared-plan-copy"><strong>${items.length}개 일정을 함께 보고 있어요.</strong><span>${planUpdatedLabel(state.sharedPlan.updatedAt)} 업데이트</span></div>`;
  const localAdditions = currentSavedItems().filter((item) => !items.some((sharedItem) => sharedItem.id === item.id));
  overview.innerHTML = `
    ${titleMarkup}
    <div class="shared-participant">
      <label for="participantName"><span>내 이름</span><input id="participantName" type="text" maxlength="30" autocomplete="nickname" placeholder="예: 민지" value="${escapeHtml(participantName)}" /></label>
      <span>이름을 적고 각 일정에 의견을 남겨 보세요.</span>
    </div>
    <div class="shared-plan-tools">
      <button class="primary-action" id="manageSharedLinks" type="button">보기 링크 공유</button>
      ${state.sharedPlan.canEdit && localAdditions.length ? `<button class="secondary-action" id="addSavedToShared" type="button">내 저장 ${localAdditions.length}개 추가</button>` : ""}
      ${state.sharedPlan.canEdit ? '<span class="editor-note">편집 링크로 열었어요.</span>' : ""}
    </div>
  `;
  cardsEl.append(overview);

  const nameInput = overview.querySelector("#participantName");
  nameInput.addEventListener("input", () => {
    participantName = nameInput.value.slice(0, 30);
  });
  nameInput.addEventListener("change", () => {
    participantName = nameInput.value.replace(/\s+/g, " ").trim().slice(0, 30);
    try { localStorage.setItem("little-weekends-participant-name", participantName); } catch { /* Current session still keeps the name. */ }
  });
  overview.querySelector("#manageSharedLinks").addEventListener("click", () => {
    showPlanShareDialog({
      viewToken: sharedPlanToken,
      editToken: state.sharedPlan.canEdit ? sharedEditToken : "",
      title: state.sharedPlan.title
    });
  });
  overview.querySelector("#saveSharedTitle")?.addEventListener("click", async () => {
    const title = overview.querySelector("#sharedPlanTitle").value.trim();
    await patchSharedPlan({ title }, "계획 이름을 바꿨어요.");
  });
  overview.querySelector("#sharedPlanTitle")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") overview.querySelector("#saveSharedTitle").click();
  });
  overview.querySelector("#addSavedToShared")?.addEventListener("click", async () => {
    const combined = [...items, ...localAdditions].slice(0, 30);
    await patchSharedPlan({ items: combined }, "내 저장 일정을 계획에 추가했어요.");
  });
}

function enhanceSharedPlanCard(card, item) {
  const responses = state.sharedPlan.responses.filter((response) => response.itemId === item.id);
  const going = responses.filter((response) => response.response === "going");
  const maybe = responses.filter((response) => response.response === "maybe");
  const mine = responses.find((response) => response.participantId === participantId)?.response || "";
  const controls = document.createElement("div");
  controls.className = "shared-response";
  controls.innerHTML = `
    <div class="shared-response-actions" aria-label="${escapeHtml(item.name)} 참여 의견">
      <button type="button" data-plan-response="going" aria-pressed="${mine === "going"}" class="${mine === "going" ? "is-active" : ""}">갈래요 <b>${going.length}</b></button>
      <button type="button" data-plan-response="maybe" aria-pressed="${mine === "maybe"}" class="${mine === "maybe" ? "is-active" : ""}">고민 중 <b>${maybe.length}</b></button>
      ${state.sharedPlan.canEdit ? `<button class="remove-plan-item" data-remove-plan-item="${escapeHtml(item.id)}" type="button">계획에서 빼기</button>` : ""}
    </div>
    <div class="shared-response-names">
      ${going.length ? `<span><strong>갈래요</strong>${going.map((response) => escapeHtml(response.name)).join(", ")}</span>` : ""}
      ${maybe.length ? `<span><strong>고민 중</strong>${maybe.map((response) => escapeHtml(response.name)).join(", ")}</span>` : ""}
      ${!responses.length ? "<span>아직 가족 의견이 없어요.</span>" : ""}
    </div>
  `;
  card.querySelector(".trust").before(controls);
  controls.querySelectorAll("[data-plan-response]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      controls.querySelectorAll("button").forEach((control) => { control.disabled = true; });
      const response = mine === button.dataset.planResponse ? "clear" : button.dataset.planResponse;
      await updateSharedResponse(item.id, response);
      controls.querySelectorAll("button").forEach((control) => { control.disabled = false; });
    });
  });
  controls.querySelector("[data-remove-plan-item]")?.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const items = state.sharedPlan.items.filter((planItem) => planItem.id !== item.id);
    await patchSharedPlan({ items }, `${item.name}을 계획에서 뺐어요.`);
  });
}

function renderSharedPlan(items) {
  renderSharedPlanControls(items);
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state shared-plan-empty";
    empty.innerHTML = `<strong>아직 계획에 일정이 없어요.</strong><p>${state.sharedPlan.canEdit ? "내 저장 일정을 추가하거나, 홈에서 새 일정을 저장해 주세요." : "편집 링크를 가진 가족이 일정을 추가하면 이곳에 표시돼요."}</p>`;
    cardsEl.append(empty);
    return;
  }
  const issues = detectPlanIssues(items, { enabled: false });
  groupSavedItems(items, pacificDateKey()).forEach((group) => {
    const heading = document.createElement("div");
    heading.className = "plan-group-heading";
    heading.innerHTML = `<h3>${escapeHtml(group.label)}</h3><span>${group.items.length}개</span>`;
    cardsEl.append(heading);
    group.items.forEach((item) => {
      const card = createOutingCard(item, issues[item.id]);
      card.classList.add("shared-plan-card");
      enhanceSharedPlanCard(card, item);
      cardsEl.append(card);
    });
  });
}

function hasDetailedDiscoveryFilters() {
  return Boolean(state.search)
    || state.distance !== "10"
    || state.region !== "all"
    || state.childAgesMonths.length > 0
    || state.type !== "all"
    || state.setting !== "all"
    || state.price !== "all"
    || state.time !== "all"
    || state.reservation !== "all"
    || state.bathroomKnown
    || state.strollerKnown;
}

function appendDiscoveryGroup(title, items, key) {
  if (!items.length) return;
  const expanded = state.expandedGroups.has(key);
  const visibleItems = expanded ? items : items.slice(0, 5);
  const heading = document.createElement("div");
  heading.className = "discovery-group-heading";
  heading.innerHTML = `<h3>${escapeHtml(title)}</h3><span>${items.length}개</span>`;
  cardsEl.append(heading);
  visibleItems.forEach((item) => cardsEl.append(createOutingCard(item)));
  if (!expanded && items.length > visibleItems.length) {
    const more = document.createElement("button");
    more.className = "discovery-more secondary-action";
    more.type = "button";
    more.textContent = `${items.length - visibleItems.length}개 더 보기`;
    more.addEventListener("click", () => {
      state.expandedGroups.add(key);
      render();
    });
    cardsEl.append(more);
  }
}

function appendDiscoveryContext(title, description) {
  const context = document.createElement("section");
  context.className = "discovery-context";
  context.innerHTML = `<strong>${escapeHtml(title)}</strong><span>${escapeHtml(description)}</span>`;
  cardsEl.append(context);
}

function leaveSharedPlan(openSaved = false) {
  const url = new URL(publicPageUrl());
  if (openSaved) url.searchParams.set("saved", "1");
  window.location.assign(url.toString());
}

function renderCards(items, branchContext = null) {
  cardsEl.innerHTML = "";

  if (state.sharedPlanLoading) {
    cardsEl.innerHTML = '<div class="shared-plan-loading" aria-live="polite"><strong>가족 계획을 불러오고 있어요.</strong><span></span><span></span><span></span></div>';
    return;
  }
  if (state.sharedPlanError) {
    cardsEl.innerHTML = `<div class="empty-state shared-plan-empty"><strong>공유 계획을 열지 못했어요.</strong><p>${escapeHtml(state.sharedPlanError)}</p><div class="empty-actions"><button class="primary-action" id="sharedPlanHome" type="button">추천 홈으로</button></div></div>`;
    cardsEl.querySelector("#sharedPlanHome").addEventListener("click", () => leaveSharedPlan(false));
    return;
  }
  if (state.sharedPlan) {
    renderSharedPlan(items);
    return;
  }

  if (!items.length) {
    if (state.savedOnly) {
      cardsEl.innerHTML = '<div class="empty-state plan-empty"><strong>아직 저장한 일정이 없어요.</strong><p>마음에 드는 행사나 장소를 저장하면 날짜별로 정리해 드려요.</p><div class="empty-actions"><button class="primary-action" type="button" id="emptyBrowse">추천 둘러보기</button></div></div>';
      cardsEl.querySelector("#emptyBrowse").addEventListener("click", () => {
        state.savedOnly = false;
        state.mobileSection = "home";
        render();
        document.querySelector("#discover").scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    const placesMode = state.discoveryMode === "places";
    const expandDistanceAction = state.distance !== "25" ? '<button class="primary-action" type="button" id="emptyExpandDistance">25 mi로 넓히기</button>' : "";
    const includeAnytimeAction = !placesMode ? '<button class="secondary-action" type="button" id="emptyIncludeAnytime">행사 없어도 갈 곳 보기</button>' : "";
    const emptyTitle = placesMode ? "가까운 상시 장소를 더 확인하고 있어요." : "이 조건에 맞는 후보가 아직 없어요.";
    const emptyDescription = placesMode ? "거리를 넓히거나 조건을 초기화하면 다른 지역의 놀이터와 실내 장소를 볼 수 있어요." : "중요한 조건은 남기고 탐색 범위만 넓혀 보세요.";
    cardsEl.innerHTML = `<div class="empty-state"><strong>${emptyTitle}</strong><p>${emptyDescription}</p><div class="empty-actions">${expandDistanceAction}${includeAnytimeAction}<button class="secondary-action" type="button" id="emptyReset">조건 초기화</button></div></div>`;
    cardsEl.querySelector("#emptyExpandDistance")?.addEventListener("click", () => {
      state.distance = "25";
      document.querySelector("#distanceFilter").value = "25";
      render();
    });
    cardsEl.querySelector("#emptyIncludeAnytime")?.addEventListener("click", () => {
      state.discoveryMode = "places";
      state.date = "anytime";
      state.time = "all";
      state.reservation = "all";
      document.querySelector("#dateFilter").value = "anytime";
      document.querySelector("#timeFilter").value = "all";
      document.querySelector("#reservationFilter").value = "all";
      document.querySelectorAll(".quick-card").forEach((item) => item.classList.toggle("is-active", item.dataset.discovery === "places"));
      render();
    });
    cardsEl.querySelector("#emptyReset").addEventListener("click", resetFilters);
    if (state.childAgesMonths.length > 1) {
      const partialMatches = filteredOutings({ ignoreAge: true })
        .map((item) => ({ item, count: familyMatchCount(item) }))
        .filter(({ count }) => count > 0 && count < state.childAgesMonths.length)
        .toSorted((left, right) => right.count - left.count || distanceFor(left.item) - distanceFor(right.item))
        .slice(0, 3);
      if (partialMatches.length) {
        const heading = document.createElement("div");
        heading.className = "discovery-group-heading partial-age-heading";
        heading.innerHTML = `<h3>일부 아이에게 맞는 대안</h3><span>${partialMatches.length}개</span><p>모든 아이에게 맞는 결과는 아니므로 연령 범위를 꼭 확인해 주세요.</p>`;
        cardsEl.append(heading);
        partialMatches.forEach(({ item, count }) => cardsEl.append(createOutingCard(item, [`아이 ${state.childAgesMonths.length}명 중 ${count}명에게 맞아요`] )));
      }
    }
    return;
  }

  if (state.savedOnly) {
    const issues = detectPlanIssues(items, napWindow);
    renderPlanControls(items, issues);
    groupSavedItems(items, pacificDateKey()).forEach((group) => {
      const heading = document.createElement("div");
      heading.className = "plan-group-heading";
      heading.innerHTML = `<h3>${escapeHtml(group.label)}</h3><span>${group.items.length}개</span>`;
      cardsEl.append(heading);
      group.items.forEach((item) => cardsEl.append(createOutingCard(item, issues[item.id])));
    });
    return;
  }

  renderSfBranchControl(branchContext);

  if (state.discoveryMode === "places") {
    const parks = items.filter((item) => item.type === "park");
    const otherPlaces = items.filter((item) => item.type !== "park");
    appendDiscoveryContext("시간표 없이 떠나는 나들이", "운영시간과 공원 상태만 확인하면 아이 컨디션에 맞춰 출발할 수 있어요.");
    appendDiscoveryGroup("가까운 놀이터와 공원", parks, "places-parks");
    appendDiscoveryGroup("실내와 체험 장소", otherPlaces, "places-other");
    return;
  }

  const groupedDiscovery = ["today", "tomorrow", "weekend"].includes(state.date)
    && state.sort === "recommended"
    && !hasDetailedDiscoveryFilters();
  if (groupedDiscovery) {
    const scheduled = items.filter((item) => item.startDate);
    const anytime = items.filter((item) => !item.startDate);
    if (!scheduled.length && anytime.length) {
      const dateContext = state.date === "today" ? "오늘" : state.date === "tomorrow" ? "내일" : "이번 주말";
      appendDiscoveryContext(`${dateContext} 예정된 행사는 아직 없어요.`, "대신 시간에 맞출 필요 없는 가까운 놀이터와 장소를 보여드려요.");
    }
    const scheduledTitle = state.date === "today"
      ? "오늘 열리는 일정"
      : state.date === "tomorrow"
        ? "내일 열리는 일정"
        : "이번 주말에만 열리는 일정";
    appendDiscoveryGroup(scheduledTitle, scheduled, `${state.date}-scheduled`);
    appendDiscoveryGroup("행사 없어도 갈 수 있는 가까운 곳", anytime, `${state.date}-anytime`);
    return;
  }

  items.forEach((item) => cardsEl.append(createOutingCard(item)));
}

function renderMap(items) {
  mapEl.innerHTML = `
    ${renderMapBase()}
    ${mapLabel("San Francisco", { lat: 37.7749, lng: -122.4194 }, "", { x: 16, y: 5 })}
    ${mapLabel("South SF", { lat: 37.6547, lng: -122.4077 }, "", { x: -7, y: 1 })}
    ${mapLabel("San Mateo", { lat: 37.5630, lng: -122.3255 }, "", { x: -7, y: 5 })}
    ${mapLabel("Redwood City", { lat: 37.4852, lng: -122.2364 }, "", { x: -11, y: 3 })}
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

function syncFilterPanel() {
  filterPanelEl.hidden = !state.filterOpen;
  filterButtonEl.setAttribute("aria-expanded", String(state.filterOpen));
  syncFamilyProfile();
}

function setFilterPanelOpen(open, { restoreFocus = false } = {}) {
  state.filterOpen = Boolean(open);
  syncFilterPanel();
  if (restoreFocus) filterButtonEl.focus();
}

function selectMapItem(id) {
  state.selectedId = id;
  const item = outings.find((outing) => outing.id === id);
  const preview = document.querySelector("#mapPreview");
  const trust = trustStatus(item);
  const distance = distanceFor(item);
  preview.hidden = false;
  preview.innerHTML = `<button type="button" aria-label="${escapeHtml(item.name)} 상세 보기"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(displayTimeLabel(item, { detail: true }))}, ${distance.toFixed(1)} mi<br />${escapeHtml(trust.short)}</span></button>`;
  preview.querySelector("button").addEventListener("click", () => openDetail(id));
  renderMap(filteredOutings());
}

function render() {
  remotePlaceImageObserver?.disconnect();
  const baseItems = filteredOutings({ ignoreSfVenue: true });
  const branchContext = sfBranchContext(baseItems);
  if (!branchContext || (state.sfVenue !== "all" && !branchContext.options.some((option) => option.venueName === state.sfVenue))) {
    state.sfVenue = "all";
  }
  const items = state.sfVenue === "all"
    ? baseItems
    : baseItems.filter((item) => item.city === "San Francisco" && item.venueName === state.sfVenue);
  const sharedMode = isSharedPlanMode();
  syncMobileMoment();
  const summaries = {
    today: ["오늘의 추천", "낮잠 전에 다녀오기 좋은 가까운 곳"],
    tomorrow: ["내일의 추천", "내일 일정과 언제든 갈 수 있는 곳"],
    week: ["이번 주 추천", "평일 루틴에 넣기 좋은 곳"],
    weekend: ["이번 주말 추천", "가족이 함께 다녀오기 좋은 곳"],
    nextweek: [nextWeekRangeLabel(), "다음 주에 열리는 유아 친화 행사"],
    anytime: ["전체 추천", "날짜에 구애받지 않고 가볼 만한 곳"]
  };
  const [eyebrow, title] = sharedMode
    ? [state.sharedPlan?.canEdit ? "함께 편집하는 계획" : "함께 정하는 계획", state.sharedPlan?.title || "가족 주말 계획"]
    : state.savedOnly
      ? ["저장한 일정", "우리 가족 주말 계획"]
      : state.discoveryMode === "places"
        ? ["상시 나들이", "시간 맞출 필요 없이 갈 수 있는 곳"]
        : summaries[state.date];
  summaryEyebrowEl.textContent = eyebrow;
  summaryTitleEl.textContent = title;
  document.title = sharedMode && state.sharedPlan ? `${state.sharedPlan.title} | Little Weekends` : "Little Weekends Bay Area";
  summaryEl.textContent = sharedMode
    ? state.sharedPlanLoading ? "계획을 불러오고 있어요." : `${items.length}개 일정을 함께 보고 있어요.`
    : state.savedOnly
      ? `${items.length}개 일정을 날짜별로 정리했어요.`
      : `${items.length}개 후보를 찾았어요.`;
  document.querySelector("#filterResultCount").textContent = items.length;
  const filterCount = activeFilterCount();
  const filterCountEl = document.querySelector("#filterCount");
  filterCountEl.textContent = filterCount;
  filterCountEl.hidden = filterCount === 0;
  document.querySelector("#savedCount").textContent = state.saved.size;
  document.querySelector("#mobileSavedCount").textContent = state.saved.size;
  document.querySelector("#locationName").textContent = selectedLocation().name;
  document.querySelector("#mapLocationLabel").textContent = `${selectedLocation().name} 중심`;
  const contextParts = [
    sharedMode ? "공유 계획" : state.savedOnly ? "저장한 곳" : `${selectedLocation().name} 중심`,
    state.discoveryMode === "places" && !sharedMode && !state.savedOnly ? "행사 없어도 갈 곳" : dateLabel()
  ];
  if (!sharedMode && !state.savedOnly) contextParts.push(familyAgeSummary());
  if (state.region !== "all") contextParts.push(regionLabels[state.region]);
  if (state.time !== "all") contextParts.push({ morning: "오전", afternoon: "오후", evening: "저녁" }[state.time]);
  document.querySelector("#listContext").textContent = contextParts.join(" / ");
  document.querySelectorAll("[data-location-key]").forEach((button) => {
    const active = button.dataset.locationKey === state.locationKey;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelector(".hero").hidden = sharedMode;
  document.querySelector(".discovery").hidden = sharedMode;
  document.querySelector(".mobile-nav").hidden = sharedMode;
  document.querySelector("#locationButton").hidden = sharedMode;
  document.querySelector("#saveToggle span").textContent = sharedMode ? "내 저장" : "저장";
  document.querySelector("#saveToggle").setAttribute("aria-label", sharedMode ? "내 저장 일정으로 이동" : "저장한 일정 보기");
  document.querySelector("#saveToggle").classList.toggle("is-active", !sharedMode && state.savedOnly);
  document.querySelector("#saveToggle").setAttribute("aria-pressed", String(!sharedMode && state.savedOnly));
  if (sharedMode) syncStatusEl.textContent = state.sharedPlan ? `${planUpdatedLabel(state.sharedPlan.updatedAt)} 업데이트` : "공유 계획 확인 중";
  const visibleView = sharedMode || state.savedOnly ? "list" : state.view;
  document.querySelector(".toolbar").hidden = sharedMode || state.savedOnly;
  if (sharedMode || state.savedOnly) state.filterOpen = false;
  syncFilterPanel();
  document.querySelector(".section-heading").hidden = sharedMode || state.savedOnly;
  contentGrid.className = `content-grid is-${visibleView}${sharedMode || state.savedOnly ? " is-plan" : ""}${sharedMode ? " is-shared-plan" : ""}`;
  document.querySelectorAll("[data-view]").forEach((button) => {
    const active = button.dataset.view === visibleView;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll("[data-mobile-action]").forEach((button) => {
    const active = button.dataset.mobileAction === state.mobileSection;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderChildAgeRows();
  renderCards(items, branchContext);
  const shouldRenderMap = visibleView === "map" || visibleView === "split";
  if (!sharedMode && shouldRenderMap) {
    renderMap(items);
  } else {
    mapEl.replaceChildren();
    const mapPreview = document.querySelector("#mapPreview");
    mapPreview.hidden = true;
    mapPreview.replaceChildren();
  }
  if (!sharedMode) void loadCommunityPhotos(items);
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
    if (payload.status === "ok") {
      const validIds = new Set(outings.map((item) => item.id));
      const currentSavedIds = [...state.saved];
      state.saved = new Set(currentSavedIds.filter((id) => validIds.has(id)));
      if (state.saved.size !== currentSavedIds.length) {
        persistSaved();
        currentSavedIds.filter((id) => !state.saved.has(id)).forEach((id) => queuePublishedPlanItemChange(id, false));
      }
    }
    syncStatusEl.textContent = payload.status === "ok"
      ? `${syncTimeLabel(payload.lastSyncedAt)} · 공식 수집처 ${activeSources}곳`
      : `일부 출처 갱신 지연 · 현재 ${activeSources}/${sourceCount}곳 반영`;
    render();
    openPendingOuting();
  } catch {
    outings = [...staticOutings, ...catalogEvergreenOutings];
    syncStatusEl.textContent = "자동 확인 지연 · 기존 확인 목록 표시 중";
    render();
  }
}

function toggleSaved(id) {
  const item = findOutingById(id);
  if (!item) return;
  const firstSave = !state.saved.has(id) && state.saved.size === 0;
  if (state.saved.has(id)) {
    state.saved.delete(id);
    showToast(`${item.name} 저장을 해제했어요.`);
  } else {
    state.saved.add(id);
    showToast(`${item.name}을 저장했어요.`, firstSave ? {
      label: "계획 보기",
      run: () => {
        state.savedOnly = true;
        state.view = "list";
        state.mobileSection = "saved";
        render();
        document.querySelector("#cards").scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } : null);
  }
  persistSaved();
  render();
  queuePublishedPlanItemChange(id, state.saved.has(id));
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
  const shareUrl = deepLinkUrl(publicPageUrl(), item.id);
  const shareData = {
    title: item.name,
    text: `${item.name}\n${displayTimeLabel(item, { detail: true })}\n${item.venueName || item.city}${item.address ? `\n${item.address}` : ""}`,
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

function openPendingOuting() {
  if (!pendingOutingId || !findOutingById(pendingOutingId)) return;
  const id = pendingOutingId;
  pendingOutingId = null;
  state.selectedId = id;
  openDetail(id);
}

function clearDetailUrl() {
  const cleanUrl = clearDeepLinkUrl(window.location.href);
  window.history.replaceState(null, "", cleanUrl);
  state.selectedId = null;
}

function amenityRow(label, amenity) {
  const status = amenity?.status === "confirmed" ? "confirmed" : "unknown";
  return `<div class="note-row ${status}"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(amenity?.text || "확인되지 않음")}</span></div>`;
}

function detailLocationMarkup(item) {
  const venue = item.venueName || "세부 위치 확인 중";
  const address = item.address || "세부 위치 확인 중";
  const copyAction = item.address
    ? '<button class="secondary-action detail-copy-address" id="copyAddress" type="button">주소 복사</button>'
    : "";
  return `
    <section class="detail-location" aria-labelledby="detailLocationTitle">
      <div><small id="detailLocationTitle">장소</small><strong>${escapeHtml(venue)}</strong><span class="${item.address ? "" : "is-pending"}">${escapeHtml(address)}</span></div>
      ${copyAction}
    </section>
  `;
}

function privatePlaceNoteMarkup(item) {
  if (!item.placeKey) return "";
  const note = placeNoteFor(item);
  return `
    <section class="private-place-note" aria-labelledby="privateNoteTitle">
      <div class="private-note-heading">
        <div><h3 id="privateNoteTitle">나만의 메모</h3><p>이 브라우저에만 저장돼요. 공유 링크나 서버에는 포함되지 않지만, 같은 브라우저 프로필을 쓰는 사람에게는 보일 수 있어요.</p></div>
        ${note ? '<span>메모 있음</span>' : ""}
      </div>
      <textarea id="placeNoteInput" maxlength="500" placeholder="다녀온 뒤 기억할 점을 간단히 적어보세요. 예: 뒤쪽 주차장이 한적했어요.">${escapeHtml(note?.text || "")}</textarea>
      <div class="private-note-actions">
        <small><b id="placeNoteCount">${String(note?.text || "").length}</b>/500</small>
        ${note ? '<button class="text-button is-danger" id="deletePlaceNote" type="button">메모 삭제</button>' : ""}
        <button class="secondary-action" id="savePlaceNote" type="button">메모 저장</button>
      </div>
    </section>`;
}

function communityPhotoGalleryMarkup(item) {
  const photos = Array.isArray(item.communityPhotos) ? item.communityPhotos : [];
  if (!photos.length) return "";
  return `
    <section class="community-photo-gallery" aria-labelledby="communityPhotosTitle">
      <h3 id="communityPhotosTitle">방문자 장소 사진</h3>
      <div class="community-photo-grid">${photos.slice(0, 6).map((photo) => `<figure><img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt)}" loading="lazy" /><figcaption>${photo.capturedAt ? `${escapeHtml(photo.capturedAt)} · ` : ""}<button class="photo-attribution-report" type="button" data-report-photo="${escapeHtml(photo.id)}">신고</button></figcaption></figure>`).join("")}</div>
      <p>제출자의 공개 동의를 확인하고 운영자가 장소 관련성을 검수한 사진이에요.</p>
    </section>`;
}

function detailPhotoContributeMarkup(item) {
  if (!item.placeKey) return "";
  const hasActual = itemImageKind(item) === "actual";
  return `
    <section class="detail-photo-contribute" hidden>
      <div><strong>${hasActual ? "이 장소의 최근 사진이 있나요?" : "이 장소의 실제 사진을 찾고 있어요"}</strong><span>직접 촬영한 사진을 올리면 검수 후 장소 사진으로 공개할 수 있어요.</span></div>
      <button class="secondary-action" id="uploadPlacePhoto" type="button" disabled>업로드 확인 중</button>
    </section>`;
}

function ageEvidenceMarkup(item) {
  if (!item.ageEvidence?.url) return "";
  const basisLabel = {
    official_program: "공식 프로그램 대상",
    official_facility: "공식 시설 안내",
    official_audience: "공식 이용 대상",
    editorial_review: "공식 자료 기반 편집 검토",
  }[item.ageEvidence.basis] || "공식 자료 기반 검토";
  const reviewed = item.ageEvidence.verifiedAt
    ? new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "short", day: "numeric", timeZone: "America/Los_Angeles" }).format(new Date(`${item.ageEvidence.verifiedAt}T12:00:00-07:00`))
    : "검토일 확인 중";
  return `<div class="age-evidence"><span><strong>연령 근거</strong><small>${escapeHtml(basisLabel)} · ${escapeHtml(reviewed)}</small></span><p>${escapeHtml(item.ageEvidence.summary)}</p><a href="${escapeHtml(item.ageEvidence.url)}" target="_blank" rel="noopener noreferrer">근거 확인</a></div>`;
}

function openDetail(id) {
  const item = findOutingById(id);
  if (!item) return;

  window.history.replaceState(null, "", deepLinkUrl(window.location.href, id));

  const isSaved = state.saved.has(id);
  const trust = trustStatus(item);
  const distance = distanceFor(item);
  const detailUrl = deepLinkUrl(publicPageUrl(), item.id);
  const directions = item.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`
    : "";
  const directionsAction = directions
    ? `<a class="primary-action decision-directions" href="${escapeHtml(directions)}" target="_blank" rel="noopener noreferrer">길찾기</a>`
    : '<button class="secondary-action decision-directions" type="button" disabled>길찾기 준비 중</button>';
  const sourceAction = item.source
    ? `<a class="secondary-action decision-source" href="${escapeHtml(item.source)}" target="_blank" rel="noopener noreferrer">${trust.key === "verified" || trust.key === "source-confirmed" ? "공식 정보 보기" : "공식 일정 확인"}</a>`
    : "";
  const calendarHref = buildCalendarUrl(item, detailUrl);
  const calendarAction = calendarHref
    ? `<a class="secondary-action decision-calendar" id="calendarDetail" href="${escapeHtml(calendarHref)}" target="_blank" rel="noopener noreferrer">캘린더에 추가</a>`
    : "";
  const placeFeatures = placeFeatureLabels(item);
  const placeFeaturesMarkup = placeFeatures.length
    ? `<div class="detail-place-features" aria-label="장소 특징">${placeFeatures.map((feature) => `<span>${escapeHtml(feature)}</span>`).join("")}</div>`
    : "";
  const decisionMarkup = item.startDate
    ? `<div class="decision-item"><small>언제</small><strong>${escapeHtml(displayTimeLabel(item))}</strong></div><div class="decision-item"><small>거리</small><strong>${distance.toFixed(1)} mi</strong></div><div class="decision-item"><small>연령</small><strong>${escapeHtml(item.age)}</strong></div><div class="decision-item"><small>환경</small><strong>${item.setting === "indoor" ? "실내" : "야외"}</strong></div><div class="decision-item"><small>비용</small><strong>${priceLabel(item.price)}</strong></div><div class="decision-item"><small>예약</small><strong>${escapeHtml(item.reservation)}</strong></div>`
    : `<div class="decision-item"><small>운영</small><strong>${escapeHtml(displayTimeLabel(item, { detail: true }))}</strong></div><div class="decision-item"><small>거리</small><strong>${distance.toFixed(1)} mi</strong></div><div class="decision-item"><small>연령</small><strong>${escapeHtml(item.age)}</strong></div><div class="decision-item"><small>환경</small><strong>${item.setting === "indoor" ? "실내" : "야외"}</strong></div><div class="decision-item"><small>비용</small><strong>${priceLabel(item.price)}</strong></div><div class="decision-item"><small>방문</small><strong>${escapeHtml(item.reservation)}</strong></div>`;
  const alternatives = nearbyAlternatives(item);
  const alternativesMarkup = alternatives.map((alternative) => {
    const nearbyDistance = alternative.location && item.location ? distanceBetweenMiles(item.location, alternative.location) : distanceFor(alternative);
    return `<button class="alternative-button" data-alternative-id="${escapeHtml(alternative.id)}" type="button"><span><strong>${escapeHtml(alternative.name)}</strong><small>${escapeHtml(alternative.city)} · ${nearbyDistance.toFixed(1)} mi</small></span><b>보기</b></button>`;
  }).join("");
  const imageCaption = itemImageAttribution(item);
  detailBody.innerHTML = `
    <figure class="detail-visual"><div class="detail-image"><img src="${itemImage(item, { detail: true })}" alt="${escapeHtml(itemImageAlt(item))}" class="${itemImageClass(item)}" data-outing-image-id="${escapeHtml(item.id)}" data-image-layout="detail" /><span class="${itemImageBadgeClass(item)}"${["google_places", "streetview"].includes(effectiveItemImage(item)?.provider) ? ' translate="no"' : ""}>${escapeHtml(itemImageCaption(item))}</span></div><figcaption>${imageCaption}</figcaption></figure>
    <article class="detail-body">
      <div class="detail-title"><p class="detail-category">${escapeHtml(typeLabel(item.type))}, ${escapeHtml(item.city)}</p><h2>${escapeHtml(item.name)}</h2><p>${escapeHtml(item.why)}</p></div>
      ${detailLocationMarkup(item)}
      ${placeFeaturesMarkup}
      <div class="decision-grid">${decisionMarkup}</div>
      <div class="trust-panel ${trust.key}"><strong>${escapeHtml(trust.short)}</strong><span>${escapeHtml(trust.detail)}</span></div>
      ${ageEvidenceMarkup(item)}
      ${communityPhotoGalleryMarkup(item)}
      <div class="detail-notes">
        ${amenityRow("주차", item.amenities?.parking)}${amenityRow("화장실", item.amenities?.bathroom)}${amenityRow("기저귀 교환대", item.amenities?.changingTable)}${amenityRow("유모차", item.amenities?.stroller)}<div class="note-row"><strong>예상 체류</strong><span>${item.type === "storytime" ? "30-60분" : "60-90분"} 정도를 추천해요.</span></div><div class="note-row"><strong>날씨 대응</strong><span>${item.setting === "indoor" ? "실내 활동이라 비 오는 날에도 좋아요." : "출발 전 기온과 공원 운영 상태를 확인하세요."}</span></div>
      </div>
      ${privatePlaceNoteMarkup(item)}
      ${detailPhotoContributeMarkup(item)}
      <section class="nearby-alternatives" aria-labelledby="nearbyTitle"><h3 id="nearbyTitle">가까운 대안</h3><div class="alternative-list">${alternativesMarkup}</div></section>
      <div class="detail-actions">
        ${directionsAction}${sourceAction}${calendarAction}<button class="secondary-action decision-share" type="button" id="shareDetail">공유</button><button class="secondary-action decision-save" type="button" id="saveDetail">${isSaved ? "저장됨" : "저장"}</button>
      </div>
    </article>
  `;

  bindOutingImageFailure(detailBody.querySelector("[data-outing-image-id]"), item);
  scheduleRemotePlaceImage(item);
  detailBody.querySelector("#saveDetail").addEventListener("click", () => { toggleSaved(id); openDetail(id); });
  detailBody.querySelector("#shareDetail").addEventListener("click", () => shareOuting(item));
  detailBody.querySelector("#copyAddress")?.addEventListener("click", async () => {
    await copyText(item.address);
    showToast("주소를 복사했어요.");
  });
  const placeNoteInput = detailBody.querySelector("#placeNoteInput");
  placeNoteInput?.addEventListener("input", () => {
    detailBody.querySelector("#placeNoteCount").textContent = placeNoteInput.value.length;
  });
  detailBody.querySelector("#savePlaceNote")?.addEventListener("click", () => {
    const text = placeNoteInput.value.trim();
    if (text) state.placeNotesByKey[item.placeKey] = { text: text.slice(0, 500), updatedAt: new Date().toISOString() };
    else delete state.placeNotesByKey[item.placeKey];
    persistPlaceNotes();
    showToast(text ? "이 기기에 메모를 저장했어요." : "빈 메모를 정리했어요.");
    openDetail(id);
    render();
  });
  detailBody.querySelector("#deletePlaceNote")?.addEventListener("click", () => {
    delete state.placeNotesByKey[item.placeKey];
    persistPlaceNotes();
    showToast("메모를 삭제했어요.");
    openDetail(id);
    render();
  });
  detailBody.querySelector("#calendarDetail")?.addEventListener("click", () => showToast("캘린더 추가 화면을 열고 있어요."));
  detailBody.querySelectorAll("[data-report-photo]").forEach((button) => button.addEventListener("click", () => openPhotoReport(button.dataset.reportPhoto, item.placeKey)));
  const uploadPhotoButton = detailBody.querySelector("#uploadPlacePhoto");
  if (uploadPhotoButton) {
    void photoUploadsAvailable().then((available) => {
      if (!uploadPhotoButton.isConnected) return;
      const section = uploadPhotoButton.closest(".detail-photo-contribute");
      if (!available) {
        section.remove();
        return;
      }
      section.hidden = false;
      uploadPhotoButton.disabled = false;
      uploadPhotoButton.textContent = itemImageKind(item) === "actual" ? "사진 추가" : "이 장소 사진 올리기";
      uploadPhotoButton.addEventListener("click", () => openPhotoUploadDialog(item));
    });
  }
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
    setFilterPanelOpen(false);
    document.querySelectorAll(".quick-card").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    state.discoveryMode = "mixed";
    state.date = button.dataset.date;
    if (state.date === "nextweek") {
      state.savedOnly = false;
      state.distance = "10";
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
      document.querySelector("#distanceFilter").value = "10";
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
    setFilterPanelOpen(false);
    const [key] = ["setting", "price", "distance"].filter((name) => button.dataset[name]);
    document.querySelectorAll(".quick-card").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    if (state.discoveryMode === "places") {
      state.date = "today";
      document.querySelector("#dateFilter").value = "today";
    }
    state.discoveryMode = "mixed";
    state[key] = button.dataset[key];
    document.querySelector(`#${key}Filter`).value = state[key];
    render();
  });
});

document.querySelector("[data-discovery='places']").addEventListener("click", (event) => {
  setFilterPanelOpen(false);
  document.querySelectorAll(".quick-card").forEach((item) => item.classList.remove("is-active"));
  event.currentTarget.classList.add("is-active");
  state.savedOnly = false;
  state.discoveryMode = "places";
  state.date = "anytime";
  state.time = "all";
  state.reservation = "all";
  state.sort = "recommended";
  state.sfVenue = "all";
  state.mobileSection = "home";
  document.querySelector("#dateFilter").value = "anytime";
  document.querySelector("#timeFilter").value = "all";
  document.querySelector("#reservationFilter").value = "all";
  document.querySelector("#sortSelect").value = "recommended";
  render();
});

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    setFilterPanelOpen(false);
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
    setFilterPanelOpen(false);
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

document.querySelector("#dateFilter").addEventListener("change", (event) => {
  state.discoveryMode = "mixed";
  state.date = event.target.value;
  document.querySelectorAll(".quick-card").forEach((item) => item.classList.toggle("is-active", item.dataset.date === state.date));
  render();
});

document.querySelector("#distanceFilter").addEventListener("change", (event) => {
  state.distance = event.target.value;
  render();
});

document.querySelector("#regionFilter").addEventListener("change", (event) => {
  state.region = event.target.value;
  render();
});

document.querySelector("#addChildAge").addEventListener("click", () => {
  if (state.childAgesMonths.length >= 8 || pendingChildAgeDraft) {
    if (pendingChildAgeDraft) document.querySelector("[data-draft-years]")?.focus();
    else showToast("아이 나이는 최대 8명까지 추가할 수 있어요.");
    return;
  }
  pendingChildAgeDraft = { years: "", months: "" };
  renderChildAgeRows();
  document.querySelector("[data-draft-years]")?.focus();
});

document.querySelector("#clearFamilyAges").addEventListener("click", () => {
  if (!state.childAgesMonths.length && !pendingChildAgeDraft) {
    showToast("저장된 가족 나이가 없어요.");
    return;
  }
  state.childAgesMonths = [];
  pendingChildAgeDraft = null;
  persistChildAges();
  render();
  showToast("이 브라우저의 가족 나이를 모두 지웠어요.");
});

document.querySelector("#clearPlaceNotes").addEventListener("click", () => {
  const noteCount = Object.keys(state.placeNotesByKey).length;
  if (!noteCount) {
    showToast("저장된 개인 메모가 없어요.");
    return;
  }
  if (!window.confirm(`이 브라우저에 저장된 개인 메모 ${noteCount}개를 모두 삭제할까요?`)) return;
  state.placeNotesByKey = {};
  persistPlaceNotes();
  render();
  showToast("이 브라우저의 개인 메모를 모두 삭제했어요.");
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
  setFilterPanelOpen(false);
  if (isSharedPlanMode()) {
    leaveSharedPlan(true);
    return;
  }
  state.savedOnly = !state.savedOnly;
  if (state.savedOnly) state.view = "list";
  state.mobileSection = state.savedOnly ? "saved" : "home";
  render();
});

function resetFilters() {
  state.savedOnly = false;
  state.mobileSection = "home";
  state.date = "today";
  state.distance = "10";
  state.region = "all";
  state.childAgesMonths = [];
  pendingChildAgeDraft = null;
  persistChildAges();
  state.type = "all";
  state.setting = "all";
  state.price = "all";
  state.time = "all";
  state.reservation = "all";
  state.bathroomKnown = false;
  state.strollerKnown = false;
  state.sfVenue = "all";
  state.discoveryMode = "mixed";
  state.search = "";
  document.querySelector("#dateFilter").value = "today";
  document.querySelector("#distanceFilter").value = "10";
  document.querySelector("#regionFilter").value = "all";
  renderChildAgeRows();
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
filterButtonEl.addEventListener("click", () => setFilterPanelOpen(!state.filterOpen));
familyProfileButton.addEventListener("click", () => {
  setFilterPanelOpen(true);
  document.querySelector("#addChildAge").focus();
  document.querySelector("#filterPanel").scrollIntoView({ behavior: "smooth", block: "nearest" });
});
document.querySelector("#closeFilters").addEventListener("click", () => setFilterPanelOpen(false, { restoreFocus: true }));
document.querySelector("#applyFilters").addEventListener("click", () => {
  setFilterPanelOpen(false, { restoreFocus: true });
  document.querySelector("#cards").scrollIntoView({ behavior: "smooth", block: "start" });
});
document.querySelector("#searchToggle").addEventListener("click", () => {
  const panel = document.querySelector("#searchPanel");
  panel.hidden = !panel.hidden;
  if (!panel.hidden) setFilterPanelOpen(false);
  state.mobileSection = panel.hidden ? "home" : "search";
  document.querySelector("#searchToggle").setAttribute("aria-expanded", String(!panel.hidden));
  render();
  if (!panel.hidden) document.querySelector("#searchInput").focus();
});

document.querySelector("#locationButton").addEventListener("click", () => {
  setFilterPanelOpen(false);
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

document.querySelector("#closeSharePlanDialog").addEventListener("click", () => sharePlanDialog.close());
sharePlanDialog.addEventListener("click", (event) => { if (event.target === sharePlanDialog) sharePlanDialog.close(); });

document.querySelectorAll("[data-feedback-open]").forEach((button) => button.addEventListener("click", openFeedbackDialog));
document.querySelectorAll("[data-feedback-close]").forEach((button) => button.addEventListener("click", () => feedbackDialog.close()));
feedbackDialog.addEventListener("click", (event) => { if (event.target === feedbackDialog) feedbackDialog.close(); });
feedbackDialog.addEventListener("close", () => setFeedbackBackgroundInert(false));
feedbackForm.addEventListener("submit", submitFeedback);
feedbackForm.querySelectorAll(".feedback-field input, .feedback-field textarea").forEach((field) => {
  field.addEventListener("blur", () => {
    feedbackTouched.add(field.id);
    validateFeedbackField(field);
  });
  field.addEventListener("input", () => {
    if (feedbackTouched.has(field.id)) validateFeedbackField(field);
    if (feedbackSubmit.dataset.state === "error") {
      feedbackSubmit.removeAttribute("data-state");
      feedbackSubmit.querySelector(".feedback-submit-label").textContent = "의견 보내기";
      feedbackStatus.textContent = "";
    }
  });
});

document.querySelector("#placePhotoFile").addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
  photoPreviewUrl = "";
  if (!file) {
    photoPreview.hidden = true;
    photoPreviewImage.removeAttribute("src");
    return;
  }
  photoPreviewUrl = URL.createObjectURL(file);
  photoPreviewImage.src = photoPreviewUrl;
  photoPreview.hidden = false;
  photoUploadStatus.textContent = "";
  photoUploadStatus.classList.remove("is-error");
});
photoUploadForm.addEventListener("submit", submitPlacePhoto);
document.querySelectorAll("[data-photo-upload-close]").forEach((button) => button.addEventListener("click", () => photoUploadDialog.close()));
photoUploadDialog.addEventListener("click", (event) => { if (event.target === photoUploadDialog) photoUploadDialog.close(); });
photoUploadDialog.addEventListener("close", () => {
  setPhotoUploadBackgroundInert(false);
  if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
  photoPreviewUrl = "";
  activePhotoUploadItem = null;
});

document.querySelector("#closeDialog").addEventListener("click", () => {
  detailDialog.close();
});

detailDialog.addEventListener("click", (event) => { if (event.target === detailDialog) detailDialog.close(); });
detailDialog.addEventListener("close", clearDetailUrl);

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible") return;
  if (state.sharedPlan) loadSharedPlan(true);
  else render();
});

mobileSearchMedia.addEventListener("change", syncResponsiveSearch);
window.setInterval(() => {
  if (document.visibilityState === "visible" && !state.savedOnly && !state.sharedPlan) render();
}, 60000);

syncResponsiveSearch();
render();
openPendingOuting();
loadAutomaticOutings();
if (sharedPlanToken) loadSharedPlan();
