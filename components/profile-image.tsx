"use client"

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"

export function ProfileImage() {
    const ref = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()

        const width = rect.width
        const height = rect.height

        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5

        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="relative w-72 h-96 md:w-80 md:h-[450px] cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {/* Animated background glow */}
            <motion.div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-0 bg-gradient-to-br from-primary/30 via-purple-500/30 to-pink-500/20 rounded-3xl blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Main image container */}
            <motion.div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className="relative h-full w-full rounded-3xl border-2 border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm shadow-2xl overflow-hidden"
            >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20 mix-blend-overlay z-10" />

                <img
                    src="/mouzan-profile.png"
                    alt="Mouzan Raza"
                    className="h-full w-full object-cover rounded-3xl"
                    style={{ objectPosition: "center top" }}
                />

                {/* Dynamic glossy reflection */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
                    style={{
                        transform: "translateZ(10px)",
                    }}
                />

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-10" />
            </motion.div>

            {/* Floating Elements with enhanced animations */}
            <motion.div
                style={{ transform: "translateZ(120px)" }}
                className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-md rounded-full border-2 border-white/30 flex items-center justify-center shadow-xl"
                animate={{
                    y: [0, -10, 0],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <div className="w-4 h-4 bg-primary rounded-full animate-ping" />
            </motion.div>

            <motion.div
                style={{ transform: "translateZ(100px)" }}
                className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-purple-500/30 to-pink-500/10 backdrop-blur-md rounded-full border-2 border-white/30 flex items-center justify-center shadow-xl"
                animate={{
                    y: [0, 10, 0],
                    rotate: [360, 180, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <div className="w-5 h-5 bg-purple-500 rounded-full animate-pulse" />
            </motion.div>

            {/* Additional floating particle */}
            <motion.div
                style={{ transform: "translateZ(90px)" }}
                className="absolute top-1/2 -left-4 w-12 h-12 bg-gradient-to-br from-pink-500/20 to-primary/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg"
                animate={{
                    x: [-5, 5, -5],
                    y: [-10, 10, -10],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <div className="w-2 h-2 bg-pink-500 rounded-full m-auto mt-5 animate-pulse" />
            </motion.div>
        </motion.div>
    )
}
