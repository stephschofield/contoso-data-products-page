"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

interface RequestAccessFormProps {
  product: {
    id: number
    title: string
    accessLevels: {
      id: string
      name: string
      description: string
    }[]
    requiredApprovals: string[]
  }
  onSubmit: (formData: any) => void
  isSubmitting: boolean
}

export function RequestAccessForm({ product, onSubmit, isSubmitting }: RequestAccessFormProps) {
  const [formData, setFormData] = useState({
    accessLevel: product.accessLevels[0].id,
    purpose: "",
    timeframe: "semester",
    agreesToTerms: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.purpose.trim()) {
      newErrors.purpose = "Please provide a purpose for your request"
    }

    if (!formData.agreesToTerms) {
      newErrors.agreesToTerms = "You must agree to the terms of use"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit({
        productId: product.id,
        ...formData,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Request Access to {product.title}</CardTitle>
          <CardDescription>
            Please provide the following information to request access to this data product.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="access-level" className="text-base">
                Access Level
              </Label>
              <RadioGroup
                id="access-level"
                value={formData.accessLevel}
                onValueChange={(value) => handleInputChange("accessLevel", value)}
                className="mt-2 space-y-3"
              >
                {product.accessLevels.map((level) => (
                  <div key={level.id} className="flex items-start space-x-2">
                    <RadioGroupItem value={level.id} id={`level-${level.id}`} className="mt-1" />
                    <div>
                      <Label htmlFor={`level-${level.id}`} className="font-medium">
                        {level.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">{level.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose" className="text-base">
                Purpose of Request
              </Label>
              <Textarea
                id="purpose"
                placeholder="Please describe why you need access to this data product and how you plan to use it..."
                className="min-h-[120px]"
                value={formData.purpose}
                onChange={(e) => handleInputChange("purpose", e.target.value)}
              />
              {errors.purpose && <p className="text-sm text-red-500">{errors.purpose}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeframe" className="text-base">
                Access Duration
              </Label>
              <Select value={formData.timeframe} onValueChange={(value) => handleInputChange("timeframe", value)}>
                <SelectTrigger id="timeframe">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semester">Current Semester</SelectItem>
                  <SelectItem value="academic-year">Academic Year</SelectItem>
                  <SelectItem value="permanent">Permanent Access</SelectItem>
                  <SelectItem value="custom">Custom Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Alert variant="destructive" className="bg-yellow-50 text-yellow-800 border-yellow-200">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Important Information</AlertTitle>
            <AlertDescription>
              This data product contains sensitive information about course enrollments and student academic patterns.
              Misuse of this data may result in disciplinary action.
            </AlertDescription>
          </Alert>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreesToTerms}
              onCheckedChange={(checked) => handleInputChange("agreesToTerms", checked === true)}
            />
            <div>
              <Label htmlFor="terms" className="font-medium text-sm">
                I agree to the terms of use for this data product
              </Label>
              <p className="text-sm text-muted-foreground">
                I understand that I am responsible for maintaining the confidentiality of this data and will only use it
                for the stated purpose.
              </p>
              {errors.agreesToTerms && <p className="text-sm text-red-500">{errors.agreesToTerms}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-[#9e1b32] hover:bg-[#7a1522]" disabled={isSubmitting}>
            {isSubmitting ? "Submitting Request..." : "Submit Access Request"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
