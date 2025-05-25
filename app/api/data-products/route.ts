import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { purviewServiceDelegated } from "@/lib/purview-service-delegated"

export async function GET(request: NextRequest) {
  try {
    console.log("API: Starting data products fetch...")

    // Get the user's session and access token
    const session = await getServerSession(authOptions)
    console.log("API: Session status:", !!session)

    if (!session?.accessToken) {
      console.log("API: No access token found")
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Check environment variables
    const requiredEnvVars = {
      PURVIEW_ACCOUNT_NAME: process.env.PURVIEW_ACCOUNT_NAME,
      AZURE_AD_TENANT_ID: process.env.AZURE_AD_TENANT_ID,
      AZURE_AD_CLIENT_ID: process.env.AZURE_AD_CLIENT_ID,
      AZURE_AD_CLIENT_SECRET: process.env.AZURE_AD_CLIENT_SECRET,
    }

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([key, value]) => !value)
      .map(([key]) => key)

    if (missingVars.length > 0) {
      console.error("API: Missing environment variables:", missingVars)
      return NextResponse.json(
        {
          error: `Missing environment variables: ${missingVars.join(", ")}`,
        },
        { status: 500 },
      )
    }

    console.log("API: Initializing Purview service...")
    purviewServiceDelegated.initialize({
      accountName: process.env.PURVIEW_ACCOUNT_NAME!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
    })

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("search")

    console.log("API: Calling Purview service...")
    let dataProducts
    if (query) {
      dataProducts = await purviewServiceDelegated.searchDataProducts(session.accessToken, query)
    } else {
      dataProducts = await purviewServiceDelegated.getDataProducts(session.accessToken)
    }

    console.log("API: Retrieved", dataProducts.length, "data products")
    return NextResponse.json(dataProducts)
  } catch (error) {
    console.error("API: Error fetching data products:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch data products",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
