import { copyFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

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
  "/app.js": {
    path: "app.js",
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

for (const filename of await readdir(join(root, "public/assets/places"))) {
  if (!/^[a-z0-9-]+\.webp$/i.test(filename)) continue;
  files[`/assets/places/${filename}`] = {
    path: `public/assets/places/${filename}`,
    contentType: "image/webp",
    binary: true,
  };
}

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests",
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
import { handleSharedPlanRequest } from "./shared-plans.js";

const entries = ${JSON.stringify(entries)};
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
    const calendarResponse = handleCalendarRequest(request);
    if (calendarResponse) return calendarResponse;
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
    context.waitUntil(refreshOutings(env, true));
  },
};
`;

const outputPath = join(root, "dist/server/index.js");
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, workerSource, "utf8");
await copyFile(join(root, "worker/calendar.js"), join(root, "dist/server/calendar.js"));
await copyFile(join(root, "worker/event-sync.js"), join(root, "dist/server/event-sync.js"));
await copyFile(join(root, "worker/shared-plans.js"), join(root, "dist/server/shared-plans.js"));
const hostingOutputPath = join(root, "dist/.openai/hosting.json");
await mkdir(dirname(hostingOutputPath), { recursive: true });
await writeFile(
  hostingOutputPath,
  await readFile(join(root, ".openai/hosting.json"), "utf8"),
  "utf8",
);
console.log(outputPath);
