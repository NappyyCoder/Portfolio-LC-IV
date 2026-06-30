"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, ArrowUpRight } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

const featuredProjects = [
  {
    name: "Study Buddy",
    blurb: "Real-time collaborative study platform with shared whiteboards and AI note summaries.",
    tag: "SaaS",
    url: "https://studdy-buddy-vercel.vercel.app",
  },
  {
    name: "TCA Health",
    blurb: "Accessible (WCAG 2.1) healthcare platform focused on equitable care resources.",
    tag: "Client",
    url: "https://tcahealth.org",
  },
  {
    name: "Kaptivate Apparel",
    blurb: "High-performance streetwear storefront with seamless checkout and product filtering.",
    tag: "E-commerce",
    url: "https://kaptivateapparel.com",
  },
];

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
          className="text-base text-text-secondary max-w-md mx-auto mb-10 leading-relaxed"
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

        <motion.div variants={fadeInUp} className="pt-10 border-t border-[var(--border-dim)]">
          <p className="section-label mb-6">Featured Work</p>
          <ul
            role="list"
            aria-label="Featured portfolio projects"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left"
          >
            {featuredProjects.map((project) => (
              <li key={project.name}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.name} live site in a new tab`}
                  className="group flex h-full flex-col rounded-xl border border-[var(--border-dim)] p-5 card-glow transition-all duration-200 hover:border-[var(--border-glow)] focus-visible:outline-accent"
                  style={{ background: "var(--card-bg-gradient)" }}
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold text-text-primary transition-colors group-hover:text-accent-light">
                      {project.name}
                    </h3>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="flex-shrink-0 text-text-muted transition-colors group-hover:text-accent-light"
                    />
                  </div>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary">
                    {project.blurb}
                  </p>
                  <span className="self-start tag-pill">{project.tag}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 text-center">
            <button
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-light focus-visible:outline-accent"
            >
              See all projects
              <ArrowRight
                size={15}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </ScrollExpandMedia>
  );
}
