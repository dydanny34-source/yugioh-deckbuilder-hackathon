import { ExternalLink, X, Star, BookOpen, TrendingUp } from 'lucide-react';
import type { Card, Format } from '../types';
import { BanBadge } from './BanBadge';
import { getRulings, getMetaUsage, calcPopularity } from '../data/rulings';
import { useDeckStore } from '../store/deckStore';

interface Props {
  card: Card;
  format: Format;
  onClose?: () => void;
}

function FrameHeader({ card }: { card: Card }) {
  const frameClass = `frame-${(card.frameType ?? 'normal').split('_')[0]}`;
  return (
    <div className={`${frameClass} px-4 py-2 flex items-center gap-2`}>
      {card.attribute && (
        <span className="text-xs font-bold bg-black/30 px-1.5 py-0.5 rounded">{card.attribute}</span>
      )}
      <span className="text-xs text-white/80">
        {card.race} / {card.type.replace(' Monster', '').replace(' Card', '')}
      </span>
    </div>
  );
}

function StatBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-400 w-12 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-accent rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-mono text-gray-300 w-10 text-right">{value}</span>
    </div>
  );
}

export function CardDetail({ card, format, onClose }: Props) {
  const addCard = useDeckStore(s => s.addCard);
  const rulings = getRulings(card.name);
  const meta = getMetaUsage(card.name);
  const misc = card.misc_info?.[0];
  const popularity = calcPopularity(misc?.viewsweek);
  const yugipediaUrl = `https://yugipedia.com/wiki/${encodeURIComponent(card.name)}`;

  const handleAdd = () => {
    const err = addCard(card);
    if (err) alert(err);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden fade-in">
      {/* Top image + close */}
      <div className="relative shrink-0 bg-black flex justify-center p-2">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-white p-1 rounded bg-black/50"
          >
            <X size={14} />
          </button>
        )}
        <img
          src={card.card_images[0]?.image_url}
          alt={card.name}
          className="h-48 object-contain rounded shadow-lg"
          loading="lazy"
        />
      </div>

      {/* Frame color strip */}
      <FrameHeader card={card} />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 text-sm">
        {/* Name + staple badge */}
        <div>
          <div className="flex items-start gap-2">
            <h2 className="font-bold text-accent leading-tight flex-1">{card.name}</h2>
            {misc?.staple && (
              <span className="shrink-0 flex items-center gap-1 text-[10px] bg-accent text-black px-1.5 py-0.5 rounded font-bold">
                <Star size={10} fill="black" /> STAPLE
              </span>
            )}
          </div>
          {card.archetype && (
            <p className="text-xs text-gray-400 mt-0.5">Archetype: {card.archetype}</p>
          )}
        </div>

        {/* Monster stats */}
        {card.atk !== undefined && (
          <div className="space-y-1.5">
            {card.level && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                {card.linkval
                  ? <span>Link-{card.linkval}</span>
                  : card.scale !== undefined
                    ? <span>Level {card.level} / Scale {card.scale}</span>
                    : <span>{'★'.repeat(Math.min(card.level, 12))}</span>
                }
              </div>
            )}
            <StatBar label="ATK" value={card.atk} max={5000} />
            {card.def !== undefined && <StatBar label="DEF" value={card.def} max={5000} />}
            {card.linkmarkers && (
              <p className="text-xs text-gray-400">Arrows: {card.linkmarkers.join(', ')}</p>
            )}
          </div>
        )}

        {/* Description */}
        <div>
          <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">{card.desc}</p>
        </div>

        {/* Ban Status */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            Ban Status
          </h3>
          <div className="flex flex-wrap gap-1.5">
            <BanBadge status={card.banlist_info?.ban_tcg ?? 'Unlimited'} format="TCG" />
            <BanBadge status={card.banlist_info?.ban_ocg ?? 'Unlimited'} format="OCG" />
            {card.banlist_info?.ban_goat && (
              <BanBadge status={card.banlist_info.ban_goat} format="GOAT" />
            )}
          </div>
        </div>

        {/* Usage / Meta Rate */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <TrendingUp size={11} /> Tournament Usage
          </h3>
          {meta ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-300">Top deck inclusion</span>
                <span className="font-bold text-accent">{meta.rate}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${meta.rate}%`,
                    background: `linear-gradient(90deg, #e2b04a, #f59e0b)`,
                  }}
                />
              </div>
              <p className="text-[11px] text-gray-400 italic">{meta.note}</p>
            </div>
          ) : popularity > 0 ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-300">Weekly popularity</span>
                <span className="font-bold text-accent">{popularity}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${popularity}%` }}
                />
              </div>
              <p className="text-[11px] text-gray-400 italic">
                Based on weekly views ({misc?.viewsweek?.toLocaleString() ?? 0} views)
              </p>
            </div>
          ) : (
            <p className="text-xs text-gray-500 italic">Insufficient tournament data</p>
          )}
        </div>

        {/* Rulings */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <BookOpen size={11} /> Rulings
          </h3>
          {rulings.length > 0 ? (
            <ul className="space-y-2">
              {rulings.map((r, i) => (
                <li key={i} className="flex gap-2 text-[11px] text-gray-300 leading-relaxed">
                  <span className="text-accent shrink-0 mt-0.5">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-gray-500 italic">
              No curated rulings. See the official ruling on Yugipedia.
            </p>
          )}
          <a
            href={yugipediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300"
          >
            <ExternalLink size={10} /> View on Yugipedia
          </a>
        </div>

        {/* Price */}
        {card.card_prices?.[0] && (
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Price</h3>
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              {[
                ['TCGPlayer', card.card_prices[0].tcgplayer_price],
                ['Cardmarket', card.card_prices[0].cardmarket_price],
              ].map(([label, val]) => val && val !== '0.00' ? (
                <div key={label} className="bg-surface rounded px-2 py-1">
                  <div className="text-gray-500">{label}</div>
                  <div className="text-accent font-semibold">${val}</div>
                </div>
              ) : null)}
            </div>
          </div>
        )}
      </div>

      {/* Add to deck button */}
      <div className="shrink-0 p-3 border-t border-white/5">
        <button
          onClick={handleAdd}
          className="w-full bg-accent hover:bg-yellow-400 text-black font-bold text-sm py-2 rounded transition-colors"
        >
          + Add to Deck
        </button>
      </div>
    </div>
  );
}
