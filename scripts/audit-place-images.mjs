const DEFAULT_LIMIT = 6;
const COMMONS_API = "https://commons.wikimedia.org/w/api.php";
const allowedLicenses = new Set([
  "CC0",
  "Public domain",
  "CC BY 2.0",
  "CC BY 3.0",
  "CC BY 4.0",
  "CC BY-SA 2.0",
  "CC BY-SA 3.0",
  "CC BY-SA 4.0",
]);

globalThis.window = {};
await import("../evergreen-outings.js");
await import("../park-expansion.js");

const args = new Map();
for (const entry of process.argv.slice(2)) {
  const [key, value = ""] = entry.split("=", 2);
  args.set(key, value);
}

const requestedIds = new Set(String(args.get("--ids") || "").split(",").filter(Boolean));
const limit = Math.max(1, Math.min(20, Number(args.get("--limit")) || DEFAULT_LIMIT));
const geoSearch = args.get("--geo") === "1";
const allPlaces = Array.isArray(window.LITTLE_WEEKENDS_EVERGREEN) ? window.LITTLE_WEEKENDS_EVERGREEN : [];
const places = requestedIds.size ? allPlaces.filter((place) => requestedIds.has(place.id)) : allPlaces;

function plainText(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

async function commonsCandidates(place) {
  const params = new URLSearchParams({
    action: "query",
    prop: "imageinfo|coordinates|categories",
    iiprop: "url|mime|size|extmetadata",
    iiurlwidth: "1200",
    cllimit: "30",
    format: "json",
    origin: "*",
  });
  if (geoSearch && place.location) {
    params.set("generator", "geosearch");
    params.set("ggscoord", `${place.location.lat}|${place.location.lng}`);
    params.set("ggsnamespace", "6");
    params.set("ggsradius", "400");
    params.set("ggslimit", String(limit * 3));
  } else {
    params.set("generator", "search");
    params.set("gsrsearch", `"${place.name}" ${place.city} California`);
    params.set("gsrnamespace", "6");
    params.set("gsrlimit", String(limit * 2));
  }
  const response = await fetch(`${COMMONS_API}?${params}`, {
    headers: { "user-agent": "Little Weekends image audit/1.0 (licensed-place-photo research)" },
  });
  if (!response.ok) throw new Error(`Commons request failed with ${response.status}`);
  const payload = await response.json();
  return Object.values(payload.query?.pages || {})
    .map((page) => {
      const info = page.imageinfo?.[0];
      const metadata = info?.extmetadata || {};
      const license = plainText(metadata.LicenseShortName?.value);
      return {
        pageId: page.pageid,
        title: page.title,
        description: plainText(metadata.ImageDescription?.value),
        creator: plainText(metadata.Artist?.value || metadata.Attribution?.value),
        license,
        licenseUrl: metadata.LicenseUrl?.value || "",
        sourceUrl: info?.descriptionurl || "",
        imageUrl: info?.thumburl || info?.url || "",
        width: info?.thumbwidth || info?.width || 0,
        height: info?.thumbheight || info?.height || 0,
        coordinates: page.coordinates?.[0]
          ? { lat: page.coordinates[0].lat, lng: page.coordinates[0].lon }
          : null,
        categories: (page.categories || []).map((category) => category.title.replace(/^Category:/, "")),
      };
    })
    .filter((candidate) => (
      candidate.imageUrl
      && candidate.width >= 800
      && candidate.height >= 500
      && allowedLicenses.has(candidate.license)
    ))
    .slice(0, limit);
}

const results = [];
for (const place of places) {
  try {
    results.push({
      id: place.id,
      name: place.name,
      city: place.city,
      location: place.location,
      candidates: await commonsCandidates(place),
    });
  } catch (error) {
    results.push({
      id: place.id,
      name: place.name,
      city: place.city,
      location: place.location,
      candidates: [],
      error: error instanceof Error ? error.message : String(error),
    });
  }
  await new Promise((resolve) => setTimeout(resolve, 350));
}

process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
