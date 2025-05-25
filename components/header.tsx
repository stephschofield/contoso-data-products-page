"use client"

import Link from "next/link"
import { useRouter } from "next/router"

export function Header() {
  const router = useRouter()

  const isActive = (pathname: string) => {
    return router.pathname === pathname ? "active" : ""
  }

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          My App
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className={`hover:text-gray-300 ${isActive("/")}`}>
                Discover
              </Link>
            </li>
            <li>
              <Link href="/about" className={`hover:text-gray-300 ${isActive("/about")}`}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className={`hover:text-gray-300 ${isActive("/contact")}`}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
