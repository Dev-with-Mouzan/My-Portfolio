"use client"

import { Navigation } from "@/components/navigation"
import { Particles } from "@/components/particles"
import { CustomCursor } from "@/components/custom-cursor"
import { ProjectFanStack } from "@/components/project-fan-stack"
import { Reveal } from "@/components/scroll-reveal"

const projects = [
  {
    title: "DevPilot AI",
    category: "AI Assistant",
    image: "/Devpilotai.PNG",
    github: "https://github.com/Dev-with-Mouzan/DevPilot_Ai.git",
    live: "https://www.devpliotai.site/",
    description:
      "Multi-agent software engineering platform where AI agents plan, implement, review, test, and deploy software projects — with stateful workflows, persistent memory, tool calling, Git checkpoints, retry/recovery, and human-in-the-loop controls.",
    tech: ["Python", "LangGraph", "FastAPI", "React", "Tailwind CSS", "Docker", "AWS"],
  },
  {
    title: "CareerCopilot AI",
    category: "Multi-Agent Systems",
    image: "/careercopilot.PNG",
    github: "https://github.com/Dev-with-Mouzan/CareerCopilot_AI.git",
    live: "http://54.206.89.234:8000/",
    description:
      "Agentic career intelligence platform built with LangGraph and FastAPI — resume analysis, job discovery, job matching, ATS evaluation, career planning, and interview preparation.",
    tech: ["LangGraph", "FastAPI", "React", "Redis", "Docker", "AWS", "Python"],
  },
  {
    title: "FounderLens AI",
    category: "Multi-Agent Systems",
    image: "/founderlens ai.PNG",
    github: "https://github.com/Dev-with-Mouzan/FounderLens_AI.git",
    live: "https://founder-lens-ai.vercel.app/",
    description:
      "Multi-agent startup validation system running parallel competitive, market, and risk analysis with quality-control and automatic retry workflows.",
    tech: ["LangGraph", "FastAPI", "React", "Docker", "AWS", "Python"],
  },
  {
    title: "Literal AI",
    category: "AI Application",
    image: "/Literal_ai.PNG",
    github: "https://github.com/Dev-with-Mouzan/Litera_Ai.git",
    live: "http://3.26.219.151/",
    description: "AI-powered platform leveraging language models for intelligent text analysis and processing.",
    tech: ["Python", "LLMs", "AI", "arXiv"],
  },
  {
    title: "RepoXray",
    category: "Developer Tool",
    image: "/RepoXray.PNG",
    github: "https://github.com/Dev-with-Mouzan/RepoXray.git",
    live: "https://repo-xray-peach.vercel.app/",
    description: "A tool that analyzes and provides deep insights into GitHub repositories.",
    tech: ["Python", "GitHub API", "LLMs", "AI"],
  },
  {
    title: "Fake News Detection",
    category: "GenAI",
    image: "/Facknews_dector.PNG",
    github: "https://github.com/Dev-with-Mouzan/fake-news-detection",
    live: "https://fake-news-detection-lac-seven.vercel.app/",
    description: "Classifies news articles as real or fake using LLM-based analysis built with LangChain.",
    tech: ["Python", "LangChain", "LLMs", "NLP", "ddgs", "gpt-4o-mini"],
  },
  {
    title: "Lead Hunter",
    category: "AI Agent",
    image: "/LeadHunter.PNG",
    github: "https://github.com/Dev-with-Mouzan/Lead_Hunter.git",
    live: "https://lead-hunter-vs96.vercel.app/",
    description:
      "A lead generation tool that scrapes Google Maps and discovers, qualifies, and compiles targeted business leads using intelligent web research.",
    tech: ["Python", "ddgs", "googlemaps", "React", "FastAPI"],
  },
]

export default function Projects() {
  return (
    <>
      <Navigation />
      <CustomCursor />
      <Particles />
      <main className="min-h-screen relative">
        {/* Background glow effects */}
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-[#6c3cef]/8 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-[#2563eb]/6 rounded-full blur-[180px] pointer-events-none" />

        {/* Header */}
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <h1 className="font-display text-4xl font-semibold mb-4">Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Building intelligent systems that combine LLMs, RAG, and automation.
          </p>
        </Reveal>

        {/* Fanned card stack */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <ProjectFanStack projects={projects} />
        </div>
      </main>
    </>
  )
}
