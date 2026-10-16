import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontWeight: {
        medium: "400",
        semibold: "500",
        bold: "600",
        extrabold: "600",
      },
      colors: {
        brand: {
          50: "#efffee",
          100: "#d8ffd4",
          200: "#b4ffa9",
          300: "#80fa6e",
          400: "#4be936",
          500: "#3ebf0f",
          600: "#2f9f0a",
          700: "#287c0d",
          800: "#256213",
          900: "#1e5012",
          950: "#0b2d05",
        },
        nativeBlue: {
          50: "#eef6ff",
          100: "#d9ebff",
          500: "#115BC7",
          600: "#0f4fae",
          700: "#0d4292",
        },
        ink: {
          50: "#f6f8f5",
          100: "#eaf0e8",
          200: "#d5dfd1",
          300: "#b4c6ac",
          400: "#8fa687",
          500: "#718a68",
          600: "#596f51",
          700: "#485a43",
          800: "#3d4b39",
          900: "#182716",
          950: "#081407",
        },
        ember: "#ffb000",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(62, 191, 15, 0.28)",
        card: "0 12px 32px rgba(8, 20, 7, 0.07)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" },
        },
        pulseLine: {
          "0%": { strokeDashoffset: "620" },
          "100%": { strokeDashoffset: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-delay": "float 7s ease-in-out 0.8s infinite",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
