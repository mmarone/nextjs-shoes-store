/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      oswald: 'Oswald, sans-serif',
      urbanist: 'Urbanist, sans-serif',
      pacifico: 'Pacifico, sans-serif',
    },
    extend: {},
  },
  plugins: [],
}
