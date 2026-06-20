interface Props {
  frameType: string;
  type: string;
}

function frameColor(frameType: string): string {
  const map: Record<string, string> = {
    normal: 'bg-yellow-700',
    effect: 'bg-orange-700',
    ritual: 'bg-blue-700',
    fusion: 'bg-purple-700',
    synchro: 'bg-gray-500',
    xyz: 'bg-gray-800 border border-gray-600',
    link: 'bg-blue-900',
    spell: 'bg-green-800',
    trap: 'bg-purple-900',
    token: 'bg-gray-600',
  };
  const key = frameType.split('_')[0];
  return map[key] ?? 'bg-gray-700';
}

export function CardTypeTag({ frameType, type }: Props) {
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded text-white ${frameColor(frameType)}`}>
      {type.replace('Monster', '').replace('Card', '').trim() || type}
    </span>
  );
}
