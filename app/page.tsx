"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "@/components/session-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DiscoverHeader } from "@/components/discover/discover-header"
import { DiscoverFilters } from "@/components/discover/discover-filters"
import { DiscoverProducts } from "@/components/discover/discover-products"
import { DiscoverCategories } from "@/components/discover/discover-categories"
import { DiscoverPopular } from "@/components/discover/discover-popular"

// We can't directly import Segoe UI as it's not available in Google Fonts
// Instead, we'll use a system font fallback
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add a style tag to ensure Segoe UI is used */}
        <style jsx global>{`
          html {
            font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
          }
          
          /* Add Contoso blue color for discover page */
          .bg-contoso-blue {
            background-color: #01A6F0;
          }
          
          .text-contoso-blue {
            color: #01A6F0;
          }
          
          .hover\\:bg-contoso-blue\\/90:hover {
            background-color: rgba(1, 166, 240, 0.9);
          }
          
          .hover\\:text-contoso-blue:hover {
            color: #01A6F0;
          }
          
          .hover\\:border-contoso-blue:hover {
            border-color: #01A6F0;
          }
          
          .group-hover\\:text-contoso-blue\\/90 {
            color: rgba(1, 166, 240, 0.9);
          }
        `}</style>
      </head>
      <body className={inter.variable}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SessionProvider>
            {children ? (
              children
            ) : (
              <div className="flex flex-col min-h-screen bg-gray-50">
                <Header />

                <main className="flex-1">
                  <DiscoverHeader />

                  <div className="container px-4 py-8 md:py-12">
                    <DiscoverCategories />

                    <div className="mt-12">
                      <DiscoverPopular />
                    </div>

                    <div className="mt-12">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">All Data Products</h2>
                        <DiscoverFilters />
                      </div>

                      <DiscoverProducts />
                    </div>
                  </div>
                </main>

                <Footer />
              </div>
            )}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
