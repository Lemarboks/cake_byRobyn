export type Category = 'celebration' | 'cupcakes' | 'wedding' | 'treats';

export interface ProductOption {
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  priceLabel: string;
  category: Category;
  image: string;
  images: string[];
  options: ProductOption[];
  servings: string;
  featured?: boolean;
  badge?: string;
}

export const FLAVOURS = [
  'Classic Vanilla',
  'Rich Chocolate',
  'Red Velvet',
  'Lemon Drizzle',
  'Strawberry',
  'Salted Caramel',
  'Other (specify in order notes)',
];

const CAKE_FLAVOURS: ProductOption = { name: 'Flavour', values: FLAVOURS };
const MESSAGE_OPTION: ProductOption = { name: 'Message on Cake', values: ['(type your message)'] };

export const products: Product[] = [
  // ── CELEBRATION CAKES ────────────────────────────────────────────
  {
    id: 'ivory-elegance',
    slug: 'ivory-elegance-wedding-cake',
    name: 'Ivory Elegance Wedding Cake',
    tagline: 'Three tiers of pure romance',
    description:
      'A breathtaking three-tier masterpiece finished in smooth ivory fondant with hand-applied gold leaf details and cascading sugar roses. The centrepiece your wedding deserves.',
    price: 3500,
    priceLabel: 'From R3,500',
    category: 'wedding',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1200&q=85',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&q=85',
    ],
    options: [
      { name: 'Tiers', values: ['2-tier', '3-tier', '4-tier'] },
      CAKE_FLAVOURS,
      MESSAGE_OPTION,
    ],
    servings: '80–160 servings',
    featured: true,
    badge: 'Signature',
  },
  {
    id: 'gold-drip',
    slug: 'gold-drip-celebration-cake',
    name: 'Gold Drip Celebration Cake',
    tagline: 'Bold, luxurious, unforgettable',
    description:
      'Rich Belgian chocolate cake crowned with a dramatic gold drip, edible gold leaf, and hand-piped buttercream florals. A showstopper for any milestone.',
    price: 950,
    priceLabel: 'From R950',
    category: 'celebration',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200&q=85',
    ],
    options: [
      { name: 'Size', values: ['6-inch (10–15)', '8-inch (20–25)', '10-inch (30–40)'] },
      CAKE_FLAVOURS,
      MESSAGE_OPTION,
    ],
    servings: '10–40 servings',
    featured: true,
    badge: 'Bestseller',
  },
  {
    id: 'floral-garden',
    slug: 'floral-garden-birthday-cake',
    name: 'Floral Garden Birthday Cake',
    tagline: 'A garden of sugar blooms',
    description:
      'Delicate hand-crafted sugar flowers cascade over a smooth buttercream canvas. Choose your colour palette to perfectly match your celebration theme.',
    price: 650,
    priceLabel: 'From R650',
    category: 'celebration',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1200&q=85',
    ],
    options: [
      { name: 'Size', values: ['6-inch (10–15)', '8-inch (20–25)'] },
      { name: 'Colour Palette', values: ['Blush & Ivory', 'Dusty Rose & Gold', 'Sage & Cream', 'Custom'] },
      CAKE_FLAVOURS,
      MESSAGE_OPTION,
    ],
    servings: '10–25 servings',
    featured: true,
  },
  {
    id: 'vintage-rose',
    slug: 'vintage-rose-buttercream',
    name: 'Vintage Rose Buttercream',
    tagline: 'Timeless elegance in every petal',
    description:
      'Hand-piped vintage rose swirls in luxurious Swiss meringue buttercream, with a delicate pearl finish. Nostalgic charm meets refined craftsmanship.',
    price: 850,
    priceLabel: 'From R850',
    category: 'celebration',
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=1200&q=85',
    ],
    options: [
      { name: 'Size', values: ['6-inch (10–15)', '8-inch (20–25)'] },
      CAKE_FLAVOURS,
      MESSAGE_OPTION,
    ],
    servings: '10–25 servings',
    featured: true,
  },
  {
    id: 'salted-caramel-tiered',
    slug: 'salted-caramel-tiered-cake',
    name: 'Salted Caramel Tiered Cake',
    tagline: 'Sweet, salty, and utterly indulgent',
    description:
      'Two elegant tiers filled with house-made salted caramel, frosted in velvety caramel buttercream and finished with drizzled toffee and gold flakes.',
    price: 1800,
    priceLabel: 'From R1,800',
    category: 'celebration',
    image: 'https://images.unsplash.com/photo-1606890658317-7d14490b76fd?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1606890658317-7d14490b76fd?w=1200&q=85',
    ],
    options: [
      { name: 'Tiers', values: ['2-tier', '3-tier'] },
      CAKE_FLAVOURS,
      MESSAGE_OPTION,
    ],
    servings: '30–60 servings',
  },
  {
    id: 'lemon-drizzle',
    slug: 'lemon-drizzle-celebration',
    name: 'Lemon Drizzle Celebration',
    tagline: 'Bright, zesty, and beautifully fresh',
    description:
      'Light and airy lemon sponge soaked in a tangy citrus drizzle, layered with lemon curd and frosted in a cream-white Swiss meringue. Sophisticated simplicity.',
    price: 650,
    priceLabel: 'From R650',
    category: 'celebration',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=1200&q=85',
    ],
    options: [
      { name: 'Size', values: ['6-inch (10–15)', '8-inch (20–25)'] },
      MESSAGE_OPTION,
    ],
    servings: '10–25 servings',
  },

  // ── CUPCAKES ─────────────────────────────────────────────────────
  {
    id: 'classic-cupcakes',
    slug: 'classic-cupcakes',
    name: 'Classic Cupcakes',
    tagline: 'Little cakes, big love',
    description:
      'Moist, fluffy cupcakes crowned with a generous swirl of silky buttercream. Available in your choice of flavour and topped with edible decorations to match your theme.',
    price: 180,
    priceLabel: 'From R180 / dozen',
    category: 'cupcakes',
    image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=1200&q=85',
    ],
    options: [
      { name: 'Quantity', values: ['6 cupcakes', '12 cupcakes', '24 cupcakes'] },
      CAKE_FLAVOURS,
    ],
    servings: '6 / 12 / 24 pieces',
  },
  {
    id: 'gold-foil-cupcakes',
    slug: 'gold-foil-cupcakes',
    name: 'Gold Foil Cupcakes',
    tagline: 'Edible gold, edible luxury',
    description:
      'Premium cupcakes draped in edible gold foil with intricate piped rosettes and gilded sugar pearls. A truly luxurious addition to any celebration table.',
    price: 220,
    priceLabel: 'From R220 / dozen',
    category: 'cupcakes',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200&q=85',
    ],
    options: [
      { name: 'Quantity', values: ['6 cupcakes', '12 cupcakes', '24 cupcakes'] },
      CAKE_FLAVOURS,
    ],
    servings: '6 / 12 / 24 pieces',
    badge: 'Premium',
  },

  // ── WEDDING / CUSTOM ──────────────────────────────────────────────
  {
    id: 'naked-wedding',
    slug: 'naked-wedding-cake',
    name: 'Naked Wedding Cake',
    tagline: 'Rustic romance, refined',
    description:
      'A semi-naked, artisan-finished wedding cake adorned with fresh seasonal florals and greenery. Natural beauty for the effortlessly elegant wedding.',
    price: 2800,
    priceLabel: 'From R2,800',
    category: 'wedding',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&q=85',
      'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1200&q=85',
    ],
    options: [
      { name: 'Tiers', values: ['2-tier', '3-tier'] },
      CAKE_FLAVOURS,
      MESSAGE_OPTION,
    ],
    servings: '60–120 servings',
  },

  // ── TREATS ────────────────────────────────────────────────────────
  {
    id: 'bento-cake',
    slug: 'bento-cake',
    name: 'Bento Cake',
    tagline: 'Big joy in a small package',
    description:
      'A perfectly portioned single-serve bento cake, beautifully decorated and ready to gift. Perfect for birthdays, anniversaries, or a little "just because" moment.',
    price: 250,
    priceLabel: 'R250',
    category: 'treats',
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=1200&q=85',
    ],
    options: [
      CAKE_FLAVOURS,
      MESSAGE_OPTION,
    ],
    servings: '1–2 servings',
  },
  {
    id: 'cake-pops',
    slug: 'cake-pops',
    name: 'Cake Pops',
    tagline: 'Sweet bites on a stick',
    description:
      'Moist cake crumbles blended with buttercream, coated in premium chocolate and decorated with edible gold or custom designs. Party-perfect and utterly delicious.',
    price: 300,
    priceLabel: 'From R300 / dozen',
    category: 'treats',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1200&q=85',
    ],
    options: [
      { name: 'Quantity', values: ['6 pops', '12 pops', '24 pops'] },
      CAKE_FLAVOURS,
    ],
    servings: '6 / 12 / 24 pieces',
  },
];

export const categories: { id: string; label: string }[] = [
  { id: 'all',         label: 'All' },
  { id: 'celebration', label: 'Celebration Cakes' },
  { id: 'cupcakes',   label: 'Cupcakes' },
  { id: 'wedding',    label: 'Wedding / Custom' },
  { id: 'treats',     label: 'Treats' },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}
