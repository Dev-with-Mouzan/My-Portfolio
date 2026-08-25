"use client"

import { Navigation } from "@/components/navigation"
import { TiltCard } from "@/components/three-d"
import { MapPin, GraduationCap, Zap, Brain, Code2, Rocket } from "lucide-react"

export default function About() {
  const infoCards = [
    { icon: <MapPin size={22} className="text-accent" />, label: "Location", value: "Burewala, Pakistan" },
    { icon: <GraduationCap size={22} className="text-accent" />, label: "Education", value: "B.Sc. CS (7th Semester)" },
    { icon: <Zap size={22} className="text-accent" />, label: "Experience", value: "Freelance GenAI Developer" },
  ]

  const roadmap = [
    { title: "Machine Learning", desc: "Foundations, classification, regression, model evaluation", icon: <Brain size={20} /> },
    { title: "Deep Learning", desc: "CNNs, RNNs, LSTMs, word embeddings, transfer learning", icon: <Zap size={20} /> },
    { title: "LLM Applications", desc: "Prompt engineering, model integration, API orchestration", icon: <Code2 size={20} /> },
    { title: "RAG Systems", desc: "Vector search, embeddings, semantic retrieval at scale", icon: <MapPin size={20} /> },
    { title: "Agentic AI", desc: "Multi-agent orchestration, tool use, autonomous workflows", icon: <Brain size={20} /> },
    { title: "Fine-tuning", desc: "LoRA/QLoRA, model adaptation, deployment, monitoring", icon: <Rocket size={20} /> },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="space-y-16">
            {/* Header */}
            <div>
              <h1 className="font-display text-4xl font-semibold mb-4">About Me</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Building intelligent systems at the intersection of AI, engineering, and real-world problems.
              </p>
            </div>

            {/* Bio + Info Cards */}
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <div className="relative group p-8 md:p-10 rounded-xl bg-card border border-border hover:border-accent/40 transition-all duration-300 shadow-sm overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-accent/10 transition-colors duration-500 pointer-events-none"></div>
                  <div className="relative z-10 space-y-6">
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                      I'm a <span className="font-semibold text-foreground">BS Computer Science</span> student in my <span className="font-semibold text-foreground">7th semester</span> at <span className="font-semibold text-foreground">GC University Faisalabad</span>,
                      with around <span className="font-semibold text-foreground">1 year of hands-on experience</span> in Machine Learning and Generative AI.
                    </p>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                      I started with a 6-month internship as an <span className="font-semibold text-foreground">ML Engineer at WebTech.dev</span> (Vehari), and have since been
                      freelancing independently — specializing further in <span className="font-semibold text-foreground">GenAI and LLM-based systems</span>.
                    </p>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                      I currently work full-time as a freelancer, mainly with local clients, and I'm building a <span className="font-semibold text-foreground">multi-agent system</span>
                      {" "}that autonomously generates my own freelancing leads.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-4">
                {infoCards.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-lg bg-secondary/30 border border-border hover:bg-secondary/60 transition-colors group">
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-card shadow-sm border border-border group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-base font-bold text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}

                <div className="flex-1 mt-2 p-6 rounded-lg bg-foreground text-background relative overflow-hidden group min-h-[140px] flex flex-col justify-center items-center shadow-sm">
                  <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: "radial-gradient(circle at center, #ffffff 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
                  <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-2 group-hover:scale-105 transition-transform">
                    <span className="font-display text-5xl font-semibold tracking-tight">3.85</span>
                    <span className="eyebrow opacity-80">Current CGPA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Roadmap */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">AI Roadmap Mastered</h2>
                <div className="h-px bg-border flex-1 ml-8 hidden sm:block"></div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {roadmap.map((item, i) => (
                  <TiltCard key={i} intensity={5} className="h-full rounded-lg">
                    <div className="group relative p-6 rounded-lg bg-card border border-border hover:border-accent/40 transition-all duration-300 shadow-sm hover:shadow-accent/5 hover:-translate-y-1 h-full overflow-hidden">
                      <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-colors duration-500"></div>
                      <div className="w-10 h-10 mb-5 rounded-lg bg-secondary flex items-center justify-center text-accent group-hover:scale-110 transition-transform shadow-sm relative z-10">
                        {item.icon}
                      </div>
                      <h4 className="font-display text-lg font-semibold text-foreground mb-2 relative z-10">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{item.desc}</p>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
