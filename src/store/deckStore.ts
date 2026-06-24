import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Card, Deck, Format, Zone } from '../types';

const EXTRA_FRAMES = new Set(['fusion', 'synchro', 'xyz', 'link',
  'fusion_pendulum', 'synchro_pendulum', 'xyz_pendulum']);

export function isExtraDeck(card: Card): boolean {
  return EXTRA_FRAMES.has(card.frameType);
}

function maxCopies(card: Card, format: Format): number {
  const ban = card.banlist_info;
  const status = format === 'tcg' ? ban?.ban_tcg : format === 'ocg' ? ban?.ban_ocg : ban?.ban_goat;
  if (status === 'Forbidden') return 0;
  if (status === 'Limited') return 1;
  if (status === 'Semi-Limited') return 2;
  return 3;
}

function emptyDeck(format: Format = 'tcg'): Deck {
  return {
    id: crypto.randomUUID(),
    name: 'New Deck',
    format,
    main: [],
    extra: [],
    side: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

const ZONE_LIMITS: Record<Zone, number> = { main: 60, extra: 15, side: 15 };

interface DeckStore {
  currentDeck: Deck;
  savedDecks: Deck[];
  selectedCard: Card | null;

  setSelectedCard: (card: Card | null) => void;
  addCard: (card: Card, zone?: Zone) => string | null;
  importDeck: (name: string, main: DeckCard[], extra: DeckCard[], side: DeckCard[]) => void;
  removeCard: (cardId: number, zone: Zone) => void;
  setDeckName: (name: string) => void;
  setFormat: (format: Format) => void;
  saveDeck: () => void;
  loadDeck: (id: string) => void;
  newDeck: () => void;
  deleteDeck: (id: string) => void;
  exportYdk: () => string;
  totalCards: (zone: Zone) => number;
}

export const useDeckStore = create<DeckStore>()(
  persist(
    (set, get) => ({
      currentDeck: emptyDeck(),
      savedDecks: [],
      selectedCard: null,

      setSelectedCard: (card) => set({ selectedCard: card }),

      importDeck: (name, main, extra, side) =>
        set(s => ({
          currentDeck: {
            ...s.currentDeck,
            name,
            main,
            extra,
            side,
            updatedAt: new Date().toISOString(),
          },
        })),

      addCard: (card, zone?) => {
        const { currentDeck } = get();
        const targetZone: Zone = zone ?? (isExtraDeck(card) ? 'extra' : 'main');
        const zoneCards = currentDeck[targetZone];
        const existing = zoneCards.find(dc => dc.card.id === card.id);
        const currentQty = existing?.qty ?? 0;
        const zoneTotal = zoneCards.reduce((s, dc) => s + dc.qty, 0);
        const max = maxCopies(card, currentDeck.format);

        if (max === 0) return 'This card is Banned in the current format.';
        if (currentQty >= max) return `Already at the copy limit (${max}) for this card.`;
        if (zoneTotal >= ZONE_LIMITS[targetZone]) return `${targetZone} deck is full (${ZONE_LIMITS[targetZone]} cards).`;

        set({
          currentDeck: {
            ...currentDeck,
            [targetZone]: existing
              ? zoneCards.map(dc => dc.card.id === card.id ? { ...dc, qty: dc.qty + 1 } : dc)
              : [...zoneCards, { card, qty: 1 }],
            updatedAt: new Date().toISOString(),
          },
        });
        return null;
      },

      removeCard: (cardId, zone) => {
        const { currentDeck } = get();
        set({
          currentDeck: {
            ...currentDeck,
            [zone]: currentDeck[zone]
              .map(dc => dc.card.id === cardId ? { ...dc, qty: dc.qty - 1 } : dc)
              .filter(dc => dc.qty > 0),
            updatedAt: new Date().toISOString(),
          },
        });
      },

      setDeckName: (name) => set(s => ({ currentDeck: { ...s.currentDeck, name } })),

      setFormat: (format) => set(s => ({ currentDeck: { ...s.currentDeck, format } })),

      saveDeck: () => {
        const { currentDeck, savedDecks } = get();
        const updated = { ...currentDeck, updatedAt: new Date().toISOString() };
        set({
          savedDecks: savedDecks.some(d => d.id === updated.id)
            ? savedDecks.map(d => d.id === updated.id ? updated : d)
            : [...savedDecks, updated],
          currentDeck: updated,
        });
      },

      loadDeck: (id) => {
        const deck = get().savedDecks.find(d => d.id === id);
        if (deck) set({ currentDeck: { ...deck } });
      },

      newDeck: () => set(s => ({ currentDeck: emptyDeck(s.currentDeck.format) })),

      deleteDeck: (id) => set(s => ({ savedDecks: s.savedDecks.filter(d => d.id !== id) })),

      exportYdk: () => {
        const { currentDeck } = get();
        const lines: string[] = ['#main'];
        currentDeck.main.forEach(dc => { for (let i = 0; i < dc.qty; i++) lines.push(String(dc.card.id)); });
        lines.push('#extra');
        currentDeck.extra.forEach(dc => { for (let i = 0; i < dc.qty; i++) lines.push(String(dc.card.id)); });
        lines.push('!side');
        currentDeck.side.forEach(dc => { for (let i = 0; i < dc.qty; i++) lines.push(String(dc.card.id)); });
        return lines.join('\n');
      },

      totalCards: (zone) => get().currentDeck[zone].reduce((s, dc) => s + dc.qty, 0),
    }),
    {
      name: 'yugioh-deck-v1',
      partialize: (state) => ({
        currentDeck: state.currentDeck,
        savedDecks: state.savedDecks,
      }),
      merge: (persisted, current) => ({
        ...current,
        ...(persisted as Partial<DeckStore>),
        selectedCard: null,
      }),
    }
  )
);
