import { NextResponse } from "next/server"
import { PurviewService } from "@/lib/purview-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const assetId = params.id

    if (!assetId) {
      return NextResponse.json({ error: "Asset ID is required" }, { status: 400 })
    }

    const purviewService = new PurviewService()
    const lineage = await purviewService.getLineage(assetId)

    return NextResponse.json(lineage)
  } catch (error) {
    console.error("Purview lineage fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch lineage data" }, { status: 500 })
  }
}
