import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 py-4 bg-white">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Data Products Discovery. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <Link href="#" className="text-xs text-gray-500 hover:text-[#9e1b32]">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs text-gray-500 hover:text-[#9e1b32]">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs text-gray-500 hover:text-[#9e1b32]">
            Help Center
          </Link>
        </div>
      </div>
    </footer>
  )
}
