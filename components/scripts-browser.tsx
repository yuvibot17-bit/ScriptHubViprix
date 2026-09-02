"use client"

import { useMemo, useState } from "react"
import { Search, X, Download, User, Gamepad2, Tag } from "lucide-react"
import { CodeViewer } from "@/components/code-viewer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Script, ScriptCategory } from "@/lib/mock-data"

const CATEGORIES: (ScriptCategory | "All")[] = ["All", "Free", "Premium", "Key System"]

function categoryVariant(cat: ScriptCategory) {
  if (cat === "Free") return "success" as const
  if (cat === "Premium") return "default" as const
  return "warning" as const
}

export function ScriptsBrowser({ scripts }: { scripts: Script[] }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All")
  const [active, setActive] = useState<Script | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return scripts.filter((s) => {
      const matchesCat = category === "All" || s.category === category
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.game.toLowerCase().includes(q) ||
        s.author.toLowerCase().includes(q)
      return matchesCat && matchesQuery
    })
  }, [scripts, query, category])

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scripts, games, authors..."
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-sm outline-none ring-primary/40 transition focus:ring-2"
            aria-label="Search scripts"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                category === c
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "script" : "scripts"}
      </p>

      {/* Grid */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <Card key={s.id} className="flex flex-col transition-colors hover:border-primary/40">
            <CardContent className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-lg font-semibold leading-tight">{s.name}</h3>
                <Badge variant={categoryVariant(s.category)}>{s.category}</Badge>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>

              <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <Meta icon={Gamepad2} label={s.game} />
                <Meta icon={User} label={s.author} />
                <Meta icon={Tag} label={`v${s.version}`} />
                <Meta icon={Download} label={s.downloads.toLocaleString()} />
              </dl>

              <Button className="mt-5 w-full" variant="secondary" onClick={() => setActive(s)}>
                View code
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-muted-foreground">No scripts match your search.</p>
        </div>
      )}

      {/* Detail modal */}
      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-background/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} details`}
          onClick={() => setActive(null)}
        >
          <div
            className="max-h-[92dvh] w-full max-w-3xl overflow-auto rounded-t-2xl border border-border bg-card p-6 shadow-2xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-xl font-bold">{active.name}</h2>
                  <Badge variant={categoryVariant(active.category)}>{active.category}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{active.description}</p>
              </div>
              <button
                onClick={() => setActive(null)}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Gamepad2 className="h-4 w-4" /> {active.game}</span>
              <span className="inline-flex items-center gap-1.5"><User className="h-4 w-4" /> {active.author}</span>
              <span className="inline-flex items-center gap-1.5"><Tag className="h-4 w-4" /> v{active.version}</span>
              <span className="inline-flex items-center gap-1.5"><Download className="h-4 w-4" /> {active.downloads.toLocaleString()}</span>
            </div>

            <div className="mt-5">
              <CodeViewer code={active.code} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Meta({ icon: Icon, label }: { icon: typeof User; label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 truncate">
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate">{label}</span>
    </div>
  )
}
