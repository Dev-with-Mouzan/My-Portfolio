"use client"

import { Navigation } from "@/components/navigation"
import { TiltCard } from "@/components/three-d"

export default function Projects() {
  const projects = [
    {
      title: "CareerCopilot AI",
      category: "Multi-Agent Systems",
      description:
        "Multi-agent career assistant built with CrewAI and FastAPI using a mixed-LLM setup — Groq (Llama-3.1) for fast tool-calling web scraping and Gemini for deep ATS analysis and strategic reasoning.",
      details: [
        "User uploads a resume; a job-hunter agent scrapes and fetches relevant listings from multiple job platforms and APIs",
        "ATS-analyst agent scores the resume against each job with structured (Pydantic) output",
        "Career-strategist agent builds a learning plan using TF-IDF-based retrieval over saved job data",
        "Conversational chatbot with short-term memory for resume improvement suggestions",
      ],
      tech: ["CrewAI", "FastAPI", "Groq (Llama-3.1)", "Gemini", "Pydantic", "Python"],
    },
    {
      title: "FounderLens AI",
      category: "Multi-Agent Systems",
      description:
        "Multi-agent business analysis system built with CrewAI and FastAPI. A sequential 6-agent pipeline processes business data to generate insights on risk, market trends, growth strategies, and outcome simulations.",
      details: [
        "User provides business data via CSV, PDF, or website link",
        "Sequential 6-agent pipeline: intake, insight, conflict, planning, simulation, and recovery agents",
        "Multi-source input orchestrator with automated conflict/contradiction detection across data sources",
        "Custom CrewAI tools for competitor search and constraint validation",
        "Supabase-backed persistence with local fallback",
      ],
      tech: ["CrewAI", "FastAPI", "LangChain", "Supabase", "Python"],
    },
    {
      title: "Fake News Detection System",
      category: "GenAI",
      description:
        "Freelance academic project that classifies news articles as real or fake using LLM-based analysis built with LangChain.",
      details: [
        "Text ingestion and preprocessing pipeline",
        "LLM-powered classification with confidence scoring",
        "Built for final-year students as a complete academic deliverable",
      ],
      tech: ["Python", "LangChain", "LLMs", "NLP"],
    },
    {
      title: "Code Reviewer",
      category: "Agentic AI",
      description:
        "Agentic code review system built with LangGraph + LangChain that analyzes code, identifies bugs and anti-patterns, and suggests concrete improvements.",
      details: [
        "Code ingestion and analysis via LangGraph state graph",
        "Automated issue detection for bugs and anti-patterns",
        "Actionable, context-aware improvement suggestions",
      ],
      tech: ["Python", "LangGraph", "LangChain", "LLMs"],
    },
    {
      title: "AI Study Planner",
      category: "GenAI",
      description:
        "Intelligent study planner that generates personalized study schedules and revision plans based on subjects, deadlines, and available time.",
      details: [
        "Generates personalized study schedules from subject and deadline inputs",
        "Builds revision plans adapted to available time",
        "Delivered as a freelance academic project",
      ],
      tech: ["Python", "LLMs", "LangChain"],
    },
    {
      title: "Fruit Classification System",
      category: "Computer Vision",
      description:
        "Deep learning image classification system that recognizes fruit types — a complete CNN-based classification project.",
      details: [
        "Image preprocessing and augmentation pipeline",
        "CNN-based classification model",
        "Evaluated on held-out test data",
      ],
      tech: ["Python", "TensorFlow", "Keras", "CNN"],
    },
    {
      title: "Role-Based Prompt Generator",
      category: "Prompt Engineering",
      description:
        "Tool that generates tailored prompts based on the user's role and context, making LLM usage more effective across professional scenarios.",
      details: [
        "Role-aware prompt templates",
        "Context-based prompt customization",
        "Built as a freelance academic project",
      ],
      tech: ["Python", "Prompt Engineering", "LLMs"],
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <section className="max-w-4xl mx-auto px-4 py-20">
          <div className="space-y-12">
            <div>
              <h1 className="font-display text-4xl font-semibold mb-4">Projects</h1>
              <p className="text-lg text-muted-foreground">
                Building intelligent systems that combine LLMs, RAG, and automation
              </p>
            </div>

            <div className="space-y-8">
              {projects.map((project, i) => (
                <TiltCard key={i} intensity={5} className="rounded-lg">
                <div
                  className="p-8 bg-card border border-border rounded-lg hover:border-accent/40 transition-colors space-y-6"
                  style={{
                    animation: "slide-in-up 0.6s ease-out forwards",
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  <div>
                    <div className="inline-block px-3 py-1 bg-accent/10 text-accent border border-accent/30 font-mono text-[11px] font-bold uppercase tracking-wider rounded-md mb-3">
                      {project.category}
                    </div>
                    <h2 className="font-display text-2xl font-semibold mb-2">{project.title}</h2>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>

                  <div>
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider mb-3 text-accent">Key Accomplishments</h3>
                    <ul className="space-y-2">
                      {project.details.map((detail, j) => (
                        <li key={j} className="flex gap-3">
                          <span className="text-accent mt-1">→</span>
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
