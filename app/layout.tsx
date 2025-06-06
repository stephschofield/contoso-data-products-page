import type React from "react"
import type { Metadata } from "next"
import { SessionProvider } from "@/components/session-provider"
import RootLayout from "./page"
import "./globals.css"

export const metadata: Metadata = {
  title: "Cloud Fabric Deployment - University of Contoso",
  description: "Deploy Fabric Platform with Ease",
    generator: 'v0.dev'
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <RootLayout>{children}</RootLayout>
        </SessionProvider>
      </body>
    </html>
  )
}
