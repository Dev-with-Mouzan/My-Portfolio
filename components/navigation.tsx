"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeSwitcher } from "./theme-switcher"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 transition-all duration-300",
          scrolled ? "pt-4" : "pt-6"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 w-full max-w-5xl",
            scrolled || isOpen
              ? "bg-background/80 backdrop-blur-xl border border-primary/20 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3),0_0_0_1px_rgba(var(--primary),0.1),0_20px_40px_-10px_rgba(var(--primary),0.4)]"
              : "bg-background/40 backdrop-blur-md border border-white/10 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.2)]"
          )}
        >
          <Link href="/" className="text-2xl font-bold gradient-text relative z-50">
            MR
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-[17px] font-semibold transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-foreground/80"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-4">
            <ThemeSwitcher />

            {/* Mobile Toggle */}
            <button
              className="md:hidden relative z-50 p-2 hover:bg-accent rounded-full transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden pt-24 px-6"
          >
            <div className="flex flex-col gap-4">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block text-2xl font-semibold py-4 border-b border-border/50",
                      pathname === link.href ? "text-primary gradient-text" : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
