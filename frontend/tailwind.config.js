/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        alabaster: "#FAFAFA"
      },
      fontFamily: {
        bebas: ['Bebas Neue', 'sans-serif'], 
        mont: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

