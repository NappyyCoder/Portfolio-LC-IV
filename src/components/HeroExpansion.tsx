"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

export default function HeroExpansion() {
  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1280&auto=format&fit=crop"
      bgImageSrc="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop"
      title="Leonard Clay"
      date="Full-Stack Developer"
      scrollToExpand="Scroll to expand"
      textBlend
    >
      {/* Revealed after the media fully expands */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center"
      >
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
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
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
    </ScrollExpandMedia>
  );
}
