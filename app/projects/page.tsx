"use client"

import { Navigation } from "@/components/navigation"

export default function Projects() {
  const projects = [
    {
      title: "API Documentation Creator",
      category: "LLM + Automation",
      description:
        "An AI-assisted tool that automatically generates comprehensive API documentation from code repositories.",
      details: [
        "Leveraged LLMs to analyze source code and extract API patterns",
        "Implemented RAG pipeline for context-aware documentation generation",
        "Built n8n workflow for automated parsing and structuring",
        "Created multi-format output (Markdown, OpenAPI, HTML)",
      ],
      tech: ["LangChain", "OpenAI GPT", "Vector DB", "n8n", "Python"],
    },
    {
      title: "Glorek CRM — AI Enhancements",
      category: "AI Automation",
      description:
        "Integrated intelligent automation into existing CRM platform to streamline customer interactions and data workflows.",
      details: [
        "Deployed AI agents for customer inquiry routing and automated responses",
        "Implemented LLM-powered sentiment analysis on customer feedback",
        "Created n8n workflows for lead scoring and qualification",
        "Reduced manual processing time by 60% through automation",
      ],
      tech: ["AI Agents", "Prompt Engineering", "n8n", "APIs", "Data Pipeline"],
    },
    {
      title: "AI Agent Auto-Connection System",
      category: "Multi-Agent Systems",
      description:
        "Built a sophisticated multi-agent orchestration system for dynamic tool connection and workflow routing.",
      details: [
        "Designed multi-agent architecture with specialized sub-agents",
        "Implemented dynamic routing logic based on task requirements",
        "Created autonomous connection management system",
        "Enabled real-time agent communication and coordination",
      ],
      tech: ["Multi-Agent LLMs", "Tool Use", "Orchestration", "LangChain", "APIs"],
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <section className="max-w-4xl mx-auto px-4 py-20">
          <div className="space-y-12">
            <div>
              <h1 className="text-4xl font-bold mb-4">Projects</h1>
              <p className="text-lg text-muted-foreground">
                Building intelligent systems that combine LLMs, RAG, and automation
              </p>
            </div>

            <div className="space-y-8">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="p-8 bg-card border border-border rounded-lg hover:border-primary transition-colors space-y-6"
                  /* replaced slide-in-up class with inline style */
                  style={{
                    animation: "slide-in-up 0.6s ease-out forwards",
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  <div>
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
                      {project.category}
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 text-primary">Key Accomplishments</h3>
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
                      <span key={t} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                        {t}
                      </span>
                    ))}
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
