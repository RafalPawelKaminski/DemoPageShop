import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { PageId } from '../types';

interface HeaderProps {
  activePage: PageId;
  onNavigate: (page: PageId, anchorId?: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-[#141A15]/8 dark:border-white/10 bg-[#F7F8F6]/95 dark:bg-[#0D110E]/95 backdrop-blur-md">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('catalog')}
          className="font-display text-lg sm:text-xl font-semibold tracking-tight text-[#141A15] dark:text-[#EDF2ED] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#234F32] dark:focus-visible:outline-[#58A874] rounded-sm"
        >
          Polna Spiżarnia
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Główna nawigacja"
          className="flex items-center gap-4 sm:gap-6 text-sm font-medium overflow-x-auto no-scrollbar"
        >
          <button
            type="button"
            onClick={() => onNavigate('catalog', 'katalog-sekcja')}
            className={`py-1 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer border-b-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#234F32] dark:focus-visible:outline-[#58A874] ${
              activePage === 'catalog'
                ? 'text-[#141A15] dark:text-[#EDF2ED] border-[#234F32] dark:border-[#58A874]'
                : 'text-[#525E54] dark:text-[#9CA89E] border-transparent hover:text-[#141A15] dark:hover:text-[#EDF2ED]'
            }`}
          >
            Katalog
          </button>

          <button
            type="button"
            onClick={() => onNavigate('catalog', 'o-uprawach')}
            className="hidden md:inline-block py-1 whitespace-nowrap shrink-0 text-[#525E54] dark:text-[#9CA89E] border-b-2 border-transparent hover:text-[#141A15] dark:hover:text-[#EDF2ED] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#234F32] dark:focus-visible:outline-[#58A874]"
          >
            O uprawach
          </button>

          <button
            type="button"
            onClick={() => onNavigate('catalog', 'certyfikaty')}
            className="hidden lg:inline-block py-1 whitespace-nowrap shrink-0 text-[#525E54] dark:text-[#9CA89E] border-b-2 border-transparent hover:text-[#141A15] dark:hover:text-[#EDF2ED] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#234F32] dark:focus-visible:outline-[#58A874]"
          >
            Certyfikaty
          </button>

          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className={`py-1 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer border-b-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#234F32] dark:focus-visible:outline-[#58A874] ${
              activePage === 'contact'
                ? 'text-[#141A15] dark:text-[#EDF2ED] border-[#234F32] dark:border-[#58A874]'
                : 'text-[#525E54] dark:text-[#9CA89E] border-transparent hover:text-[#141A15] dark:hover:text-[#EDF2ED]'
            }`}
          >
            Kontakt
          </button>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Otwórz koszyk, liczba produktów: ${cartCount}`}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-[#234F32] text-white hover:bg-[#1B3E27] dark:bg-[#58A874] dark:text-[#0B120D] dark:hover:bg-[#6AB986] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#234F32] dark:focus-visible:outline-[#58A874]"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Koszyk</span>
            <span className="font-mono-tabular">({cartCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
