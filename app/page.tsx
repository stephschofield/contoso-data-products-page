"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "@/components/session-provider"

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
          
          .hover\:bg-contoso-blue\/90:hover {
            background-color: rgba(1, 166, 240, 0.9);
          }
          
          .hover\:text-contoso-blue:hover {
            color: #01A6F0;
          }
          
          .hover\:border-contoso-blue:hover {
            border-color: #01A6F0;
          }
          
          .group-hover\:text-contoso-blue\/90 {
            color: rgba(1, 166, 240, 0.9);
          }
        `}</style>
      </head>
      <body className={inter.variable}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
