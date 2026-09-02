// Database access is kept behind this small adapter so the UI can render even
// before the optional Neon driver is installed in a local checkout.
export const sql = async (..._args: unknown[]): Promise<unknown[]> => {
  if (!process.env.DATABASE_URL) return []
  throw new Error("Neon database adapter is not installed")
}

export type ScriptCategory = "Free" | "Premium" | "Key System"

export type Script = {
  id: number
  name: string
  game: string
  version: string
  description: string
  code: string
  category: ScriptCategory
  visible: boolean
  downloads: number
  created_at: string
}

export type KeyType = "trial" | "monthly" | "lifetime"

export type LicenseKey = {
  id: number
  key: string
  type: KeyType
  active: boolean
  expires_at: string | null
  created_at: string
}

export type UserRecord = {
  id: number
  username: string
  discord_id: string
  role: string
  banned: boolean
  created_at: string
}
