/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#BD631C',
          dark: '#7D5232'
        },
        secondary: {
          light: '#326268',
          dark: '#3D3128'
        },
        success: '#417200',
        warning: "#f6be73",
        danger: "#7e0000",
      }
    },
  },
  plugins: [],
}

