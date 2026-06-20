import type { Card, SearchParams } from '../types';

const BASE = 'https://db.ygoprodeck.com/api/v7';

export async function searchCards(params: SearchParams): Promise<Card[]> {
  const query = new URLSearchParams({ misc: 'yes' });
  if (params.fname) query.set('fname', params.fname);
  if (params.type) query.set('type', params.type);
  if (params.attribute) query.set('attribute', params.attribute);
  if (params.level) query.set('level', params.level);
  if (params.race) query.set('race', params.race);
  if (params.archetype) query.set('archetype', params.archetype);
  if (params.banlist) query.set('banlist', params.banlist);
  if (params.staple) query.set('staple', 'yes');
  if (params.sort) query.set('sort', params.sort);
  if (params.num !== undefined && params.offset !== undefined) {
    query.set('num', params.num.toString());
    query.set('offset', params.offset.toString());
  }

  const res = await fetch(`${BASE}/cardinfo.php?${query}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? 'No cards found');
  }
  const data = await res.json();
  return (data.data as Card[]) ?? [];
}

export async function getCardById(id: number): Promise<Card> {
  const res = await fetch(`${BASE}/cardinfo.php?id=${id}&misc=yes`);
  if (!res.ok) throw new Error('Card not found');
  const data = await res.json();
  return data.data[0] as Card;
}

export async function getCardByName(name: string): Promise<Card | null> {
  try {
    const res = await fetch(`${BASE}/cardinfo.php?name=${encodeURIComponent(name)}&misc=yes`);
    if (!res.ok) return null;
    const data = await res.json();
    return (data.data as Card[])?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function getMetaStaples(): Promise<Card[]> {
  const res = await fetch(`${BASE}/cardinfo.php?misc=yes&staple=yes&sort=views`);
  if (!res.ok) throw new Error('Failed to fetch staples');
  const data = await res.json();
  return (data.data as Card[]) ?? [];
}

export const CARD_TYPES = [
  'Effect Monster',
  'Normal Monster',
  'Flip Effect Monster',
  'Tuner Monster',
  'Synchro Monster',
  'Synchro Tuner Monster',
  'XYZ Monster',
  'Fusion Monster',
  'Link Monster',
  'Ritual Monster',
  'Ritual Effect Monster',
  'Pendulum Effect Monster',
  'Normal Pendulum Monster',
  'Spell Card',
  'Trap Card',
];

export const ATTRIBUTES = ['DARK', 'LIGHT', 'WATER', 'FIRE', 'EARTH', 'WIND', 'DIVINE'];

export const RACES = [
  'Aqua', 'Beast', 'Beast-Warrior', 'Creator-God', 'Cyberse', 'Dinosaur',
  'Divine-Beast', 'Dragon', 'Fairy', 'Fiend', 'Fish', 'Insect', 'Machine',
  'Plant', 'Psychic', 'Pyro', 'Reptile', 'Rock', 'Sea Serpent', 'Spellcaster',
  'Thunder', 'Warrior', 'Winged Beast', 'Wyrm', 'Zombie',
  'Normal', 'Continuous', 'Counter', 'Equip', 'Field', 'Quick-Play', 'Ritual',
];

export const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'atk', label: 'ATK' },
  { value: 'def', label: 'DEF' },
  { value: 'level', label: 'Level' },
  { value: 'views', label: 'Popularity' },
];
