import { Button } from "@/components/ui/button"
import { Lock, CheckCircle, AlertCircle, HelpCircle } from "lucide-react"
import Link from "next/link"

interface ProductAccessProps {
  productId: number
}

export function ProductAccess({ productId }: ProductAccessProps) {
  // Mock data - in a real app, you would fetch this based on the productId
  const access = {
    status: "restricted", // "public", "restricted", "pending"
    requiredApprovals: ["Data Steward", "IRB Approval"],
    accessLevels: [
      { name: "View Only", available: true },
      { name: "Download", available: true },
      { name: "API Access", available: true },
    ],
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="font-semibold flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Access Management
        </h2>
      </div>

      <div className="p-4">
        {access.status === "public" ? (
          <div className="flex items-center gap-2 text-green-600 mb-4">
            <CheckCircle className="h-5 w-5" />
            <p className="font-medium">Public Access Available</p>
          </div>
        ) : access.status === "pending" ? (
          <div className="flex items-center gap-2 text-yellow-600 mb-4">
            <AlertCircle className="h-5 w-5" />
            <p className="font-medium">Access Request Pending</p>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <Lock className="h-5 w-5" />
            <p className="font-medium">Restricted Access</p>
          </div>
        )}

        <div className="space-y-4">
          {access.status === "restricted" && (
            <>
              <div>
                <p className="text-sm text-gray-700 mb-2">Required approvals:</p>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {access.requiredApprovals.map((approval) => (
                    <li key={approval}>{approval}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm text-gray-700 mb-2">Available access levels:</p>
                <ul className="space-y-2">
                  {access.accessLevels.map((level) => (
                    <li key={level.name} className="flex items-center gap-2 text-sm">
                      {level.available ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-gray-400" />
                      )}
                      <span className={level.available ? "text-gray-700" : "text-gray-400"}>{level.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                className="w-full border-amber-500 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
                variant="outline"
                asChild
              >
                <Link href={`/request-access/${productId}`}>Request Now</Link>
              </Button>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <HelpCircle className="h-4 w-4" />
                <p>
                  Need help?{" "}
                  <a href="#" className="text-[#9e1b32] hover:underline">
                    Contact data steward
                  </a>
                </p>
              </div>
            </>
          )}

          {access.status === "pending" && (
            <div className="text-sm text-gray-700">
              <p>Your access request is currently under review. You will be notified when a decision has been made.</p>
              <p className="mt-2">Request submitted: August 10, 2023</p>

              <Button variant="outline" className="w-full mt-4">
                Check Status
              </Button>
            </div>
          )}

          {access.status === "public" && (
            <>
              <div>
                <p className="text-sm text-gray-700 mb-2">Available access methods:</p>
                <ul className="space-y-2">
                  {access.accessLevels.map((level) => (
                    <li key={level.name} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">{level.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full bg-[#9e1b32] hover:bg-[#7a1522]">Access Now</Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
