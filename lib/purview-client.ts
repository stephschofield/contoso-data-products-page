interface PurviewConfig {
  accountName: string
  tenantId: string
  clientId: string
  clientSecret: string
}

interface DataProduct {
  id: string
  name: string
  description: string
  owner: string
  department: string
  tags: string[]
  lastModified: string
  dataSource: string
  compliance: string[]
  accessLevel: "public" | "restricted" | "private"
}

interface PurviewAsset {
  guid: string
  typeName: string
  attributes: {
    name: string
    description?: string
    owner?: string
    qualifiedName: string
    [key: string]: any
  }
  classifications?: Array<{
    typeName: string
    attributes: Record<string, any>
  }>
}

class PurviewClient {
  private config: PurviewConfig
  private baseUrl: string
  private accessToken: string | null = null

  constructor(config: PurviewConfig) {
    this.config = config
    this.baseUrl = `https://${config.accountName}.purview.azure.com`
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken) {
      return this.accessToken
    }

    const tokenUrl = `https://login.microsoftonline.com/${this.config.tenantId}/oauth2/v2.0/token`

    const params = new URLSearchParams({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      scope: "https://purview.azure.net/.default",
      grant_type: "client_credentials",
    })

    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to get access token: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    this.accessToken = data.access_token

    // Refresh token before it expires (typically 1 hour)
    setTimeout(
      () => {
        this.accessToken = null
      },
      (data.expires_in - 300) * 1000,
    ) // Refresh 5 minutes before expiry

    return this.accessToken
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const token = await this.getAccessToken()

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Purview API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async searchAssets(query: string, limit = 50): Promise<PurviewAsset[]> {
    const searchPayload = {
      keywords: query,
      limit: limit,
      filter: {
        and: [
          {
            entityType: "DataSet",
          },
        ],
      },
    }

    const result = await this.makeRequest("/catalog/api/search/query", {
      method: "POST",
      body: JSON.stringify(searchPayload),
    })

    return result.value || []
  }

  async getAssetById(guid: string): Promise<PurviewAsset | null> {
    try {
      const result = await this.makeRequest(`/catalog/api/atlas/v2/entity/guid/${guid}`)
      return result.entity
    } catch (error) {
      console.error(`Failed to get asset ${guid}:`, error)
      return null
    }
  }

  async getDataProducts(): Promise<DataProduct[]> {
    try {
      // Search for assets that represent data products
      const assets = await this.searchAssets("*", 100)

      return assets.map((asset) => this.mapAssetToDataProduct(asset))
    } catch (error) {
      console.error("Failed to fetch data products from Purview:", error)
      return []
    }
  }

  async getDataProductById(id: string): Promise<DataProduct | null> {
    try {
      const asset = await this.getAssetById(id)
      if (!asset) return null

      return this.mapAssetToDataProduct(asset)
    } catch (error) {
      console.error(`Failed to fetch data product ${id}:`, error)
      return null
    }
  }

  private mapAssetToDataProduct(asset: PurviewAsset): DataProduct {
    const attributes = asset.attributes

    // Extract compliance information from classifications
    const compliance = asset.classifications?.map((c) => c.typeName) || []

    // Determine access level based on classifications
    let accessLevel: "public" | "restricted" | "private" = "public"
    if (compliance.includes("Confidential")) {
      accessLevel = "private"
    } else if (compliance.includes("Internal")) {
      accessLevel = "restricted"
    }

    return {
      id: asset.guid,
      name: attributes.name || "Unnamed Data Product",
      description: attributes.description || "",
      owner: attributes.owner || "Unknown",
      department: attributes.department || attributes.businessUnit || "Unknown Department",
      tags: this.extractTags(asset),
      lastModified: attributes.modifiedTime || attributes.createTime || new Date().toISOString(),
      dataSource: attributes.dataSource || attributes.source || "Unknown",
      compliance: compliance,
      accessLevel: accessLevel,
    }
  }

  private extractTags(asset: PurviewAsset): string[] {
    const tags: string[] = []

    // Extract from custom attributes
    if (asset.attributes.tags) {
      tags.push(...asset.attributes.tags)
    }

    // Extract from classifications
    if (asset.classifications) {
      tags.push(...asset.classifications.map((c) => c.typeName.toLowerCase()))
    }

    // Extract from type name
    if (asset.typeName) {
      tags.push(asset.typeName.toLowerCase())
    }

    return [...new Set(tags)] // Remove duplicates
  }

  async createDataProduct(dataProduct: Omit<DataProduct, "id">): Promise<string> {
    const entity = {
      entity: {
        typeName: "DataSet",
        attributes: {
          name: dataProduct.name,
          description: dataProduct.description,
          owner: dataProduct.owner,
          department: dataProduct.department,
          qualifiedName: `${dataProduct.name}@${this.config.accountName}`,
          tags: dataProduct.tags,
        },
        classifications: dataProduct.compliance.map((comp) => ({
          typeName: comp,
          attributes: {},
        })),
      },
    }

    const result = await this.makeRequest("/catalog/api/atlas/v2/entity", {
      method: "POST",
      body: JSON.stringify(entity),
    })

    return result.guidAssignments[Object.keys(result.guidAssignments)[0]]
  }

  async updateDataProduct(id: string, updates: Partial<DataProduct>): Promise<void> {
    const existingAsset = await this.getAssetById(id)
    if (!existingAsset) {
      throw new Error(`Data product ${id} not found`)
    }

    const updatedEntity = {
      entity: {
        ...existingAsset,
        attributes: {
          ...existingAsset.attributes,
          ...updates,
        },
      },
    }

    await this.makeRequest("/catalog/api/atlas/v2/entity", {
      method: "PUT",
      body: JSON.stringify(updatedEntity),
    })
  }
}

export { PurviewClient, type DataProduct, type PurviewConfig }
