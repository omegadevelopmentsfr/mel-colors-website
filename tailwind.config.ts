import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#E07A3F",
          mustard: "#C8922A",
          magenta: "#E0317F",
          cyan: "#00BCD4",
          olive: "#8B9E2A",
          coral: "#E05A3A",
          purple: "#7B5EA7",
          cream: "#F2EDE8",
          black: "#111111",
        },
      },
      fontFamily: {
        heading: ["var(--font-syne)", "serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      borderRadius: {
        pill: "999px",
      },
    },
  },
  plugins: [],
};
export default config;
