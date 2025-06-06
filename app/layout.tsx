import type React from "react"
import type { Metadata } from "next"
import { SessionProvider } from "@/components/session-provider"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Explore University Data Products - University of Contoso",
  description:
    "Discover and access comprehensive university datasets, interactive dashboards, and analytics tools for research, teaching, and administrative decision-making.",
  generator: "v0.dev",
  keywords: ["university data", "analytics", "dashboards", "datasets", "research", "education"],
  authors: [{ name: "University of Contoso" }],
  openGraph: {
    title: "Explore University Data Products - University of Contoso",
    description:
      "Discover and access comprehensive university datasets, interactive dashboards, and analytics tools for research, teaching, and administrative decision-making.",
    url: "https://contoso-data-products.com",
    siteName: "University of Contoso Data Products",
    images: [
      {
        url: "/images/site-preview.png",
        width: 1200,
        height: 630,
        alt: "University of Contoso Data Products - Main Page Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore University Data Products - University of Contoso",
    description: "Discover and access comprehensive university datasets, interactive dashboards, and analytics tools.",
    images: ["/images/site-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
