export const RULINGS: Record<string, string[]> = {
  'Ash Blossom & Joyous Spring': [
    'Activates in the hand in response to effects that search, add from GY to hand/field, or Special Summon from Deck.',
    'The card is sent to the GY as a cost when activated.',
    'Can be activated during the Damage Step.',
    'Only one copy can be activated per chain — a second Ash Blossom cannot be chained to the first.',
    'Negates the specific effect that triggered it, not the entire card.',
    'Does not negate effects that add from banished zone or from hand.',
  ],
  'Effect Veiler': [
    'Targets one face-up Effect Monster your opponent controls.',
    'Negates the target\'s effects until the End Phase of the current turn.',
    'Can only be activated during your opponent\'s Main Phase.',
    'If the targeted monster leaves the field, Veiler\'s effect disappears — the monster regains effects if it returns to the field.',
    'The monster is not destroyed; it simply loses its effects until end of turn.',
    'Cannot negate Continuous Effects (e.g., stat boosts from Skill Drain); only discrete activated effects.',
  ],
  'Infinite Impermanence': [
    'If you control no cards, it can be activated from the hand during the opponent\'s Main Phase.',
    'When activated from hand, all Set Spell/Trap effects in the same column are negated for the rest of that turn.',
    'When Set and activated from the Spell/Trap Zone, it negates the targeted monster\'s effects until End Phase.',
    'You cannot activate this card if you already control a card in the column you\'d activate it in (from hand).',
    'The column negation from hand activation prevents cards in that column from activating — even if your opponent sets a card there later that turn.',
  ],
  'Nibiru, the Primal Being': [
    'Triggers when the opponent successfully completes their 5th Normal or Special Summon in one turn.',
    'Tributes ALL monsters on the field (both players\'), then Special Summons one "Primal Being Token" to the opponent\'s side.',
    'The Token\'s ATK/DEF equals the total ATK/DEF of all tributed monsters.',
    'Cannot be chained to — it is activated during the resolution of the 5th summon (mandatory timing).',
    'Count includes Normal Summons, all types of Special Summons, and Flip Summons.',
    'Does NOT count: Tokens created by card effects, monsters returned to field from being "moved," or failed summons.',
    'Ritual Summons count toward the 5 summon total.',
  ],
  'Called by the Grave': [
    'Target and banish one monster in either player\'s GY.',
    'Negates all effects of monsters with the same name as the banished monster, in all zones, until the End Phase.',
    'Primarily used to counter hand traps (Ash Blossom, Effect Veiler, Ghost Belle, etc.) before they can be activated.',
    'The negation prevents the named card from being activated if it is in the opponent\'s hand.',
    'Only negates monsters — cannot negate Spells or Traps even if they have the same name.',
    'Banished card is face-up and counts toward the opponent\'s card limits.',
  ],
  'Pot of Prosperity': [
    'Banish 6 or 3 cards from your Extra Deck face-down (your choice at activation).',
    'Look at the top cards of your Main Deck equal to the number banished, then add 1 of them to your hand.',
    'For the rest of the turn you cannot draw cards by card effects (your Normal Draw each turn still works).',
    'You cannot activate this card if you have fewer Extra Deck cards than the chosen number.',
    'The banished Extra Deck cards are face-down and are effectively removed from the game for that duel.',
    'Cannot be activated if you cannot send the correct number of cards from your Extra Deck.',
  ],
  'Pot of Desires': [
    'Banish 10 cards from the top of your Deck face-down, then draw 2 cards.',
    'The 10 banished cards are face-down and unavailable for the rest of the duel.',
    'Activating multiple copies increases risk of banishing key combo pieces.',
    'Cannot be activated if your Deck has fewer than 10 cards.',
    'The draw cannot be negated separately — the banishing and drawing are part of the same effect resolution.',
  ],
  'Lightning Storm': [
    'Can only be activated if you control no face-up cards.',
    'Choose one of two effects: destroy all Attack Position monsters your opponent controls, OR destroy all Spells/Traps your opponent controls.',
    'The monster destruction effect does not target.',
    'The Spell/Trap destruction effect requires the opponent to control at least one face-up Spell or Trap.',
    'Effective going second to clear an established board or backrow.',
  ],
  'Dark Ruler No More': [
    'Negates the effects of all face-up Effect Monsters your opponent currently controls until end of turn.',
    'Your opponent cannot respond to this card\'s activation with monster effects (cannot chain most monster effects to it).',
    'Your opponent takes no damage for the rest of the turn after this resolves.',
    'Does not destroy the targeted monsters — they remain on field without effects.',
    'Does NOT negate effects that activate in the GY — only on-field effects.',
    'Useful for breaking established boards without needing to target individual monsters.',
  ],
  'Triple Tactics Talent': [
    'Can only be activated during your Main Phase when your opponent activated a monster effect in your Main Phase.',
    'Choose one of three effects: draw 2, take control of one opponent\'s monster, or look at opponent\'s hand and send 1 card to GY.',
    'The effect is chosen at activation; you cannot change after.',
    'Triggers on ANY opponent monster effect activated during your Main Phase — hand traps, board effects, etc.',
    'Cannot activate if no opponent monster effect has been activated in your Main Phase that turn.',
  ],
  'Solemn Judgment': [
    'Activate by paying half your LP (round up).',
    'Can negate and destroy: any Summon (Normal, Special, Flip, Set) OR any Spell/Trap activation.',
    'When negating a Summon, the summoned monster is destroyed.',
    'When negating a Spell/Trap, the card is returned to the GY (or hand if applicable).',
    'Cannot be chained to another Solemn Judgment — only one Solemn card can be used per chain.',
    'Can be activated in response to the activation of another Counter Trap.',
  ],
  'Solemn Strike': [
    'Pay 1500 LP to negate a Special Summon or a monster effect activation, then destroy that card.',
    'Can NOT negate Normal Summons (use Solemn Warning for that).',
    'Can negate monster effects that activate anywhere: on-field, in hand, in GY.',
    'Counts as a Counter Trap — can only be chained to other Counter Traps.',
    'If negating a Special Summon, the monster is destroyed and sent to the GY.',
  ],
  'Solemn Warning': [
    'Pay 2000 LP.',
    'Negate any Summon (Normal or Special) or negate any effect that would Special Summon a monster.',
    'Can negate effects that would Special Summon even if the monster is not yet on the field.',
    'Counter Trap — can only be chained to other Counter Traps.',
    'The negated monster(s) are destroyed.',
  ],
  'Crossout Designator': [
    'Declare 1 card name; banish 1 copy of that card from your Deck.',
    'Until End Phase, the opponent cannot activate cards with the declared name.',
    'You MUST have a copy of the declared card in your Deck to activate this — if you don\'t, it\'s an illegal activation.',
    'Primarily used to counter hand traps before they can be activated.',
    'The banished card is face-up.',
  ],
  'Ghost Belle & Haunted Mansion': [
    'Activates in the hand in response to effects that add a card from GY to hand/field, banish from GY, or Special Summon from GY.',
    'Sent to GY as a cost, negates the triggering effect.',
    'Cannot negate effects that add from Deck (use Ash Blossom) or from banished zone.',
    'Effective against Called by the Grave, monster GY recovery, recursion effects, and GY-based Special Summons.',
    'Can be activated during the Damage Step.',
  ],
  'Droll & Lock Bird': [
    'Activates in the hand after the opponent adds a card from outside the field to their hand (not during the Draw Phase).',
    'For the rest of the turn, neither player can add cards from outside the field to their hand.',
    'This includes searches, draws from card effects, and adding from GY — but NOT the normal Draw Phase draw.',
    'Sent to GY as a cost when activated.',
    'Extremely effective against combo decks that rely on chained searches.',
    'Both players are affected — time your activation so you don\'t block your own plays.',
  ],
  'Ghost Ogre & Snow Rabbit': [
    'Activates in the hand or on the field when a monster or Spell/Trap on the field activates its effect.',
    'Destroys the card that activated the effect.',
    'Sent to GY as a cost when used from hand.',
    'Can be used to destroy Field Spells, Pendulum Zones, and on-field monsters.',
    'Cannot negate the effect — just destroys the card. The effect still resolves if the card leaves the field on its own terms.',
  ],
  'Impermanence': [
    'If you control no cards, you can activate Infinite Impermanence from your hand.',
    'Set in a Spell/Trap Zone to use as a normal Trap targeting one monster.',
    'The hand activation negates Set cards in the same column for the rest of the turn.',
  ],
  'Maxx "C"': [
    'Activates in the hand during either player\'s Main Phase or Battle Phase.',
    'Until the End Phase, each time the opponent Special Summons a monster, you draw 1 card.',
    'Sent to GY as a cost when activated.',
    'Often forces opponents to stop their combo to avoid giving excessive draw power.',
    'Banned in TCG, Limited in OCG — check your format.',
  ],
  'Ghost Reaper & Winter Cherries': [
    'Activates in the hand during either player\'s turn if the opponent controls more cards than you.',
    'Reveal 1 card in your Extra Deck; banish all copies of that card from the opponent\'s Extra Deck.',
    'Sent to GY as a cost.',
    'Most effective when you know the opponent runs the card you reveal — scout their deck first.',
    'Does not negate anything — purely removes key Extra Deck monsters.',
  ],
  'Forbidden Droplet': [
    'Send any number of cards from your hand/field to GY to target that many Effect Monsters the opponent controls.',
    'Halves those monsters\' ATK and negates their effects until End Phase.',
    'The opponent cannot activate cards that share a card type (Monster/Spell/Trap) with the cards you sent as cost.',
    'Sending Spell Cards as cost prevents opponent from chaining Spell Cards to this activation.',
    'Not a Counter Trap — can be chained to, but the cost restriction limits opponent responses.',
    'Does not target if you send a Spell/Trap you control, since "send" happens on activation, before chains resolve.',
  ],
  'Kaiju': [
    'You can tribute one of the opponent\'s monsters to Special Summon a Kaiju from your hand to their side of the field.',
    'You can only control 1 Kaiju at a time.',
    'Tributing the opponent\'s monster does not target — bypasses many protection effects.',
    'The tribute is a cost, not an effect — it cannot be negated by cards like Skill Drain.',
    'Allows you to out monsters with "cannot be destroyed" or "cannot be targeted" effects.',
  ],
};

