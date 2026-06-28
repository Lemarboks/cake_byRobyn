import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { GalleryItem, GalleryCategory } from '../../data/gallery';
import { galleryCategories } from '../../data/gallery';

interface Props {
  items: GalleryItem[];
}

export default function GalleryLightbox({ items }: Props) {
  const [active, setActive]     = useState<GalleryCategory>('all');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const filtered = active === 'all' ? items : items.filter(i => i.category === active);

  const close = useCallback(() => setLightbox(null), []);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (!lightbox) return;
      const idx = filtered.findIndex(i => i.id === lightbox.id);
      const next = filtered[(idx + dir + filtered.length) % filtered.length];
      setLightbox(next ?? null);
    },
    [lightbox, filtered],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!lightbox) return;
      if (e.key === 'Escape')     close();
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft')  navigate(-1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, close, navigate]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center" role="group" aria-label="Filter gallery by category">
        {galleryCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            aria-pressed={active === cat.id}
            className={[
              'px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200',
              active === cat.id
                ? 'bg-gold text-white border-gold shadow-gold-sm'
                : 'border-cream-dark text-ink/70 hover:border-gold hover:text-gold bg-white/60',
            ].join(' ')}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map(item => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightbox(item)}
              className="group relative w-full block break-inside-avoid overflow-hidden rounded-lg cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={`View ${item.title}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-all duration-300 flex items-end p-3">
                <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow">
                  {item.title}
                </p>
              </div>
              <div className="absolute inset-0 border border-transparent group-hover:border-gold/60 rounded-lg transition-all duration-300 pointer-events-none" />
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={close}
            role="dialog"
            aria-label={lightbox.title}
            aria-modal="true"
          >
            {/* Image container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-3xl w-full"
            >
              <img
                src={lightbox.image.replace('?w=800', '?w=1200')}
                alt={lightbox.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <p className="text-center text-white/80 text-sm mt-3 font-serif">{lightbox.title}</p>
            </motion.div>

            {/* Close */}
            <button
              onClick={close}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Prev / Next */}
            {filtered.length > 1 && (
              <>
                <button
                  onClick={e => { e.stopPropagation(); navigate(-1); }}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </button>
                <button
                  onClick={e => { e.stopPropagation(); navigate(1); }}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
