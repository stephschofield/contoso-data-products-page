import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AssetSearch } from "@/components/purview/asset-search"

export default function PurviewPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="bg-contoso-blue text-white">
          <div className="container px-4 py-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-4">Microsoft Purview Data Catalog</h1>
              <p className="text-lg mb-6">
                Search and discover data assets across your organization. Find datasets, understand their lineage, and
                access metadata.
              </p>
            </div>
          </div>
        </div>

        <div className="container px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <AssetSearch />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
