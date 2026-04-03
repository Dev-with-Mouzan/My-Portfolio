import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Providers } from "@/components/providers"

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mouzan Raza - GenAI Engineer | RAG Systems & LLM Applications",
  description:
    "GenAI Engineer specializing in RAG systems, LLM applications, ML pipelines, and intelligent backends. Professional, proven, and available for full-time, freelance, and collaboration.",
  keywords: "GenAI, LLM, AI Agents, RAG, LangChain, Prompt Engineering, Machine Learning, Backend Developer, AI Engineer",
  authors: [{ name: "Mouzan Raza" }],
  openGraph: {
    title: "Mouzan Raza - GenAI Engineer",
    description: "I build production-ready AI applications — RAG systems, LLM pipelines, and intelligent backends that solve real problems.",
    type: "website",
    locale: "en_US",
    siteName: "Mouzan Raza Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mouzan Raza - GenAI Engineer",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
