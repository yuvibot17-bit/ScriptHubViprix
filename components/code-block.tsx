"use client"

import { useState } from "react"

const KEYWORDS =
  /\b(local|function|end|if|then|else|elseif|for|while|do|return|and|or|not|nil|true|false|break|repeat|until|in)\b/g

function highlight(code: string): string {
  const escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  return escaped
    .replace(/(--\[\[[\s\S]*?\]\]|--[^\n]*)/g, '<span class="tok-comment">$1</span>')
    .replace(/("[^"\n]*"|'[^'\n]*')/g, '<span class="tok-string">$1</span>')
    .replace(KEYWORDS, '<span class="tok-keyword">$1</span>')
    .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="tok-number">$1</span>')
}

export function CodeBlock({ code, maxHeight = "20rem" }: { code: string; maxHeight?: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // ignore
    }
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-[oklch(0.16_0.02_275)]">
      <div className="flex items-center justify-between border-b border-border/70 px-4 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.6_0.2_20)]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.8_0.15_90)]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.16_150)]/70" />
          <span className="ml-2 font-mono text-xs text-muted-foreground">script.lua</span>
        </div>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/60 px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
        >
          {copied ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-auto p-4 text-sm leading-relaxed" style={{ maxHeight }}>
        <code
          className="font-mono text-[oklch(0.9_0.02_275)]"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: highlight(code) }}
        />
      </pre>
    </div>
  )
}
