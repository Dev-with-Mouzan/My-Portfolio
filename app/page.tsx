"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { ArrowRight, Download, MapPin, GraduationCap, Code2, Brain, Zap, ArrowUp, Phone } from "lucide-react"
import { Spinner } from "@/components/spinner"
import { FloatingShapes, ScrollCube, Reveal3D, TiltCard } from "@/components/three-d"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function Home() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const {
    register,
    handleSubmit: hookFormSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  })
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [statsAnimated, setStatsAnimated] = useState(false)
  const [stats, setStats] = useState({
    roles: 0,
    projects: 0,
    cgpa: 0,
    years: 0,
  })

  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, 140])
  const heroOpacity = useTransform(scrollY, [0, 420], [1, 0])
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.55"],
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
    const targets = { roles: 2, projects: 7, cgpa: 3.85, years: 1 }
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
            "Multi-Agent Systems Engineer",
            "LLM Application Builder",
            "RAG & Agentic AI Specialist",
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

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("loading")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setStatus("success")
        reset()
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

  const experience = [
    {
      role: "Freelance GenAI Developer",
      company: "Independent Freelancer",
      period: "Dec 2025 - Present",
      location: "Remote",
      responsibilities: [
        "Working full-time as a freelancer, primarily with local clients, delivering academic and production AI projects.",
        "Specializing in GenAI and LLM-based systems — multi-agent architectures, RAG pipelines, and agentic workflows.",
        "Currently building a multi-agent system that autonomously generates freelance leads.",
      ],
      tech: ["CrewAI", "LangGraph", "LangChain", "Python", "RAG", "LLMs", "FastAPI"],
    },
    {
      role: "ML Engineer (Internship)",
      company: "WebTech.dev, Vehari",
      period: "Jun 2025 - Dec 2025",
      location: "Vehari, Pakistan",
      responsibilities: [
        "Trained machine learning models on real client datasets.",
        "Monitored model performance in production and iterated to maintain accuracy.",
      ],
      tech: ["Python", "Scikit-learn", "TensorFlow", "Pandas", "MLOps"],
    },
  ]

  const projects = [
    {
      title: "CareerCopilot AI",
      category: "Multi-Agent Systems",
      description:
        "Multi-agent career assistant built with CrewAI and FastAPI using a mixed-LLM setup — Groq (Llama-3.1) for fast tool-calling web scraping and Gemini for deep ATS analysis and strategic reasoning. User uploads a resume and gets scored matches, ATS feedback, and a learning plan.",
      pipeline: "resume upload → job-hunter agent scrapes listings → ATS-analyst agent scores resume (Pydantic output) → career-strategist builds learning plan via TF-IDF retrieval → chatbot with short-term memory.",
      tech: ["CrewAI", "FastAPI", "Groq (Llama-3.1)", "Gemini", "Pydantic", "Python"],
      github: "https://github.com/Dev-with-Mouzan/CareerCopilot_AI.git",
    },
    {
      title: "FounderLens AI",
      category: "Multi-Agent Systems",
      description:
        "Multi-agent business analysis system built with CrewAI and FastAPI. A sequential 6-agent pipeline (intake, insight, conflict, planning, simulation, recovery) processes business data to generate insights on risk, market trends, growth strategies, and outcome simulations.",
      pipeline: "CSV/PDF/website ingestion → intake → insight → conflict detection → planning → simulation → recovery → Supabase persistence.",
      tech: ["CrewAI", "FastAPI", "LangChain", "Supabase", "Python"],
      github: "https://github.com/Dev-with-Mouzan/FounderLens_AI.git",
      demo: "https://founderai-production-a4e4.up.railway.app/",
      demoText: "Live API ↗",
    },
    {
      title: "Fake News Detection System",
      category: "GenAI",
      description:
        "Freelance academic project (LangChain) that classifies news articles as real or fake using LLM-based analysis and confidence scoring.",
      pipeline: "text ingestion → preprocessing → LLM classification (LangChain) → confidence scoring.",
      tech: ["Python", "LangChain", "LLMs", "NLP"],
      github: "https://github.com/Dev-with-Mouzan",
    },
    {
      title: "Code Reviewer",
      category: "Agentic AI",
      description:
        "Agentic code review system built with LangGraph + LangChain that analyzes code, identifies bugs and anti-patterns, and suggests concrete improvements.",
      pipeline: "code ingestion → review agent (LangGraph) → issue detection → actionable suggestions.",
      tech: ["Python", "LangGraph", "LangChain", "LLMs"],
      github: "https://github.com/Dev-with-Mouzan",
    },
    {
      title: "AI Study Planner",
      category: "GenAI",
      description:
        "Intelligent study planner that generates personalized study schedules and revision plans based on subjects, deadlines, and available time.",
      tech: ["Python", "LLMs", "LangChain"],
      github: "https://github.com/Dev-with-Mouzan",
    },
    {
      title: "Fruit Classification System",
      category: "Computer Vision",
      description:
        "Deep learning image classification system that recognizes fruit types — a complete CNN-based classification project.",
      tech: ["Python", "TensorFlow", "Keras", "CNN"],
      github: "https://github.com/Dev-with-Mouzan",
    },
    {
      title: "Role-Based Prompt Generator",
      category: "Prompt Engineering",
      description:
        "Tool that generates tailored prompts based on the user's role and context, making LLM usage more effective across professional scenarios.",
      tech: ["Python", "Prompt Engineering", "LLMs"],
      github: "https://github.com/Dev-with-Mouzan",
    },
  ]

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/Dev-with-Mouzan",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/mouzan-raza-979230385",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.945v5.442h-3.554s.05-8.805 0-9.719h3.554v1.375c.427-.659 1.191-1.595 2.897-1.595 2.117 0 3.704 1.385 3.704 4.362v5.577zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.704 0-.951.768-1.703 1.959-1.703 1.188 0 1.914.752 1.939 1.703 0 .946-.751 1.704-1.983 1.704zm1.946 11.019H3.39V9.714h3.893v10.738zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://x.com/MouzanR10223",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com/share/1Gt6qAAzhd",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Email",
      href: "mailto:mouzan.ai.dev@gmail.com",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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

  const sectionHeading = (num: string, title: string, subtitle?: string) => (
    <div className="flex flex-col items-center text-center mb-14" data-aos="fade-up">
      <p className="eyebrow mb-3">
        [{num}] // {title}
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground tracking-tight">{title}</h2>
      <div className="mt-5 h-px w-16 bg-accent"></div>
      {subtitle && <p className="text-lg text-muted-foreground max-w-2xl mt-4">{subtitle}</p>}
    </div>
  )

  return (
    <>
      <Navigation />

      <div className="hidden lg:block fixed z-40 lg:left-6 xl:left-10 lg:top-1/2 lg:-translate-y-1/2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="w-px h-16 bg-gradient-to-b from-transparent to-accent/70"></span>
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.12 }}
              whileHover={{ scale: 1.12, y: -3 }}
              className="relative p-3 bg-card border border-accent/30 text-foreground hover:text-accent rounded-lg transition-shadow shadow-[0_0_12px_rgba(217,119,87,0.12)] hover:shadow-[0_0_24px_rgba(217,119,87,0.45)]"
              aria-label={link.name}
            >
              {link.icon}
            </motion.a>
          ))}
          <span className="w-px h-16 bg-gradient-to-b from-accent/70 to-transparent"></span>
        </motion.div>
      </div>

      <main className="min-h-screen">
        <section id="hero" className="min-h-screen relative overflow-hidden">
          <div className="hero-grid-bg absolute inset-0"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] bg-accent/10 blur-[160px] rounded-full pointer-events-none"></div>
          <FloatingShapes />
          <motion.div
            aria-hidden
            animate={{ y: [0, -22, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[7%] hidden xl:block pointer-events-none z-[1]"
            style={{ perspective: 900 }}
          >
            <ScrollCube size={110} />
          </motion.div>
          <motion.div
            aria-hidden
            animate={{ y: [0, 18, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            className="absolute bottom-[24%] left-[5%] hidden lg:block pointer-events-none z-[1]"
            style={{ perspective: 900 }}
          >
            <ScrollCube size={72} />
          </motion.div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 min-h-[100dvh] flex flex-col items-center justify-center">

            <motion.div
              style={{ y: heroY, opacity: heroOpacity }}
              className="relative z-10 flex flex-col justify-center items-center text-center w-full max-w-4xl space-y-8 lg:space-y-10 mt-8 lg:mt-10"
            >

              <div
                className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-background/70 backdrop-blur-sm border border-border rounded-full font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground"
                data-aos="fade-down"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-accent mr-1">$</span>
                status: open_to_work
              </div>

              <div className="space-y-4" data-aos="fade-up" data-aos-delay="100">
                <p className="font-mono text-sm sm:text-base text-muted-foreground">
                  <span className="text-accent">$</span> whoami
                </p>
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold text-foreground tracking-tight">
                  Mouzan Raza
                </h1>
                <div className="h-10 sm:h-12 md:h-14 flex items-center justify-center">
                  <span className="text-accent mr-2">$</span>
                  <span id="typewriter-target" className="font-mono text-xl sm:text-2xl md:text-3xl font-medium text-foreground"></span>
                </div>
              </div>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed mx-auto" data-aos="fade-up" data-aos-delay="200">
                <span className="text-accent">#</span> I build production-ready AI applications — RAG systems,
                LLM pipelines, and intelligent backends that solve real problems.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4" data-aos="fade-up" data-aos-delay="300">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-foreground text-background rounded-md hover:opacity-85 hover:-translate-y-0.5 transition-all font-semibold text-base shadow-sm"
                >
                  View My Work
                  <ArrowRight size={18} />
                </a>
                <a
                  href="/Mouzan_Raza_Resume.docx"
                  download="Mouzan_Raza_Resume.docx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-border text-foreground hover:border-accent hover:text-accent rounded-md transition-all font-semibold text-base"
                >
                  <Download size={18} />
                  Download Resume
                </a>
              </div>

            </motion.div>

            <div id="hero-stats" className="w-full pt-12 mt-12 border-t border-border" data-aos="fade-in" data-aos-delay="500">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {statsData.map((stat, i) => (
                  <div key={i} className="text-center p-5 bg-card rounded-lg border border-border hover:border-accent/40 transition-colors">
                    <div className="flex flex-col items-center justify-center gap-3 mb-2">
                      <span className="p-2.5 bg-secondary text-accent rounded-lg">
                        {stat.icon}
                      </span>
                      <p className="font-mono text-3xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-muted-foreground/60 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-accent rounded-full"></div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-20 border-t border-border" data-aos="fade-up">
          {sectionHeading("01", "Core Expertise")}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "LLM Architecture",
                desc: "Prompt engineering, model behavior understanding, and advanced reasoning patterns for production systems",
                icon: <Code2 className="text-accent" />,
              },
              {
                title: "RAG Systems",
                desc: "Vector search, embeddings, semantic retrieval, and knowledge integration at scale",
                icon: <Brain className="text-accent" />,
              },
              {
                title: "AI Automation",
                desc: "n8n workflows, agent orchestration, and intelligent API-based systems",
                icon: <Zap className="text-accent" />,
              },
            ].map((item, i) => (
              <TiltCard
                key={i}
                intensity={6}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="h-full rounded-lg"
              >
                <div className="p-6 bg-card border border-border rounded-lg hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all group h-full">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        <section id="about" className="max-w-6xl mx-auto px-4 py-20 border-t border-border">
          {sectionHeading("02", "About Me")}

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6" data-aos="fade-up">
              <div className="relative group p-8 md:p-10 rounded-xl bg-card border border-border hover:border-accent/40 transition-all duration-300 shadow-sm overflow-hidden h-full flex flex-col justify-center">
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
                    that autonomously generates my own freelancing leads.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4" data-aos="fade-up" data-aos-delay="100">
              {[
                { icon: <MapPin size={24} className="text-accent" />, label: "Location", value: "Burewala, Pakistan" },
                { icon: <GraduationCap size={24} className="text-accent" />, label: "Education", value: "B.Sc. CS (7th Sem)" },
                { icon: <Zap size={24} className="text-accent" />, label: "Experience", value: "Freelance GenAI Developer" },
              ].map((item, i) => (
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
                  <span className="font-display text-5xl font-semibold tracking-tight">{stats.cgpa}</span>
                  <span className="eyebrow opacity-80">Current CGPA</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-12 mt-8 md:mt-12">
              <div className="flex items-center justify-between mb-8" data-aos="fade-up">
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground">AI Roadmap Mastered</h3>
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
                    className="group relative p-6 rounded-lg bg-card border border-border hover:border-accent/40 transition-all duration-300 shadow-sm hover:shadow-accent/5 hover:-translate-y-1 block overflow-hidden"
                    data-aos="fade-up"
                    data-aos-delay={i * 50}
                  >
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-colors duration-500"></div>
                    <div className="w-10 h-10 mb-5 rounded-lg bg-secondary flex items-center justify-center text-accent group-hover:scale-110 transition-transform shadow-sm">
                      {item.icon}
                    </div>
                    <h4 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="max-w-6xl mx-auto px-4 py-20 border-t border-border">
          {sectionHeading("03", "Technical Skills")}

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
        </section>

        <section id="projects" className="max-w-6xl mx-auto px-4 py-20 border-t border-border">
          {sectionHeading("04", "Featured Projects")}

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <Reveal3D key={i} delay={i * 0.1} className="h-full">
              <TiltCard
                intensity={5}
                className="h-full rounded-lg"
              >
              <div
                className="group relative bg-card border border-border rounded-lg p-7 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-accent/5 hover:border-accent/40 overflow-hidden flex flex-col h-full"
              >
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-accent/10 transition-colors duration-500 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <span className="inline-flex px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider rounded-md border border-accent/30 bg-accent/10 text-accent">
                      {project.category}
                    </span>
                    {project.inProgress && (
                      <span className="text-xs text-accent bg-accent/10 border border-accent/30 px-3 py-1 rounded-md font-medium flex items-center gap-1">
                        <Zap size={12} /> In Progress
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-2xl font-semibold text-foreground mb-4">{project.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>

                  {project.pipeline && (
                    <div className="mb-6 p-4 rounded-lg bg-secondary/50 border border-border text-sm text-muted-foreground leading-relaxed">
                      <span className="font-mono text-xs font-bold text-accent mb-1 flex items-center gap-2">
                        <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg> pipeline:
                      </span>
                      {project.pipeline}
                    </div>
                  )}

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((t) => (
                        <span key={t} className="px-3 py-1.5 bg-secondary/50 border border-border text-foreground text-xs rounded-md font-medium transition-colors">{t}</span>
                      ))}
                    </div>

                    <div className="flex items-center gap-6 pt-5 border-t border-border">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-foreground flex items-center gap-2 hover:text-accent transition-colors">
                        <Code2 size={16} /> Source Code
                      </a>
                      {project.demoText && (
                        <a href={project.demo || "#"} className="text-sm font-semibold flex items-center gap-2 hover:translate-x-1 transition-all text-accent">
                          {project.demoText} {project.demoText !== "Coming Soon" && <ArrowRight size={14} />}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              </TiltCard>
              </Reveal3D>
            ))}
          </div>
        </section>

        <section id="experience" className="max-w-6xl mx-auto px-4 py-20 border-t border-border">
          {sectionHeading("05", "Professional Experience")}

          <div ref={timelineRef} className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-muted md:-translate-x-1/2"></div>
            <motion.div
              style={{ scaleY: timelineProgress }}
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-accent md:-translate-x-1/2 origin-top shadow-[0_0_8px_rgba(217,119,87,0.6)]"
            ></motion.div>

            <div className="space-y-12">
              {experience.map((exp, i) => (
                <Reveal3D key={i} delay={i * 0.1} className={`relative flex flex-col md:flex-row gap-8 items-start ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>

                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-accent transform -translate-x-1/2 mt-1.5 shadow-[0_0_15px_rgba(217,119,87,0.35)] z-10"></div>

                  <div className="hidden md:block w-1/2"></div>

                  <div className="w-full md:w-1/2 pl-12 md:pl-0">
                    <div className={`bg-card border border-border rounded-lg p-8 hover:border-accent/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-accent/5 group relative overflow-hidden ${i % 2 === 0 ? "md:mr-12" : "md:ml-12"}`}>
                      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-accent/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-accent/10 transition-colors duration-500 pointer-events-none"></div>

                      <div className="relative z-10">
                        <div className="inline-flex px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/30 rounded-md mb-4">
                          {exp.period}
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-foreground mb-1 group-hover:text-foreground transition-colors">{exp.role}</h3>
                        <p className="text-base font-semibold text-muted-foreground mb-6 flex items-center gap-2">
                          <MapPin size={16} /> {exp.company}
                        </p>

                        <div className="space-y-4 text-muted-foreground leading-relaxed text-sm mb-8">
                          {exp.responsibilities.map((resp, j) => (
                            <p key={j} className="flex relative pl-5">
                              <span className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-accent/60 rounded-full"></span>
                              {resp}
                            </p>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2 pt-6 border-t border-border">
                          {exp.tech.map((tech) => (
                            <span key={tech} className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs rounded-md font-medium border border-transparent hover:border-border transition-colors">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal3D>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="max-w-6xl mx-auto px-4 py-20 border-t border-border bg-gradient-to-b from-muted/20 to-background">
          <div className="grid md:grid-cols-2 gap-12">
            <div data-aos="fade-up">
              <p className="eyebrow mb-3">[06] // Contact</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4 tracking-tight">
                Let's Work Together
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Open to internships, freelance projects, and full-time opportunities in AI engineering and development.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-secondary rounded-lg min-w-[48px] min-h-[48px] flex items-center justify-center">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p className="text-muted-foreground">Burewala, Pakistan</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-secondary rounded-lg min-w-[48px] min-h-[48px] flex items-center justify-center">
                    <GraduationCap size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Education</p>
                    <p className="text-muted-foreground">Computer Science (In Progress)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-secondary rounded-lg min-w-[48px] min-h-[48px] flex items-center justify-center">
                    <Phone size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <a href="tel:+923114216514" className="text-muted-foreground hover:text-accent transition-colors">+92-311-4216514</a>
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay={200}>
              <h3 className="font-display text-2xl font-semibold mb-6 text-foreground">Send a Message</h3>
              <form onSubmit={hookFormSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Name</label>
                    <input
                      type="text"
                      {...register("name")}
                      className={`w-full px-4 py-3 bg-card border rounded-lg focus:outline-none focus:ring-1 transition-colors ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-input focus:border-accent focus:ring-accent'}`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                    <input
                      type="email"
                      {...register("email")}
                      className={`w-full px-4 py-3 bg-card border rounded-lg focus:outline-none focus:ring-1 transition-colors ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-input focus:border-accent focus:ring-accent'}`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Subject</label>
                  <input
                    type="text"
                    {...register("subject")}
                    className={`w-full px-4 py-3 bg-card border rounded-lg focus:outline-none focus:ring-1 transition-colors ${errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-input focus:border-accent focus:ring-accent'}`}
                    placeholder="Project inquiry, collaboration, etc."
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1 font-medium">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Message</label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    className={`w-full px-4 py-3 bg-card border rounded-lg focus:outline-none focus:ring-1 transition-colors resize-none ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-input focus:border-accent focus:ring-accent'}`}
                    placeholder="Tell me about your project or opportunity..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full px-6 py-3 bg-foreground text-background rounded-lg hover:opacity-85 transition-opacity font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
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
                  <span className="font-display text-xl font-semibold text-foreground">MR<span className="text-accent">.</span></span>
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
                    className="p-3 text-foreground hover:text-accent hover:bg-secondary rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
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
          className="fixed bottom-24 right-8 p-3 bg-foreground text-background rounded-full shadow-lg hover:opacity-85 transition-all z-50"
          style={{ animation: "fadeIn 0.3s ease-out" }}
          aria-label="Back to top"
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
