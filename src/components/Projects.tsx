"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";

interface Project {
  name: string;
  description: string;
  tech: string[];
  url: string | null;
  image?: string;
}

const saasProjects: Project[] = [
  {
    name: "Study Buddy",
    description:
      "Real-time collaborative study platform with session management, shared whiteboards, and AI-powered note summarization for students.",
    tech: ["Next.js", "Supabase", "TypeScript", "Real-time"],
    url: "https://studdy-buddy-vercel.vercel.app",
  },
  {
    name: "Nurse Rocky",
    description:
      "Modular React healthcare interface designed for nurse practitioners with dynamic patient workflows, appointment scheduling, and responsive design.",
    tech: ["React", "TypeScript", "REST API", "Healthcare UX"],
    url: "https://nurse-rocky.vercel.app",
  },
  {
    name: "AI Support Agent",
    description:
      "GPT-4 powered intelligent customer support agent with context-aware responses, conversation memory, and human escalation logic.",
    tech: ["OpenAI GPT-4", "Python", "FastAPI", "Streaming"],
    url: null,
  },
];

const clientProjects: Project[] = [
  {
    name: "TCA Health",
    description:
      "Healthcare accessibility platform focused on equitable care resources, WCAG 2.1 compliant design, and streamlined patient information architecture.",
    tech: ["React", "CMS", "WCAG 2.1", "Healthcare"],
    url: "https://tcahealth.org",
    image: "/tca-health.jpg",
  },
  {
    name: "Nard Shop",
    description:
      "Headless streetwear e-commerce brand built with React and WooCommerce REST APIs. Full creative direction — from UI/UX design to brand identity and digital strategy.",
    tech: ["React", "WooCommerce API", "Headless CMS", "Brand Direction"],
    url: null,
    image: "/nardshop.jpg",
  },
  {
    name: "Kaptivate Apparel",
    description:
      "High-performance streetwear e-commerce site with seamless checkout flow, product filtering, and inventory management via WooCommerce.",
    tech: ["E-commerce", "WooCommerce", "React", "Performance"],
    url: "https://kaptivateapparel.com",
    image: "/kaptivate.jpg",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      variants={scaleIn}
      aria-labelledby={`project-${project.name.replace(/\s+/g, "-").toLowerCase()}`}
      className="group relative rounded-xl border border-[var(--border-dim)] card-glow overflow-hidden flex flex-col"
      style={{ background: "var(--card-bg-gradient)" }}
    >
      {/* Image strip if available */}
      {project.image && (
        <div className="relative h-44 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`Screenshot of ${project.name}`}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3
            id={`project-${project.name.replace(/\s+/g, "-").toLowerCase()}`}
            className="text-lg font-bold text-text-primary group-hover:text-violet-light transition-colors leading-tight"
          >
            {project.name}
          </h3>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.name} live site in new tab`}
              className="flex-shrink-0 p-1.5 rounded-lg border border-border-dim text-text-muted hover:text-violet-light hover:border-border-glow hover:shadow-glow-violet transition-all duration-200"
            >
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          ) : (
            <span
              className="flex-shrink-0 text-[10px] font-semibold uppercase tracking-widest text-text-muted border border-border-dim px-2 py-1 rounded-lg"
              aria-label="Work in progress"
            >
              WIP
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-5">
          {project.description}
        </p>

        {/* Tech tags */}
        <ul aria-label={`Technologies used in ${project.name}`} className="flex flex-wrap gap-1.5" role="list">
          {project.tech.map((t) => (
            <li key={t}>
              <span className="tag-pill">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hover glow stripe */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </motion.article>
  );
}

function ProjectGroup({
  title,
  subtitle,
  projects,
  isInView,
}: {
  title: string;
  subtitle: string;
  projects: Project[];
  isInView: boolean;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mb-14 last:mb-0"
    >
      {/* Group header */}
      <motion.div variants={fadeInUp} className="mb-8 flex items-center gap-4">
        <div>
          <p className="section-label mb-1">{subtitle}</p>
          <h3 className="text-2xl font-bold text-text-primary">{title}</h3>
        </div>
        <div
          aria-hidden="true"
          className="flex-1 h-px bg-gradient-to-r from-border-dim to-transparent"
        />
      </motion.div>

      <div
        className={`grid gap-5 ${
          projects.length === 3
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 md:grid-cols-2"
        }`}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      ref={ref}
      aria-labelledby="projects-heading"
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
            Selected Work
          </motion.p>
          <motion.h2
            id="projects-heading"
            variants={fadeInUp}
            className="text-4xl lg:text-5xl font-black tracking-tight text-text-primary mb-4"
          >
            Projects
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-text-secondary max-w-lg mx-auto">
            From SaaS products to client builds — real work, shipped to production.
          </motion.p>
        </motion.div>

        {/* SaaS & Apps */}
        <ProjectGroup
          title="SaaS & Apps"
          subtitle="Products"
          projects={saasProjects}
          isInView={isInView}
        />

        {/* Client Work */}
        <ProjectGroup
          title="Client Work"
          subtitle="Freelance"
          projects={clientProjects}
          isInView={isInView}
        />
      </div>
    </section>
  );
}
