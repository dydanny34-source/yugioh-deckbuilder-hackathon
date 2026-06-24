export interface SampleDeckDef {
  id: string;
  name: string;
  playstyle: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  era: 'Classic' | '2024 TCG' | '2025 TCG';
  gameplan: string;
  strengths: string[];
  weaknesses: string[];
  main: { name: string; qty: number }[];
  extra: { name: string; qty: number }[];
  side: { name: string; qty: number }[];
}

export const SAMPLE_DECKS: SampleDeckDef[] = [
  // ── CLASSIC ARCHETYPES ────────────────────────────────────────────

  {
    id: 'blue-eyes',
    name: 'Blue-Eyes White Dragon',
    playstyle: 'Synchro / Beatdown',
    difficulty: 'Beginner',
    era: 'Classic',
    gameplan:
      'Use The White Stone of Ancients and The Melody of Awakening Dragon to get Blue-Eyes White Dragon to the field fast. Sage with Eyes of Blue sends White Stone to the GY to set up Synchro plays. End on Azure-Eyes Silver Dragon or Blue-Eyes Spirit Dragon for protection, or Blue-Eyes Twin Burst Dragon to swing over anything.',
    strengths: [
      'Easy to pilot — linear strategy',
      'Huge ATK values overwhelm most boards',
      'Return of the Dragon Lords gives blanket destruction immunity',
      'Multiple recycling loops from the GY',
    ],
    weaknesses: [
      'Vulnerable to hand traps (Ash Blossom stops White Stone)',
      'Limited interaction on opponent\'s turn',
      'Brick-prone — too many Blue-Eyes in hand is slow',
    ],
    main: [
      { name: 'Blue-Eyes White Dragon', qty: 3 },
      { name: 'Blue-Eyes Alternative White Dragon', qty: 2 },
      { name: 'The White Stone of Ancients', qty: 3 },
      { name: 'Dragon Spirit of White', qty: 2 },
      { name: 'Sage with Eyes of Blue', qty: 3 },
      { name: 'Bingo Machine, Go!!!', qty: 3 },
      { name: 'The Melody of Awakening Dragon', qty: 3 },
      { name: 'Dragon Shrine', qty: 2 },
      { name: 'Return of the Dragon Lords', qty: 3 },
      { name: 'Trade-In', qty: 3 },
      { name: 'Cards of Consonance', qty: 3 },
      { name: "Silver's Cry", qty: 2 },
      { name: 'Monster Reborn', qty: 1 },         // Limited
      { name: 'Ash Blossom & Joyous Spring', qty: 3 },
      { name: 'Effect Veiler', qty: 2 },
      { name: 'Called by the Grave', qty: 1 },    // Limited
      { name: 'Upstart Goblin', qty: 1 },
    ],
    extra: [
      { name: 'Blue-Eyes Twin Burst Dragon', qty: 2 },
      { name: 'Azure-Eyes Silver Dragon', qty: 2 },
      { name: 'Blue-Eyes Spirit Dragon', qty: 2 },
      { name: 'Neo Blue-Eyes Ultimate Dragon', qty: 1 },
      { name: 'Stardust Dragon', qty: 1 },
      { name: 'Black Rose Dragon', qty: 1 },
      { name: 'Number 38: Hope Harbinger Dragon Titanic Galaxy', qty: 1 },
      { name: 'Hieratic Seal of the Heavenly Spheres', qty: 1 },
      { name: 'Striker Dragon', qty: 1 },
    ],
    side: [],
  },

  {
    id: 'salamangreat',
    name: 'Salamangreat',
    playstyle: 'Aggro / Link Reincarnation',
    difficulty: 'Intermediate',
    era: 'Classic',
    gameplan:
      'Salamangreat monsters are Cyberse monsters that thrive on recycling. Use Gazelle + Spinny as your two-card starter: Gazelle sends a Salamangreat from Deck to GY, Spinny Special Summons from GY. Link them into Balelynx to search Sanctuary. Then re-summon Heatleo or Sunlight Wolf using themselves as material ("Reincarnation"), activating powerful bonus effects. Sunlight Wolf reloads your hand each End Phase.',
    strengths: [
      'Resilient — monsters recover themselves from GY',
      'Consistent two-card starters',
      'Sunlight Wolf generates card advantage every turn',
      'Heatleo shuffles opponent cards into the Deck on Reincarnation',
    ],
    weaknesses: [
      'Graveyard hate (D.D. Crow, Dimensional Fissure) disrupts the engine',
      'Relies heavily on the Extra Deck',
      'Low ceiling against modern negation boards',
    ],
    main: [
      { name: 'Salamangreat Gazelle', qty: 3 },
      { name: 'Salamangreat Spinny', qty: 3 },
      { name: 'Salamangreat Foxy', qty: 2 },
      { name: 'Salamangreat Jack Jaguar', qty: 2 },
      { name: 'Salamangreat Falco', qty: 2 },
      { name: 'Lady Debug', qty: 3 },
      { name: 'Cynet Mining', qty: 3 },
      { name: 'Salamangreat Sanctuary', qty: 3 },
      { name: 'Salamangreat Circle', qty: 3 },
      { name: 'Will of the Salamangreat', qty: 2 },
      { name: 'Salamangreat Roar', qty: 2 },
      { name: 'Pot of Desires', qty: 2 },
      { name: 'Ash Blossom & Joyous Spring', qty: 3 },
      { name: 'Effect Veiler', qty: 2 },
      { name: 'Infinite Impermanence', qty: 2 },
      { name: 'Ghost Ogre & Snow Rabbit', qty: 2 },
      { name: 'Called by the Grave', qty: 1 },    // Limited
    ],
    extra: [
      { name: 'Salamangreat Sunlight Wolf', qty: 3 },
      { name: 'Salamangreat Heatleo', qty: 3 },
      { name: 'Salamangreat Balelynx', qty: 3 },
      { name: 'Salamangreat Miragestallio', qty: 2 },
      { name: 'Salamangreat Pyro Phoenix', qty: 1 },
      { name: 'Accesscode Talker', qty: 1 },
      { name: 'Transcode Talker', qty: 1 },
      { name: 'Knightmare Phoenix', qty: 1 },
    ],
    side: [],
  },

  {
    id: 'eldlich',
    name: 'Eldlich the Golden Lord',
    playstyle: 'Trap Control / Zombie',
    difficulty: 'Intermediate',
    era: 'Classic',
    gameplan:
      'Eldlich the Golden Lord is a self-recurring boss monster immune to card effects (while he has Spell/Trap counters). He can be sent from hand to GY to set an Eldlixir Trap directly. Eldlixirs float into each other, keeping a constant stream of interruptions. The deck wins by grinding opponents out of resources while Eldlich himself keeps returning from the Graveyard.',
    strengths: [
      'Eldlich is nearly unkillable — recurs himself every turn',
      'Strong grind game with constant trap floating',
      'Solemn package provides universal negation',
      'Very resilient to hand traps since you set up on opponent\'s turn',
    ],
    weaknesses: [
      'Slow against turbo combo decks that win before traps can resolve',
      'Loses to Spell/Trap removal (Twin Twisters, Lightning Storm)',
      'Low ceiling against decks that win through effects, not battles',
    ],
    main: [
      { name: 'Eldlich the Golden Lord', qty: 3 },
      { name: 'Conquistador of the Golden Land', qty: 3 },
      { name: 'Huaquero of the Golden Land', qty: 2 },
      { name: 'Cursed Eldland', qty: 3 },
      { name: 'Eldlixir of Scarlet Sanguine', qty: 3 },
      { name: 'Eldlixir of Black Awakening', qty: 2 },
      { name: 'Eldlixir of White Destiny', qty: 2 },
      { name: 'Golden Land Forever!', qty: 2 },
      { name: 'Zombie World', qty: 2 },
      { name: 'Solemn Strike', qty: 2 },
      { name: 'Solemn Judgment', qty: 1 },        // Limited
      { name: 'Solemn Warning', qty: 1 },
      { name: 'Infinite Impermanence', qty: 3 },
      { name: 'Ash Blossom & Joyous Spring', qty: 3 },
      { name: 'Effect Veiler', qty: 2 },
      { name: 'Ghost Ogre & Snow Rabbit', qty: 1 },
      { name: 'Called by the Grave', qty: 1 },    // Limited
      { name: 'Lightning Storm', qty: 1 },
      { name: 'Evenly Matched', qty: 1 },
      { name: 'Pot of Extravagance', qty: 2 },
    ],
    extra: [
      { name: 'Topologic Trisbaena', qty: 1 },
      { name: 'Knightmare Unicorn', qty: 1 },
      { name: 'Knightmare Phoenix', qty: 1 },
      { name: 'Underworld Goddess of the Closed World', qty: 1 },
      { name: 'Divine Arsenal AA-ZEUS - Sky Thunder', qty: 1 },
      { name: 'Number 38: Hope Harbinger Dragon Titanic Galaxy', qty: 1 },
    ],
    side: [],
  },

  {
    id: 'sky-striker',
    name: 'Sky Striker',
    playstyle: 'Spell Engine Control',
    difficulty: 'Advanced',
    era: 'Classic',
    gameplan:
      'Sky Striker Spells gain bonus effects once you have used 3 or more different Spells in the same turn — most importantly, Engage becomes a searcher+draw. Keep your Main Monster Zone empty to power up your Spell effects. Raye is your only main deck monster; she revives herself as a Sky Striker Ace Link from GY whenever she is used as Link Material. The deck wins by recycling Spells, disrupting with Widow Anchor, and out-resourcing opponents over a long game.',
    strengths: [
      'Engage creates massive card advantage at 3+ Spells used',
      'Raye is nearly impossible to permanently remove',
      'Extremely consistent — almost no dead cards',
      'Strong going-second with Lightning Storm + Dark Ruler No More',
    ],
    weaknesses: [
      'Weak individual card power without Engage online',
      'Punished by anti-Spell cards (Imperial Order, Spell Canceller)',
      'Loses to Droll & Lock Bird after Engage resolves',
    ],
    main: [
      { name: 'Sky Striker Ace - Raye', qty: 3 },
      { name: 'Sky Striker Ace - Roze', qty: 1 },
      { name: 'Sky Striker Mobilize - Engage!', qty: 3 },
      { name: 'Sky Striker Mecha - Widow Anchor', qty: 3 },
      { name: 'Sky Striker Mecha - Shark Cannon', qty: 2 },
      { name: 'Sky Striker Mecha Modules - Multirole', qty: 3 },
      { name: 'Sky Striker Airspace - Area Zero', qty: 2 },
      { name: 'Sky Striker Maneuver - Afterburners!', qty: 2 },
      { name: 'Sky Striker Maneuver - Jamming Waves!', qty: 1 },
      { name: 'Pot of Desires', qty: 2 },
      { name: 'Upstart Goblin', qty: 1 },
      { name: "Harpie's Feather Duster", qty: 1 },  // Limited
      { name: 'Forbidden Droplet', qty: 2 },
      { name: 'Dark Ruler No More', qty: 2 },
      { name: 'Lightning Storm', qty: 2 },
      { name: 'Ash Blossom & Joyous Spring', qty: 3 },
      { name: 'Ghost Belle & Haunted Mansion', qty: 2 },
      { name: 'Ghost Ogre & Snow Rabbit', qty: 1 },
      { name: 'Called by the Grave', qty: 1 },       // Limited
      { name: 'Infinite Impermanence', qty: 2 },
      { name: 'Crossout Designator', qty: 1 },       // Limited
    ],
    extra: [
      { name: 'Sky Striker Ace - Shizuku', qty: 3 },
      { name: 'Sky Striker Ace - Kagari', qty: 3 },
      { name: 'Sky Striker Ace - Hayate', qty: 3 },
      { name: 'Sky Striker Ace - Kaina', qty: 2 },
      { name: 'Knightmare Phoenix', qty: 1 },
      { name: 'Knightmare Unicorn', qty: 1 },
      { name: 'Accesscode Talker', qty: 1 },
      { name: 'Selene, Queen of the Master Magicians', qty: 1 },
    ],
    side: [],
  },

  {
    id: 'branded-despia',
    name: 'Branded Despia',
    playstyle: 'Fusion Control',
    difficulty: 'Advanced',
    era: 'Classic',
    gameplan:
      'Fallen of Albaz is the core Fusion engine — he can Fuse using monsters from either side of the field, including the opponent\'s monsters as material. Aluber the Jester of Despia searches any Branded Spell/Trap on Normal Summon. Branded Fusion sends Albaz + Dramaturge from Deck to Fuse during your Main Phase. The ideal endboard includes Mirrorjade the Iceblade Dragon (banishes a monster on opponent\'s turn) backed by Lubellion or Titaniklad as disruption.',
    strengths: [
      'Mirrorjade is a free pop on the opponent\'s turn that cycles into Albion',
      'Albion recovers Branded Fusion from GY each Standby Phase',
      'Strong Fusion toolbox answers many board states',
      'Ghost Belle and hand traps protect the combo',
    ],
    weaknesses: [
      'Aluber is the key Normal Summon — losing it to Ash Blossom hurts',
      'Branded Fusion (Limited) means the core search is not always available',
      'Weak to Dimensional Barrier calling Fusion',
    ],
    main: [
      { name: 'Fallen of Albaz', qty: 3 },
      { name: 'Aluber the Jester of Despia', qty: 3 },
      { name: 'Dramaturge of Despia', qty: 3 },
      { name: 'Despian Tragedy', qty: 3 },
      { name: 'Ad Libitum of Despia', qty: 1 },
      { name: 'Branded Fusion', qty: 1 },          // Limited
      { name: 'Branded in Red', qty: 2 },
      { name: 'Branded in White', qty: 1 },
      { name: 'Branded Opening', qty: 2 },
      { name: 'Branded Lost', qty: 1 },
      { name: 'Branded Retribution', qty: 1 },
      { name: 'Ash Blossom & Joyous Spring', qty: 3 },
      { name: 'Effect Veiler', qty: 2 },
      { name: 'Infinite Impermanence', qty: 2 },
      { name: 'Ghost Belle & Haunted Mansion', qty: 3 },
      { name: 'Called by the Grave', qty: 1 },     // Limited
      { name: 'Forbidden Droplet', qty: 2 },
      { name: 'Dark Ruler No More', qty: 3 },
      { name: 'Nibiru, the Primal Being', qty: 2 },
      { name: 'Crossout Designator', qty: 1 },     // Limited
    ],
    extra: [
      { name: 'Mirrorjade the Iceblade Dragon', qty: 3 },
      { name: 'Albion the Branded Dragon', qty: 2 },
      { name: 'Lubellion the Searing Dragon', qty: 2 },
      { name: 'Titaniklad the Ash Dragon', qty: 2 },
      { name: 'Granguignol the Dusk Dragon', qty: 1 },
      { name: 'Rindbrumm the Striking Dragon', qty: 1 },
      { name: 'Masquerade the Blazing Dragon', qty: 1 },
      { name: 'Despian Quaeritis', qty: 1 },
      { name: 'El Shaddoll Apkallone', qty: 1 },
      { name: 'Mudragon of the Swamp', qty: 1 },
    ],
    side: [],
  },

  // ── 2024 TCG META DECKS ───────────────────────────────────────────

  {
    id: 'snake-eye',
    name: 'Snake-Eye',
    playstyle: 'FIRE Combo / Going-First',
    difficulty: 'Advanced',
    era: '2024 TCG',
    gameplan:
      'Snake-Eye Ash and Snake-Eye Oak are FIRE monsters that generate card advantage by placing Continuous Spells into the Monster Zone, where they count as FIRE monsters. Bonfire (Limited to 1) searches any FIRE Level 1. Note: Original Sinful Spoils - Snake-Eye is Forbidden in TCG so the deck relies on the monster engine alone. End board targets are S:P Little Knight plus I:P Masquerena for threat removal, backed by going-second board breakers (Dark Ruler No More, Lightning Storm, Nibiru).',
    strengths: [
      'Ash and Oak are individually powerful starters even without the Field Spell',
      'Promethean Princess recycles FIRE monsters from GY during opponent\'s turn',
      'Hiita the Fire Charmer provides additional FIRE engine access',
      'Flexible between going-first combo and going-second break package',
    ],
    weaknesses: [
      'Original Sinful Spoils is Forbidden — loss of the key Field Spell hurts consistency',
      'Bonfire is Limited to 1 — fewer guaranteed openers',
      'Ash Blossom on Snake-Eye Ash stops the entire line cold',
    ],
    main: [
      { name: 'Snake-Eye Ash', qty: 3 },
      { name: 'Snake-Eye Oak', qty: 3 },
      { name: 'Diabell, Queen of the White Forest', qty: 2 },
      { name: 'Bonfire', qty: 1 },                // Limited
      { name: 'Triple Tactics Talent', qty: 1 },  // Limited
      { name: 'Ash Blossom & Joyous Spring', qty: 3 },
      { name: 'Infinite Impermanence', qty: 3 },
      { name: 'Called by the Grave', qty: 1 },    // Limited
      { name: 'Ghost Belle & Haunted Mansion', qty: 2 },
      { name: 'Droll & Lock Bird', qty: 2 },      // Semi-Limited
      { name: 'Effect Veiler', qty: 2 },
      { name: 'Ghost Ogre & Snow Rabbit', qty: 3 },
      { name: 'Nibiru, the Primal Being', qty: 3 },
      { name: 'Pot of Desires', qty: 3 },
      { name: 'Forbidden Droplet', qty: 1 },
      { name: 'Dark Ruler No More', qty: 3 },
      { name: 'Lightning Storm', qty: 3 },
      { name: 'Crossout Designator', qty: 1 },    // Limited
    ],
    extra: [
      { name: 'I:P Masquerena', qty: 1 },
      { name: 'S:P Little Knight', qty: 1 },
      { name: 'Relinquished Anima', qty: 1 },
      { name: 'Accesscode Talker', qty: 1 },
      { name: 'Promethean Princess, Bestower of Flames', qty: 1 },
      { name: 'Hiita the Fire Charmer, Ablaze', qty: 1 },
      { name: 'Knightmare Phoenix', qty: 1 },
      { name: 'Knightmare Unicorn', qty: 1 },
      { name: 'Borrelsword Dragon', qty: 1 },
      { name: 'Cross-Sheep', qty: 1 },
      { name: 'Salamangreat Almiraj', qty: 1 },
      { name: 'Divine Arsenal AA-ZEUS - Sky Thunder', qty: 1 },
      { name: 'Topologic Trisbaena', qty: 1 },
      { name: 'Knightmare Cerberus', qty: 1 },
      { name: 'Underworld Goddess of the Closed World', qty: 1 },
    ],
    side: [],
  },

  {
    id: 'tenpai-dragon',
    name: 'Tenpai Dragon',
    playstyle: 'Battle Phase Synchro / OTK',
    difficulty: 'Advanced',
    era: '2024 TCG',
    gameplan:
      'Tenpai Dragon Paidra searches Sangen Summoning on Normal Summon. Chundra (Limited to 1) is the key Level 2 Tuner. During the opponent\'s Battle Phase, Tenpai monsters trigger to Synchro Summon into Sangenpai Transcendent Dragion — a 3500 ATK monster that can attack again, enabling an OTK. Sangen Summoning and Kaimen are both Limited to 1, so use Red-Eyes Darkness Metal Dragon (now Unlimited) to Special Summon monsters and widen your plays. Ghost Ogre disrupts the opponent\'s field while Nibiru punishes long combo strings.',
    strengths: [
      'Near-OTK during opponent\'s Battle Phase — almost no counter play',
      'Red-Eyes Darkness Metal Dragon is now Unlimited — provides massive extra summons',
      'Transcendent Dragion\'s double attack closes games from almost any LP total',
      'Going-second build with full breaker suite pressures any setup',
    ],
    weaknesses: [
      'Chundra, Sangen Summoning and Kaimen are all Limited — forces careful resource management',
      'Weak to Battle Fader and Swift Scarecrow during the OTK window',
      'Going-first setup is weak — the deck needs the opponent to attack to win',
    ],
    main: [
      { name: 'Tenpai Dragon Paidra', qty: 3 },
      { name: 'Tenpai Dragon Chundra', qty: 1 },  // Limited
      { name: 'Tenpai Dragon Fadra', qty: 3 },
      { name: 'Red-Eyes Darkness Metal Dragon', qty: 3 }, // Now Unlimited
      { name: 'Sangen Summoning', qty: 1 },       // Limited
      { name: 'Sangen Kaimen', qty: 1 },           // Limited
      { name: 'Foolish Burial', qty: 1 },          // Limited
      { name: 'Monster Reborn', qty: 1 },          // Limited
      { name: 'Triple Tactics Talent', qty: 1 },   // Limited
      { name: 'Ash Blossom & Joyous Spring', qty: 3 },
      { name: 'Effect Veiler', qty: 2 },
      { name: 'Infinite Impermanence', qty: 2 },
      { name: 'Ghost Ogre & Snow Rabbit', qty: 3 },
      { name: 'Nibiru, the Primal Being', qty: 3 },
      { name: 'Droll & Lock Bird', qty: 2 },       // Semi-Limited (max 2)
      { name: 'Pot of Desires', qty: 3 },
      { name: 'Dark Ruler No More', qty: 3 },
      { name: 'Lightning Storm', qty: 3 },
      { name: 'Crossout Designator', qty: 1 },     // Limited
    ],
    extra: [
      { name: 'Sangenpai Transcendent Dragion', qty: 3 },
      { name: 'Sangenpai Bident Dragion', qty: 3 },
      { name: 'Shooting Riser Dragon', qty: 1 },
      { name: 'Coral Dragon', qty: 1 },
      { name: 'Black Rose Dragon', qty: 1 },
      { name: 'Borrelsword Dragon', qty: 1 },
      { name: 'Accesscode Talker', qty: 1 },
      { name: 'I:P Masquerena', qty: 1 },
      { name: 'S:P Little Knight', qty: 1 },
      { name: 'Knightmare Unicorn', qty: 1 },
      { name: 'Knightmare Phoenix', qty: 1 },
    ],
    side: [],
  },

  {
    id: 'yubel',
    name: 'Yubel',
    playstyle: 'Alternate Win / Going-Second',
    difficulty: 'Advanced',
    era: '2024 TCG',
    gameplan:
      'Yubel takes 0 Battle Damage and redirects all Battle Damage taken to the opponent. Spirit of Yubel (added in Legacy of Destruction 2024) searches Nightmare Throne and turbocharges setup. The deck wins going second: use Lava Golem and The Winged Dragon of Ra - Sphere Mode to tribute the opponent\'s board, then attack with Yubel to redirect all Battle Damage. Into the Void (Limited to 1) rapidly cycles through the deck. Dark Ruler No More and Lightning Storm clear backrow so Yubel can swing freely.',
    strengths: [
      'Yubel is almost immune to battle — opponent attacks at their own risk',
      'Lava Golem + Ra Sphere Mode clears full boards without targeting or destroying',
      'Spirit of Yubel makes setup far more consistent than previous formats',
      'Wins through alternate damage mechanic — hard to counter with typical disruption',
    ],
    weaknesses: [
      'Loses to non-battle removal (banishing, bounce effects)',
      'Going-first setup is awkward — purely a going-second strategy',
      'Into the Void is Limited to 1 — fewer guaranteed hand cycles',
    ],
    main: [
      { name: 'Spirit of Yubel', qty: 3 },
      { name: 'Yubel', qty: 2 },
      { name: 'Yubel - Terror Incarnate', qty: 1 },
      { name: 'Yubel - The Ultimate Nightmare', qty: 1 },
      { name: 'Lava Golem', qty: 2 },
      { name: 'The Winged Dragon of Ra - Sphere Mode', qty: 1 },
      { name: 'Nightmare Throne', qty: 3 },
      { name: 'Into the Void', qty: 1 },           // Limited
      { name: 'Recurring Nightmare', qty: 2 },
      { name: 'Triple Tactics Talent', qty: 1 },   // Limited
      { name: 'Ash Blossom & Joyous Spring', qty: 3 },
      { name: 'Ghost Ogre & Snow Rabbit', qty: 2 },
      { name: 'Forbidden Droplet', qty: 3 },
      { name: 'Dark Ruler No More', qty: 3 },
      { name: 'Lightning Storm', qty: 3 },
      { name: 'Infinite Impermanence', qty: 3 },
      { name: 'Droll & Lock Bird', qty: 2 },       // Semi-Limited
      { name: 'Called by the Grave', qty: 1 },     // Limited
      { name: 'Crossout Designator', qty: 1 },     // Limited
      { name: 'Pot of Desires', qty: 1 },
      { name: 'Ghost Belle & Haunted Mansion', qty: 1 },
    ],
    extra: [
      { name: 'I:P Masquerena', qty: 1 },
      { name: 'S:P Little Knight', qty: 1 },
      { name: 'Knightmare Phoenix', qty: 1 },
      { name: 'Knightmare Unicorn', qty: 1 },
      { name: 'Accesscode Talker', qty: 1 },
      { name: 'Dharc the Dark Charmer, Gloomy', qty: 1 },
      { name: 'Divine Arsenal AA-ZEUS - Sky Thunder', qty: 1 },
      { name: 'Number 41: Bagooska the Terribly Tired Tapir', qty: 1 },
      { name: 'Millennium-Eyes Restrict', qty: 1 },
      { name: 'Borrelsword Dragon', qty: 1 },
    ],
    side: [],
  },

  {
    id: 'labrynth',
    name: 'Labrynth',
    playstyle: 'Normal Trap Control',
    difficulty: 'Intermediate',
    era: '2024 TCG',
    gameplan:
      'Lady Labrynth of the Silver Castle Special Summons herself whenever a Normal Trap resolves on the opponent\'s turn and can set another Normal Trap from Deck directly. Arianna the Labrynth Servant searches any Labrynth card on Normal Summon. Big Welcome Labrynth returns a monster to the hand then Special Summons Lady from Deck or GY. Every Trap activation recycles itself through the archetype\'s floating, making the deck nearly inexhaustible.',
    strengths: [
      'Lady is self-recurring and searches another Trap each time she resolves',
      'Every Normal Trap you run has synergy — even generics like Solemn Strike',
      'Extremely resilient grind game — almost never runs out of resources',
      'Difficult to break through a fully set Labrynth board',
    ],
    weaknesses: [
      'Backrow removal (Harpie\'s Feather Duster, Twin Twisters) is crippling',
      'Slow against turbo combo decks that win before traps can resolve',
      'Cooclock and Arianna are fragile going-second starters',
    ],
    main: [
      { name: 'Lady Labrynth of the Silver Castle', qty: 2 },
      { name: 'Arianna the Labrynth Servant', qty: 3 },
      { name: 'Ariane the Labrynth Servant', qty: 2 },
      { name: 'Labrynth Cooclock', qty: 2 },
      { name: 'Labrynth Labyrinth', qty: 3 },
      { name: 'Big Welcome Labrynth', qty: 3 },
      { name: 'Welcome Labrynth', qty: 2 },
      { name: 'Trap Trick', qty: 3 },
      { name: 'Infinite Impermanence', qty: 3 },
      { name: 'Solemn Strike', qty: 2 },
      { name: 'Solemn Judgment', qty: 1 },         // Limited
      { name: 'Solemn Warning', qty: 1 },
      { name: 'Evenly Matched', qty: 2 },
      { name: 'Ash Blossom & Joyous Spring', qty: 3 },
      { name: 'Effect Veiler', qty: 2 },
      { name: 'Ghost Ogre & Snow Rabbit', qty: 2 },
      { name: 'Droll & Lock Bird', qty: 2 },       // Semi-Limited
      { name: 'Called by the Grave', qty: 1 },     // Limited
      { name: 'Lightning Storm', qty: 1 },
    ],
    extra: [
      { name: 'Knightmare Unicorn', qty: 1 },
      { name: 'Knightmare Phoenix', qty: 1 },
      { name: 'I:P Masquerena', qty: 1 },
      { name: 'S:P Little Knight', qty: 1 },
      { name: 'Underworld Goddess of the Closed World', qty: 1 },
      { name: 'Accesscode Talker', qty: 1 },
      { name: 'Divine Arsenal AA-ZEUS - Sky Thunder', qty: 1 },
      { name: 'Number 38: Hope Harbinger Dragon Titanic Galaxy', qty: 1 },
      { name: 'Borrelsword Dragon', qty: 1 },
      { name: 'Knightmare Cerberus', qty: 1 },
    ],
    side: [],
  },

  {
    id: 'vanquish-soul',
    name: 'Vanquish Soul',
    playstyle: 'Battle-Phase Beatdown / Control',
    difficulty: 'Intermediate',
    era: '2024 TCG',
    gameplan:
      'Vanquish Soul monsters reveal cards from your hand to activate effects based on the Attributes shown (DARK, FIRE, WIND, EARTH). Caesar Valius searches any Vanquish Soul card on Special Summon. Razen searches on Normal Summon and gains ATK for each Attribute revealed. Stake Your Soul! swaps monsters during the Battle Phase for surprise OTK lines. Pot of Prosperity is Limited to 1, so the deck compensates with Pot of Desires and Ghost Ogre for added consistency.',
    strengths: [
      'Caesar Valius searches any piece on Special Summon — draws into the whole deck',
      'Razen can reach enormous ATK by revealing a diverse-Attribute hand',
      'Battle Phase swapping creates surprise OTK potential opponents can\'t predict',
      'Resilient to hand traps — effects don\'t start a chain',
    ],
    weaknesses: [
      'Requires a diverse Attribute spread in hand for best effects',
      'Pot of Prosperity is Limited to 1 — less consistent early game',
      'Limited disruption on the opponent\'s turn compared to other 2024 decks',
    ],
    main: [
      { name: 'Vanquish Soul Caesar Valius', qty: 3 },
      { name: 'Vanquish Soul Razen', qty: 3 },
      { name: 'Vanquish Soul Rocky Joe', qty: 3 },
      { name: 'Vanquish Soul Heavy Borger', qty: 3 },
      { name: 'Vanquish Soul Dr. Mad Love', qty: 2 },
      { name: 'Stake Your Soul!', qty: 3 },
      { name: 'Vanquish Soul Dust Devil', qty: 2 },
      { name: 'Pot of Prosperity', qty: 1 },       // Limited
      { name: 'Triple Tactics Talent', qty: 1 },   // Limited
      { name: 'Ash Blossom & Joyous Spring', qty: 3 },
      { name: 'Effect Veiler', qty: 2 },
      { name: 'Infinite Impermanence', qty: 2 },
      { name: 'Called by the Grave', qty: 1 },     // Limited
      { name: 'Ghost Ogre & Snow Rabbit', qty: 2 },
      { name: 'Droll & Lock Bird', qty: 2 },       // Semi-Limited
      { name: 'Nibiru, the Primal Being', qty: 3 },
      { name: 'Pot of Desires', qty: 2 },
      { name: 'Dark Ruler No More', qty: 2 },
    ],
    extra: [
      { name: 'Number 41: Bagooska the Terribly Tired Tapir', qty: 1 },
      { name: 'Divine Arsenal AA-ZEUS - Sky Thunder', qty: 1 },
      { name: 'I:P Masquerena', qty: 1 },
      { name: 'S:P Little Knight', qty: 1 },
      { name: 'Accesscode Talker', qty: 1 },
      { name: 'Knightmare Phoenix', qty: 1 },
      { name: 'Knightmare Unicorn', qty: 1 },
      { name: 'Underworld Goddess of the Closed World', qty: 1 },
      { name: 'Number 38: Hope Harbinger Dragon Titanic Galaxy', qty: 1 },
      { name: 'Borrelsword Dragon', qty: 1 },
    ],
    side: [],
  },
];
