import { copyFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const files = {
  "/": {
    path: "index.html",
    contentType: "text/html; charset=utf-8",
  },
  "/index.html": {
    path: "index.html",
    contentType: "text/html; charset=utf-8",
  },
  "/terms.html": {
    path: "terms.html",
    contentType: "text/html; charset=utf-8",
  },
  "/privacy.html": {
    path: "privacy.html",
    contentType: "text/html; charset=utf-8",
  },
  "/app.js": {
    path: "app.js",
    contentType: "application/javascript; charset=utf-8",
  },
  "/family-state.js": {
    path: "family-state.js",
    contentType: "application/javascript; charset=utf-8",
  },
  "/planning.js": {
    path: "planning.js",
    contentType: "application/javascript; charset=utf-8",
  },
  "/evergreen-outings.js": {
    path: "evergreen-outings.js",
    contentType: "application/javascript; charset=utf-8",
  },
  "/park-expansion.js": {
    path: "park-expansion.js",
    contentType: "application/javascript; charset=utf-8",
  },
  "/place-images.js": {
    path: "place-images.js",
    contentType: "application/javascript; charset=utf-8",
  },
  "/styles.css": {
    path: "styles.css",
    contentType: "text/css; charset=utf-8",
  },
  "/admin/photos.js": {
    path: "admin/photos.js",
    contentType: "application/javascript; charset=utf-8",
  },
  "/admin/photos.css": {
    path: "admin/photos.css",
    contentType: "text/css; charset=utf-8",
  },
  "/assets/fonts/yeon-sung-korean-400.woff2": {
    path: "assets/fonts/yeon-sung-korean-400.woff2",
    contentType: "font/woff2",
    binary: true,
  },
  "/assets/fonts/lee-seoyun-korean-400.woff2": {
    path: "assets/fonts/lee-seoyun-korean-400.woff2",
    contentType: "font/woff2",
    binary: true,
  },
  "/assets/bay-area-location-map.svg": {
    path: "assets/bay-area-location-map.svg",
    contentType: "image/svg+xml; charset=utf-8",
  },
  "/assets/photos/bay-family-hero.webp": {
    path: "assets/photos/bay-family-hero.webp",
    contentType: "image/webp",
    binary: true,
  },
  "/assets/photos/library-storytime.webp": {
    path: "assets/photos/library-storytime.webp",
    contentType: "image/webp",
    binary: true,
  },
  "/assets/photos/nature-playground.webp": {
    path: "assets/photos/nature-playground.webp",
    contentType: "image/webp",
    binary: true,
  },
  "/assets/photos/family-music-performance.webp": {
    path: "assets/photos/family-music-performance.webp",
    contentType: "image/webp",
    binary: true,
  },
  "/assets/photos/animal-encounter.webp": {
    path: "assets/photos/animal-encounter.webp",
    contentType: "image/webp",
    binary: true,
  },
  "/assets/photos/maker-activity.webp": {
    path: "assets/photos/maker-activity.webp",
    contentType: "image/webp",
    binary: true,
  },
  "/assets/photos/bubble-play.webp": {
    path: "assets/photos/bubble-play.webp",
    contentType: "image/webp",
    binary: true,
  },
  "/assets/mobile-moments/park-walk.jpg": {
    path: "assets/mobile-moments/park-walk.jpg",
    contentType: "image/jpeg",
    binary: true,
  },
  "/assets/mobile-moments/library-picture-book.jpg": {
    path: "assets/mobile-moments/library-picture-book.jpg",
    contentType: "image/jpeg",
    binary: true,
  },
  "/assets/mobile-moments/family-storytime.jpg": {
    path: "assets/mobile-moments/family-storytime.jpg",
    contentType: "image/jpeg",
    binary: true,
  },
  "/assets/mobile-moments/playground-morning.jpg": {
    path: "assets/mobile-moments/playground-morning.jpg",
    contentType: "image/jpeg",
    binary: true,
  },
  "/assets/mobile-moments/nature-trail.jpg": {
    path: "assets/mobile-moments/nature-trail.jpg",
    contentType: "image/jpeg",
    binary: true,
  },
  "/assets/mobile-moments/rainy-puddles.jpg": {
    path: "assets/mobile-moments/rainy-puddles.jpg",
    contentType: "image/jpeg",
    binary: true,
  },
  "/assets/mobile-moments/discovery-gallery.jpg": {
    path: "assets/mobile-moments/discovery-gallery.jpg",
    contentType: "image/jpeg",
    binary: true,
  },
  "/assets/mobile-moments/community-festival.jpg": {
    path: "assets/mobile-moments/community-festival.jpg",
    contentType: "image/jpeg",
    binary: true,
  },
  "/assets/mobile-moments/music-movement.jpg": {
    path: "assets/mobile-moments/music-movement.jpg",
    contentType: "image/jpeg",
    binary: true,
  },
  "/favicon.svg": {
    path: "favicon.svg",
    contentType: "image/svg+xml; charset=utf-8",
  },
  "/og.png": {
    path: "public/og.png",
    contentType: "image/png",
    binary: true,
  },
};

const placeImageContentTypes = {
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
};

const adminPhotosHtml = await readFile(join(root, "admin/photos.html"), "utf8");

for (const filename of await readdir(join(root, "assets/places"))) {
  const extension = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  if (!/^[a-z0-9-]+\.(?:jpe?g|webp)$/i.test(filename)) continue;
  files[`/assets/places/${filename}`] = {
    path: `assets/places/${filename}`,
    contentType: placeImageContentTypes[extension],
    binary: true,
  };
}

const catalogContext = { window: {} };
vm.runInNewContext(await readFile(join(root, "evergreen-outings.js"), "utf8"), catalogContext);
vm.runInNewContext(await readFile(join(root, "park-expansion.js"), "utf8"), catalogContext);
vm.runInNewContext(await readFile(join(root, "place-images.js"), "utf8"), catalogContext);
const evergreenCatalog = catalogContext.window.LITTLE_WEEKENDS_EVERGREEN || [];
const verifiedActualPlaceKeys = new Set(Object.keys(catalogContext.window.LITTLE_WEEKENDS_PLACE_IMAGES || {}));

function auditAgeRange(label) {
  const value = String(label || "").replace(/\s+/g, "");
  const mixed = value.match(/(\d+)개월-(\d+)세/);
  if (mixed) return { min: Number(mixed[1]), max: (Number(mixed[2]) + 1) * 12 - 1 };
  const months = value.match(/(\d+)-(\d+)개월/);
  if (months) return { min: Number(months[1]), max: Number(months[2]) };
  const years = value.match(/(\d+)-(\d+)세/);
  if (years) return { min: Number(years[1]) * 12, max: (Number(years[2]) + 1) * 12 - 1 };
  if (/가족|전연령/.test(value)) return { min: 0, max: 216 };
  return null;
}

const supportedRegionCities = {
  "San Francisco": ["San Francisco"],
  Peninsula: ["San Mateo", "South San Francisco", "San Carlos", "Palo Alto", "Menlo Park", "Half Moon Bay", "Redwood City", "Burlingame", "Belmont", "Foster City", "Millbrae", "Daly City"],
  "South Bay": ["San Jose", "Cupertino", "Santa Clara", "Sunnyvale", "Mountain View", "Campbell", "Los Gatos", "Milpitas"],
  "East Bay": ["Oakland", "Berkeley", "Walnut Creek", "Fremont", "Hayward", "Alameda", "Concord", "Pleasanton", "Richmond"],
  "North Bay": ["Sausalito", "Sonoma", "Marin", "Novato", "San Rafael", "Napa", "Petaluma", "Greenbrae", "Larkspur"],
};

for (const [region, cities] of Object.entries(supportedRegionCities)) {
  const officialPlaces = evergreenCatalog.filter((place) => (
    cities.some((city) => String(place.city || "").includes(city))
    && /^https:\/\//.test(String(place.source || ""))
  ));
  const missingEvidence = officialPlaces.filter((place) => {
    const evidence = place.ageEvidence;
    return !evidence
      || evidence.url !== place.source
      || !["official_program", "official_facility", "official_audience", "editorial_review"].includes(evidence.basis)
      || !/^\d{4}-\d{2}-\d{2}$/.test(String(evidence.verifiedAt || ""))
      || String(evidence.summary || "").length < 24;
  });
  if (missingEvidence.length) throw new Error(`${region} evergreen places are missing structured age evidence: ${missingEvidence.map((place) => place.id).join(", ")}`);
  const missingMonths = Array.from({ length: 84 }, (_, month) => month).filter((month) => !officialPlaces.some((place) => {
    const range = auditAgeRange(place.age);
    return range && range.min <= month && month <= range.max;
  }));
  if (missingMonths.length) throw new Error(`${region} evergreen age coverage is missing months: ${missingMonths.join(", ")}`);
}

const placeImageCatalog = Object.fromEntries(
  evergreenCatalog
    .filter((place) => (
      /^[a-z0-9-]{1,220}$/i.test(String(place.id || ""))
      && place.name
      && Number.isFinite(Number(place.location?.lat))
      && Number.isFinite(Number(place.location?.lng))
    ))
    .map((place) => [
      place.id,
      {
        name: String(place.name).slice(0, 180),
        city: String(place.city || "Bay Area").slice(0, 100),
        address: String(place.address || "").slice(0, 220),
        hasVerifiedActualPhoto: verifiedActualPlaceKeys.has(place.id),
        location: {
          lat: Number(place.location.lat),
          lng: Number(place.location.lng),
        },
      },
    ]),
);

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
};

