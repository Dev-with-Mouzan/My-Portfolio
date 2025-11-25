"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

const themes = [
  { name: "Light", value: "light" },
  { name: "Dark", value: "dark" },
  { name: "Green", value: "green" },
  { name: "Gray", value: "gray" },
  { name: "Hacking", value: "hacking" },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center justify-center w-10 h-10 rounded-md border border-border hover:bg-muted transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

function cn(...classes: (string | undefined | boolean)[]): string {
  return classes.filter((c) => typeof c === "string" && c).join(" ")
}
