import { sql, type Script, type LicenseKey, type UserRecord, type KeyType } from "./db"

// ---------- Scripts ----------
export async function getVisibleScripts(): Promise<Script[]> {
  return (await sql`
    SELECT * FROM scripts WHERE visible = true ORDER BY created_at DESC
  `) as Script[]
}

export async function getAllScripts(): Promise<Script[]> {
  return (await sql`SELECT * FROM scripts ORDER BY created_at DESC`) as Script[]
}

export async function createScript(input: {
  name: string
  game: string
  version: string
  description: string
  code: string
  category: string
}): Promise<Script> {
  const rows = (await sql`
    INSERT INTO scripts (name, game, version, description, code, category, visible)
    VALUES (${input.name}, ${input.game}, ${input.version}, ${input.description}, ${input.code}, ${input.category}, true)
    RETURNING *
  `) as Script[]
  return rows[0]
}

export async function updateScript(
  id: number,
  input: { name: string; game: string; version: string; description: string; code: string; category: string },
): Promise<void> {
  await sql`
    UPDATE scripts SET
      name = ${input.name},
      game = ${input.game},
      version = ${input.version},
      description = ${input.description},
      code = ${input.code},
      category = ${input.category}
    WHERE id = ${id}
  `
}

export async function toggleScriptVisibility(id: number, visible: boolean): Promise<void> {
  await sql`UPDATE scripts SET visible = ${visible} WHERE id = ${id}`
}

export async function deleteScript(id: number): Promise<void> {
  await sql`DELETE FROM scripts WHERE id = ${id}`
}

export async function incrementDownloads(id: number): Promise<void> {
  await sql`UPDATE scripts SET downloads = downloads + 1 WHERE id = ${id}`
}

// ---------- License Keys ----------
export async function getAllKeys(): Promise<LicenseKey[]> {
  return (await sql`SELECT * FROM license_keys ORDER BY created_at DESC`) as LicenseKey[]
}

function generateKeyString(): string {
  const seg = () =>
    Math.random().toString(36).slice(2, 6).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase()
  return `VPX-${seg().slice(0, 4)}-${seg().slice(0, 4)}-${seg().slice(0, 4)}`
}

export async function createKey(type: KeyType): Promise<LicenseKey> {
  const key = generateKeyString()
  let expiresAt: string | null = null
  if (type === "trial") {
    expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  } else if (type === "monthly") {
    expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  }
  const rows = (await sql`
    INSERT INTO license_keys (key, type, active, expires_at)
    VALUES (${key}, ${type}, true, ${expiresAt})
    RETURNING *
  `) as LicenseKey[]
  return rows[0]
}

export async function setKeyActive(id: number, active: boolean): Promise<void> {
  await sql`UPDATE license_keys SET active = ${active} WHERE id = ${id}`
}

export async function deleteKey(id: number): Promise<void> {
  await sql`DELETE FROM license_keys WHERE id = ${id}`
}

// ---------- Users ----------
export async function getAllUsers(): Promise<UserRecord[]> {
  return (await sql`SELECT * FROM users ORDER BY created_at DESC`) as UserRecord[]
}

export async function setUserBanned(id: number, banned: boolean): Promise<void> {
  await sql`UPDATE users SET banned = ${banned} WHERE id = ${id}`
}

export async function setUserRole(id: number, role: string): Promise<void> {
  await sql`UPDATE users SET role = ${role} WHERE id = ${id}`
}

// ---------- Stats ----------
export async function getStats() {
  const [scripts] = (await sql`SELECT COUNT(*)::int AS c, COALESCE(SUM(downloads),0)::int AS d FROM scripts`) as {
    c: number
    d: number
  }[]
  const [keys] = (await sql`SELECT COUNT(*)::int AS c FROM license_keys`) as { c: number }[]
  const [users] = (await sql`SELECT COUNT(*)::int AS c FROM users`) as { c: number }[]
  return {
    scripts: scripts?.c ?? 0,
    downloads: scripts?.d ?? 0,
    keys: keys?.c ?? 0,
    users: users?.c ?? 0,
  }
}
