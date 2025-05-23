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

class PurviewClientDelegated {
  private config: PurviewConfig
  private baseUrl: string

  constructor(config: PurviewConfig) {
    this.config = config
    this.baseUrl = `https://${config.accountName}.purview.azure.com`
  }

  // This method uses the user's access token from NextAuth session
  private async makeRequest(endpoint: string, userAccessToken: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Purview API error: ${response.status} ${response.statusText} - ${errorText}`)
    }

    return response.json()
  }

  async searchAssets(userAccessToken: string, query: string, limit = 50): Promise<PurviewAsset[]> {
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

    const result = await this.makeRequest("/catalog/api/search/query", userAccessToken, {
      method: "POST",
      body: JSON.stringify(searchPayload),
    })

    return result.value || []
  }

  async getAssetById(userAccessToken: string, guid: string): Promise<PurviewAsset | null> {
    try {
      const result = await this.makeRequest(`/catalog/api/atlas/v2/entity/guid/${guid}`, userAccessToken)
      return result.entity
    } catch (error) {
      console.error(`Failed to get asset ${guid}:`, error)
      return null
    }
  }

  async getDataProducts(userAccessToken: string): Promise<DataProduct[]> {
    try {
      // Search for assets that represent data products
      const assets = await this.searchAssets(userAccessToken, "*", 100)

      return assets.map((asset) => this.mapAssetToDataProduct(asset))
    } catch (error) {
      console.error("Failed to fetch data products from Purview:", error)
      return []
    }
  }

  async getDataProductById(userAccessToken: string, id: string): Promise<DataProduct | null> {
    try {
      const asset = await this.getAssetById(userAccessToken, id)
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

  async createDataProduct(userAccessToken: string, dataProduct: Omit<DataProduct, "id">): Promise<string> {
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

    const result = await this.makeRequest("/catalog/api/atlas/v2/entity", userAccessToken, {
      method: "POST",
      body: JSON.stringify(entity),
    })

    return result.guidAssignments[Object.keys(result.guidAssignments)[0]]
  }

  async updateDataProduct(userAccessToken: string, id: string, updates: Partial<DataProduct>): Promise<void> {
    const existingAsset = await this.getAssetById(userAccessToken, id)
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

    await this.makeRequest("/catalog/api/atlas/v2/entity", userAccessToken, {
      method: "PUT",
      body: JSON.stringify(updatedEntity),
    })
  }
}

export { PurviewClientDelegated, type DataProduct, type PurviewConfig }
