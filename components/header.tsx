"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AISearch } from "@/components/ai-search"
import { useSession, signIn, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, LogOut, Settings } from "lucide-react"

export function Header() {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"

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
          <Link href="/catalog" className="text-sm font-medium text-gray-700 hover:text-contoso-orange">
            Data Catalog
          </Link>
          <Link href="/documentation" className="text-sm font-medium text-gray-700 hover:text-contoso-orange">
            Documentation
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-700 hover:text-contoso-orange">
            Support
          </Link>

          {isLoading ? (
            <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                  <AvatarFallback className="bg-contoso-blue text-white">
                    {session.user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{session.user?.name}</span>
                    <span className="text-xs text-gray-500">{session.user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              className="bg-contoso-orange hover:bg-contoso-orange/90 text-white"
              onClick={() => signIn("azure-ad")}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
