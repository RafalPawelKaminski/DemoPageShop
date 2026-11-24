import React, { useState } from 'react';
import { CheckCircle2, Minus, Plus, Trash2, X } from 'lucide-react';
import { CartItem, DensityMode } from '../types';
import { formatPln } from '../data/products';
import { ProductArtwork } from './ProductArtwork';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  density: DensityMode;
  onGoToContact: () => void;
}

const FREE_SHIPPING_THRESHOLD = 180;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  density,
  onGoToContact,
}) => {
  const [orderPlacedId, setOrderPlacedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingCost = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 16.0;
  const total = subtotal + shippingCost;
  const progressPct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleCheckout = () => {
    const code = `PS-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderPlacedId(code);
    onClearCart();
  };

  const handleClose = () => {
    setOrderPlacedId(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Koszyk zakupowy"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 dark:bg-black/65 backdrop-blur-[2px]"
        onClick={handleClose}
      />

      {/* Drawer Panel */}
      <aside className="relative z-10 w-full max-w-md h-full flex flex-col bg-white dark:bg-[#131814] text-[#141A15] dark:text-[#EDF2ED] border-l border-black/10 dark:border-white/10 shadow-2xl">
        <div
          className={`flex items-center justify-between border-b border-black/8 dark:border-white/10 ${
            density === 'high' ? 'px-4 py-3' : 'px-6 py-4'
          }`}
        >
          <div>
            <h2 className="font-display text-lg font-semibold">Twój koszyk</h2>
            <p className="text-xs text-[#525E54] dark:text-[#9CA89E]">
              Pakowanie chłodnicze bez plastiku
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Zamknij koszyk"
            className="p-2 rounded-lg text-[#525E54] dark:text-[#9CA89E] hover:bg-black/5 dark:hover:bg-white/8 hover:text-[#141A15] dark:hover:text-[#EDF2ED] transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div
          className={`flex-1 overflow-y-auto ${
            density === 'high' ? 'p-4 space-y-3' : 'p-6 space-y-5'
          }`}
        >
          {orderPlacedId ? (
            <div className="rounded-xl border border-[#234F32]/20 dark:border-[#58A874]/30 bg-[#F2F6F3] dark:bg-[#18231B] p-6 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  className="w-6 h-6 text-[#234F32] dark:text-[#58A874] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-base font-semibold">
                    Zamówienie {orderPlacedId} przyjęte
                  </h3>
                  <p className="text-sm text-[#525E54] dark:text-[#B5C3B7] mt-1 leading-relaxed">
                    Dziękujemy za skorzystanie z podglądu sklepu Polna Spiżarnia.
                    W razie pytań o dostawy hurtowe lub indywidualne zapraszamy na
                    podstronę kontaktu.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-medium rounded-lg bg-[#234F32] text-white dark:bg-[#58A874] dark:text-[#0B120D] cursor-pointer"
                >
                  Wróć do katalogu
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    onGoToContact();
                  }}
                  className="px-4 py-2 text-xs font-medium rounded-lg border border-black/12 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                >
                  Przejdź do kontaktu
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <p className="text-sm font-medium text-[#141A15] dark:text-[#EDF2ED]">
                Koszyk jest obecnie pusty
              </p>
              <p className="text-xs text-[#525E54] dark:text-[#9CA89E] max-w-xs mx-auto leading-relaxed">
                Dodaj świeże warzywa, miody lub mąki z katalogu, aby przetestować
                koszyk oraz próg darmowej dostawy.
              </p>
            </div>
          ) : (
            <>
              {/* Free shipping progress */}
              <div className="rounded-lg border border-black/8 dark:border-white/10 bg-[#F7F8F6] dark:bg-[#191F1A] p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#525E54] dark:text-[#A8B6AA]">
                    {remainingForFreeShipping > 0
                      ? `Brakuje ${formatPln(remainingForFreeShipping)} do darmowej dostawy`
                      : 'Darmowa dostawa chłodnicza odblokowana'}
                  </span>
                  <span className="font-mono-tabular font-medium">{progressPct}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-black/8 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-[#234F32] dark:bg-[#58A874] transition-transform duration-200 origin-left"
                    style={{ transform: `scaleX(${progressPct / 100})` }}
                  />
                </div>
              </div>

              {/* Cart Items */}
              <ul className="divide-y divide-black/8 dark:divide-white/10">
                {items.map(({ product, quantity }) => (
                  <li
                    key={product.id}
                    className={`flex items-center gap-3.5 ${
                      density === 'high' ? 'py-2.5' : 'py-4'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden border border-black/8 dark:border-white/10 shrink-0">
                      <ProductArtwork
                        illustrationKey={product.illustrationKey}
                        title={product.name}
                        compact
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs text-[#525E54] dark:text-[#9CA89E] font-mono-tabular">
                        {formatPln(product.price)} · {product.weight}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="inline-flex items-center rounded-md border border-black/12 dark:border-white/15">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, -1)}
                            aria-label={`Zmniejsz ilość: ${product.name}`}
                            className="p-1.5 hover:bg-black/5 dark:hover:bg-white/8 cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-mono-tabular">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, 1)}
                            aria-label={`Zwiększ ilość: ${product.name}`}
                            className="p-1.5 hover:bg-black/5 dark:hover:bg-white/8 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(product.id)}
                          aria-label={`Usuń z koszyka: ${product.name}`}
                          className="p-1.5 text-[#525E54] dark:text-[#9CA89E] hover:text-[#B53D32] dark:hover:text-[#EA7B70] cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-semibold font-mono-tabular">
                        {formatPln(product.price * quantity)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {items.length > 0 && !orderPlacedId && (
          <div
            className={`border-t border-black/8 dark:border-white/10 bg-[#F7F8F6] dark:bg-[#101511] space-y-3 ${
              density === 'high' ? 'p-4' : 'p-6'
            }`}
          >
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center justify-between text-[#525E54] dark:text-[#9CA89E]">
                <span>Wartość produktów</span>
                <span className="font-mono-tabular">{formatPln(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-[#525E54] dark:text-[#9CA89E]">
                <span>Dostawa chłodnicza</span>
                <span className="font-mono-tabular">
                  {shippingCost === 0 ? '0,00 zł' : formatPln(shippingCost)}
                </span>
              </div>
              <div className="flex items-center justify-between text-base font-semibold pt-2 border-t border-black/8 dark:border-white/10">
                <span>Razem</span>
                <span className="font-mono-tabular">{formatPln(total)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="w-full py-2.5 px-4 text-sm font-medium rounded-lg bg-[#234F32] text-white hover:bg-[#1B3E27] dark:bg-[#58A874] dark:text-[#0B120D] dark:hover:bg-[#6AB986] transition-colors cursor-pointer min-h-[44px]"
            >
              Złóż zamówienie (podgląd portfolio)
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
