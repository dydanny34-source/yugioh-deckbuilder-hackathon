import type { BanStatus } from '../types';

interface Props {
  status?: BanStatus;
  format: string;
}

const CONFIG: Record<string, { label: string; cls: string }> = {
  Forbidden: { label: 'Forbidden', cls: 'bg-red-600 text-white' },
  Limited: { label: 'Limited 1', cls: 'bg-orange-500 text-white' },
  'Semi-Limited': { label: 'Semi-Lim 2', cls: 'bg-yellow-500 text-black' },
  Unlimited: { label: 'Unlimited', cls: 'bg-green-600 text-white' },
};

export function BanBadge({ status, format }: Props) {
  const cfg = CONFIG[status ?? 'Unlimited'] ?? CONFIG.Unlimited;
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded ${cfg.cls}`}>
      <span className="uppercase tracking-wider opacity-70">{format}</span>
      {cfg.label}
    </span>
  );
}
