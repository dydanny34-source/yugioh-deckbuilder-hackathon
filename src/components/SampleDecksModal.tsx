import { useState } from 'react';
import { X, Loader2, ChevronRight, BookOpen, Zap, ShieldAlert } from 'lucide-react';
import { SAMPLE_DECKS, type SampleDeckDef } from '../data/sampleDecks';
import { getCardByName } from '../services/api';
import { useDeckStore } from '../store/deckStore';
import type { DeckCard } from '../types';

interface Props {
  onClose: () => void;
}

const DIFF: Record<string, { cls: string; label: string }> = {
  Beginner:     { cls: 'text-green-400 bg-green-400/10 border-green-400/20',     label: 'Beginner'     },
  Intermediate: { cls: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',  label: 'Intermediate' },
  Advanced:     { cls: 'text-red-400 bg-red-400/10 border-red-400/20',           label: 'Advanced'     },
};

function totalCards(deck: SampleDeckDef) {
  return deck.main.reduce((s, c) => s + c.qty, 0);
}

function extraCount(deck: SampleDeckDef) {
  return deck.extra.reduce((s, c) => s + c.qty, 0);
}

export function SampleDecksModal({ onClose }: Props) {
  const [selected, setSelected] = useState<SampleDeckDef>(SAMPLE_DECKS[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const importDeck = useDeckStore(s => s.importDeck);
  const currentDeck = useDeckStore(s => s.currentDeck);
  const hasCards = currentDeck.main.length > 0 || currentDeck.extra.length > 0;

  const selectDeck = (deck: SampleDeckDef) => {
    setSelected(deck);
    setResult('');
  };

  const handleLoad = async () => {
    if (hasCards && !window.confirm(`Replace your current deck "${currentDeck.name}" with the ${selected.name} sample deck?`)) return;

    setLoading(true);
    setResult('');

    const allEntries = [
      ...selected.main.map(e => ({ ...e, zone: 'main' as const })),
      ...selected.extra.map(e => ({ ...e, zone: 'extra' as const })),
      ...selected.side.map(e => ({ ...e, zone: 'side' as const })),
    ];

    const fetched = await Promise.all(
      allEntries.map(async entry => {
        const card = await getCardByName(entry.name);
        return card ? { card, qty: entry.qty, zone: entry.zone } : null;
      })
    );

    const valid = fetched.filter(Boolean) as { card: DeckCard['card']; qty: number; zone: 'main' | 'extra' | 'side' }[];
    const failed = allEntries.length - valid.length;

    const toDeckCards = (zone: 'main' | 'extra' | 'side'): DeckCard[] =>
      valid.filter(e => e.zone === zone).map(e => ({ card: e.card, qty: e.qty }));

    importDeck(selected.name, toDeckCards('main'), toDeckCards('extra'), toDeckCards('side'));
    setLoading(false);

    if (failed > 0) {
      setResult(`Loaded ${valid.length}/${allEntries.length} cards (${failed} not found in API).`);
    } else {
      onClose();
    }
  };

  const d = DIFF[selected.difficulty];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[#13131f] border border-white/10 rounded-xl shadow-2xl w-full max-w-3xl max-h-[88vh] flex overflow-hidden">

        {/* Left — archetype list */}
        <div className="w-48 shrink-0 border-r border-white/5 overflow-y-auto py-1">
          {(['Classic', '2024 TCG', '2025 TCG'] as const).map(era => {
            const group = SAMPLE_DECKS.filter(d => d.era === era);
            if (group.length === 0) return null;
            return (
              <div key={era}>
                <p className="text-[9px] uppercase tracking-widest text-gray-600 px-3 pt-3 pb-1">{era}</p>
                {group.map(deck => {
            const active = deck.id === selected.id;
            return (
              <button
                key={deck.id}
                onClick={() => selectDeck(deck)}
                className={`w-full text-left px-3 py-2 flex flex-col gap-0.5 transition-colors border-l-2 ${
                  active
                    ? 'bg-accent/10 border-accent'
                    : 'border-transparent hover:bg-white/5'
                }`}
              >
                <span className={`text-xs font-semibold leading-tight ${active ? 'text-accent' : 'text-gray-200'}`}>
                  {deck.name}
                </span>
                <span className="text-[10px] text-gray-500">{deck.playstyle}</span>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border w-fit mt-0.5 ${DIFF[deck.difficulty].cls}`}>
                  {deck.difficulty}
                </span>
              </button>
            );
                })}
              </div>
            );
          })}
        </div>

        {/* Right — detail */}
        <div className="flex-1 flex flex-col min-h-0">

          {/* Header */}
          <div className="flex items-start justify-between px-5 py-3 border-b border-white/5 shrink-0">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-bold text-accent text-base">{selected.name}</h2>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${d.cls}`}>{d.label}</span>
                {selected.era !== 'Classic' && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded border text-purple-400 bg-purple-400/10 border-purple-400/20">
                    {selected.era}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{selected.playstyle}</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white p-1 shrink-0">
              <X size={16} />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 text-sm">

            {/* Gameplan */}
            <div>
              <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen size={10} /> Gameplan
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">{selected.gameplan}</p>
            </div>

            {/* Strengths / Weaknesses */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-[10px] font-semibold text-green-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Zap size={10} /> Strengths
                </h3>
                <ul className="space-y-1.5">
                  {selected.strengths.map((s, i) => (
                    <li key={i} className="text-[11px] text-gray-300 flex gap-1.5 leading-relaxed">
                      <span className="text-green-400 shrink-0 font-bold">+</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <ShieldAlert size={10} /> Weaknesses
                </h3>
                <ul className="space-y-1.5">
                  {selected.weaknesses.map((w, i) => (
                    <li key={i} className="text-[11px] text-gray-300 flex gap-1.5 leading-relaxed">
                      <span className="text-red-400 shrink-0 font-bold">−</span>{w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card list */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Main Deck <span className="text-gray-600 ml-1">({totalCards(selected)})</span>
                </h3>
                <ul className="space-y-0.5">
                  {selected.main.map((c, i) => (
                    <li key={i} className="text-[11px] text-gray-300 flex items-baseline justify-between gap-2 py-px">
                      <span className="truncate">{c.name}</span>
                      <span className="text-gray-600 shrink-0">×{c.qty}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                {selected.extra.length > 0 && (
                  <div>
                    <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Extra Deck <span className="text-gray-600 ml-1">({extraCount(selected)})</span>
                    </h3>
                    <ul className="space-y-0.5">
                      {selected.extra.map((c, i) => (
                        <li key={i} className="text-[11px] text-gray-300 flex items-baseline justify-between gap-2 py-px">
                          <span className="truncate">{c.name}</span>
                          <span className="text-gray-600 shrink-0">×{c.qty}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-white/5">
            {selected.era !== 'Classic' && (
              <p className="text-[10px] text-gray-600 px-5 pt-2">
                ⚠ Builds reflect the 2024-2025 TCG meta (data through Aug 2025). Ban list and ratios may differ in 2026.
              </p>
            )}
            <div className="px-5 py-3 flex items-center gap-3">
              {result && <span className="text-xs text-yellow-400 flex-1">{result}</span>}
              {result && (
                <button onClick={onClose} className="text-xs text-gray-400 hover:text-white px-3 py-1.5 border border-white/10 rounded">
                  Close
                </button>
              )}
              {!result && (
                <button
                  onClick={handleLoad}
                  disabled={loading}
                  className="ml-auto flex items-center gap-2 px-5 py-2 bg-accent hover:bg-yellow-400 text-black font-bold text-sm rounded transition-colors disabled:opacity-50"
                >
                  {loading
                    ? <><Loader2 size={13} className="animate-spin" /> Fetching cards…</>
                    : <>{hasCards ? 'Replace with this Deck' : 'Load this Deck'} <ChevronRight size={13} /></>
                  }
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
