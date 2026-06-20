import { Component, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/Navbar';
import { SearchPanel } from './components/SearchPanel';
import { DeckBuilder } from './components/DeckBuilder';
import { CardDetail } from './components/CardDetail';
import { useDeckStore } from './store/deckStore';

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 32, color: '#f87171', fontFamily: 'monospace', background: '#0d0d1a', minHeight: '100vh' }}>
          <h2 style={{ color: '#ef4444' }}>App crashed — error details:</h2>
          <pre style={{ whiteSpace: 'pre-wrap', marginTop: 16 }}>{String(this.state.error)}</pre>
          <button
            onClick={() => { localStorage.removeItem('yugioh-deck-v1'); location.reload(); }}
            style={{ marginTop: 24, padding: '8px 16px', background: '#e2b04a', color: '#000', border: 'none', borderRadius: 4, cursor: 'pointer' }}
          >
            Clear saved data &amp; reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

function AppInner() {
  const selectedCard = useDeckStore(s => s.selectedCard);
  const setSelectedCard = useDeckStore(s => s.setSelectedCard);
  const format = useDeckStore(s => s.currentDeck.format);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-1 min-h-0">
        {/* Left: Search */}
        <div className="w-[300px] shrink-0 flex flex-col min-h-0">
          <SearchPanel />
        </div>

        {/* Center: Deck Builder */}
        <div className="flex-1 min-w-0 flex flex-col min-h-0 bg-[#0d0d1a]">
          <DeckBuilder />
        </div>

        {/* Right: Card Detail */}
        <div
          className={`shrink-0 flex flex-col min-h-0 bg-panel border-l border-white/5 transition-all duration-200 ${
            selectedCard ? 'w-[280px]' : 'w-0 overflow-hidden'
          }`}
        >
          {selectedCard && (
            <CardDetail
              card={selectedCard}
              format={format}
              onClose={() => setSelectedCard(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppInner />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
