/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    container: {
      padding: '2rem',
      center: true
    },
    extend: {
      colors: {
        'fire-yellow': '#FFBA0A',
        'water-blue': '#5451FF',
        'earth-green': '#37683C',
        'orange': '#DEAC87',
        'dark-orange': '#1E1616'
      },
      minWidth: {
        '128': '32rem'
      }
    }
  },
  plugins: []
}
