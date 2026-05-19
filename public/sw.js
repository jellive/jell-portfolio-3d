/* eslint-disable */
// Minimal service worker for jell-portfolio-3d:
// - cache-first for Next static assets + images/fonts
// - lets the network handle everything else (HTML stays fresh)

const CACHE = "jell-world-v1";
const STATIC_RE =
  /\/(_next\/static|favicon|.*\.(?:png|jpg|jpeg|svg|webp|woff2?))(?:\?|$)/i;

self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    (async () => {
      // Drop old caches keyed under a different version
      const names = await caches.keys();
      await Promise.all(
        names.filter((n) => n !== CACHE).map((n) => caches.delete(n)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (!STATIC_RE.test(url.pathname)) return;

  e.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req)
          .then((res) => {
            if (res && res.status === 200 && res.type === "basic") {
              cache.put(req, res.clone());
            }
            return res;
          })
          .catch(() => cached);
      }),
    ),
  );
});
