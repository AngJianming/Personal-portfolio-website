"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

const experiences = [
  {
    period: "2023 — Present",
    title: "Senior AI Engineer",
    company: "TechVision AI",
    companyUrl: "#",
    description:
      "Leading the development of production-grade LLM applications and RAG systems. Architecting scalable ML pipelines serving millions of users. Mentoring a team of 5 engineers on AI best practices and MLOps workflows.",
    technologies: ["Python", "PyTorch", "LangChain", "AWS", "Kubernetes"],
  },
  {
    period: "2021 — 2023",
    title: "Machine Learning Engineer",
    company: "DataSphere Labs",
    companyUrl: "#",
    description:
      "Built and deployed computer vision models for autonomous systems. Developed real-time inference pipelines with sub-100ms latency. Implemented A/B testing frameworks for model performance evaluation.",
    technologies: ["TensorFlow", "OpenCV", "Docker", "GCP", "FastAPI"],
  },
  {
    period: "2019 — 2021",
    title: "Software Engineer",
    company: "InnovateTech",
    companyUrl: "#",
    description:
      "Developed full-stack web applications with integrated ML features. Built data pipelines for ETL processes handling terabytes of data. Contributed to the core recommendation engine improving user engagement by 35%.",
    technologies: ["Python", "React", "Node.js", "PostgreSQL", "Redis"],
  },
  {
    period: "2018 — 2019",
    title: "Research Assistant",
    company: "University AI Lab",
    companyUrl: "#",
    description:
      "Conducted research on neural network architectures for NLP tasks. Published 2 papers on attention mechanisms and transformer optimizations. Developed open-source tools for model interpretability.",
    technologies: ["Python", "PyTorch", "Jupyter", "LaTeX", "Git"],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Experience</h2>
          <div className="w-20 h-1 bg-primary rounded-full" />
        </motion.div>

        <div className="space-y-2">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.title}-${exp.company}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <a
                href={exp.companyUrl}
                className="block p-6 rounded-xl hover:bg-secondary/30 transition-all duration-300"
              >
                <div className="grid sm:grid-cols-[180px_1fr] gap-4">
                  <div className="text-sm text-muted-foreground font-mono">
                    {exp.period}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2 flex-wrap">
                      {exp.title}
                      <span className="text-muted-foreground font-normal">·</span>
                      <span className="text-muted-foreground font-normal inline-flex items-center gap-1">
                        {exp.company}
                        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-4 font-medium"
          >
            View Full Résumé
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
