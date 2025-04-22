/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'slate-850': '#1a2234',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.slate.700'),
            a: {
              color: theme('colors.orange.500'),
              '&:hover': {
                color: theme('colors.orange.600'),
              },
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.slate.200'),
            a: {
              color: theme('colors.orange.400'),
              '&:hover': {
                color: theme('colors.orange.500'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    function({ addBase, theme }) {
      addBase({
        'html': { fontSize: '16px' },
        'body': { 
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          lineHeight: '1.5',
          overflowX: 'hidden',
        },
        'h1, h2, h3, h4, h5, h6': {
          lineHeight: '1.2',
          fontWeight: '600',
        },
      });
    },
  ],
};