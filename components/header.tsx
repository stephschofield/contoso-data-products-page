import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AISearch } from "@/components/ai-search"

export function Header() {
  return (
    <header className="w-full border-b border-gray-100 bg-white">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center justify-center">
            <Image
              src="/images/university_of_contoso_transparent.png"
              alt="University of Contoso Logo"
              width={160}
              height={80}
              className="h-16 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="flex-1 mx-8">
          <AISearch />
        </div>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-contoso-orange">
            Discover
          </Link>
          <Link href="/deploy-azure-resources" className="text-sm font-medium text-gray-700 hover:text-contoso-orange">
            Deploy Azure Resources
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-700 hover:text-contoso-orange">
            Documentation
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-700 hover:text-contoso-orange">
            Support
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-700 hover:text-contoso-orange">
            Sign In
          </Link>
          <Button className="bg-contoso-orange hover:bg-contoso-orange/90 text-white">Register</Button>
        </div>
      </div>
    </header>
  )
}
