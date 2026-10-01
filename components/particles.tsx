"use client"

import { useEffect, useRef } from "react"

interface Dust {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  base: number
  phase: number
  speed: number
  color: string
}

const COLORS = [
  "217, 119, 87", // accent
  "217, 119, 87", // accent (weighted)
  "240, 150, 110", // warm light
  "255, 255, 255", // soft white
]

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let dust: Dust[] = []
    let frame = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createDust = (): Dust => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      size: Math.random() * 1.3 + 0.4,
      base: Math.random() * 0.16 + 0.06,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.015 + 0.005,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    })

    const init = () => {
      dust = []
      const count = Math.floor((canvas.width * canvas.height) / 38000)
      for (let i = 0; i < count; i++) {
        dust.push(createDust())
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      for (const d of dust) {
        d.x += d.vx
        d.y += d.vy

        // Wrap around screen edges
        if (d.x < -5) d.x = canvas.width + 5
        if (d.x > canvas.width + 5) d.x = -5
        if (d.y < -5) d.y = canvas.height + 5
        if (d.y > canvas.height + 5) d.y = -5

        // Gentle twinkle
        const twinkle = 0.65 + 0.35 * Math.sin(frame * d.speed + d.phase)

        ctx.beginPath()
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${d.color}, ${d.base * twinkle})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    const handleResize = () => {
      resize()
      init()
    }

    resize()
    init()
    draw()

    window.addEventListener("resize", handleResize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.55 }}
    />
  )
}
