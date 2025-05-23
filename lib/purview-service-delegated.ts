import { PurviewClientDelegated, type DataProduct, type PurviewConfig } from "./purview-client-delegated"

class PurviewServiceDelegated {
  private client: PurviewClientDelegated | null = null

  initialize(config: PurviewConfig) {
    this.client = new PurviewClientDelegated(config)
  }

  private ensureInitialized() {
    if (!this.client) {
      throw new Error("PurviewService not initialized. Call initialize() first.")
    }
  }

  async getDataProducts(userAccessToken: string): Promise<DataProduct[]> {
    this.ensureInitialized()
    return this.client!.getDataProducts(userAccessToken)
  }

  async getDataProductById(userAccessToken: string, id: string): Promise<DataProduct | null> {
    this.ensureInitialized()
    return this.client!.getDataProductById(userAccessToken, id)
  }

  async searchDataProducts(userAccessToken: string, query: string): Promise<DataProduct[]> {
    this.ensureInitialized()
    const assets = await this.client!.searchAssets(userAccessToken, query)
    return assets.map((asset) => this.client!["mapAssetToDataProduct"](asset))
  }

  async createDataProduct(userAccessToken: string, dataProduct: Omit<DataProduct, "id">): Promise<string> {
    this.ensureInitialized()
    return this.client!.createDataProduct(userAccessToken, dataProduct)
  }

  async updateDataProduct(userAccessToken: string, id: string, updates: Partial<DataProduct>): Promise<void> {
    this.ensureInitialized()
    return this.client!.updateDataProduct(userAccessToken, id, updates)
  }
}

export const purviewServiceDelegated = new PurviewServiceDelegated()
