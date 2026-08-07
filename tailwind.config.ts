import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        purple: "#8e45b0",
        "purple-light": "rgba(142, 69, 176, .35)",
        "green-light": "rgb(234, 244, 229)",
        "green-dark": "rgb(193, 204, 188)",
        brand: {
          purple: "#6C63FF",
          "purple-dark": "#5B52F5",
          gold: "#FFC94D",
          coral: "#FF6B6B",
          mint: "#53D8C8",
          ink: "#1A1D29",
          "ink-soft": "#5B6072",
          "ink-faint": "#9096A8",
          outline: "#2B1B4D",
          border: "#E7E9F2",
          canvas: "#F8F9FC",
          color: {
            blue: "#4DA3FF",
            purple: "#A855F7",
            green: "#4CD37B",
            pink: "#FF6FB5",
            orange: "#FFA94D",
            teal: "#2DD4BF",
          },
        },
      },
      fontFamily: {
        heading: ["var(--font-outfit)", ...defaultTheme.fontFamily.sans],
        body: ["var(--font-dm-sans)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
