"use client"

import { useEffect, useState } from "react"
import Typewriter from "typed.js"
import AOS from "aos"
import { ArrowUp } from "lucide-react"

export function Animations() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const [stats, setStats] = useState({
    roles: 0,
    projects: 0,
    cgpa: 0,
    years: 0,
  })

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out",
      once: true,
      offset: 50,
    })
  }, [])

  useEffect(() => {
    const typed = new Typewriter("#typewriter-target", {
      strings: [
        "GenAI Developer",
        "RAG Systems Engineer",
        "LLM Application Builder",
        "AI Automation Specialist",
      ],
      autoStart: true,
      loop: true,
      deleteSpeed: 40,
      delay: 80,
    })

    return () => typed.destroy()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)

      const heroSection = document.getElementById("hero")
      if (heroSection && !statsVisible) {
        const rect = heroSection.getBoundingClientRect()
        if (rect.bottom < window.innerHeight) {
          setStatsVisible(true)
          animateStats()
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [statsVisible])

  const animateStats = () => {
    const duration = 1500
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setStats({
        roles: Math.min(2, Math.floor(progress * 2.5)),
        projects: Math.min(3, Math.floor(progress * 3.5)),
        cgpa: Math.min(3.8, progress * 3.9),
        years: Math.min(1, progress * 1.2),
      })

      if (step >= steps) clearInterval(timer)
    }, interval)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <script src="https://unpkg.com/aos@2.3.1/dist/aos.js" defer />
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all z-50"
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          <ArrowUp size={20} />
        </button>
      )}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
