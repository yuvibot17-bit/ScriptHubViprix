import Link from "next/link"
import {
  ArrowRight,
  KeyRound,
  ShieldCheck,
  Code2,
  BarChart3,
  Gauge,
  Users,
} from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { stats } from "@/lib/mock-data"

const features = [
  {
    icon: Code2,
    title: "Script management",
    desc: "Add, edit, version, and organize your Lua scripts with categories, authors, and game compatibility.",
  },
  {
    icon: KeyRound,
    title: "Licensing keys",
    desc: "Issue trial, monthly, and lifetime keys. Validate, bind, and revoke access in a click.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    desc: "Role-based access, input sanitization, rate limiting, and hardened response headers.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    desc: "Track downloads, key redemptions, and per-script trends from a single dashboard.",
  },
  {
    icon: Users,
    title: "User roles",
    desc: "Admin, moderator, and user roles keep the right controls in the right hands.",
  },
  {
    icon: Gauge,
    title: "Built for speed",
    desc: "A fast, responsive interface with a code viewer and instant search across your library.",
  },
]

function formatStat(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`
  return `${n}`
}

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <AnimatedBackground />
          <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mx-auto">Roblox Lua script management</Badge>
              <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                Ship and license your scripts with{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  VipriX Hub
                </span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                A secure, modern hub to manage your Lua library, issue license keys, and understand
                your usage — all from one polished dashboard.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/register">
                    Get started <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Link href="/scripts">Browse scripts</Link>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard label="Scripts" value={formatStat(stats.scripts)} />
              <StatCard label="Users" value={formatStat(stats.users)} />
              <StatCard label="Downloads" value={formatStat(stats.downloads)} />
              <StatCard label="Uptime" value={stats.uptime} />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="max-w-2xl">
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to run a script hub
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              From your first upload to full-scale licensing, VipriX Hub gives you the tooling to
              manage a professional Lua library.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="transition-colors hover:border-primary/40">
                <CardContent className="p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/15 text-primary">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 pb-24">
          <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-secondary to-card p-8 sm:p-12">
            <div className="animate-float-slow absolute -right-10 -top-10 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative max-w-xl">
              <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to launch your hub?
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                Create an account, upload your first script, and start issuing keys in minutes.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/register">
                    Create account <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <Link href="/dashboard">View dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="bg-card/60 backdrop-blur">
      <CardContent className="p-5 text-center">
        <div className="font-display text-3xl font-bold text-foreground">{value}</div>
        <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  )
}
