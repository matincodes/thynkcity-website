"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("Invalid verification link. Please check your email for the correct link.")
      return
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch("/api/admin/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (response.ok) {
          setStatus("success")
          setMessage("Your admin account has been verified successfully! You can now sign in to the admin portal.")
        } else {
          setStatus("error")
          setMessage(data.error || "Verification failed. Please try again or contact support.")
        }
      } catch (error) {
        setStatus("error")
        setMessage("An error occurred during verification. Please try again.")
      }
    }

    verifyEmail()
  }, [token])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Thynkcity%20Main%20Logo-bcVE5HyamWS9SeUWcwQGUVGHkpQKQn.png"
                alt="Thynkcity Logo"
                width={200}
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold font-montserrat flex items-center justify-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                Email Verification
              </h1>
            </div>
          </div>

          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-montserrat flex items-center justify-center gap-2">
                {status === "loading" && <Loader2 className="h-5 w-5 animate-spin" />}
                {status === "success" && <CheckCircle className="h-5 w-5 text-green-600" />}
                {status === "error" && <XCircle className="h-5 w-5 text-red-600" />}
                {status === "loading" && "Verifying..."}
                {status === "success" && "Verified!"}
                {status === "error" && "Verification Failed"}
              </CardTitle>
              <CardDescription>{message}</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {status === "success" && (
                <Button asChild className="w-full">
                  <Link href="/admin/login">Sign In to Admin Portal</Link>
                </Button>
              )}
              {status === "error" && (
                <div className="space-y-2">
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/admin/login">Back to Login</Link>
                  </Button>
                </div>
              )}
              <Button asChild variant="ghost" className="w-full">
                <Link href="/">Back to Website</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
