import { mkdir, readFile, writeFile } from "node:fs/promises";
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
  "/styles.css": {
    path: "styles.css",
    contentType: "text/css; charset=utf-8",
  },
  "/assets/bay-area-location-map.svg": {
    path: "assets/bay-area-location-map.svg",
    contentType: "image/svg+xml; charset=utf-8",
  },
  "/favicon.svg": {
    path: "public/favicon.svg",
    contentType: "image/svg+xml; charset=utf-8",
  },
};

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'none'; font-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
};

const entries = Object.fromEntries(
  await Promise.all(
    Object.entries(files).map(async ([route, file]) => [
      route,
      {
        body: await readFile(join(root, file.path), "utf8"),
        contentType: file.contentType,
      },
    ]),
  ),
);

const workerSource = `const entries = ${JSON.stringify(entries)};
const securityHeaders = ${JSON.stringify(securityHeaders)};

function headers(contentType) {
  return {
    "Content-Type": contentType,
    ...securityHeaders,
  };
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname.endsWith("/") && url.pathname !== "/" ? url.pathname.slice(0, -1) : url.pathname;
    const entry = entries[pathname] || entries["/"];

    return new Response(entry.body, {
      status: entry ? 200 : 404,
      headers: headers(entry.contentType),
    });
  },
};
`;

const outputPath = join(root, "dist/server/index.js");
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, workerSource, "utf8");
console.log(outputPath);
