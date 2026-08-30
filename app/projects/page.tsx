"use client"

import { useRef, useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Particles } from "@/components/particles"
import { CustomCursor } from "@/components/custom-cursor"
import Image from "next/image"

const projects = [
  {
    title: "DevPilot AI",
    category: "AI Assistant",
    image: "/Devpilotai.PNG",
    github: "https://github.com/Dev-with-Mouzan/DevPilot_Ai.git",
    live: "https://www.devpliotai.site/",
    description:
      "An intelligent AI-powered development assistant that helps developers with code generation, debugging, and project management.",
    tech: ["Python", "FastAPI", "LLMs", "AI"],
  },
  {
    title: "CareerCopilot AI",
    category: "Multi-Agent Systems",
    image: "/careercopilot.PNG",
    github: "https://github.com/Dev-with-Mouzan/CareerCopilot_AI.git",
    live: "http://54.206.89.234:8000/",
    description:
      "Multi-agent career assistant built with langgraph and FastAPI using a mixed-LLM setup.",
    tech: ["langgraph", "FastAPI", "Groq", "Gemini", "Python"],
  },
  {
    title: "FounderLens AI",
    category: "Multi-Agent Systems",
    image: "/founderlens ai.PNG",
    github: "https://github.com/Dev-with-Mouzan/FounderLens_AI.git",
    live: "https://founder-lens-ai.vercel.app/",
    description:
      "Multi-agent business analysis system with a sequential 6-agent pipeline for risk, market, and growth insights.",
    tech: ["langgraph", "FastAPI", "LangChain", "Groq", "Gemini", "Python"],
  },
  {
    title: "Literal AI",
    category: "AI Application",
    image: "/Literal_ai.PNG",
    github: "https://github.com/Dev-with-Mouzan/Litera_Ai.git",
    live: "http://3.26.219.151/",
    description:
      "AI-powered platform leveraging language models for intelligent text analysis and processing.",
    tech: ["Python", "LLMs", "AI","arXiv"],
  },
  {
    title: "RepoXray",
    category: "Developer Tool",
    image: "/RepoXray.PNG",
    github: "https://github.com/Dev-with-Mouzan/RepoXray.git",
    live: "https://repo-xray-peach.vercel.app/",
    description:
      "A tool that analyzes and provides deep insights into GitHub repositories.",
    tech: ["Python", "GitHub API", "LLMs", "AI"],
  },
  {
    title: "Fake News Detection",
    category: "GenAI",
    image: "/Facknews_dector.PNG",
    github: "https://github.com/Dev-with-Mouzan/fake-news-detection",
    live: "https://fake-news-detection-lac-seven.vercel.app/",
    description:
      "Classifies news articles as real or fake using LLM-based analysis built with LangChain.",
    tech: ["Python", "LangChain", "LLMs", "NLP","ddgs","gpt-4o-mini"],
  },
  {
    title: "Lead Hunter",
    category: "AI Agent",
    image: "/LeadHunter.PNG",
    github: "https://github.com/Dev-with-Mouzan/Lead_Hunter.git",
    live: "https://lead-hunter-vs96.vercel.app/",
    description:
      "A lead generation Tool that Scrap Goolge Map and discovers, qualifies, and compiles targeted business leads using intelligent web research.",
    tech: ["Python", "ddgs", "googlemaps", "React", "FastAPI"],
  },
]

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // One card per step on mobile, two on larger screens
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector<HTMLElement>("[data-card]")?.offsetWidth || 420
    const gap = isMobile ? 24 : 32
    const scrollAmount = (cardWidth + gap) * (isMobile ? 1 : 2)
    el.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" })
    setTimeout(checkScroll, 400)
  }

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const el = scrollRef.current
      if (!el) return
      const cardWidth = el.querySelector<HTMLElement>("[data-card]")?.offsetWidth || 420
      const gap = isMobile ? 24 : 32
      const scrollAmount = (cardWidth + gap) * (isMobile ? 1 : 2)
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 10
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        el.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
      setTimeout(checkScroll, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [checkScroll, isMobile])

  return (
    <>
      <Navigation />
      <CustomCursor />
      <Particles />
      <main className="min-h-screen relative">
        {/* Background glow effects */}
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-[#6c3cef]/8 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-[#2563eb]/6 rounded-full blur-[180px] pointer-events-none" />

        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <h1 className="font-display text-4xl font-semibold mb-4">Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Building intelligent systems that combine LLMs, RAG, and automation.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          {/* Navigation buttons */}
          <div className="flex items-center justify-end gap-3 mb-6">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`p-3 rounded-xl border transition-all ${
                canScrollLeft
                  ? "border-white/[0.08] bg-white/[0.04] text-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/10"
                  : "border-white/[0.04] bg-white/[0.02] text-foreground/20 cursor-not-allowed"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`p-3 rounded-xl border transition-all ${
                canScrollRight
                  ? "border-white/[0.08] bg-white/[0.04] text-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/10"
                  : "border-white/[0.04] bg-white/[0.02] text-foreground/20 cursor-not-allowed"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-6 sm:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pl-[max(1rem,calc(50%-43vw))] sm:pl-[calc(50%-210px)] scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projects.map((project, i) => {
              const num = String(i + 1).padStart(2, "0")

              return (
                <div
                  key={i}
                  data-card
                  className="group relative rounded-3xl overflow-visible transition-all duration-500 snap-center flex-shrink-0 w-[min(420px,86vw)] h-[540px] sm:h-[500px]"
                  style={{
                    background: "rgb(26 26 24)",
                    border: "1px solid rgba(55,53,50,1)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Purple glow at bottom */}
                  <div
                    className="absolute -bottom-4 left-0 right-0 h-40 pointer-events-none opacity-60 rounded-b-3xl"
                    style={{ background: "linear-gradient(to top, rgba(108,60,239,0.2), rgba(37,99,235,0.08), transparent)" }}
                  />

                  <div className="relative z-10 p-5 sm:p-7 pb-0 flex flex-col">
                    {/* Top row: Number + GitHub/Live buttons */}
                    <div className="flex items-start justify-between mb-8">
                      <span className="font-display text-5xl sm:text-7xl font-black leading-none text-foreground/95 tracking-tighter">
                        {num}
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/10 rounded-lg transition-all"
                        >
                          GitHub
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/10 rounded-lg transition-all"
                        >
                          Live Demo
                        </a>
                      </div>
                    </div>

                    {/* Title + Technologies */}
                    <div className="mb-4">
                      <h2 className="font-display text-2xl sm:text-[26px] font-bold text-foreground mb-2 leading-tight">
                        {project.title}
                      </h2>
                      <p className="text-[13px] text-muted-foreground font-medium mb-1">Technologies used</p>
                      <p className="text-[13px] text-muted-foreground/60">{project.tech.join(", ")}</p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground/70 mb-6 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Full project screenshot at bottom */}
                    <div className="relative w-[calc(100%+40px)] -ml-5 sm:w-[calc(100%+56px)] sm:-ml-7 flex-1 min-h-[180px] overflow-hidden rounded-b-2xl border-t border-white/[0.06] bg-black/30">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-contain object-top p-3"
                        sizes="(max-width: 768px) 500px, 500px"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
            {/* Trailing spacer — gives the last card enough room to snap to center */}
            <div className="flex-shrink-0 w-[max(1rem,calc(50vw-210px))]" aria-hidden="true" />
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: isMobile ? projects.length : Math.ceil(projects.length / 2) }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-muted-foreground/30"
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
