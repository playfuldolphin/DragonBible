const CACHE = "db-quest-v1";
const FILES = [
  "./",
  "./index.html",
  "./app.css",
  "./app.js",
  "./game.js",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./manifest.webmanifest",
  "../content.js",
];
const assets = new Set(
  FILES.map((file) => new URL(file, self.location.href).href),
);
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(FILES))
      .then(() => self.skipWaiting()),
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("db-quest-") && key !== CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || !assets.has(event.request.url)) return;
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const controller = new AbortController(),
        timeout = setTimeout(() => controller.abort(), 4000);
      try {
        const response = await fetch(event.request, {
          signal: controller.signal,
        });
        if (response.ok) await cache.put(event.request, response.clone());
        return response;
      } catch {
        return (
          (await cache.match(event.request)) ||
          new Response("Reconnect once to download your journey.", {
            status: 503,
            headers: { "Content-Type": "text/plain" },
          })
        );
      } finally {
        clearTimeout(timeout);
      }
    })(),
  );
});
