/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      skh: "448px",
      ms: "514px",
      sm: "696px",
      md: "800px",
      ml: "1020px",
      lg: "1100px",
    },
    extend: {
      backgroundImage: {
        hero: "url('/Images/europe.svg')",
      },
    },
  },
};
