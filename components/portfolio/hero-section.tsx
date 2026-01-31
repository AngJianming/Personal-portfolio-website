"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

// Dynamically import 3D scene to avoid SSR issues
const NeuralNetwork3D = dynamic(
  () => import("./neural-network-3d").then((mod) => mod.NeuralNetwork3D),
  { ssr: false }
)

function Scene3DFallback() {
  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-background to-primary/5" />
  )
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Neural Network Background */}
      <Suspense fallback={<Scene3DFallback />}>
        <NeuralNetwork3D />
      </Suspense>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/80 via-background/50 to-background pointer-events-none" />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-6 sm:mb-8">
            <motion.div
              className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-3xl sm:text-4xl font-bold text-primary">AJ</span>
            </motion.div>
          </div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="text-balance">Ang Jianming</span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-primary font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Software AI Engineer
          </motion.p>

          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed text-pretty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Building intelligent systems that bridge the gap between human creativity and machine learning. 
            Passionate about crafting AI solutions that make a real-world impact.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button size="lg" className="gap-2" asChild>
              <a href="#projects">
                View Projects
                <ArrowDown className="w-4 h-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 bg-transparent" asChild>
              <a href="#contact">
                <FileText className="w-4 h-4" />
                Download CV
              </a>
            </Button>
          </motion.div>

          <motion.div
            className="flex gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:contact@angjianming.com"
              className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Email Contact"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </section>
  )
}
