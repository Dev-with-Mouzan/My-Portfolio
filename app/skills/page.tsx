"use client"

import { Navigation } from "@/components/navigation"
import { TiltCard } from "@/components/three-d"
import { Reveal3D } from "@/components/three-d"
import { Reveal } from "@/components/scroll-reveal"
import { Sparkles, Bot, BrainCircuit, Server, Cloud, Database } from "lucide-react"

export default function SkillsPage() {
  const skillCategories = [
    {
      index: "01",
      title: "LLM & GenAI",
      icon: <Sparkles size={20} />,
      desc: "Prompt engineering, vector & vectorless RAG, multi-agent systems, and LoRA/QLoRA fine-tuning — the core of everything I build.",
      skills: ["Prompt Engineering", "RAG (Vector & Vectorless)", "Multi-Agent Systems", "Fine-Tuning (LoRA, QLoRA)"],
    },
    {
      index: "02",
      title: "Agents & Retrieval",
      icon: <Bot size={20} />,
      desc: "Orchestrating stateful agents with LangGraph and CrewAI, backed by FAISS, Chroma, and Pinecone for semantic retrieval.",
      skills: ["LangGraph", "CrewAI", "FAISS", "Chroma", "Pinecone"],
    },
    {
      index: "03",
      title: "Machine Learning",
      icon: <BrainCircuit size={20} />,
      desc: "End-to-end ML pipelines — data cleaning, feature engineering, training, and evaluation — from Scikit-learn to gradient boosting and TensorFlow.",
      skills: ["Scikit-learn", "XGBoost", "LightGBM", "TensorFlow"],
    },
    {
      index: "04",
      title: "Backend",
      icon: <Server size={20} />,
      desc: "Production-oriented Python APIs with FastAPI — REST endpoints, SSE streaming, and fast data layers with SQL, PostgreSQL, and Redis.",
      skills: ["Python", "SQL", "FastAPI", "REST APIs", "SSE Streaming", "PostgreSQL", "Redis"],
    },
    {
      index: "05",
      title: "Cloud & DevOps",
      icon: <Cloud size={20} />,
      desc: "Containerized deployments with Docker, CI/CD via GitHub Actions, and cloud infrastructure on AWS — the stack that runs my AI apps in production.",
      skills: ["AWS", "Docker", "GitHub Actions"],
    },
    {
      index: "06",
      title: "Data & Tools",
      icon: <Database size={20} />,
      desc: "The daily toolkit — Pandas & NumPy for data, Matplotlib & Seaborn for insight, Git/GitHub for version control, Streamlit & React for UIs.",
      skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Git", "GitHub", "Streamlit", "React"],
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="space-y-16">
            {/* Header */}
            <Reveal>
              <div>
                <h1 className="font-display text-4xl font-semibold mb-4">Technical Skills</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  A comprehensive overview of my technical competencies across LLMs, GenAI, agents, machine learning, backend, and cloud.
                </p>
              </div>
            </Reveal>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {skillCategories.map((category, i) => (
                <Reveal3D key={i} delay={i * 0.05} className="h-full">
                  <TiltCard intensity={5} className="h-full rounded-lg">
                    <div className="group relative bg-card border border-border rounded-lg p-7 hover:border-accent/40 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1 flex flex-col h-full overflow-hidden">
                      {/* Accent line that sweeps in on hover */}
                      <div className="absolute top-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-accent via-accent/40 to-transparent"></div>
                      {/* Oversized index watermark */}
                      <span className="absolute -top-5 right-2 font-display text-[96px] font-black leading-none text-foreground/[0.04] group-hover:text-accent/10 transition-colors duration-500 pointer-events-none select-none">
                        {category.index}
                      </span>

                      <div className="relative z-10 flex items-center gap-4 mb-6">
                        <div className="w-11 h-11 shrink-0 rounded-lg bg-secondary border border-border flex items-center justify-center text-accent shadow-sm group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(217,119,87,0.35)] transition-all duration-300">
                          {category.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-accent uppercase mb-0.5">{category.index}</p>
                          <h3 className="font-display text-xl font-semibold text-foreground leading-tight">{category.title}</h3>
                        </div>
                      </div>

                      <p className="relative z-10 text-[13px] leading-relaxed text-muted-foreground mb-5">
                        {category.desc}
                      </p>

                      <div className="relative z-10 mt-auto border-t border-border pt-4 flex flex-col">
                        {category.skills.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-center gap-2 py-1.5 px-1 -mx-1 rounded font-mono text-[12px] hover:bg-white/[0.03] transition-colors"
                          >
                            <span className="text-accent text-[10px] shrink-0">▸</span>
                            <span className="text-foreground/85 whitespace-nowrap">{skill}</span>
                            <span className="flex-1 border-b border-dotted border-border mx-1 translate-y-[3px]"></span>
                            <span className="text-accent/70 text-[10px] shrink-0">✓</span>
                          </div>
                        ))}
                      </div>

                      <p className="relative z-10 pt-4 font-mono text-[11px] text-muted-foreground/60">
                        <span className="text-accent">$</span> {category.skills.length} skills loaded <span className="animate-pulse text-accent">▊</span>
                      </p>
                    </div>
                  </TiltCard>
                </Reveal3D>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
