import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get("token")

    console.log("GET verify-email request with token:", token)

    if (!token) {
      return NextResponse.redirect(new URL("/admin/verify-email?error=no-token", request.url))
    }

    const supabase = await createServiceRoleClient()

    // Find verification record
    const { data: verification, error: verificationError } = await supabase
      .from("admin_verifications")
      .select("*")
      .eq("token", token)
      .single()

    console.log("Verification record found:", verification)
    console.log("Verification error:", verificationError)

    if (verificationError || !verification) {
      return NextResponse.redirect(new URL("/admin/verify-email?error=invalid-token", request.url))
    }

    // Check if token has expired
    if (new Date(verification.expires_at) < new Date()) {
      return NextResponse.redirect(new URL("/admin/verify-email?error=expired", request.url))
    }

    console.log("Checking if user exists:", verification.user_id)
    const { data: existingUser, error: getUserError } = await supabase.auth.admin.getUserById(verification.user_id)

    console.log("User lookup result:", existingUser)
    console.log("User lookup error:", getUserError)

    if (getUserError || !existingUser.user) {
      console.error("User not found in auth system:", verification.user_id)
      // Delete the orphaned verification record
      await supabase.from("admin_verifications").delete().eq("token", token)
      return NextResponse.redirect(new URL("/admin/verify-email?error=user-not-found", request.url))
    }

    // Update user metadata to mark as verified admin
    console.log("Updating user metadata for:", verification.user_id)
    const { error: updateError } = await supabase.auth.admin.updateUserById(verification.user_id, {
      email_confirm: true,
      user_metadata: {
        role: "admin",
        email_verified: true,
        verified_at: new Date().toISOString(),
      },
    })

    console.log("User update error:", updateError)

    if (updateError) {
      console.error("Failed to update user:", updateError)
      return NextResponse.redirect(new URL("/admin/verify-email?error=update-failed", request.url))
    }

    // Update the profiles table to set role to admin
    const { error: profileUpdateError } = await supabase
      .from("profiles")
      .update({ role: "admin" })
      .eq("id", verification.user_id)

    if (profileUpdateError) {
      console.error("Failed to update profile role:", profileUpdateError)
      return NextResponse.redirect(new URL("/admin/verify-email?error=profile-update-failed", request.url))
    }

    // Delete verification record
    await supabase.from("admin_verifications").delete().eq("token", token)

    console.log("Verification successful, redirecting to success page")

    return NextResponse.redirect(new URL("/admin/verify-email?success=true", request.url))
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.redirect(new URL("/admin/verify-email?error=server-error", request.url))
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("POST verify-email request received")

    const body = await request.json()
    console.log("Request body:", body)

    const { token } = body

    if (!token) {
      console.log("No token provided")
      return NextResponse.json({ error: "Verification token is required" }, { status: 400 })
    }

    console.log("Creating service role client")
    const supabase = await createServiceRoleClient()

    // Find verification record
    console.log("Querying admin_verifications for token:", token)
    const { data: verification, error: verificationError } = await supabase
      .from("admin_verifications")
      .select("*")
      .eq("token", token)
      .single()

    console.log("Verification record:", verification)
    console.log("Verification error:", verificationError)

    if (verificationError || !verification) {
      console.log("Invalid verification token")
      return NextResponse.json({ error: "Invalid verification token" }, { status: 400 })
    }

    // Check if token has expired
    const expiresAt = new Date(verification.expires_at)
    const now = new Date()
    console.log("Token expires at:", expiresAt, "Current time:", now)

    if (expiresAt < now) {
      console.log("Token has expired")
      return NextResponse.json({ error: "Verification token has expired" }, { status: 400 })
    }

    console.log("Checking if user exists:", verification.user_id)
    const { data: existingUser, error: getUserError } = await supabase.auth.admin.getUserById(verification.user_id)

    console.log("User lookup result:", existingUser)
    console.log("User lookup error:", getUserError)

    if (getUserError || !existingUser.user) {
      console.error("[v0] User not found in auth system:", verification.user_id)
      // Delete the orphaned verification record
      await supabase.from("admin_verifications").delete().eq("token", token)
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user metadata to mark as verified admin
    console.log("Updating user metadata for user:", verification.user_id)
    const { data: updatedUser, error: updateError } = await supabase.auth.admin.updateUserById(verification.user_id, 
      {
        email_confirm: true,
        user_metadata: {
          role: "admin",
          email_verified: true,
          verified_at: new Date().toISOString(),
        },
    })

    console.log("User update result:", updatedUser)
    console.log("User update error:", updateError)

    if (updateError) {
      console.error("Failed to update user metadata:", updateError)
      return NextResponse.json({ error: "Failed to verify email", details: updateError.message }, { status: 500 })
    }

    console.log("Syncing admin role to profiles table")
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', verification.user_id)

    if (profileError) {
      console.error("Failed to update profile role:", profileError)
    }

    // Delete verification record
    console.log("Deleting verification record")
    const { error: deleteError } = await supabase.from("admin_verifications").delete().eq("token", token)

    if (deleteError) {
      console.error("Failed to delete verification record:", deleteError)
    }

    console.log("Email verification completed successfully")
    return NextResponse.json({ message: "Email verified successfully" })
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
