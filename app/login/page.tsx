import { AuthShell } from "@/components/auth-shell"

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage your scripts and keys."
      discordLabel="Continue with Discord"
      altPrompt="New to VipriX Hub?"
      altHref="/register"
      altLabel="Create an account"
    />
  )
}
