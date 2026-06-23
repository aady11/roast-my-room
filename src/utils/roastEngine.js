// ============================================================
// RoastMyRoom — Mock AI Roast Engine
// In production, replace generateRoast() with a real API call
// to OpenAI Vision, Google Gemini, or similar multimodal LLM.
// ============================================================

const roastDatabase = {
  "room-goblin": {
    styles: [
      "Chaotic Student",
      "Gremlin Chic",
      "Post-Apocalyptic Bachelor",
      "Disaster Goblin Mode",
      "Controlled Chaos Enthusiast",
    ],
    roastSets: [
      [
        "I've seen landfills with better feng shui. At least they have zones.",
        "Your room has the energy of someone who gave up in 2019 and just… kept going.",
        "I live in the walls of bad decisions. This room is my five-star hotel.",
      ],
      [
        "Even I — a creature born from chaos — feel personally victimized by this floor situation.",
        "That pile in the corner? It filed a noise complaint against you. In your own room.",
        "You didn't lose your keys. Your keys escaped. Can you blame them?",
      ],
      [
        "Your room has three distinct biomes. None of them are habitable.",
        "I asked the dust bunnies what happened here. They said 'we don't talk about it.'",
        "Your desk setup is giving 'gave up mid-assembly and accepted fate.'",
      ],
      [
        "Archaeologists in 3024 will study this room and write their dissertations on it.",
        "The vibe here is 'someone was definitely living their best life and then… wasn't.'",
        "I've haunted scarier rooms, but none that smelled quite so aggressively of choices.",
      ],
    ],
    compliments: [
      "That one plant in the corner is genuinely thriving. It's the survivor of this room.",
      "Points for having a lamp. Darkness would have been the coward's choice.",
      "Your monitor setup actually slaps. The rest of this? We don't speak of it.",
      "Bold of you to have a full-length mirror in here. That's confidence I respect.",
    ],
    fixes: [
      "Designate one corner as 'The Clean Zone.' Let it spread like a benevolent virus.",
      "Trash bag. One. Tonight. Just one. You can do it.",
      "Move the floor stuff to any surface that isn't the floor. Revolutionary, I know.",
      "Cable management. It costs $8. Please. For me. For us.",
    ],
  },

  "dumpster-dan": {
    styles: [
      "Reluctant Adult",
      "Dumpster Fire Deluxe",
      "Maximalist Disaster",
      "Academic Dumpster",
      "Certified Hot Mess",
    ],
    roastSets: [
      [
        "I've lived in actual dumpsters. I'm saying this with tears in my eyes: yours is worse.",
        "This room didn't just happen. Someone made choices. Series of them. Lord help us.",
        "I once reviewed a room that had a pizza box from 2017. I thought that was peak. I was not prepared for today.",
      ],
      [
        "Buddy. BUDDY. I have seen dumpsters with a stronger design vision than this.",
        "The smell I'm imagining just from looking at this is making my eyes water and I have no eyes.",
        "Your room is what happens when someone buys furniture without measuring anything. Ever.",
      ],
      [
        "I'm not angry. I'm just incredibly, profoundly disappointed. And also a little angry.",
        "I've comforted people who came out of this room. I understand them now. I understand them completely.",
        "There are items in this room that have forgotten what they were originally for.",
      ],
      [
        "In 40 years of dumpster living, I have never said this: yours is more chaotic than mine.",
        "Your room is the reason minimalism exists as a movement. It was a cry for help.",
        "I want to give this room a hug and then immediately leave and never return.",
      ],
    ],
    compliments: [
      "I'll be real — the lighting in here, while chaotic, has a certain 'late night crime drama' appeal.",
      "You've got more stuff than anyone needs, but at least it shows ambition. Terrible, cluttered ambition.",
      "The general layout suggests you once had a plan. I respect the vision even if the execution wept.",
      "Your bed looks comfortable. I'm glad someone in this room is doing okay.",
    ],
    fixes: [
      "Get a single storage ottoman. It can eat 40% of your floor crimes in one bite.",
      "The 'everything on the desk' strategy has run its course. Shelves exist, friend.",
      "Laundry basket. Not the floor. The basket. It's literally what it's for.",
      "One deep clean. Three hours. Put on a podcast. Save yourself.",
    ],
  },

  "judge-cat": {
    styles: [
      "Intellectual Disaster",
      "Failed Minimalist",
      "Academically Tragic",
      "Aspirational Chaos",
      "Disappointingly Human",
    ],
    roastSets: [
      [
        "I graduated top of my class. I've published three papers. Nothing prepared me for this room.",
        "I'm not angry. I'm just… I've looked at this for 4 minutes and I think I've lost faith in interior design as a field.",
        "The audacity of this space. The sheer, unblinking audacity.",
      ],
      [
        "In my professional opinion — and I have many — this room is a cry for help dressed up as a lifestyle.",
        "You have clearly never once googled 'how to arrange furniture.' I'm making this my problem now.",
        "Silence. I need a moment. ...Okay. I've collected myself. This is still terrible.",
      ],
      [
        "I served on the interior design board of three countries. I resigned after seeing this room.",
        "There is a book on that desk. One book. I respect it. It deserves a better home.",
        "Whatever vision you had for this space — and I doubt you had one — it did not survive contact with reality.",
      ],
      [
        "I've reviewed 12,000 rooms. I've given zero fives. I would give this a negative.",
        "You appear to have decorated using the 'wherever I stood when I got tired' method. Bold.",
        "This room is proof that having square footage and using it well are two very different things.",
      ],
    ],
    compliments: [
      "The color of your walls is inoffensive. That's the nicest thing I can say and I mean it sincerely.",
      "One item in this room — just one — appears to have been placed deliberately. I appreciate that item.",
      "Your window placement is architecturally sound. That was decided before you moved in, but still.",
      "I see potential here. It's buried. Deeply. But I see it. Barely.",
    ],
    fixes: [
      "Remove 30% of items from every surface. Breathe. That's called negative space. It's free.",
      "Symmetry is not a trend. It is a law. Please respect it.",
      "A rug would unify this disaster into something that merely disappoints rather than offends.",
      "Light. You need real light. Not the single sad bulb situation you have going on.",
    ],
  },

  "chaos-crow": {
    styles: [
      "MAXIMUM CHAOS",
      "Giga Disaster Mode",
      "Unhinged Creative",
      "Feral Academic",
      "Vibes Only (Bad Vibes)",
    ],
    roastSets: [
      [
        "WAIT. WAIT WAIT WAIT. Is that — no — YES IT IS. A SOCK. ON THE MONITOR. A SOCK.",
        "I am VIBRATING. This room is sending me frequencies I was not equipped to receive!!",
        "Okay I've been staring for 30 seconds and I've found 7 things that raise federal questions.",
      ],
      [
        "BREAKING NEWS: Local room commits CRIMES against spatial reasoning. More at 11.",
        "I can't — I physically cannot — process all of this at once. My crow brain is SPINNING.",
        "Every time I think I've found the worst part there is ANOTHER PART. It's a HYDRA OF MESS.",
      ],
      [
        "SIR. MA'AM. PERSON. This room is not a room. It's a DOCUMENTARY about giving up.",
        "I showed this to my therapist. She took two weeks off. I feel responsible.",
        "The ENERGY in here!! The CHAOS!! I respect it but also I'm CALLING SOMEONE.",
      ],
      [
        "This room said 'what if entropy but make it aesthetic' and SOMEHOW IT ALMOST WORKS??",
        "I'm not roasting you. I'm IMPRESSED. In the way you're impressed by a car crash.",
        "PLOT TWIST: What if this was intentional?? What if you're a GENIUS?? (You're not. But WHAT IF.)",
      ],
    ],
    compliments: [
      "Okay but the chaotic energy in here is VERY on-brand for someone who clearly lives life at full volume!!",
      "You've got personality!! It's expressed through every single surface being used as storage, but PERSONALITY!!",
      "I see someone who doesn't follow RULES and honestly?? Terrifying but also weirdly inspiring!!",
      "That one area over there — you know the one — it's PERFECT. Everything else is a crime but THAT BIT!!",
    ],
    fixes: [
      "Pick ONE corner and make it gorgeous. Let the chaos surround a single island of beauty. ART!!",
      "STRING LIGHTS. Immediately. They make EVERY disaster look intentional. TRUST ME!!",
      "A whiteboard!! Channel the chaos INTO the chaos!! USE THE WALLS LEGALLY!!",
      "Deep clean, turn on the most chaotic playlist you own, go FERAL on it. You'll feel AMAZING!!",
    ],
  },
};

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateScores(mascotId) {
  // Each mascot scores slightly differently to add personality
  const baseScores = {
    "room-goblin": {
      dripScore: () => Math.floor(Math.random() * 35) + 30,
      cleanliness: () => Math.floor(Math.random() * 40) + 10,
      vibe: () => Math.floor(Math.random() * 40) + 40,
      hustleEnergy: () => Math.floor(Math.random() * 50) + 30,
      redFlags: () => Math.floor(Math.random() * 50) + 40,
    },
    "dumpster-dan": {
      dripScore: () => Math.floor(Math.random() * 30) + 20,
      cleanliness: () => Math.floor(Math.random() * 30) + 5,
      vibe: () => Math.floor(Math.random() * 35) + 25,
      hustleEnergy: () => Math.floor(Math.random() * 45) + 20,
      redFlags: () => Math.floor(Math.random() * 40) + 55,
    },
    "judge-cat": {
      dripScore: () => Math.floor(Math.random() * 40) + 25,
      cleanliness: () => Math.floor(Math.random() * 35) + 15,
      vibe: () => Math.floor(Math.random() * 30) + 30,
      hustleEnergy: () => Math.floor(Math.random() * 40) + 35,
      redFlags: () => Math.floor(Math.random() * 45) + 45,
    },
    "chaos-crow": {
      dripScore: () => Math.floor(Math.random() * 50) + 35,
      cleanliness: () => Math.floor(Math.random() * 45) + 15,
      vibe: () => Math.floor(Math.random() * 50) + 45,
      hustleEnergy: () => Math.floor(Math.random() * 55) + 40,
      redFlags: () => Math.floor(Math.random() * 50) + 45,
    },
  };

  const s = baseScores[mascotId];
  return {
    dripScore: s.dripScore(),
    cleanliness: s.cleanliness(),
    vibe: s.vibe(),
    hustleEnergy: s.hustleEnergy(),
    redFlags: s.redFlags(),
  };
}

