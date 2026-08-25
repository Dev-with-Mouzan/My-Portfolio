"use client"

import { Navigation } from "@/components/navigation"
import { TiltCard } from "@/components/three-d"
import { MapPin, Calendar, Zap } from "lucide-react"

export default function Experience() {
  const experience = [
    {
      role: "Freelance GenAI Developer",
      company: "Independent Freelancer",
      period: "Dec 2025 - Present",
      location: "Remote",
      type: "Full-time Freelance",
      responsibilities: [
        "Working full-time as a freelancer, primarily with local clients, delivering academic and production AI projects.",
        "Specializing in GenAI and LLM-based systems — multi-agent architectures, RAG pipelines, and agentic workflows.",
        "Delivered projects including Fake News Detection (LangChain), AI Study Planner, Fruit Classification, Role-Based Prompt Generator, and Code Reviewer (LangGraph).",
        "Currently building a multi-agent system that autonomously generates freelance leads.",
      ],
      tech: ["CrewAI", "LangGraph", "LangChain", "Python", "RAG", "LLMs", "FastAPI"],
    },
    {
      role: "ML Engineer (Internship)",
      company: "WebTech.dev, Vehari",
      period: "Jun 2025 - Dec 2025",
      location: "Vehari, Pakistan",
      type: "6-Month Internship",
      responsibilities: [
        "Trained machine learning models on real client datasets.",
        "Monitored model performance in production and iterated to maintain accuracy.",
      ],
      tech: ["Python", "Scikit-learn", "TensorFlow", "Pandas", "MLOps"],
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <section className="max-w-4xl mx-auto px-4 py-20">
          <div className="space-y-16">
            {/* Header */}
            <div>
              <h1 className="font-display text-4xl font-semibold mb-4">Experience</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Specialized in GenAI systems, LLM applications, and intelligent automation — from internship to full-time freelance.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-border"></div>
              <div className="absolute left-6 top-0 bottom-0 w-px bg-accent/40 origin-top" style={{ height: "100%" }}></div>

              <div className="space-y-12">
                {experience.map((exp, i) => (
                  <div key={i} className="relative pl-16">
                    {/* Timeline dot */}
                    <div className="absolute left-4 top-8 w-4 h-4 rounded-full bg-background border-2 border-accent shadow-[0_0_12px_rgba(217,119,87,0.35)] z-10"></div>

                    <TiltCard intensity={5} className="h-full rounded-lg">
                      <div className="bg-card border border-border rounded-lg p-8 hover:border-accent/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-accent/5 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/10 transition-colors duration-500 pointer-events-none"></div>

                        <div className="relative z-10">
                          {/* Meta badges */}
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/30 rounded-md">
                              <Calendar size={12} /> {exp.period}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-muted-foreground bg-secondary border border-border rounded-md">
                              <MapPin size={12} /> {exp.location}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-muted-foreground bg-secondary border border-border rounded-md">
                              <Zap size={12} /> {exp.type}
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className="font-display text-2xl font-semibold text-foreground mb-1 group-hover:text-foreground transition-colors">{exp.role}</h2>
                          <p className="text-base font-semibold text-muted-foreground mb-6">{exp.company}</p>

                          {/* Responsibilities */}
                          <div className="space-y-3 mb-8">
                            {exp.responsibilities.map((resp, j) => (
                              <p key={j} className="flex gap-3 text-muted-foreground text-sm leading-relaxed">
                                <span className="text-accent mt-1 shrink-0">→</span>
                                <span>{resp}</span>
                              </p>
                            ))}
                          </div>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 pt-6 border-t border-border">
                            {exp.tech.map((tech) => (
                              <span key={tech} className="px-3 py-1.5 bg-secondary/50 border border-border text-foreground text-xs rounded-md font-medium hover:border-accent/40 hover:text-accent transition-colors cursor-default">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
