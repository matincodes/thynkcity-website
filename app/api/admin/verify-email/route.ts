import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get("token")

    console.log("[v0] GET verify-email request with token:", token)

    if (!token) {
      return NextResponse.redirect(new URL("/admin/verify-email?error=no-token", request.url))
    }

    const supabase = createServiceRoleClient()

    // Find verification record
    const { data: verification, error: verificationError } = await supabase
      .from("admin_verifications")
      .select("*")
      .eq("token", token)
      .single()

    console.log("[v0] Verification record found:", verification)
    console.log("[v0] Verification error:", verificationError)

    if (verificationError || !verification) {
      return NextResponse.redirect(new URL("/admin/verify-email?error=invalid-token", request.url))
    }

    // Check if token has expired
    if (new Date(verification.expires_at) < new Date()) {
      return NextResponse.redirect(new URL("/admin/verify-email?error=expired", request.url))
    }

    // Update user metadata to mark as verified admin
    const { error: updateError } = await supabase.auth.admin.updateUserById(verification.user_id, {
      user_metadata: {
        role: "admin",
        email_verified: true,
        verified_at: new Date().toISOString(),
      },
    })

    console.log("[v0] User update error:", updateError)

    if (updateError) {
      console.error("Failed to update user:", updateError)
      return NextResponse.redirect(new URL("/admin/verify-email?error=update-failed", request.url))
    }

    // Delete verification record
    await supabase.from("admin_verifications").delete().eq("token", token)

    console.log("[v0] Verification successful, redirecting to login")

    return NextResponse.redirect(new URL("/admin/verify-email?success=true", request.url))
  } catch (error) {
    console.error("[v0] Email verification error:", error)
    return NextResponse.redirect(new URL("/admin/verify-email?error=server-error", request.url))
  }
}

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Verification token is required" }, { status: 400 })
    }

    const supabase = createServiceRoleClient()

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
