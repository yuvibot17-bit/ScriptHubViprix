import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { KeyManager } from "@/components/key-manager"
import { keys } from "@/lib/mock-data"

export default function DashboardPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <header className="max-w-2xl">
            <h1 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Key dashboard
            </h1>
            <p className="mt-3 text-pretty text-muted-foreground">
              Generate and manage your license keys. Trial keys last 24 hours, monthly keys 30 days,
              and lifetime keys never expire.
            </p>
          </header>

          <div className="mt-8">
            <KeyManager initialKeys={keys} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
