"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface RequestFormProps {
  productId: number
}

export function RequestForm({ productId }: RequestFormProps) {
  const [formStep, setFormStep] = useState(1)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [accessType, setAccessType] = useState("view")
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    // In a real app, you would submit the form data to an API
  }

  if (formSubmitted) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Request Submitted</CardTitle>
          <CardDescription>Your access request has been submitted successfully.</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success</AlertTitle>
            <AlertDescription className="text-green-700">
              Your request for access to this data product has been received. You will be notified when your request has
              been reviewed.
            </AlertDescription>
          </Alert>

          <div className="mt-4 rounded-lg border p-4 bg-muted/50">
            <h3 className="font-medium mb-2">Request Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Request ID:</span>
                <span className="font-medium">
                  REQ-{productId}-{Math.floor(Math.random() * 10000)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Submitted on:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated response time:</span>
                <span className="font-medium">2-3 business days</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => (window.location.href = `/request-status/${productId}`)}
          >
            View Request Status
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="shadow-md">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Request Access</CardTitle>
          <CardDescription>Complete this form to request access to this data product.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {formStep === 1 && (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="access-type">Access Type</Label>
                  <RadioGroup
                    defaultValue={accessType}
                    className="grid grid-cols-3 gap-4 mt-2"
                    onValueChange={setAccessType}
                  >
                    <div>
                      <RadioGroupItem value="view" id="view" className="peer sr-only" />
                      <Label
                        htmlFor="view"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="text-sm font-medium">View Only</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="download" id="download" className="peer sr-only" />
                      <Label
                        htmlFor="download"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="text-sm font-medium">Download</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="api" id="api" className="peer sr-only" />
                      <Label
                        htmlFor="api"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <span className="text-sm font-medium">API Access</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="purpose">Purpose</Label>
                  <Select required>
                    <SelectTrigger id="purpose">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="research">Academic Research</SelectItem>
                      <SelectItem value="teaching">Teaching</SelectItem>
                      <SelectItem value="administrative">Administrative</SelectItem>
                      <SelectItem value="student-project">Student Project</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="project-description">Project Description</Label>
                  <Textarea
                    id="project-description"
                    placeholder="Please describe how you plan to use this data..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="time-period">Access Duration</Label>
                  <Select required>
                    <SelectTrigger id="time-period">
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="1-month">1 Month</SelectItem>
                      <SelectItem value="3-months">3 Months</SelectItem>
                      <SelectItem value="6-months">6 Months</SelectItem>
                      <SelectItem value="1-year">1 Year</SelectItem>
                      <SelectItem value="permanent">Permanent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Alert variant="destructive" className="bg-yellow-50 border-yellow-200 text-yellow-800">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertTitle className="text-yellow-800">Important</AlertTitle>
                <AlertDescription className="text-yellow-700">
                  Access to this data product requires approval from the data steward. Please ensure your request
                  includes all necessary information.
                </AlertDescription>
              </Alert>
            </>
          )}

          {formStep === 2 && (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" placeholder="Your department" required />
                </div>

                <div>
                  <Label htmlFor="supervisor">Supervisor/Advisor</Label>
                  <Input id="supervisor" placeholder="Name of your supervisor or advisor" required />
                </div>

                <div>
                  <Label htmlFor="supervisor-email">Supervisor Email</Label>
                  <Input id="supervisor-email" type="email" placeholder="Supervisor's email address" required />
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="agree-terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="agree-terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the terms of use
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      I understand that I am responsible for using this data in accordance with university policies and
                      applicable regulations.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {formStep === 2 ? (
            <>
              <Button type="button" variant="outline" onClick={() => setFormStep(1)}>
                Previous
              </Button>
              <Button type="submit" disabled={!agreeTerms}>
                Submit Request
              </Button>
            </>
          ) : (
            <>
              <div></div>
              <Button type="button" onClick={() => setFormStep(2)}>
                Next
              </Button>
            </>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}
