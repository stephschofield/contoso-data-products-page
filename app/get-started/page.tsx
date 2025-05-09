"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GetStartedStepOne } from "@/components/get-started/step-one"
import { GetStartedStepTwo } from "@/components/get-started/step-two"
import { GetStartedStepThree } from "@/components/get-started/step-three"
import { GetStartedSummary } from "@/components/get-started/summary"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

export default function GetStartedPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    accountName: "",
    organizationName: "",
    deploymentType: "terraform",
    region: "eastus",
    environment: "development",
    projectName: "",
    resourceGroup: "",
    subscriptionId: "",
    // Terraform specific
    tfStateStorage: "azurerm",
    tfVersion: "1.5.0",
    // Bicep specific
    bicepScope: "resourceGroup",
    // Common
    additionalParams: "",
  })

  const totalSteps = 4
  const progressPercentage = (currentStep / totalSteps) * 100

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    } else {
      router.push("/")
    }
  }

  const handleSubmit = () => {
    // In a real application, this would submit the data to your backend
    console.log("Form submitted with data:", formData)
    // Redirect to a success page or dashboard
    router.push("/deployment-success")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <GetStartedStepOne formData={formData} updateFormData={updateFormData} />
      case 2:
        return <GetStartedStepTwo formData={formData} updateFormData={updateFormData} />
      case 3:
        return <GetStartedStepThree formData={formData} updateFormData={updateFormData} />
      case 4:
        return <GetStartedSummary formData={formData} />
      default:
        return null
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Account Setup"
      case 2:
        return "Deployment Method"
      case 3:
        return "Configuration Details"
      case 4:
        return "Review & Deploy"
      default:
        return ""
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Set up your account information to get started with Fabric Deploy."
      case 2:
        return "Choose your preferred Infrastructure as Code tool for deployment."
      case 3:
        return "Configure the details for your Fabric platform deployment."
      case 4:
        return "Review your configuration and deploy your Fabric platform."
      default:
        return ""
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-16 lg:py-24 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tighter mb-2">Get Started with Resource Deployment</h1>
              <p className="text-muted-foreground">
                Complete the following steps to set up and deploy resources in your subscription.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{getStepTitle()}</CardTitle>
                <CardDescription>{getStepDescription()}</CardDescription>
              </CardHeader>
              <CardContent>{renderStepContent()}</CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {currentStep === 1 ? "Back to Home" : "Previous Step"}
                </Button>
                {currentStep < totalSteps ? (
                  <Button onClick={handleNext}>
                    Next Step
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit}>
                    Deploy
                    <Check className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
