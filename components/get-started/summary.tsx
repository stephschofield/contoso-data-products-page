import { Badge } from "@/components/ui/badge"
import { FileCode2, Braces } from "lucide-react"

interface SummaryProps {
  formData: {
    accountName: string
    organizationName: string
    deploymentType: string
    region: string
    environment: string
    projectName: string
    resourceGroup: string
    subscriptionId: string
    tfStateStorage?: string
    tfVersion?: string
    bicepScope?: string
    additionalParams: string
  }
}

export function GetStartedSummary({ formData }: SummaryProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <h3 className="font-medium mb-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Account Name</p>
            <p className="font-medium">{formData.accountName || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Organization</p>
            <p className="font-medium">{formData.organizationName || "Not provided"}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="font-medium mb-4">Deployment Method</h3>
        <div className="flex items-center gap-2">
          {formData.deploymentType === "terraform" ? (
            <>
              <FileCode2 className="h-5 w-5 text-primary" />
              <span className="font-medium">Terraform</span>
            </>
          ) : (
            <>
              <Braces className="h-5 w-5 text-primary" />
              <span className="font-medium">Bicep</span>
            </>
          )}
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="font-medium mb-4">Configuration Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Project Name</p>
            <p className="font-medium">{formData.projectName || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Environment</p>
            <Badge variant="outline" className="font-normal">
              {formData.environment === "development"
                ? "Development"
                : formData.environment === "staging"
                  ? "Staging"
                  : "Production"}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Region</p>
            <p className="font-medium">
              {formData.region === "eastus"
                ? "East US"
                : formData.region === "westus"
                  ? "West US"
                  : formData.region === "centralus"
                    ? "Central US"
                    : formData.region === "northeurope"
                      ? "North Europe"
                      : "West Europe"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Subscription ID</p>
            <p className="font-medium">{formData.subscriptionId || "Not provided"}</p>
          </div>
        </div>
      </div>

      {formData.deploymentType === "terraform" && (
        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-4">Terraform Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">State Storage</p>
              <p className="font-medium">
                {formData.tfStateStorage === "azurerm"
                  ? "Azure Storage"
                  : formData.tfStateStorage === "s3"
                    ? "AWS S3"
                    : formData.tfStateStorage === "gcs"
                      ? "Google Cloud Storage"
                      : "Local"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Terraform Version</p>
              <p className="font-medium">{formData.tfVersion}</p>
            </div>
          </div>
        </div>
      )}

      {formData.deploymentType === "bicep" && (
        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-4">Bicep Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Resource Group</p>
              <p className="font-medium">{formData.resourceGroup || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Deployment Scope</p>
              <p className="font-medium">
                {formData.bicepScope === "resourceGroup"
                  ? "Resource Group"
                  : formData.bicepScope === "subscription"
                    ? "Subscription"
                    : formData.bicepScope === "managementGroup"
                      ? "Management Group"
                      : "Tenant"}
              </p>
            </div>
          </div>
        </div>
      )}

      {formData.additionalParams && (
        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-2">Additional Parameters</h3>
          <pre className="bg-muted p-3 rounded-md text-sm overflow-auto max-h-[200px]">{formData.additionalParams}</pre>
        </div>
      )}

      <div className="rounded-lg border p-4 bg-muted/50">
        <h3 className="font-medium mb-2">Ready to Deploy</h3>
        <p className="text-sm text-muted-foreground">
          Please review your configuration details above. Once you click "Deploy", we'll start setting up your resources
          with the specified configuration. This process may take a few minutes to complete.
        </p>
      </div>
    </div>
  )
}
