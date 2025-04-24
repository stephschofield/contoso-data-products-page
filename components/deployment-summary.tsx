import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileCode2, Globe, Server, Database } from "lucide-react"

interface DeploymentSummaryProps {
  config: {
    projectName: string
    environment: string
    region: string
    subscriptionId: string
    tfStateStorage: string
    tfVersion: string
    resourceCount: number
  }
}

export function DeploymentSummary({ config }: DeploymentSummaryProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileCode2 className="h-5 w-5 text-primary" />
          Deployment Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        <div className="space-y-3">
          <SummaryItem
            icon={<Server className="h-4 w-4 text-gray-500" />}
            label="Project Name"
            value={config.projectName}
          />
          <SummaryItem
            icon={<Database className="h-4 w-4 text-gray-500" />}
            label="Environment"
            value={config.environment}
          />
          <SummaryItem icon={<Globe className="h-4 w-4 text-gray-500" />} label="Region" value={config.region} />
        </div>

        <div className="pt-2 border-t border-gray-100 space-y-3">
          <SummaryItem label="Subscription ID" value={maskSubscriptionId(config.subscriptionId)} />
          <SummaryItem label="Terraform State" value={config.tfStateStorage} />
          <SummaryItem label="Terraform Version" value={config.tfVersion} />
          <SummaryItem label="Resources" value={config.resourceCount.toString()} />
        </div>
      </CardContent>
    </Card>
  )
}

interface SummaryItemProps {
  icon?: React.ReactNode
  label: string
  value: string
}

function SummaryItem({ icon, label, value }: SummaryItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}

function maskSubscriptionId(id: string): string {
  // Show only the last 4 characters
  return `•••••••••••${id.slice(-4)}`
}
