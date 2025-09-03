/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Poppins', 'sans-serif'], // Definiši prilagođeni font
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          },
        },
        'bounce-slow': {
          '0%, 100%': {
            transform: 'translateY(-5%)'
          },
          '50%': {
            transform: 'translateY(0)'
          },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.8s ease-out forwards',
        'fade-in': 'fade-in 1s ease-out forwards',
        'bounce-slow': 'bounce-slow 3s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}