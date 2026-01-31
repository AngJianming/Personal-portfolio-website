"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink, Star, GitFork } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Neural Search Engine",
    description:
      "A semantic search engine powered by transformer embeddings and vector databases. Features hybrid search combining BM25 and dense retrieval for superior accuracy.",
    technologies: ["Python", "PyTorch", "Qdrant", "FastAPI", "React"],
    stars: 1240,
    forks: 189,
    githubUrl: "#",
    demoUrl: "#",
    featured: true,
  },
  {
    title: "AutoML Pipeline",
    description:
      "End-to-end automated machine learning pipeline with hyperparameter optimization, feature engineering, and model selection. Supports tabular, text, and image data.",
    technologies: ["Python", "Ray", "Optuna", "MLflow", "Docker"],
    stars: 890,
    forks: 124,
    githubUrl: "#",
    demoUrl: "#",
    featured: true,
  },
  {
    title: "LLM Chat Framework",
    description:
      "Production-ready framework for building conversational AI applications with multi-turn memory, tool use, and RAG capabilities.",
    technologies: ["TypeScript", "LangChain", "OpenAI", "Pinecone", "Next.js"],
    stars: 2100,
    forks: 342,
    githubUrl: "#",
    demoUrl: "#",
    featured: true,
  },
  {
    title: "Vision Transformer Library",
    description:
      "Efficient implementations of Vision Transformers (ViT) with optimizations for edge deployment. Includes pre-trained weights and fine-tuning utilities.",
    technologies: ["Python", "PyTorch", "ONNX", "TensorRT"],
    stars: 567,
    forks: 89,
    githubUrl: "#",
    featured: false,
  },
  {
    title: "Data Annotation Tool",
    description:
      "Web-based annotation platform for computer vision tasks supporting bounding boxes, segmentation, and keypoint labeling with collaborative features.",
    technologies: ["React", "Node.js", "PostgreSQL", "Canvas API"],
    stars: 423,
    forks: 67,
    githubUrl: "#",
    featured: false,
  },
  {
    title: "Model Interpretability Suite",
    description:
      "Comprehensive toolkit for understanding and explaining ML model predictions with SHAP, attention visualization, and counterfactual explanations.",
    technologies: ["Python", "SHAP", "Captum", "Streamlit"],
    stars: 312,
    forks: 45,
    githubUrl: "#",
    featured: false,
  },
]

export function ProjectsSection() {
  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Open Source Projects</h2>
          <div className="w-20 h-1 bg-primary rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-2xl">
            A selection of my open-source contributions and personal projects. 
            I believe in building in public and sharing knowledge with the community.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 border-border hover:border-primary/30 transition-all group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <div className="flex gap-2">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`Live demo of ${project.title}`}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`GitHub repository for ${project.title}`}
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  <CardDescription className="mt-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-secondary/50 text-muted-foreground rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {project.stars.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      {project.forks}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h3 className="text-xl font-semibold text-foreground mb-6">Other Projects</h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-5 rounded-xl bg-card/30 border border-border hover:border-primary/30 hover:bg-card/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <Github className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {project.description}
              </p>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {project.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3 h-3" />
                  {project.forks}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button variant="outline" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <Github className="w-4 h-4" />
              View All on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
