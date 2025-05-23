import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { purviewServiceDelegated } from "@/lib/purview-service-delegated"

export async function GET(request: NextRequest) {
  try {
    // Get the user's session and access token
    const session = await getServerSession(authOptions)

    if (!session?.accessToken) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Initialize Purview service if not already done
    if (!process.env.PURVIEW_ACCOUNT_NAME) {
      return NextResponse.json({ error: "Purview configuration missing" }, { status: 500 })
    }

    purviewServiceDelegated.initialize({
      accountName: process.env.PURVIEW_ACCOUNT_NAME!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
    })

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("search")

    let dataProducts
    if (query) {
      dataProducts = await purviewServiceDelegated.searchDataProducts(session.accessToken, query)
    } else {
      dataProducts = await purviewServiceDelegated.getDataProducts(session.accessToken)
    }

    return NextResponse.json(dataProducts)
  } catch (error) {
    console.error("Error fetching data products:", error)
    return NextResponse.json({ error: "Failed to fetch data products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.accessToken) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const dataProduct = await request.json()

    purviewServiceDelegated.initialize({
      accountName: process.env.PURVIEW_ACCOUNT_NAME!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
    })

    const id = await purviewServiceDelegated.createDataProduct(session.accessToken, dataProduct)

    return NextResponse.json({ id }, { status: 201 })
  } catch (error) {
    console.error("Error creating data product:", error)
    return NextResponse.json({ error: "Failed to create data product" }, { status: 500 })
  }
}
