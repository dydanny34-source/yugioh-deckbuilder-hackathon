import { useState } from 'react';
import { Save, Download, Plus, FolderOpen, Trash2, Swords, LayoutTemplate } from 'lucide-react';
import { useDeckStore } from '../store/deckStore';
import type { Format } from '../types';
import { SampleDecksModal } from './SampleDecksModal';

const FORMATS: { value: Format; label: string }[] = [
  { value: 'tcg', label: 'TCG' },
  { value: 'ocg', label: 'OCG' },
  { value: 'goat', label: 'GOAT' },
];

export function Navbar() {
  const { currentDeck, savedDecks, format, setDeckName, setFormat, saveDeck, loadDeck, newDeck, deleteDeck, exportYdk } = useDeckStore(s => ({
    currentDeck: s.currentDeck,
    savedDecks: s.savedDecks,
    format: s.currentDeck.format,
    setDeckName: s.setDeckName,
    setFormat: s.setFormat,
    saveDeck: s.saveDeck,
    loadDeck: s.loadDeck,
    newDeck: s.newDeck,
    deleteDeck: s.deleteDeck,
    exportYdk: s.exportYdk,
  }));

  const [showDecks, setShowDecks] = useState(false);
  const [showSamples, setShowSamples] = useState(false);
  const [editingName, setEditingName] = useState(false);

  const handleExport = () => {
    const ydk = exportYdk();
    const blob = new Blob([ydk], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${currentDeck.name.replace(/\s+/g, '_')}.ydk`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleSave = () => {
    saveDeck();
    setShowDecks(false);
  };

  return (
    <>
    <nav className="shrink-0 bg-surface border-b border-white/10 px-4 py-2 flex items-center gap-3 relative z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 font-bold text-accent mr-2">
        <Swords size={18} />
        <span className="text-sm hidden sm:block tracking-wide">YGO Deck Builder</span>
      </div>

      {/* Format selector */}
      <div className="flex rounded overflow-hidden border border-white/10">
        {FORMATS.map(f => (
          <button
            key={f.value}
            onClick={() => setFormat(f.value)}
            className={`px-3 py-1 text-xs font-semibold transition-colors ${
              format === f.value
                ? 'bg-accent text-black'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Deck name */}
      <div className="flex-1 min-w-0">
        {editingName ? (
          <input
            autoFocus
            type="text"
            value={currentDeck.name}
            onChange={e => setDeckName(e.target.value)}
            onBlur={() => setEditingName(false)}
            onKeyDown={e => e.key === 'Enter' && setEditingName(false)}
            className="bg-black/30 text-sm text-gray-200 px-2 py-1 rounded border border-accent/50 focus:outline-none w-full max-w-[200px]"
          />
        ) : (
          <button
            onClick={() => setEditingName(true)}
            className="text-sm text-gray-300 hover:text-white truncate max-w-[200px] text-left"
            title="Click to rename"
          >
            {currentDeck.name}
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 ml-auto">
        <button
          onClick={() => setShowSamples(true)}
          title="Sample Decks"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-300 bg-surface hover:bg-white/10 border border-white/10 rounded transition-colors"
        >
          <LayoutTemplate size={13} /> Samples
        </button>

        <button
          onClick={() => { newDeck(); setShowDecks(false); }}
          title="New Deck"
          className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-white/5"
        >
          <Plus size={16} />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowDecks(s => !s)}
            title="My Decks"
            className={`p-1.5 rounded hover:bg-white/5 transition-colors ${showDecks ? 'text-accent' : 'text-gray-400 hover:text-white'}`}
          >
            <FolderOpen size={16} />
          </button>
          {showDecks && (
            <div className="absolute right-0 top-full mt-1 w-64 bg-surface border border-white/10 rounded shadow-xl py-1">
              {savedDecks.length === 0 ? (
                <p className="text-xs text-gray-500 px-3 py-2">No saved decks yet</p>
              ) : savedDecks.map(d => (
                <div key={d.id} className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 group">
                  <button
                    className="flex-1 text-left text-sm text-gray-300 hover:text-white truncate"
                    onClick={() => { loadDeck(d.id); setShowDecks(false); }}
                  >
                    {d.name}
                    <span className="text-xs text-gray-600 ml-2">{d.format.toUpperCase()}</span>
                  </button>
                  <button
                    onClick={() => deleteDeck(d.id)}
                    className="text-red-600 opacity-0 group-hover:opacity-100 p-0.5 hover:text-red-400"
                    title="Delete deck"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleSave}
          title="Save Deck"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-black bg-accent hover:bg-yellow-400 rounded transition-colors"
        >
          <Save size={13} /> Save
        </button>

        <button
          onClick={handleExport}
          title="Export as .ydk"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-300 bg-surface hover:bg-white/10 border border-white/10 rounded transition-colors"
        >
          <Download size={13} /> Export
        </button>
      </div>
    </nav>

    {showSamples && <SampleDecksModal onClose={() => setShowSamples(false)} />}
    </>
  );
}
