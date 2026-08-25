"use client"

import { Navigation } from "@/components/navigation"
import { TiltCard } from "@/components/three-d"
import { Reveal3D } from "@/components/three-d"

export default function SkillsPage() {
  const skillCategories = [
    {
      index: "01",
      title: "Generative AI & LLMs",
      skills: ["LangGraph", "CrewAI", "RAG Systems", "Prompt Engineering", "Fine-Tuning (LoRA/QLoRA)", "LLM Evaluation", "Context Engineering", "OpenAI API", "Anthropic API", "HuggingFace Transformers"],
    },
    {
      index: "02",
      title: "Machine Learning & Deep Learning",
      skills: ["Scikit-learn", "TensorFlow", "Keras", "XGBoost", "LightGBM", "CatBoost", "BERT/DistilBERT", "NLP Pipelines", "CNN", "RNN/LSTM", "Transformers"],
    },
    {
      index: "03",
      title: "Backend Development",
      skills: ["FastAPI", "REST APIs", "Pydantic", "JWT Authentication", "RBAC", "PostgreSQL", "MySQL", "SQLite", "Docker", "GitHub Actions"],
    },
    {
      index: "04",
      title: "Data & Vector Databases",
      skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "FAISS", "Chroma", "Pinecone", "pgvector"],
    },
    {
      index: "05",
      title: "Languages",
      skills: ["Python (Advanced)", "SQL (Advanced)", "Bash"],
    },
    {
      index: "06",
      title: "Tools & Platforms",
      skills: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Streamlit", "Gradio", "Google Colab", "LangSmith", "Docker"],
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="space-y-16">
            {/* Header */}
            <div>
              <h1 className="font-display text-4xl font-semibold mb-4">Technical Skills</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                A comprehensive overview of my technical competencies across GenAI, backend development, machine learning, and data engineering.
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {skillCategories.map((category, i) => (
                <Reveal3D key={i} delay={i * 0.05} className="h-full">
                  <TiltCard intensity={5} className="h-full rounded-lg">
                    <div className="group relative bg-card border border-border rounded-lg p-7 hover:border-accent/40 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-accent/5 flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="font-mono text-sm font-bold text-accent">{category.index}</span>
                        <h3 className="font-display text-xl font-semibold text-foreground leading-tight">{category.title}</h3>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-auto pt-2">
                        {category.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 bg-secondary/50 border border-border text-foreground text-xs rounded-md font-medium hover:border-accent/40 hover:text-accent transition-colors cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
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
