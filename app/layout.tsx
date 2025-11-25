import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Providers } from "@/components/providers"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mouzan Raza - GenAI Engineer | LLM & AI Agent Specialist",
  description:
    "GenAI Engineer specializing in LLM applications, AI agents, RAG pipelines, and automation workflows. Building intelligent systems with cutting-edge AI technologies.",
  keywords: "GenAI, LLM, AI Agents, RAG, LangChain, Prompt Engineering, n8n, AI Automation",
  openGraph: {
    title: "Mouzan Raza - GenAI Engineer",
    description: "Building intelligent systems using LLMs, AI agents, and automation workflows.",
    type: "website",
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
      <body className={`font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
