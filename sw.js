self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("leads-v42").then(cache => cache.addAll([
      "/", "/index.html", "/style.css", "/app.js", "/manifest.webmanifest"
    ]))
  );
});
self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).catch(()=>caches.match(e.request))
  );
});