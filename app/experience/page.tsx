"use client"

import { Navigation } from "@/components/navigation"

export default function Experience() {
  const experience = [
    {
      role: "AI Automation Engineer",
      company: "Zacorder",
      period: "2023 - Present",
      description: "Led AI automation initiatives and prototype development",
      responsibilities: [
        "Architected LLM-powered automation workflows using n8n and custom agents",
        "Designed and implemented RAG systems for intelligent document processing",
        "Developed prompt engineering strategies for complex reasoning tasks",
        "Built multi-agent systems for autonomous workflow orchestration",
      ],
    },
    {
      role: "AI Workflow Specialist",
      company: "FHQ-CUPS-JGN",
      period: "2022 - 2023",
      description: "Deployed AI automation and managed learning initiatives",
      responsibilities: [
        "Implemented n8n workflows for API-based automation and AI system integration",
        "Designed and optimized RAG pipelines for information retrieval",
        "Performed prompt engineering for LLM fine-tuning and adaptation",
        "Conducted research on emerging AI agent architectures and patterns",
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
              <h1 className="text-4xl font-bold mb-4">Experience</h1>
              <p className="text-lg text-muted-foreground">
                Specialized in GenAI systems, LLM applications, and intelligent automation
              </p>
            </div>

            <div className="space-y-8">
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="p-8 bg-card border border-border rounded-lg space-y-6"
                  /* replaced slide-in-up class with inline style */
                  style={{
                    animation: "slide-in-up 0.6s ease-out forwards",
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold">{exp.role}</h2>
                        <p className="text-primary font-semibold">{exp.company}</p>
                      </div>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">{exp.period}</span>
                    </div>
                    <p className="text-muted-foreground mt-2">{exp.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-primary">Key Responsibilities</h3>
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
