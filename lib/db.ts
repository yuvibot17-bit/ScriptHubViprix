import { neon } from "@neondatabase/serverless"

export const sql = neon(process.env.DATABASE_URL!)

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
