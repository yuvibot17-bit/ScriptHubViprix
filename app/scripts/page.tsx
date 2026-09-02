import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScriptsBrowser } from "@/components/scripts-browser"
import { scripts } from "@/lib/mock-data"

export default function ScriptsPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <header className="max-w-2xl">
            <h1 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Script library
            </h1>
            <p className="mt-3 text-pretty text-muted-foreground">
              Browse the full catalog, preview code with syntax highlighting, and filter by category.
            </p>
          </header>

          <div className="mt-8">
            <ScriptsBrowser scripts={scripts} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
