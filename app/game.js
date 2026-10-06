(function (root, factory) {
  const game = factory();
  if (typeof module === "object" && module.exports) module.exports = game;
  else root.DragonQuest = game;
})(typeof window === "undefined" ? globalThis : window, function () {
  "use strict";
  const quests = [
    {
      id: "flame",
      book: "genesis",
      chapter: 1,
      title: "Before the fracture",
      subtitle: "Find the first spark of a forgotten world.",
      relic: "Primordial Flame",
      symbol: "✧",
      question: "What did the Primordial Flame hold together?",
      answers: [
        "Only fire and stone",
        "Human and dragon consciousness",
        "Seven separate kingdoms",
      ],
      correct: 1,
      insight:
        "The First Being held human and dragon nature in a single consciousness. The journey begins with wholeness.",
    },
    {
      id: "memory",
      book: "exodus",
      chapter: 1,
      title: "The memory in the blood",
      subtitle: "Follow a people who carry more than they know.",
      relic: "Seed of Memory",
      symbol: "❋",
      question: "What do the seventy souls each carry?",
      answers: [
        "A piece of the original unified consciousness",
        "A map to Mount Hermon",
        "A crown from the material realm",
      ],
      correct: 0,
      insight:
        "The soul-fragments are scattered, but not destroyed. Memory can survive even generations of forgetting.",
    },
    {
      id: "watchers",
      book: "enoch",
      chapter: 1,
      title: "An oath beneath the stars",
      subtitle: "Stand with the Watchers at the edge of two realms.",
      relic: "Watcher’s Oath",
      symbol: "✦",
      question: "Where did the two hundred Watchers descend?",
      answers: ["The temple mount", "The Garden of Unity", "Mount Hermon"],
      correct: 2,
      insight:
        "On Mount Hermon, the Watchers bound themselves with mutual oaths. Their choice would change both realms.",
    },
    {
      id: "veil",
      book: "nag-hammadi",
      chapter: 1,
      title: "Beyond the veil",
      subtitle: "Listen for the living meaning beneath the words.",
      relic: "Living Word",
      symbol: "◈",
      question: "How does John describe the realm his teacher returned to?",
      answers: [
        "A kingdom of earthly rulers",
        "A place where human and dragon consciousness merge",
        "A realm without memory",
      ],
      correct: 1,
      insight:
        "John speaks of living unity beyond the letters of separation. This story asks what a teaching means when it is lived.",
    },
    {
      id: "shadow",
      book: "judas",
      chapter: 1,
      title: "The shape of a shadow",
      subtitle: "Notice what the others cannot yet see.",
      relic: "Hidden Wing",
      symbol: "⟡",
      question: "What did Judas notice about his teacher’s shadow?",
      answers: [
        "It sometimes showed wings",
        "It disappeared at dawn",
        "It always pointed north",
      ],
      correct: 0,
      insight:
        "In this fictional retelling, Judas perceives the dragon nature hidden in plain sight. Attention becomes a kind of remembering.",
    },
    {
      id: "roots",
      book: "psalms",
      chapter: 1,
      title: "Roots below. Wings above.",
      subtitle: "Discover what it means to live in both realms.",
      relic: "Tree of Reunion",
      symbol: "✺",
      question: "What does the tree planted by living water symbolize here?",
      answers: [
        "Escape from the earth",
        "Separation from all other beings",
        "A bridge between earth and the realms above",
      ],
      correct: 2,
      insight:
        "With roots in earth and a crown in the clouds, the tree draws life from both realms. Growth is integration.",
    },
    {
      id: "reunion",
      book: "revelation",
      chapter: 1,
      title: "The world remembers",
      subtitle: "Gather the seven memories into one constellation.",
      relic: "Dawn of Reunion",
      symbol: "☼",
      question: "What does the final unveiling promise?",
      answers: [
        "The destruction of every realm",
        "The end of separation through transformation",
        "An eternal division between human and dragon",
      ],
      correct: 1,
      insight:
        "The unveiling is a transformation: the end of separation. Your first journey closes where it began—with the possibility of wholeness.",
    },
  ];
  const skins = [
    {
      id: "ember",
      name: "Ember",
      xp: 0,
      color: "#dba16c",
      description: "The warmth of the first flame.",
    },
    {
      id: "moon",
      name: "Moonwater",
      xp: 120,
      color: "#b4bedf",
      description: "A quiet sky, reflected in silver scales.",
    },
    {
      id: "jade",
      name: "Jade",
      xp: 240,
      color: "#9bd1b2",
      description: "The green heart of a world remembering.",
    },
  ];
  const encounters = {
    flame: {
      scene:
        "In the emberlight, your dragon finds a spark trembling between two stones. It could become a beacon—or disappear into the dark. What will you do?",
      choices: [
        {
          id: "listen",
          trait: "wonder",
          label: "Listen for the spark’s story",
          outcome:
            "You lean close. Beneath its crackle is a rhythm like two hearts remembering the same song. Your dragon learns that the smallest things can hold a world.",
        },
        {
          id: "shelter",
          trait: "care",
          label: "Shelter it from the wind",
          outcome:
            "You cup your hands around the flame. Your dragon curls beside you, making a little circle of warmth. A memory survives because someone chose to protect it.",
        },
        {
          id: "beacon",
          trait: "courage",
          label: "Carry it into the darkness",
          outcome:
            "Together, you lift the spark. A narrow path appears beyond the stones. Your dragon takes the first step, and you follow the light you chose to carry.",
        },
      ],
    },
    memory: {
      scene:
        "At the edge of an imagined desert, a traveler has forgotten the melody that once guided them home. Your dragon hears a faint note beneath the sand.",
      choices: [
        {
          id: "trace",
          trait: "wonder",
          label: "Trace the buried melody",
          outcome:
            "You follow the note from stone to stone until its pattern becomes clear. Your dragon hums the missing phrase. The traveler remembers the way.",
        },
        {
          id: "walk",
          trait: "care",
          label: "Walk beside the traveler",
          outcome:
            "You offer company before answers. With each shared step, another note returns. Your dragon discovers that remembering need not be a solitary task.",
        },
        {
          id: "sing",
          trait: "courage",
          label: "Sing the first uncertain note",
          outcome:
            "Your voice is unsteady, but you begin. The traveler answers, then your dragon joins. The desert carries a song that none of you could have made alone.",
        },
      ],
    },
    watchers: {
      scene:
        "Beneath a sky of unfamiliar stars, your dragon pauses at a bridge between two cliffs. Across it, a lantern waits for someone brave enough to answer.",
      choices: [
        {
          id: "stars",
          trait: "wonder",
          label: "Read the stars above the bridge",
          outcome:
            "The constellations repeat the pattern woven into the ropes. You find the crossing’s strongest line, and your dragon follows with newly curious eyes.",
        },
        {
          id: "steady",
          trait: "care",
          label: "Steady the bridge for your companion",
          outcome:
            "You hold the ropes while your dragon crosses. On the far side, it does the same for you. A shared promise becomes something you can stand on.",
        },
        {
          id: "cross",
          trait: "courage",
          label: "Take the first step together",
          outcome:
            "The bridge sways, but you move as one. When you reach the lantern, your dragon touches its nose to your hand. Neither of you crossed alone.",
        },
      ],
    },
    veil: {
      scene:
        "In a quiet library between dreams, a book has no words—only a warm light beneath its cover. Your dragon watches to see how you will read it.",
      choices: [
        {
          id: "pattern",
          trait: "wonder",
          label: "Study the light’s changing pattern",
          outcome:
            "The light shifts with your attention. You discover a story told through rhythm instead of letters. Your dragon learns another way of listening.",
        },
        {
          id: "share",
          trait: "care",
          label: "Make room for another reader",
          outcome:
            "You set the book between you. Reflected in your dragon’s eyes, the light reveals a shape you could not see alone. Meaning grows in the space you share.",
        },
        {
          id: "question",
          trait: "courage",
          label: "Ask the question you have been avoiding",
          outcome:
            "You speak into the stillness. The book offers no easy answer, but its light grows warmer. Your dragon learns that an honest question can open a door.",
        },
      ],
    },
    shadow: {
      scene:
        "At sunset, a stranger’s shadow briefly spreads a pair of wings. Your dragon notices. The stranger notices you noticing, and looks away.",
      choices: [
        {
          id: "observe",
          trait: "wonder",
          label: "Notice without demanding an explanation",
          outcome:
            "You leave space for the mystery. A feather-shaped flicker stays in your memory. Your dragon learns that curiosity can be patient.",
        },
        {
          id: "welcome",
          trait: "care",
          label: "Offer a place beside your fire",
          outcome:
            "You make room without asking the stranger to prove who they are. As the evening settles, the shadow rests. Your dragon learns the shape of welcome.",
        },
        {
          id: "reveal",
          trait: "courage",
          label: "Share a hidden part of your own story",
          outcome:
            "You speak first, offering a small truth of your own. The stranger turns back toward the fire. Your dragon sees how trust can begin with one honest voice.",
        },
      ],
    },
    roots: {
      scene:
        "A sapling grows where a stone road meets the river. One root reaches for water; another holds fast to the earth. Your dragon waits beside it.",
      choices: [
        {
          id: "study",
          trait: "wonder",
          label: "Learn how it lives in both worlds",
          outcome:
            "You watch the river breathe around the roots. The tree does not choose between earth and water; it grows through their meeting. Your dragon carries that pattern onward.",
        },
        {
          id: "tend",
          trait: "care",
          label: "Clear a little space for its roots",
          outcome:
            "You loosen the stones without pulling the tree from its place. Your dragon brings a fallen leaf for shelter. Small acts make room for a larger life.",
        },
        {
          id: "plant",
          trait: "courage",
          label: "Plant another seed across the river",
          outcome:
            "You cross with one seed held carefully in your palm. Your dragon guards the bank while you plant it. A bridge begins long before its branches meet.",
        },
      ],
    },
    reunion: {
      scene:
        "Seven lights circle your dragon. Each holds a memory of your journey. The constellation is whole, but its light can still travel beyond you.",
      choices: [
        {
          id: "map",
          trait: "wonder",
          label: "Map the paths you have not yet taken",
          outcome:
            "Between the seven lights, you notice new spaces waiting for a story. Your dragon looks toward them with you. Completion becomes another beginning.",
        },
        {
          id: "guide",
          trait: "care",
          label: "Leave a light for the next traveler",
          outcome:
            "You set a lantern beside the first stone. Your dragon adds a breath of warmth. Someone you may never meet will find a gentler beginning.",
        },
        {
          id: "horizon",
          trait: "courage",
          label: "Carry the constellation toward a new horizon",
          outcome:
            "You gather the lights into a single glow and step beyond the familiar path. Your dragon unfolds its wings. The world is larger than the journey that brought you here.",
        },
      ],
    },
  };
  const traits = {
    wonder: {
      name: "Curiosity",
      title: "An inquisitive spirit",
      description:
        "Your dragon looks for the story hidden inside ordinary things.",
    },
    care: {
      name: "Compassion",
      title: "A gentle protector",
      description:
        "Your dragon has learned to make room for others beside its fire.",
    },
    courage: {
      name: "Courage",
      title: "A brave pathfinder",
      description:
        "Your dragon meets unfamiliar horizons with a willing heart.",
    },
  };
  const validDay = (day) =>
    typeof day === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(day) &&
    Number.isFinite(Date.parse(day)) &&
    new Date(day).toISOString().slice(0, 10) === day;
  function normalize(raw) {
    const value = raw && typeof raw === "object" ? raw : {};
    const supplied = Array.isArray(value.completed) ? value.completed : [];
    const completed = [];
    for (const quest of quests) {
      if (!supplied.includes(quest.id)) break;
      completed.push(quest.id);
    }
    const name =
      typeof value.name === "string" ? value.name.trim().slice(0, 24) : "";
    const days = Array.isArray(value.days)
      ? [...new Set(value.days.filter((day) => validDay(day)))]
          .sort()
          .slice(-366)
      : [];
    const skin =
      skins.find(
        (item) => item.id === value.skin && item.xp <= completed.length * 40,
      )?.id || "ember";
    const choices = {};
    for (const id of completed) {
      const selected = value.choices?.[id];
      if (encounters[id].choices.some((choice) => choice.id === selected))
        choices[id] = selected;
    }
    return {
      version: 2,
      name: name || "Ember",
      completed,
      days,
      skin,
      choices,
    };
  }
  function level(state) {
    const xp = normalize(state).completed.length * 40;
    if (xp >= 240)
      return { number: 4, name: "Guardian", floor: 240, next: null };
    if (xp >= 120)
      return { number: 3, name: "Young dragon", floor: 120, next: 240 };
    if (xp >= 40) return { number: 2, name: "Hatchling", floor: 40, next: 120 };
    return { number: 1, name: "Dreaming egg", floor: 0, next: 40 };
  }
  function complete(raw, id, answer, day) {
    const state = normalize(raw),
      index = quests.findIndex((quest) => quest.id === id),
      quest = quests[index];
    if (!quest || index > state.completed.length || answer !== quest.correct)
      return { state, correct: false, earned: 0 };
    if (validDay(day) && !state.days.includes(day)) state.days.push(day);
    if (state.completed.includes(id))
      return { state: normalize(state), correct: true, earned: 0 };
    state.completed.push(id);
    return { state: normalize(state), correct: true, earned: 40 };
  }
  function choose(raw, id, choiceId, day) {
    const state = normalize(raw);
    if (
      !state.completed.includes(id) ||
      !encounters[id]?.choices.some((choice) => choice.id === choiceId)
    )
      return state;
    state.choices[id] = choiceId;
    if (validDay(day) && !state.days.includes(day)) state.days.push(day);
    return normalize(state);
  }
  function temperament(raw) {
    const state = normalize(raw),
      counts = { wonder: 0, care: 0, courage: 0 };
    for (const [id, choiceId] of Object.entries(state.choices)) {
      counts[
        encounters[id].choices.find((choice) => choice.id === choiceId).trait
      ]++;
    }
    const total = Object.values(counts).reduce((a, b) => a + b, 0),
      highest = Math.max(...Object.values(counts));
    const leaders = Object.keys(counts).filter(
      (key) => counts[key] === highest,
    );
    return {
      counts,
      total,
      ...(total === 0
        ? {
            title: "A story still unwritten",
            description:
              "The choices you make on your journey will shape your dragon’s spirit.",
          }
        : leaders.length === 1
          ? traits[leaders[0]]
          : {
              title: "A balanced spirit",
              description:
                "Your dragon carries more than one way of meeting the world.",
            }),
    };
  }
  function exportSave(raw, date = new Date()) {
    return JSON.stringify(
      {
        format: "dragonbible-journey",
        formatVersion: 1,
        exportedAt: date.toISOString(),
        progress: normalize(raw),
      },
      null,
      2,
    );
  }
  function parseSave(text) {
    if (typeof text !== "string" || text.length > 65536)
      throw new Error("Choose a Dragon Bible save file smaller than 64 KB.");
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(
        "This file is not readable JSON. Choose a Dragon Bible save file.",
      );
    }
    const raw = data?.progress;
    if (
      data?.format !== "dragonbible-journey" ||
      data.formatVersion !== 1 ||
      !raw ||
      ![1, 2].includes(raw.version) ||
      !Array.isArray(raw.completed)
    )
      throw new Error("This is not a supported Dragon Bible save file.");
    const state = normalize(raw);
    if (
      raw.completed.length !== state.completed.length ||
      raw.completed.some((id, i) => state.completed[i] !== id)
    )
      throw new Error(
        "The quest progress in this file is incomplete or invalid.",
      );
    if (
      raw.choices !== undefined &&
      (!raw.choices ||
        Array.isArray(raw.choices) ||
        typeof raw.choices !== "object" ||
        Object.keys(raw.choices).some(
          (id) => state.choices[id] !== raw.choices[id],
        ))
    )
      throw new Error("The story choices in this file are invalid.");
    return state;
  }
  function mergeSave(current, incoming, useProfile = false) {
    const a = normalize(current),
      b = normalize(incoming),
      profile = useProfile ? b : a;
    return normalize({
      ...profile,
      completed:
        a.completed.length >= b.completed.length ? a.completed : b.completed,
      days: [...a.days, ...b.days],
      choices: { ...b.choices, ...a.choices },
    });
  }
  return {
    quests,
    skins,
    encounters,
    traits,
    normalize,
    level,
    complete,
    choose,
    temperament,
    exportSave,
    parseSave,
    mergeSave,
  };
});
