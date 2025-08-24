"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Shield, Loader2, UserPlus } from "lucide-react"
import Image from "next/image"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()

  const validateEmail = (email: string) => {
    return email.endsWith("@thynkcity.com")
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error

      // Check if user has admin role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", (await supabase.auth.getUser()).data.user?.id)
        .single()

      if (profile?.role !== "admin") {
        await supabase.auth.signOut()
        throw new Error("Access denied. Admin privileges required.")
      }

      router.push("/admin/dashboard")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Validate email domain
      if (!validateEmail(email)) {
        throw new Error("Only @thynkcity.com email addresses are allowed to sign up")
      }

      // Validate password confirmation
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match")
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long")
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/admin/dashboard`,
        },
      })

      if (error) throw error

      setSuccess("Admin account created successfully! Please check your email to verify your account.")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    } catch (error: unknown) {
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
                Admin Portal
              </h1>
              <p className="text-muted-foreground">
                {isSignUp ? "Create admin account" : "Sign in to manage Thynkcity content"}
              </p>
            </div>
          </div>

          <Card className="border-2 hover:border-primary/20 smooth-transition">
            <CardHeader>
              <CardTitle className="text-xl font-montserrat flex items-center gap-2">
                {isSignUp ? (
                  <>
                    <UserPlus className="h-5 w-5" />
                    Admin Sign Up
                  </>
                ) : (
                  "Admin Login"
                )}
              </CardTitle>
              <CardDescription>
                {isSignUp
                  ? "Create a new admin account (only @thynkcity.com emails allowed)"
                  : "Enter your admin credentials to access the dashboard"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
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
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="smooth-transition"
                      placeholder={isSignUp ? "Minimum 6 characters" : ""}
                    />
                  </div>
                  {isSignUp && (
                    <div className="grid gap-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="smooth-transition"
                        placeholder="Confirm your password"
                      />
                    </div>
                  )}
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
                        {isSignUp ? "Creating Account..." : "Signing in..."}
                      </>
                    ) : isSignUp ? (
                      "Create Admin Account"
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
                <div className="mt-4 space-y-2 text-center text-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(!isSignUp)
                      setError(null)
                      setSuccess(null)
                      setEmail("")
                      setPassword("")
                      setConfirmPassword("")
                    }}
                    className="text-primary hover:underline"
                  >
                    {isSignUp ? "Already have an account? Sign in" : "Need an admin account? Sign up"}
                  </button>
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
