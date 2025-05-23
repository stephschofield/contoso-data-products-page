import { PurviewClient, type DataProduct, type PurviewConfig } from "./purview-client"

class PurviewService {
  private static instance: PurviewService
  private client: PurviewClient | null = null

  private constructor() {}

  static getInstance(): PurviewService {
    if (!PurviewService.instance) {
      PurviewService.instance = new PurviewService()
    }
    return PurviewService.instance
  }

  initialize(config: PurviewConfig) {
    this.client = new PurviewClient(config)
  }

  private ensureInitialized() {
    if (!this.client) {
      throw new Error("PurviewService not initialized. Call initialize() first.")
    }
  }

  async getDataProducts(): Promise<DataProduct[]> {
    this.ensureInitialized()
    return this.client!.getDataProducts()
  }

  async getDataProductById(id: string): Promise<DataProduct | null> {
    this.ensureInitialized()
    return this.client!.getDataProductById(id)
  }

  async searchDataProducts(query: string): Promise<DataProduct[]> {
    this.ensureInitialized()
    const assets = await this.client!.searchAssets(query)
    return assets.map((asset) => this.client!["mapAssetToDataProduct"](asset))
  }

  async createDataProduct(dataProduct: Omit<DataProduct, "id">): Promise<string> {
    this.ensureInitialized()
    return this.client!.createDataProduct(dataProduct)
  }

  async updateDataProduct(id: string, updates: Partial<DataProduct>): Promise<void> {
    this.ensureInitialized()
    return this.client!.updateDataProduct(id, updates)
  }
}

export const purviewService = PurviewService.getInstance()
export type { DataProduct }
