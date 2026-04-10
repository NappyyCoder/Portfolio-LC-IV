"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Layers, BarChart2, Terminal, Database, Sparkles } from "lucide-react";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";
import type { LucideIcon } from "lucide-react";

interface SkillCategory {
  name: string;
  badge: string;
  skills: string[];
  Icon: LucideIcon;
  iconColor: string;
  accentFrom: string;
  accentTo: string;
  hoverBorder: string;
  hoverShadow: string;
}

// All cards use the same blue family — three shades rotating for subtle differentiation
const B1 = { color: "#2563eb", r: "37,99,235" };   // blue-600
const B2 = { color: "#3b82f6", r: "59,130,246" };  // blue-500
const B3 = { color: "#1d4ed8", r: "29,78,216" };   // blue-700

function makeAccent(b: { color: string; r: string }) {
  return {
    iconColor: b.color,
    accentFrom: `rgba(${b.r},0.08)`,
    accentTo: `rgba(${b.r},0.04)`,
    hoverBorder: `rgba(${b.r},0.40)`,
    hoverShadow: `0 0 28px rgba(${b.r},0.12)`,
  };
}

const skillCategories: SkillCategory[] = [
  {
    name: "Web Languages",
    badge: "Core",
    skills: ["HTML", "CSS", "JavaScript", "PHP", "SQL", "C/C++", "ASP.NET"],
    Icon: Code2,
    ...makeAccent(B1),
  },
  {
    name: "Frameworks & CMS",
    badge: "Tooling",
    skills: ["React", "Next.js", "WordPress", "Cascade CMS"],
    Icon: Layers,
    ...makeAccent(B2),
  },
  {
    name: "Cloud & APIs",
    badge: "Backend",
    skills: ["Supabase", "Firebase", "OpenAI API", "Git / GitHub"],
    Icon: Database,
    ...makeAccent(B3),
  },
  {
    name: "Data Science",
    badge: "Analytics",
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    Icon: Terminal,
    ...makeAccent(B1),
  },
  {
    name: "Data Visualization",
    badge: "Viz",
    skills: ["D3.js", "Voreen", "Paraview"],
    Icon: BarChart2,
    ...makeAccent(B2),
  },
  {
    name: "Design & UX",
    badge: "Creative",
    skills: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "UX/UI Prototyping",
      "Web Accessibility (WCAG 2.1)",
      "Ecommerce",
      "Maya",
    ],
    Icon: Sparkles,
    ...makeAccent(B3),
  },
];

export default function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="stack"
      ref={ref}
      aria-labelledby="stack-heading"
      className="relative py-16 px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 text-center"
        >
          <motion.p variants={fadeInUp} className="section-label mb-3">
            Expertise
          </motion.p>
          <motion.h2
            id="stack-heading"
            variants={fadeInUp}
            className="text-4xl lg:text-5xl font-black tracking-tight text-text-primary mb-4"
          >
            Technical Skills
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-text-secondary max-w-lg mx-auto">
            Technologies and tools I reach for across web development, data science, and product design.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          role="list"
          aria-label="Technical skills by category"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skillCategories.map((cat) => {
            const { Icon } = cat;
            return (
              <motion.li
                key={cat.name}
                variants={scaleIn}
                className="group relative rounded-xl border border-[var(--border-dim)] p-6 card-glow cursor-default overflow-hidden transition-all duration-300"
                style={{ background: "var(--card-bg-gradient)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = cat.hoverBorder;
                  (e.currentTarget as HTMLElement).style.boxShadow = `var(--card-shadow-hover), ${cat.hoverShadow}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                {/* Tinted overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl opacity-50 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${cat.accentFrom} 0%, ${cat.accentTo} 100%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Icon + badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: cat.accentFrom,
                        border: `1px solid ${cat.hoverBorder.replace("0.40", "0.20")}`,
                      }}
                      aria-hidden="true"
                    >
                      <Icon size={18} style={{ color: cat.iconColor }} strokeWidth={1.75} />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-text-muted border border-[var(--border-dim)] px-2 py-0.5 rounded-full">
                      {cat.badge}
                    </span>
                  </div>

                  {/* Category name */}
                  <h3 className="text-lg font-bold text-text-primary mb-4 group-hover:text-accent-light transition-colors">
                    {cat.name}
                  </h3>

                  {/* Skill pills */}
                  <ul
                    className="flex flex-wrap gap-1.5"
                    role="list"
                    aria-label={`${cat.name} skills`}
                  >
                    {cat.skills.map((skill) => (
                      <li key={skill}>
                        <span className="tag-pill">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Corner accent */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 right-0 w-16 h-16 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at bottom right, ${cat.accentFrom}, transparent)`,
                  }}
                />
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
