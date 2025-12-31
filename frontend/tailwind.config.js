/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FEEAC9',
        'pink-light': '#FFCDC9',
        'pink': '#FDACAC',
        'pink-dark': '#FD7979',
      },
    },
  },
  plugins: [],
}

