"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Download, Search, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CodeBlock } from "@/components/code-block"
import { Button } from "@/components/ui/button"

const scripts = [
  { id: 1, name: "Island Utilities", game: "Universal", version: "2.4.1", category: "Free", description: "A clean collection of quality-of-life utilities for your own Roblox experiences.", code: "local Players = game:GetService(\"Players\")\nlocal player = Players.LocalPlayer\nprint(\"VipriX utilities ready for \" .. player.Name)" },
  { id: 2, name: "Studio Toolkit", game: "Roblox Studio", version: "1.8.0", category: "Premium", description: "Productivity helpers for creators building and testing their own experiences.", code: "local Selection = game:GetService(\"Selection\")\nlocal objects = Selection:Get()\nprint(\"Selected objects:\", #objects)" },
  { id: 3, name: "UI Components", game: "Universal", version: "1.2.0", category: "Free", description: "Reusable interface patterns for legitimate Roblox Studio projects.", code: "local function createLabel(parent, text)\n  local label = Instance.new(\"TextLabel\")\n  label.Text = text\n  label.Parent = parent\n  return label\nend" },
]

export default function ScriptsPage() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const filtered = useMemo(() => scripts.filter((script) => (category === "All" || script.category === category) && `${script.name} ${script.game} ${script.description}`.toLowerCase().includes(query.toLowerCase())), [query, category])
  return <div className="min-h-dvh"><Navbar /><main className="mx-auto max-w-6xl px-4 py-16 sm:py-24"><div className="max-w-2xl"><div className="eyebrow"><Sparkles className="h-3.5 w-3.5" /> Curated library</div><h1 className="mt-5 font-display text-5xl font-bold tracking-tight sm:text-7xl">Scripts made <span className="text-gradient">simple.</span></h1><p className="mt-5 text-lg leading-relaxed text-muted-foreground">Browse tools and components built for creators and your own Roblox Studio projects.</p></div><div className="mt-12 flex flex-col gap-3 sm:flex-row"><label className="relative flex-1"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input aria-label="Search scripts" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search scripts..." className="h-12 w-full rounded-xl border border-border bg-card/70 pl-11 pr-4 outline-none transition focus:border-primary" /></label><div className="flex gap-2">{["All", "Free", "Premium"].map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-xl border px-4 text-sm ${category === item ? "border-primary bg-primary/15 text-primary" : "border-border bg-card/50 text-muted-foreground"}`}>{item}</button>)}</div></div><div className="mt-8 grid gap-5 lg:grid-cols-2">{filtered.map((script) => <article key={script.id} className="glass-panel overflow-hidden p-6"><div className="flex items-start justify-between gap-4"><div><span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">{script.category}</span><h2 className="mt-4 font-display text-2xl font-semibold">{script.name}</h2><p className="mt-1 text-sm text-muted-foreground">{script.game} · v{script.version}</p></div><Download className="h-5 w-5 text-muted-foreground" /></div><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{script.description}</p><div className="mt-5"><CodeBlock code={script.code} maxHeight="10rem" /></div><div className="mt-4 flex gap-3"><Button size="sm" asChild><a href={`/api/scripts/${script.id}/download`}>Download .lua</a></Button><Button size="sm" variant="outline" asChild><Link href="/loader">Manage</Link></Button></div></article>)}</div></main><Footer /></div>
}

export const dynamic = "force-dynamic"

// Search/filtering intentionally runs in the browser for instant feedback.

type Unused = never
void (0 as Unused)
