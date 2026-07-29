/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cig-paper': '#d6d0c6',
        'cig-text': '#3c342a',
      },
    },
  },
  plugins: [],
}
