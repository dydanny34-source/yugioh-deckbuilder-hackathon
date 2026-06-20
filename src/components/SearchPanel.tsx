import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, SlidersHorizontal, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { searchCards, getMetaStaples, CARD_TYPES, ATTRIBUTES, RACES, SORT_OPTIONS } from '../services/api';
import type { Card, SearchParams } from '../types';
import { useDeckStore } from '../store/deckStore';
import { CardItem } from './CardItem';

const PAGE = 60;

function useDebounced<T>(value: T, delay: number): T {
  const [deb, setDeb] = useState(value);
  useCallback(() => {
    const t = setTimeout(() => setDeb(value), delay);
    return () => clearTimeout(t);
  }, [value, delay])();
  return deb;
}

export function SearchPanel() {
  const [fname, setFname] = useState('');
  const [type, setType] = useState('');
  const [attribute, setAttribute] = useState('');
  const [level, setLevel] = useState('');
  const [race, setRace] = useState('');
  const [sort, setSort] = useState('views');
  const [showFilters, setShowFilters] = useState(false);
  const [metaMode, setMetaMode] = useState(false);
  const [page, setPage] = useState(0);

  const debouncedName = useDebounced(fname, 350);

  const selectedCard = useDeckStore(s => s.selectedCard);
  const setSelectedCard = useDeckStore(s => s.setSelectedCard);
  const addCard = useDeckStore(s => s.addCard);

  const hasFilter = !!(debouncedName || type || attribute || level || race);

  const params: SearchParams = {
    fname: debouncedName || undefined,
    type: type || undefined,
    attribute: attribute || undefined,
    level: level || undefined,
    race: race || undefined,
    sort,
    num: PAGE,
    offset: page * PAGE,
  };

  const searchQuery = useQuery({
    queryKey: ['cards', params],
    queryFn: () => searchCards(params),
    enabled: hasFilter && !metaMode,
    staleTime: 60_000,
  });

  const metaQuery = useQuery({
    queryKey: ['meta-staples'],
    queryFn: getMetaStaples,
    enabled: metaMode,
    staleTime: 300_000,
  });

  const cards: Card[] = metaMode ? (metaQuery.data ?? []) : (searchQuery.data ?? []);
  const isLoading = metaMode ? metaQuery.isLoading : searchQuery.isLoading;
  const error = metaMode ? metaQuery.error : searchQuery.error;

  const handleAdd = (card: Card) => {
    const err = addCard(card);
    if (err) alert(err);
  };

  return (
    <div className="flex flex-col h-full bg-panel border-r border-white/5">
      {/* Header */}
      <div className="px-3 py-3 space-y-2 border-b border-white/5 shrink-0">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search cards…"
            value={fname}
            onChange={e => { setFname(e.target.value); setMetaMode(false); setPage(0); }}
            className="w-full pl-8 pr-3 py-1.5 bg-surface rounded text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => { setMetaMode(m => !m); setPage(0); }}
            className={`flex-1 flex items-center justify-center gap-1.5 text-xs py-1.5 rounded font-medium transition-colors ${metaMode ? 'bg-accent text-black' : 'bg-surface text-gray-400 hover:text-white'}`}
          >
            <Zap size={12} /> Meta Staples
          </button>
          <button
            onClick={() => setShowFilters(f => !f)}
            className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded transition-colors ${showFilters ? 'bg-accent/20 text-accent' : 'bg-surface text-gray-400 hover:text-white'}`}
          >
            <SlidersHorizontal size={12} />
            {showFilters ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>

        {showFilters && (
          <div className="space-y-1.5 pt-1">
            <select
              value={type}
              onChange={e => { setType(e.target.value); setMetaMode(false); setPage(0); }}
              className="w-full bg-surface text-xs text-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="">All Types</option>
              {CARD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-1.5">
              <select
                value={attribute}
                onChange={e => { setAttribute(e.target.value); setMetaMode(false); setPage(0); }}
                className="bg-surface text-xs text-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="">Attribute</option>
                {ATTRIBUTES.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              <select
                value={level}
                onChange={e => { setLevel(e.target.value); setMetaMode(false); setPage(0); }}
                className="bg-surface text-xs text-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="">Level/Rank</option>
                {Array.from({ length: 13 }, (_, i) => i + 1).map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <select
              value={race}
              onChange={e => { setRace(e.target.value); setMetaMode(false); setPage(0); }}
              className="w-full bg-surface text-xs text-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="">All Races/Types</option>
              {RACES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="w-full bg-surface text-xs text-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-accent"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>Sort: {o.label}</option>)}
            </select>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-2">
        {isLoading && (
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="skeleton rounded" style={{ width: 88, height: 128 }} />
            ))}
          </div>
        )}
        {error && (
          <div className="text-center text-red-400 text-sm py-8 px-4">
            {(error as Error).message}
          </div>
        )}
        {!isLoading && !error && cards.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">
            {metaMode ? 'Loading staples…' : hasFilter ? 'No cards found' : (
              <div className="space-y-2">
                <Search size={32} className="mx-auto opacity-20" />
                <p>Search by name or apply filters</p>
                <p className="text-xs">or click <span className="text-accent">Meta Staples</span> to browse top cards</p>
              </div>
            )}
          </div>
        )}
        {cards.length > 0 && (
          <>
            <div className="flex flex-wrap gap-1.5">
              {cards.map(card => (
                <CardItem
                  key={card.id}
                  card={card}
                  selected={selectedCard?.id === card.id}
                  onClick={() => setSelectedCard(selectedCard?.id === card.id ? null : card)}
                  onDoubleClick={() => handleAdd(card)}
                />
              ))}
            </div>
            {!metaMode && (
              <div className="flex items-center gap-2 mt-3 justify-center">
                <button
                  disabled={page === 0}
                  onClick={() => setPage(p => p - 1)}
                  className="text-xs px-3 py-1 rounded bg-surface text-gray-400 disabled:opacity-30 hover:text-white"
                >
                  Prev
                </button>
                <span className="text-xs text-gray-500">Page {page + 1}</span>
                <button
                  disabled={cards.length < PAGE}
                  onClick={() => setPage(p => p + 1)}
                  className="text-xs px-3 py-1 rounded bg-surface text-gray-400 disabled:opacity-30 hover:text-white"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="px-3 py-1.5 border-t border-white/5 text-[11px] text-gray-600 shrink-0">
        Double-click to add • Click to inspect
      </div>
    </div>
  );
}
