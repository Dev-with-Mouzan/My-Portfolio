export const portfolioData = {
  name: "Mouzan Raza",
  title: "GenAI Developer",
  tagline:
    "I build production-ready AI applications — RAG systems, LLM pipelines, and intelligent backends that solve real problems.",
  location: "Burewala, Pakistan",
  email: "mouzan.ai.dev@gmail.com",
  phone: "+92-311-4216514",
  resume: "/Mouzan_Raza_Resume.docx",
  availability: "Open to full-time, freelance, internships, and collaboration opportunities.",
  status: "Available for hire",
  education: {
    degree: "B.Sc. Computer Science (BSCS)",
    university: "GC University Faisalabad (GCUF)",
    semester: "7th Semester",
    cgpa: "3.85 / 4.00",
  },
  github: {
    username: "Dev-with-Mouzan",
    url: "https://github.com/Dev-with-Mouzan",
    repos: 35,
  },
  socials: {
    github: "https://github.com/Dev-with-Mouzan",
    linkedin: "https://www.linkedin.com/in/mouzan-raza-979230385",
    twitter: "https://x.com/MouzanR10223",
    facebook: "https://facebook.com/share/1Gt6qAAzhd",
  },
  focusAreas: [
    "RAG Systems (vector & vectorless)",
    "Agentic AI & Multi-Agent Orchestration",
    "LLM Applications & Fine-tuning",
    "AI Automation & Workflow Engineering",
    "ML Pipelines & REST APIs",
  ],
  experience: [
    {
      role: "Freelance GenAI Developer",
      company: "Independent Freelancer",
      period: "Dec 2025 - Present",
      details:
        "Working full-time as a freelancer, mainly with local clients. Delivering academic and production AI projects — Fake News Detection (LangChain), AI Study Planner, Fruit Classification, Role-Based Prompt Generator, and a Code Reviewer (LangGraph + LangChain). Currently building a multi-agent system to generate freelance leads.",
    },
    {
      role: "ML Engineer (Internship)",
      company: "WebTech.dev, Vehari, Pakistan",
      period: "Jun 2025 - Dec 2025",
      details:
        "6-month internship. Trained machine learning models on real client datasets and monitored model performance in production.",
    },
  ],
  skills: [
    {
      category: "Generative AI & LLMs",
      items: [
        "LangGraph",
        "CrewAI",
        "RAG Systems",
        "Prompt Engineering",
        "Fine-Tuning (LoRA/QLoRA)",
        "LLM Evaluation",
        "Context Engineering",
        "OpenAI API",
        "Anthropic API",
        "HuggingFace Transformers",
      ],
    },
    {
      category: "Machine Learning & Deep Learning",
      items: ["Scikit-learn", "TensorFlow", "Keras", "XGBoost", "LightGBM", "CatBoost", "BERT/DistilBERT", "NLP Pipelines", "CNN", "RNN/LSTM", "Transformers"],
    },
    {
      category: "Backend Development",
      items: ["FastAPI", "REST APIs", "Pydantic", "JWT Authentication", "PostgreSQL", "MySQL", "SQLite", "Docker", "GitHub Actions"],
    },
    {
      category: "Data & Vector Databases",
      items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "FAISS", "Chroma", "Pinecone", "pgvector"],
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Streamlit", "Gradio", "Google Colab", "LangSmith"],
    },
  ],
  projects: [
    {
      name: "CareerCopilot AI",
      description:
        "Multi-agent career assistant (CrewAI + FastAPI) with a mixed-LLM setup — Groq (Llama-3.1) for fast tool-calling web scraping and Gemini for deep ATS analysis and strategic reasoning.",
      url: "https://github.com/Dev-with-Mouzan/CareerCopilot_AI.git",
    },
    {
      name: "FounderLens AI",
      description:
        "Multi-agent business analysis system (CrewAI + FastAPI). A sequential 6-agent pipeline (intake, insight, conflict, planning, simulation, recovery) analyzes CSV/PDF/website data for risk, market trends, and growth strategies.",
      url: "https://github.com/Dev-with-Mouzan/FounderLens_AI.git",
      demo: "https://founderai-production-a4e4.up.railway.app/",
    },
    {
      name: "Fake News Detection System",
      description: "Classifies news articles as real or fake using LLM-based analysis built with LangChain.",
      url: "https://github.com/Dev-with-Mouzan",
    },
    {
      name: "Code Reviewer",
      description: "Agentic code review system (LangGraph + LangChain) that identifies bugs and suggests improvements.",
      url: "https://github.com/Dev-with-Mouzan",
    },
    {
      name: "AI Study Planner",
      description: "Generates personalized study schedules and revision plans based on subjects and deadlines.",
      url: "https://github.com/Dev-with-Mouzan",
    },
    {
      name: "Fruit Classification System",
      description: "Deep learning (CNN) image classification system that recognizes fruit types.",
      url: "https://github.com/Dev-with-Mouzan",
    },
    {
      name: "Role-Based Prompt Generator",
      description: "Generates tailored prompts based on user role and context for more effective LLM usage.",
      url: "https://github.com/Dev-with-Mouzan",
    },
  ],
  funFacts: [
    "Mouzan is a 7th-semester BS Computer Science student at GC University Faisalabad.",
    "He started with a 6-month ML internship at WebTech.dev and now freelances full-time in GenAI.",
    "He is currently building a multi-agent system that autonomously generates his own freelancing leads.",
    "He specializes in CrewAI multi-agent systems, LangGraph workflows, and RAG pipelines.",
    "He maintains a 3.85 CGPA at GCUF while shipping real client projects.",
  ],
}

