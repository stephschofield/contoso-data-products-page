import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DiscoverHeader } from "@/components/discover/discover-header"
import { DiscoverFilters } from "@/components/discover/discover-filters"
import { DiscoverProducts } from "@/components/discover/discover-products"
import { DiscoverCategories } from "@/components/discover/discover-categories"
import { DiscoverPopular } from "@/components/discover/discover-popular"

export default function DiscoverPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1">
        <DiscoverHeader />

        <div className="container px-4 py-8 md:py-12">
          <DiscoverCategories />

          <div className="mt-12">
            <DiscoverPopular />
          </div>

          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">All Data Products</h2>
              <DiscoverFilters />
            </div>

            <DiscoverProducts />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
