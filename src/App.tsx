import { useEffect, useState } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { CatalogPage } from './components/CatalogPage';
import { ContactPage } from './components/ContactPage';
import { Header } from './components/Header';
import { WorkspaceBar } from './components/WorkspaceBar';
import { CartItem, DensityMode, PageId, Product, ThemeMode } from './types';

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem('ps-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getInitialDensity(): DensityMode {
  if (typeof window === 'undefined') return 'comfortable';
  const stored = window.localStorage.getItem('ps-density');
  return stored === 'high' ? 'high' : 'comfortable';
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('catalog');
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [density, setDensity] = useState<DensityMode>(getInitialDensity);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [contactTopic, setContactTopic] = useState<string | undefined>(undefined);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('ps-theme', theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem('ps-density', density);
  }, [density]);

  const handleNavigate = (page: PageId, anchorId?: string) => {
    setActivePage(page);
    if (anchorId) {
      window.setTimeout(() => {
        const target = document.getElementById(anchorId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoToContact = (prefillTopic?: string) => {
    setContactTopic(prefillTopic);
    handleNavigate('contact');
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8F6] text-[#141A15] dark:bg-[#0D110E] dark:text-[#EDF2ED] transition-colors duration-150">
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <WorkspaceBar
        activePage={activePage}
        theme={theme}
        onToggleTheme={setTheme}
        density={density}
        onChangeDensity={setDensity}
      />

      <main className="flex-1">
        {activePage === 'catalog' ? (
          <CatalogPage
            density={density}
            onAddToCart={handleAddToCart}
            onGoToContact={handleGoToContact}
          />
        ) : (
          <ContactPage
            density={density}
            prefillTopic={contactTopic}
            onBackToCatalog={() => handleNavigate('catalog')}
          />
        )}
      </main>

      <footer className="border-t border-black/8 dark:border-white/10 bg-[#EFF1ED]/60 dark:bg-[#111612]">
        <div
          className={`max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#525E54] dark:text-[#9CA89E] ${
            density === 'high' ? 'py-4' : 'py-7'
          }`}
        >
          <p>© 2026 Polna Spiżarnia · Sklep z certyfikowaną żywnością ekologiczną</p>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => handleNavigate('catalog')}
              className="hover:text-[#141A15] dark:hover:text-[#EDF2ED] cursor-pointer"
            >
              Katalog produktów
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('contact')}
              className="hover:text-[#141A15] dark:hover:text-[#EDF2ED] cursor-pointer"
            >
              Formularz kontaktowy
            </button>
          </div>
        </div>
      </footer>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
        density={density}
        onGoToContact={() => handleGoToContact('Zamówienie indywidualne')}
      />
    </div>
  );
}
