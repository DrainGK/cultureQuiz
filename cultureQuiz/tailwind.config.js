/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "pirata": ['Pirata One', 'sytem-ui'],
        "raleway": ['Raleway', 'serif']
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}

