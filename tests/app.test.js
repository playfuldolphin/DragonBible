const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { JSDOM, VirtualConsole } = require("jsdom");
const game = require("../app/game");
const { createApp } = require("../server");
const root = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const tick = () => new Promise((resolve) => setTimeout(resolve, 20));
function browser(saved = null) {
  const errors = [],
    console = new VirtualConsole();
  console.on("jsdomError", (error) => errors.push(error));
  const dom = new JSDOM(read("app/index.html"), {
    url: "http://localhost/app/",
    runScripts: "outside-only",
    virtualConsole: console,
  });
  const w = dom.window;
  w.scrollTo = () => {};
  w.HTMLElement.prototype.scrollIntoView = () => {};
  w.HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  w.HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
  if (saved) w.localStorage.setItem("dragonbible_quest_v1", saved);
  w.eval(read("content.js"));
  w.eval(read("app/game.js"));
  w.eval(read("app/app.js"));
  return { dom, w, d: w.document, errors };
}
test("journey rewards cannot be repeated or claimed out of order; all four forms are reachable", () => {
  let state = game.normalize(null);
  assert.equal(game.level(state).number, 1);
  assert.equal(game.complete(state, "reunion", 1, "2026-10-06").earned, 0);
  assert.equal(game.complete(state, "flame", 0, "2026-10-06").correct, false);
  for (const quest of game.quests) {
    const result = game.complete(state, quest.id, quest.correct, "2026-10-06");
    assert.equal(result.earned, 40);
    state = result.state;
    assert.equal(
      game.complete(state, quest.id, quest.correct, "2026-10-07").earned,
      0,
    );
  }
  assert.equal(state.completed.length, 7);
  assert.deepEqual(state.days, ["2026-10-06"]);
  assert.equal(game.level(state).number, 4);
  assert.equal(game.normalize({ ...state, skin: "jade" }).skin, "jade");
  assert.equal(
    game.normalize({
      completed: ["reunion", "reunion"],
      skin: "jade",
      name: 4,
      days: "invalid",
    }).skin,
    "ember",
  );
});
test("a player can complete all quests, hatch their dragon, and return to saved progress", async () => {
  const { dom, w, d, errors } = browser("{bad JSON");
  assert.match(d.querySelector("h1").textContent, /Every dragon/);
  for (const [i, quest] of game.quests.entries()) {
    w.location.hash = `#quest/${quest.id}`;
    await tick();
    assert.equal(d.querySelectorAll(".verse").length, 4);
    const wrong = d.querySelector(`input[value="${(quest.correct + 1) % 3}"]`);
    wrong.checked = true;
    d.querySelector("#challengeForm").dispatchEvent(
      new w.Event("submit", { cancelable: true }),
    );
    assert.match(d.querySelector("#answerFeedback").textContent, /Not quite/);
    d.querySelector(`input[value="${quest.correct}"]`).checked = true;
    d.querySelector("#challengeForm").dispatchEvent(
      new w.Event("submit", { cancelable: true }),
    );
    assert.match(d.querySelector(".reward").textContent, /\+40 XP/);
    assert.equal(
      JSON.parse(w.localStorage.getItem("dragonbible_quest_v1")).completed
        .length,
      i + 1,
    );
  }
  const restored = browser(w.localStorage.getItem("dragonbible_quest_v1"));
  assert.match(
    restored.d.querySelector(".journey-stats").textContent,
    /7 \/ 7/,
  );
  assert.match(
    restored.d.querySelector(".companion-caption").textContent,
    /Guardian/,
  );
  assert.equal(errors.length, 0);
  dom.window.close();
  restored.dom.window.close();
});
test("companion names are safe text and the archive preserves every published chapter", async () => {
  const { dom, w, d, errors } = browser();
  w.location.hash = "#dragon";
  await tick();
  d.querySelector("#dragonName").value = "<img src=x onerror=x>";
  d.querySelector(".name-form").dispatchEvent(
    new w.Event("submit", { cancelable: true }),
  );
  assert.equal(d.querySelector("h1").textContent, "<img src=x onerror=x>");
  assert.equal(d.querySelector("#screen img"), null);
  assert.equal(d.querySelectorAll(".skin-card:disabled").length, 2);
  w.Storage.prototype.setItem = () => { throw new Error('storage disabled'); };
  d.querySelector('#dragonName').value = 'Ash';
  d.querySelector('.name-form').dispatchEvent(new w.Event('submit', {cancelable:true}));
  assert.match(d.querySelector('#storageStatus').textContent, /Storage is unavailable/);
  w.location.hash = "#archive";
  await tick();
  const links = [...d.querySelectorAll(".chapter-link")].map(
    (link) => link.hash,
  );
  assert.equal(links.length, 27);
  for (const hash of links) {
    w.location.hash = hash;
    await tick();
    assert.ok(d.querySelectorAll(".verse").length > 3);
    assert.match(d.querySelector(".passage h2").textContent, /\S/);
  }
  w.location.hash = '#read/constructor/1'; await tick();
  assert.equal(d.querySelectorAll('.chapter-link').length, 27);
  assert.equal(errors.length, 0);
  dom.window.close();
});
test("app assets and install icons are served while product notes stay private on the Node host", async (t) => {
  const server = createApp({ env: {} }).listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  t.after(() => server.close());
  const base = `http://127.0.0.1:${server.address().port}`;
  const manifest = JSON.parse(read("app/manifest.webmanifest"));
  for (const file of [
    "/app/",
    "/app/app.js",
    "/app/sw.js",
    "/app/manifest.webmanifest",
    ...manifest.icons.map((icon) => `/app/${icon.src}`),
  ]) {
    const response = await fetch(base + file);
    assert.equal(response.status, 200, file);
  }
  assert.equal((await fetch(base + "/app/README.md")).status, 404);
  for (const [file, size] of [
    ["app/icon-192.png", 192],
    ["app/icon-512.png", 512],
  ]) {
    const png = fs.readFileSync(path.join(root, file));
    assert.equal(png.readUInt32BE(16), size);
    assert.equal(png.readUInt32BE(20), size);
  }
});
test("offline cache covers the journey and lore, never intercepting checkout or API requests", async () => {
  const events = {},
    stored = new Map(),
    scope = "https://dragonbible.com/app/sw.js";
  const cache = {
    async addAll(files) {
      for (const file of files)
        stored.set(new URL(file, scope).href, new Response("cached:" + file));
    },
    async match(request) {
      return stored
        .get(typeof request === "string" ? request : request.url)
        ?.clone();
    },
    async put(request, response) {
      stored.set(request.url, response);
    },
  };
  const context = {
    URL,
    Response,
    AbortController,
    setTimeout,
    clearTimeout,
    self: {
      location: { href: scope },
      addEventListener: (name, callback) => {
        events[name] = callback;
      },
      skipWaiting: async () => {},
      clients: { claim: async () => {} },
    },
    caches: {
      open: async () => cache,
      keys: async () => ["db-quest-v1", "unrelated-cache"],
      delete: async () => {
        throw new Error("must preserve unrelated caches");
      },
    },
    fetch: async () => {
      throw new Error("offline");
    },
  };
  vm.runInNewContext(read("app/sw.js"), context);
  let pending;
  events.install({
    waitUntil: (promise) => {
      pending = promise;
    },
  });
  await pending;
  events.activate({
    waitUntil: (promise) => {
      pending = promise;
    },
  });
  await pending;
  for (const url of [
    "https://dragonbible.com/app/",
    "https://dragonbible.com/content.js",
  ]) {
    events.fetch({
      request: new Request(url),
      respondWith: (promise) => {
        pending = promise;
      },
    });
    assert.match(await (await pending).text(), /cached:/);
  }
  let intercepted = false;
  events.fetch({
    request: new Request("https://dragonbible.com/api/oracle"),
    respondWith: () => {
      intercepted = true;
    },
  });
  assert.equal(intercepted, false);
});
