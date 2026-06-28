import { useState, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  cartItems,
  cartOpen,
  cartTotal,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../../stores/cart';

const MERCHANT_ID  = import.meta.env.PUBLIC_PAYFAST_MERCHANT_ID  ?? '10000100';
const MERCHANT_KEY = import.meta.env.PUBLIC_PAYFAST_MERCHANT_KEY ?? '46f0cd694581a';
const SANDBOX      = import.meta.env.PUBLIC_PAYFAST_SANDBOX === 'true';
const SITE_URL     = import.meta.env.SITE_URL ?? 'https://lemarboks.github.io/cake_byRobyn';
const BASE         = import.meta.env.BASE_URL ?? '/cake_byRobyn/';

const PAYFAST_URL  = SANDBOX
  ? 'https://sandbox.payfast.co.za/eng/process'
  : 'https://www.payfast.co.za/eng/process';

type Step = 'cart' | 'details';

interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

function buildOrderDescription(items: ReturnType<typeof cartItems.get>): string {
  return items
    .map(i => {
      const parts = [`${i.name} ×${i.quantity}`];
      if (i.size)    parts.push(`(${i.size})`);
      if (i.flavour) parts.push(`| ${i.flavour}`);
      if (i.message) parts.push(`| msg: "${i.message}"`);
      return parts.join(' ');
    })
    .join('; ');
}

function submitPayFast(items: ReturnType<typeof cartItems.get>, customer: CustomerDetails) {
  const total       = cartTotal(items);
  const description = buildOrderDescription(items);

  const fields: Record<string, string> = {
    merchant_id:   MERCHANT_ID,
    merchant_key:  MERCHANT_KEY,
    return_url:    `${SITE_URL.replace(/\/$/, '')}${BASE}order-success`,
    cancel_url:    `${SITE_URL.replace(/\/$/, '')}${BASE}order-cancel`,
    name_first:    customer.firstName,
    name_last:     customer.lastName,
    email_address: customer.email,
    cell_number:   customer.phone.replace(/\D/g, ''),
    amount:        total.toFixed(2),
    item_name:     'Cake by Robyn — Online Order',
    item_description: description.slice(0, 255),
    custom_str1:   JSON.stringify(items.map(i => ({ n: i.name, q: i.quantity, p: i.price }))),
  };

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = PAYFAST_URL;

  Object.entries(fields).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type  = 'hidden';
    input.name  = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}

export default function CartDrawer() {
  const items  = useStore(cartItems);
  const isOpen = useStore(cartOpen);
  const total  = cartTotal(items);

  const [step, setStep]       = useState<Step>('cart');
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<CustomerDetails>({
    firstName: '', lastName: '', email: '', phone: '',
  });
  const [errors, setErrors]   = useState<Partial<CustomerDetails>>({});
  const firstRef              = useRef<HTMLInputElement>(null);

  function handleClose() {
    cartOpen.set(false);
    setStep('cart');
  }

  function handleProceed() {
    setStep('details');
    setTimeout(() => firstRef.current?.focus(), 50);
  }

  function validate(): boolean {
    const e: Partial<CustomerDetails> = {};
    if (!details.firstName.trim()) e.firstName = 'Required';
    if (!details.lastName.trim())  e.lastName  = 'Required';
    if (!details.email.trim() || !details.email.includes('@')) e.email = 'Valid email required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handlePay() {
    if (!validate()) return;
    setLoading(true);
    clearCart();
    submitPayFast(items, details);
  }

  function set(field: keyof CustomerDetails, value: string) {
    setDetails(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
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
            onClick={handleClose}
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
              <div className="flex items-center gap-3">
                {step === 'details' && (
                  <button
                    onClick={() => setStep('cart')}
                    aria-label="Back to cart"
                    className="p-1 text-ink/50 hover:text-gold transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>
                )}
                <h2 className="font-serif text-xl text-ink">
                  {step === 'cart' ? 'Your Order' : 'Your Details'}
                </h2>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close cart"
                className="p-1.5 text-ink/60 hover:text-gold transition-colors rounded"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* ── STEP 1: CART ── */}
            {step === 'cart' && (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-4">
                      <div className="text-5xl opacity-30">🎂</div>
                      <p className="font-serif text-lg text-ink/60">Your order is empty</p>
                      <p className="text-sm text-ink/50">Browse the shop to add beautiful cakes.</p>
                      <button
                        onClick={handleClose}
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
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <div className="flex gap-4 py-3 border-b border-cream-dark last:border-0">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded flex-shrink-0" loading="lazy"/>
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
                              <button onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`} className="text-ink/40 hover:text-red-400 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                              </button>
                              <div className="flex items-center gap-1 border border-cream-dark rounded overflow-hidden">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease" className="w-6 h-6 flex items-center justify-center text-ink hover:bg-cream-dark transition-colors text-sm">−</button>
                                <span className="w-6 text-center text-xs font-medium text-ink">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase" className="w-6 h-6 flex items-center justify-center text-ink hover:bg-cream-dark transition-colors text-sm">+</button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>

                {items.length > 0 && (
                  <div className="px-6 py-5 border-t border-cream-dark bg-cream space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-serif text-ink text-sm">Order Total</span>
                      <span className="font-serif text-lg font-semibold text-gold">R{total.toLocaleString('en-ZA')}</span>
                    </div>
                    {SANDBOX && (
                      <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded px-3 py-2 text-center">
                        ⚠ PayFast sandbox — no real money charged
                      </p>
                    )}
                    <button
                      onClick={handleProceed}
                      className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-600 text-white py-3.5 rounded font-semibold transition-colors text-sm shadow-gold-sm hover:shadow-gold-md"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                      Pay Now — R{total.toLocaleString('en-ZA')}
                    </button>
                    <button onClick={clearCart} className="w-full text-center text-xs text-ink/40 hover:text-red-400 transition-colors py-1">
                      Clear order
                    </button>
                  </div>
                )}
              </>
            )}

            {/* ── STEP 2: CUSTOMER DETAILS ── */}
            {step === 'details' && (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <p className="text-sm text-ink/60 mb-6 leading-relaxed">
                    Enter your details below. You'll be redirected to PayFast's secure payment page to complete your order.
                  </p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="pf-first" className="block text-xs font-semibold uppercase tracking-widest text-ink/60 mb-1.5">
                          First Name <span className="text-red-400" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="pf-first"
                          ref={firstRef}
                          type="text"
                          value={details.firstName}
                          onChange={e => set('firstName', e.target.value)}
                          autoComplete="given-name"
                          className={`form-input ${errors.firstName ? 'border-red-400' : ''}`}
                          placeholder="Jane"
                        />
                        {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label htmlFor="pf-last" className="block text-xs font-semibold uppercase tracking-widest text-ink/60 mb-1.5">
                          Last Name <span className="text-red-400" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="pf-last"
                          type="text"
                          value={details.lastName}
                          onChange={e => set('lastName', e.target.value)}
                          autoComplete="family-name"
                          className={`form-input ${errors.lastName ? 'border-red-400' : ''}`}
                          placeholder="Smith"
                        />
                        {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="pf-email" className="block text-xs font-semibold uppercase tracking-widest text-ink/60 mb-1.5">
                        Email <span className="text-red-400" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="pf-email"
                        type="email"
                        value={details.email}
                        onChange={e => set('email', e.target.value)}
                        autoComplete="email"
                        className={`form-input ${errors.email ? 'border-red-400' : ''}`}
                        placeholder="jane@email.com"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="pf-phone" className="block text-xs font-semibold uppercase tracking-widest text-ink/60 mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        id="pf-phone"
                        type="tel"
                        value={details.phone}
                        onChange={e => set('phone', e.target.value)}
                        autoComplete="tel"
                        className="form-input"
                        placeholder="+27 82 000 0000"
                      />
                    </div>

                    {/* Order summary */}
                    <div className="bg-cream rounded-xl p-4 border border-cream-dark mt-2">
                      <p className="text-xs font-semibold uppercase tracking-widest text-ink/50 mb-2">Order Summary</p>
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between text-xs text-ink/70 py-0.5">
                          <span>{item.name} × {item.quantity}</span>
                          <span>R{(item.price * item.quantity).toLocaleString('en-ZA')}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-semibold text-sm text-ink border-t border-cream-dark mt-2 pt-2">
                        <span>Total</span>
                        <span className="text-gold">R{total.toLocaleString('en-ZA')}</span>
                      </div>
                    </div>

                    <p className="text-xs text-ink/40 text-center leading-relaxed">
                      You'll be redirected to PayFast's secure checkout. Card, EFT, and SnapScan accepted. Robyn will confirm your order and delivery details after payment.
                    </p>
                  </div>
                </div>

                <div className="px-6 py-5 border-t border-cream-dark bg-cream space-y-3">
                  <button
                    onClick={handlePay}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-600 disabled:opacity-60 text-white py-3.5 rounded font-semibold transition-colors text-sm shadow-gold-sm"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                        Redirecting to PayFast…
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                        Pay R{total.toLocaleString('en-ZA')} securely
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-center gap-2 text-xs text-ink/40">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Secured by PayFast · Card · EFT · SnapScan
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
