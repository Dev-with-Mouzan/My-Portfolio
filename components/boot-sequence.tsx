"use client"

import { useEffect, useState } from "react"

const BOOT_LINES = [
  "> MOZ-OS v3.5.1 — mouzan_raza_portfolio",
  "> mounting /dev/mouzan ... ok",
  "> loading knowledge_base.sys ... ok",
  "> init neural_net: rag_engine ... ok",
  "> agent_status: open_to_work",
  "> welcome, human_",
]

export function BootSequence() {
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (
      sessionStorage.getItem("mouz_booted") === "1" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }
    sessionStorage.setItem("mouz_booted", "1")
    setVisible(true)
  }, [])

  useEffect(() => {
    if (!visible) return
    if (count < BOOT_LINES.length) {
      const t = setTimeout(() => setCount((c) => c + 1), 200)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setFading(true), 300)
    return () => clearTimeout(t)
  }, [visible, count])

  useEffect(() => {
    if (!fading) return
    const t = setTimeout(() => setVisible(false), 500)
    return () => clearTimeout(t)
  }, [fading])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[80] bg-background flex items-center justify-center px-6"
      style={{ opacity: fading ? 0 : 1, transition: "opacity 450ms ease" }}
    >
      <div className="font-mono text-sm sm:text-base leading-relaxed text-foreground">
        {BOOT_LINES.slice(0, count).map((line, i) => (
          <p key={i} className={i === 0 ? "text-accent" : ""}>
            {line}
          </p>
        ))}
        <p className="text-accent">
          <span className="terminal-caret">▊</span>
        </p>
      </div>
    </div>
  )
}
