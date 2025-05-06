/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';
module.exports = {
  content: ['./src/**/*.{vue,js,ts}', './public/index.html'],
  theme: {
    extend: {},
  },
  plugins: [PrimeUI],
}

