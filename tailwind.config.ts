import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "G-100": "#141414",
        "G-90": "#191919",
        "G-80": "#1E1E1E",
        "G-70": "#232323",
        "G-60": "#282828",
        "G-50": "#2D2D2D",
        "G-40": "#323232",
        "G-30": "#373737",
        "G-20": "#3C3C3C",
        "G-10": "#414141",
        primary: "#ffffff",
        secondary: "rgba(255, 255, 255, 0.56)",
        disabled: "rgba(255, 255, 255, 0.32)",
      },
      fontFamily: {
        glysa: ["Glysa", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
