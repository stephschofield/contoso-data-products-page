import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Cog, GitCompare, Layers, Shield, Zap } from "lucide-react"

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-contoso-orange px-3 py-1 text-sm text-white">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything You Need for Fabric Deployment
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides a seamless experience for deploying your Fabric platform with either Terraform or
              Bicep.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <GitCompare className="h-6 w-6 text-contoso-orange" />
              <CardTitle>Multiple IaC Options</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Deploy using either Terraform or Bicep based on your team's expertise and preference.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Zap className="h-6 w-6 text-contoso-orange" />
              <CardTitle>Fast Deployment</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Quickly deploy your Fabric platform with our optimized deployment process.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Shield className="h-6 w-6 text-contoso-orange" />
              <CardTitle>Secure by Default</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                All deployments follow security best practices and compliance requirements.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Cog className="h-6 w-6 text-contoso-orange" />
              <CardTitle>Customizable</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Tailor your deployment to meet your specific requirements and configurations.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Code2 className="h-6 w-6 text-contoso-orange" />
              <CardTitle>Infrastructure as Code</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Manage your infrastructure with code, enabling version control and repeatability.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Layers className="h-6 w-6 text-contoso-orange" />
              <CardTitle>Multi-Environment</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Deploy to development, staging, and production environments with consistent configurations.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
