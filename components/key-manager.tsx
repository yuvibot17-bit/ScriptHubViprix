"use client"

import { useState } from "react"
import { KeyRound, Plus, Power, Copy, Check, Clock, Calendar, Infinity as InfinityIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { KeyStatus, KeyTier, LicenseKey } from "@/lib/mock-data"

const TIER_META: Record<KeyTier, { label: string; icon: typeof Clock; blurb: string; ttlDays: number | null }> = {
  trial: { label: "Trial", icon: Clock, blurb: "24-hour access", ttlDays: 1 },
  monthly: { label: "Monthly", icon: Calendar, blurb: "30-day access", ttlDays: 30 },
  lifetime: { label: "Lifetime", icon: InfinityIcon, blurb: "Never expires", ttlDays: null },
}

function statusVariant(s: KeyStatus) {
  if (s === "active") return "success" as const
  if (s === "expired") return "danger" as const
  return "outline" as const
}

function randomKey(tier: KeyTier) {
  const seg = () =>
    Math.random().toString(36).slice(2, 6).toUpperCase()
  const prefix = tier === "trial" ? "TRIAL" : tier === "monthly" ? "MNTH" : "LIFE"
  return `VPRX-${prefix}-${seg()}-${seg()}`
}

function addDays(days: number) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

// simple client-side rate limit: max 5 generations per minute
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60_000

export function KeyManager({ initialKeys }: { initialKeys: LicenseKey[] }) {
  const [keys, setKeys] = useState<LicenseKey[]>(initialKeys)
  const [tier, setTier] = useState<KeyTier>("trial")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [genTimes, setGenTimes] = useState<number[]>([])
  const [rateWarning, setRateWarning] = useState(false)

  function generate() {
    const now = Date.now()
    const recent = genTimes.filter((t) => now - t < RATE_WINDOW_MS)
    if (recent.length >= RATE_LIMIT) {
      setRateWarning(true)
      setTimeout(() => setRateWarning(false), 3000)
      return
    }
    const meta = TIER_META[tier]
    const newKey: LicenseKey = {
      id: `key_${now}`,
      key: randomKey(tier),
      tier,
      status: "inactive",
      createdAt: new Date().toISOString().slice(0, 10),
      expiresAt: meta.ttlDays ? addDays(meta.ttlDays) : null,
      boundTo: null,
    }
    setKeys((k) => [newKey, ...k])
    setGenTimes([...recent, now])
  }

  function toggle(id: string) {
    setKeys((k) =>
      k.map((key) =>
        key.id === id
          ? { ...key, status: key.status === "active" ? "inactive" : key.status === "inactive" ? "active" : key.status }
          : key,
      ),
    )
  }

  async function copyKey(k: LicenseKey) {
    try {
      await navigator.clipboard.writeText(k.key)
      setCopiedId(k.id)
      setTimeout(() => setCopiedId(null), 1500)
    } catch {
      // ignore
    }
  }

  const activeCount = keys.filter((k) => k.status === "active").length

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      {/* Generator */}
      <div className="space-y-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary">
                <KeyRound className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-base font-semibold">Generate a key</h2>
                <p className="text-xs text-muted-foreground">Choose a tier and issue instantly</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {(Object.keys(TIER_META) as KeyTier[]).map((t) => {
                const meta = TIER_META[t]
                const selected = tier === t
                return (
                  <button
                    key={t}
                    onClick={() => setTier(t)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors",
                      selected ? "border-primary bg-primary/10" : "border-border hover:border-primary/40",
                    )}
                  >
                    <meta.icon className={cn("h-4 w-4", selected ? "text-primary" : "text-muted-foreground")} />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{meta.label}</div>
                      <div className="text-xs text-muted-foreground">{meta.blurb}</div>
                    </div>
                    <span
                      className={cn(
                        "h-4 w-4 rounded-full border",
                        selected ? "border-primary bg-primary" : "border-border",
                      )}
                    />
                  </button>
                )
              })}
            </div>

            <Button className="mt-4 w-full" onClick={generate}>
              <Plus className="mr-1 h-4 w-4" /> Generate key
            </Button>
            {rateWarning && (
              <p className="mt-2 text-center text-xs text-destructive">
                Rate limit reached. Please wait a moment.
              </p>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <MiniStat label="Total keys" value={keys.length} />
          <MiniStat label="Active" value={activeCount} />
        </div>
      </div>

      {/* Key list */}
      <Card>
        <CardContent className="p-0">
          <div className="border-b border-border/60 px-5 py-4">
            <h2 className="font-display text-base font-semibold">Your keys</h2>
            <p className="text-xs text-muted-foreground">Activate, deactivate, and copy your license keys</p>
          </div>
          <ul className="divide-y divide-border/60">
            {keys.map((k) => {
              const meta = TIER_META[k.tier]
              return (
                <li key={k.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <code className="truncate font-mono text-sm text-foreground">{k.key}</code>
                      <button
                        onClick={() => copyKey(k)}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="Copy key"
                      >
                        {copiedId === k.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><meta.icon className="h-3.5 w-3.5" /> {meta.label}</span>
                      <span>{k.expiresAt ? `Expires ${k.expiresAt}` : "No expiry"}</span>
                      <span>{k.boundTo ? `Bound to ${k.boundTo}` : "Unbound"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusVariant(k.status)}>{k.status}</Badge>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => toggle(k.id)}
                      disabled={k.status === "expired"}
                    >
                      <Power className="mr-1 h-3.5 w-3.5" />
                      {k.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <div className="font-display text-2xl font-bold">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  )
}
