"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Home,
  FileText,
  Database,
  Brain,
  BarChart2,
  MessageSquare,
  FileQuestion,
  ChevronDown,
  Plus,
  Package,
} from "lucide-react"
import { usePathname } from "next/navigation"

export function DatasetsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-48 border-r bg-white flex-shrink-0">
      <div className="p-4 border-b flex justify-center">
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/images/university_of_contoso_transparent.png"
            alt="University of Contoso Logo"
            width={100}
            height={50}
            className="h-12 w-auto object-contain"
          />
        </Link>
      </div>

      <div className="p-4 border-b">
        <button className="flex items-center gap-2 text-contoso-orange font-medium">
          <Plus className="h-4 w-4" />
          <span>Request</span>
        </button>
      </div>

      <nav className="p-2">
        <ul className="space-y-1">
          <li>
            <Link
              href="/"
              className={`flex items-center gap-2 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100 ${
                pathname === "/" ? "bg-gray-100 text-contoso-blue" : ""
              }`}
            >
              <Home className={`h-5 w-5 ${pathname === "/" ? "text-contoso-blue" : "text-gray-500"}`} />
              <span>Discover</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center gap-2 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              <FileText className="h-5 w-5 text-gray-500" />
              <span>Data Governance</span>
            </Link>
          </li>
          <li>
            <Link
              href="/datasets"
              className={`flex items-center gap-2 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100 ${
                pathname === "/datasets" ? "bg-gray-100 text-contoso-orange" : ""
              }`}
            >
              <Database className={`h-5 w-5 ${pathname === "/datasets" ? "text-contoso-orange" : "text-gray-500"}`} />
              <span>Datasets</span>
            </Link>
          </li>
          <li>
            <Link
              href="/data-products"
              className={`flex items-center gap-2 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100 ${
                pathname === "/data-products" ? "bg-gray-100 text-contoso-orange" : ""
              }`}
            >
              <Package
                className={`h-5 w-5 ${pathname === "/data-products" ? "text-contoso-orange" : "text-gray-500"}`}
              />
              <span>Data Products</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center gap-2 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              <Brain className="h-5 w-5 text-gray-500" />
              <span>ML Models</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center gap-2 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              <BarChart2 className="h-5 w-5 text-gray-500" />
              <span>Managed Reports</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center gap-2 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              <MessageSquare className="h-5 w-5 text-gray-500" />
              <span>Discussions</span>
            </Link>
          </li>
          <li>
            <Link
              href="/documentation"
              className="flex items-center gap-2 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <FileQuestion className="h-5 w-5 text-gray-500" />
              <span>Documentation</span>
            </Link>
          </li>
          <li>
            <button className="flex items-center gap-2 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100 w-full text-left">
              <ChevronDown className="h-5 w-5 text-gray-500" />
              <span>More</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
