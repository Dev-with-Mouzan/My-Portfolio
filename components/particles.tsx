"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
  maxLife: number
}

const COLORS = [
  "217, 119, 87",   // accent (primary)
  "217, 119, 87",   // accent (weighted)
  "217, 119, 87",   // accent (weighted)
  "180, 100, 70",   // darker accent
  "240, 150, 110",  // lighter accent
]

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    let frame = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const createParticle = (x?: number, y?: number): Particle => ({
      x: x ?? Math.random() * canvas.width,
      y: y ?? Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 0,
      maxLife: Math.random() * 600 + 200,
    })

    const init = () => {
      particles = []
      const count = Math.floor((canvas.width * canvas.height) / 12000)
      for (let i = 0; i < count; i++) {
        particles.push(createParticle())
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      // Spawn particles near mouse
      if (frame % 3 === 0 && mouseRef.current.x > 0) {
        for (let i = 0; i < 2; i++) {
          particles.push(createParticle(
            mouseRef.current.x + (Math.random() - 0.5) * 40,
            mouseRef.current.y + (Math.random() - 0.5) * 40
          ))
        }
      }

      particles.forEach((p, i) => {
        p.life++
        p.x += p.vx
        p.y += p.vy

        // Mouse repulsion
        const dx = p.x - mouseRef.current.x
        const dy = p.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100 && dist > 0) {
          const force = (100 - dist) / 100
          p.vx += (dx / dist) * force * 0.3
          p.vy += (dy / dist) * force * 0.3
        }

        // Damping
        p.vx *= 0.99
        p.vy *= 0.99

        // Wrap around
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -10) p.y = canvas.height + 10
        if (p.y > canvas.height + 10) p.y = -10

        // Fade based on life
        const lifeRatio = p.life / p.maxLife
        const fade = lifeRatio < 0.1 ? lifeRatio * 10 : lifeRatio > 0.9 ? (1 - lifeRatio) * 10 : 1
        const alpha = p.opacity * fade

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${alpha})`
        ctx.fill()

        // Glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${alpha * 0.15})`
        ctx.fill()
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 100) {
            const alpha = 0.04 * (1 - dist / 100)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(217, 119, 87, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Remove dead particles and respawn
      particles = particles.filter(p => p.life < p.maxLife)
      const targetCount = Math.floor((canvas.width * canvas.height) / 12000)
      while (particles.length < targetCount) {
        particles.push(createParticle())
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    init()
    draw()

    window.addEventListener("resize", () => { resize(); init() })
    document.addEventListener("mousemove", handleMouse)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      document.removeEventListener("mousemove", handleMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  )
}