export async function generateRoast(imageFile, mascotId) {
  // Simulate API call delay (1.5s - 3s)
  const delay = Math.floor(Math.random() * 1500) + 1500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const db = roastDatabase[mascotId];
  if (!db) throw new Error(`Unknown mascot: ${mascotId}`);

  const scores = generateScores(mascotId);
  const style = randomFrom(db.styles);
  const roastSet = randomFrom(db.roastSets);
  const compliment = randomFrom(db.compliments);
  const fix = randomFrom(db.fixes);

  return {
    dripScore: scores.dripScore,
    style,
    cleanliness: scores.cleanliness,
    vibe: scores.vibe,
    hustleEnergy: scores.hustleEnergy,
    redFlags: scores.redFlags,
    roasts: roastSet,
    compliment,
    fix,
  };
}

export function getScoreLabel(score) {
  if (score >= 85) return { label: "Immaculate", color: "text-emerald-400" };
  if (score >= 70) return { label: "Decent", color: "text-green-400" };
  if (score >= 55) return { label: "Mediocre", color: "text-yellow-400" };
  if (score >= 40) return { label: "Rough", color: "text-orange-400" };
  if (score >= 25) return { label: "Yikes", color: "text-red-400" };
  return { label: "Criminal", color: "text-red-600" };
}

export function getDripLabel(score) {
  if (score >= 85) return { label: "Legend Tier", emoji: "👑" };
  if (score >= 70) return { label: "Solid Setup", emoji: "✨" };
  if (score >= 55) return { label: "Mid Energy", emoji: "😐" };
  if (score >= 40) return { label: "Needs Work", emoji: "😬" };
  if (score >= 25) return { label: "Send Help", emoji: "🚨" };
  return { label: "Burn It Down", emoji: "🔥" };
}
