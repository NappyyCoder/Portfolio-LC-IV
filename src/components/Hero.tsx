"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, ChevronDown } from "lucide-react";
import { staggerContainer, fadeInUp, heroTitle } from "@/lib/animations";
import HeroParticleField from "@/components/HeroParticleField";

export default function Hero() {
  return (
    <section
      aria-label="Hero — Leonard Clay IV introduction"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />

      {/* Glow blob — sits behind content, well below the nav */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, var(--hero-glow-color) 0%, transparent 75%)",
          filter: "blur(2px)",
        }}
      />

      {/* Content — pt-24 clears the fixed nav (64px) with comfortable breathing room */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-8 text-center pt-24 pb-16"
      >
        {/* Single dot field: name → GitHub (dots visible on load, interactive on hover) */}
        <HeroParticleField className="mb-20 rounded-3xl px-2 py-1 sm:px-3">
          <motion.h1
            variants={heroTitle}
            className="text-[clamp(3.2rem,10vw,8rem)] font-black leading-[0.88] tracking-tight mb-5"
          >
            <span className="gradient-text block">Leonard</span>
            <span className="text-text-primary block">Clay IV.</span>
          </motion.h1>

          <motion.div
            variants={fadeInUp}
            className="text-[clamp(1rem,2.2vw,1.3rem)] font-semibold text-text-secondary tracking-wide mb-5"
          >
            Full-Stack Developer
            <span aria-hidden="true" className="mx-3 text-accent opacity-60">·</span>
            Creative Director
          </motion.div>

          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{
                background: "var(--tag-bg)",
                border: "1px solid var(--tag-border)",
                color: "var(--tag-color)",
              }}
            >
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse flex-shrink-0"
              />
              Purdue University &nbsp;&mdash;&nbsp; Graduating May 2026
            </span>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-sm text-text-muted max-w-sm mx-auto mb-10 leading-relaxed"
          >
            Building at the intersection of code, creativity, and culture.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm text-white shadow-glow-violet hover:shadow-glow-violet-lg hover:opacity-90 transition-all duration-200 focus-visible:outline-accent"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 55%, #1e40af 100%)",
              }}
            >
              View My Work
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </button>

            <a
              href="https://github.com/NappyyCoder"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub profile in a new tab"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm text-text-secondary border border-[var(--border-dim)] hover:text-text-primary hover:border-[var(--border-glow)] transition-all duration-200 focus-visible:outline-accent"
            >
              <Github size={16} aria-hidden="true" />
              GitHub
            </a>
          </motion.div>
        </HeroParticleField>

        {/* ── Stats ── */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 pt-8 border-t border-[var(--border-dim)]"
        >
          {[
            { value: "6+", label: "Years Building" },
            { value: "5+", label: "Projects Shipped" },
            { value: "5+", label: "Clients Served" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-black gradient-text">{stat.value}</p>
              <p className="text-[11px] text-text-muted uppercase tracking-widest mt-1 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        onClick={() =>
          document.getElementById("stack")?.scrollIntoView({ behavior: "smooth" })
        }
        aria-label="Scroll to tech stack"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-text-muted hover:text-accent transition-colors group"
      >
        <span className="text-[10px] tracking-widest uppercase font-mono">Scroll</span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className="animate-bounce"
        />
      </motion.button>
    </section>
  );
}
