"use client"

import { useEffect, useRef, useState } from "react"

const POINTER_TARGETS = "a, button, [role='button'], [role='link'], [role='tab'], summary, select, [class*='cursor-pointer']"
const TEXT_TARGETS = "input, textarea, [contenteditable]"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  const [isOnPage, setIsOnPage] = useState(false)
  const [osCursor, setOsCursor] = useState<"none" | "pointer" | "text">("none")

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      if (!isOnPage) setIsOnPage(true)
      const target = e.target as Element
      setOsCursor(
        target.closest?.(TEXT_TARGETS)
          ? "text"
          : target.closest?.(POINTER_TARGETS)
            ? "pointer"
            : "none"
      )
    }

    const handleMouseLeave = () => setIsOnPage(false)
    const handleMouseEnter = () => setIsOnPage(true)

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isOnPage])

  useEffect(() => {
    const el = document.documentElement
    el.dataset.cursor = osCursor
    el.style.cursor = osCursor
    return () => {
      delete el.dataset.cursor
      el.style.cursor = ""
    }
  }, [osCursor])

  return (
    <>
      {/* Main cursor - gradient arrow */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden lg:block"
        style={{
          opacity: isOnPage && osCursor === "none" ? 1 : 0,
          transition: "opacity 0.1s",
          willChange: "transform",
        }}
      >
        <svg
          width="19"
          height="22"
          viewBox="0 0 28 32"
          fill="none"
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
