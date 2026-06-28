import { useState, useRef } from 'react';
import { addToCart, cartOpen } from '../../stores/cart';

interface Props {
  productId: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  flavour?: string;
  message?: string;
  className?: string;
  label?: string;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

export default function AddToCartButton({
  productId,
  name,
  price,
  image,
  size,
  flavour,
  message,
  className = '',
  label = 'Add to Order',
}: Props) {
  const [added, setAdded]       = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const nextId = useRef(0);

  function handleAdd() {
    addToCart({ productId, name, price, image, quantity: 1, size, flavour, message });
    cartOpen.set(true);

    // Sparkle burst
    const burst: Sparkle[] = Array.from({ length: 6 }, (_, i) => ({
      id: nextId.current++,
      x: Math.random() * 80 - 40,
      y: Math.random() * -60 - 10,
    }));
    setSparkles(prev => [...prev, ...burst]);
    setTimeout(() => setSparkles([]), 700);

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button
      onClick={handleAdd}
      aria-live="polite"
      aria-label={added ? 'Added to order!' : label}
      className={[
        'relative overflow-visible flex items-center justify-center gap-2',
        'px-8 py-3.5 rounded font-semibold text-sm transition-all duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2',
        added
          ? 'bg-green-600 text-white scale-[0.97]'
          : 'bg-gold text-white hover:bg-gold-600 active:scale-[0.97] shadow-gold-sm hover:shadow-gold-md',
        className,
      ].join(' ')}
    >
      {/* Sparkles */}
      {sparkles.map(s => (
        <span
          key={s.id}
          aria-hidden="true"
          className="pointer-events-none absolute animate-sparkle-pop"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(calc(-50% + ${s.x}px), calc(-50% + ${s.y}px))`,
            fontSize: '14px',
            zIndex: 10,
          }}
        >
          ✦
        </span>
      ))}

      {added ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Added!
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {label}
        </>
      )}
    </button>
  );
}
