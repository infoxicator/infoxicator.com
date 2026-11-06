import { createRequire } from "node:module";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = join(root, "dist", "client");
const serverEntry = pathToFileURL(join(root, "dist", "server", "server.js")).href;
const manifestPath = join(clientDir, "site.webmanifest");
const manifestType = "application/manifest+json";

const staticMod = await loadSrvxStatic();
const serveStatic = staticMod.staticMiddleware ?? staticMod.serveStatic;
if (typeof serveStatic !== "function") {
  throw new Error("srvx/static did not export a static file middleware");
}

const files = serveStatic({ dir: clientDir });

// srvx's static middleware has no .webmanifest type, so it would send
// application/octet-stream. Answer this path first and leave the file bytes as-is.
export async function webManifest(request, next) {
  const pathname = new URL(request.url, "http://localhost").pathname;
  if (pathname !== "/site.webmanifest") return next();
  if (request.method !== "GET" && request.method !== "HEAD") return next();
  let body;
  try {
    body = await readFile(manifestPath);
  } catch {
    return next();
  }
  return new Response(request.method === "HEAD" ? null : body, {
    headers: {
      "Content-Type": manifestType,
      "Content-Length": String(body.byteLength),
    },
  });
}

export const middleware = [webManifest, files];

const app = await import(serverEntry);
const fetchApp = app.fetch ?? app.default?.fetch;
if (typeof fetchApp !== "function") {
  throw new Error("dist/server/server.js does not export a fetch handler");
}

export default {
  fetch(request) {
    return fetchApp(request);
  },
};

async function loadSrvxStatic() {
  const specifiers = [];
  if (process.argv[1]) specifiers.push(process.argv[1]);
  specifiers.push(import.meta.url);
  for (const from of specifiers) {
    try {
      const require = createRequire(from);
      const id = require.resolve("srvx/static");
      return await import(pathToFileURL(id).href);
    } catch {
      // The CLI bin can resolve srvx even when this repo does not depend on it.
    }
  }
  throw new Error("Could not load srvx/static. Run this file with the srvx CLI.");
}
