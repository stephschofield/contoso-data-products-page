"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Info, CheckCircle2, Loader2 } from "lucide-react"
import Link from "next/link"
import { RequestAccessForm } from "@/components/request-access/request-form"
import { RequestAccessHeader } from "@/components/request-access/request-header"
import { RequestAccessAuth } from "@/components/request-access/request-auth"

export default function RequestAccessPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if we're returning from authentication
  const authSuccess = searchParams.get("auth") === "success"

  useEffect(() => {
    // Wait for session to be loaded
    if (status !== "loading") {
      setIsLoading(false)
    }
  }, [status])

  // Product data mapping - matches the products from discover and popular sections
  const getProductData = (id: number) => {
    const products = {
      1: {
        id: 1,
        title: "Student Success Dashboard",
        description: "Interactive dashboard for tracking student performance metrics and identifying at-risk students",
        department: "Academic Affairs",
        image: "/images/student-success.jpeg",
      },
      2: {
        id: 2,
        title: "Enrollment Analytics",
        description: "Comprehensive analytics on student enrollment patterns and trends across departments",
        department: "Student Services",
        image: "/images/enrollment-analytics.jpeg",
      },
      3: {
        id: 3,
        title: "Campus Resource Utilization",
        description: "Real-time insights into campus facility usage, classroom occupancy, and resource allocation",
        department: "Facilities Management",
        image: "/images/campus-resource-utilization.jpeg",
      },
      4: {
        id: 4,
        title: "Course Enrollment Patterns",
        description: "Analysis of enrollment trends, popular courses, and scheduling optimization",
        department: "Academic Affairs",
        image: "/images/course-enrollment.jpeg",
      },
      5: {
        id: 5,
        title: "Alumni Career Outcomes",
        description: "Employment statistics, career paths, and success metrics for graduates",
        department: "Career Services",
        image: "/images/alumni-careers.jpeg",
      },
      6: {
        id: 6,
        title: "Library Resource Usage",
        description: "Statistics on library visits, resource checkouts, and digital access",
        department: "University Libraries",
        image: "/images/library-resource-usage.jpeg",
      },
    }

    return (
      products[id as keyof typeof products] || {
        id: id,
        title: "Unknown Product",
        description: "Product details not available",
        department: "Unknown Department",
        image: "/placeholder.svg?height=300&width=300&text=No+Image",
      }
    )
  }

  const product = {
    ...getProductData(productId),
    accessLevels: [
      { id: "view", name: "View Only", description: "Access to view dashboards and reports" },
      { id: "download", name: "Download Data", description: "Ability to export and download data" },
      { id: "api", name: "API Access", description: "Programmatic access via API endpoints" },
    ],
    requiredApprovals: ["Data Steward", "Department Head"],
  }

  const handleSubmit = (formData: any) => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // In a real app, you would submit the form data to your backend
      console.log("Form submitted:", formData)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1 py-12">
          <div className="container px-4 max-w-4xl mx-auto">
            <Card className="border-green-100 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">Access Request Submitted</CardTitle>
                <CardDescription className="text-center">
                  Your request for access to {product.title} has been submitted successfully.
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Request ID: REQ-{Math.floor(Math.random() * 10000)}</AlertTitle>
                    <AlertDescription>
                      Your request has been sent to the data steward for review. You will be notified via email when a
                      decision has been made.
                    </AlertDescription>
                  </Alert>

                  <div className="rounded-lg border p-4 bg-muted/50">
                    <h3 className="font-medium mb-2">What happens next?</h3>
                    <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Your request will be reviewed by the data steward (typically within 2-3 business days)</li>
                      <li>
                        If approved, you may need additional approvals from {product.requiredApprovals.join(", ")}
                      </li>
                      <li>Once all approvals are complete, you will receive access credentials</li>
                      <li>You can check the status of your request in your account dashboard</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-4">
                <Button variant="outline" asChild>
                  <Link href="/discover">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Data Products
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/dashboard">View Request Status</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 py-12">
        <div className="container px-4 max-w-4xl mx-auto">
          <Link
            href={`/discover/product/${productId}`}
            className="inline-flex items-center text-sm text-[#9e1b32] hover:underline mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to {product.title}
          </Link>

          <RequestAccessHeader product={product} />

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
              <span className="ml-2 text-gray-600">Loading...</span>
            </div>
          ) : session ? (
            <RequestAccessForm product={product} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          ) : (
            <RequestAccessAuth onAuthenticated={() => {}} productId={productId} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
