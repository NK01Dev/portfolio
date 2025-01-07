/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#1E90FF',
        customRed: '#FF4500',
      },
      keyframes: {
        zoomIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        zoomIn: 'zoomIn 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}

