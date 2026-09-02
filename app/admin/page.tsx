import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AdminDashboard } from "@/components/admin-dashboard"
import { Badge } from "@/components/ui/badge"

export default function AdminPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <header className="max-w-2xl">
            <Badge variant="default">Admin</Badge>
            <h1 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Admin dashboard
            </h1>
            <p className="mt-3 text-pretty text-muted-foreground">
              Manage users, scripts, and keys, review analytics, and publish announcements.
            </p>
          </header>

          <div className="mt-8">
            <AdminDashboard />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
