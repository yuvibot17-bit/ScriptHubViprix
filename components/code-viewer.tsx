"use client"

import { useMemo, useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

const KEYWORDS = new Set([
  "and","break","do","else","elseif","end","false","for","function","goto","if","in",
  "local","nil","not","or","repeat","return","then","true","until","while",
])
const BUILTINS = new Set([
  "game","workspace","task","wait","print","pairs","ipairs","next","select","type",
  "tostring","tonumber","setmetatable","getmetatable","rawget","rawset","pcall","xpcall",
  "string","table","math","os","coroutine","script","require","warn",
])

type Token = { text: string; cls: string }

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = []
  // regex captures: comments, strings, numbers, identifiers, whitespace/other
  const re = /(--\[\[[\s\S]*?\]\]|--[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)|(\s+)|([^\sA-Za-z_]+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(line)) !== null) {
    if (m[1]) tokens.push({ text: m[1], cls: "text-muted-foreground/70 italic" })
    else if (m[2]) tokens.push({ text: m[2], cls: "text-chart-5" })
    else if (m[3]) tokens.push({ text: m[3], cls: "text-chart-3" })
    else if (m[4]) {
      const w = m[4]
      if (KEYWORDS.has(w)) tokens.push({ text: w, cls: "text-primary font-medium" })
      else if (BUILTINS.has(w)) tokens.push({ text: w, cls: "text-accent" })
      else tokens.push({ text: w, cls: "text-foreground" })
    } else if (m[5]) tokens.push({ text: m[5], cls: "" })
    else tokens.push({ text: m[6] ?? "", cls: "text-muted-foreground" })
  }
  return tokens
}

export function CodeViewer({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const lines = useMemo(() => code.replace(/\n$/, "").split("\n"), [code])

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div className={cn("overflow-hidden rounded-lg border border-border/70 bg-[oklch(0.14_0.02_279)]", className)}>
      <div className="flex items-center justify-between border-b border-border/60 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-chart-3/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-chart-5/70" />
          <span className="ml-2 font-mono text-xs text-muted-foreground">script.lua</span>
        </div>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="max-h-[420px] overflow-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="mr-4 w-8 shrink-0 select-none text-right text-muted-foreground/40">{i + 1}</span>
              <span className="whitespace-pre">
                {tokenizeLine(line).map((t, j) => (
                  <span key={j} className={t.cls}>
                    {t.text}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}
