"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface StepThreeProps {
  formData: {
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
  updateFormData: (
    data: Partial<{
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
    }>,
  ) => void
}

export function GetStartedStepThree({ formData, updateFormData }: StepThreeProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="projectName">Project Name</Label>
        <Input
          id="projectName"
          placeholder="Enter your project name"
          value={formData.projectName}
          onChange={(e) => updateFormData({ projectName: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="environment">Environment</Label>
          <Select value={formData.environment} onValueChange={(value) => updateFormData({ environment: value })}>
            <SelectTrigger id="environment">
              <SelectValue placeholder="Select environment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="production">Production</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="region">Region</Label>
          <Select value={formData.region} onValueChange={(value) => updateFormData({ region: value })}>
            <SelectTrigger id="region">
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="subscriptionId">Azure Subscription ID</Label>
        <Input
          id="subscriptionId"
          placeholder="Enter your Azure Subscription ID"
          value={formData.subscriptionId}
          onChange={(e) => updateFormData({ subscriptionId: e.target.value })}
        />
        <p className="text-sm text-muted-foreground">The Azure Subscription ID where resources will be deployed.</p>
      </div>

      {formData.deploymentType === "bicep" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="resourceGroup">Resource Group</Label>
            <Input
              id="resourceGroup"
              placeholder="Enter resource group name"
              value={formData.resourceGroup}
              onChange={(e) => updateFormData({ resourceGroup: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bicepScope">Bicep Deployment Scope</Label>
            <Select value={formData.bicepScope} onValueChange={(value) => updateFormData({ bicepScope: value })}>
              <SelectTrigger id="bicepScope">
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
        </>
      )}

      {formData.deploymentType === "terraform" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="tfStateStorage">Terraform State Storage</Label>
            <Select
              value={formData.tfStateStorage}
              onValueChange={(value) => updateFormData({ tfStateStorage: value })}
            >
              <SelectTrigger id="tfStateStorage">
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
            <Label htmlFor="tfVersion">Terraform Version</Label>
            <Select value={formData.tfVersion} onValueChange={(value) => updateFormData({ tfVersion: value })}>
              <SelectTrigger id="tfVersion">
                <SelectValue placeholder="Select Terraform version" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1.5.0">1.5.0</SelectItem>
                <SelectItem value="1.4.6">1.4.6</SelectItem>
                <SelectItem value="1.3.9">1.3.9</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="additionalParams">Additional Parameters</Label>
        <Textarea
          id="additionalParams"
          placeholder={
            formData.deploymentType === "terraform"
              ? "Enter additional Terraform variables (HCL format)"
              : "Enter additional Bicep parameters (JSON format)"
          }
          className="min-h-[100px]"
          value={formData.additionalParams}
          onChange={(e) => updateFormData({ additionalParams: e.target.value })}
        />
      </div>
    </div>
  )
}
