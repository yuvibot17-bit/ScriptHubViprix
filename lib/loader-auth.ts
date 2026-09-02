import { cookies } from "next/headers"
import { createHmac, timingSafeEqual } from "crypto"

const COOKIE_NAME = "vpx_loader"

function secret(): string {
  // Derive a signing secret from the loader password itself.
  return process.env.LOADER_PASSWORD ?? "unset-loader-secret"
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("hex")
}

/** Constant-time compare of the provided password against LOADER_PASSWORD. */
export function checkPassword(input: string): boolean {
  const expected = process.env.LOADER_PASSWORD ?? ""
  if (!expected) return false
  const a = Buffer.from(input)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

/** The signed token value we store in the cookie. */
function tokenValue(): string {
  const payload = "authorized"
  return `${payload}.${sign(payload)}`
}

export async function createLoaderSession() {
  const jar = await cookies()
  jar.set(COOKIE_NAME, tokenValue(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  })
}

export async function destroyLoaderSession() {
  const jar = await cookies()
  jar.delete(COOKIE_NAME)
}

export async function isLoaderAuthed(): Promise<boolean> {
  const jar = await cookies()
  const raw = jar.get(COOKIE_NAME)?.value
  if (!raw) return false
  const [payload, mac] = raw.split(".")
  if (payload !== "authorized" || !mac) return false
  const expected = sign("authorized")
  const a = Buffer.from(mac)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}
