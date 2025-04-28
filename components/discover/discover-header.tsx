import { Search } from "lucide-react"

export function DiscoverHeader() {
  return (
    <div className="bg-contoso-blue text-white">
      <div className="container px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Data Products Across Your Organization</h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Find, explore, and request access to valuable data assets to power your insights and decisions.
          </p>

          <div className="relative max-w-xl mx-auto">
            <input
              type="search"
              placeholder="Search for data products, datasets, or metrics..."
              className="w-full px-5 py-4 pr-12 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Search className="absolute right-4 top-4 h-6 w-6 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  )
}
