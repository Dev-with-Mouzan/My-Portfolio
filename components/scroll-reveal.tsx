"use client"

import { motion, type HTMLMotionProps } from "framer-motion"

type RevealProps = Omit<
  HTMLMotionProps<"div">,
  "initial" | "whileInView" | "viewport" | "transition" | "children"
> & {
  children: React.ReactNode
  /** Seconds to wait before the reveal starts */
  delay?: number
  /** Total duration of the reveal */
  duration?: number
  /** Vertical travel distance (positive = rises from below) */
  y?: number
  /** Blur amount the element fades out of */
  blur?: number
  /** How much of the element must be visible before triggering */
  amount?: number
}

/**
 * Premium scroll reveal: the element fades in while rising and
 * un-blurring, easing out with a soft spring-like curve.
 * Animates once, when scrolled into view.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 0.75,
  y = 34,
  blur = 10,
  amount = 0.15,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
