/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  // important: "#important",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
        sans: [...defaultTheme.fontFamily.sans],
        mono: ["Source Code Pro", ...defaultTheme.fontFamily.mono],
        serif: [...defaultTheme.fontFamily.serif],
      },
    },
    screens: {
      xs: "577px",
      sm: "769px",
      md: "993px",
      lg: "1201px",
      xl: "1401px",
      "2xl": "1601px",
    },
  },
  plugins: [],
};
