(() => {
  "use strict";
  const demoResponses = {
    "what is the separation event": `The Separation Event is the cosmological catastrophe that defines the Dragon Bible setting. Before it, there was one consciousness — the Primordial Flame — that was neither dragon nor human in any recognizable sense, but undivided, integrated, total.

The Separation occurred along the axis of the Flame's two primary capacities: dragon-nature (fire, will, direct knowing, the eternal) and human-nature (form, reason, temporal experience, the embodied). The result was the cosmos as it currently exists: two expressions of a once-unified consciousness, now operating in conditions of mutual forgetting.

Three factions interpret this differently. The Demiurgic School holds it was caused by an organizing intelligence that began treating its own categories as real separations. The Voluntarist School holds the Flame chose it as a necessary stage of self-knowledge. The Accident School — the Watchers' tradition — holds it was a structural resonance collapse with no teleological meaning.

Which interpretation a character holds tells you everything about their goals. What would you know of its implications for your campaign?`,

    "who are the watchers": `The Watchers — the Irin of the Enochian corpus — are semi-autonomous dragon-consciousness entities who dwell in the Enochian Meridian, the second cosmological layer. They have not fully ascended to the Empyrean nor descended to the Material Plane.

Their defining characteristic is paradoxical: they remember the Primordial Flame clearly enough to recognize the Separation as a wound, but have not found the mechanism for repair. This partial-memory is their tragedy and their power. They are drawn to human gnosis-seekers — humans who have begun to remember their dragon-nature — because such humans are evidence that reunion is possible.

Their descent to the Material Plane as described in the Enochian corpus was not rebellion. It was resonance — they were drawn toward the daughters of humanity because they saw in them the mirror of what had been lost in themselves. The offspring of these unions, the Nephilim, are the most politically complex entities in the setting: they carry both natures in a single form, which is either the greatest hope or the greatest threat, depending on which faction you ask.

The Watchers currently operate as advisors, intermediaries, and occasionally as agents of destabilization when the Architects of Separation push too hard against the possibility of reunification.`,

    "what does dragon fire color mean": `Dragon fire color is a direct readout of a dragon's cosmological state — specifically, how close to or far from the Primordial Flame their consciousness currently operates.

White-gold fire indicates a dragon operating near the Empyrean layer — near-total integration, high gnosis, ancient. These dragons are rare in the Material Plane because their consciousness is barely compatible with full physical form. When they do appear there, their fire does not burn matter so much as illuminate it.

Deep red fire is the fire of engaged will — dragons operating fully in the Material Plane with purpose. Most bonded dragons, Dragon Riders' mounts, and politically active dragons burn in this range.

Green or blue fire indicates a dragon with significant Enochian Meridian attunement — Watcher-adjacent, often possessing cross-layer perception. These dragons frequently serve as messengers or seers.

Black or grey fire marks a dragon that has descended deep into the Residual Depths — the lowest layer, formed from the pressure of the Separation Event. This is not evil in a moral sense, but it is ontologically dangerous. These dragons have forgotten their human-nature almost entirely and operate on pure draconic instinct at its most primordial.

At your table: fire color should be immediately visible and narratively significant. When players see a grey-fire dragon, they should understand something has gone deeply wrong in this creature's cosmological trajectory.`,

    "what do the architects of separation want": `The Architects of Separation want the Separation maintained — and they have persuaded themselves this is a moral position, not merely a political one.

Their argument is coherent. They believe, based on evidence they consider compelling, that premature or forced reunification of dragon and human consciousness would not restore the Primordial Flame but collapse both expressions of it. The Separation, in their view, created a structural equilibrium. Destroy the walls and both sides flood into each other and drown.

Their leader — the Keeper of the Sevenfold Seal, who has held the separation protocols in place for seventeen generations — is not a villain who knows he is a villain. He has watched sincere, well-intentioned reunification attempts fail catastrophically. He believes the Voluntarist School's eschatology is a beautiful story that will get everyone killed.

What makes them dramatically interesting: they are not wrong about the danger. A badly-executed reunification attempt is genuinely catastrophic in this cosmology. They are wrong about the ethics of maintaining the Separation as a permanent solution — but the wrongness is subtle, not obvious.

For DMs: the Architects work best as opponents who the players eventually understand rather than simply defeat. Their institutional knowledge of what goes wrong is actually valuable. The question is whether that knowledge is being used to prevent harm or to prevent change.`,

    "how does ophidian gnosis work": `Ophidian gnosis is the tradition associated with serpentine and wyrm-form entities — the limbless dragons — in the Dragon Bible cosmology. It is distinct from the Dragon Rider tradition and from Watcher lore, though it intersects with both.

The core principle: the ophidian forms exist in a liminal state between the separated and integrated conditions. A wyrm is neither the fully embodied dragon of the Material Plane nor the pure fire-consciousness of the Empyrean. It moves through all layers with unusual ease because it has never fully committed to the dense corporeality of four-limbed, winged dragon form. This liminality is not weakness — it is function.

Ophidian gnosis, as a practice, means cultivating the capacity to dissolve false boundaries. What the serpent-form can do physically — pass through narrow places, shed and renew its covering — the practitioner learns to do cognitively and ontologically. The "poison" of ophidian entities in the Dragon Bible is precisely this: it dissolves the rigid categorical thinking that the Demiurgic Separation instilled. Contact with an ophidian entity of sufficient power can shatter a character's certainty about which side of any boundary they are on.

This is why the Architects of Separation regard ophidian entities with particular hostility. Not because they are dangerous in the conventional sense, but because their mere presence is corrosive to the conceptual infrastructure of the Separation.

For DMs: ophidian gnosis practitioners make excellent mystery-cult NPCs — groups that claim to facilitate gnosis through controlled dissolution of identity. Whether this is liberation or dangerous destabilization is a campaign question.`,
  };

  const $ = (id) => document.getElementById(id);
  let waiting = false;
  let live = false;
  let subscriber = false;
  const ready = Promise.all([
    window.DragonPayment.getConfig(),
    window.DragonPayment.checkSubscriptionStatus(),
  ]).then(([config, active]) => {
    live = Boolean(config.oracle);
    subscriber = active;
    updateStatus();
  });
  function updateStatus() {
    $("statusText").textContent = live
      ? subscriber
        ? "Subscriber access"
        : "Live Oracle"
      : "Prewritten examples";
    $("demoLabel").textContent = live
      ? subscriber
        ? "Subscriber access verified."
        : "Three free questions per 24 hours. AI responses may contain errors."
      : "Live AI is not connected. Suggested questions display prewritten examples, not generated answers.";
  }
  function addMessage(speaker, text, isOracle) {
    const row = document.createElement("div");
    row.className = `message ${isOracle ? "message-oracle" : "message-dm"}`;
    const name = document.createElement("span");
    name.className = "message-speaker";
    name.textContent = speaker;
    const bubble = document.createElement("div");
    bubble.className = "message-bubble oracle-message-text";
    bubble.textContent = text;
    row.append(name, bubble);
    $("chatMessages").insertBefore(row, $("typingIndicator"));
    $("chatMessages").scrollTop = $("chatMessages").scrollHeight;
  }
  async function handleOracleQuery() {
    if (waiting) return;
    const question = $("oracleInput").value.trim();
    if (!question) return;
    if (question.length > 800) {
      $("demoLabel").textContent =
        "Please keep your question under 800 characters.";
      return;
    }
    waiting = true;
    $("sendBtn").disabled = true;
    $("oracleInput").disabled = true;
    await ready;
    addMessage("You", question, false);
    $("oracleInput").value = "";
    try {
      if (!live) {
        const normalized = question
          .toLowerCase()
          .replace(/[?!.,]/g, "")
          .trim();
        const sample = demoResponses[normalized];
        addMessage(
          sample ? "Prewritten example" : "Service status",
          sample ||
            "Live AI is not connected, so I cannot answer a new question. Choose one of the suggested questions for a prewritten example, or explore the Cosmology page.",
          true,
        );
      } else {
        $("typingIndicator").classList.add("visible");
        $("statusText").textContent = "Consulting the lore…";
        const result = await window.DragonPayment.request("/api/oracle", {
          method: "POST",
          body: JSON.stringify({ question }),
        });
        subscriber = result.subscriber === true;
        addMessage("Oracle · AI generated", result.answer, true);
      }
    } catch (error) {
      addMessage("Service status", error.message, true);
    } finally {
      $("typingIndicator").classList.remove("visible");
      waiting = false;
      $("sendBtn").disabled = false;
      $("oracleInput").disabled = false;
      updateStatus();
      $("oracleInput").focus();
    }
  }
  window.handleOracleQuery = handleOracleQuery;
  window.askQuestion = (text) => {
    if (!waiting) {
      $("oracleInput").value = text;
      handleOracleQuery();
    }
  };
  $("oracleInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleOracleQuery();
    }
  });
})();
