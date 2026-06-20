import { useDeckStore } from '../store/deckStore';
import { DeckZone } from './DeckZone';

export function DeckBuilder() {
  const deck = useDeckStore(s => s.currentDeck);

  const mainTotal = deck.main.reduce((s, dc) => s + dc.qty, 0);
  const monsters = deck.main.filter(dc => !['Spell Card', 'Trap Card'].some(t => dc.card.type.includes(t)));
  const spells = deck.main.filter(dc => dc.card.type.includes('Spell Card'));
  const traps = deck.main.filter(dc => dc.card.type.includes('Trap Card'));

  const monCount = monsters.reduce((s, dc) => s + dc.qty, 0);
  const spCount = spells.reduce((s, dc) => s + dc.qty, 0);
  const trCount = traps.reduce((s, dc) => s + dc.qty, 0);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Deck stats bar */}
      {mainTotal > 0 && (
        <div className="shrink-0 px-3 py-1.5 border-b border-white/5 bg-black/20 flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-gray-400">Monsters</span>
            <span className="font-bold text-white">{monCount}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-600" />
            <span className="text-gray-400">Spells</span>
            <span className="font-bold text-white">{spCount}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-600" />
            <span className="text-gray-400">Traps</span>
            <span className="font-bold text-white">{trCount}</span>
          </div>
          <div className="ml-auto flex items-center gap-1">
            {/* type distribution bar */}
            {mainTotal > 0 && (
              <div className="flex rounded overflow-hidden h-2 w-24">
                <div className="bg-orange-500" style={{ width: `${(monCount / mainTotal) * 100}%` }} />
                <div className="bg-green-600" style={{ width: `${(spCount / mainTotal) * 100}%` }} />
                <div className="bg-purple-600" style={{ width: `${(trCount / mainTotal) * 100}%` }} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Three zones stacked */}
      <div className="flex-1 overflow-y-auto divide-y divide-white/5">
        <DeckZone zone="main" />
        <DeckZone zone="extra" />
        <DeckZone zone="side" />
      </div>
    </div>
  );
}
