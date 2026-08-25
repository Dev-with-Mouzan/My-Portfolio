"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = ["hero", "about", "skills", "projects", "experience", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }

      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Close menu on Escape or when resizing up to desktop
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-accent transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md",
          scrolled || isOpen ? "shadow-md" : ""
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-14 sm:h-16 border-b border-border">
            <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="font-display text-xl sm:text-2xl font-semibold text-foreground cursor-pointer tracking-tight">
              <span className="text-accent">~</span>/mr<span className="text-accent">_</span>
            </a>

            <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              {links.map((link) => {
                const sectionId = link.href.replace("#", "")
                const isActive = activeSection === sectionId
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-accent rounded-full"></span>
                    )}
                  </a>
                )
              })}
            </div>

            {/* Mobile toggle */}
            <button
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className={cn(
                "md:hidden relative p-2 rounded-lg border transition-all duration-300",
                isOpen
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-border bg-white/[0.03] text-foreground hover:text-accent hover:border-accent/40"
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn("md:hidden", !isOpen && "pointer-events-none")}>
        {/* Dim overlay */}
        <div
          aria-hidden
          onClick={() => setIsOpen(false)}
          className={cn(
            "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Dropdown panel */}
        <div
          className={cn(
            "fixed inset-x-3 top-[68px] sm:top-[76px] z-50 rounded-2xl border border-border overflow-hidden shadow-2xl transition-all duration-300 origin-top",
            isOpen
              ? "opacity-100 scale-y-100 translate-y-0"
              : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
          )}
          style={{
            background: "rgba(26,26,24,0.97)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="px-5 pt-4 pb-2 flex items-center justify-between border-b border-border">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="text-accent">$</span> navigate
            </span>
            <span className="font-mono text-[11px] text-muted-foreground/50">
              {String(links.findIndex((l) => l.href === `#${activeSection}`) + 1).padStart(2, "0")}
              /{String(links.length).padStart(2, "0")}
            </span>
          </div>

          <nav className="py-2">
            {links.map((link, i) => {
              const sectionId = link.href.replace("#", "")
              const isActive = activeSection === sectionId
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{ animationDelay: `${i * 45}ms` }}
                  className={cn(
                    "mobile-menu-item relative flex items-center gap-4 px-5 py-3.5 cursor-pointer transition-colors",
                    isActive ? "text-accent bg-accent/[0.08]" : "text-muted-foreground active:bg-white/[0.04]"
                  )}
                >
                  {/* Active left bar */}
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full bg-accent transition-opacity duration-200",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className={cn("font-mono text-xs tabular-nums", isActive ? "text-accent" : "text-muted-foreground/40")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-medium">{link.label}</span>
                  {isActive && (
                    <span className="ml-auto font-mono text-xs text-accent/70">●</span>
                  )}
                </a>
              )
            })}
          </nav>

          {/* Footer strip */}
          <div className="px-5 py-3 border-t border-border flex items-center justify-between">
            <span className="font-mono text-[11px] text-muted-foreground/50">
              ~/mr<span className="text-accent">_</span> portfolio
            </span>
            <span className="font-mono text-[11px] text-muted-foreground/50">esc to close</span>
          </div>
        </div>
      </div>
    </>
  )
}
