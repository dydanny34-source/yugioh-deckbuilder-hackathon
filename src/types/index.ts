export interface Card {
  id: number;
  name: string;
  type: string;
  frameType: string;
  desc: string;
  atk?: number;
  def?: number;
  level?: number;
  race: string;
  attribute?: string;
  archetype?: string;
  linkval?: number;
  linkmarkers?: string[];
  scale?: number;
  pend_desc?: string;
  monster_desc?: string;
  card_sets?: CardSet[];
  card_images: CardImage[];
  card_prices?: CardPrice[];
  banlist_info?: BanlistInfo;
  misc_info?: MiscInfo[];
}

export interface CardImage {
  id: number;
  image_url: string;
  image_url_small: string;
  image_url_cropped: string;
}

export interface CardSet {
  set_name: string;
  set_code: string;
  set_rarity: string;
  set_rarity_code: string;
  set_price: string;
}

export interface CardPrice {
  cardmarket_price: string;
  tcgplayer_price: string;
  ebay_price: string;
  amazon_price: string;
  coolstuffinc_price: string;
}

export interface BanlistInfo {
  ban_tcg?: BanStatus;
  ban_ocg?: BanStatus;
  ban_goat?: BanStatus;
}

export type BanStatus = 'Banned' | 'Limited' | 'Semi-Limited' | 'Unlimited';

export interface MiscInfo {
  views?: number;
  viewsweek?: number;
  upvotes?: number;
  downvotes?: number;
  formats?: string[];
  staple?: boolean;
  tcg_date?: string;
  ocg_date?: string;
  konami_id?: number;
}

export interface DeckCard {
  card: Card;
  qty: number;
}

export interface Deck {
  id: string;
  name: string;
  format: Format;
  main: DeckCard[];
  extra: DeckCard[];
  side: DeckCard[];
  createdAt: string;
  updatedAt: string;
}

export type Format = 'tcg' | 'ocg' | 'goat';
export type Zone = 'main' | 'extra' | 'side';

export interface SearchParams {
  fname?: string;
  type?: string;
  attribute?: string;
  level?: string;
  race?: string;
  archetype?: string;
  banlist?: string;
  staple?: boolean;
  sort?: string;
  num?: number;
  offset?: number;
}
