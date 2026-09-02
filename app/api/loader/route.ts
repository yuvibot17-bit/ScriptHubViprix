import { NextResponse } from "next/server"
import { checkPassword, createLoaderSession, destroyLoaderSession } from "@/lib/loader-auth"

// Simple in-memory rate limiter per IP (best-effort in serverless).
const attempts = new Map<string, { count: number; ts: number }>()
const WINDOW = 60_000
const MAX = 6

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const rec = attempts.get(ip)
  if (!rec || now - rec.ts > WINDOW) {
    attempts.set(ip, { count: 1, ts: now })
    return false
  }
  rec.count += 1
  return rec.count > MAX
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many attempts. Try again in a minute." }, { status: 429 })
  }

  let body: { password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  const password = (body.password ?? "").toString()
  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 })
  }

  await createLoaderSession()
  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  await destroyLoaderSession()
  return NextResponse.json({ ok: true })
}
