"use client"

import { Navigation } from "@/components/navigation"

export default function About() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <section className="max-w-4xl mx-auto px-4 py-20">
          <div className="space-y-12">
            <div>
              <h1 className="font-display text-4xl font-semibold mb-8">About Me</h1>
              <div className="prose prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm a BS Computer Science student in my 7th semester at GC University Faisalabad with around 1 year of
                  hands-on experience in Machine Learning and Generative AI. My journey started with a 6-month internship as
                  an ML Engineer at WebTech.dev (Vehari), and since then I've been freelancing independently, specializing
                  further in GenAI and LLM-based systems.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  I currently work full-time as a freelancer, mainly with local clients, building multi-agent systems,
                  RAG pipelines, and agentic workflows. Right now I'm developing a multi-agent system that generates my own
                  freelancing leads autonomously.
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-12">
              <h2 className="font-display text-2xl font-semibold mb-8">Learning Path</h2>
              <div className="space-y-6">
                {[
                  { title: "Machine Learning Foundations", desc: "Neural networks, classification, regression" },
                  { title: "Deep Learning Era", desc: "CNNs, RNNs, LSTMs, word embeddings" },
                  { title: "Transformer Revolution", desc: "Attention mechanisms, BERT, GPT architectures" },
                  { title: "LLM Specialization", desc: "Fine-tuning, prompt engineering, reasoning patterns" },
                  { title: "Agent Systems", desc: "Multi-agent orchestration, tool use, autonomous workflows" },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-card border border-border rounded-md">
                    <h3 className="font-display font-semibold text-accent mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
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
