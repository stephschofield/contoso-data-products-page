"use client"

import { useState, useEffect } from "react"

export function ImageDebug() {
  const [imageStatus, setImageStatus] = useState<Record<string, boolean>>({})

  const imagePaths = [
    "/images/student-demographics.jpeg",
    "/images/enrollment-analytics.jpeg",
    "/images/campus-resource-utilization.jpeg",
    "/images/course-enrollment.jpeg",
    "/images/alumni-careers.jpeg",
    "/images/library-resource-usage.jpeg",
    "/images/student-success.jpeg",
    "/images/powerbi-thumbnail.jpeg",
    "/images/powerbi-course-enrollment.jpeg",
    "/images/contoso-logo.png",
    "/images/university_of_contoso_transparent.png",
    "/images/uark-logo.png",
  ]

  useEffect(() => {
    const checkImages = async () => {
      const results: Record<string, boolean> = {}

      for (const path of imagePaths) {
        try {
          const response = await fetch(path, { method: "HEAD" })
          results[path] = response.ok
        } catch (error) {
          results[path] = false
        }
      }

      setImageStatus(results)
    }

    checkImages()
  }, [])

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 mt-4">
      <h2 className="text-lg font-bold mb-2">Image Status Debug</h2>
      <div className="space-y-1">
        {Object.entries(imageStatus).map(([path, exists]) => (
          <div key={path} className="flex items-center gap-2">
            <span className={`w-4 h-4 rounded-full ${exists ? "bg-green-500" : "bg-red-500"}`}></span>
            <span className={exists ? "text-green-700" : "text-red-700"}>
              {path}: {exists ? "Found" : "Not Found"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
