"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Users as UsersIcon,
  Code2,
  KeyRound,
  Megaphone,
  Download,
  CreditCard,
  TrendingUp,
  Trash2,
  Pencil,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  analytics,
  announcements as seedAnnouncements,
  keys,
  scripts,
  stats,
  users,
  type AppUser,
  type UserRole,
} from "@/lib/mock-data"

type Tab = "overview" | "users" | "scripts" | "keys" | "announcements"

const TABS: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: UsersIcon },
  { id: "scripts", label: "Scripts", icon: Code2 },
  { id: "keys", label: "Keys", icon: KeyRound },
  { id: "announcements", label: "Announcements", icon: Megaphone },
]

function roleVariant(r: UserRole) {
  if (r === "admin") return "default" as const
  if (r === "moderator") return "warning" as const
  return "outline" as const
}

export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("overview")

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      {/* Side nav */}
      <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              tab === t.id ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </nav>

      <div>
        {tab === "overview" && <Overview />}
        {tab === "users" && <UsersTab />}
        {tab === "scripts" && <ScriptsTab />}
        {tab === "keys" && <KeysTab />}
        {tab === "announcements" && <AnnouncementsTab />}
      </div>
    </div>
  )
}

/* ---------- Overview ---------- */

function Overview() {
  const maxDownloads = Math.max(...analytics.downloadsByDay.map((d) => d.value))
  const maxKeys = Math.max(...analytics.keysByTier.map((k) => k.value))

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={Code2} label="Scripts" value={stats.scripts.toLocaleString()} />
        <KpiCard icon={UsersIcon} label="Users" value={stats.users.toLocaleString()} />
        <KpiCard icon={Download} label="Downloads" value={stats.downloads.toLocaleString()} />
        <KpiCard icon={TrendingUp} label="Uptime" value={stats.uptime} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardContent className="p-5">
            <h3 className="font-display text-base font-semibold">Downloads this week</h3>
            <div className="mt-6 flex items-end justify-between gap-3">
              {analytics.downloadsByDay.map((d) => (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-primary/50 to-primary"
                    style={{ height: `${Math.round((d.value / maxDownloads) * 176)}px` }}
                    title={d.value.toLocaleString()}
                  />
                  <span className="text-xs text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h3 className="font-display text-base font-semibold">Keys by tier</h3>
            <div className="mt-6 space-y-4">
              {analytics.keysByTier.map((k) => (
                <div key={k.tier}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{k.tier}</span>
                    <span className="font-medium">{k.value}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${(k.value / maxKeys) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment placeholder */}
      <Card>
        <CardContent className="flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-accent">
              <CreditCard className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold">Payments</h3>
              <p className="text-sm text-muted-foreground">
                Connect a payment provider to sell premium keys. (Placeholder)
              </p>
            </div>
          </div>
          <Button variant="secondary">Configure provider</Button>
        </CardContent>
      </Card>
    </div>
  )
}

function KpiCard({ icon: Icon, label, value }: { icon: typeof Code2; label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{label}</span>
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="mt-2 font-display text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}

/* ---------- Users ---------- */

function UsersTab() {
  const [list, setList] = useState<AppUser[]>(users)

  function cycleRole(id: string) {
    const order: UserRole[] = ["user", "moderator", "admin"]
    setList((u) =>
      u.map((usr) =>
        usr.id === id ? { ...usr, role: order[(order.indexOf(usr.role) + 1) % order.length] } : usr,
      ),
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <SectionHead title="User management" subtitle="Manage roles and access" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-medium">User</th>
                <th className="px-5 py-3 font-medium">Discord</th>
                <th className="px-5 py-3 font-medium">Joined</th>
                <th className="px-5 py-3 font-medium">Keys</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {list.map((u) => (
                <tr key={u.id}>
                  <td className="px-5 py-3 font-medium">{u.username}</td>
                  <td className="px-5 py-3 text-muted-foreground">{u.discord}</td>
                  <td className="px-5 py-3 text-muted-foreground">{u.joinedAt}</td>
                  <td className="px-5 py-3 text-muted-foreground">{u.keysOwned}</td>
                  <td className="px-5 py-3">
                    <Badge variant={roleVariant(u.role)}>{u.role}</Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Button size="sm" variant="ghost" onClick={() => cycleRole(u.id)}>
                      Change role
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

/* ---------- Scripts ---------- */

function ScriptsTab() {
  const [list, setList] = useState(scripts)

  function remove(id: string) {
    setList((s) => s.filter((x) => x.id !== id))
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
          <div>
            <h2 className="font-display text-base font-semibold">Scripts</h2>
            <p className="text-xs text-muted-foreground">Add, edit, and delete scripts</p>
          </div>
          <Button size="sm">Add script</Button>
        </div>
        <ul className="divide-y divide-border/60">
          {list.map((s) => (
            <li key={s.id} className="flex items-center justify-between gap-3 px-5 py-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium">{s.name}</span>
                  <Badge variant="outline">v{s.version}</Badge>
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {s.game} · {s.author} · {s.downloads.toLocaleString()} downloads
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button size="sm" variant="ghost" aria-label="Edit script">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" aria-label="Delete script" onClick={() => remove(s.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </li>
          ))}
          {list.length === 0 && (
            <li className="px-5 py-10 text-center text-sm text-muted-foreground">No scripts.</li>
          )}
        </ul>
      </CardContent>
    </Card>
  )
}

/* ---------- Keys ---------- */

function KeysTab() {
  return (
    <Card>
      <CardContent className="p-0">
        <SectionHead title="All keys" subtitle="Every issued license key" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-medium">Key</th>
                <th className="px-5 py-3 font-medium">Tier</th>
                <th className="px-5 py-3 font-medium">Bound to</th>
                <th className="px-5 py-3 font-medium">Expires</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {keys.map((k) => (
                <tr key={k.id}>
                  <td className="px-5 py-3 font-mono text-xs">{k.key}</td>
                  <td className="px-5 py-3 capitalize text-muted-foreground">{k.tier}</td>
                  <td className="px-5 py-3 text-muted-foreground">{k.boundTo ?? "—"}</td>
                  <td className="px-5 py-3 text-muted-foreground">{k.expiresAt ?? "Never"}</td>
                  <td className="px-5 py-3">
                    <Badge
                      variant={k.status === "active" ? "success" : k.status === "expired" ? "danger" : "outline"}
                    >
                      {k.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

/* ---------- Announcements ---------- */

function AnnouncementsTab() {
  const [list, setList] = useState(seedAnnouncements)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  function publish() {
    if (!title.trim() || !body.trim()) return
    setList((a) => [
      {
        id: `ann_${Date.now()}`,
        title: title.trim(),
        body: body.trim(),
        date: new Date().toISOString().slice(0, 10),
        tag: "Notice" as const,
      },
      ...a,
    ])
    setTitle("")
    setBody("")
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <Card>
        <CardContent className="p-5">
          <h2 className="font-display text-base font-semibold">New announcement</h2>
          <div className="mt-4 space-y-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none ring-primary/40 focus:ring-2"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your announcement..."
              rows={5}
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none ring-primary/40 focus:ring-2"
            />
            <Button className="w-full" onClick={publish}>
              <Megaphone className="mr-1 h-4 w-4" /> Publish
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {list.map((a) => (
          <Card key={a.id}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display font-semibold">{a.title}</h3>
                <Badge variant="secondary">{a.tag}</Badge>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{a.body}</p>
              <p className="mt-3 text-xs text-muted-foreground/70">{a.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SectionHead({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="border-b border-border/60 px-5 py-4">
      <h2 className="font-display text-base font-semibold">{title}</h2>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </div>
  )
}
