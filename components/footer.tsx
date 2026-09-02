import Link from "next/link"
import { Logo } from "./logo"
import { DiscordIcon } from "./navbar"

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            One hub for your scripts. Browse, copy, and download with a clean, fast experience.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="font-medium text-foreground">Navigate</span>
          <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href="/scripts" className="text-muted-foreground transition-colors hover:text-foreground">
            Scripts
          </Link>
        </div>

        <a
          href="https://discord.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start rounded-lg border border-border bg-secondary/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          <DiscordIcon className="h-4 w-4 text-primary" />
          Join our Discord
        </a>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-5 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} VipriX Hub. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