export function getRulings(cardName: string): string[] {
  return RULINGS[cardName] ?? [];
}

// Tournament usage rates (% of top-cut decks that include at least 1 copy, based on recent meta analysis)
export const META_USAGE: Record<string, { rate: number; note: string }> = {
  'Ash Blossom & Joyous Spring': { rate: 96, note: 'Ubiquitous — nearly every competitive deck runs 3' },
  'Effect Veiler': { rate: 74, note: 'Premier hand trap in combo-heavy metas' },
  'Infinite Impermanence': { rate: 91, note: 'Flexible disruption run in most competitive builds' },
  'Nibiru, the Primal Being': { rate: 62, note: 'Strong going-second option vs long combo strings' },
  'Called by the Grave': { rate: 82, note: 'Counters the hand trap package reliably' },
  'Pot of Prosperity': { rate: 58, note: 'High consistency in decks with an Extra Deck to spare' },
  'Pot of Desires': { rate: 44, note: 'High draw reward at cost of 10 random banishes' },
  'Lightning Storm': { rate: 61, note: 'Key board-breaker going second' },
  'Dark Ruler No More': { rate: 53, note: 'Efficient one-card board wipe for going second' },
  'Triple Tactics Talent': { rate: 51, note: 'Powerful in hand-trap-heavy metas; free card advantage' },
  'Solemn Judgment': { rate: 38, note: 'High LP cost but universal negate on a Counter Trap' },
  'Solemn Strike': { rate: 48, note: 'Staple 1500 LP negate in control builds' },
  'Solemn Warning': { rate: 29, note: 'Broader negate range than Strike at higher LP cost' },
  'Crossout Designator': { rate: 65, note: 'Direct answer to the hand trap meta' },
  'Ghost Belle & Haunted Mansion': { rate: 43, note: 'Powerful in GY-heavy or Called by the Grave metas' },
  'Droll & Lock Bird': { rate: 55, note: 'Shuts down search-heavy combo decks entirely' },
  'Ghost Ogre & Snow Rabbit': { rate: 37, note: 'Situational but useful against Field Spells and pendulums' },
  'Ghost Reaper & Winter Cherries': { rate: 29, note: 'Tech choice to remove key Extra Deck targets' },
  'Maxx "C"': { rate: 88, note: 'Dominant in OCG; Banned in TCG' },
  'Forbidden Droplet': { rate: 46, note: 'Powerful non-targeting mass negate for going second' },
};

export function getMetaUsage(cardName: string): { rate: number; note: string } | null {
  return META_USAGE[cardName] ?? null;
}

export function calcPopularity(viewsweek?: number): number {
  if (!viewsweek) return 0;
  return Math.min(100, Math.round((viewsweek / 40000) * 100));
}
