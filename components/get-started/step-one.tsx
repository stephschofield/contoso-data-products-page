"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface StepOneProps {
  formData: {
    accountName: string
    organizationName: string
  }
  updateFormData: (data: Partial<FormData>) => void
}

interface FormData {
  accountName: string
  organizationName: string
}

export function GetStartedStepOne({ formData, updateFormData }: StepOneProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="accountName">Account Name</Label>
        <Input
          id="accountName"
          placeholder="Enter your account name"
          value={formData.accountName}
          onChange={(e) => updateFormData({ accountName: e.target.value })}
          required
        />
        <p className="text-sm text-muted-foreground">This will be used to identify your account in our system.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="organizationName">Organization Name</Label>
        <Input
          id="organizationName"
          placeholder="Enter your organization name"
          value={formData.organizationName}
          onChange={(e) => updateFormData({ organizationName: e.target.value })}
          required
        />
        <p className="text-sm text-muted-foreground">The name of your organization or company.</p>
      </div>

      <div className="rounded-lg border p-4 bg-muted/50">
        <h3 className="font-medium mb-2">Why we need this information</h3>
        <p className="text-sm text-muted-foreground">
          This information helps us set up your account and customize your deployment experience. Your data is secure
          and will only be used for account management purposes.
        </p>
      </div>
    </div>
  )
}
