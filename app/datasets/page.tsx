import { Footer } from "@/components/footer"
import { DatasetsList } from "@/components/datasets/datasets-list"
import { DatasetsSidebar } from "@/components/datasets/datasets-sidebar"
import { DatasetsHeader } from "@/components/datasets/datasets-header"
import { DatasetFilters } from "@/components/datasets/dataset-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import Image from "next/image"

export default function DatasetsPage() {
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
            <DatasetsHeader />

            <div className="mt-8 flex justify-between items-center">
              <div className="relative w-full max-w-md">
                <Input
                  type="search"
                  placeholder="Search datasets"
                  className="pl-10 pr-4 py-2 border rounded-md w-full"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <Button className="bg-contoso-orange hover:bg-contoso-orange/90 text-white flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Dataset
              </Button>
            </div>

            <DatasetFilters />

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
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                  <h2 className="text-xl font-bold">Available Datasets</h2>
                </div>
                <a href="#" className="text-sm text-contoso-orange hover:underline">
                  See All
                </a>
              </div>

              <DatasetsList />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
