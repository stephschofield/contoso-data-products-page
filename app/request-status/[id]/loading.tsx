import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function RequestStatusLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <div className="h-4 bg-gray-200 rounded w-32 mb-4 animate-pulse" />
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-200 rounded w-64 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                <div className="h-8 bg-gray-200 rounded w-40 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex justify-between">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-16 mt-3 animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="h-20 bg-gray-200 rounded animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
