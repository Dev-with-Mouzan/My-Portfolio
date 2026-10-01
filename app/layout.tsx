import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Chatbot } from "@/components/chatbot"
import { BootSequence } from "@/components/boot-sequence"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Mouzan Raza - AI Engineer | LLM, RAG & Agentic Systems",
  description:
    "AI Engineer with 1+ year of hands-on experience building LLM applications, RAG pipelines, multi-agent systems, and end-to-end ML solutions. Professional, proven, and available for full-time, freelance, and collaboration.",
  keywords: "AI Engineer, GenAI, LLM, AI Agents, RAG, LangGraph, CrewAI, Prompt Engineering, Machine Learning, FastAPI, AWS",
  authors: [{ name: "Mouzan Raza" }],
  openGraph: {
    title: "Mouzan Raza - AI Engineer",
    description: "I build production-ready AI applications — RAG systems, LLM pipelines, and intelligent backends that solve real problems.",
    type: "website",
    locale: "en_US",
    siteName: "Mouzan Raza Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mouzan Raza - AI Engineer",
    description: "Building intelligent systems using LLMs, RAG, and automation workflows.",
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      </head>
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <div aria-hidden className="scanlines pointer-events-none fixed inset-0 z-[60]" />
        <div aria-hidden className="crt-vignette pointer-events-none fixed inset-0 z-[59]" />
        <BootSequence />
        <Providers>{children}</Providers>
        <Chatbot />
        <Analytics />
      </body>
    </html>
  )
}
