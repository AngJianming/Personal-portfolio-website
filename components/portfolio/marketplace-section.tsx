"use client"

import { motion } from "framer-motion"
import { ShoppingBag, Download, Star, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: "1",
    title: "AI Chatbot Template",
    description:
      "Production-ready chatbot template with RAG, memory, and tool calling capabilities. Built with LangChain and Next.js.",
    price: 49,
    originalPrice: 79,
    category: "Templates",
    downloads: 234,
    rating: 4.9,
    tags: ["LangChain", "Next.js", "OpenAI"],
  },
  {
    id: "2",
    title: "ML Pipeline Starter Kit",
    description:
      "Complete MLOps setup with training, evaluation, and deployment pipelines. Includes CI/CD and monitoring.",
    price: 79,
    originalPrice: 129,
    category: "Starter Kits",
    downloads: 156,
    rating: 4.8,
    tags: ["Python", "MLflow", "Docker"],
  },
  {
    id: "3",
    title: "Vector Search Implementation",
    description:
      "Semantic search with multiple embedding providers and vector databases. Production-ready with caching.",
    price: 39,
    originalPrice: 59,
    category: "Components",
    downloads: 89,
    rating: 4.7,
    tags: ["Pinecone", "OpenAI", "TypeScript"],
  },
]

export function MarketplaceSection() {
  return (
    <section id="marketplace" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <ShoppingBag className="w-4 h-4" />
            Digital Products
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Marketplace</h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Premium templates, starter kits, and components to accelerate your AI projects. 
            Built from real-world production experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 border-border hover:border-primary/30 transition-all group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-foreground font-medium">{product.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {product.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-secondary/50 text-muted-foreground rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">${product.price}</span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {product.downloads}
                    </span>
                  </div>
                  <Button className="w-full mt-4 group-hover:bg-primary/90">
                    Get Access
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Button variant="outline" className="gap-2 bg-transparent">
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
