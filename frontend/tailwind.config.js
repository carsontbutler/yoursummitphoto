/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      keyframes: {
        grow: {
          "0%": { transform: "scale(1.5)" },
          "100%": { transform: "scale(1)" },
        },
        growGalleryModal: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "0%": { transform: "scale(1)", opacity: "0" },
          "70%": { transform: "scale(1.2)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1"},
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1"},
        },
      },
      animation: {
        grow: "grow 0.5s ease-in-out",
        growImage: "grow 10s ease-in-out",
        fadeIn1: "fadeIn 1s ease-in-out",
        fadeIn: "fadeIn 2.5s ease-in",
        fadeIn5: "fadeIn 5s ease-in",
        fadeIn7: "fadeIn 7s ease-in",
        growGalleryModal: "growGalleryModal .4s ease-in"
      },
    },
    colors: {
      blue0: "#03045e",
      blue1: "#023e8a",
      blue2: "#0077b6",
      blue3: "#0096c7",
      blue4: "#00b4d8",
      blue5: "#48cae4",
      blue6: "#90e0ef",
      blue7: "#ade8f4",
      blue8: "#caf0f8",
      orange0: "#866500",
      orange1: "#D28200",
      orange2: "#D28200",
      orange5: "#FFA34C",
      gray: "#242628",
      black: "#000000",
      white: "#FFF",
      red: "#E34234",
    },
    backgroundImage: {
      mountain:
        "linear-gradient(to bottom, rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url('./mtn-blue.jpg')",
      mountainDark:
        "linear-gradient(to bottom, rgba(10, 10, 10, .8), rgba(0, 0, 0, .8)), url('./mtn-blue.jpg')",
      navBar:
        "linear-gradient(to bottom, rgba(0, 119, 182, .5), rgba(0, 0, 0, 1)), url('./mtn-nav.jpg')",
      galleryBg:
        "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 10, 1))",
    },
    fontFamily: {
      sofia: ["Sofia Sans", "sans-serif"],
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
