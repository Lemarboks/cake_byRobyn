import { atom } from 'nanostores';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  flavour?: string;
  message?: string;
  image: string;
}

export const cartItems = atom<CartItem[]>([]);
export const cartOpen  = atom<boolean>(false);

const STORAGE_KEY = 'cbr-cart';

function loadFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

if (typeof window !== 'undefined') {
  cartItems.set(loadFromStorage());
  cartItems.subscribe(items => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  });
}

function itemKey(productId: string, size?: string, flavour?: string) {
  return `${productId}|${size ?? ''}|${flavour ?? ''}`;
}

export function addToCart(item: Omit<CartItem, 'id'>): void {
  const key = itemKey(item.productId, item.size, item.flavour);
  const current = cartItems.get();
  const existing = current.find(i => i.id === key);
  if (existing) {
    cartItems.set(
      current.map(i =>
        i.id === key ? { ...i, quantity: i.quantity + item.quantity } : i,
      ),
    );
  } else {
    cartItems.set([...current, { ...item, id: key }]);
  }
}

export function removeFromCart(id: string): void {
  cartItems.set(cartItems.get().filter(i => i.id !== id));
}

export function updateQuantity(id: string, quantity: number): void {
  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }
  cartItems.set(
    cartItems.get().map(i => (i.id === id ? { ...i, quantity } : i)),
  );
}

export function clearCart(): void {
  cartItems.set([]);
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function buildWhatsAppMessage(items: CartItem[]): string {
  const lines: string[] = ['Hello! I would like to place an order:\n'];
  for (const item of items) {
    lines.push(`• *${item.name}* × ${item.quantity}`);
    if (item.size)    lines.push(`  Size: ${item.size}`);
    if (item.flavour) lines.push(`  Flavour: ${item.flavour}`);
    if (item.message) lines.push(`  Message on cake: "${item.message}"`);
    lines.push(`  Subtotal: R${(item.price * item.quantity).toLocaleString('en-ZA')}`);
    lines.push('');
  }
  const total = cartTotal(items);
  lines.push(`*ORDER TOTAL: R${total.toLocaleString('en-ZA')}*`);
  lines.push('\nPlease confirm availability and next steps. Thank you!');
  return lines.join('\n');
}
