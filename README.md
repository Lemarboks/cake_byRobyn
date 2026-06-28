# Cake by Robyn — Online Shop

> "Custom cakes made with love" — a full, production-ready Astro + Tailwind + React storefront for a boutique bespoke-cake bakery.

---

## Quick Start

```bash
# Install dependencies
npm install

# Copy env file and fill in your values
cp .env.example .env

# Start development server (http://localhost:4321)
npm run dev

# Production build → dist/
npm run build

# Preview the production build locally
npm run preview
```

---

## Where to Customise

### 1. WhatsApp Number & Instagram Handle
Edit `.env` (copy from `.env.example` first):

```env
PUBLIC_WHATSAPP_NUMBER=27821234567     # e.g. +27 82 123 4567 → 27821234567
PUBLIC_INSTAGRAM_HANDLE=cake_byrobyn
SITE_URL=https://cakebyrobyn.co.za
```

These values flow automatically into:
- The floating WhatsApp button
- The "Order via WhatsApp" checkout in the cart
- The enquiry form's "Send via WhatsApp" button
- The contact page
- All footer social links

### 2. Products, Prices & Descriptions
Edit `src/data/products.ts`.

Each product has this shape:
```ts
{
  id: 'gold-drip',                  // unique, never changes (used as cart key)
  slug: 'gold-drip-celebration-cake', // URL: /shop/<slug>
  name: 'Gold Drip Celebration Cake',
  tagline: 'Bold, luxurious, unforgettable',
  description: '...',
  price: 950,                       // number in ZAR (shown as R950)
  priceLabel: 'From R950',          // display string (can say "From", "POA", etc.)
  category: 'celebration',          // 'celebration' | 'cupcakes' | 'wedding' | 'treats'
  image: '...',                     // main image URL
  images: ['...', '...'],           // gallery images on the detail page
  options: [
    { name: 'Size', values: ['6-inch', '8-inch'] },
    { name: 'Flavour', values: [...] },
    { name: 'Message on Cake', values: ['(type your message)'] },
  ],
  servings: '10–25 servings',
  featured: true,                   // shows on home page carousel (max 4 recommended)
  badge: 'Bestseller',              // optional label chip
}
```

### 3. Real Cake Photos
Replace the Unsplash placeholder URLs in `src/data/products.ts` and `src/data/gallery.ts`
with your own image URLs or local paths.

For local files, put images in `public/images/` and reference them as `/images/my-cake.jpg`.

### 4. Brand Assets
Place the following in `public/brand/`:

| File | Used in |
|------|---------|
| `logo.png` | Navbar, footer, favicon, OG image fallback |
| `logo-flat.png` | Cream-background sections (no badge circle) |
| `hero-1.jpg` | Home page hero background |
| `hero-2.jpg` | Optional — secondary hero or future carousel |

The hero image should have open negative space on the **left** side — the headline text is placed there.

### 5. Gallery
Edit `src/data/gallery.ts` — add or replace `galleryItems` with your real portfolio shots.
Each item has `id`, `title`, `category`, `image`, `width`, `height`.

Categories: `birthday` | `wedding` | `vintage` | `kids` | `cupcakes` | `baby` | `corporate`

### 6. Reviews
Edit the `reviews` array in `src/data/gallery.ts`. Set `featured: true` on the one
you want displayed in the golden/highlighted card.

### 7. Site URL (SEO)
Update `SITE_URL` in `.env` and `site` in `astro.config.mjs` to match your deployed domain.
The sitemap and Open Graph canonical URLs are derived from this.

### 8. Contact Email
In `src/pages/contact.astro`, replace `hello@cakebyrobyn.co.za` with the real address.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro 5](https://astro.build) — static output, islands architecture |
| Styling | [Tailwind CSS 3](https://tailwindcss.com) + custom gold/cream design tokens |
| Interactive islands | [React 19](https://react.dev) + [Framer Motion](https://www.framer.com/motion/) |
| Shared state (cart) | [Nanostores](https://github.com/nanostores/nanostores) with localStorage persistence |
| Fonts | Google Fonts — Cormorant Garamond (serif) · Great Vibes (script) · Inter (sans) |
| SEO | Per-page meta, Open Graph, Twitter Card, JSON-LD LocalBusiness, sitemap, robots.txt |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, featured cakes, why us, process, reviews, Instagram teaser |
| `/shop` | Product grid with category filter |
| `/shop/[slug]` | Product detail — options, add to cart, WhatsApp enquiry |
| `/gallery` | Filterable masonry gallery with lightbox |
| `/enquiry` | Custom cake bespoke order form (pre-fills WhatsApp message) |
| `/about` | About Robyn — story, philosophy, values |
| `/contact` | Contact info + quick WhatsApp message composer |

---

## Cart & Ordering Flow

1. Customer browses `/shop` → clicks a product → selects size / flavour / message
2. Clicks **Add to Order** → cart drawer slides open
3. Cart drawer shows items, quantities, estimated total
4. Clicking **Order via WhatsApp** opens `wa.me/<number>?text=...` with a fully
   pre-formatted message listing every item, its options, and the total
5. Robyn receives the WhatsApp message and confirms with a quote + deposit request

**To add card-payment checkout later:**
- Replace the "Order via WhatsApp" button in `src/components/react/CartDrawer.tsx`
  with a call to your payment provider (Peach Payments, Yoco, Stripe, etc.)
- The cart data (`CartItem[]`) is already structured for this — just pass it to your
  payment API instead of a WhatsApp link
- No other changes needed

---

## What You Still Need to Supply

| Item | Where |
|------|-------|
| Real WhatsApp number | `.env` → `PUBLIC_WHATSAPP_NUMBER` |
| Instagram handle (if different) | `.env` → `PUBLIC_INSTAGRAM_HANDLE` |
| Brand images (`logo.png`, `logo-flat.png`, `hero-1.jpg`) | `public/brand/` |
| Real cake photos for every product | `src/data/products.ts` (image / images fields) |
| Real portfolio shots for the gallery | `src/data/gallery.ts` |
| Real prices | `src/data/products.ts` (price / priceLabel fields) |
| Contact email address | `src/pages/contact.astro` |
| Deployed domain | `.env` → `SITE_URL` + `astro.config.mjs` → `site` |

---

## Judgment Calls Made

- **WhatsApp as primary checkout** — cart opens `wa.me/` with a pre-filled message.
  No Stripe/PayFast integration yet; clean seam to add it later in `CartDrawer.tsx`.
- **Unsplash placeholder images** — all product and gallery images link to free
  Unsplash photos. Replace with your own before going live.
- **ZAR pricing (R)** — prices are stored as plain numbers (e.g. `950`) and formatted
  as `R950` or `From R950` in the UI. Change the currency symbol in `cart.ts`
  (`toLocaleString('en-ZA')`) if needed.
- **No server / CMS** — fully static output (`astro build`). Products live in
  `src/data/products.ts`. Add a headless CMS (Sanity, Contentful) later if needed.
- **Cart items persist to `localStorage`** — cart survives page reloads; clears on
  "Clear order" or when the customer places an order.
- **Gallery lightbox** — keyboard-navigable (←/→ arrows, Escape to close), ARIA-labelled.
- **Reduced-motion** — all CSS animations are suppressed for users with the
  `prefers-reduced-motion: reduce` system preference.
