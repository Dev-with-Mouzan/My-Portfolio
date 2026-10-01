"use client"

import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { TiltCard } from "@/components/three-d"
import { Reveal } from "@/components/scroll-reveal"
import { MapPin, Calendar, Zap } from "lucide-react"

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.6"],
  })

  const experience = [
    {
      role: "AI Engineer",
      company: "Pyzit.Inc",
      period: "25 Dec 2025 - 20 Sep 2026",
      location: "Remote",
      type: "Remote",
      responsibilities: [
        "Built multi-agent AI systems using LangGraph and CrewAI to orchestrate complex, multi-step workflows with stateful execution.",
        "Developed and optimized RAG systems, implementing both vector-based and vectorless architectures for intelligent data retrieval.",
        "Designed LLM-powered applications with structured outputs, tool calling, retrieval workflows, and production-oriented backend APIs.",
      ],
      tech: ["LangGraph", "CrewAI", "RAG", "LLMs", "FastAPI", "Python", "AWS"],
    },
    {
      role: "Machine Learning Engineer",
      company: "WebTech.dev Software House, Vehari",
      period: "10 Jun 2025 - 10 Dec 2025",
      location: "Vehari, Pakistan",
      type: "Full-time",
      responsibilities: [
        "Built end-to-end machine learning pipelines covering data cleaning, EDA, feature engineering, model training, evaluation, and deployment using Scikit-learn, XGBoost, and LightGBM.",
        "Developed NLP solutions for text classification and sentiment analysis with HuggingFace Transformers.",
        "Exposed trained models via FastAPI REST endpoints for real-time client use.",
      ],
      tech: ["Python", "Scikit-learn", "XGBoost", "LightGBM", "HuggingFace", "FastAPI"],
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <section className="max-w-4xl mx-auto px-4 py-20">
          <div className="space-y-16">
            {/* Header */}
            <Reveal>
              <div>
                <h1 className="font-display text-4xl font-semibold mb-4">Experience</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Specialized in AI engineering — multi-agent systems, RAG pipelines, and production LLM applications — from ML engineering to full-time AI roles.
                </p>
              </div>
            </Reveal>

            {/* Timeline */}
            <div ref={timelineRef} className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-border"></div>
              <motion.div
                style={{ scaleY: timelineProgress }}
                className="absolute left-6 top-0 bottom-0 w-px bg-accent origin-top"
              ></motion.div>

              <div className="space-y-12">
                {experience.map((exp, i) => (
                  <Reveal key={i} delay={i * 0.12} className="relative pl-16">
                    {/* Timeline dot */}
                    <div className="absolute left-4 top-8 w-4 h-4 rounded-full bg-background border-2 border-accent z-10"></div>

                    <TiltCard intensity={5} className="h-full rounded-lg">
                      <div className="bg-card border border-border rounded-lg p-8 hover:border-accent/40 transition-all duration-300 shadow-sm hover:shadow-xl group relative overflow-hidden">
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
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
