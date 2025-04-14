/** @type {import('tailwindcss').Config} */
 
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        alabaster: "#FAFAFA", 
        primary: '#C42A1F', // Subtle table tennis red
        secondary: '#212121', // Dark gray (for bat handles, subtle black)
        accent: '#F1F1F1', // Light gray (for contrast)
        background: '#FAFAFA', // Soft off-white background
        text: '#333333', // Darker gray for text
        'button-primary': '#C42A1F', // Primary button red
        'button-hover': '#A61C14', // Hover state for buttons
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

