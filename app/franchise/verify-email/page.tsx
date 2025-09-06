"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function FranchiseeVerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error" | "expired">("loading")
  const [message, setMessage] = useState("")
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")
  const success = searchParams.get("success")
  const error = searchParams.get("error")

  useEffect(() => {
    if (success === "true") {
      setStatus("success")
      setMessage("Your franchise account has been successfully verified! You can now access your dashboard.")
      // Redirect to franchise dashboard after 3 seconds
      setTimeout(() => {
        router.push("/franchise/dashboard")
      }, 3000)
      return
    }

    if (error) {
      setStatus("error")
      switch (error) {
        case "missing-token":
          setMessage("Invalid verification link. Please check your email for the correct link.")
          break
        case "invalid-token":
          setMessage("Invalid or already used verification token. Please request a new verification email.")
          break
        case "expired-token":
          setStatus("expired")
          setMessage("Your verification link has expired. Please contact support for a new verification link.")
          break
        case "verification-failed":
          setMessage("Failed to complete verification. Please try again or contact support.")
          break
        case "activation-failed":
          setMessage("Failed to activate franchise account. Please contact support.")
          break
        case "server-error":
          setMessage("An unexpected error occurred. Please try again later.")
          break
        default:
          setMessage("Verification failed. Please try again or contact support.")
      }
      return
    }

    if (!token) {
      setStatus("error")
      setMessage("Invalid verification link. Please check your email for the correct link.")
      return
    }

    verifyEmail()
  }, [token, success, error])

  const verifyEmail = async () => {
    try {
      const response = await fetch("/api/franchise/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage("Your franchise account has been successfully verified! You can now access your dashboard.")

        // Redirect to franchise dashboard after 3 seconds
        setTimeout(() => {
          router.push("/franchise/dashboard")
        }, 3000)
      } else {
        if (data.error === "Token expired") {
          setStatus("expired")
          setMessage("Your verification link has expired. Please contact support for a new verification link.")
        } else {
          setStatus("error")
          setMessage(data.error || "Verification failed. Please try again or contact support.")
        }
      }
    } catch (error) {
      console.error("Verification error:", error)
      setStatus("error")
      setMessage("An unexpected error occurred. Please try again later.")
    }
  }

  const getIcon = () => {
    switch (status) {
      case "loading":
        return <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
      case "success":
        return <CheckCircle className="h-16 w-16 text-green-500" />
      case "error":
      case "expired":
        return <XCircle className="h-16 w-16 text-red-500" />
    }
  }

  const getTitle = () => {
    switch (status) {
      case "loading":
        return "Verifying Your Account..."
      case "success":
        return "Welcome to Thynkcity!"
      case "expired":
        return "Link Expired"
      case "error":
        return "Verification Failed"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">{getIcon()}</div>
          <CardTitle className="text-2xl">{getTitle()}</CardTitle>
          <CardDescription>
            {status === "loading" && "Please wait while we verify your franchise account..."}
            {status === "success" && "Your franchise account is now active!"}
            {status === "expired" && "Your verification link has expired"}
            {status === "error" && "We couldn't verify your account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-gray-600">{message}</p>

          {status === "success" && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-green-600">Redirecting to your dashboard in 3 seconds...</p>
              <Button
                onClick={() => router.push("/franchise/dashboard")}
                className="w-full bg-[#AE752C] hover:bg-[#8B5E23]"
              >
                Go to Dashboard Now
              </Button>
            </div>
          )}

          {(status === "error" || status === "expired") && (
            <div className="space-y-2">
              <Button
                onClick={() => router.push("/franchise/login")}
                className="w-full bg-[#AE752C] hover:bg-[#8B5E23]"
              >
                Back to Login
              </Button>
              <p className="text-xs text-gray-500">
                Need help? Contact us at{" "}
                <a href="mailto:franchise@thynkcity.com" className="text-[#AE752C] hover:underline">
                  franchise@thynkcity.com
                </a>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
