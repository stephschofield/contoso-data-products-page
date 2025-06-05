import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DiscoverProducts } from "@/components/discover/discover-products"
import { DiscoverCategories } from "@/components/discover/discover-categories"

export default function CatalogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1">
        <div className="bg-contoso-blue text-white">
          <div className="container px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Unified Data Catalog</h1>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Discover all your data assets in one place - from curated data products to live assets in your Microsoft
                Purview catalog.
              </p>
            </div>
          </div>
        </div>

        <div className="container px-4 py-8 md:py-12">
          <DiscoverCategories />

          <div className="mt-12">
            <DiscoverProducts />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
