import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00587A",
        lightText: "#4C4E64DE",
        lightPrimary: "#5397C5",
        veryLightPrimary: "#CCDEE4",
        primaryBold: "#034c69",
        background: "#F3F3F3",
      },
    },
  },
  plugins: [],
};
export default config;
