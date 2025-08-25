import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Verification token is required" }, { status: 400 })
    }

    const supabase = await createServerClient()

    // Find verification record
    const { data: verification, error: verificationError } = await supabase
      .from("admin_verifications")
      .select("*")
      .eq("token", token)
      .single()

    if (verificationError || !verification) {
      return NextResponse.json({ error: "Invalid verification token" }, { status: 400 })
    }

    // Check if token has expired
    if (new Date(verification.expires_at) < new Date()) {
      return NextResponse.json({ error: "Verification token has expired" }, { status: 400 })
    }

    // Update user profile to admin role
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ role: "admin" })
      .eq("id", verification.user_id)

    if (profileError) {
      console.error("Profile update error:", profileError)
      return NextResponse.json({ error: "Failed to update user role" }, { status: 500 })
    }

    // Delete verification record
    await supabase.from("admin_verifications").delete().eq("token", token)

    return NextResponse.json({ message: "Email verified successfully" })
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
