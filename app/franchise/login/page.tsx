"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function FranchiseLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      console.log("[v0] Starting franchise login process for:", formData.email)

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        console.log("[v0] Auth error:", error)
        throw error
      }

      console.log("[v0] Auth successful, user ID:", data.user.id)
      console.log("[v0] User data:", data.user)

      // Check if user is a franchisee
      console.log("[v0] Querying franchisee_profiles for user_id:", data.user.id)

      const { data: profile, error: profileError } = await supabase
        .from("franchisee_profiles")
        .select("*")
        .eq("user_id", data.user.id)
        .single()

      console.log("[v0] Profile query result:", { profile, profileError })

      if (profileError) {
        console.log("[v0] Profile query error:", profileError)
      }

      if (!profile) {
        console.log("[v0] No franchisee profile found for user")
        setMessage("Access denied. This account is not registered as a franchisee.")
        await supabase.auth.signOut()
        return
      }

      console.log("[v0] Franchisee profile found:", profile)
      console.log("[v0] Profile status:", profile.status)

      if (profile.status === "pending") {
        console.log("[v0] Redirecting to pending page")
        router.push("/franchise/pending")
      } else if (profile.status === "active") {
        console.log("[v0] Redirecting to dashboard")
        router.push("/franchise/dashboard")
      } else {
        console.log("[v0] Account deactivated, status:", profile.status)
        setMessage("Your account has been deactivated. Please contact support.")
        await supabase.auth.signOut()
      }
    } catch (error: any) {
      console.log("[v0] Login error:", error)
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">Franchisee Login</CardTitle>
          <CardDescription>Access your franchise portal</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
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

            {message && <div className="p-3 rounded-md text-sm bg-red-50 text-red-700">{message}</div>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-3">Don't have an account?</p>
            <Link href="/franchise/signup">
              <Button variant="outline" className="w-full bg-transparent">
                Apply to Become a Franchisee
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
