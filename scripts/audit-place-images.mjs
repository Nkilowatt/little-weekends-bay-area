import { writeFile } from "node:fs/promises";

const DEFAULT_LIMIT = 6;
const DEFAULT_PAUSE_MS = 1100;
const COMMONS_API = "https://commons.wikimedia.org/w/api.php";
const OPENVERSE_API = "https://api.openverse.org/v1/images/";
const USER_AGENT = "Little Weekends image audit/2.0 (open-license venue photo research)";
const allowedCommonsLicenses = new Set([
  "CC0",
  "Public domain",
  "CC BY 2.0",
  "CC BY 3.0",
  "CC BY 4.0",
  "CC BY-SA 2.0",
  "CC BY-SA 3.0",
  "CC BY-SA 4.0",
]);
const allowedOpenverseLicenses = new Set(["cc0", "pdm", "by", "by-sa"]);
const genericTokens = new Set([
  "area",
  "branch",
  "california",
  "center",
  "central",
  "childrens",
  "city",
  "county",
  "downtown",
  "family",
  "library",
  "main",
  "park",
  "place",
  "playground",
  "public",
  "regional",
  "the",
]);

globalThis.window = {};
await import("../evergreen-outings.js");
await import("../park-expansion.js");
await import("../place-images.js");

const args = new Map();
for (const entry of process.argv.slice(2)) {
  const [key, value = ""] = entry.split("=", 2);
  args.set(key, value);
}

