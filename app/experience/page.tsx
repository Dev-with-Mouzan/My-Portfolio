"use client"

import { Navigation } from "@/components/navigation"

export default function Experience() {
  const experience = [
    {
      role: "Freelance GenAI Developer",
      company: "Independent Freelancer",
      period: "Dec 2025 - Present",
      description: "Working full-time as a freelancer, mainly with local clients, delivering academic and production AI projects",
      responsibilities: [
        "Specializing in GenAI and LLM-based systems — multi-agent architectures, RAG pipelines, and agentic workflows",
        "Delivered freelance projects including a Fake News Detection System (LangChain), AI Study Planner, Fruit Classification System, Role-Based Prompt Generator, and a Code Reviewer (LangGraph + LangChain)",
        "Currently building a multi-agent system that autonomously generates freelance leads",
      ],
    },
    {
      role: "ML Engineer (Internship)",
      company: "WebTech.dev, Vehari",
      period: "Jun 2025 - Dec 2025",
      description: "6-month internship in Machine Learning",
      responsibilities: [
        "Trained machine learning models on real client datasets",
        "Monitored model performance in production and iterated to maintain accuracy",
      ],
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <section className="max-w-4xl mx-auto px-4 py-20">
          <div className="space-y-12">
            <div>
              <h1 className="font-display text-4xl font-semibold mb-4">Experience</h1>
              <p className="text-lg text-muted-foreground">
                Specialized in GenAI systems, LLM applications, and intelligent automation
              </p>
            </div>

            <div className="space-y-8">
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="p-8 bg-card border border-border rounded-lg hover:border-accent/40 transition-colors space-y-6"
                  /* replaced slide-in-up class with inline style */
                  style={{
                    animation: "slide-in-up 0.6s ease-out forwards",
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-display text-2xl font-semibold">{exp.role}</h2>
                        <p className="text-accent font-semibold">{exp.company}</p>
                      </div>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">{exp.period}</span>
                    </div>
                    <p className="text-muted-foreground mt-2">{exp.description}</p>
                  </div>

                  <div>
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider mb-3 text-accent">Key Responsibilities</h3>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, j) => (
                        <li key={j} className="flex gap-3">
                          <span className="text-accent mt-1">→</span>
                          <span className="text-muted-foreground text-sm">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
