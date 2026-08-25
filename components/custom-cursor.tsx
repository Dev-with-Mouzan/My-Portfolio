"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

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
          width="28"
          height="32"
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
