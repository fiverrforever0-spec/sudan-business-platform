import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      fontFamily: {
        display: ["var(--font-tajawal)", "Tajawal", "sans-serif"],
        body: ["var(--font-plex)", "IBM Plex Sans Arabic", "sans-serif"],
      },
      colors: {
        bg: "#11171B",
        "bg-elevated": "#192226",
        "bg-card": "#1D2731",
        sand: "#F1E8D6",
        ink: "#ECE4D3",
        "ink-muted": "#AEA595",
        rust: {
          DEFAULT: "#BD5B2C",
          light: "#DD7A46",
          dark: "#8F401F",
        },
        teal: {
          DEFAULT: "#1F8A82",
          light: "#33ADA3",
          dark: "#145E58",
        },
        gold: {
          DEFAULT: "#D9A441",
          light: "#EFC876",
          dark: "#A87A28",
        },
        clay: "#3A2A22",
        border: "#2A353B",
      },
      borderRadius: {
        xs: "6px",
        sm: "10px",
        md: "14px",
        lg: "20px",
        xl: "28px",
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(0,0,0,0.5)",
        glow: "0 0 0 1px rgba(217,164,65,0.15), 0 8px 24px -8px rgba(217,164,65,0.25)",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        "path-draw": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "path-draw": "path-draw 2.2s ease-out forwards",
        "float-slow": "float-slow 5s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
