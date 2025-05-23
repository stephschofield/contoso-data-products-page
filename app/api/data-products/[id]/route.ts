import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { purviewServiceDelegated } from "@/lib/purview-service-delegated"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.accessToken) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    purviewServiceDelegated.initialize({
      accountName: process.env.PURVIEW_ACCOUNT_NAME!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
    })

    const dataProduct = await purviewServiceDelegated.getDataProductById(session.accessToken, params.id)

    if (!dataProduct) {
      return NextResponse.json({ error: "Data product not found" }, { status: 404 })
    }

    return NextResponse.json(dataProduct)
  } catch (error) {
    console.error("Error fetching data product:", error)
    return NextResponse.json({ error: "Failed to fetch data product" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.accessToken) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const updates = await request.json()

    purviewServiceDelegated.initialize({
      accountName: process.env.PURVIEW_ACCOUNT_NAME!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
    })

    await purviewServiceDelegated.updateDataProduct(session.accessToken, params.id, updates)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating data product:", error)
    return NextResponse.json({ error: "Failed to update data product" }, { status: 500 })
  }
}
