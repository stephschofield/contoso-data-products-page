"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, ClipboardCopy, ExternalLink, XCircle } from "lucide-react"
import Link from "next/link"

interface DeploymentActionsProps {
  deploymentState: "initializing" | "planning" | "applying" | "completed" | "failed"
  onCancel: () => void
}

export function DeploymentActions({ deploymentState, onCancel }: DeploymentActionsProps) {
  const isInProgress = ["initializing", "planning", "applying"].includes(deploymentState)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {deploymentState === "completed" ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span>Deployment Successful</span>
            </>
          ) : deploymentState === "failed" ? (
            <>
              <XCircle className="h-5 w-5 text-red-600" />
              <span>Deployment Failed</span>
            </>
          ) : (
            <>
              <AlertCircle className="h-5 w-5 text-blue-600" />
              <span>Deployment In Progress</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        {isInProgress && (
          <p className="text-sm text-gray-500">
            Your Fabric platform is being deployed. This process may take several minutes to complete.
          </p>
        )}

        {deploymentState === "completed" && (
          <p className="text-sm text-gray-500">
            Your Fabric platform has been successfully deployed. You can now access your resources or view the
            deployment details.
          </p>
        )}

        {deploymentState === "failed" && (
          <p className="text-sm text-gray-500">
            The deployment process encountered an error. Please review the console output for details and try again.
          </p>
        )}

        <div className="space-y-2">
          {isInProgress && (
            <Button variant="destructive" className="w-full" onClick={onCancel}>
              Cancel Deployment
            </Button>
          )}

          {deploymentState === "completed" && (
            <>
              <Button className="w-full" asChild>
                <Link href="/dashboard">
                  View Dashboard
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full">
                Copy Access Details
                <ClipboardCopy className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}

          {deploymentState === "failed" && (
            <>
              <Button className="w-full" asChild>
                <Link href="/deploy-fabric">Try Again</Link>
              </Button>
              <Button variant="outline" className="w-full">
                Download Logs
                <ClipboardCopy className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}

          {!isInProgress && (
            <Button variant="outline" className="w-full" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
