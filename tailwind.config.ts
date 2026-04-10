import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CSS-variable–driven: auto-switches with .dark class
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        card: "rgb(var(--color-card) / <alpha-value>)",
        "text-primary": "rgb(var(--color-text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--color-text-secondary) / <alpha-value>)",
        "text-muted": "rgb(var(--color-text-muted) / <alpha-value>)",
        // Professional blue accent palette
        "accent":       "#2563eb",   // blue-600
        "accent-light": "#60a5fa",   // blue-400
        "accent-dark":  "#1e40af",   // blue-800
        "accent-sky":   "#0ea5e9",   // sky-500
        // Keep these aliases so existing components don't break
        "violet-accent": "#2563eb",
        "violet-light":  "#60a5fa",
        "violet-dim":    "#1e40af",
        "blue-accent":   "#0ea5e9",
        "indigo-accent": "#3b82f6",
        // Semantic border (CSS vars, no opacity modifier needed)
        "border-dim":  "var(--border-dim)",
        "border-glow": "var(--border-glow)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "blue-gradient":
          "linear-gradient(135deg, #3b82f6 0%, #2563eb 55%, #1e40af 100%)",
        "violet-gradient":
          "linear-gradient(135deg, #3b82f6 0%, #2563eb 55%, #1e40af 100%)",
      },
      boxShadow: {
        "glow-violet":
          "0 0 28px rgba(37,99,235,0.20), 0 0 56px rgba(37,99,235,0.08)",
        "glow-violet-lg":
          "0 0 48px rgba(37,99,235,0.28), 0 0 96px rgba(37,99,235,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
