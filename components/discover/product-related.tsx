import Image from "next/image"
import Link from "next/link"

interface ProductRelatedProps {
  productId: number
}

export function ProductRelated({ productId }: ProductRelatedProps) {
  // Mock data - in a real app, you would fetch this based on the productId
  const relatedProducts = [
    {
      id: 101,
      title: "Enrollment Trends Dashboard",
      image: "/placeholder.svg?height=80&width=80&text=Enrollment",
    },
    {
      id: 102,
      title: "Student Success Metrics",
      image: "/placeholder.svg?height=80&width=80&text=Success",
    },
    {
      id: 103,
      title: "Diversity & Inclusion Analytics",
      image: "/placeholder.svg?height=80&width=80&text=Diversity",
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="font-semibold">Related Data Products</h2>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          {relatedProducts.map((product) => (
            <Link
              href={`/discover/product/${product.id}`}
              key={product.id}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors"
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                width={50}
                height={50}
                className="rounded-md object-cover"
              />
              <span className="text-sm font-medium text-gray-700 hover:text-[#9e1b32]">{product.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