const entries = Object.fromEntries(
  await Promise.all(
    Object.entries(files).map(async ([route, file]) => [
      route,
      {
        body: file.binary
          ? (await readFile(join(root, file.path))).toString("base64")
          : await readFile(join(root, file.path), "utf8"),
        contentType: file.contentType,
        binary: Boolean(file.binary),
      },
    ]),
  ),
);

const workerSource = `import { handleCalendarRequest } from "./calendar.js";
import { getOutingsResponse, refreshOutings } from "./event-sync.js";
import { handleFeedbackRequest } from "./feedback.js";
import { handlePlaceImageRequest } from "./place-images.js";
import { adminPhotoPageResponse, handlePlacePhotoRequest, purgeExpiredPlacePhotos } from "./place-photos.js";
import { handleSharedPlanRequest } from "./shared-plans.js";

const entries = ${JSON.stringify(entries)};
const placeImageCatalog = ${JSON.stringify(placeImageCatalog)};
const adminPhotosHtml = ${JSON.stringify(adminPhotosHtml)};
const securityHeaders = ${JSON.stringify(securityHeaders)};

function headers(contentType) {
  return {
    "Content-Type": contentType,
    ...securityHeaders,
  };
}

export default {
  async fetch(request, env, context) {
    const url = new URL(request.url);
    const pathname = url.pathname.endsWith("/") && url.pathname !== "/" ? url.pathname.slice(0, -1) : url.pathname;
    if (pathname === "/api/outings") return getOutingsResponse(request, env, context);
    const adminPageResponse = adminPhotoPageResponse(request, env, adminPhotosHtml);
    if (adminPageResponse) return adminPageResponse;
    const placePhotoResponse = await handlePlacePhotoRequest(request, env, placeImageCatalog);
    if (placePhotoResponse) return placePhotoResponse;
    const placeImageResponse = await handlePlaceImageRequest(request, env, placeImageCatalog);
    if (placeImageResponse) return placeImageResponse;
    const calendarResponse = handleCalendarRequest(request);
    if (calendarResponse) return calendarResponse;
    const feedbackResponse = await handleFeedbackRequest(request, env);
    if (feedbackResponse) return feedbackResponse;
    const sharedPlanResponse = await handleSharedPlanRequest(request, env);
    if (sharedPlanResponse) return sharedPlanResponse;
    const entry = entries[pathname];

    if (!entry) {
      return new Response("Not found", {
        status: 404,
        headers: headers("text/plain; charset=utf-8"),
      });
    }

    const body = entry.binary
      ? Uint8Array.from(atob(entry.body), (character) => character.charCodeAt(0))
      : entry.body;

    return new Response(body, {
      status: 200,
      headers: headers(entry.contentType),
    });
  },
  async scheduled(controller, env, context) {
    context.waitUntil(Promise.all([refreshOutings(env, true), purgeExpiredPlacePhotos(env)]));
  },
};
`;

const outputPath = join(root, "dist/server/index.js");
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, workerSource, "utf8");
await copyFile(join(root, "worker/calendar.js"), join(root, "dist/server/calendar.js"));
await copyFile(join(root, "worker/event-sync.js"), join(root, "dist/server/event-sync.js"));
await copyFile(join(root, "worker/feedback.js"), join(root, "dist/server/feedback.js"));
await copyFile(join(root, "worker/place-images.js"), join(root, "dist/server/place-images.js"));
await copyFile(join(root, "worker/place-photos.js"), join(root, "dist/server/place-photos.js"));
await copyFile(join(root, "worker/shared-plans.js"), join(root, "dist/server/shared-plans.js"));
const hostingOutputPath = join(root, "dist/.openai/hosting.json");
await mkdir(dirname(hostingOutputPath), { recursive: true });
await writeFile(
  hostingOutputPath,
  await readFile(join(root, ".openai/hosting.json"), "utf8"),
  "utf8",
);
console.log(outputPath);
