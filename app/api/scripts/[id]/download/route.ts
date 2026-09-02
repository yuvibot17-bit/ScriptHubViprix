import { NextResponse } from "next/server"
import { sql, type Script } from "@/lib/db"
import { incrementDownloads } from "@/lib/queries"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const numId = Number.parseInt(id, 10)
  if (Number.isNaN(numId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 })
  }

  const rows = (await sql`SELECT * FROM scripts WHERE id = ${numId} AND visible = true`) as Script[]
  const script = rows[0]
  if (!script) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  await incrementDownloads(numId)

  const filename = `${script.name.replace(/[^a-z0-9]+/gi, "_").toLowerCase()}.lua`
  return new NextResponse(script.code, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  })
}
