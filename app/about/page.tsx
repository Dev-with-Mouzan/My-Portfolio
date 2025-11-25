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
              <h1 className="text-4xl font-bold mb-8">About Me</h1>
              <div className="prose prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm a GenAI engineer passionate about building intelligent systems that solve real-world problems. My
                  journey started with traditional machine learning, evolved through deep learning and transformers, and
                  now focuses on leveraging large language models and AI agents to create sophisticated automation
                  workflows.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  What excites me most is the intersection of AI systems and practical automation. I specialize in
                  architecting end-to-end solutions that combine cutting-edge LLMs with robust engineering
                  practices—from prompt design and RAG systems to multi-agent orchestration and n8n workflows.
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-12">
              <h2 className="text-2xl font-bold mb-8">Learning Path</h2>
              <div className="space-y-6">
                {[
                  { title: "Machine Learning Foundations", desc: "Neural networks, classification, regression" },
                  { title: "Deep Learning Era", desc: "CNNs, RNNs, LSTMs, word embeddings" },
                  { title: "Transformer Revolution", desc: "Attention mechanisms, BERT, GPT architectures" },
                  { title: "LLM Specialization", desc: "Fine-tuning, prompt engineering, reasoning patterns" },
                  { title: "Agent Systems", desc: "Multi-agent orchestration, tool use, autonomous workflows" },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-card border border-border rounded-lg">
                    <h3 className="font-semibold text-primary mb-1">{item.title}</h3>
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
