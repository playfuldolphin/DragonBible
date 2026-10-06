(() => {
  "use strict";
  const { quests, skins, normalize, level, complete } = window.DragonQuest;
  const books = window.DragonBibleContent.books;
  const $ = (id) => document.getElementById(id);
  const KEY = "dragonbible_quest_v1";
  let state,
    installPrompt,
    returnQuest = null;
  try {
    state = normalize(JSON.parse(localStorage.getItem(KEY)));
  } catch {
    state = normalize(null);
  }
  const xp = () => state.completed.length * 40;
  function el(tag, text, className) {
    const item = document.createElement(tag);
    if (text !== undefined) item.textContent = text;
    if (className) item.className = className;
    return item;
  }
  function link(text, href, className) {
    const item = el("a", text, className);
    item.href = href;
    return item;
  }
  function save() {
    state = normalize(state);
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      return true;
    } catch {
      $("storageStatus").textContent =
        "Storage is unavailable. Your progress will last for this visit only.";
      return false;
    }
  }
  function dayKey() {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }
  function portrait() {
    const box = el("div", undefined, `portrait stage-${level(state).number}`);
    box.setAttribute("aria-label", `${state.name}, ${level(state).name}`);
    box.setAttribute("role", "img");
    box.style.setProperty(
      "--scale-color",
      skins.find((skin) => skin.id === state.skin).color,
    );
    // All SVG markup is fixed artwork. Player names and lore are rendered with textContent.
    box.innerHTML = `<svg viewBox="0 0 400 300" aria-hidden="true"><defs><radialGradient id="aura"><stop stop-color="#b6c69d" stop-opacity=".13"/><stop offset="1" stop-color="#b6c69d" stop-opacity="0"/></radialGradient><linearGradient id="scales" x1="0" y1="0" x2="1" y2="1"><stop stop-color="var(--scale-color)"/><stop offset="1" stop-color="#79694f"/></linearGradient></defs><circle cx="200" cy="146" r="143" fill="url(#aura)"/><g fill="none" stroke="#b5a783" opacity=".3"><circle cx="200" cy="143" r="108"/><circle cx="200" cy="143" r="124" stroke-dasharray="1 9"/><path d="M50 144h36m228 0h36M200 6v20m0 238v20"/></g><g fill="#d7bd8c"><path d="m84 59 3 10 10 3-10 3-3 10-3-10-10-3 10-3Zm224 26 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"/><circle cx="288" cy="228" r="2"/><circle cx="103" cy="214" r="2"/><circle cx="246" cy="25" r="1.5"/></g><ellipse cx="200" cy="255" rx="90" ry="11" fill="#071915" opacity=".6"/><g class="egg-art"><path d="M200 57c-36 36-76 90-76 142a76 76 0 0 0 152 0c0-52-40-106-76-142Z" fill="url(#scales)" stroke="#e8c894" stroke-width="1.5"/><path d="m202 72 17 52-29 25 23 26-25 23 15 37" fill="none" stroke="#223e32" stroke-width="3"/><g fill="none" stroke="#f3d7a1" opacity=".35"><path d="m148 161 12 12 12-12 12 12m34 29 12 12 12-12 12 12m-101-6 12 12 12-12 12 12m15-81 12 12 12-12"/></g></g><g class="dragon-art"><path class="wings" d="M191 155Q135 45 68 49l21 83 19-29 26 74-1-63 58 74Zm26-9Q258 45 330 47l-18 86-21-29-31 77 5-65-48 72Z" fill="#567469" stroke="#a6b9a0" stroke-width="2"/><path d="M244 228c35 18 66-3 57-36-7 28-33 24-48 10-15-17-4-35-16-54-15-23-55-24-74-2-29 35-38 62-75 64 11 35 42 42 71 19 22 32 59 29 85-1Z" fill="url(#scales)" stroke="#e6c291" stroke-width="1.5"/><path d="M168 184c-1 24 6 45 25 50 15 4 24-7 31-19" fill="none" stroke="#efcf9b" stroke-width="12" opacity=".45"/><path d="m192 106-10-29-13 33m51-7 17-29 2 42" fill="#d1b689" stroke="#f3d0a3" stroke-width="1.5"/><path d="M174 108c8-20 42-23 61-5l9 19 22 10-11 19-22 4c-12 27-40 23-51 5l-17-4-4-20Z" fill="url(#scales)" stroke="#ecd1a5" stroke-width="2"/><path d="m172 123-21-8 9 22m70-1c6 5 12 5 18 1m-53-7q10-10 18 0" fill="none" stroke="#18352e" stroke-width="3" stroke-linecap="round"/><circle cx="250" cy="135" r="2" fill="#173329"/><path d="m184 172-8 9m50-9 7 8m-79 21-6 8m61 22 6 7" fill="none" stroke="#77634a" stroke-width="2"/><path d="m199 235-12 9m20-6-7 9m30-19 3 11" stroke="#eed1a5" stroke-width="3" stroke-linecap="round"/></g></svg>`;
    return box;
  }
  function progressCard() {
    const card = el("div", undefined, "bond-card"),
      current = level(state);
    const row = el("div", undefined, "between");
    row.append(
      el("span", `${current.name} · Level ${current.number}`),
      el("strong", `${xp()} XP`),
    );
    card.append(row);
    const meter = el("progress");
    meter.max = current.next ? current.next - current.floor : 40;
    meter.value = current.next ? xp() - current.floor : 40;
    meter.setAttribute("aria-label", "Progress toward your dragon’s next form");
    card.append(meter);
    card.append(
      el(
        "p",
        current.next
          ? `${current.next - xp()} XP until the next form`
          : "Guardian form unlocked. Your journey continues.",
        "small",
      ),
    );
    return card;
  }
  function heading(kicker, title, description) {
    const header = el("div", undefined, "screen-heading");
    header.append(el("p", kicker, "eyebrow"), el("h1", title));
    if (description) header.append(el("p", description, "muted"));
    return header;
  }
  function journey() {
    const done = state.completed.length,
      current = quests[Math.min(done, quests.length - 1)];
    const hero = el("section", undefined, "journey-hero");
    hero.append(
      el("p", "SEVEN MEMORIES · ONE WORLD", "eyebrow"),
      el(
        "h1",
        done
          ? "A little closer to whole."
          : "Every dragon begins\nwith a spark.",
      ),
    );
    hero.append(
      el(
        "p",
        done === 7
          ? "The first constellation is complete. Revisit the stories, or wander deeper into the archive."
          : "Read a story. Recover a memory. Awaken the dragon beside you.",
        "hero-description",
      ),
    );
    hero.append(portrait());
    const companion = el("div", undefined, "companion-caption");
    companion.append(el("strong", state.name), el("span", level(state).name));
    hero.append(companion, progressCard());
    const cta = link(
      done === 7
        ? "Explore the full archive ↗"
        : done
          ? "Continue your journey →"
          : "Find the first memory →",
      done === 7 ? "#archive" : `#quest/${current.id}`,
      "primary",
    );
    hero.append(cta);
    $("screen").append(hero);
    const stats = el("div", undefined, "journey-stats");
    stats.append(
      el("span", `${done} / 7 memories recovered`),
      el(
        "span",
        `${state.days.length} ${state.days.length === 1 ? "day" : "days"} explored`,
      ),
    );
    $("screen").append(stats);
    const trail = el("section", undefined, "trail");
    trail.append(
      el("p", "CHAPTER I · THE REMEMBERING", "eyebrow"),
      el("h2", "Follow the thread."),
    );
    const ordered = el("ol", undefined, "quest-list");
    quests.forEach((quest, index) => {
      const finished = state.completed.includes(quest.id),
        locked = index > done;
      const row = el(
        "li",
        undefined,
        `quest-node ${finished ? "complete" : locked ? "locked" : "current"}`,
      );
      const item = locked
        ? el("div", undefined, "quest-link")
        : link("", `#quest/${quest.id}`, "quest-link");
      const text = el("span", undefined, "quest-text");
      text.append(
        el(
          "small",
          finished
            ? "MEMORY RECOVERED"
            : locked
              ? `AFTER MEMORY ${index}`
              : "YOUR NEXT QUEST",
        ),
        el("strong", quest.title),
        el(
          "span",
          locked
            ? "Continue the journey to unlock"
            : "A short passage · 40 XP on first completion",
        ),
      );
      item.append(
        el(
          "span",
          finished ? "✓" : String(index + 1).padStart(2, "0"),
          "quest-number",
        ),
        text,
        el("span", locked ? "·" : "↗", "quest-arrow"),
      );
      row.append(item);
      ordered.append(row);
    });
    trail.append(
      ordered,
      el(
        "p",
        state.days.includes(dayKey())
          ? "You made room for a story today. Your dragon will be here whenever you return."
          : "A journey at your own pace. Missed days never erase your progress.",
        "gentle-note",
      ),
    );
    $("screen").append(trail);
  }
  function dragon() {
    $("screen").append(
      heading(
        "YOUR COMPANION",
        state.name,
        "Every recovered memory makes your bond a little stronger.",
      ),
      portrait(),
      progressCard(),
    );
    const form = el("form", undefined, "name-form"),
      label = el("label", "What shall we call your dragon?");
    label.htmlFor = "dragonName";
    const row = el("div", undefined, "name-row"),
      input = el("input");
    input.id = "dragonName";
    input.value = state.name;
    input.maxLength = 24;
    input.required = true;
    const button = el("button", "Save name", "secondary");
    button.type = "submit";
    row.append(input, button);
    form.append(label, row);
    form.onsubmit = (event) => {
      event.preventDefault();
      if (!input.value.trim()) return;
      state.name = input.value;
      const saved = save();
      render();
      if (saved) $("storageStatus").textContent =
        "Your dragon’s name is saved on this device.";
    };
    $("screen").append(form);
    const section = el("section", undefined, "collection");
    section.append(
      el("p", "EARNED THROUGH EXPLORATION", "eyebrow"),
      el("h2", "A different kind of magic."),
    );
    const palette = el("div", undefined, "skin-grid");
    skins.forEach((skin) => {
      const item = el("button", undefined, "skin-card");
      item.type = "button";
      item.disabled = xp() < skin.xp;
      item.setAttribute("aria-pressed", String(state.skin === skin.id));
      const swatch = el("span", "✧", "skin-swatch");
      swatch.style.color = skin.color;
      item.append(
        swatch,
        el("strong", skin.name),
        el(
          "small",
          item.disabled
            ? `Unlock at ${skin.xp} XP`
            : state.skin === skin.id
              ? "Equipped"
              : "Equip",
        ),
      );
      item.onclick = () => {
        state.skin = skin.id;
        save();
        render();
      };
      palette.append(item);
    });
    section.append(palette);
    $("screen").append(section);
    const relics = el("section", undefined, "collection");
    relics.append(
      el("p", "THE MEMORIES YOU CARRY", "eyebrow"),
      el("h2", "Your constellation."),
    );
    const grid = el("div", undefined, "relic-grid");
    quests.forEach((quest) => {
      const unlocked = state.completed.includes(quest.id),
        item = el("div", undefined, `relic ${unlocked ? "found" : ""}`);
      item.append(
        el("span", unlocked ? quest.symbol : "·"),
        el("strong", unlocked ? quest.relic : "Undiscovered memory"),
      );
      grid.append(item);
    });
    relics.append(grid);
    $("screen").append(relics);
  }
  function archive() {
    $("screen").append(
      heading(
        "THE LIVING ARCHIVE",
        "A world to get lost in.",
        "All 27 chapters are free to explore. The seven quests are just your first steps.",
      ),
    );
    Object.entries(books).forEach(([id, book], index) => {
      const details = el("details", undefined, "archive-book"),
        summary = el("summary");
      summary.append(
        el("small", `BOOK ${String(index + 1).padStart(2, "0")}`),
        el("strong", book.title),
        el("span", `${Object.keys(book.chapters).length} chapters +`),
      );
      details.append(summary);
      Object.entries(book.chapters).forEach(([num, chapter]) =>
        details.append(
          link(
            `${num}. ${chapter.title}`,
            `#read/${id}/${num}`,
            "chapter-link",
          ),
        ),
      );
      $("screen").append(details);
    });
    $("screen").append(
      el(
        "p",
        "An original work of fantasy inspired by mythological traditions. The stories are fiction, not religious teaching.",
        "gentle-note",
      ),
    );
  }
  function passage(bookId, number, limit) {
    const chapter = books[bookId].chapters[number],
      article = el("article", undefined, "passage");
    article.append(
      el(
        "p",
        `${books[bookId].title} · Chapter ${number}${limit ? ` · Verses 1–${limit}` : ""}`,
        "eyebrow",
      ),
      el("h2", chapter.title),
    );
    chapter.verses.slice(0, limit).forEach((verse, index) => {
      const row = el("p", undefined, "verse");
      row.append(
        el("span", String(index + 1), "verse-num"),
        document.createTextNode(verse),
      );
      article.append(row);
    });
    return article;
  }
  function questView(id) {
    const index = quests.findIndex((item) => item.id === id),
      quest = quests[index];
    if (!quest || index > state.completed.length) {
      $("screen").append(
        heading(
          "STILL TO BE DISCOVERED",
          "Follow the next thread.",
          "This memory opens after the earlier quests.",
        ),
        link("Return to your journey →", "#journey", "primary"),
      );
      return;
    }
    returnQuest = id;
    $("screen").append(
      link("← Your journey", "#journey", "back-link"),
      heading(`MEMORY ${index + 1} OF 7`, quest.title, quest.subtitle),
      passage(quest.book, quest.chapter, 4),
    );
    $("screen").append(
      link(
        "Read the full chapter ↗",
        `#read/${quest.book}/${quest.chapter}`,
        "full-chapter",
      ),
    );
    const challenge = el("section", undefined, "challenge");
    challenge.append(
      el("p", "RECOVER THE MEMORY", "eyebrow"),
      el("h2", quest.question),
    );
    const form = el("form");
    form.id = "challengeForm";
    const choices = el("fieldset");
    const legend = el("legend", "Choose one answer", "sr-only");
    choices.append(legend);
    quest.answers.forEach((answer, i) => {
      const label = el("label", undefined, "answer-option"),
        radio = el("input");
      radio.type = "radio";
      radio.name = "answer";
      radio.value = String(i);
      radio.required = true;
      label.append(radio, el("span", answer));
      choices.append(label);
    });
    const submit = el("button", "Recover memory · 40 XP", "primary");
    submit.type = "submit";
    if (state.completed.includes(id))
      submit.textContent = "Revisit this memory";
    const feedback = el("p", "", "feedback");
    feedback.id = "answerFeedback";
    feedback.setAttribute("role", "status");
    form.append(choices, submit, feedback);
    form.onsubmit = (event) => {
      event.preventDefault();
      const selection = form.querySelector("input:checked");
      if (!selection) return;
      const previousLevel = level(state).number,
        result = complete(state, id, Number(selection.value), dayKey());
      if (!result.correct) {
        feedback.textContent =
          "Not quite. The clue is in the passage above. Take another look and try again—there is no penalty.";
        return;
      }
      state = result.state;
      save();
      challenge.replaceChildren();
      const reward = el("div", undefined, "reward");
      reward.append(
        el("span", quest.symbol, "reward-symbol"),
        el(
          "p",
          result.earned ? "+40 XP · MEMORY RECOVERED" : "A MEMORY REVISITED",
          "eyebrow",
        ),
        el("h2", quest.relic),
        el("p", quest.insight),
      );
      if (level(state).number > previousLevel)
        reward.append(
          el(
            "p",
            `${state.name} has become a ${level(state).name.toLowerCase()}!`,
            "evolution",
          ),
        );
      reward.append(
        link(
          index === quests.length - 1
            ? "See your constellation →"
            : "Return to your journey →",
          index === quests.length - 1 ? "#dragon" : "#journey",
          "primary",
        ),
      );
      challenge.append(reward);
      const title = reward.querySelector("h2");
      title.tabIndex = -1;
      title.focus({ preventScroll: true });
      challenge.scrollIntoView({ block: "start", behavior: "smooth" });
    };
    challenge.append(form);
    $("screen").append(challenge);
  }
  function readChapter(id, num) {
    if (!Object.hasOwn(books, id) || !Object.hasOwn(books[id].chapters, num)) {
      archive();
      return;
    }
    $("screen").append(
      link(
        returnQuest ? "← Back to your quest" : "← The archive",
        returnQuest ? `#quest/${returnQuest}` : "#archive",
        "back-link",
      ),
      passage(id, num),
    );
    const chapters = Object.keys(books[id].chapters).map(Number),
      index = chapters.indexOf(num),
      nav = el("div", undefined, "reader-nav");
    if (index > 0)
      nav.append(
        link(
          "← Previous chapter",
          `#read/${id}/${chapters[index - 1]}`,
          "secondary",
        ),
      );
    if (index < chapters.length - 1)
      nav.append(
        link(
          "Next chapter →",
          `#read/${id}/${chapters[index + 1]}`,
          "secondary",
        ),
      );
    $("screen").append(nav);
  }
  function render() {
    const route = location.hash.slice(1).split("/"),
      view = route[0] || "journey";
    $("screen").replaceChildren();
    if (view === "dragon") dragon();
    else if (view === "archive") {
      returnQuest = null;
      archive();
    } else if (view === "quest") questView(route[1]);
    else if (view === "read") readChapter(route[1], Number(route[2]));
    else journey();
    const active =
      view === "quest"
        ? "journey"
        : view === "read"
          ? "archive"
          : ["journey", "dragon", "archive"].includes(view)
            ? view
            : "journey";
    document.querySelectorAll("[data-tab]").forEach((tab) => {
      if (tab.dataset.tab === active) tab.setAttribute("aria-current", "page");
      else tab.removeAttribute("aria-current");
    });
    document.title = `${$("screen").querySelector("h1,h2")?.textContent || "The Remembering"} · Dragon Bible`;
    window.scrollTo({ top: 0, behavior: "instant" });
    $("screen").focus({ preventScroll: true });
  }
  document.querySelector(".skip").onclick = (event) => {
    event.preventDefault();
    $("screen").focus();
  };
  $("installButton").onclick = () => $("installDialog").showModal();
  document.querySelector(".close-dialog").onclick = () =>
    $("installDialog").close();
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    $("nativeInstall").hidden = false;
  });
  $("nativeInstall").onclick = async () => {
    if (!installPrompt) return;
    try {
      await installPrompt.prompt();
      await installPrompt.userChoice;
    } catch {
      $("offlineStatus").textContent =
        "Use your browser’s menu to add the app to your home screen.";
    }
    installPrompt = null;
    $("nativeInstall").hidden = true;
  };
  window.addEventListener("hashchange", render);
  if ("serviceWorker" in navigator)
    navigator.serviceWorker
      .register("./sw.js", { scope: "./" })
      .then(() => navigator.serviceWorker.ready)
      .then(() => {
        $("offlineStatus").textContent =
          "This journey is ready for offline reading. Your progress is saved on this device; it does not sync between browsers. Clearing site data removes it.";
      })
      .catch(() => {
        $("offlineStatus").textContent =
          "Offline mode could not be prepared. You can still play online. Progress is saved in this browser.";
      });
  render();
})();
