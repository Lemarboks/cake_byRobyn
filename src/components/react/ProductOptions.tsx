import { useState } from 'react';
import AddToCartButton from './AddToCartButton';
import type { Product } from '../../data/products';

interface Props {
  product: Product;
}

export default function ProductOptions({ product }: Props) {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [message, setMessage]       = useState('');

  function set(name: string, value: string) {
    setSelections(prev => ({ ...prev, [name]: value }));
  }

  const messageName = product.options.find(o => o.name === 'Message on Cake')?.name;
  const otherOptions = product.options.filter(o => o.name !== 'Message on Cake');

  return (
    <div className="space-y-5">
      {otherOptions.map(opt => (
        <div key={opt.name}>
          <label className="block text-xs font-semibold uppercase tracking-widest text-ink/60 mb-2">
            {opt.name}
          </label>
          <div className="flex flex-wrap gap-2">
            {opt.values.map(val => (
              <button
                key={val}
                type="button"
                onClick={() => set(opt.name, val)}
                className={[
                  'px-4 py-2 rounded border text-sm transition-all duration-200',
                  selections[opt.name] === val
                    ? 'border-gold bg-gold/10 text-gold font-medium'
                    : 'border-cream-dark text-ink/70 hover:border-gold/60',
                ].join(' ')}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      ))}

      {messageName && (
        <div>
          <label
            htmlFor="cake-message"
            className="block text-xs font-semibold uppercase tracking-widest text-ink/60 mb-2"
          >
            Message on Cake <span className="normal-case font-normal text-ink/40">(optional)</span>
          </label>
          <input
            id="cake-message"
            type="text"
            maxLength={60}
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="e.g. Happy 30th, Amara!"
            className="w-full border border-cream-dark rounded px-4 py-2.5 text-sm text-ink bg-cream focus:outline-none focus:border-gold transition-colors"
          />
          <p className="text-xs text-ink/40 mt-1 text-right">{message.length}/60</p>
        </div>
      )}

      <AddToCartButton
        productId={product.id}
        name={product.name}
        price={product.price}
        image={product.image}
        size={selections['Size'] ?? selections['Tiers'] ?? selections['Quantity']}
        flavour={selections['Flavour']}
        message={message || undefined}
        className="w-full mt-2"
        label="Add to Order"
      />
    </div>
  );
}
