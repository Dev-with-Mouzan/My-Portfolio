"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface LazyImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export function LazyImage({ src, alt, width, height, className }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {isLoaded && (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          /* replaced animate-fade-in class with inline style */
          style={{ animation: "fade-in 0.6s ease-in forwards" }}
          priority={false}
        />
      )}
    </div>
  )
}
