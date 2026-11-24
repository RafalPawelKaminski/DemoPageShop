import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  Eye,
  LayoutGrid,
  Plus,
  RotateCcw,
  Search,
  Table2,
  X,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, formatPln } from '../data/products';
import {
  CategoryId,
  DensityMode,
  HighDensityLayout,
  Product,
  SortOption,
} from '../types';
import { HeroPantryArtwork, ProductArtwork } from './ProductArtwork';

interface CatalogPageProps {
  density: DensityMode;
  onAddToCart: (product: Product, quantity?: number) => void;
  onGoToContact: (prefillTopic?: string) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  density,
  onAddToCart,
  onGoToContact,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [highDensityLayout, setHighDensityLayout] =
    useState<HighDensityLayout>('grid');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalQty, setModalQty] = useState(1);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const isHigh = density === 'high';

  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryId, number> = {
      all: PRODUCTS.length,
      'warzywa-owoce': 0,
      'ziarna-maki': 0,
      'miody-przetwory': 0,
      'nabial-fermenty': 0,
      'oleje-ziola': 0,
    };
    for (const p of PRODUCTS) {
      counts[p.category] += 1;
    }
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      if (onlyInStock && !product.inStock) {
        return false;
      }
      if (query.length > 0) {
        const haystack =
          `${product.name} ${product.origin} ${product.producer} ${product.categoryLabel} ${product.sku}`.toLowerCase();
        if (!haystack.includes(query)) {
          return false;
        }
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'name-asc') {
      return [...list].sort((a, b) => a.name.localeCompare(b.name, 'pl'));
    }
    return list;
  }, [selectedCategory, searchQuery, sortBy, onlyInStock]);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery.trim().length > 0 ||
    onlyInStock ||
    sortBy !== 'featured';

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setOnlyInStock(false);
  };

  const handleQuickAdd = (product: Product, qty = 1) => {
    if (!product.inStock) return;
    onAddToCart(product, qty);
    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === product.id ? null : prev));
    }, 1200);
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalQty(1);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Storefront Hero Section */}
      {isHigh ? (
        <section className="py-5 border-b border-black/8 dark:border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <p className="text-xs font-medium text-[#234F32] dark:text-[#6EC28B]">
              Certyfikowana spiżarnia ekologiczna · Tryb wysokiej gęstości
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#141A15] dark:text-[#EDF2ED]">
              Katalog żywności organicznej z polskich gospodarstw
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <span className="text-xs text-[#525E54] dark:text-[#9CA89E] font-mono-tabular">
              12 pozycji · PL-EKO · Dostawa 24h
            </span>
            <button
              type="button"
              onClick={() => onGoToContact('Współpraca B2B / HoReCa')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-black/12 dark:border-white/15 bg-white dark:bg-[#161C17] hover:bg-[#EFF2EE] dark:hover:bg-[#1F2720] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Zapytaj o hurt B2B</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </section>
      ) : (
        <section className="py-8 sm:py-12 lg:py-14 border-b border-black/8 dark:border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between py-2 space-y-6">
              <div className="space-y-4">
                <p className="text-xs sm:text-sm font-medium text-[#234F32] dark:text-[#6EC28B]">
                  Bezpośrednio od certyfikowanych rolników · Polska
                </p>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.85rem] font-semibold leading-[1.12] tracking-tight text-[#141A15] dark:text-[#EDF2ED]">
                  Ekologiczna żywność z krótkiego łańcucha zbiorów
                </h1>
                <p className="text-base text-[#4A564C] dark:text-[#B1BEB3] leading-relaxed max-w-[58ch]">
                  Współpracujemy z osiemnastoma rodzinnymi gospodarstwami, pasiekami
                  i młynami żarnowymi. Każdy produkt trafia do spiżarni w ciągu
                  doby od zbioru lub tłoczenia.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#katalog-sekcja"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-[#234F32] text-white hover:bg-[#1B3E27] dark:bg-[#58A874] dark:text-[#0B120D] dark:hover:bg-[#6AB986] transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px]"
                >
                  <span>Przeglądaj katalog</span>
                </a>
                <button
                  type="button"
                  onClick={() => onGoToContact()}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border border-black/14 dark:border-white/16 text-[#141A15] dark:text-[#EDF2ED] hover:bg-black/5 dark:hover:bg-white/6 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
                >
                  <span>Formularz kontaktowy</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <HeroPantryArtwork />
            </div>
          </div>

          {/* 4-column unboxed proof strip placed below hero split */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-black/8 dark:border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-lg sm:text-xl font-semibold font-mono-tabular text-[#141A15] dark:text-[#EDF2ED]">
                100% PL-EKO
              </p>
              <p className="text-xs sm:text-sm text-[#525E54] dark:text-[#9CA89E] mt-1">
                Certyfikacja rolnictwa ekologicznego
              </p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-semibold font-mono-tabular text-[#141A15] dark:text-[#EDF2ED]">
                18 gospodarstw
              </p>
              <p className="text-xs sm:text-sm text-[#525E54] dark:text-[#9CA89E] mt-1">
                Lokalni dostawcy z 7 regionów Polski
              </p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-semibold font-mono-tabular text-[#141A15] dark:text-[#EDF2ED]">
                24 godziny
              </p>
              <p className="text-xs sm:text-sm text-[#525E54] dark:text-[#9CA89E] mt-1">
                Czas dostawy w kontrolowanym chłodzie
              </p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-semibold font-mono-tabular text-[#141A15] dark:text-[#EDF2ED]">
                0% plastiku
              </p>
              <p className="text-xs sm:text-sm text-[#525E54] dark:text-[#9CA89E] mt-1">
                Szkło zwrotne, papier kraft i wełna drzewna
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Product Catalog Section */}
      <section
        id="katalog-sekcja"
        className={isHigh ? 'py-5 space-y-4' : 'py-10 sm:py-12 space-y-7'}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2
              className={`font-display font-semibold tracking-tight text-[#141A15] dark:text-[#EDF2ED] ${
                isHigh ? 'text-xl' : 'text-2xl sm:text-3xl'
              }`}
            >
              Katalog produktów
            </h2>
            <p className="text-xs sm:text-sm text-[#525E54] dark:text-[#9CA89E] mt-1">
              Wyświetlono{' '}
              <span className="font-mono-tabular font-medium text-[#141A15] dark:text-[#EDF2ED]">
                {filteredProducts.length}
              </span>{' '}
              z{' '}
              <span className="font-mono-tabular">{PRODUCTS.length}</span>{' '}
              produktów ekologicznych
            </p>
          </div>

          {isHigh && (
            <div
              role="group"
              aria-label="Układ wysokiej gęstości"
              className="inline-flex items-center p-0.5 rounded-lg bg-[#E6E9E3] dark:bg-[#19201B] border border-black/8 dark:border-white/10 self-start sm:self-auto"
            >
              <button
                type="button"
                onClick={() => setHighDensityLayout('grid')}
                aria-pressed={highDensityLayout === 'grid'}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  highDensityLayout === 'grid'
                    ? 'bg-white dark:bg-[#273129] text-[#141A15] dark:text-[#EDF2ED] shadow-xs'
                    : 'text-[#525E54] dark:text-[#9CA89E]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Siatka zwarta</span>
              </button>
              <button
                type="button"
                onClick={() => setHighDensityLayout('table')}
                aria-pressed={highDensityLayout === 'table'}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  highDensityLayout === 'table'
                    ? 'bg-white dark:bg-[#273129] text-[#141A15] dark:text-[#EDF2ED] shadow-xs'
                    : 'text-[#525E54] dark:text-[#9CA89E]'
                }`}
              >
                <Table2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Tabela katalogowa</span>
              </button>
            </div>
          )}
        </div>

        {/* Category Filtering & Search Toolbar */}
        <div
          className={`rounded-xl border border-black/8 dark:border-white/10 bg-white dark:bg-[#141A15] ${
            isHigh ? 'p-3 space-y-2.5' : 'p-4 sm:p-5 space-y-4'
          }`}
        >
          {/* Interactive Segmented Category Filter */}
          <div
            role="tablist"
            aria-label="Filtruj według kategorii"
            className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1"
          >
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer min-h-[38px] ${
                    active
                      ? 'bg-[#234F32] text-white dark:bg-[#58A874] dark:text-[#0B120D]'
                      : 'bg-[#F2F4F0] dark:bg-[#1C231D] text-[#424E44] dark:text-[#B4C1B6] hover:bg-[#E7EBE3] dark:hover:bg-[#242D26]'
                  }`}
                >
                  <span>{isHigh ? cat.shortLabel : cat.label}</span>
                  <span
                    className={`font-mono-tabular text-xs ${
                      active
                        ? 'text-white/85 dark:text-[#0B120D]/80'
                        : 'text-[#6A776C] dark:text-[#869488]'
                    }`}
                  >
                    {categoryCounts[cat.id]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search, Stock Filter & Sort Row */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <Search
                className="w-4 h-4 text-[#637065] dark:text-[#8B988D] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Szukaj produktu, regionu lub numeru SKU..."
                aria-label="Szukaj produktu"
                className={`w-full pl-9 pr-3 rounded-lg border border-black/12 dark:border-white/14 bg-[#F7F8F6] dark:bg-[#0E130F] text-sm text-[#141A15] dark:text-[#EDF2ED] placeholder:text-[#6B786D] dark:placeholder:text-[#7E8C80] focus:outline-2 focus:outline-[#234F32] dark:focus:outline-[#58A874] ${
                  isHigh ? 'py-1.5' : 'py-2'
                }`}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-black/10 dark:border-white/12 bg-[#F7F8F6] dark:bg-[#0E130F] text-xs sm:text-sm cursor-pointer select-none min-h-[38px]">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="accent-[#234F32] dark:accent-[#58A874] w-4 h-4 rounded"
                />
                <span className="whitespace-nowrap">Tylko dostępne</span>
              </label>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sortuj produkty"
                className={`px-3 rounded-lg border border-black/12 dark:border-white/14 bg-[#F7F8F6] dark:bg-[#0E130F] text-xs sm:text-sm text-[#141A15] dark:text-[#EDF2ED] focus:outline-2 focus:outline-[#234F32] dark:focus:outline-[#58A874] min-h-[38px] ${
                  isHigh ? 'py-1.5' : 'py-2'
                }`}
              >
                <option value="featured">Sortowanie: Polecane</option>
                <option value="price-asc">Cena: od najniższej</option>
                <option value="price-desc">Cena: od najwyższej</option>
                <option value="name-asc">Nazwa: A–Z</option>
              </select>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-black/12 dark:border-white/14 hover:bg-black/5 dark:hover:bg-white/6 transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[38px]"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Resetuj</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Empty Filter State */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-xl border border-black/8 dark:border-white/10 bg-white dark:bg-[#141A15] p-10 text-center space-y-3">
            <p className="text-base font-semibold">
              Brak produktów spełniających wybrane kryteria
            </p>
            <p className="text-sm text-[#525E54] dark:text-[#9CA89E] max-w-md mx-auto">
              Spróbuj zmienić kategorię, wyczyścić frazę wyszukiwania lub odznaczyć
              filtr dostępności.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[#234F32] text-white dark:bg-[#58A874] dark:text-[#0B120D] cursor-pointer"
            >
              Pokaż wszystkie produkty
            </button>
          </div>
        ) : isHigh && highDensityLayout === 'table' ? (
          /* High Density Catalog Table View */
          <div className="rounded-xl border border-black/10 dark:border-white/12 bg-white dark:bg-[#141A15] overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-black/8 dark:border-white/10 bg-[#F2F4F0] dark:bg-[#19201B] text-[#4B574D] dark:text-[#A4B2A6]">
                  <th className="py-2.5 px-3 font-medium whitespace-nowrap">SKU</th>
                  <th className="py-2.5 px-3 font-medium">Produkt</th>
                  <th className="py-2.5 px-3 font-medium whitespace-nowrap">Kategoria</th>
                  <th className="py-2.5 px-3 font-medium whitespace-nowrap hidden md:table-cell">
                    Region
                  </th>
                  <th className="py-2.5 px-3 font-medium whitespace-nowrap hidden lg:table-cell">
                    Certyfikat
                  </th>
                  <th className="py-2.5 px-3 font-medium whitespace-nowrap">Gramatura</th>
                  <th className="py-2.5 px-3 font-medium text-right whitespace-nowrap">
                    Cena
                  </th>
                  <th className="py-2.5 px-3 font-medium text-right whitespace-nowrap">
                    Akcja
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/6 dark:divide-white/8">
                {filteredProducts.map((product) => {
                  const added = recentlyAddedId === product.id;
                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-[#F7F8F6] dark:hover:bg-[#1A211C] transition-colors"
                    >
                      <td className="py-2 px-3 font-mono-tabular text-xs text-[#525E54] dark:text-[#9CA89E] whitespace-nowrap">
                        {product.sku}
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-md overflow-hidden border border-black/8 dark:border-white/10 shrink-0">
                            <ProductArtwork
                              illustrationKey={product.illustrationKey}
                              title={product.name}
                              compact
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => openModal(product)}
                            className="font-medium text-left hover:underline cursor-pointer"
                          >
                            {product.name}
                          </button>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-xs text-[#525E54] dark:text-[#9CA89E] whitespace-nowrap">
                        {product.categoryLabel}
                      </td>
                      <td className="py-2 px-3 text-xs text-[#525E54] dark:text-[#9CA89E] whitespace-nowrap hidden md:table-cell">
                        {product.origin}
                      </td>
                      <td className="py-2 px-3 font-mono-tabular text-xs text-[#525E54] dark:text-[#9CA89E] whitespace-nowrap hidden lg:table-cell">
                        {product.certCode}
                      </td>
                      <td className="py-2 px-3 font-mono-tabular text-xs whitespace-nowrap">
                        {product.weight}
                      </td>
                      <td className="py-2 px-3 font-mono-tabular font-semibold text-right whitespace-nowrap">
                        {formatPln(product.price)}
                      </td>
                      <td className="py-2 px-3 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openModal(product)}
                            aria-label={`Szczegóły: ${product.name}`}
                            className="p-1.5 rounded-md border border-black/10 dark:border-white/12 hover:bg-black/5 dark:hover:bg-white/8 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={!product.inStock}
                            onClick={() => handleQuickAdd(product)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                              !product.inStock
                                ? 'bg-black/6 dark:bg-white/8 text-[#78857A] cursor-not-allowed'
                                : added
                                  ? 'bg-[#1D422A] text-white dark:bg-[#6EC28B] dark:text-[#0B120D]'
                                  : 'bg-[#234F32] text-white hover:bg-[#1B3E27] dark:bg-[#58A874] dark:text-[#0B120D] cursor-pointer'
                            }`}
                          >
                            {!product.inStock ? (
                              <span>Brak</span>
                            ) : added ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Dodano</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Dodaj</span>
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Product Grid (Comfortable 3-col or High-Density 4-col) */
          <div
            className={
              isHigh
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7'
            }
          >
            {filteredProducts.map((product) => {
              const added = recentlyAddedId === product.id;

              if (isHigh) {
                return (
                  <article
                    key={product.id}
                    className="group rounded-lg border border-black/10 dark:border-white/12 bg-white dark:bg-[#141A15] p-3 flex flex-col justify-between gap-2.5 hover:border-black/22 dark:hover:border-white/24 transition-colors duration-150"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => openModal(product)}
                        className="w-14 h-14 rounded-md overflow-hidden border border-black/8 dark:border-white/10 shrink-0 cursor-pointer"
                        aria-label={`Zobacz szczegóły ${product.name}`}
                      >
                        <ProductArtwork
                          illustrationKey={product.illustrationKey}
                          title={product.name}
                          compact
                        />
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 text-[11px] text-[#525E54] dark:text-[#9CA89E] font-mono-tabular">
                          <span>{product.sku}</span>
                          <span aria-hidden="true">·</span>
                          <span className="truncate">{product.categoryLabel}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => openModal(product)}
                          className="text-left text-sm font-semibold text-[#141A15] dark:text-[#EDF2ED] hover:underline leading-snug line-clamp-1 mt-0.5 cursor-pointer"
                        >
                          {product.name}
                        </button>
                        <p className="text-[11px] text-[#525E54] dark:text-[#9CA89E] truncate mt-0.5">
                          {product.origin} · {product.certCode}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-black/6 dark:border-white/8 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-sm font-semibold font-mono-tabular text-[#141A15] dark:text-[#EDF2ED]">
                          {formatPln(product.price)}
                        </span>
                        <span className="text-[11px] text-[#525E54] dark:text-[#9CA89E] ml-1.5 font-mono-tabular">
                          / {product.weight}
                        </span>
                      </div>

                      <button
                        type="button"
                        disabled={!product.inStock}
                        onClick={() => handleQuickAdd(product)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[32px] ${
                          !product.inStock
                            ? 'bg-black/6 dark:bg-white/8 text-[#78857A] cursor-not-allowed'
                            : added
                              ? 'bg-[#1D422A] text-white dark:bg-[#6EC28B] dark:text-[#0B120D]'
                              : 'bg-[#234F32] text-white hover:bg-[#1B3E27] dark:bg-[#58A874] dark:text-[#0B120D] cursor-pointer'
                        }`}
                      >
                        {!product.inStock ? (
                          <span>Wyprzedane</span>
                        ) : added ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Dodano</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Dodaj</span>
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                );
              }

              return (
                <article
                  key={product.id}
                  className="group rounded-xl border border-black/8 dark:border-white/10 bg-white dark:bg-[#141A15] overflow-hidden flex flex-col transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-black/30"
                >
                  <button
                    type="button"
                    onClick={() => openModal(product)}
                    className="aspect-[4/3] w-full overflow-hidden border-b border-black/6 dark:border-white/8 cursor-pointer block text-left"
                    aria-label={`Otwórz kartę produktu ${product.name}`}
                  >
                    <ProductArtwork
                      illustrationKey={product.illustrationKey}
                      title={product.name}
                    />
                  </button>

                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      {/* Unboxed 1-line metadata */}
                      <div className="flex items-center justify-between gap-2 text-xs text-[#525E54] dark:text-[#9CA89E]">
                        <span className="truncate">
                          {product.categoryLabel} · {product.origin}
                        </span>
                        <span className="font-mono-tabular shrink-0">
                          {product.inStock ? product.certCode : 'Chwilowo brak'}
                        </span>
                      </div>

                      <h3 className="text-base font-semibold text-[#141A15] dark:text-[#EDF2ED] leading-snug">
                        <button
                          type="button"
                          onClick={() => openModal(product)}
                          className="text-left hover:underline cursor-pointer"
                        >
                          {product.name}
                        </button>
                      </h3>

                      <p className="text-sm text-[#4A564C] dark:text-[#A9B7AB] leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-3.5 border-t border-black/6 dark:border-white/8 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold font-mono-tabular text-[#141A15] dark:text-[#EDF2ED]">
                          {formatPln(product.price)}
                        </p>
                        <p className="text-xs text-[#525E54] dark:text-[#9CA89E] font-mono-tabular">
                          {product.weight} · {product.pricePerUnit}
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={!product.inStock}
                        onClick={() => handleQuickAdd(product)}
                        className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] ${
                          !product.inStock
                            ? 'bg-black/6 dark:bg-white/8 text-[#78857A] cursor-not-allowed'
                            : added
                              ? 'bg-[#1D422A] text-white dark:bg-[#6EC28B] dark:text-[#0B120D]'
                              : 'bg-[#234F32] text-white hover:bg-[#1B3E27] dark:bg-[#58A874] dark:text-[#0B120D] dark:hover:bg-[#6AB986] cursor-pointer'
                        }`}
                      >
                        {!product.inStock ? (
                          <span>Wyprzedane</span>
                        ) : added ? (
                          <>
                            <Check className="w-4 h-4" aria-hidden="true" />
                            <span>Dodano</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" aria-hidden="true" />
                            <span>Do koszyka</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Craftsmanship & Certification Section */}
      <section
        id="o-uprawach"
        className={`border-t border-black/8 dark:border-white/10 ${
          isHigh ? 'py-6' : 'py-10 sm:py-14'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-2.5">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Standard naszych upraw
            </h2>
            <p className="text-sm text-[#4A564C] dark:text-[#A9B7AB] leading-relaxed">
              Każda partia produktów posiada identyfikowalny numer certyfikatu
              oraz datę zbioru lub tłoczenia.
            </p>
            <button
              type="button"
              onClick={() => onGoToContact('Pytanie o certyfikaty BIO')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#234F32] dark:text-[#6EC28B] hover:underline pt-1 cursor-pointer"
            >
              <span>Poproś o dokumentację partii</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div
            id="certyfikaty"
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-[#141A15] dark:text-[#EDF2ED]">
                01. Badania gleby i nasion
              </h3>
              <p className="text-xs sm:text-sm text-[#525E54] dark:text-[#9CA89E] leading-relaxed">
                Gospodarstwa przechodzą coroczne audyty jednostek certyfikujących
                PL-EKO bez stosowania pestycydów syntetycznych.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-[#141A15] dark:text-[#EDF2ED]">
                02. Świeżość bez magazynów
              </h3>
              <p className="text-xs sm:text-sm text-[#525E54] dark:text-[#9CA89E] leading-relaxed">
                Warzywa i nabiał ruszają w drogę w dniu zbioru w opakowaniach
                chłodniczych utrzymujących 2–6°C.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-[#141A15] dark:text-[#EDF2ED]">
                03. Zamówienia dla gastronomii
              </h3>
              <p className="text-xs sm:text-sm text-[#525E54] dark:text-[#9CA89E] leading-relaxed">
                Dostarczamy również stałe skrzynki sezonowe do restauracji i
                piekarni rzemieślniczych w całej Polsce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={selectedProduct.name}
        >
          <div
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-[2px]"
            onClick={() => setSelectedProduct(null)}
          />
          <div className="relative z-10 w-full max-w-2xl rounded-xl border border-black/10 dark:border-white/12 bg-white dark:bg-[#141A15] text-[#141A15] dark:text-[#EDF2ED] overflow-hidden shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              aria-label="Zamknij szczegóły produktu"
              className="absolute top-3 right-3 z-20 p-2 rounded-lg bg-white/85 dark:bg-[#141A15]/85 border border-black/10 dark:border-white/12 hover:bg-white dark:hover:bg-[#1E261F] cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-12">
              <div className="sm:col-span-5 aspect-[4/3] sm:aspect-auto min-h-[220px] border-b sm:border-b-0 sm:border-r border-black/8 dark:border-white/10">
                <ProductArtwork
                  illustrationKey={selectedProduct.illustrationKey}
                  title={selectedProduct.name}
                />
              </div>

              <div className="sm:col-span-7 p-6 flex flex-col justify-between gap-5">
                <div className="space-y-3">
                  <div className="text-xs text-[#525E54] dark:text-[#9CA89E] font-mono-tabular">
                    {selectedProduct.sku} · {selectedProduct.categoryLabel} ·{' '}
                    {selectedProduct.certCode}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold leading-snug">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-sm text-[#4A564C] dark:text-[#B1BEB3] leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <dl className="pt-2 border-t border-black/8 dark:border-white/10 space-y-1.5 text-xs">
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#525E54] dark:text-[#9CA89E]">
                        Producent
                      </dt>
                      <dd className="font-medium text-right">
                        {selectedProduct.producer}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#525E54] dark:text-[#9CA89E]">Region</dt>
                      <dd className="font-medium text-right">
                        {selectedProduct.origin}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#525E54] dark:text-[#9CA89E]">
                        Zbiór i partia
                      </dt>
                      <dd className="font-medium text-right">
                        {selectedProduct.harvestNote}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="pt-4 border-t border-black/8 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold font-mono-tabular">
                      {formatPln(selectedProduct.price)}
                    </p>
                    <p className="text-xs text-[#525E54] dark:text-[#9CA89E] font-mono-tabular">
                      {selectedProduct.weight} ({selectedProduct.pricePerUnit})
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={modalQty}
                      onChange={(e) => setModalQty(Number(e.target.value))}
                      aria-label="Ilość"
                      className="px-2.5 py-2 rounded-lg border border-black/12 dark:border-white/15 bg-[#F7F8F6] dark:bg-[#0E130F] text-sm font-mono-tabular min-h-[40px]"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n} szt.
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      disabled={!selectedProduct.inStock}
                      onClick={() => {
                        handleQuickAdd(selectedProduct, modalQty);
                        setSelectedProduct(null);
                      }}
                      className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap shrink-0 min-h-[40px] ${
                        selectedProduct.inStock
                          ? 'bg-[#234F32] text-white hover:bg-[#1B3E27] dark:bg-[#58A874] dark:text-[#0B120D] cursor-pointer'
                          : 'bg-black/8 dark:bg-white/10 text-[#78857A] cursor-not-allowed'
                      }`}
                    >
                      {selectedProduct.inStock
                        ? 'Dodaj do koszyka'
                        : 'Chwilowo brak'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
