"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Shield, Loader2, UserPlus, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export default function AdminSignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validateEmail = (email: string) => {
    return email.endsWith("@thynkcity.com")
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (!validateEmail(email)) {
        throw new Error("Only @thynkcity.com email addresses are allowed to sign up")
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match")
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long")
      }

      console.log("Starting admin signup for:", email)

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin/dashboard`,
          data: {
            role: "admin",
          },
        },
      })

      if (error) {
        console.error("Signup error:", error)
        throw error
      }

      if (!data.user) {
        throw new Error("User creation failed")
      }

      console.log("User created successfully:", data.user.id)

      const response = await fetch('/api/admin/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.user.email,
          userId: data.user.id
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send verification email");
      }

      setSuccess(
        "Admin account created! Please check your email for a confirmation link from Supabase to activate your account.",
      )
    } catch (error: unknown) {
      console.error("Signup error:", error)
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Image
                src="/images/thynkcity-20main-20logo.png"
                alt="Thynkcity Logo"
                width={200}
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold font-montserrat flex items-center justify-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                Admin Portal
              </h1>
              <p className="text-muted-foreground">Create admin account</p>
            </div>
          </div>

          <Card className="border-2 hover:border-primary/20 smooth-transition">
            <CardHeader>
              <CardTitle className="text-xl font-montserrat flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Admin Sign Up
              </CardTitle>
              <CardDescription>Create a new admin account (only @thynkcity.com emails allowed)</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp}>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@thynkcity.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="smooth-transition"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="smooth-transition pr-10"
                        placeholder="Minimum 6 characters"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="smooth-transition pr-10"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}
                  {success && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">{success}</p>
                    </div>
                  )}
                  <Button type="submit" className="w-full btn-animate hover-lift" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Admin Account"
                    )}
                  </Button>
                </div>
                <div className="mt-4 space-y-2 text-center text-sm">
                  <Link href="/admin/login" className="text-primary hover:underline">
                    Already have an account? Sign in
                  </Link>
                  <div>
                    <Link href="/" className="text-muted-foreground hover:text-primary hover:underline">
                      Back to Website
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