export interface ChatReply {
  text: string
  suggestions?: string[]
}

export const initialSuggestions = [
  "Who is Mouzan?",
  "What are his skills?",
  "Projects",
  "Experience",
  "Contact",
  "Hire Me",
]

interface ChatPattern {
  id: string
  keywords: string[]
  reply: () => ChatReply
}

const aboutReply = (): ChatReply => ({
  text: `${portfolioData.name} is a ${portfolioData.title} — a ${portfolioData.education.semester.toLowerCase()} Computer Science student at ${portfolioData.education.university} with a CGPA of ${portfolioData.education.cgpa} and around 1 year of hands-on experience in ML and GenAI.\n\n${portfolioData.tagline}\n\nHe started with a 6-month ML internship at WebTech.dev (Vehari) and now works full-time as a freelancer, specializing in multi-agent systems, RAG pipelines, and agentic workflows. He is currently ${portfolioData.status.toLowerCase()}.`,
  suggestions: ["Skills", "Projects", "Experience", "Contact"],
})

const skillsReply = (): ChatReply => ({
  text: `Here are Mouzan's core skills:\n\n${portfolioData.skills
    .map((s) => `${s.category}: ${s.items.slice(0, 6).join(", ")}${s.items.length > 6 ? "..." : ""}`)
    .join("\n")}\n\nAsk me about RAG, agentic AI, or fine-tuning for more detail.`,
  suggestions: ["RAG systems", "Agentic AI", "Fine-tuning"],
})

const experienceReply = (): ChatReply => ({
  text: `Mouzan's professional experience:\n\n${portfolioData.experience
    .map((e, i) => `${i + 1}. ${e.role} — ${e.company} (${e.period})\n   ${e.details}`)
    .join("\n\n")}\n\nAsk me about his projects to see what he has built.`,
  suggestions: ["Projects", "Who is Mouzan?", "Contact"],
})

const projectsReply = (): ChatReply => ({
  text: `Featured projects by Mouzan:\n\n${portfolioData.projects
    .map((p, i) => `${i + 1}. ${p.name} — ${p.description} (${p.url})`)
    .join("\n")}\n\nAll source code is public on GitHub.`,
  suggestions: ["GitHub", "Experience", "Hire Me"],
})

