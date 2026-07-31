"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="my-1.5 first:mt-0 last:mb-0">{children}</p>,
        strong: ({ children }) => <strong className="text-accent font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 break-all hover:brightness-125"
          >
            {children}
          </a>
        ),
        code: ({ children }) => (
          <code className="px-1 py-0.5 rounded bg-accent/10 text-accent font-mono text-[12px]">{children}</code>
        ),
        pre: ({ children }) => (
          <pre className="p-2.5 my-1.5 rounded-md bg-black/40 border border-border font-mono text-[12px] text-foreground overflow-x-auto whitespace-pre-wrap break-words">
            {children}
          </pre>
        ),
        ul: ({ children }) => (
          <ul className="my-1.5 space-y-1 list-disc pl-4 marker:text-accent">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="my-1.5 space-y-1 list-decimal pl-4 marker:text-accent font-medium">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        h1: ({ children }) => <p className="my-1.5 font-display font-semibold text-[13.5px] text-foreground">{children}</p>,
        h2: ({ children }) => <p className="my-1.5 font-display font-semibold text-[13.5px] text-foreground">{children}</p>,
        h3: ({ children }) => <p className="my-1.5 font-semibold text-[13px] text-foreground">{children}</p>,
        hr: () => <hr className="my-2 border-border" />,
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-accent pl-2 my-1.5 text-muted-foreground italic">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="my-1.5 overflow-x-auto">
            <table className="w-full text-[12px] border-collapse">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-border px-2 py-1 text-left text-accent font-semibold">{children}</th>
        ),
        td: ({ children }) => <td className="border border-border px-2 py-1">{children}</td>,
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
