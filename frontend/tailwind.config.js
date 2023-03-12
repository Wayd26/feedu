/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],

  theme: {
    extend: {
      fontFamily: {
        'primary': ['Rampart One', 'cursive'],
        'secondary': ['Monoton']
      }
    },
    colors: {
      primary: '#e72929',
      secondary: '#af1313',
      tertiary: '#ff4d4d',
    },
  },
  plugins: [],
}
