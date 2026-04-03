"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { ArrowRight, Download, MapPin, GraduationCap, Code2, Brain, Zap, ArrowUp } from "lucide-react"
import { Spinner } from "@/components/spinner"

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [statsAnimated, setStatsAnimated] = useState(false)
  const [stats, setStats] = useState({
    roles: 0,
    projects: 0,
    cgpa: 0,
    years: 0,
  })

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)

      const heroSection = document.getElementById("hero-stats")
      if (heroSection && !statsAnimated) {
        const rect = heroSection.getBoundingClientRect()
        if (rect.top < window.innerHeight) {
          setStatsAnimated(true)
          animateStats()
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [statsAnimated])

  const animateStats = () => {
    const targets = { roles: 2, projects: 3, cgpa: 3.8, years: 1 }
    const duration = 1500
    const steps = 60
    const interval = duration / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setStats({
        roles: Math.floor(progress * targets.roles * 10) / 10,
        projects: Math.floor(progress * targets.projects * 10) / 10,
        cgpa: Math.floor(progress * targets.cgpa * 100) / 100,
        years: Math.floor(progress * targets.years * 10) / 10,
      })

      if (step >= steps) {
        setStats(targets)
        clearInterval(timer)
      }
    }, interval)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    const initAOS = () => {
      if (typeof window !== "undefined" && (window as any).AOS) {
        (window as any).AOS.init({
          duration: 600,
          easing: "ease-out",
          once: true,
          offset: 50,
        })
      }
    }

    const initTypewriter = () => {
      if (typeof window !== "undefined" && (window as any).Typed) {
        new (window as any).Typed("#typewriter-target", {
          strings: [
            "GenAI Developer",
            "RAG Systems Engineer",
            "LLM Application Builder",
            "AI Automation Specialist",
          ],
          typeSpeed: 80,
          deleteSpeed: 40,
          delay: 2000,
          loop: true,
        })
      }
    }

    const aosScript = document.createElement("script")
    aosScript.src = "https://unpkg.com/aos@2.3.1/dist/aos.js"
    aosScript.onload = initAOS
    document.head.appendChild(aosScript)

    const typedScript = document.createElement("script")
    typedScript.src = "https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"
    typedScript.onload = initTypewriter
    document.head.appendChild(typedScript)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 5000)
      }
    } catch (error) {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 5000)
    }
  }

  const skillCategories = [
    {
      icon: "🤖",
      title: "Generative AI & LLMs",
      skills: ["LangGraph", "CrewAI", "AutoGen", "RAG Systems", "Prompt Engineering", "Fine-Tuning (LoRA/QLoRA)", "LLM Evaluation", "Context Engineering", "OpenAI API", "Anthropic API", "HuggingFace Transformers"],
    },
    {
      icon: "⚙️",
      title: "Machine Learning & Deep Learning",
      skills: ["Scikit-learn", "TensorFlow", "Keras", "XGBoost", "LightGBM", "CatBoost", "BERT/DistilBERT", "NLP Pipelines", "CNN", "RNN/LSTM", "Transformers"],
    },
    {
      icon: "🖥️",
      title: "Backend Development",
      skills: ["FastAPI", "Flask", "REST APIs", "Pydantic", "JWT Authentication", "RBAC", "PostgreSQL", "MySQL", "SQLite", "Docker", "GitHub Actions"],
    },
    {
      icon: "📊",
      title: "Data & Vector Databases",
      skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "FAISS", "Chroma", "Pinecone", "Weaviate", "pgvector"],
    },
    {
      icon: "💻",
      title: "Languages",
      skills: ["Python (Advanced)", "SQL (Advanced)", "Bash"],
    },
    {
      icon: "🛠️",
      title: "Tools & Platforms",
      skills: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Streamlit", "Gradio", "Google Colab", "LangSmith", "Docker"],
    },
  ]

  const experience = [
    {
      role: "ML Engineer",
      company: "WebTech.dev Software House",
      period: "Jan 2025 – Mar 2025",
      location: "Vehari, Pakistan",
      responsibilities: [
        "Built end-to-end ML pipelines (data cleaning → feature engineering → model training → deployment) for client projects using Scikit-learn, XGBoost, and LightGBM.",
        "Developed NLP solutions for text classification and sentiment analysis using HuggingFace Transformers; exposed trained models via FastAPI REST endpoints for real-time client use.",
        "Performed exploratory data analysis (EDA) and delivered data visualization reports using Pandas, Matplotlib, and Seaborn to support business decisions.",
      ],
      tech: ["Python", "Scikit-learn", "XGBoost", "HuggingFace", "FastAPI", "Pandas", "Matplotlib"],
    },
    {
      role: "Backend Developer",
      company: "ZA Coder",
      period: "Jan 2025 – Dec 2025",
      location: "Pakistan",
      responsibilities: [
        "Designed and maintained scalable REST APIs using FastAPI with Pydantic validation, JWT authentication, and role-based access control (RBAC) across multiple backend services.",
        "Wrote complex SQL queries including joins, CTEs, and window functions in PostgreSQL; containerized services with Docker and automated CI/CD pipelines via GitHub Actions.",
      ],
      tech: ["FastAPI", "PostgreSQL", "SQL", "Pydantic", "JWT", "Docker", "GitHub Actions"],
    },
  ]

  const projects = [
    {
      title: "RAG-Based Document Q&A System",
      category: "GenAI",
      description: "A production-style Retrieval-Augmented Generation (RAG) system that lets users upload documents and get accurate, cited answers with zero hallucinations.",
      pipeline: "document ingestion → chunking → embedding → vector search (FAISS/Chroma) → hybrid retrieval → re-ranking → LLM generation. Includes corrective RAG, multi-query retrieval, and context compression.",
      tech: ["Python", "LangGraph", "FAISS", "Chroma", "FastAPI", "HuggingFace", "OpenAI API"],
      github: "https://github.com/Dev-with-Mouzan",
      demo: "#",
      demoText: "Live Demo ↗",
    },
    {
      title: "AI Resume ATS Score Checker",
      category: "NLP",
      description: "Analyzes a resume against a job description, computes an ATS compatibility score, and generates role-specific LLM-powered improvement suggestions for job seekers.",
      pipeline: "PDF parsing → semantic similarity scoring → structured LLM feedback → Streamlit UI.",
      tech: ["Python", "HuggingFace", "Streamlit", "OpenAI API", "Pandas", "NLP"],
      github: "https://github.com/Dev-with-Mouzan",
      demo: "#",
      demoText: "Live Demo ↗",
    },
    {
      title: "House Price Prediction System",
      category: "Machine Learning",
      description: "End-to-end ML project predicting house prices with 30%+ accuracy improvement over baseline through systematic feature engineering and ensemble modeling.",
      pipeline: "EDA → feature engineering → model training (XGBoost, LightGBM) → cross-validated hyperparameter tuning → evaluation.",
      tech: ["Python", "Scikit-learn", "XGBoost", "LightGBM", "Pandas", "Matplotlib"],
      github: "https://github.com/Dev-with-Mouzan",
      demo: "#",
      demoText: "Live Demo ↗",
    },
    {
      title: "Agentic AI Workflow System",
      category: "Agentic AI",
      inProgress: true,
      description: "Multi-step agentic AI system using LangGraph with goal-oriented planning, tool-calling, reflection loops, and Model Context Protocol (MCP) integration for standardized tool interfaces.",
      tech: ["LangGraph", "CrewAI", "MCP", "FastAPI", "Python"],
      github: "https://github.com/Dev-with-Mouzan",
      demo: "#",
      demoText: "Coming Soon",
    },
  ]

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/Dev-with-Mouzan",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/mouzan-raza-979230385",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.945v5.442h-3.554s.05-8.805 0-9.719h3.554v1.375c.427-.659 1.191-1.595 2.897-1.595 2.117 0 3.704 1.385 3.704 4.362v5.577zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.704 0-.951.768-1.703 1.959-1.703 1.188 0 1.914.752 1.939 1.703 0 .946-.751 1.704-1.983 1.704zm1.946 11.019H3.39V9.714h3.893v10.738zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://x.com/MouzanR10223",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com/share/1Gt6qAAzhd",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Email",
      href: "mailto:mouzan.ai.dev@gmail.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
  ]

  const statsData = [
    { value: `${stats.roles}+`, label: "Professional Roles", icon: <Code2 size={20} /> },
    { value: `${stats.projects}+`, label: "AI Projects", icon: <Brain size={20} /> },
    { value: `${stats.cgpa}`, label: "CGPA", icon: <GraduationCap size={20} /> },
    { value: `${stats.years} Year`, label: "GenAI Study", icon: <Zap size={20} /> },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <section id="hero" className="min-h-screen relative overflow-hidden">
          <div className="hero-grid-bg absolute inset-0"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-transparent to-fuchsia-50/30 dark:from-violet-950/30 dark:via-transparent dark:to-fuchsia-950/20"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-16 min-h-[100dvh] flex flex-col items-center justify-center">

            {/* Ambient Animated Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/20 blur-[120px] rounded-full pointer-events-none dark:bg-violet-600/10"></div>
            <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-fuchsia-500/20 blur-[100px] rounded-full pointer-events-none dark:bg-fuchsia-600/10 mix-blend-multiply dark:mix-blend-lighten animate-pulse duration-1000"></div>

            <div className="relative z-10 flex flex-col justify-center items-center text-center w-full max-w-4xl space-y-8 lg:space-y-10 mt-16 lg:mt-20">

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100/80 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 rounded-full text-sm font-semibold shadow-sm backdrop-blur-sm border border-violet-200 dark:border-violet-800" data-aos="fade-down">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                Available for Hire
              </div>

              <div className="space-y-4" data-aos="fade-up" data-aos-delay="100">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight drop-shadow-sm">
                  Mouzan Raza
                </h1>
                <div className="h-10 sm:h-12 md:h-14 flex items-center justify-center">
                  <span id="typewriter-target" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-500"></span>
                </div>
              </div>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed mx-auto" data-aos="fade-up" data-aos-delay="200">
                I build production-ready AI applications — RAG systems, LLM pipelines,
                and intelligent backends that solve real problems.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4" data-aos="fade-up" data-aos-delay="300">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5 transition-all font-semibold text-base"
                >
                  View My Work
                  <ArrowRight size={18} />
                </a>
                <a
                  href="https://docs.google.com/document/d/1lQUUAsvwclepFb66l-zzujct6nFHP8-O/edit?usp=sharing&ouid=113797468387203400265&rtpof=true&sd=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-border text-foreground hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 rounded-full hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all font-semibold text-base"
                >
                  <Download size={18} />
                  Download Resume
                </a>
              </div>

              <div className="flex items-center justify-center gap-5 pt-6" data-aos="fade-up" data-aos-delay="400">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-secondary/50 border border-transparent text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 hover:bg-secondary hover:border-border hover:-translate-y-1 rounded-full transition-all flex items-center justify-center"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>

              <div id="hero-stats" className="w-full pt-12 mt-8 border-t border-border" data-aos="fade-in" data-aos-delay="500">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {statsData.map((stat, i) => (
                    <div key={i} className="text-center p-4 bg-card/40 backdrop-blur-md rounded-2xl border border-border/50 hover:border-violet-500/30 transition-colors">
                      <div className="flex flex-col items-center justify-center gap-3 mb-2">
                        <span className="p-2.5 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl">
                          {stat.icon}
                        </span>
                        <p className="text-2xl md:text-3xl font-black text-foreground drop-shadow-sm">{stat.value}</p>
                      </div>
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-muted-foreground rounded-full"></div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-20 border-t border-border" data-aos="fade-up">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
              Core Expertise
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "LLM Architecture",
                desc: "Prompt engineering, model behavior understanding, and advanced reasoning patterns for production systems",
                icon: <Code2 className="text-blue-500" />,
                borderHover: "hover:border-blue-500/40",
              },
              {
                title: "RAG Systems",
                desc: "Vector search, embeddings, semantic retrieval, and knowledge integration at scale",
                icon: <Brain className="text-cyan-500" />,
                borderHover: "hover:border-cyan-500/40",
              },
              {
                title: "AI Automation",
                desc: "n8n workflows, agent orchestration, and intelligent API-based systems",
                icon: <Zap className="text-emerald-500" />,
                borderHover: "hover:border-emerald-500/40",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-6 bg-card border border-border rounded-xl ${item.borderHover} hover:shadow-lg transition-all group`}
                style={{ transform: "translateY(0)" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="max-w-6xl mx-auto px-4 py-20 border-t border-border">
          <div className="flex flex-col items-center mb-16 text-center" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6" data-aos="fade-up">
              <div className="relative group p-8 md:p-10 rounded-3xl bg-card border border-border hover:border-violet-500/30 transition-all duration-300 shadow-sm overflow-hidden h-full flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-violet-500/10 transition-colors duration-500 pointer-events-none"></div>
                <div className="relative z-10 space-y-6">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    I'm a <span className="font-semibold text-foreground">Computer Science student</span> at <span className="font-semibold text-foreground">Govt College University Faisalabad</span>
                    specializing in <span className="font-semibold text-foreground">Generative AI engineering</span>.
                  </p>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    Over the past year, I completed a comprehensive, structured roadmap covering everything from machine learning foundations and deep learning
                    to LLM applications, RAG systems, Agentic AI, fine-tuning, and LLMOps.
                  </p>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    I have professional experience as an <span className="font-semibold text-foreground">ML Engineer</span> and <span className="font-semibold text-foreground">Backend Developer</span> — giving me
                    real-world exposure to building and deploying robust, scalable, AI-powered systems.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4" data-aos="fade-up" data-aos-delay="100">
              {[
                { icon: <MapPin size={24} className="text-violet-500" />, label: "Location", value: "Burewala, Pakistan" },
                { icon: <GraduationCap size={24} className="text-fuchsia-500" />, label: "Education", value: "B.Sc. CS" },
                { icon: <Zap size={24} className="text-amber-500" />, label: "Experience", value: "ML Engineer" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-secondary/30 border border-border hover:bg-secondary/60 transition-colors group">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-background shadow-sm border border-border group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-base font-bold text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}

              <div className="flex-1 mt-2 p-6 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white relative overflow-hidden group min-h-[140px] flex flex-col justify-center items-center shadow-lg shadow-violet-500/20">
                <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: "radial-gradient(circle at center, #ffffff 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
                <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-2 group-hover:scale-105 transition-transform">
                  <span className="text-5xl font-black tracking-tight drop-shadow-md">3.80</span>
                  <span className="text-violet-100 font-bold uppercase tracking-[0.2em] text-xs opacity-90">Current CGPA</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-12 mt-8 md:mt-12">
              <div className="flex items-center justify-between mb-8" data-aos="fade-up">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">AI Roadmap Mastered</h3>
                <div className="h-px bg-border flex-1 ml-8 hidden sm:block"></div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[
                  { title: "Machine Learning", desc: "Foundations, classification, regression", icon: <Brain size={20} /> },
                  { title: "Deep Learning", desc: "CNNs, RNNs, LSTMs, word embeddings", icon: <Zap size={20} /> },
                  { title: "LLM Applications", desc: "Prompt engineering, model integration", icon: <Code2 size={20} /> },
                  { title: "RAG Systems", desc: "Vector search, embeddings, retrieval", icon: <MapPin size={20} /> },
                  { title: "Agentic AI", desc: "Multi-agent, tool use, orchestration", icon: <Brain size={20} /> },
                  { title: "Fine-tuning", desc: "Model adaptation, deployment, monitoring", icon: <Zap size={20} /> },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group relative p-6 rounded-2xl bg-card border border-border hover:border-violet-500/40 transition-all duration-300 shadow-sm hover:shadow-violet-500/10 hover:-translate-y-1 block overflow-hidden"
                    data-aos="fade-up"
                    data-aos-delay={i * 50}
                  >
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-full blur-2xl group-hover:bg-violet-500/20 transition-colors duration-500"></div>
                    <div className="w-10 h-10 mb-5 rounded-xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform shadow-sm">
                      {item.icon}
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="max-w-6xl mx-auto px-4 py-20 border-t border-border">
          <div className="flex flex-col items-center mb-16 text-center" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
              Technical Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {skillCategories.map((category, i) => (
              <div
                key={i}
                className="group relative bg-card border border-border rounded-3xl p-8 hover:border-violet-500/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-violet-500/10 overflow-hidden flex flex-col h-full"
                data-aos="fade-up"
                data-aos-delay={i * 50}
              >
                <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:from-violet-500/20 group-hover:to-fuchsia-500/20 transition-colors duration-500 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-2xl shadow-sm border border-violet-200 dark:border-violet-800 group-hover:scale-110 transition-transform flex-shrink-0">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-tight">{category.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-background border border-border text-foreground text-xs rounded-lg font-medium shadow-sm hover:border-violet-500/30 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="max-w-6xl mx-auto px-4 py-20 border-t border-border">
          <div className="flex flex-col items-center mb-16 text-center" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => {
              const colorfulConfigs = [
                {
                  gradient: "from-blue-500 to-cyan-500",
                  bgGlow: "group-hover:from-blue-500/20 group-hover:to-cyan-500/20",
                  borderGlow: "hover:border-cyan-500/40 hover:shadow-cyan-500/10",
                  badge: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
                  icon: "text-blue-500",
                  titleHover: "group-hover:text-blue-500 dark:group-hover:text-blue-400"
                },
                {
                  gradient: "from-emerald-500 to-teal-500",
                  bgGlow: "group-hover:from-emerald-500/20 group-hover:to-teal-500/20",
                  borderGlow: "hover:border-teal-500/40 hover:shadow-teal-500/10",
                  badge: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
                  icon: "text-emerald-500",
                  titleHover: "group-hover:text-emerald-500 dark:group-hover:text-emerald-400"
                },
                {
                  gradient: "from-amber-500 to-orange-500",
                  bgGlow: "group-hover:from-amber-500/20 group-hover:to-orange-500/20",
                  borderGlow: "hover:border-orange-500/40 hover:shadow-orange-500/10",
                  badge: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
                  icon: "text-amber-500",
                  titleHover: "group-hover:text-amber-500 dark:group-hover:text-amber-400"
                },
                {
                  gradient: "from-rose-500 to-pink-500",
                  bgGlow: "group-hover:from-rose-500/20 group-hover:to-pink-500/20",
                  borderGlow: "hover:border-pink-500/40 hover:shadow-pink-500/10",
                  badge: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
                  icon: "text-rose-500",
                  titleHover: "group-hover:text-rose-500 dark:group-hover:text-rose-400"
                }
              ];
              const conf = colorfulConfigs[i % colorfulConfigs.length];

              return (
                <div
                  key={i}
                  className={`group relative bg-card border border-border rounded-3xl p-8 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden flex flex-col h-full ${conf.borderGlow}`}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <div className={`absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-transparent to-transparent rounded-full blur-3xl -mr-20 -mt-20 transition-colors duration-500 pointer-events-none ${conf.bgGlow}`}></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`inline-flex px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border ${conf.badge}`}>
                        {project.category}
                      </div>
                      {project.inProgress && (
                        <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 px-3 py-1 rounded-full font-medium flex items-center gap-1">
                          <Zap size={12} /> In Progress
                        </span>
                      )}
                    </div>

                    <h3 className={`text-2xl font-bold text-foreground mb-4 transition-colors ${conf.titleHover}`}>{project.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>

                    {project.pipeline && (
                      <div className="mb-6 p-4 rounded-xl bg-secondary/50 border border-border text-sm text-muted-foreground leading-relaxed">
                        <span className="font-bold text-foreground mb-1 flex items-center gap-2"><svg className={`w-4 h-4 ${conf.icon}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg> Pipeline:</span>
                        {project.pipeline}
                      </div>
                    )}

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((t) => (
                          <span key={t} className="px-3 py-1.5 bg-background border border-border text-foreground text-xs rounded-lg font-medium shadow-sm transition-colors">{t}</span>
                        ))}
                      </div>

                      <div className="flex items-center gap-6 pt-6 border-t border-border mt-auto">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-foreground flex items-center gap-2 transition-colors hover:opacity-80">
                          <Code2 size={18} /> Source Code
                        </a>
                        <a href={project.demo} className={`text-sm font-bold flex items-center gap-2 hover:translate-x-1 transition-all ${conf.icon}`}>
                          {project.demoText} <ArrowRight size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="experience" className="max-w-6xl mx-auto px-4 py-20 border-t border-border">
          <div className="flex flex-col items-center mb-16 text-center" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">
              Professional Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-fuchsia-500/50 to-transparent md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {experience.map((exp, i) => (
                <div key={i} className={`relative flex flex-col md:flex-row gap-8 items-start ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`} data-aos="fade-up" data-aos-delay={i * 100}>

                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-violet-500 transform -translate-x-1/2 mt-1.5 shadow-[0_0_15px_rgba(139,92,246,0.5)] z-10"></div>

                  <div className="hidden md:block w-1/2"></div>

                  <div className="w-full md:w-1/2 pl-12 md:pl-0">
                    <div className={`bg-card border border-border rounded-3xl p-8 hover:border-violet-500/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-violet-500/10 group relative overflow-hidden ${i % 2 === 0 ? "md:mr-12" : "md:ml-12"}`}>
                      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:from-violet-500/20 group-hover:to-fuchsia-500/20 transition-colors duration-500 pointer-events-none"></div>

                      <div className="relative z-10">
                        <div className="inline-flex px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-violet-200 dark:border-violet-800">
                          {exp.period}
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{exp.role}</h3>
                        <p className="text-base font-semibold text-muted-foreground mb-6 flex items-center gap-2">
                          <MapPin size={16} /> {exp.company}
                        </p>

                        <div className="space-y-4 text-muted-foreground leading-relaxed text-sm mb-8">
                          {exp.responsibilities.map((resp, j) => (
                            <p key={j} className="flex relative pl-5">
                              <span className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-violet-500/50 rounded-full"></span>
                              {resp}
                            </p>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2 pt-6 border-t border-border">
                          {exp.tech.map((tech) => (
                            <span key={tech} className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs rounded-lg font-medium border border-transparent hover:border-border transition-colors">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="max-w-6xl mx-auto px-4 py-20 border-t border-border bg-gradient-to-b from-muted/20 to-background">
          <div className="grid md:grid-cols-2 gap-12">
            <div data-aos="fade-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Let's Work Together
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Open to internships, freelance projects, and full-time opportunities in AI engineering and development.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-lg min-w-[48px] min-h-[48px] flex items-center justify-center">
                    <MapPin size={20} className="text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p className="text-muted-foreground">Burewala, Pakistan</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg min-w-[48px] min-h-[48px] flex items-center justify-center">
                    <GraduationCap size={20} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Education</p>
                    <p className="text-muted-foreground">Computer Science (In Progress)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg min-w-[48px] min-h-[48px] flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 text-xl">📱</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <a href="tel:+923114216514" className="text-muted-foreground hover:text-primary transition-colors">+92-311-4216514</a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-4 bg-card border border-border rounded-xl transition-all hover:border-primary hover:shadow-md text-muted-foreground hover:text-primary min-h-[80px]"
                  >
                    {link.icon}
                    <span className="text-xs font-medium mt-2">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay={200}>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Project inquiry, collaboration, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === "loading" && <Spinner />}
                  {status === "idle" && "Send Message"}
                  {status === "success" && "Message Sent!"}
                  {status === "error" && "Failed to Send"}
                </button>

                {status === "success" && (
                  <p className="text-center text-green-600 dark:text-green-400 font-medium">
                    Thanks for reaching out! I'll respond soon.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        <footer className="border-t border-border bg-card">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">MR</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-muted-foreground">Mouzan Raza</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Mouzan Raza. All rights reserved.
                </p>
              </div>
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all z-50"
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          <ArrowUp size={20} />
        </button>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
