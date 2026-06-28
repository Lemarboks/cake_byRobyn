import { useStore } from '@nanostores/react';
import { cartItems, cartCount, cartOpen } from '../../stores/cart';

export default function CartIcon() {
  const items = useStore(cartItems);
  const count = cartCount(items);

  return (
    <button
      onClick={() => cartOpen.set(true)}
      aria-label={`Open cart — ${count} item${count !== 1 ? 's' : ''}`}
      className="relative p-2 text-ink hover:text-gold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
    >
      {/* Bag icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>

      {count > 0 && (
        <span
          key={count}
          className="absolute -top-1 -right-1 flex items-center justify-center w-[18px] h-[18px] rounded-full bg-gold text-white text-[10px] font-semibold leading-none animate-badge-pop"
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}
