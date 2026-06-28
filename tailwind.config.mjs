/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf8ee',
          100: '#f8edcf',
          200: '#f0d99d',
          300: '#e6c165',
          400: '#dbb040',
          DEFAULT: '#C9A24B',
          500: '#C9A24B',
          600: '#b8893a',
          700: '#9a6e2e',
          800: '#7e5928',
          dark: '#BFA15A',
          foil: '#E8D48B',
        },
        cream: {
          light: '#FAF6EF',
          DEFAULT: '#F7F1E8',
          dark:  '#EDE5D4',
          deeper: '#E4D9C3',
        },
        ink: '#1A1A1A',
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        serif:  ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:   ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A24B 0%, #E8D48B 45%, #C9A24B 100%)',
        'gold-shine':   'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.45) 50%, transparent 60%)',
      },
      keyframes: {
        'shine-sweep': {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'fade-rise': {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,162,75,0.55)' },
          '60%':      { boxShadow: '0 0 0 14px rgba(201,162,75,0)' },
        },
        'slide-in-right': {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'sparkle-pop': {
          '0%':   { opacity: '0', transform: 'scale(0) rotate(0deg)' },
          '55%':  { opacity: '1', transform: 'scale(1.2) rotate(180deg)' },
          '100%': { opacity: '0', transform: 'scale(0) rotate(360deg)' },
        },
        'badge-pop': {
          '0%':   { transform: 'scale(0)' },
          '70%':  { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'shine-sweep':    'shine-sweep 2.4s linear infinite',
        'fade-rise':      'fade-rise 0.65s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in':        'fade-in 0.5s ease forwards',
        'pulse-glow':     'pulse-glow 2.2s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.35s cubic-bezier(0.22,1,0.36,1) forwards',
        'sparkle-pop':    'sparkle-pop 0.55s ease-out forwards',
        'badge-pop':      'badge-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards',
      },
      boxShadow: {
        'gold-sm': '0 2px 10px rgba(201,162,75,0.18)',
        'gold-md': '0 4px 24px rgba(201,162,75,0.28)',
        'gold-lg': '0 8px 40px rgba(201,162,75,0.35)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
