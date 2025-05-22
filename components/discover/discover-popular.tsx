import Link from "next/link"
import Image from "next/image"

export function DiscoverPopular() {
  const popularProducts = [
    {
      id: "student-success",
      title: "Student Success Dashboard",
      image: "/images/student-success.jpeg",
    },
    {
      id: "enrollment-analytics",
      title: "Enrollment Analytics",
      image: "/images/enrollment-analytics.jpeg",
    },
    {
      id: "campus-resource",
      title: "Campus Resource Utilization",
      image: "/images/campus-resource-utilization.jpeg",
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Popular Data Products</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {popularProducts.map((product) => (
          <Link
            key={product.id}
            href={`/discover/product/${product.id}`}
            className="group relative overflow-hidden rounded-lg"
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src={product.image || `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(product.title)}`}
                alt={product.title}
                width={400}
                height={300}
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 flex items-end p-4">
                <h3 className="font-medium text-white">{product.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
