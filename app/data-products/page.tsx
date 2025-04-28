import { Footer } from "@/components/footer"
import { DatasetsSidebar } from "@/components/datasets/datasets-sidebar"
import { DataProductsHeader } from "@/components/data-products/data-products-header"
import { DataProductsList } from "@/components/data-products/data-products-list"
import { DataProductsFilters } from "@/components/data-products/data-products-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import Image from "next/image"

export default function DataProductsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="bg-white border-b">
        <div className="container flex justify-between items-center py-4">
          <h1 className="text-3xl font-bold">Discover Data Products Across Your Organization</h1>
          <Image
            src="/images/university_of_contoso_transparent.png"
            alt="University of Contoso Logo"
            width={120}
            height={60}
            className="h-12 w-auto"
          />
        </div>
      </div>
      <div className="bg-contoso-orange h-5 w-full"></div>

      <div className="flex flex-1">
        <DatasetsSidebar />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <DataProductsHeader />

            <div className="mt-8 flex justify-between items-center">
              <div className="relative w-full max-w-md">
                <Input
                  type="search"
                  placeholder="Search data products"
                  className="pl-10 pr-4 py-2 border rounded-md w-full"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <Button className="bg-contoso-orange hover:bg-contoso-orange/90 text-white flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Data Product
              </Button>
            </div>

            <DataProductsFilters />

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-contoso-orange"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                    />
                  </svg>
                  <h2 className="text-xl font-bold">Featured Data Products</h2>
                </div>
                <a href="#" className="text-sm text-contoso-orange hover:underline">
                  See All
                </a>
              </div>

              <DataProductsList />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
