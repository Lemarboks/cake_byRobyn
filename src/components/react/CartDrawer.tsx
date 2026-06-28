import { useStore } from '@nanostores/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  cartItems,
  cartOpen,
  cartTotal,
  removeFromCart,
  updateQuantity,
  buildWhatsAppMessage,
  clearCart,
} from '../../stores/cart';

const WA_NUMBER = import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '27000000000';

export default function CartDrawer() {
  const items  = useStore(cartItems);
  const isOpen = useStore(cartOpen);
  const total  = cartTotal(items);

  function handleWhatsApp() {
    const msg = buildWhatsAppMessage(items);
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener');
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40"
            onClick={() => cartOpen.set(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-cream-light shadow-2xl z-50 flex flex-col"
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-cream-dark">
              <h2 className="font-serif text-xl text-ink">Your Order</h2>
              <button
                onClick={() => cartOpen.set(false)}
                aria-label="Close cart"
                className="p-1.5 text-ink/60 hover:text-gold transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-4">
                  <div className="text-5xl opacity-30">🎂</div>
                  <p className="font-serif text-lg text-ink/60">Your order is empty</p>
                  <p className="text-sm text-ink/50">Browse the shop to add beautiful cakes.</p>
                  <button
                    onClick={() => cartOpen.set(false)}
                    className="mt-2 px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-white transition-colors rounded text-sm font-medium"
                  >
                    Browse Shop
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="flex gap-4 py-3 border-b border-cream-dark last:border-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded flex-shrink-0"
                          loading="lazy"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-ink font-medium text-sm leading-tight mb-0.5">{item.name}</p>
                          {item.size    && <p className="text-xs text-ink/55">Size: {item.size}</p>}
                          {item.flavour && <p className="text-xs text-ink/55">Flavour: {item.flavour}</p>}
                          {item.message && <p className="text-xs text-ink/55 italic truncate">"{item.message}"</p>}
                          <p className="text-xs font-semibold text-gold mt-1">
                            R{(item.price * item.quantity).toLocaleString('en-ZA')}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="text-ink/40 hover:text-red-400 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                            </svg>
                          </button>
                          <div className="flex items-center gap-1 border border-cream-dark rounded overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="w-6 h-6 flex items-center justify-center text-ink hover:bg-cream-dark transition-colors text-sm"
                            >−</button>
                            <span className="w-6 text-center text-xs font-medium text-ink">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="w-6 h-6 flex items-center justify-center text-ink hover:bg-cream-dark transition-colors text-sm"
                            >+</button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-cream-dark bg-cream space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-serif text-ink text-sm">Estimated Total</span>
                  <span className="font-serif text-lg font-semibold text-gold">
                    R{total.toLocaleString('en-ZA')}
                  </span>
                </div>
                <p className="text-xs text-ink/50 -mt-2">
                  Final price confirmed by Robyn after we review your order.
                </p>

                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white py-3.5 rounded font-semibold transition-colors text-sm"
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Order via WhatsApp
                </button>

                <button
                  onClick={clearCart}
                  className="w-full text-center text-xs text-ink/40 hover:text-red-400 transition-colors py-1"
                >
                  Clear order
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
