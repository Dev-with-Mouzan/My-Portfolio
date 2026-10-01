"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)

  const [isOnPage, setIsOnPage] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      if (haloRef.current) {
        haloRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
      }
      if (!isOnPage) setIsOnPage(true)
    }

    const handleMouseLeave = () => setIsOnPage(false)
    const handleMouseEnter = () => setIsOnPage(true)

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    // Hide default cursor immediately
    document.documentElement.style.cursor = "none"

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.documentElement.style.cursor = ""
    }
  }, [isOnPage])

  return (
    <>
      {/* Soft pulsing glow halo that follows the cursor */}
      <div
        ref={haloRef}
        aria-hidden
        className="fixed top-0 left-0 z-[9998] hidden lg:block pointer-events-none"
        style={{
          width: 110,
          height: 110,
          opacity: isOnPage ? 1 : 0,
          transition: "opacity 0.3s",
          willChange: "transform",
        }}
      >
        <div
          className="w-full h-full rounded-full animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(217,119,87,0.22) 0%, rgba(217,119,87,0.08) 45%, rgba(217,119,87,0) 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse"
          style={{
            width: 36,
            height: 36,
            animationDelay: "0.4s",
            background:
              "radial-gradient(circle, rgba(240,150,110,0.30) 0%, rgba(217,119,87,0.12) 55%, rgba(217,119,87,0) 75%)",
          }}
        />
      </div>

      {/* Main cursor - gradient arrow */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:block"
        style={{
          opacity: isOnPage ? 1 : 0,
          transition: "opacity 0.1s",
          willChange: "transform",
        }}
      >
        <svg
          width="19"
          height="22"
          viewBox="0 0 28 32"
          fill="none"
          style={{ filter: "drop-shadow(0 2px 8px rgba(217,119,87,0.4))" }}
        >
          <defs>
            <linearGradient id="cursorGrad" x1="0" y1="0" x2="28" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFD166" />
              <stop offset="40%" stopColor="#F4A261" />
              <stop offset="70%" stopColor="#E76F51" />
              <stop offset="100%" stopColor="#D946A8" />
            </linearGradient>
          </defs>
          <path
            d="M2 2L2 24L8.5 18.5L14 28L18 26L12.5 16.5L20 16L2 2Z"
            fill="url(#cursorGrad)"
            stroke="rgba(0,0,0,0.3)"
            strokeWidth="0.5"
          />
        </svg>
      </div>


    </>
  )
}
