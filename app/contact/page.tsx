"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { useState } from "react"
import { Spinner } from "@/components/spinner"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setStatus("idle"), 3000)
      } else {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 3000)
      }
    } catch (error) {
      console.error("Contact form submission error:", error)
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/Dev-with-Mouzan",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      color: "hover:text-gray-400",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/mouzan-raza-979230385?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.945v5.442h-3.554s.05-8.805 0-9.719h3.554v1.375c.427-.659 1.191-1.595 2.897-1.595 2.117 0 3.704 1.385 3.704 4.362v5.577zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.704 0-.951.768-1.703 1.959-1.703 1.188 0 1.914.752 1.939 1.703 0 .946-.751 1.704-1.983 1.704zm1.946 11.019H3.39V9.714h3.893v10.738zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
      ),
      color: "hover:text-blue-500",
    },
    {
      name: "Twitter",
      href: "https://x.com/MouzanR10223?t=0yYk7eQ9_6rbEq13xMEhzQ&s=09",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      color: "hover:text-sky-400",
    },
    {
      name: "Email",
      href: "mailto:mouzan.ai.dev@gmail.com",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
      color: "hover:text-orange-500",
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="space-y-12">
            {/* Social Links Section */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex flex-col items-center justify-center p-6 bg-background border border-border rounded-xl transition-all duration-300 ${link.color} text-foreground hover:border-primary hover:bg-primary/5`}
                  >
                    {link.icon}
                    <span className="text-sm font-semibold mt-3">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-6">
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Have a project in mind or want to discuss AI automation opportunities? I'd love to hear from you. Send
                  me a message and I'll respond as soon as possible.
                </p>
              </div>
              <h2 className="text-2xl font-bold">Send me a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Project inquiry, collaboration, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 flex items-center justify-center gap-2 duration-300"
                >
                  {status === "loading" && <Spinner />}
                  {status === "idle" && "Send Message"}
                  {status === "success" && "✓ Message sent!"}
                  {status === "error" && "Failed to send"}
                </button>

                {status === "success" && (
                  <p className="text-center text-accent font-medium">
                    Thanks for reaching out! I'll get back to you soon.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
