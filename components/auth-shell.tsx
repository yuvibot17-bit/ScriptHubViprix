import Link from "next/link"
import { AnimatedBackground } from "@/components/animated-background"
import { Logo } from "@/components/logo"
import { Card, CardContent } from "@/components/ui/card"

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.317 4.369A19.79 19.79 0 0 0 15.885 3c-.2.36-.43.845-.588 1.23a18.27 18.27 0 0 0-5.6 0A12.6 12.6 0 0 0 9.1 3a19.7 19.7 0 0 0-4.434 1.369C1.86 8.583 1.1 12.69 1.48 16.735a19.9 19.9 0 0 0 6.073 3.058c.49-.667.927-1.376 1.302-2.121a12.9 12.9 0 0 1-2.05-.98c.172-.126.34-.257.502-.392a14.2 14.2 0 0 0 12.086 0c.164.14.332.27.502.392-.653.386-1.343.714-2.052.98.375.745.812 1.454 1.302 2.121a19.85 19.85 0 0 0 6.073-3.058c.447-4.69-.766-8.76-3.203-12.366ZM8.02 14.331c-1.183 0-2.157-1.085-2.157-2.42 0-1.334.955-2.42 2.157-2.42 1.21 0 2.176 1.095 2.157 2.42 0 1.335-.955 2.42-2.157 2.42Zm7.96 0c-1.183 0-2.157-1.085-2.157-2.42 0-1.334.955-2.42 2.157-2.42 1.21 0 2.176 1.095 2.157 2.42 0 1.335-.946 2.42-2.157 2.42Z" />
    </svg>
  )
}

export function AuthShell({
  title,
  subtitle,
  altPrompt,
  altHref,
  altLabel,
  discordLabel,
}: {
  title: string
  subtitle: string
  altPrompt: string
  altHref: string
  altLabel: string
  discordLabel: string
}) {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-12">
      <AnimatedBackground />

      <Link href="/" className="mb-8" aria-label="VipriX Hub home">
        <Logo className="text-xl" />
      </Link>

      <Card className="w-full max-w-md bg-card/80 backdrop-blur-xl">
        <CardContent className="p-7">
          <h1 className="text-balance font-display text-2xl font-bold tracking-tight">{title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>

          <button className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#5865F2] px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
            <DiscordIcon className="h-5 w-5" />
            {discordLabel}
          </button>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            {altPrompt}{" "}
            <Link href={altHref} className="font-medium text-primary hover:underline">
              {altLabel}
            </Link>
          </p>

          <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground/70">
            By continuing you agree to the Terms of Service and acknowledge the Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
