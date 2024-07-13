/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#08953D',
          light: '#0AB349',
          dark: '#067730',
        },
      },
    },
  },
  plugins: [],
}