const requestedIds = new Set(String(args.get("--ids") || "").split(",").filter(Boolean));
const limit = Math.max(1, Math.min(20, Number(args.get("--limit")) || DEFAULT_LIMIT));
const pauseMs = Math.max(250, Number(args.get("--pause-ms")) || DEFAULT_PAUSE_MS);
const includeRegistered = args.get("--include-registered") === "1";
const outputPath = String(args.get("--output") || "");
const providerNames = new Set(
  String(args.get("--providers") || "commons,openverse")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
);
const allPlaces = Array.isArray(window.LITTLE_WEEKENDS_EVERGREEN) ? window.LITTLE_WEEKENDS_EVERGREEN : [];
const registeredImages = window.LITTLE_WEEKENDS_PLACE_IMAGES || {};
const places = allPlaces.filter((place) => (
  (!requestedIds.size || requestedIds.has(place.id))
  && (includeRegistered || !registeredImages[place.id])
));

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function plainText(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function normalize(value) {
  return plainText(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function venueName(place) {
  return String(place.name || "")
    .replace(/\s+Family Place$/i, "")
    .replace(/\s+Playgrounds?$/i, "")
    .trim();
}

function significantTokens(value) {
  return normalize(value)
    .split(" ")
    .filter((token) => token.length >= 4 && !genericTokens.has(token));
}

function distanceMeters(from, to) {
  if (!from || !to) return null;
  const radians = (degrees) => degrees * Math.PI / 180;
  const lat1 = radians(from.lat);
  const lat2 = radians(to.lat);
  const deltaLat = radians(to.lat - from.lat);
  const deltaLng = radians(to.lng - from.lng);
  const a = Math.sin(deltaLat / 2) ** 2
    + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;
  return 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function scoreCandidate(place, candidate) {
  const reasons = [];
  const canonicalName = normalize(venueName(place));
  const fullName = normalize(place.name);
  const city = normalize(place.city);
  const haystack = normalize([
    candidate.title,
    candidate.description,
    ...(candidate.categories || []),
    ...(candidate.tags || []),
  ].join(" "));
  let score = 0;

  if (fullName && haystack.includes(fullName)) {
    score += 58;
    reasons.push("exact-name");
  } else if (canonicalName && haystack.includes(canonicalName)) {
    score += 52;
    reasons.push("canonical-name");
  }

  const nameTokens = significantTokens(venueName(place));
  const matchedTokens = nameTokens.filter((token) => haystack.includes(token));
  score += Math.min(24, matchedTokens.length * 6);
  if (matchedTokens.length) reasons.push(`name-tokens:${matchedTokens.join(",")}`);

  if (city && haystack.includes(city)) {
    score += 8;
    reasons.push("city");
  }

  const street = normalize(String(place.address || "").split(",")[0]);
  if (street && street.length >= 5 && haystack.includes(street)) {
    score += 12;
    reasons.push("street-address");
  }

  const distance = distanceMeters(place.location, candidate.coordinates);
  if (distance !== null) {
    if (distance <= 175) {
      score += 36;
      reasons.push("within-175m");
    } else if (distance <= 500) {
      score += 24;
      reasons.push("within-500m");
    } else if (distance <= 1500) {
      score += 8;
      reasons.push("within-1.5km");
    } else if (distance >= 10000) {
      score -= 45;
      reasons.push("over-10km-away");
    }
  }

  if (candidate.width >= candidate.height) {
    score += 5;
    reasons.push("landscape");
  }
  if (!candidate.creator) {
    score -= 8;
    reasons.push("missing-creator");
  }
  if (/\.(?:pdf|djvu)$/i.test(candidate.title || "")) {
    score -= 80;
    reasons.push("document-not-photo");
  }

  return {
    ...candidate,
    distanceMeters: distance === null ? null : Math.round(distance),
    score,
    confidence: score >= 70 ? "high" : score >= 45 ? "review" : "low",
    matchReasons: reasons,
  };
}

async function fetchJson(url, attempt = 0) {
  const response = await fetch(url, { headers: { "user-agent": USER_AGENT } });
  if ((response.status === 429 || response.status >= 500) && attempt < 4) {
    const retryAfter = Number(response.headers.get("retry-after"));
    const delay = Number.isFinite(retryAfter) && retryAfter > 0
      ? retryAfter * 1000
      : 1500 * (2 ** attempt);
    await wait(delay);
    return fetchJson(url, attempt + 1);
  }
  if (!response.ok) throw new Error(`request failed with ${response.status}`);
  return response.json();
}

async function commonsCandidates(place) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: `"${venueName(place)}" ${place.city} California`,
    gsrnamespace: "6",
    gsrlimit: String(limit * 3),
    prop: "imageinfo|coordinates|categories",
    iiprop: "url|mime|size|extmetadata",
    iiurlwidth: "1200",
    cllimit: "30",
    format: "json",
    origin: "*",
  });
  const payload = await fetchJson(`${COMMONS_API}?${params}`);
  return Object.values(payload.query?.pages || {})
    .map((page) => {
      const info = page.imageinfo?.[0];
      const metadata = info?.extmetadata || {};
      const license = plainText(metadata.LicenseShortName?.value);
      return {
        provider: "Wikimedia Commons",
        providerId: page.pageid,
        title: page.title,
        description: plainText(metadata.ImageDescription?.value),
        creator: plainText(metadata.Artist?.value || metadata.Attribution?.value),
        license,
        licenseUrl: metadata.LicenseUrl?.value || "",
        sourceUrl: info?.descriptionurl || "",
        imageUrl: info?.thumburl || info?.url || "",
        width: info?.thumbwidth || info?.width || 0,
        height: info?.thumbheight || info?.height || 0,
        mime: info?.mime || "",
        coordinates: page.coordinates?.[0]
          ? { lat: page.coordinates[0].lat, lng: page.coordinates[0].lon }
          : null,
        categories: (page.categories || []).map((category) => category.title.replace(/^Category:/, "")),
        needsOriginalSourceReview: false,
      };
    })
    .filter((candidate) => (
      candidate.imageUrl
      && candidate.mime.startsWith("image/")
      && candidate.width >= 800
      && candidate.height >= 500
      && allowedCommonsLicenses.has(candidate.license)
    ));
}

async function openverseCandidates(place) {
  const params = new URLSearchParams({
    q: `"${venueName(place)}" ${place.city} California`,
    license: [...allowedOpenverseLicenses].join(","),
    license_type: "commercial,modification",
    page_size: String(Math.min(20, limit * 3)),
  });
  const payload = await fetchJson(`${OPENVERSE_API}?${params}`);
  return (payload.results || [])
    .map((item) => ({
      provider: `Openverse / ${item.source || item.provider || "unknown"}`,
      providerId: item.id,
      title: item.title || "",
      description: "",
      creator: item.creator || "",
      license: [String(item.license || "").toUpperCase(), item.license_version].filter(Boolean).join(" "),
      licenseUrl: item.license_url || "",
      sourceUrl: item.foreign_landing_url || "",
      imageUrl: item.url || item.thumbnail || "",
      width: item.width || 0,
      height: item.height || 0,
      mime: item.filetype || "",
      coordinates: null,
      categories: [],
      tags: (item.tags || []).map((tag) => tag.name).filter(Boolean),
      needsOriginalSourceReview: true,
    }))
    .filter((candidate) => (
      candidate.imageUrl
      && candidate.width >= 800
      && candidate.height >= 500
    ));
}

async function providerCandidates(place) {
  const candidates = [];
  const errors = [];
  if (providerNames.has("commons")) {
    try {
      candidates.push(...await commonsCandidates(place));
    } catch (error) {
      errors.push(`commons: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  if (providerNames.has("openverse")) {
    try {
      candidates.push(...await openverseCandidates(place));
    } catch (error) {
      errors.push(`openverse: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  const uniqueCandidates = [...new Map(
    candidates.map((candidate) => [candidate.sourceUrl || candidate.imageUrl, candidate]),
  ).values()];
  return {
    candidates: uniqueCandidates
      .map((candidate) => scoreCandidate(place, candidate))
      .sort((left, right) => right.score - left.score)
      .slice(0, limit),
    errors,
  };
}

const results = [];
for (const [index, place] of places.entries()) {
  const { candidates, errors } = await providerCandidates(place);
  results.push({
    id: place.id,
    name: place.name,
    city: place.city,
    address: place.address,
    location: place.location,
    candidates,
    errors,
  });
  if (index < places.length - 1) await wait(pauseMs);
}

const audit = {
  generatedAt: new Date().toISOString(),
  providers: [...providerNames],
  placeCount: places.length,
  highConfidenceCandidateCount: results.reduce(
    (total, result) => total + result.candidates.filter((candidate) => candidate.confidence === "high").length,
    0,
  ),
  results,
};
const serialized = `${JSON.stringify(audit, null, 2)}\n`;

if (outputPath) await writeFile(outputPath, serialized, "utf8");
else process.stdout.write(serialized);
