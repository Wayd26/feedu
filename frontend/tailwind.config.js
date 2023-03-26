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
      },
      colors: {
        primary: '#4C2719',
        secondary: '#F25F5C',
        tertiary: '#E59500',
      },
    },
  },
  plugins: [],
}
