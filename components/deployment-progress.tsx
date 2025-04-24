import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Clock, Play, XCircle } from "lucide-react"

interface DeploymentProgressProps {
  deploymentState: "initializing" | "planning" | "applying" | "completed" | "failed"
  progress: number
}

export function DeploymentProgress({ deploymentState, progress }: DeploymentProgressProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Deployment Progress</h2>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="grid grid-cols-4 gap-2">
        <StageIndicator
          label="Initialize"
          status={
            deploymentState === "initializing"
              ? "active"
              : deploymentState === "failed" && progress < 25
                ? "failed"
                : "completed"
          }
        />
        <StageIndicator
          label="Plan"
          status={
            deploymentState === "planning"
              ? "active"
              : deploymentState === "failed" && progress >= 25 && progress < 50
                ? "failed"
                : progress >= 25
                  ? "completed"
                  : "pending"
          }
        />
        <StageIndicator
          label="Apply"
          status={
            deploymentState === "applying"
              ? "active"
              : deploymentState === "failed" && progress >= 50 && progress < 100
                ? "failed"
                : progress >= 50
                  ? "completed"
                  : "pending"
          }
        />
        <StageIndicator
          label="Complete"
          status={
            deploymentState === "completed"
              ? "completed"
              : deploymentState === "failed" && progress >= 100
                ? "failed"
                : "pending"
          }
        />
      </div>
    </div>
  )
}

interface StageIndicatorProps {
  label: string
  status: "pending" | "active" | "completed" | "failed"
}

function StageIndicator({ label, status }: StageIndicatorProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={`
        flex items-center justify-center w-10 h-10 rounded-full mb-2
        ${
          status === "pending"
            ? "bg-gray-100 text-gray-400"
            : status === "active"
              ? "bg-blue-100 text-blue-600 animate-pulse"
              : status === "completed"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
        }
      `}
      >
        {status === "pending" && <Clock className="h-5 w-5" />}
        {status === "active" && <Play className="h-5 w-5" />}
        {status === "completed" && <CheckCircle2 className="h-5 w-5" />}
        {status === "failed" && <XCircle className="h-5 w-5" />}
      </div>
      <span
        className={`text-sm font-medium
        ${
          status === "pending"
            ? "text-gray-500"
            : status === "active"
              ? "text-blue-600"
              : status === "completed"
                ? "text-green-600"
                : "text-red-600"
        }
      `}
      >
        {label}
      </span>
    </div>
  )
}
