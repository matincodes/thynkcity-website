import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Mail } from "lucide-react"

export default function FranchisePendingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Application Under Review</CardTitle>
          <CardDescription>Your franchisee application is being reviewed by our team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <Mail className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              You will receive an email notification once your application has been approved. This process typically
              takes 1-3 business days.
            </p>
          </div>
          <p className="text-xs text-gray-500">If you have any questions, please contact our support team.</p>
        </CardContent>
      </Card>
    </div>
  )
}
