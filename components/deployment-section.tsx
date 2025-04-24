"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileCode2, Braces, ArrowRight } from "lucide-react"

export function DeploymentSection() {
  const router = useRouter()
  const [deploymentType, setDeploymentType] = useState("terraform")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    projectName: "",
    environment: "development",
    region: "eastus",
    subscriptionId: "",
    resourceGroup: "",
    tfStateStorage: "azurerm",
    tfVersion: "1.5.0",
    bicepScope: "resourceGroup",
    additionalParams: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    setIsLoading(true)
    // In a real application, you would validate the form here

    // Navigate to the confirmation page
    if (deploymentType === "terraform") {
      router.push("/deploy/terraform/confirm")
    } else {
      router.push("/deploy/bicep/confirm")
    }
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Deploy Fabric Platform</h1>
            <p className="text-xl text-gray-500 max-w-[600px] mx-auto">
              Choose your preferred deployment method and get started in minutes.
            </p>
          </div>

          <Tabs defaultValue="terraform" onValueChange={setDeploymentType} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger
                value="terraform"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <FileCode2 className="h-5 w-5" />
                <span>Terraform</span>
              </TabsTrigger>
              <TabsTrigger
                value="bicep"
                className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Braces className="h-5 w-5" />
                <span>Bicep</span>
              </TabsTrigger>
            </TabsList>

            <Card className="border-none shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-2">
                  {deploymentType === "terraform" ? (
                    <FileCode2 className="h-5 w-5 text-primary" />
                  ) : (
                    <Braces className="h-5 w-5 text-primary" />
                  )}
                  <h2 className="text-2xl font-medium">
                    {deploymentType === "terraform" ? "Terraform" : "Bicep"} Deployment
                  </h2>
                </div>
                <p className="text-gray-500">
                  {deploymentType === "terraform"
                    ? "Deploy your Fabric platform using HashiCorp Terraform."
                    : "Deploy your Fabric platform using Microsoft Bicep."}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="project-name" className="text-sm font-medium">
                      Project Name
                    </Label>
                    <Input
                      id="project-name"
                      placeholder="Enter your project name"
                      className="h-11"
                      value={formData.projectName}
                      onChange={(e) => handleInputChange("projectName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="environment" className="text-sm font-medium">
                      Environment
                    </Label>
                    <Select
                      value={formData.environment}
                      onValueChange={(value) => handleInputChange("environment", value)}
                    >
                      <SelectTrigger id="environment" className="h-11">
                        <SelectValue placeholder="Select environment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="staging">Staging</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="region" className="text-sm font-medium">
                      Region
                    </Label>
                    <Select value={formData.region} onValueChange={(value) => handleInputChange("region", value)}>
                      <SelectTrigger id="region" className="h-11">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eastus">East US</SelectItem>
                        <SelectItem value="westus">West US</SelectItem>
                        <SelectItem value="centralus">Central US</SelectItem>
                        <SelectItem value="northeurope">North Europe</SelectItem>
                        <SelectItem value="westeurope">West Europe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subscription" className="text-sm font-medium">
                      Subscription ID
                    </Label>
                    <Input
                      id="subscription"
                      placeholder="Enter your subscription ID"
                      className="h-11"
                      value={formData.subscriptionId}
                      onChange={(e) => handleInputChange("subscriptionId", e.target.value)}
                    />
                  </div>
                </div>

                {deploymentType === "terraform" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="tf-state" className="text-sm font-medium">
                        Terraform State Storage
                      </Label>
                      <Select
                        value={formData.tfStateStorage}
                        onValueChange={(value) => handleInputChange("tfStateStorage", value)}
                      >
                        <SelectTrigger id="tf-state" className="h-11">
                          <SelectValue placeholder="Select state storage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="azurerm">Azure Storage</SelectItem>
                          <SelectItem value="s3">AWS S3</SelectItem>
                          <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                          <SelectItem value="local">Local</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tf-version" className="text-sm font-medium">
                        Terraform Version
                      </Label>
                      <Select
                        value={formData.tfVersion}
                        onValueChange={(value) => handleInputChange("tfVersion", value)}
                      >
                        <SelectTrigger id="tf-version" className="h-11">
                          <SelectValue placeholder="Select Terraform version" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1.5.0">1.5.0</SelectItem>
                          <SelectItem value="1.4.6">1.4.6</SelectItem>
                          <SelectItem value="1.3.9">1.3.9</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="bicep-scope" className="text-sm font-medium">
                        Bicep Deployment Scope
                      </Label>
                      <Select
                        value={formData.bicepScope}
                        onValueChange={(value) => handleInputChange("bicepScope", value)}
                      >
                        <SelectTrigger id="bicep-scope" className="h-11">
                          <SelectValue placeholder="Select deployment scope" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="resourceGroup">Resource Group</SelectItem>
                          <SelectItem value="subscription">Subscription</SelectItem>
                          <SelectItem value="managementGroup">Management Group</SelectItem>
                          <SelectItem value="tenant">Tenant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resource-group" className="text-sm font-medium">
                        Resource Group
                      </Label>
                      <Input
                        id="resource-group"
                        placeholder="Enter resource group name"
                        className="h-11"
                        value={formData.resourceGroup}
                        onChange={(e) => handleInputChange("resourceGroup", e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="additional-params" className="text-sm font-medium">
                    Additional Parameters
                  </Label>
                  <Textarea
                    id="additional-params"
                    placeholder={
                      deploymentType === "terraform"
                        ? "Enter additional Terraform variables (HCL format)"
                        : "Enter additional Bicep parameters (JSON format)"
                    }
                    className="min-h-[100px] resize-none"
                    value={formData.additionalParams}
                    onChange={(e) => handleInputChange("additionalParams", e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  size="lg"
                  className="w-full h-12 text-base gap-2 group"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Processing..."
                    : `Continue with ${deploymentType === "terraform" ? "Terraform" : "Bicep"}`}
                  {!isLoading && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                </Button>
              </CardFooter>
            </Card>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
