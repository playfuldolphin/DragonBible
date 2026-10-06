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
      ? [
          ...new Set(
            value.days.filter(
              (day) =>
                typeof day === "string" &&
                /^\d{4}-\d{2}-\d{2}$/.test(day) &&
                Number.isFinite(Date.parse(day)),
            ),
          ),
        ].slice(-366)
      : [];
    const skin =
      skins.find(
        (item) => item.id === value.skin && item.xp <= completed.length * 40,
      )?.id || "ember";
    return { version: 1, name: name || "Ember", completed, days, skin };
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
    if (state.completed.includes(id))
      return { state, correct: true, earned: 0 };
    state.completed.push(id);
    if (
      typeof day === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(day) &&
      !state.days.includes(day)
    )
      state.days.push(day);
    return { state: normalize(state), correct: true, earned: 40 };
  }
  return { quests, skins, normalize, level, complete };
});
