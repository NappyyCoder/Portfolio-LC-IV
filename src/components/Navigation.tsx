"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { fadeInDown } from "@/lib/animations";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        variants={fadeInDown}
        initial="hidden"
        animate="visible"
        role="navigation"
        aria-label="Primary navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bg/95 backdrop-blur-xl border-b border-[var(--border-dim)] shadow-[0_1px_0_rgba(37,99,235,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Go to top"
              className="flex items-center gap-2 group focus-visible:outline-violet-accent"
            >
              <span className="text-lg font-bold tracking-tight gradient-text">LC</span>
              <span className="hidden sm:block text-xs text-text-muted font-mono tracking-widest uppercase group-hover:text-text-secondary transition-colors">
                /leo
              </span>
            </button>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-1" role="list">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-md focus-visible:outline-accent ${
                        isActive
                          ? "text-accent"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-0 rounded-md bg-accent/10 border border-accent/20"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                        />
                      )}
                      <span className="relative">{link.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* CTA + Theme toggle + Mobile menu toggle */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              <a
                href="https://github.com/NappyyCoder"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View GitHub profile"
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium border border-[var(--border-dim)] text-text-secondary hover:text-text-primary hover:border-[var(--border-glow)] hover:shadow-glow-violet transition-all duration-200"
              >
                GitHub
              </a>

              <button
                className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-bg/98 backdrop-blur-xl border-b border-[var(--border-dim)] md:hidden"
          >
            <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface rounded-md transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="https://github.com/NappyyCoder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-sm font-medium text-accent"
                  onClick={() => setMenuOpen(false)}
                >
                  GitHub ↗
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
