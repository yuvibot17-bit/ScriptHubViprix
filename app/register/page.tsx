import { AuthShell } from "@/components/auth-shell"

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Get started with VipriX Hub in seconds."
      discordLabel="Sign up with Discord"
      altPrompt="Already have an account?"
      altHref="/login"
      altLabel="Sign in"
    />
  )
}
