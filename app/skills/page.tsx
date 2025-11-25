"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { useTheme } from "@/lib/theme-context"

export default function SkillsPage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const skillCategories = [
    {
      title: "GenAI & LLMs",
      skills: ["OpenAI GPT", "Anthropic Claude", "LLaMA", "Prompt Engineering", "RAG Systems", "Fine-tuning"],
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "AI Agents & Frameworks",
      skills: ["LangChain", "AutoGen", "Crew AI", "Agent Orchestration", "ReAct Pattern", "Tool Integration"],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Python & Backend",
      skills: ["Python", "FastAPI", "Flask", "Django", "PostgreSQL", "MongoDB"],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Data & ML",
      skills: ["Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", "Data Analysis"],
      color: "from-indigo-500 to-purple-500",
    },
  ]

  if (!mounted) return null

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1
              className="text-4xl sm:text-5xl font-bold mb-4 gradient-text"
              style={{
                animation: "fadeIn 0.8s ease-out",
              }}
            >
              My Skills & Expertise
            </h1>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              style={{
                animation: "slideInUp 0.8s ease-out 0.1s backwards",
              }}
            >
              A comprehensive overview of my technical competencies across GenAI, full-stack development, and data
              science
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className="group relative"
                style={{
                  animation: `slideInUp 0.8s ease-out ${0.2 + categoryIndex * 0.1}s backwards`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 rounded-xl -z-10" />
                <div className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm group-hover:border-primary/50 transition-all duration-300 hover:scale-105">
                  {/* Category Header */}
                  <div className={`bg-gradient-to-r ${category.color} rounded-lg p-3 mb-4`}>
                    <h2 className="text-white font-semibold text-lg">{category.title}</h2>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-default hover:scale-110"
                        style={{
                          animation: `fadeIn 0.6s ease-out ${0.4 + categoryIndex * 0.1 + skillIndex * 0.05}s backwards`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Proficiency Level */}
          <div
            className="mt-16 bg-card border border-border rounded-xl p-8"
            style={{
              animation: "slideInUp 0.8s ease-out 0.8s backwards",
            }}
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">Proficiency Levels</h2>
            <div className="space-y-4">
              {[
                { name: "GenAI & LLM Development", level: 90 },
                { name: "Full Stack Development", level: 85 },
                { name: "Python & Backend", level: 88 },
                { name: "Data Science & ML", level: 80 },
              ].map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <span className="text-primary font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: "0%",
                        animation: `slideInLeft ${0.8 + skill.level / 100}s ease-out 1s forwards`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div
            className="mt-16 text-center"
            style={{
              animation: "slideInUp 0.8s ease-out 1.2s backwards",
            }}
          >
            <p className="text-muted-foreground mb-4">Interested in working together?</p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all duration-200 hover:scale-105"
              style={{
                animation: "scaleIn 0.6s ease-out 1.4s backwards",
              }}
            >
              Get In Touch
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
