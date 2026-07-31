"use client"

import { motion, useMotionValue, useScroll, useSpring, useTransform, type HTMLMotionProps } from "framer-motion"
import { useRef } from "react"

interface TiltCardProps extends HTMLMotionProps<"div"> {
  intensity?: number
  glare?: boolean
}

export function TiltCard({ children, className = "", intensity = 7, glare = true, ...rest }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 160,
    damping: 18,
  })
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 160,
    damping: 18,
  })
  const glareDeg = useTransform(px, [-0.5, 0.5], [0, 120])
  const glareBg = useTransform(glareDeg, (deg) => `linear-gradient(${deg}deg, rgba(217,119,87,0.16), transparent 55%)`)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width - 0.5)
    py.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      className={`group ${className}`}
      {...rest}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  )
}

function Cube({ size = 56, className = "" }: { size?: number; className?: string }) {
  const half = size / 2
  const face = "absolute inset-0 border border-accent/25 bg-accent/5"
  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ width: size, height: size, transformStyle: "preserve-3d" }}
      animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
      transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
    >
      <div className={face} style={{ transform: `translateZ(${half}px)` }} />
      <div className={face} style={{ transform: `rotateY(180deg) translateZ(${half}px)` }} />
      <div className={face} style={{ transform: `rotateY(90deg) translateZ(${half}px)` }} />
      <div className={face} style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }} />
      <div className={face} style={{ transform: `rotateX(90deg) translateZ(${half}px)` }} />
      <div className={face} style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }} />
    </motion.div>
  )
}

function Pyramid({ size = 64, className = "" }: { size?: number; className?: string }) {
  const half = size / 2
  const edge = "absolute inset-0 border border-accent/20"
  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ width: size, height: size, transformStyle: "preserve-3d" }}
      animate={{ rotateX: [60, -60], rotateZ: [0, 360] }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
    >
      <div className={edge} style={{ transform: `rotateY(0deg) translateZ(${half}px) rotateX(35deg)` }} />
      <div className={edge} style={{ transform: `rotateY(90deg) translateZ(${half}px) rotateX(35deg)` }} />
      <div className={edge} style={{ transform: `rotateY(180deg) translateZ(${half}px) rotateX(35deg)` }} />
      <div className={edge} style={{ transform: `rotateY(270deg) translateZ(${half}px) rotateX(35deg)` }} />
    </motion.div>
  )
}

function Ring({ size = 130, className = "" }: { size?: number; className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ width: size, height: size, transformStyle: "preserve-3d" }}
      animate={{ rotateX: [72, 108], rotateZ: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute inset-0 rounded-full border border-accent/20" />
      <div className="absolute inset-3 rounded-full border border-accent/15" />
    </motion.div>
  )
}

function FloatWrapper({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={`absolute pointer-events-none ${className}`}
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  )
}

export function FloatingShapes() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      <FloatWrapper className="top-[18%] left-[6%] hidden md:block" delay={0.4}>
        <Ring size={120} />
      </FloatWrapper>
      <FloatWrapper className="top-[12%] right-[10%] hidden lg:block" delay={1.1}>
        <Cube size={52} />
      </FloatWrapper>
      <FloatWrapper className="top-[55%] left-[12%] hidden xl:block" delay={0.8}>
        <Pyramid size={56} />
      </FloatWrapper>
      <FloatWrapper className="bottom-[16%] right-[8%] hidden md:block" delay={0.2}>
        <Ring size={150} />
      </FloatWrapper>
      <FloatWrapper className="bottom-[28%] right-[22%] hidden lg:block" delay={1.6}>
        <Cube size={34} />
      </FloatWrapper>
      <FloatWrapper className="top-[38%] right-[3%] hidden xl:block" delay={2}>
        <Pyramid size={34} />
      </FloatWrapper>
    </div>
  )
}

export function ScrollCube({ size = 104, className = "" }: { size?: number; className?: string }) {
  const { scrollYProgress } = useScroll()
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 720])
  const rotateX = useTransform(scrollYProgress, [0, 1], [380, 20])
  const half = size / 2
  const face = "absolute inset-0 border border-accent/30 bg-accent/5"

  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ width: size, height: size, transformStyle: "preserve-3d", rotateX, rotateY }}
    >
      <div className={face} style={{ transform: `translateZ(${half}px)` }} />
      <div className={face} style={{ transform: `rotateY(180deg) translateZ(${half}px)` }} />
      <div className={face} style={{ transform: `rotateY(90deg) translateZ(${half}px)` }} />
      <div className={face} style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }} />
      <div className={face} style={{ transform: `rotateX(90deg) translateZ(${half}px)` }} />
      <div className={face} style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }} />
    </motion.div>
  )
}

export function Reveal3D({
  children,
  className = "",
  delay = 0,
  ...rest
}: {
  children: React.ReactNode
  className?: string
  delay?: number
} & HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 42, rotateX: 16 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      style={{ transformPerspective: 900 }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
