"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Code2, ExternalLink } from "lucide-react"

export interface FanProject {
  title: string
  category: string
  image: string
  github: string
  live: string
  description: string
  tech: string[]
}

function getHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return "Live Demo"
  }
}

const navButton =
  "p-3 rounded-xl border transition-all border-white/[0.08] bg-white/[0.04] text-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/10"

// Responsive fan spacing — computed in JS so the layout never depends on stylesheet state
function useFanGap() {
  const [layout, setLayout] = useState({ gap: 250, compact: false })

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) setLayout({ gap: 165, compact: true })
      else if (w < 1024) setLayout({ gap: 210, compact: false })
      else setLayout({ gap: 250, compact: false })
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return layout
}

export function ProjectFanStack({ projects, autoAdvanceMs = 5000 }: { projects: FanProject[]; autoAdvanceMs?: number }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const { gap, compact } = useFanGap()
  const count = projects.length

  const go = useCallback((dir: number) => setActive((prev) => (prev + dir + count) % count), [count])

  // Auto-advance like the old carousel — pauses while hovering
  useEffect(() => {
    if (paused || count < 2) return
    const id = setInterval(() => go(1), autoAdvanceMs)
    return () => clearInterval(id)
  }, [paused, count, go, autoAdvanceMs, active])

  return (
    <div className="project-fan relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Fanned card stack */}
      <div className="relative h-[580px] sm:h-[600px] overflow-hidden">
        {projects.map((project, i) => {
          // Shortest signed distance from the active card so the stack wraps around
          let offset = i - active
          if (offset > count / 2) offset -= count
          if (offset < -count / 2) offset += count

          const abs = Math.abs(offset)
          const isActive = offset === 0
          const far = abs > 2
          const hidden = far || (compact && abs === 2)

          const scale = abs === 0 ? 1 : abs === 1 ? 0.92 : 0.84
          const y = abs === 0 ? -18 : abs === 1 ? 8 : 22
          const opacity = far ? 0 : abs === 2 ? 0.55 : abs === 1 ? 0.85 : 1
          const z = abs === 0 ? 40 : abs === 1 ? 30 : 20

          return (
            <article
              key={i}
              data-abs={abs}
              onClick={() => !isActive && setActive(i)}
              aria-hidden={far}
              className={`fan-card absolute left-1/2 top-1/2 w-[min(380px,82vw)] h-[500px] sm:h-[520px] rounded-3xl overflow-hidden flex flex-col transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive ? "cursor-default" : "cursor-pointer"
              }`}
              style={{
                transform: `translate(-50%, -50%) translateX(${offset * gap}px) translateY(${y}px) scale(${scale})`,
                zIndex: z,
                opacity,
                display: hidden ? "none" : undefined,
                pointerEvents: far ? "none" : "auto",
                background: "rgb(26 26 24)",
                border: isActive ? "1px solid rgba(217,119,87,0.55)" : "1px solid rgba(55,53,50,1)",
                boxShadow: isActive
                  ? "0 30px 70px rgba(0,0,0,0.55)"
                  : "0 14px 34px rgba(0,0,0,0.4)",
              }}
            >
              {/* Screenshot */}
              <div className="relative h-[168px] shrink-0 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 82vw, 380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgb(26,26,24)] via-[rgb(26,26,24)]/10 to-transparent" />
              </div>

              {/* Body */}
              <div className="flex flex-col grow p-5 min-h-0">
                <h3 className="font-display text-lg font-bold text-foreground mb-1.5 truncate">{project.title}</h3>

                <p className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-3 truncate">
                  <Code2 size={13} className="shrink-0 text-accent" />
                  {project.category}
                </p>

                <p className="text-[12px] font-bold text-foreground mb-1">Description</p>
                <p className="text-[12px] leading-relaxed text-muted-foreground line-clamp-3 mb-4">
                  {project.description}
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">Stack</p>
                    <p className="text-[13px] font-bold text-accent truncate">{project.tech[0]}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">Status</p>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[13px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      Live
                    </a>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">Code</p>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[13px] font-bold text-sky-400 hover:text-sky-300 transition-colors"
                    >
                      GitHub
                    </a>
                  </div>
                </div>

                {/* Bottom row: website + circular action button */}
                <div className="mt-auto flex items-end justify-between gap-3 pt-4 border-t border-white/[0.06]">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-1">Website</p>
                    <p className="text-[13px] font-bold text-foreground truncate">{getHost(project.live)}</p>
                  </div>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Open ${project.title} live demo`}
                    className="shrink-0 w-11 h-11 rounded-full bg-accent text-background flex items-center justify-center hover:scale-105 transition-all"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button onClick={() => go(-1)} aria-label="Previous project" className={navButton}>
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {projects.map((project, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show ${project.title}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-accent" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
            />
          ))}
        </div>

        <button onClick={() => go(1)} aria-label="Next project" className={navButton}>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
