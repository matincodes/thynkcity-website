"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function FranchiseSignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    country: "",
    stateCity: "",
    territory: "",
    statement: "",
  })

  const createProfile = async (userData: any) => {
    console.log("[v0] Creating franchisee profile via API")

    const response = await fetch("/api/franchise/create-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userData.id,
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        country: formData.country,
        stateCity: formData.stateCity,
        territory: formData.territory,
        statement: formData.statement,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] Profile creation error:", errorData.error)
      throw new Error(`Profile creation failed: ${errorData.error}`)
    }

    const result = await response.json()
    console.log("[v0] Franchisee profile created successfully via API")

    return { success: true }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      console.log("[v0] Starting franchise signup process")

      const { data: existingProfile } = await supabase
        .from("franchisee_profiles")
        .select("id")
        .eq("email", formData.email)
        .single()

      if (existingProfile) {
        throw new Error(
          "A franchisee application with this email already exists. Please use a different email or contact support.",
        )
      }

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/franchise/dashboard`,
        },
      })

      console.log("[v0] Signup response:", { data, error })

      if (error) {
        console.error("[v0] Supabase auth signup error:", error)
        if (error.message.includes("User already registered")) {
          throw new Error("An account with this email already exists. Please try logging in instead.")
        } else if (error.message.includes("Password should be at least")) {
          throw new Error("Password must be at least 6 characters long.")
        } else if (error.message.includes("Invalid email")) {
          throw new Error("Please enter a valid email address.")
        } else {
          throw new Error(`Account creation failed: ${error.message}`)
        }
      }

      if (!data.user) {
        console.error("[v0] No user returned from signup")
        throw new Error("Account creation failed - no user data returned. Please try again.")
      }

      console.log("[v0] User created successfully:", data.user.id)

      await createProfile(data.user)

      setMessage(
        "Application submitted successfully! Please check your email for a verification link to activate your account once approved by our team.",
      )
      setFormData({
        email: "",
        password: "",
        fullName: "",
        phoneNumber: "",
        country: "",
        stateCity: "",
        territory: "",
        statement: "",
      })
    } catch (error: any) {
      console.error("[v0] Franchise signup error:", error)
      if (error.status === 409 || error.message.includes("already exists")) {
        setMessage("An account with this email already exists. Please try logging in instead.")
      } else if (error.message.includes("Password")) {
        setMessage(error.message)
      } else if (error.message.includes("email")) {
        setMessage(error.message)
      } else {
        setMessage(error.message || "An error occurred during registration. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-2">
            <Link href="/franchise/login">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Button>
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Franchisee Application</CardTitle>
          <CardDescription>Apply to become a Thynkcity franchisee</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="country">Country *</Label>
              <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nigeria">Nigeria</SelectItem>
                  <SelectItem value="ghana">Ghana</SelectItem>
                  <SelectItem value="kenya">Kenya</SelectItem>
                  <SelectItem value="south-africa">South Africa</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="stateCity">State / City *</Label>
              <Input
                id="stateCity"
                type="text"
                required
                value={formData.stateCity}
                onChange={(e) => setFormData({ ...formData, stateCity: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="territory">Proposed Operational Territory *</Label>
              <Input
                id="territory"
                type="text"
                required
                placeholder="e.g., Ikeja, Lagos"
                value={formData.territory}
                onChange={(e) => setFormData({ ...formData, territory: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="statement">Brief Statement of Intent / Business Experience *</Label>
              <Textarea
                id="statement"
                required
                placeholder="Explain why you want to be a Thynkcity franchisee and any relevant experience..."
                value={formData.statement}
                onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                rows={4}
              />
            </div>

            {message && (
              <div
                className={`p-3 rounded-md text-sm ${
                  message.includes("success") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
