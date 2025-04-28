/** @type {import('tailwindcss').Config} */
 
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        alabaster: "#FAFAFA", 
        primary: '#C42A1F', 
        secondary: '#212121', 
        accent: '#F1F1F1', 
        background: '#FAFAFA', 
        text: '#333333', 
        'button-primary': '#C42A1F',
        'button-hover': '#A61C14', 
        'bat-black': '#303030'
      },
      fontFamily: {
        bebas: ['Bebas Neue', 'sans-serif'], 
        mont: ['Montserrat', 'sans-serif'],
        funnel: ['Funnel Display', 'sans-serif']
      }
    },
  },
  plugins: [],
}

