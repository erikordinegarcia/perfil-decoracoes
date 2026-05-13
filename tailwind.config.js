/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        blush: '#F7EFEE',
        nude: '#F2E4E2',
        rose: '#D7A8A4',
        mauve: '#B98580',
        champagne: '#FFF9F8'
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Manrope"', 'sans-serif']
      },
      boxShadow: {
        soft: '0 20px 45px rgba(146, 96, 93, 0.12)'
      }
    }
  },
  plugins: []
};
