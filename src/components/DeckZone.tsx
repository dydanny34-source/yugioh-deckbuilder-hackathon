import { Trash2 } from 'lucide-react';
import type { Zone } from '../types';
import { useDeckStore } from '../store/deckStore';
import { CardItem } from './CardItem';

const ZONE_LIMITS: Record<Zone, number> = { main: 60, extra: 15, side: 15 };
const ZONE_LABELS: Record<Zone, string> = {
  main: 'Main Deck',
  extra: 'Extra Deck',
  side: 'Side Deck',
};
const ZONE_HINT: Record<Zone, string> = {
  main: '40–60 cards',
  extra: 'up to 15',
  side: 'up to 15',
};

function countLabel(total: number, zone: Zone) {
  const lim = ZONE_LIMITS[zone];
  const cls = zone === 'main'
    ? total < 40 ? 'text-yellow-400' : total <= 60 ? 'text-green-400' : 'text-red-400'
    : 'text-gray-300';
  return <span className={`font-mono font-bold ${cls}`}>{total}/{lim}</span>;
}

interface Props {
  zone: Zone;
}

export function DeckZone({ zone }: Props) {
  const deck = useDeckStore(s => s.currentDeck);
  const removeCard = useDeckStore(s => s.removeCard);
  const selectedCard = useDeckStore(s => s.selectedCard);
  const setSelectedCard = useDeckStore(s => s.setSelectedCard);

  const cards = deck[zone];
  const total = cards.reduce((s, dc) => s + dc.qty, 0);

  return (
    <div className="flex flex-col min-h-0">
      {/* Zone header */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-black/20 border-b border-white/5 shrink-0">
        <span className="text-xs font-semibold text-gray-300">{ZONE_LABELS[zone]}</span>
        <span className="text-xs text-gray-500">{ZONE_HINT[zone]}</span>
        <span className="ml-auto">{countLabel(total, zone)}</span>
      </div>

      {/* Cards grid */}
      <div className="overflow-y-auto p-2">
        {cards.length === 0 ? (
          <div className="text-center py-4 text-gray-700 text-xs">
            {zone === 'main' ? 'Add monsters, spells, and traps here' :
             zone === 'extra' ? 'Fusion, Synchro, XYZ, and Link monsters' :
             'Side deck for matchup-specific cards'}
          </div>
        ) : (
          <div className="flex flex-wrap gap-1">
            {cards.map(({ card, qty }) =>
              Array.from({ length: qty }).map((_, qi) => (
                <div
                  key={`${card.id}-${qi}`}
                  className="relative group"
                  onContextMenu={e => { e.preventDefault(); removeCard(card.id, zone); }}
                >
                  <CardItem
                    card={card}
                    size="sm"
                    selected={selectedCard?.id === card.id}
                    onClick={() => setSelectedCard(selectedCard?.id === card.id ? null : card)}
                  />
                  <button
                    onClick={() => removeCard(card.id, zone)}
                    className="absolute top-0.5 left-0.5 hidden group-hover:flex w-5 h-5 bg-red-600/80 rounded items-center justify-center"
                    title="Remove"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
