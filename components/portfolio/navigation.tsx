"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, User, Briefcase, FolderOpen, Mail, FileText, ShoppingBag, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { name: "Home", href: "#", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Projects", href: "#projects", icon: FolderOpen },
  { name: "Shop", href: "#marketplace", icon: ShoppingBag },
  { name: "Contact", href: "#contact", icon: Mail },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine active section
      const sections = navItems.map((item) => item.href.replace("#", "")).filter(Boolean)
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            return
          }
        }
      }
      setActiveSection("")
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <div className="hidden lg:block fixed left-0 top-0 h-full z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "absolute left-6 top-6 p-3 rounded-xl transition-all",
            scrolled ? "bg-card/80 backdrop-blur-md border border-border" : "bg-transparent"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-72 bg-card/95 backdrop-blur-xl border-r border-border p-8 pt-24"
            >
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-primary">AJ</span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Ang Jianming</h2>
                  <p className="text-sm text-muted-foreground">AI Engineer</p>
                </div>
                <ThemeToggle />
              </div>

              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left",
                        activeSection === item.href.replace("#", "") ||
                          (item.href === "#" && activeSection === "")
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className="absolute bottom-8 left-8 right-8 space-y-3">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick("#contact")
                  }}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors justify-center"
                >
                  <FileText className="w-4 h-4" />
                  Download CV
                </a>
                <a
                  href="/auth/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors justify-center text-sm"
                >
                  <Settings className="w-4 h-4" />
                  Admin
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border safe-area-inset-bottom">
        <div className="flex justify-around items-center py-2 px-4">
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-all min-w-[60px]",
                activeSection === item.href.replace("#", "") ||
                  (item.href === "#" && activeSection === "")
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Header */}
      <header
        className={cn(
          "lg:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled ? "bg-card/95 backdrop-blur-xl border-b border-border" : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">AJ</span>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-foreground">Ang Jianming</h1>
              <p className="text-xs text-muted-foreground">AI Engineer</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>
    </>
  )
}
