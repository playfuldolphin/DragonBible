(() => {
  "use strict";
  const nav = document.querySelector(".navigation, .nav-content");
  const links = nav?.querySelector(".navigation-links, .nav-links");
  if (nav && links) {
    if (!links.id) links.id = "site-navigation";
    let toggle = nav.querySelector(".menu-toggle");
    if (!toggle) {
      toggle = document.createElement("button");
      toggle.className = "menu-toggle";
      toggle.type = "button";
      toggle.textContent = "Menu ☰";
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-controls", links.id);
      nav.insertBefore(toggle, links);
    }
    const close = () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      links.classList.toggle("is-open", open);
    });
    links.addEventListener("click", (e) => {
      if (e.target.closest("a,button")) close();
    });
    nav.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        close();
        toggle.focus();
      }
    });
  }
  // Update only this site's legacy worker; its new version retires the stale cache.
  if ("serviceWorker" in navigator)
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        registrations
          .filter((r) => r.active?.scriptURL.endsWith("/service-worker.js"))
          .forEach((r) => r.update().catch(() => {}));
      })
      .catch(() => {});
})();
