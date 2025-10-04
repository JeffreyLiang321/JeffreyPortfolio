/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#E94B3C',
        'brand-peach': '#F2B28C'
      }
    },
  },
  plugins: [],
}
