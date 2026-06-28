export type GalleryCategory =
  | 'all'
  | 'birthday'
  | 'wedding'
  | 'vintage'
  | 'kids'
  | 'cupcakes'
  | 'baby'
  | 'corporate';

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, 'all'>;
  image: string;
  width: number;
  height: number;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Ivory Elegance Wedding Cake',
    category: 'wedding',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80',
    width: 800, height: 1000,
  },
  {
    id: 'g2',
    title: 'Floral Garden Birthday',
    category: 'birthday',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80',
    width: 800, height: 900,
  },
  {
    id: 'g3',
    title: 'Vintage Rose Buttercream',
    category: 'vintage',
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80',
    width: 800, height: 900,
  },
  {
    id: 'g4',
    title: 'Gold Drip Celebration',
    category: 'birthday',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
    width: 800, height: 800,
  },
  {
    id: 'g5',
    title: 'Naked Wedding Cake',
    category: 'wedding',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    width: 800, height: 1000,
  },
  {
    id: 'g6',
    title: 'Classic Cupcakes',
    category: 'cupcakes',
    image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=800&q=80',
    width: 800, height: 750,
  },
  {
    id: 'g7',
    title: 'Salted Caramel Tiered',
    category: 'birthday',
    image: 'https://images.unsplash.com/photo-1606890658317-7d14490b76fd?w=800&q=80',
    width: 800, height: 900,
  },
  {
    id: 'g8',
    title: 'Lemon Drizzle Cake',
    category: 'birthday',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&q=80',
    width: 800, height: 800,
  },
  {
    id: 'g9',
    title: 'Baby Shower Pastel',
    category: 'baby',
    image: 'https://images.unsplash.com/photo-1617305855099-c7b9b5a0f2aa?w=800&q=80',
    width: 800, height: 900,
  },
  {
    id: 'g10',
    title: 'Kids Unicorn Cake',
    category: 'kids',
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80',
    width: 800, height: 850,
  },
  {
    id: 'g11',
    title: 'Elegant Vintage Ruffle',
    category: 'vintage',
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80',
    width: 800, height: 950,
  },
  {
    id: 'g12',
    title: 'Corporate Branded Cake',
    category: 'corporate',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80',
    width: 800, height: 900,
  },
];

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: 'all',       label: 'All' },
  { id: 'birthday',  label: 'Birthday' },
  { id: 'wedding',   label: 'Wedding' },
  { id: 'vintage',   label: 'Vintage' },
  { id: 'kids',      label: 'Kids' },
  { id: 'cupcakes',  label: 'Cupcakes' },
  { id: 'baby',      label: 'Baby Shower' },
  { id: 'corporate', label: 'Corporate' },
];

export const reviews = [
  {
    id: 'r1',
    quote: 'Exactly what I imagined. Actually, even better. Everyone at the party kept asking where we got the cake.',
    author: 'Sarah M.',
    occasion: 'Birthday Cake — June 2025',
    initials: 'S',
    featured: false,
  },
  {
    id: 'r2',
    quote: 'Even better than the reference photo. Robyn listened to every single detail and delivered something magical. Our guests couldn\'t believe it was real.',
    author: 'Thandeka & Lwazi',
    occasion: 'Wedding Cake — April 2025',
    initials: 'T',
    featured: true,
  },
  {
    id: 'r3',
    quote: 'Everyone asked where we got our cake. The design was flawless and the flavour was absolutely incredible.',
    author: 'Nomsa K.',
    occasion: 'Baby Shower Cake — May 2025',
    initials: 'N',
    featured: false,
  },
  {
    id: 'r4',
    quote: 'Robyn turned my vague Pinterest board into the most stunning three-tier wedding cake. She\'s an artist.',
    author: 'Lerato B.',
    occasion: 'Wedding Cake — March 2025',
    initials: 'L',
    featured: false,
  },
];
