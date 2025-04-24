"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { FileCode2, Braces } from "lucide-react"

interface StepTwoProps {
  formData: {
    deploymentType: string
  }
  updateFormData: (data: Partial<{ deploymentType: string }>) => void
}

export function GetStartedStepTwo({ formData, updateFormData }: StepTwoProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Select Deployment Method</Label>
        <RadioGroup
          value={formData.deploymentType}
          onValueChange={(value) => updateFormData({ deploymentType: value })}
          className="grid grid-cols-1 gap-4 pt-2"
        >
          <div className="flex items-start space-x-4">
            <RadioGroupItem value="terraform" id="terraform" className="mt-1" />
            <div className="grid gap-1.5 leading-none">
              <div className="flex items-center gap-2">
                <Label htmlFor="terraform" className="text-base font-medium">
                  <FileCode2 className="h-5 w-5 inline-block mr-2 text-primary" />
                  Terraform
                </Label>
              </div>
              <div className="pl-8">
                <p className="text-sm text-muted-foreground mb-2">
                  HashiCorp's infrastructure as code tool for building, changing, and versioning infrastructure safely
                  and efficiently.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="rounded-md border p-3">
                    <h4 className="font-medium mb-1">Pros</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Multi-cloud support</li>
                      <li>Large ecosystem</li>
                      <li>Mature tooling</li>
                      <li>Strong community</li>
                    </ul>
                  </div>
                  <div className="rounded-md border p-3">
                    <h4 className="font-medium mb-1">Best for</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Multi-cloud environments</li>
                      <li>Complex infrastructure</li>
                      <li>Teams familiar with HCL</li>
                      <li>Infrastructure as code veterans</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4 mt-4">
            <RadioGroupItem value="bicep" id="bicep" className="mt-1" />
            <div className="grid gap-1.5 leading-none">
              <div className="flex items-center gap-2">
                <Label htmlFor="bicep" className="text-base font-medium">
                  <Braces className="h-5 w-5 inline-block mr-2 text-primary" />
                  Bicep
                </Label>
              </div>
              <div className="pl-8">
                <p className="text-sm text-muted-foreground mb-2">
                  Microsoft's domain-specific language (DSL) for deploying Azure resources declaratively.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="rounded-md border p-3">
                    <h4 className="font-medium mb-1">Pros</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Azure-native integration</li>
                      <li>Simpler syntax than ARM</li>
                      <li>Strong type safety</li>
                      <li>Built-in Azure tooling</li>
                    </ul>
                  </div>
                  <div className="rounded-md border p-3">
                    <h4 className="font-medium mb-1">Best for</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Azure-only environments</li>
                      <li>Microsoft-focused teams</li>
                      <li>Teams familiar with ARM</li>
                      <li>Simplified Azure deployments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="rounded-lg border p-4 bg-muted/50">
        <h3 className="font-medium mb-2">Not sure which to choose?</h3>
        <p className="text-sm text-muted-foreground">
          If your organization primarily uses Azure and you want native integration, Bicep is a great choice. If you
          need multi-cloud support or already use Terraform elsewhere, choose Terraform for consistency. You can always
          change your deployment method later.
        </p>
      </div>
    </div>
  )
}
