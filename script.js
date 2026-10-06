(() => {
  "use strict";
  const { books, quizQuestions, dragonTypes } = window.DragonBibleContent;
  const chapterAt = (book, chapter) =>
    typeof book === "string" &&
    ["string", "number"].includes(typeof chapter) &&
    Object.hasOwn(books, book) &&
    Object.hasOwn(books[book].chapters, chapter)
      ? books[book].chapters[chapter]
      : null;
  const $ = (id) => document.getElementById(id);
  const storage = {
    read(key, fallback) {
      try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
      } catch {
        return fallback;
      }
    },
    write(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        $("appStatus").textContent =
          "Browser storage is unavailable. Your changes will last for this visit only.";
      }
    },
  };
  const progressKey = "dragonbible_reading_progress";
  const bookmarkKey = "dragonbible_bookmarks";
  let progress = storage.read(progressKey, {});
  if (!progress || typeof progress !== "object" || Array.isArray(progress))
    progress = {};
  if (
    !progress.chaptersCompleted ||
    typeof progress.chaptersCompleted !== "object"
  )
    progress.chaptersCompleted = {};
  let bookmarks = storage.read(bookmarkKey, []);
  if (!Array.isArray(bookmarks)) bookmarks = [];
  bookmarks = bookmarks.filter(
    (b) =>
      b &&
      ["string", "number"].includes(typeof b.verseIndex) &&
      Number.isInteger(Number(b.verseIndex)) &&
      Number(b.verseIndex) >= 0 &&
      typeof chapterAt(b.bookId, b.chapterNum)?.verses[Number(b.verseIndex)] === "string",
  );
  let notes = storage.read("dragonbible_comments", {});
  if (!notes || typeof notes !== "object" || Array.isArray(notes)) notes = {};
  let currentBook = null,
    currentChapter = 1,
    utterance = null,
    audioGeneration = 0,
    quizIndex = 0,
    quizScores = {},
    selectedPlan = "monthly";
  const totalChapters = Object.values(books).reduce(
    (n, book) => n + Object.keys(book.chapters).length,
    0,
  );
  const descriptions = {
    genesis:
      "The Primordial Flame, the first division, and the memory of wholeness.",
    exodus: "Liberation, transformation, and a people learning to remember.",
    enoch:
      "The Watchers descend. The boundary between realms begins to tremble.",
    "nag-hammadi":
      "Hidden knowledge of the serpent, the soul, and the world beyond appearances.",
    judas:
      "A familiar betrayal reconsidered through the eyes of a dragon sage.",
    psalms: "Songs of longing, remembrance, and the fire that survives within.",
    revelation:
      "Visions of the final unveiling and the possibility of reunion.",
  };
  function element(tag, text, className) {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (className) el.className = className;
    return el;
  }
  function chapterLink(bookId, chapter, verse) {
    return `#read/${encodeURIComponent(bookId)}/${chapter}${verse === undefined ? "" : "/" + (verse + 1)}`;
  }
  function updateProgress() {
    const count = Object.keys(progress.chaptersCompleted).filter((key) =>
      Object.entries(books).some(([id, book]) =>
        Object.keys(book.chapters).some((ch) => key === `${id}_${ch}`),
      ),
    ).length;
    $("readingProgressText").textContent = count
      ? `${count} of ${totalChapters} chapters visited`
      : `${totalChapters} chapters to explore`;
    const resume = $("resumeReading");
    resume.hidden =
      !chapterAt(progress.currentBook, progress.currentChapter);
    resume.onclick = () => {
      location.hash = chapterLink(
        progress.currentBook,
        progress.currentChapter,
      );
    };
  }
  function renderLibrary() {
    document.querySelectorAll("[data-chapter-count]").forEach((el) => {
      el.textContent = totalChapters;
    });
    Object.entries(books).forEach(([id, book], index) => {
      const card = element("a", undefined, "library-card");
      card.href = chapterLink(id, 1);
      card.append(
        element(
          "span",
          `BOOK ${String(index + 1).padStart(2, "0")}`,
          "card-number",
        ),
        element("h3", book.title),
        element("p", descriptions[id]),
      );
      const bottom = element("span", undefined, "card-bottom");
      bottom.append(
        element(
          "span",
          `${Object.keys(book.chapters).length} chapters · Free to read`,
        ),
        element("span", "↗"),
      );
      card.append(bottom);
      $("libraryGrid").append(card);
    });
    updateProgress();
  }
  function stopAudio() {
    audioGeneration++;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    utterance = null;
    $("audioBtn").textContent = "Play narration";
  }
  function toggleAudio() {
    const synthesis = window.speechSynthesis;
    if (!synthesis || !window.SpeechSynthesisUtterance || !currentBook) return;
    if (utterance) {
      if (synthesis.paused) {
        synthesis.resume();
        $("audioBtn").textContent = "Pause narration";
      } else {
        synthesis.pause();
        $("audioBtn").textContent = "Resume narration";
      }
      return;
    }
    const chapter = books[currentBook].chapters[currentChapter];
    const generation = ++audioGeneration;
    utterance = new SpeechSynthesisUtterance(
      chapter.title + ". " + chapter.verses.join(" "),
    );
    utterance.rate = Number($("audioSpeed").value);
    const voice = synthesis
      .getVoices()
      .find((v) => v.voiceURI === $("audioVoice").value);
    if (voice) utterance.voice = voice;
    utterance.onend = () => {
      if (generation === audioGeneration) {
        utterance = null;
        $("audioBtn").textContent = "Play narration";
      }
    };
    utterance.onerror = (event) => {
      if (generation === audioGeneration) {
        utterance = null;
        $("audioBtn").textContent = "Play narration";
        if (!["canceled", "interrupted"].includes(event.error))
          $("audioStatus").textContent =
            "This voice could not play. Try another voice on your device.";
      }
    };
    synthesis.speak(utterance);
    $("audioBtn").textContent = "Pause narration";
  }
  function populateVoices() {
    const selected = $("audioVoice").value;
    $("audioVoice").replaceChildren(new Option("Device default", ""));
    window.speechSynthesis
      ?.getVoices()
      .forEach((voice) =>
        $("audioVoice").add(
          new Option(`${voice.name} (${voice.lang})`, voice.voiceURI),
        ),
      );
    if (
      [...$("audioVoice").options].some((option) => option.value === selected)
    )
      $("audioVoice").value = selected;
  }
  function isBookmarked(book, chapter, verse) {
    return bookmarks.some(
      (b) =>
        b.bookId === book &&
        Number(b.chapterNum) === Number(chapter) &&
        Number(b.verseIndex) === verse,
    );
  }
  function notesKey() {
    return `dragonbible_comments_${currentBook}_${currentChapter}`;
  }
  function renderNotes() {
    const list = $("notesList");
    list.replaceChildren();
    const saved = notes[notesKey()];
    const entries = Array.isArray(saved)
      ? saved.filter((note) => note && typeof note.text === "string")
      : [];
    if (!entries.length)
      list.append(element("p", "No notes for this chapter yet.", "fine-print"));
    entries.forEach((note) => {
      const card = element("article", undefined, "result-item");
      const date = new Date(note.timestamp);
      card.append(
        element(
          "small",
          `${typeof note.author === "string" ? note.author : "You"}${Number.isNaN(date.valueOf()) ? "" : " · " + date.toLocaleDateString()}`,
        ),
        element("p", note.text),
      );
      list.append(card);
    });
  }
  function renderChapter(bookId, chapterNum, verse) {
    stopAudio();
    currentBook = bookId;
    currentChapter = chapterNum;
    const book = books[bookId],
      chapter = book.chapters[chapterNum];
    $("landing").hidden = true;
    $("reader").hidden = false;
    $("readerTitle").textContent = book.title;
    document.title = `${book.title} ${chapterNum}: ${chapter.title} — Dragon Bible`;
    $("chapterSelect").replaceChildren();
    Object.entries(book.chapters).forEach(([num, entry]) =>
      $("chapterSelect").add(new Option(`${num}. ${entry.title}`, num)),
    );
    $("chapterSelect").value = chapterNum;
    const chapterNumbers = Object.keys(book.chapters).map(Number),
      index = chapterNumbers.indexOf(chapterNum);
    $("previousChapter").disabled = index === 0;
    $("nextChapter").disabled = $("readerNext").disabled =
      index === chapterNumbers.length - 1;
    $("readerNext").textContent =
      index === chapterNumbers.length - 1
        ? "End of this book"
        : "Next chapter →";
    $("readerContent").replaceChildren(
      element("h2", `Chapter ${chapterNum}: ${chapter.title}`),
    );
    chapter.verses.forEach((text, i) => {
      const row = element("div", undefined, "chapter-verse");
      row.id = `verse-${i + 1}`;
      const button = element(
        "button",
        isBookmarked(bookId, chapterNum, i) ? "◆" : "◇",
        "verse-bookmark",
      );
      button.type = "button";
      button.setAttribute("aria-label", `Bookmark verse ${i + 1}`);
      button.setAttribute(
        "aria-pressed",
        String(isBookmarked(bookId, chapterNum, i)),
      );
      button.onclick = () => {
        if (isBookmarked(bookId, chapterNum, i))
          bookmarks = bookmarks.filter(
            (b) =>
              !(
                b.bookId === bookId &&
                Number(b.chapterNum) === chapterNum &&
                Number(b.verseIndex) === i
              ),
          );
        else
          bookmarks.push({
            id: `${bookId}-${chapterNum}-${i}`,
            bookId,
            chapterNum,
            verseIndex: i,
          });
        storage.write(bookmarkKey, bookmarks);
        button.setAttribute(
          "aria-pressed",
          String(isBookmarked(bookId, chapterNum, i)),
        );
        button.textContent = isBookmarked(bookId, chapterNum, i) ? "◆" : "◇";
        $("appStatus").textContent = isBookmarked(bookId, chapterNum, i)
          ? "Verse bookmarked."
          : "Bookmark removed.";
      };
      row.append(
        element("span", String(i + 1), "verse-number"),
        element("p", text),
        button,
      );
      $("readerContent").append(row);
    });
    progress.currentBook = bookId;
    progress.currentChapter = chapterNum;
    progress.chaptersCompleted[`${bookId}_${chapterNum}`] = {
      lastRead: new Date().toISOString(),
    };
    storage.write(progressKey, progress);
    updateProgress();
    renderNotes();
    $("noteText").value = "";
    $("readerTitle").focus({ preventScroll: true });
    ((verse && $(`verse-${verse}`)) || $("reader")).scrollIntoView({
      block: "start",
    });
  }
  function route() {
    const match = location.hash.match(/^#read\/([a-z-]+)\/(\d+)(?:\/(\d+))?$/);
    if (match && chapterAt(match[1], Number(match[2]))) {
      renderChapter(match[1], Number(match[2]), Number(match[3]) || undefined);
      return;
    }
    stopAudio();
    currentBook = null;
    $("reader").hidden = true;
    $("landing").hidden = false;
    document.title = "The Dragon Bible — A World Waiting to Be Remembered";
    if (location.hash.startsWith("#read/")) {
      $("appStatus").textContent =
        "That chapter is not available. Choose a book from the library.";
      history.replaceState(null, "", "#books");
    }
    if (
      location.hash === "#books" ||
      location.hash === "#pricing" ||
      location.hash === "#quiz"
    )
      $(location.hash.slice(1)).scrollIntoView({ block: "start" });
  }
  function moveChapter(offset) {
    if (!currentBook) return;
    const keys = Object.keys(books[currentBook].chapters).map(Number),
      next = keys[keys.indexOf(currentChapter) + offset];
    if (next) location.hash = chapterLink(currentBook, next);
  }
  function openDialog(id) {
    $(id).showModal();
  }
  function resultLink(bookId, num, verseIndex) {
    const book = books[bookId],
      chapter = book.chapters[num],
      link = element("a", undefined, "result-item");
    link.href = chapterLink(bookId, num, verseIndex);
    link.append(
      element(
        "small",
        `${book.title} ${num}:${verseIndex + 1} · ${chapter.title}`,
      ),
      element("p", chapter.verses[verseIndex]),
    );
    link.onclick = () => {
      document
        .querySelectorAll("dialog[open]")
        .forEach((dialog) => dialog.close());
      if (location.hash === link.hash) route();
    };
    return link;
  }
  function search(event) {
    event.preventDefault();
    const query = $("searchInput").value.trim().toLocaleLowerCase();
    $("searchResults").replaceChildren();
    if (query.length < 2) {
      $("searchStatus").textContent = "Enter at least two characters.";
      return;
    }
    let count = 0;
    Object.entries(books).forEach(([id, book]) =>
      Object.entries(book.chapters).forEach(([num, chapter]) =>
        chapter.verses.forEach((verse, i) => {
          if (verse.toLocaleLowerCase().includes(query)) {
            if (count < 100)
              $("searchResults").append(resultLink(id, Number(num), i));
            count++;
          }
        }),
      ),
    );
    $("searchStatus").textContent = count
      ? `${count} matching verses${count > 100 ? " · Showing the first 100. Refine your search for fewer results." : ""}`
      : "No matching verses. Try a different word or phrase.";
  }
  function showBookmarks() {
    $("bookmarksList").replaceChildren();
    if (!bookmarks.length)
      $("bookmarksList").append(
        element(
          "p",
          "No bookmarks yet. Open a chapter and select the diamond beside a verse.",
        ),
      );
    bookmarks.forEach((bookmark) => {
      const row = element("div", undefined, "bookmark-row"),
        remove = element("button", "×", "icon-button");
      remove.type = "button";
      remove.setAttribute(
        "aria-label",
        `Remove bookmark ${books[bookmark.bookId].title} ${bookmark.chapterNum}:${Number(bookmark.verseIndex) + 1}`,
      );
      remove.onclick = () => {
        bookmarks = bookmarks.filter((b) => b !== bookmark);
        storage.write(bookmarkKey, bookmarks);
        if (currentBook) renderChapter(currentBook, currentChapter);
        showBookmarks();
      };
      row.append(
        resultLink(
          bookmark.bookId,
          bookmark.chapterNum,
          Number(bookmark.verseIndex),
        ),
        remove,
      );
      $("bookmarksList").append(row);
    });
    if (!$("bookmarksModal").open) openDialog("bookmarksModal");
  }
  function startQuiz() {
    quizIndex = 0;
    quizScores = { fire: 0, water: 0, earth: 0, air: 0, storm: 0 };
    renderQuiz();
    if (!$("quizModal").open) openDialog("quizModal");
  }
  function renderQuiz() {
    const body = $("quizBody");
    body.replaceChildren();
    if (quizIndex < quizQuestions.length) {
      const question = quizQuestions[quizIndex];
      body.append(
        element(
          "p",
          `Question ${quizIndex + 1} of ${quizQuestions.length}`,
          "eyebrow",
        ),
        element("h3", question.question, "quiz-question"),
      );
      const options = element("div", undefined, "quiz-options");
      question.answers.forEach((answer) => {
        const button = element("button", answer.text, "result-item");
        button.type = "button";
        button.onclick = () => {
          quizScores[answer.type]++;
          quizIndex++;
          renderQuiz();
          body.querySelector("button,a")?.focus();
        };
        options.append(button);
      });
      body.append(options);
    } else {
      const type = Object.keys(quizScores).reduce((best, next) =>
          quizScores[next] > quizScores[best] ? next : best,
        ),
        result = dragonTypes[type];
      body.append(
        element("p", "Your archetype · For fun and inspiration", "eyebrow"),
        element("h3", `${result.icon} ${result.name}`, "quiz-question"),
        element("p", result.description),
      );
      const actions = element("div", undefined, "actions"),
        chapter = result.chapters[0];
      const link = element(
        "a",
        `Read ${books[chapter.book].title}, chapter ${chapter.num} →`,
        "text-link",
      );
      link.href = chapterLink(chapter.book, chapter.num);
      link.onclick = () => $("quizModal").close();
      const again = element("button", "Retake quiz", "text-link");
      again.type = "button";
      again.onclick = startQuiz;
      actions.append(link, again);
      body.append(actions);
    }
  }
  async function showPayment(plan) {
    selectedPlan = plan;
    $("paymentTitle").textContent =
      plan === "monthly"
        ? "DM Subscription — $5/month"
        : "Founding DM — $40 once";
    $("paymentSubtitle").textContent =
      plan === "monthly"
        ? "Monthly support and subscriber Oracle access. Cancel through the billing portal."
        : "One payment for lifetime subscriber Oracle access.";
    $("checkoutButton").disabled = true;
    $("checkoutStatus").textContent = "Checking checkout availability…";
    openDialog("paymentModal");
    const config = await window.DragonPayment.getConfig(),
      available = Boolean(config.plans?.[plan]);
    $("checkoutButton").hidden = !available;
    $("checkoutButton").disabled = !available;
    $("checkoutStatus").textContent = available
      ? "You will review the price on Stripe before paying."
      : "Online checkout is not connected yet. The entire published library is free to read. Contact Noah for updates on DM access.";
  }
  document.querySelectorAll("[data-action]").forEach((button) =>
    button.addEventListener("click", () => {
      if (button.dataset.action === "search") openDialog("searchModal");
      if (button.dataset.action === "bookmarks") showBookmarks();
      if (button.dataset.action === "quiz") startQuiz();
    }),
  );
  document
    .querySelectorAll("[data-plan]")
    .forEach((button) =>
      button.addEventListener("click", () => showPayment(button.dataset.plan)),
    );
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.querySelector("[data-close]").onclick = () => dialog.close();
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        const box = dialog.getBoundingClientRect();
        if (
          event.clientX < box.left ||
          event.clientX > box.right ||
          event.clientY < box.top ||
          event.clientY > box.bottom
        )
          dialog.close();
      }
    });
  });
  $("searchForm").addEventListener("submit", search);
  document.querySelector(".skip-link").addEventListener("click", (event) => {
    event.preventDefault();
    $("main").focus();
    $("main").scrollIntoView({ block: "start" });
  });
  $("noteForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const text = $("noteText").value.trim();
    if (!currentBook || !text || text.length > 4000) return;
    const key = notesKey();
    if (!Array.isArray(notes[key])) notes[key] = [];
    notes[key].unshift({
      id: Date.now(),
      author: "You",
      text,
      timestamp: new Date().toISOString(),
      reactions: {},
    });
    $("appStatus").textContent = "Note saved in this browser.";
    storage.write("dragonbible_comments", notes);
    renderNotes();
    $("noteText").value = "";
  });
  $("chapterSelect").onchange = () => {
    location.hash = chapterLink(currentBook, Number($("chapterSelect").value));
  };
  $("previousChapter").onclick = () => moveChapter(-1);
  $("nextChapter").onclick = $("readerNext").onclick = () => moveChapter(1);
  $("audioBtn").onclick = toggleAudio;
  $("stopAudio").onclick = stopAudio;
  $("audioSpeed").onchange = $("audioVoice").onchange = () => {
    if (utterance) {
      stopAudio();
      toggleAudio();
    }
  };
  if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
    $("audioBtn").disabled = true;
    $("audioStatus").textContent =
      "Narration is not supported by this browser. The full text is available below.";
  } else {
    populateVoices();
    window.speechSynthesis.addEventListener("voiceschanged", populateVoices);
  }
  $("checkoutButton").onclick = async () => {
    $("checkoutButton").disabled = true;
    $("checkoutStatus").textContent = "Opening secure checkout…";
    try {
      await window.DragonPayment.createCheckoutSession(selectedPlan);
    } catch (error) {
      $("checkoutStatus").textContent = error.message;
      $("checkoutButton").disabled = false;
    }
  };
  $("manageBilling").onclick = async () => {
    try {
      await window.DragonPayment.openCustomerPortal();
    } catch (error) {
      $("serviceStatus").textContent = error.message;
    }
  };
  window.DragonPayment.getConfig().then((config) => {
    $("serviceStatus").textContent =
      config.plans?.monthly || config.plans?.lifetime
        ? "Choose a plan to support the setting. Your checkout opens securely on Stripe."
        : "DM checkout is not connected yet. Explore the free library, sampler, and first-session guide today.";
  });
  window.DragonPayment.checkSubscriptionStatus().then((active) => {
    $("manageBilling").hidden = !active;
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.target.closest(
        "input,textarea,select,button,a,summary,[contenteditable=true]",
      ) ||
      document.querySelector("dialog[open]")
    )
      return;
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      !currentBook
    )
      return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      moveChapter(event.key === "ArrowLeft" ? -1 : 1);
    }
    if (event.code === "Space") {
      event.preventDefault();
      toggleAudio();
    }
  });
  window.addEventListener("hashchange", route);
  window.addEventListener("pagehide", stopAudio);
  renderLibrary();
  route();
})();
