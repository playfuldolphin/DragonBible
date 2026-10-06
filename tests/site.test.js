const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM, VirtualConsole } = require("jsdom");
const root = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const tick = () => new Promise((resolve) => setTimeout(resolve, 20));
function browser(
  file = "index.html",
  hash = "",
  stored = {},
  setup = () => {},
) {
  const errors = [],
    console = new VirtualConsole();
  console.on("jsdomError", (error) => errors.push(error));
  const dom = new JSDOM(read(file), {
    url: `https://dragonbible.com/${file}${hash}`,
    runScripts: "outside-only",
    virtualConsole: console,
  });
  const w = dom.window;
  w.HTMLElement.prototype.scrollIntoView = function () {};
  w.HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  w.HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
  w.fetch = async (url) => ({
    ok: true,
    json: async () =>
      url.endsWith("/config")
        ? { plans: {}, oracle: false }
        : { active: false },
  });
  for (const [key, value] of Object.entries(stored))
    w.localStorage.setItem(key, value);
  setup(w);
  for (const script of [...w.document.querySelectorAll("script[src]")])
    w.eval(read(script.getAttribute("src")));
  return { dom, w, d: w.document, errors };
}
test("all 27 published chapters can be read across all seven books", async () => {
  const { dom, w, d, errors } = browser();
  assert.equal(d.querySelectorAll(".library-card").length, 7);
  assert.equal(d.querySelector("#reader").hidden, true);
  let chapters = 0;
  for (const [id, book] of Object.entries(w.DragonBibleContent.books)) {
    for (const [num, chapter] of Object.entries(book.chapters)) {
      w.location.hash = `#read/${id}/${num}`;
      await tick();
      chapters++;
      assert.equal(d.querySelector("#landing").hidden, true);
      assert.equal(
        d.querySelectorAll(".chapter-verse").length,
        chapter.verses.length,
      );
      assert.equal(
        d.querySelector(".chapter-verse p").textContent,
        chapter.verses[0],
      );
      assert.equal(d.querySelector("#chapterSelect").value, num);
    }
  }
  assert.equal(chapters, 27);
  assert.equal(errors.length, 0, errors.map((e) => e.message).join("\n"));
  dom.window.close();
});
test("navigation, progress, bookmarks, and search work together", async () => {
  const { dom, w, d } = browser("index.html", "#read/genesis/1");
  assert.equal(d.querySelector("#previousChapter").disabled, true);
  d.querySelector("#nextChapter").click();
  await tick();
  assert.equal(d.querySelector("#chapterSelect").value, "2");
  d.querySelector(".verse-bookmark").click();
  assert.equal(
    d.querySelector(".verse-bookmark").getAttribute("aria-pressed"),
    "true",
  );
  assert.equal(
    JSON.parse(w.localStorage.getItem("dragonbible_bookmarks")).length,
    1,
  );
  d.querySelector('[data-action="bookmarks"]').click();
  assert.equal(
    d.querySelector("#bookmarksList a").getAttribute("href"),
    "#read/genesis/2/1",
  );
  d.querySelector("#bookmarksModal [data-close]").click();
  d.querySelector('[data-action="search"]').click();
  d.querySelector("#searchInput").value = "Primordial Flame";
  d.querySelector("#searchForm").dispatchEvent(
    new w.Event("submit", { cancelable: true }),
  );
  assert.ok(d.querySelectorAll("#searchResults a").length > 0);
  d.querySelector("#searchResults a").click();
  await tick();
  assert.equal(d.querySelector("#searchModal").open, false);
  assert.match(w.location.hash, /^#read\//);
  assert.match(
    d.querySelector("#readingProgressText").textContent,
    /chapters visited/,
  );
  w.location.hash = "#read/no-such-book/1";
  await tick();
  assert.equal(d.querySelector("#reader").hidden, true);
  assert.equal(w.location.hash, "#books");
  dom.window.close();
});
test("corrupt saved data and unavailable speech do not break reading", () => {
  const { dom, d, errors } = browser("index.html", "#read/genesis/10", {
    dragonbible_reading_progress: "{broken",
    dragonbible_bookmarks: "[null,{}]",
  });
  assert.equal(d.querySelector("#nextChapter").disabled, true);
  assert.equal(d.querySelector("#audioBtn").disabled, true);
  assert.ok(d.querySelectorAll(".chapter-verse").length > 0);
  assert.equal(errors.length, 0);
  dom.window.close();
});
test("skip navigation preserves the chapter and earlier private comments remain readable", async () => {
  const saved = {
    dragonbible_comments_genesis_1: [
      {
        author: "<b>Reader</b>",
        text: "<img src=x onerror=alert(1)>",
        timestamp: "2024-01-01",
      },
    ],
  };
  const { dom, w, d } = browser("index.html", "#read/genesis/1", {
    dragonbible_comments: JSON.stringify(saved),
  });
  d.querySelector(".skip-link").click();
  await tick();
  assert.equal(w.location.hash, "#read/genesis/1");
  assert.equal(d.activeElement.id, "main");
  assert.match(d.querySelector("#notesList").textContent, /<b>Reader<\/b>/);
  assert.equal(d.querySelector("#notesList img"), null);
  d.querySelector("#noteText").value = "Remember the first flame.";
  d.querySelector("#noteForm").dispatchEvent(
    new w.Event("submit", { cancelable: true }),
  );
  const notes = JSON.parse(w.localStorage.getItem("dragonbible_comments"));
  assert.equal(notes.dragonbible_comments_genesis_1.length, 2);
  d.querySelector("#nextChapter").click();
  await tick();
  assert.match(d.querySelector("#notesList").textContent, /No notes/);
  d.querySelector("#previousChapter").click();
  await tick();
  assert.match(
    d.querySelector("#notesList").textContent,
    /Remember the first flame/,
  );
  dom.window.close();
});
test("narration pauses, resumes, and cancels when changing chapters", async () => {
  let spoken,
    cancellations = 0;
  const { dom, w, d } = browser("index.html", "#read/genesis/1", {}, (w) => {
    w.SpeechSynthesisUtterance = class {
      constructor(text) {
        this.text = text;
      }
    };
    w.speechSynthesis = {
      paused: false,
      getVoices: () => [],
      addEventListener() {},
      speak(value) {
        spoken = value;
        this.paused = false;
      },
      cancel() {
        cancellations++;
        this.paused = false;
      },
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      },
    };
  });
  const play = d.querySelector("#audioBtn");
  play.click();
  assert.ok(
    spoken.text.includes(
      w.DragonBibleContent.books.genesis.chapters[1].verses[0],
    ),
  );
  play.click();
  assert.equal(w.speechSynthesis.paused, true);
  play.click();
  assert.equal(w.speechSynthesis.paused, false);
  const first = spoken,
    before = cancellations;
  d.querySelector("#nextChapter").click();
  await tick();
  assert.ok(cancellations > before);
  assert.equal(play.textContent, "Play narration");
  play.click();
  first.onend();
  assert.equal(play.textContent, "Pause narration");
  d.querySelector("#stopAudio").click();
  assert.equal(play.textContent, "Play narration");
  dom.window.close();
});
test("quiz reaches a valid result and reading recommendation", () => {
  const { dom, d } = browser();
  d.querySelector('[data-action="quiz"]').click();
  for (let i = 0; i < 10; i++) d.querySelector(".quiz-options button").click();
  assert.match(d.querySelector("#quizBody").textContent, /Fire Dragon/);
  assert.equal(
    d.querySelector("#quizBody a").getAttribute("href"),
    "#read/genesis/3",
  );
  dom.window.close();
});
test("checkout survives broken analytics and clearly reports unavailable service", async () => {
  const { dom, w, d } = browser();
  w.DragonAnalytics = {
    trackUpgradeClick() {
      throw new Error("analytics unavailable");
    },
  };
  d.querySelector('[data-plan="monthly"]').click();
  await tick();
  assert.equal(d.querySelector("#paymentModal").open, true);
  assert.match(d.querySelector("#paymentTitle").textContent, /\$5\/month/);
  assert.match(d.querySelector("#checkoutStatus").textContent, /not connected/);
  assert.equal(d.querySelector("#checkoutButton").hidden, true);
  d.querySelector("#paymentModal [data-close]").click();
  d.querySelector('[data-plan="lifetime"]').click();
  await tick();
  assert.match(d.querySelector("#paymentTitle").textContent, /\$40 once/);
  dom.window.close();
});
test("Oracle safely handles arbitrary questions and identifies stored examples", async () => {
  const { dom, w, d, errors } = browser("lore-oracle.html");
  await tick();
  d.querySelector("#oracleInput").value = "<img src=x onerror=alert(1)>";
  await w.handleOracleQuery();
  assert.equal(d.querySelector("#chatMessages img"), null);
  assert.match(
    d.querySelector("#chatMessages").textContent,
    /cannot answer a new question/,
  );
  d.querySelector("#oracleInput").value = "Who are the Watchers?";
  await w.handleOracleQuery();
  assert.match(
    d.querySelector("#chatMessages").textContent,
    /Prewritten example/,
  );
  assert.equal(d.querySelector("#sendBtn").disabled, false);
  assert.equal(errors.length, 0);
  dom.window.close();
});
test("success page never claims payment succeeded without verification", async () => {
  const { dom, d } = browser("success.html");
  await tick();
  assert.equal(
    d.querySelector("#confirmationTitle").textContent,
    "No checkout confirmation found",
  );
  dom.window.close();
});
test("public pages have no broken local file links or duplicate IDs", () => {
  const excluded = new Set([
    "test-books.html",
    "email-templates.html",
    "blog-template.html",
  ]);
  const files = fs
    .readdirSync(root)
    .filter((f) => f.endsWith(".html") && !excluded.has(f))
    .concat(
      fs
        .readdirSync(path.join(root, "blog"))
        .filter((f) => f.endsWith(".html"))
        .map((f) => `blog/${f}`),
    );
  const failures = [];
  for (const file of files) {
    const dom = new JSDOM(read(file)),
      doc = dom.window.document,
      ids = new Set();
    for (const el of doc.querySelectorAll("[id]")) {
      if (ids.has(el.id)) failures.push(`${file}: duplicate ${el.id}`);
      ids.add(el.id);
    }
    for (const el of doc.querySelectorAll(
      "a[href],script[src],link[href],img[src]",
    )) {
      const link = el.getAttribute("href") || el.getAttribute("src");
      if (!link || /^(https?:|mailto:|tel:|data:|#)/.test(link)) continue;
      const target = link.split(/[?#]/)[0];
      if (!target) continue;
      const resolved = target.startsWith("/")
        ? path.join(root, target)
        : path.resolve(root, path.dirname(file), target);
      if (!fs.existsSync(resolved)) failures.push(`${file}: ${link}`);
    }
    dom.window.close();
  }
  assert.deepEqual(failures, []);
});
