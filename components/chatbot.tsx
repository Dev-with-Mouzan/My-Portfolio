"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, MessageCircle, Send, X } from "lucide-react"
import { getChatResponse, initialSuggestions, portfolioData } from "@/lib/portfolio-data"
import { Markdown } from "@/components/markdown"

interface Message {
  id: number
  role: "user" | "bot"
  text: string
  suggestions?: string[]
}

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [mounted, setMounted] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)

  // Render only on the client so browser extensions that mutate the DOM
  // before hydration can't cause a server/client attribute mismatch.
  useEffect(() => setMounted(true), [])

  const pushMessage = (role: "user" | "bot", text: string, suggestions?: string[]) => {
    idRef.current += 1
    setMessages((prev) => [...prev, { id: idRef.current, role, text, suggestions }])
  }

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || typing) return

    pushMessage("user", trimmed)
    setInput("")
    setTyping(true)

    setTimeout(() => {
      const reply = getChatResponse(trimmed)
      pushMessage("bot", reply.text, reply.suggestions)
      setTyping(false)
    }, 650 + Math.random() * 450)
  }

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, typing, open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 2000)
    return () => clearTimeout(t)
  }, [])

  const openChat = () => {
    if (!open && messages.length === 0) {
      pushMessage(
        "bot",
        `> Hello. I'm mr_ai, ${portfolioData.name}'s portfolio assistant. Ask me about his skills, projects, experience, education, or how to contact him. Tap a suggestion below to start.`,
        initialSuggestions
      )
    }
    setOpen(true)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  if (!mounted) return null

  return (
    <>
      {open ? (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[70] w-[calc(100vw-2rem)] max-w-sm h-[min(560px,80vh)] flex flex-col rounded-2xl border border-border bg-card text-card-foreground shadow-2xl shadow-black/20 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 bg-background border-b border-border text-foreground">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-accent/15 text-accent">
              <Bot size={20} />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-accent border-2 border-background"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-sm leading-tight tracking-tight">
                <span className="text-accent">mr</span>@portfolio<span className="text-accent">:~$</span>
              </p>
              <p className="font-mono text-[10px] text-accent leading-tight">
                assistant ready <span className="text-muted-foreground">— ask anything</span>
                <span className="ml-0.5 inline-block w-1.5 h-3 bg-accent align-text-bottom terminal-caret"></span>
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg hover:bg-accent/20 hover:text-accent transition-colors text-muted-foreground"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
            {messages.map((m) =>
              m.role === "bot" ? (
                <div key={m.id} className="flex items-end gap-2">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-accent/10 text-accent flex-shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="max-w-[85%]">
                    <div className="px-3.5 py-2.5 bg-secondary text-secondary-foreground rounded-2xl rounded-bl-md text-[13px] leading-relaxed">
                      <Markdown>{m.text}</Markdown>
                    </div>
                    {m.suggestions && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {m.suggestions.map((s) => (
                          <button
                            key={s}
                            onClick={() => send(s)}
                            className="px-2.5 py-1 text-[11px] font-medium rounded-md border border-accent/40 text-accent hover:bg-accent/10 transition-colors"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[85%] px-3.5 py-2.5 bg-foreground text-background rounded-2xl rounded-br-md text-[13px] leading-relaxed whitespace-pre-line">
                    {m.text}
                  </div>
                </div>
              )
            )}

            {typing && (
              <div className="flex items-end gap-2">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-accent/10 text-accent flex-shrink-0">
                  <Bot size={14} />
                </div>
                <div className="px-3.5 py-2.5 bg-secondary rounded-2xl rounded-bl-md flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-border bg-card">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask about Mouzan..."
                className="flex-1 px-4 py-2.5 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                aria-label="Chat message"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || typing}
                className="flex items-center justify-center w-10 h-10 rounded-md bg-foreground text-background hover:opacity-85 transition-opacity disabled:opacity-40 flex-shrink-0"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="mt-2 text-center font-mono text-[10px] text-muted-foreground">
              built with next.js — ask me about {portfolioData.name}
            </p>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[70]">
          <button
            onClick={openChat}
            className="group relative flex items-center gap-2 px-4 py-3.5 rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 transition-all"
            aria-label="Open portfolio assistant chat"
          >
            {showHint && (
              <div className="absolute bottom-full right-0 mb-3 w-max max-w-[240px]">
                <div className="px-3.5 py-2.5 bg-card border border-accent/50 rounded-lg rounded-br-none text-xs text-foreground shadow-xl shadow-accent/15 leading-relaxed">
                  <span className="text-accent font-semibold">$</span> hi! I'm <span className="text-accent font-semibold">mr_ai</span> — ask me anything about Mouzan
                  <span className="ml-0.5 inline-block w-1.5 h-3 bg-accent align-text-bottom terminal-caret"></span>
                </div>
                <div className="absolute -bottom-1 right-4 w-2.5 h-2.5 bg-card border-b border-r border-accent/50 rotate-45"></div>
              </div>
            )}
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background text-[10px] font-bold z-10">1</span>
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent animate-ping"></span>
            <MessageCircle size={20} />
            <span className="hidden sm:inline text-sm font-semibold">Ask Me Anything</span>
          </button>
        </div>
      )}
    </>
  )
}
