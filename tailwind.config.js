/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/apps/firebook/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'firebase-orange': '#FF9800',
        'firebase-yellow': '#FFC107',
        'firebase-amber': '#FFAB00',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'spin-slow': 'spin 1.5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
