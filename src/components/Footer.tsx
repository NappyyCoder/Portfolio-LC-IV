"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Mail, ArrowUpRight } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const navLinks = [
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      ref={ref}
      aria-labelledby="contact-heading"
      className="relative border-t border-[var(--border-dim)] bg-surface overflow-hidden"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(37,99,235,0.10) 0%, transparent 70%)",
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-14"
      >
        {/* CTA block */}
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <p className="section-label mb-3">Get In Touch</p>
          <h2
            id="contact-heading"
            className="text-4xl lg:text-5xl font-black tracking-tight mb-4"
          >
            <span className="gradient-text">Let&apos;s Build</span>
            <br />
            <span className="text-text-primary">Something.</span>
          </h2>
          <p className="text-text-secondary max-w-md mx-auto mb-10 leading-relaxed">
            Open to full-time roles, freelance projects, and creative collaborations. If you&apos;re
            building something ambitious, let&apos;s talk.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:leonardclay04@gmail.com"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm text-white transition-all duration-200 shadow-glow-violet hover:shadow-glow-violet-lg focus-visible:outline-violet-accent"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 55%, #1e40af 100%)",
              }}
              aria-label="Send email to Leonard Clay IV"
            >
              <Mail size={16} aria-hidden="true" />
              Say Hello
            </a>
            <a
              href="https://github.com/NappyyCoder"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub profile in a new tab"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm text-text-secondary border border-border-dim hover:text-text-primary hover:border-border-glow hover:shadow-glow-violet transition-all duration-200 focus-visible:outline-violet-accent"
            >
              <Github size={16} aria-hidden="true" />
              GitHub
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <motion.hr
          variants={fadeInUp}
          aria-hidden="true"
          className="mb-8 border-0 h-px bg-gradient-to-r from-transparent via-border-dim to-transparent"
        />

        {/* Bottom row */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-lg font-black tracking-tight gradient-text">Leonard Clay IV</p>
            <p className="text-xs text-text-muted mt-0.5">
              Full-Stack Developer &amp; Creative Director
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-6" role="list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleScroll(link.href)}
                    className="text-sm text-text-muted hover:text-text-secondary transition-colors focus-visible:outline-violet-accent"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-text-muted font-mono" aria-label="Copyright">
            © {new Date().getFullYear()} Leonard Clay IV
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
