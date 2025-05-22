import { Footer } from "@/components/footer"
import { DatasetsSidebar } from "@/components/datasets/datasets-sidebar"
import { DatasetsHeader } from "@/components/datasets/datasets-header"
import { DatasetsList } from "@/components/datasets/datasets-list"
import { DatasetFilters } from "@/components/datasets/dataset-filters"
import { DatasetTypes } from "@/components/datasets/dataset-types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DatasetsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="bg-white border-b">
        <div className="container flex justify-between items-center py-4">
          <h1 className="text-3xl font-bold">Discover Datasets Across Your Organization</h1>
          <Link href="/">
            <Image
              src="/images/university_of_contoso_transparent.png"
              alt="University of Contoso Logo"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </Link>
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
              <h2 className="text-xl font-bold mb-4">Dataset Types</h2>
              <DatasetTypes />
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Featured Datasets</h2>
              <DatasetsList />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
