"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeInUp, slideInLeft } from "@/lib/animations";

const experiences = [
  {
    company: "Nard Shop",
    role: "Creative Director",
    period: "2022 — Present",
    type: "Founder",
    description:
      "Developed a headless e-commerce platform using React and the WooCommerce REST API. Led full brand direction, UI/UX design, and digital strategy for a growing streetwear label rooted in Chicago culture.",
    tags: ["React", "WooCommerce API", "Headless CMS", "UI/UX", "Brand Strategy"],
    accent: "#2563eb",
  },
  {
    company: "Purdue University",
    role: "Web Marketing Intern",
    period: "2023 — 2024",
    type: "Internship",
    description:
      "Improved site-wide SEO performance and implemented WCAG 2.1 accessibility standards in Cascade CMS. Analyzed web traffic data via Google Analytics and built dashboards to support digital marketing strategy.",
    tags: ["Cascade CMS", "SEO", "WCAG 2.1", "Google Analytics", "Accessibility"],
    accent: "#2563eb",
  },
  {
    company: "Voxiant Solutions",
    role: "Freelance Full-Stack Developer",
    period: "2024 — Present",
    type: "Freelance",
    description:
      "Delivered custom full-stack web applications for startups and non-profits across healthcare and e-commerce. Projects span API integrations, CMS development, and modern Next.js/React deployments.",
    tags: ["Next.js", "React", "API Integration", "TypeScript", "Full-Stack"],
    accent: "#2563eb",
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={ref}
      aria-labelledby="experience-heading"
      className="relative py-16 px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 text-center"
        >
          <motion.p variants={fadeInUp} className="section-label mb-3">
            Career
          </motion.p>
          <motion.h2
            id="experience-heading"
            variants={fadeInUp}
            className="text-4xl lg:text-5xl font-black tracking-tight text-text-primary mb-4"
          >
            Experience
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-text-secondary max-w-lg mx-auto">
            From running my own brand to enterprise internships and freelance builds.
          </motion.p>
        </motion.div>

        <hr
          className="mb-10 border-0 h-px bg-gradient-to-r from-transparent via-[var(--border-dim)] to-transparent"
          aria-hidden="true"
        />

        {/* Timeline */}
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          aria-label="Work experience timeline"
          className="relative"
        >
          {experiences.map((exp, i) => (
            <motion.li
              key={exp.company}
              variants={slideInLeft}
              className="relative flex gap-3 sm:gap-5"
            >
              {/* Date — left column */}
              <div className="w-[5.75rem] sm:w-32 flex-shrink-0 pt-4 sm:pt-5 text-right">
                <p className="font-mono text-[10px] sm:text-xs text-text-muted leading-snug tracking-wide">
                  {exp.period}
                </p>
              </div>

              {/* Rail: vertical line + dot */}
              <div className="relative flex w-5 sm:w-6 flex-shrink-0 flex-col items-center self-stretch">
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 timeline-line"
                />
                <div
                  aria-hidden="true"
                  className="relative z-10 mt-4 flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full border-2 bg-bg"
                  style={{ borderColor: exp.accent }}
                >
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: exp.accent }}
                  />
                </div>
              </div>

              {/* Card */}
              <div className="min-w-0 flex-1 pb-8 last:pb-0">
                <div
                  className="group relative rounded-xl border border-[var(--border-dim)] p-6 sm:p-7 card-glow transition-all duration-300"
                  style={{
                    background: "var(--card-bg-gradient)",
                    "--accent": exp.accent,
                  } as React.CSSProperties}
                >
                  {/* Title row */}
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="mb-1 flex flex-wrap items-center gap-2 sm:gap-3">
                        <h3 className="text-lg sm:text-xl font-bold text-text-primary transition-colors group-hover:text-accent-light">
                          {exp.company}
                        </h3>
                        <span
                          className="inline-flex text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border"
                          style={{
                            color: exp.accent,
                            borderColor: `${exp.accent}40`,
                            backgroundColor: `${exp.accent}10`,
                          }}
                        >
                          {exp.type}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-text-secondary">{exp.role}</p>
                    </div>
                  </div>

                  <hr
                    className="mb-4 border-0 border-t border-[var(--border-dim)]"
                    aria-hidden="true"
                  />

                  <p className="mb-5 text-sm leading-relaxed text-text-secondary">
                    {exp.description}
                  </p>

                  <hr
                    className="mb-4 border-0 border-t border-[var(--border-dim)]"
                    aria-hidden="true"
                  />

                  <ul
                    aria-label={`Technologies used at ${exp.company}`}
                    className="flex flex-wrap gap-2"
                    role="list"
                  >
                    {exp.tags.map((tag) => (
                      <li key={tag}>
                        <span className="tag-pill">{tag}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    aria-hidden="true"
                    className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundColor: exp.accent }}
                  />
                </div>

                {i < experiences.length - 1 && (
                  <hr
                    className="mt-8 border-0 border-t border-dashed border-[var(--border-dim)] opacity-70"
                    aria-hidden="true"
                  />
                )}
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
