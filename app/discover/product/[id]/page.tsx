import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductHeader } from "@/components/discover/product-header"
import { ProductDetails } from "@/components/discover/product-details"
import { ProductContent } from "@/components/discover/product-content"
import { ProductAccess } from "@/components/discover/product-access"
import { ProductRelated } from "@/components/discover/product-related"

export default function ProductPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the product data based on the ID
  const productId = Number.parseInt(params.id)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1">
        <ProductHeader productId={productId} />

        <div className="container px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ProductDetails productId={productId} />
              <ProductContent productId={productId} />
            </div>

            <div className="space-y-8">
              <ProductAccess productId={productId} />
              <ProductRelated productId={productId} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
