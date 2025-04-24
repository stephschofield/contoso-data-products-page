import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle, ArrowRight, Terminal, ExternalLink } from "lucide-react"

export default function DeploymentSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-16 lg:py-24 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>

            <h1 className="text-3xl font-bold tracking-tighter mb-2">Deployment Successfully Initiated!</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Your Fabric platform deployment has been successfully initiated. The resources are now being provisioned.
            </p>

            <div className="rounded-lg border p-6 bg-background mb-8">
              <h2 className="text-xl font-semibold mb-4">Deployment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Deployment ID</p>
                  <p className="font-medium">FAB-DEP-12345678</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex w-2 h-2 bg-green-400 rounded-full" />
                    <span className="font-medium">In Progress</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estimated Time</p>
                  <p className="font-medium">15-20 minutes</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Deployment Type</p>
                  <p className="font-medium">Terraform</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <div className="rounded-lg border p-6 bg-background">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">View Deployment Logs</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Monitor the progress of your deployment in real-time with detailed logs.
                </p>
                <Button variant="outline" className="w-full">
                  View Logs
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="rounded-lg border p-6 bg-background">
                <div className="flex items-center gap-2 mb-4">
                  <ArrowRight className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Next Steps</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  While your deployment is in progress, explore our documentation to learn more about managing your
                  Fabric platform.
                </p>
                <Button className="w-full">
                  View Documentation
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4 items-center">
              <p className="text-muted-foreground">
                You'll receive an email notification once the deployment is complete.
              </p>
              <div className="flex gap-4">
                <Button asChild variant="outline">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
                <Button asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
