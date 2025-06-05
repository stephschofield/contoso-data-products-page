import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Clock, Play, Ticket } from 'lucide-react'
import Link from "next/link"

// Mock data for request status
const getRequestStatus = (id: string) => {
  const requests = {
    "REQ-6533": {
      id: "REQ-6533",
      title: "Student Success Dashboard",
      description: "Access request for interactive dashboard tracking student performance metrics",
      department: "Academic Affairs",
      requestedDate: "2024-01-15",
      status: "ticket in progress",
      requester: "John Doe",
      email: "john.doe@contoso.edu",
    },
    "REQ-6534": {
      id: "REQ-6534",
      title: "Campus Resource Utilization",
      description: "Access request for real-time campus facility usage insights",
      department: "Facilities Management",
      requestedDate: "2024-01-14",
      status: "ticket completed",
      requester: "Jane Smith",
      email: "jane.smith@contoso.edu",
    },
    "REQ-6535": {
      id: "REQ-6535",
      title: "Enrollment Analytics",
      description: "Access request for comprehensive enrollment pattern analytics",
      department: "Admissions",
      requestedDate: "2024-01-16",
      status: "ticket created in ServiceNow",
      requester: "Mike Johnson",
      email: "mike.johnson@contoso.edu",
    },
  }

  return requests[id as keyof typeof requests] || null
}

const statusSteps = [
  { key: "ticket created in ServiceNow", label: "Ticket Created", icon: Ticket },
  { key: "ticket in queue", label: "In Queue", icon: Clock },
  { key: "ticket in progress", label: "In Progress", icon: Play },
  { key: "ticket completed", label: "Completed", icon: CheckCircle },
]

const getStatusIndex = (status: string) => {
  return statusSteps.findIndex((step) => step.key === status)
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "ticket created in ServiceNow":
      return "bg-blue-500"
    case "ticket in queue":
      return "bg-yellow-500"
    case "ticket in progress":
      return "bg-orange-500"
    case "ticket completed":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

interface RequestStatusPageProps {
  params: {
    id: string
  }
}

export default function RequestStatusPage({ params }: RequestStatusPageProps) {
  const request = getRequestStatus(params.id)

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card>
            <CardContent className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Request Not Found</h1>
              <p className="text-gray-600 mb-6">The request ID you're looking for doesn't exist.</p>
              <Link href="/data-products">
                <Button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Data Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentStatusIndex = getStatusIndex(request.status)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Link href="/data-products" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Data Products
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Request Status</h1>
        </div>

        {/* Request Details Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{request.title}</CardTitle>
              <Badge variant="outline" className="text-sm">
                {request.id}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Request Details</h3>
                <p className="text-gray-600 mb-4">{request.description}</p>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Department:</span> {request.department}
                  </div>
                  <div>
                    <span className="font-medium">Requested Date:</span> {new Date(request.requestedDate).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Requester:</span> {request.requester}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Current Status</h3>
                <div className={`inline-flex items-center px-3 py-2 rounded-full text-white text-sm font-medium ${getStatusColor(request.status)}`}>
                  {statusSteps[currentStatusIndex]?.icon && (
                    <statusSteps[currentStatusIndex].icon className="w-4 h-4 mr-2" />
                  )}
                  {statusSteps[currentStatusIndex]?.label || request.status}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200">
                <div 
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%` }}
                />
              </div>

              {/* Status Steps */}
              <div className="relative flex justify-between">
                {statusSteps.map((step, index) => {
                  const isCompleted = index <= currentStatusIndex
                  const isCurrent = index === currentStatusIndex
                  const IconComponent = step.icon

                  return (
                    <div key={step.key} className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                          isCompleted
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'bg-white border-gray-300 text-gray-400'
                        } ${isCurrent ? 'ring-4 ring-blue-100' : ''}`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="mt-3 text-center">
                        <div className={`text-sm font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.label}
                        </div>
                        {isCurrent && (
                          <div className="text-xs text-blue-600 mt-1">Current</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Status Information */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">What happens next?</h4>
              <div className="text-sm text-gray-600 space-y-1">
                {request.status === 'ticket created in ServiceNow' && (
                  <p>Your request has been created and will be reviewed by the data steward team.</p>
                )}
                {request.status === 'ticket in queue' && (
                  <p>Your request is in the review queue. A data steward will begin processing it soon.</p>
                )}
                {request.status === 'ticket in progress' && (
                  <p>A data steward is currently reviewing your request and may reach out for additional information.</p>
                )}
                {request.status === 'ticket completed' && (
                  <p>Your request has been processed. Check your email for access credentials and next steps.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
