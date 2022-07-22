/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
    screens: {
      xs: "577px",
      sm: "769px",
      md: "993px",
      lg: "1201px",
      xl: "1401px",
      "2xl": "1801px",
    },
  },
  plugins: [],
};
