"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DeploymentProgress } from "@/components/deployment-progress"
import { DeploymentSummary } from "@/components/deployment-summary"
import { DeploymentConsole } from "@/components/deployment-console"
import { DeploymentActions } from "@/components/deployment-actions"

export default function TerraformDeployPage() {
  const [deploymentState, setDeploymentState] = useState<
    "initializing" | "planning" | "applying" | "completed" | "failed"
  >("initializing")
  const [progress, setProgress] = useState(0)
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])

  // Simulated deployment progress
  useEffect(() => {
    // Initial delay before starting
    const initialDelay = setTimeout(() => {
      addConsoleOutput("Initializing Terraform deployment...")
      addConsoleOutput("Authenticating with Azure...")
      addConsoleOutput("Setting up Terraform backend...")

      // Move to planning phase after initialization
      const planningDelay = setTimeout(() => {
        setDeploymentState("planning")
        setProgress(25)
        addConsoleOutput("Terraform initialization complete.")
        addConsoleOutput("Running terraform plan...")
        addConsoleOutput("Analyzing infrastructure changes...")

        // Move to applying phase after planning
        const applyingDelay = setTimeout(() => {
          setDeploymentState("applying")
          setProgress(50)
          addConsoleOutput("Terraform plan complete. Resources to create: 12, change: 0, destroy: 0")
          addConsoleOutput("Running terraform apply...")
          addConsoleOutput("Creating Azure Resource Group...")

          // Simulate resource creation with periodic updates
          let resourceCount = 0
          const resourceInterval = setInterval(() => {
            resourceCount++
            setProgress(50 + resourceCount * 4)

            if (resourceCount === 1) {
              addConsoleOutput("Creating Azure Virtual Network...")
            } else if (resourceCount === 2) {
              addConsoleOutput("Creating Azure Subnet...")
            } else if (resourceCount === 3) {
              addConsoleOutput("Creating Azure Storage Account...")
            } else if (resourceCount === 4) {
              addConsoleOutput("Creating Azure Key Vault...")
            } else if (resourceCount === 5) {
              addConsoleOutput("Creating Azure Kubernetes Service...")
            } else if (resourceCount === 6) {
              addConsoleOutput("Configuring Kubernetes cluster...")
            } else if (resourceCount === 7) {
              addConsoleOutput("Deploying Fabric components...")
            } else if (resourceCount === 8) {
              addConsoleOutput("Configuring networking...")
            } else if (resourceCount === 9) {
              addConsoleOutput("Setting up monitoring...")
            } else if (resourceCount === 10) {
              addConsoleOutput("Finalizing deployment...")
              clearInterval(resourceInterval)

              // Complete the deployment
              const completionDelay = setTimeout(() => {
                setDeploymentState("completed")
                setProgress(100)
                addConsoleOutput("Terraform apply complete. Resources created: 12, changed: 0, destroyed: 0")
                addConsoleOutput("Fabric platform deployment successful!")
              }, 2000)

              return () => clearTimeout(completionDelay)
            }
          }, 1500)

          return () => clearInterval(resourceInterval)
        }, 3000)

        return () => clearTimeout(applyingDelay)
      }, 3000)

      return () => clearTimeout(planningDelay)
    }, 1000)

    return () => clearTimeout(initialDelay)
  }, [])

  const addConsoleOutput = (line: string) => {
    setConsoleOutput((prev) => [...prev, line])
  }

  // Mock deployment configuration data
  const deploymentConfig = {
    projectName: "fabric-prod",
    environment: "Production",
    region: "East US",
    subscriptionId: "12345678-1234-1234-1234-123456789012",
    tfStateStorage: "Azure Storage",
    tfVersion: "1.5.0",
    resourceCount: 12,
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Terraform Deployment</h1>
              <p className="text-gray-500">Deploying your Fabric platform using Terraform.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <DeploymentProgress deploymentState={deploymentState} progress={progress} />

                <DeploymentConsole consoleOutput={consoleOutput} deploymentState={deploymentState} />
              </div>

              <div className="space-y-8">
                <DeploymentSummary config={deploymentConfig} />

                <DeploymentActions
                  deploymentState={deploymentState}
                  onCancel={() => {
                    if (deploymentState !== "completed") {
                      setDeploymentState("failed")
                      addConsoleOutput("Deployment cancelled by user.")
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
