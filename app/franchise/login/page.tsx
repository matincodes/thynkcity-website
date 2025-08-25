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
import { Eye, EyeOff } from "lucide-react"

export default function FranchiseLoginPage() {
  const [isLogin, setIsLogin] = useState(true)
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error

      // Check if user is a franchisee
      const { data: profile } = await supabase
        .from("franchisee_profiles")
        .select("*")
        .eq("user_id", data.user.id)
        .single()

      if (!profile) {
        setMessage("Access denied. This account is not registered as a franchisee.")
        await supabase.auth.signOut()
        return
      }

      if (profile.status === "pending") {
        router.push("/franchise/pending")
      } else if (profile.status === "active") {
        router.push("/franchise/dashboard")
      } else {
        setMessage("Your account has been deactivated. Please contact support.")
        await supabase.auth.signOut()
      }
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/franchise/dashboard`,
        },
      })

      if (error) throw error

      if (data.user) {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const { data: authUser, error: authError } = await supabase.auth.getUser()

        if (authError || !authUser.user) {
          throw new Error("Failed to create user account. Please try again.")
        }

        // Create franchisee profile
        const { error: profileError } = await supabase.from("franchisee_profiles").insert({
          user_id: data.user.id,
          full_name: formData.fullName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          country: formData.country,
          state_city: formData.stateCity,
          territory: formData.territory,
          statement: formData.statement,
          status: "pending",
        })

        if (profileError) {
          if (profileError.message.includes("foreign key constraint")) {
            throw new Error("Account creation failed. Please try again or contact support.")
          }
          throw profileError
        }

        setMessage("Application submitted successfully! Please wait for admin approval.")
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
      }
    } catch (error: any) {
      console.error("[v0] Franchise signup error:", error)
      setMessage(error.message || "An error occurred during registration. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            {isLogin ? "Franchisee Login" : "Franchisee Application"}
          </CardTitle>
          <CardDescription>
            {isLogin ? "Access your franchise portal" : "Apply to become a Thynkcity franchisee"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4">
            {!isLogin && (
              <>
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
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData({ ...formData, country: value })}
                  >
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
              </>
            )}

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

            {!isLogin && (
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
            )}

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
              {loading ? "Processing..." : isLogin ? "Login" : "Submit Application"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="text-sm">
              {isLogin ? "Apply to become a franchisee" : "Already have an account? Login"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
