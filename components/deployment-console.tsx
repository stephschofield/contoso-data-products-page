"use client"

import { useEffect, useRef } from "react"
import { AlertTriangle, Terminal } from "lucide-react"

interface DeploymentConsoleProps {
  consoleOutput: string[]
  deploymentState: "initializing" | "planning" | "applying" | "completed" | "failed"
}

export function DeploymentConsole({ consoleOutput, deploymentState }: DeploymentConsoleProps) {
  const consoleRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight
    }
  }, [consoleOutput])

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-gray-500" />
          <h2 className="text-xl font-medium">Console Output</h2>
        </div>
        {deploymentState === "failed" && (
          <div className="flex items-center gap-1 text-red-600">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">Deployment Failed</span>
          </div>
        )}
      </div>

      <div
        ref={consoleRef}
        className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm h-[400px] overflow-y-auto"
      >
        {consoleOutput.map((line, index) => (
          <div key={index} className="pb-1">
            <span className="text-gray-500">[{formatTimestamp()}]</span> {line}
          </div>
        ))}
        {deploymentState !== "completed" && deploymentState !== "failed" && (
          <div className="inline-block animate-pulse">▋</div>
        )}
      </div>
    </div>
  )
}

function formatTimestamp(): string {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, "0")
  const minutes = now.getMinutes().toString().padStart(2, "0")
  const seconds = now.getSeconds().toString().padStart(2, "0")
  return `${hours}:${minutes}:${seconds}`
}
