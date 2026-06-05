import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#080812",
          900: "#0d0d1a",
          800: "#15162a",
          700: "#1d1e36",
          600: "#2a2c4d",
          500: "#4b4e74",
          400: "#7a7eaf",
          300: "#b6b9d8",
          200: "#dadce8",
          100: "#eceef7",
        },
        signal: {
          orange: "#ff7849",
          amber: "#ffb547",
          cyan: "#22d3ee",
          violet: "#a855f7",
          lime: "#a3e635",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
        display: ["ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "Menlo", "monospace"],
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(8px,-12px)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "float-slow": "float-slow 8s ease-in-out infinite",
        ticker: "ticker 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
