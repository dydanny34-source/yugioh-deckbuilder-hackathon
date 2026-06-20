import { memo } from 'react';
import type { Card } from '../types';

interface Props {
  card: Card;
  onClick?: () => void;
  onDoubleClick?: () => void;
  size?: 'sm' | 'md';
  selected?: boolean;
}

const BAN_DOT: Record<string, string> = {
  Banned: 'bg-red-500',
  Limited: 'bg-orange-500',
  'Semi-Limited': 'bg-yellow-400',
};

export const CardItem = memo(function CardItem({ card, onClick, onDoubleClick, size = 'md', selected }: Props) {
  const img = card.card_images[0];
  const w = size === 'sm' ? 'w-[70px]' : 'w-[88px]';
  const h = size === 'sm' ? 'h-[102px]' : 'h-[128px]';
  const ban = card.banlist_info?.ban_tcg;

  return (
    <div
      className={`relative cursor-pointer rounded overflow-hidden shrink-0 transition-transform hover:scale-105 hover:z-10 ${selected ? 'ring-2 ring-accent' : ''}`}
      style={{ width: size === 'sm' ? 70 : 88 }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      title={card.name}
    >
      {img ? (
        <img
          src={img.image_url_small}
          alt={card.name}
          className={`${w} ${h} object-cover block`}
          loading="lazy"
        />
      ) : (
        <div className={`${w} ${h} bg-surface flex items-center justify-center text-gray-600 text-xs text-center p-1`}>
          {card.name}
        </div>
      )}
      {ban && ban !== 'Unlimited' && (
        <span className={`absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full ${BAN_DOT[ban]}`} />
      )}
    </div>
  );
});
