import { CheckCircle, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function StaffPendingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Clock className="h-16 w-16 text-orange-500" />
              <CheckCircle className="h-6 w-6 text-green-500 absolute -bottom-1 -right-1" />
            </div>
          </div>
          <CardTitle className="text-2xl">Application Submitted!</CardTitle>
          <CardDescription>Your staff application is pending approval</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Thank you for applying to join Thynkcity as an instructor. Our admin team will review your application and
            notify you via email once approved.
          </p>
          <div className="p-4 bg-blue-50 rounded-lg text-sm">
            <p className="font-medium text-blue-900 mb-2">What happens next?</p>
            <ul className="text-left space-y-2 text-blue-700">
              <li>✓ Admin reviews your application</li>
              <li>✓ You receive an approval email</li>
              <li>✓ You can login and access your dashboard</li>
              <li>✓ Start teaching and submitting class reports</li>
            </ul>
          </div>
          <Button asChild className="w-full">
            <Link href="/">Return to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
