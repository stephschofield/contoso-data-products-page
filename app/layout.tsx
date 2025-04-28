import type React from "react"
import type { Metadata } from "next"
import RootLayout from "./page"

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
  return <RootLayout>{children}</RootLayout>
}


import './globals.css'