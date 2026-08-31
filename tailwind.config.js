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
        // Navbar accent palette
        violet: {
          600: '#7C3AED',
          500: '#8B5CF6',
          400: '#A78BFA',
          300: '#C4B5FD',
        },
        zinc: {
          950: '#09090B',
          900: '#18181B',
          800: '#27272A',
          700: '#3F3F46',
          600: '#52525B',
          200: '#E4E4E7',
          100: '#F4F4F5',
          50:  '#FAFAFA',
        },
      },
      backdropBlur: {
        xs: '2px',
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