const educationReply = (): ChatReply => ({
  text: `Education:\n\n- ${portfolioData.education.degree}\n- ${portfolioData.education.university}\n- ${portfolioData.education.semester}\n- CGPA: ${portfolioData.education.cgpa}\n\nHe is specializing in Generative AI engineering while maintaining a strong academic record.`,
})

const contactReply = (): ChatReply => ({
  text: `You can reach Mouzan at:\n\n- Email: ${portfolioData.email}\n- Phone: ${portfolioData.phone}\n- GitHub: ${portfolioData.github.url}\n- LinkedIn: ${portfolioData.socials.linkedin}\n- Twitter/X: ${portfolioData.socials.twitter}\n\nThe contact form on this site works too.`,
  suggestions: ["Hire Me", "Resume", "Location"],
})

const availabilityReply = (): ChatReply => ({
  text: `Great news — Mouzan is ${portfolioData.status.toLowerCase()}.\n\n${portfolioData.availability}\n\nHe is interested in RAG systems, agentic AI, LLM applications, and automation projects. Send him a message via the contact section or email him at ${portfolioData.email}.`,
  suggestions: ["Contact", "Skills", "Projects"],
})

const resumeReply = (): ChatReply => ({
  text: `You can download Mouzan's resume from the homepage (Download Resume button) or directly at ${portfolioData.resume}.\n\nHere is a quick summary: ${portfolioData.title} with ${portfolioData.experience.length} professional roles and 7+ AI projects.`,
})

const locationReply = (): ChatReply => ({
  text: `Mouzan is based in Burewala, Pakistan, and works remotely with clients around the world. His timezone is Pakistan Standard Time (PKT, UTC+5).`,
  suggestions: ["Hire Me", "Contact"],
})

const githubReply = (): ChatReply => ({
  text: `Mouzan's GitHub is ${portfolioData.github.url} — ${portfolioData.github.repos}+ public repositories.\n\nHighlights:\n- CareerCopilot_AI\n- FounderLens_AI\n\nYou can also ask me about his projects for more detail.`,
  suggestions: ["Projects", "Contact"],
})

const focusReply = (): ChatReply => ({
  text: `Mouzan's main focus areas:\n\n${portfolioData.focusAreas.map((f) => `- ${f}`).join("\n")}\n\nAsk me about RAG systems, agent orchestration, or LLM fine-tuning.`,
  suggestions: ["What are his skills?", "Projects", "Experience"],
})

const funFactReply = (): ChatReply => ({
  text: `A few things you may not know:\n\n${portfolioData.funFacts.map((f) => `- ${f}`).join("\n")}`,
  suggestions: ["Who is Mouzan?", "Projects"],
})

const greetingReply = (): ChatReply => ({
  text: `Hello! I am Mouzan AI, the portfolio assistant. Ask me anything about ${portfolioData.name} — his skills, projects, experience, or contact info.`,
  suggestions: initialSuggestions,
})

const helpReply = (): ChatReply => ({
  text: `You can ask me things like:\n\n- "Who is Mouzan?"\n- "What are his skills?"\n- "Tell me about his projects"\n- "Work experience"\n- "Contact information"\n- "Is he available for hire?"\n- "Resume" or "GitHub"`,
  suggestions: initialSuggestions,
})

const thanksReply = (): ChatReply => ({
  text: `You are welcome! If you want to work with Mouzan, head to the contact section. Have a great day.`,
  suggestions: ["Hire Me", "Contact"],
})

const byeReply = (): ChatReply => ({
  text: `Thanks for visiting ${portfolioData.name}'s portfolio! If you have more questions, just reopen this chat anytime.`,
})

const rateReply = (): ChatReply => ({
  text: `Rates depend on scope and engagement type (freelance vs full-time). The best way to get an accurate quote is to reach out directly — ${portfolioData.email}.`,
  suggestions: ["Hire Me", "Contact"],
})

