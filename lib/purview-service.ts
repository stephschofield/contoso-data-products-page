import { type AuthenticationResult, ConfidentialClientApplication } from "@azure/msal-node"

export class PurviewService {
  private msalClient: ConfidentialClientApplication
  private purviewAccountName: string
  private purviewEndpoint: string
  private catalogEndpoint: string
  private scanEndpoint: string
  private token: string | null = null

  constructor() {
    this.purviewAccountName = process.env.PURVIEW_ACCOUNT_NAME || ""
    this.purviewEndpoint = `https://${this.purviewAccountName}.purview.azure.com`
    this.catalogEndpoint = `${this.purviewEndpoint}/catalog`
    this.scanEndpoint = `${this.purviewEndpoint}/scan`

    this.msalClient = new ConfidentialClientApplication({
      auth: {
        clientId: process.env.AZURE_AD_CLIENT_ID || "",
        authority: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}`,
        clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "",
      },
    })
  }

  private async getToken(): Promise<string> {
    if (this.token) return this.token

    try {
      const result: AuthenticationResult = await this.msalClient.acquireTokenByClientCredential({
        scopes: ["https://purview.azure.net/.default"],
      })

      this.token = result.accessToken
      return this.token
    } catch (error) {
      console.error("Error acquiring token:", error)
      throw new Error("Failed to authenticate with Microsoft Purview")
    }
  }

  // Search for assets in Purview catalog
  async searchAssets(query: string, limit = 10): Promise<any> {
    const token = await this.getToken()

    const response = await fetch(`${this.catalogEndpoint}/api/search/query?api-version=2022-03-01-preview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        keywords: query,
        limit: limit,
      }),
    })

    if (!response.ok) {
      throw new Error(`Purview search failed: ${response.statusText}`)
    }

    return await response.json()
  }

  // Get asset details by GUID
  async getAssetById(guid: string): Promise<any> {
    const token = await this.getToken()

    const response = await fetch(
      `${this.catalogEndpoint}/api/atlas/v2/entity/guid/${guid}?api-version=2022-03-01-preview`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Failed to get asset details: ${response.statusText}`)
    }

    return await response.json()
  }

  // Get glossary terms
  async getGlossaryTerms(): Promise<any> {
    const token = await this.getToken()

    const response = await fetch(`${this.catalogEndpoint}/api/atlas/v2/glossary?api-version=2022-03-01-preview`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get glossary terms: ${response.statusText}`)
    }

    return await response.json()
  }

  // Get data sources
  async getDataSources(limit = 100): Promise<any> {
    const token = await this.getToken()

    const response = await fetch(`${this.scanEndpoint}/datasources?api-version=2022-02-01-preview`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get data sources: ${response.statusText}`)
    }

    return await response.json()
  }

  // Get lineage for an asset
  async getLineage(guid: string): Promise<any> {
    const token = await this.getToken()

    const response = await fetch(
      `${this.catalogEndpoint}/api/atlas/v2/lineage/${guid}?api-version=2022-03-01-preview`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Failed to get lineage: ${response.statusText}`)
    }

    return await response.json()
  }
}
