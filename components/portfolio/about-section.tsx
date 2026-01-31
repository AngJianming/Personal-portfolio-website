"use client"

import { motion } from "framer-motion"
import { Brain, Code2, Database, Sparkles, Cpu, Globe } from "lucide-react"

const skills = [
  {
    category: "AI & Machine Learning",
    icon: Brain,
    items: ["Deep Learning", "Neural Networks", "NLP", "Computer Vision", "Reinforcement Learning"],
  },
  {
    category: "Programming",
    icon: Code2,
    items: ["Python", "TypeScript", "Go", "Rust", "C++"],
  },
  {
    category: "Frameworks & Tools",
    icon: Sparkles,
    items: ["PyTorch", "TensorFlow", "Hugging Face", "LangChain", "OpenAI API"],
  },
  {
    category: "Infrastructure",
    icon: Database,
    items: ["AWS", "GCP", "Docker", "Kubernetes", "PostgreSQL"],
  },
  {
    category: "Web Development",
    icon: Globe,
    items: ["Next.js", "React", "Node.js", "FastAPI", "GraphQL"],
  },
  {
    category: "MLOps",
    icon: Cpu,
    items: ["MLflow", "Weights & Biases", "DVC", "Airflow", "Ray"],
  },
]

const techStack = [
  "Python", "PyTorch", "TensorFlow", "TypeScript", "Next.js", "React",
  "FastAPI", "Docker", "AWS", "GCP", "PostgreSQL", "Redis",
  "LangChain", "Hugging Face", "OpenAI", "Anthropic"
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                I am a <span className="text-primary font-medium">Software AI Engineer</span> passionate about building 
                intelligent systems that solve real-world problems. My expertise lies at the intersection of 
                software engineering and artificial intelligence, where I architect and deploy scalable 
                machine learning solutions.
              </p>
              <p>
                With a strong foundation in deep learning, natural language processing, and computer vision, 
                I specialize in developing end-to-end AI applications—from research and model development 
                to production deployment and optimization. I thrive on transforming complex AI research 
                into practical, user-friendly products.
              </p>
              <p>
                Currently, I focus on <span className="text-foreground font-medium">Large Language Models (LLMs)</span>, 
                building conversational AI systems, RAG pipelines, and autonomous agents. I believe in 
                democratizing AI technology and making it accessible to businesses of all sizes.
              </p>
              <p>
                When not coding, you can find me exploring the latest research papers, contributing to 
                open-source projects, or mentoring aspiring AI engineers.
              </p>
            </div>

            {/* Tech Stack Tags */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-foreground mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="px-3 py-1.5 text-sm bg-secondary/80 text-muted-foreground rounded-full border border-border hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="p-5 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <skill.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{skill.category}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2 py-1 bg-secondary/50 text-muted-foreground rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