const websiteReply = (): ChatReply => ({
  text: `This is ${portfolioData.name}'s portfolio — built with Next.js, TypeScript, and Tailwind CSS. It showcases his AI projects, skills, and experience. I am the chatbot that lives on it.`,
  suggestions: ["Projects", "Skills"],
})

const patterns: ChatPattern[] = [
  { id: "who", keywords: ["who is mouzan", "who are you", "about you", "about mouzan", "tell me about", "introduce yourself", "yourself", "who made", "who built"], reply: aboutReply },
  { id: "skills", keywords: ["skills", "technolog", "tech stack", "tools", "languages", "framework", "stack", "expertise"], reply: skillsReply },
  { id: "experience", keywords: ["experience", "work history", "career", "jobs", "job history", "professional", "employed", "worked at", "freelance", "employment"], reply: experienceReply },
  { id: "projects", keywords: ["projects", "project", "built", "created", "made", "portfolio", "products", "repositor", "repo", "source code"], reply: projectsReply },
  { id: "education", keywords: ["education", "university", "degree", "studying", "study", "college", "bachelor", "gcuf", "cgpa", "grades", "semester", "academic"], reply: educationReply },
  { id: "contact", keywords: ["contact", "email", "reach", "phone", "phone number", "whatsapp", "call", "linkedin", "message", "get in touch", "social"], reply: contactReply },
  { id: "availability", keywords: ["hire", "available", "open to work", "opportunit", "collaborat", "full-time", "full time", "internship", "contract"], reply: availabilityReply },
  { id: "resume", keywords: ["resume", "cv", "curriculum", "download"], reply: resumeReply },
  { id: "location", keywords: ["location", "where do you live", "where are you", "based", "country", "city", "timezone"], reply: locationReply },
  { id: "github", keywords: ["github", "open source", "open-source", "git", "repositories"], reply: githubReply },
  { id: "focus", keywords: ["genai", "generative ai", "llm", "llms", "rag", "agents", "agentic", "langgraph", "crewai", "automation", "machine learning", "deep learning", "fine-tuning", "fine tuning", "fine tune"], reply: focusReply },
  { id: "funfact", keywords: ["fun fact", "hobby", "interests", "passion", "fun facts"], reply: funFactReply },
  { id: "help", keywords: ["help", "what can you do", "commands", "how do you work", "options"], reply: helpReply },
  { id: "thanks", keywords: ["thanks", "thank you", "thx", "great", "awesome", "nice", "cool", "helpful"], reply: thanksReply },
  { id: "bye", keywords: ["bye", "goodbye", "see you", "good night", "goodbye"], reply: byeReply },
  { id: "rate", keywords: ["rate", "salary", "pay", "price", "cost", "charge"], reply: rateReply },
  { id: "website", keywords: ["website", "this site", "this page", "who made this"], reply: websiteReply },
  { id: "greeting", keywords: ["hi", "hello", "hey", "salam", "salaam", "assalam", "good morning", "good evening", "yo", "hiya"], reply: greetingReply },
]

export function getChatResponse(raw: string): ChatReply {
  const q = raw.toLowerCase().replace(/[?.!,;]+$/, "")

  if (!q.trim()) {
    return { text: "Please type a message so I can help you learn more about Mouzan.", suggestions: initialSuggestions }
  }

  let best: { score: number; reply: ChatReply } | null = null

  for (const pattern of patterns) {
    let score = 0
    for (const keyword of pattern.keywords) {
      if (q.includes(keyword)) {
        score += keyword.length
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { score, reply: pattern.reply() }
    }
  }

  if (best) return best.reply

  return {
    text: "Hmm, I am not sure about that one. I am just a small portfolio assistant trained on Mouzan's info. Try asking about his skills, projects, experience, or contact details.",
    suggestions: initialSuggestions,
  }
}
