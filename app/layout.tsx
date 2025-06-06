import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { SessionProvider } from "@/components/session-provider"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Contoso Data Products",
  description: "Discover and access university data products and datasets",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <div className="flex min-h-screen flex-col">{children}</div>
        </SessionProvider>
      </body>
    </html>
  )
}
