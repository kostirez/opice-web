/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      sm: '840px',
      md: '1260px',
    },
    fontFamily: {
      sans: ["podkova", "sans-serif"],
    },
    fontSize: {
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
        primary: {
          light: '#B85C00',
          dark: '#7C4D1A'
        },
        secondary: {
          light: '#86ADBB',
          dark: '#2B5460'
        },
        bg: {
          light: '#E1D7CF',
          dark: '#A69F99',
        },
        success: '#ffaf43',
        success2: '#ffcca1',
        warning: "#f6be73",
        danger: "#7e0000",
      },
    },
  },
  plugins: [],
}

