"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-8 h-8" aria-hidden="true" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--border-dim)] text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-text-primary))] hover:border-[var(--border-glow)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-accent focus-visible:ring-offset-1 focus-visible:ring-offset-[rgb(var(--color-bg))]"
    >
      <Sun
        size={15}
        aria-hidden="true"
        className={`absolute transition-all duration-300 ${
          isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
        }`}
      />
      <Moon
        size={15}
        aria-hidden="true"
        className={`absolute transition-all duration-300 ${
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
        }`}
      />
    </button>
  );
}
