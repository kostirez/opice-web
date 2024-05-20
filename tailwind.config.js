/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      sm: '380px',
      md: '780px',
      lg: '1120px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ["podkova", "sans-serif"],
    },
    fontSize: {
      'xs': '0.5rem',
      'sm': '0.75rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': ['3rem', '4rem'],
      '5xl': ['4.5rem', '6rem'],
      '6xl': ['6rem', '8rem'],
    },

    extend: {
      colors: {
        primary: '#B85C00',
        secondary: '#7C4D1A',
        bg: {
          light: '#E1D7CF',
          dark: '#A69F99',
        },
        success: '#ffaf43',
        success2: '#ffcca1',
        warning: "#f6be73",
        warning2: "#fdd7a5",
        danger: "#a60303",
      },
    },
  },
  plugins: [],
}

