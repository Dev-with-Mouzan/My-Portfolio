"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { ArrowRight, Code2, Brain, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { ProfileImage } from "@/components/profile-image"

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                  I'm Mouzan Raza
                </h1>
                <p className="text-2xl gradient-text font-semibold">GenAI Engineer</p>
              </motion.div>

              <motion.p
                className="text-lg text-muted-foreground leading-relaxed max-w-lg"
                variants={fadeInUp}
              >
                I build intelligent systems using LLMs, AI agents, RAG pipelines, and automation workflows. Transforming
                complex problems into elegant AI solutions.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-primary hover:translate-x-1 transition-transform duration-300">
                    <Code2 size={20} />
                    <span>LLM Applications & Prompt Engineering</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary hover:translate-x-1 transition-transform duration-300">
                    <Brain size={20} />
                    <span>AI Agents & Multi-Agent Systems</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary hover:translate-x-1 transition-transform duration-300">
                    <Zap size={20} />
                    <span>RAG Pipelines & Automation Workflows</span>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 font-semibold glow-effect"
                >
                  Get in Touch
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/resume.pdf"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 font-semibold glow-effect"
                >
                  View Resume
                  <ArrowRight size={20} className="rotate-[-45deg]" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex justify-center items-center perspective-1000"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <ProfileImage />
            </motion.div>
          </div>
        </section>

        {/* Featured Areas */}
        <section className="max-w-6xl mx-auto px-4 py-20 border-t border-border">
          <motion.h2
            className="text-3xl font-bold mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Core Expertise
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "LLM Architecture",
                desc: "Prompt engineering, model behavior understanding, and advanced reasoning patterns",
              },
              {
                title: "RAG Systems",
                desc: "Vector search, embeddings, semantic retrieval, and knowledge integration",
              },
              {
                title: "AI Automation",
                desc: "n8n workflows, agent orchestration, and intelligent API-based systems",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-6 bg-card border border-border rounded-lg hover:border-primary hover:shadow-lg transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
