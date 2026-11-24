import React from 'react';
import { LayoutGrid, List, Moon, Sun } from 'lucide-react';
import { DensityMode, PageId, ThemeMode } from '../types';

interface WorkspaceBarProps {
  activePage: PageId;
  theme: ThemeMode;
  onToggleTheme: (next: ThemeMode) => void;
  density: DensityMode;
  onChangeDensity: (next: DensityMode) => void;
}

export const WorkspaceBar: React.FC<WorkspaceBarProps> = ({
  activePage,
  theme,
  onToggleTheme,
  density,
  onChangeDensity,
}) => {
  return (
    <div className="border-b border-[#141A15]/8 dark:border-white/10 bg-[#EFF1ED]/70 dark:bg-[#131814]/80">
      <div
        className={`max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 ${
          density === 'high' ? 'py-2' : 'py-2.5'
        }`}
      >
        {/* Clean unboxed page context metadata */}
        <div className="flex items-center gap-2 text-xs text-[#525E54] dark:text-[#A4B2A6] tracking-normal dark:tracking-[0.01em]">
          <span className="font-medium text-[#141A15] dark:text-[#EDF2ED]">
            {activePage === 'catalog' ? 'Podstrona 1 z 2' : 'Podstrona 2 z 2'}
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {activePage === 'catalog'
              ? 'Katalog produktów ekologicznych'
              : 'Formularz kontaktowy dla klientów'}
          </span>
        </div>

        {/* Display & Density Controls */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {/* High Density Mode Switch */}
          <div
            role="group"
            aria-label="Gęstość interfejsu"
            className="inline-flex items-center p-0.5 rounded-lg bg-[#E3E7E0] dark:bg-[#1B221D] border border-black/6 dark:border-white/8"
          >
            <button
              type="button"
              onClick={() => onChangeDensity('comfortable')}
              aria-pressed={density === 'comfortable'}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer min-h-[32px] ${
                density === 'comfortable'
                  ? 'bg-white dark:bg-[#273129] text-[#141A15] dark:text-[#EDF2ED] shadow-xs'
                  : 'text-[#525E54] dark:text-[#9CA89E] hover:text-[#141A15] dark:hover:text-[#EDF2ED]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Komfortowy</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeDensity('high')}
              aria-pressed={density === 'high'}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer min-h-[32px] ${
                density === 'high'
                  ? 'bg-white dark:bg-[#273129] text-[#141A15] dark:text-[#EDF2ED] shadow-xs'
                  : 'text-[#525E54] dark:text-[#9CA89E] hover:text-[#141A15] dark:hover:text-[#EDF2ED]'
              }`}
            >
              <List className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Wysoka gęstość</span>
            </button>
          </div>

          {/* Dark / Light Mode Switch */}
          <div
            role="group"
            aria-label="Motyw kolorystyczny"
            className="inline-flex items-center p-0.5 rounded-lg bg-[#E3E7E0] dark:bg-[#1B221D] border border-black/6 dark:border-white/8"
          >
            <button
              type="button"
              onClick={() => onToggleTheme('light')}
              aria-pressed={theme === 'light'}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer min-h-[32px] ${
                theme === 'light'
                  ? 'bg-white dark:bg-[#273129] text-[#141A15] dark:text-[#EDF2ED] shadow-xs'
                  : 'text-[#525E54] dark:text-[#9CA89E] hover:text-[#141A15] dark:hover:text-[#EDF2ED]'
              }`}
            >
              <Sun className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Jasny</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleTheme('dark')}
              aria-pressed={theme === 'dark'}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer min-h-[32px] ${
                theme === 'dark'
                  ? 'bg-white dark:bg-[#273129] text-[#141A15] dark:text-[#EDF2ED] shadow-xs'
                  : 'text-[#525E54] dark:text-[#9CA89E] hover:text-[#141A15] dark:hover:text-[#EDF2ED]'
              }`}
            >
              <Moon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Ciemny</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
