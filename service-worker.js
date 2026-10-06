// Retire the old cache-first worker. It could keep an obsolete website indefinitely.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith("dragonbible-"))
          .map((key) => caches.delete(key)),
      );
      await self.registration.unregister();
    })(),
  );
});
