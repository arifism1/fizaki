import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F7F7F5",
        canvasAlt: "#FFFFFF",
        ink: "#0F0F0F",
        inkBody: "#5C5C5C",
        inkMuted: "#8E8E8E",
        hairline: "#E4E3DE",
        dotline: "#D6D5D0",

        // Flat, fully saturated circles — never gradients, never pastel tints.
        brandBlue: "#2563EB",
        brandGreen: "#22C55E",
        brandOrange: "#F97316",
        brandPink: "#EC4899",
        brandPurple: "#8B5CF6",
        brandTeal: "#06B6D4",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
      },
      maxWidth: {
        shell: "1120px",
        // Everything readable is constrained to this measure. Non-negotiable.
        measure: "660px",
        // The shell the measure sits at the left edge of.
        offset: "880px",
        breakout: "1000px",
      },
      boxShadow: {
        rest: "0 1px 2px rgba(0,0,0,0.04)",
        lift: "0 8px 30px rgba(0,0,0,0.06)",
        float: "0 24px 80px -20px rgba(30,30,60,0.25)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        twinkle: {
          "0%, 100%": { opacity: "var(--star-min)" },
          "50%": { opacity: "var(--star-max)" },
        },
        haloPulse: {
          "0%": { transform: "scale(1)", opacity: "0.5" },
          "70%, 100%": { transform: "scale(1.9)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.25s ease-out",
        "accordion-up": "accordion-up 0.25s ease-out",
        twinkle: "twinkle var(--star-dur, 5s) ease-in-out infinite",
        halo: "haloPulse 2.8s cubic-bezier(0.22,1,0.36,1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
