/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainDark: "#202020",
        secDark: "#424242",
        primBtn: "#1483EA",
        mainErr: "#EA2114",
        mainText: "#C5CDD6",
      },
    },
  },
  plugins: [],
};
