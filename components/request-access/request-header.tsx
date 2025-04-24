import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Lock } from "lucide-react"

interface RequestAccessHeaderProps {
  product: {
    id: number
    title: string
    description: string
    department: string
    image: string
  }
}

export function RequestAccessHeader({ product }: RequestAccessHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex gap-6 items-center">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <Badge variant="outline" className="flex items-center gap-1 bg-yellow-50 text-yellow-700 border-yellow-200">
              <Lock className="h-3 w-3" />
              <span>Restricted Access</span>
            </Badge>
          </div>
          <p className="text-gray-500">{product.department}</p>
          <p className="mt-2 text-gray-700">{product.description}</p>
        </div>
      </div>
    </div>
  )
}
