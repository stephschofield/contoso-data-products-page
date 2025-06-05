import { NextResponse } from "next/server"
import { PurviewService } from "@/lib/purview-service"

export async function POST(request: Request) {
  try {
    const { query, limit = 10 } = await request.json()

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
    }

    const purviewService = new PurviewService()
    const results = await purviewService.searchAssets(query, limit)

    return NextResponse.json(results)
  } catch (error) {
    console.error("Purview search error:", error)
    return NextResponse.json({ error: "Failed to search Purview assets" }, { status: 500 })
  }
}
