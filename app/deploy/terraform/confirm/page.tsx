"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { FileCode2, AlertTriangle, ArrowRight, ArrowLeft, Server, Database, Globe, Shield } from "lucide-react"

export default function TerraformConfirmPage() {
  const router = useRouter()
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // In a real application, this would come from form state or API
  const deploymentConfig = {
    projectName: "fabric-prod",
    environment: "Production",
    region: "East US",
    subscriptionId: "12345678-1234-1234-1234-123456789012",
    tfStateStorage: "Azure Storage",
    tfVersion: "1.5.0",
    resourceGroup: "fabric-resources",
    additionalParams: `resource_prefix = "fabric"
network_cidr = "10.0.0.0/16"
enable_monitoring = true`,
  }

  const handleDeploy = () => {
    setIsLoading(true)
    // In a real application, you would submit the deployment request to your backend here
    setTimeout(() => {
      router.push("/deploy/terraform")
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Confirm Deployment</h1>
              <p className="text-gray-500">Review your Terraform deployment configuration before proceeding.</p>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                This action will deploy infrastructure resources to your Azure subscription. Please review the
                configuration carefully before proceeding.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <FileCode2 className="h-5 w-5 text-primary" />
                  Terraform Deployment Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 pb-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Project Information</h3>
                      <div className="space-y-3">
                        <ConfigItem
                          icon={<Server className="h-4 w-4 text-gray-500" />}
                          label="Project Name"
                          value={deploymentConfig.projectName}
                        />
                        <ConfigItem
                          icon={<Database className="h-4 w-4 text-gray-500" />}
                          label="Environment"
                          value={deploymentConfig.environment}
                          badge={
                            deploymentConfig.environment === "Production"
                              ? { text: "Production", variant: "destructive" as const }
                              : undefined
                          }
                        />
                        <ConfigItem
                          icon={<Globe className="h-4 w-4 text-gray-500" />}
                          label="Region"
                          value={deploymentConfig.region}
                        />
                        <ConfigItem label="Resource Group" value={deploymentConfig.resourceGroup} />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Terraform Configuration</h3>
                      <div className="space-y-3">
                        <ConfigItem label="Terraform Version" value={deploymentConfig.tfVersion} />
                        <ConfigItem label="State Storage" value={deploymentConfig.tfStateStorage} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Azure Configuration</h3>
                      <div className="space-y-3">
                        <ConfigItem
                          icon={<Shield className="h-4 w-4 text-gray-500" />}
                          label="Subscription ID"
                          value={maskSubscriptionId(deploymentConfig.subscriptionId)}
                        />
                      </div>
                    </div>

                    {deploymentConfig.additionalParams && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-3">Additional Parameters</h3>
                        <pre className="bg-gray-50 p-3 rounded-md text-sm overflow-auto max-h-[200px] border">
                          {deploymentConfig.additionalParams}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-2 mt-8 pb-2">
                  <Checkbox
                    id="confirm"
                    checked={isConfirmed}
                    onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="confirm"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I confirm that I want to deploy these resources
                    </label>
                    <p className="text-sm text-muted-foreground">
                      I understand that this will create real infrastructure resources in my Azure subscription.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-6">
                <Button variant="outline" onClick={() => router.push("/deploy-fabric")}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleDeploy} disabled={!isConfirmed || isLoading} className="gap-2 group">
                  {isLoading ? "Initiating Deployment..." : "Deploy with Terraform"}
                  {!isLoading && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

interface ConfigItemProps {
  icon?: React.ReactNode
  label: string
  value: string
  badge?: {
    text: string
    variant: "default" | "secondary" | "destructive" | "outline"
  }
}

function ConfigItem({ icon, label, value, badge }: ConfigItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{value}</span>
        {badge && <Badge variant={badge.variant}>{badge.text}</Badge>}
      </div>
    </div>
  )
}

function maskSubscriptionId(id: string): string {
  // Show only the last 4 characters
  return `•••••••••••${id.slice(-4)}`
}
