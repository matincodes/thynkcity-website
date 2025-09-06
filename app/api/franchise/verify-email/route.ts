import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] POST verify-email: Starting verification process")
    const { token } = await request.json()

    if (!token) {
      console.log("[v0] POST verify-email: No token provided")
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

    console.log("[v0] POST verify-email: Token received:", token.substring(0, 10) + "...")

    console.log("[v0] POST verify-email: Searching for franchisee profile")
    const { data: profile, error: fetchError } = await supabase
      .from("franchisee_profiles")
      .select("*")
      .eq("verification_token", token)
      .is("verified_at", null)
      .single()

    if (fetchError) {
      console.error("[v0] POST verify-email: Fetch error:", fetchError)
      return NextResponse.json({ error: "Database error: " + fetchError.message }, { status: 500 })
    }

    if (!profile) {
      console.log("[v0] POST verify-email: No profile found or already verified")
      return NextResponse.json({ error: "Invalid or already used verification token" }, { status: 400 })
    }

    console.log("[v0] POST verify-email: Profile found:", profile.id)

    if (profile.verification_expires_at && new Date() > new Date(profile.verification_expires_at)) {
      console.log("[v0] POST verify-email: Token expired")
      return NextResponse.json({ error: "Token expired" }, { status: 400 })
    }

    console.log("[v0] POST verify-email: Updating profile to verified")
    const { error: updateError } = await supabase
      .from("franchisee_profiles")
      .update({
        status: "active",
        verified_at: new Date().toISOString(),
        verification_token: null, // Clear the token
        verification_expires_at: null,
      })
      .eq("id", profile.id)

    if (updateError) {
      console.error("[v0] POST verify-email: Error updating profile:", updateError)
      return NextResponse.json({ error: "Failed to complete verification: " + updateError.message }, { status: 500 })
    }

    console.log("[v0] POST verify-email: Logging activity")
    await supabase.from("franchise_activity_log").insert({
      franchisee_id: profile.id,
      activity_type: "account_verified",
      description: "Franchisee email verified and account activated",
    })

    console.log("[v0] POST verify-email: Verification completed successfully")
    return NextResponse.json({ message: "Email verified successfully" })
  } catch (error) {
    console.error("[v0] POST verify-email: Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error: " + (error as Error).message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log("[v0] GET verify-email: Starting verification process")
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      console.log("[v0] GET verify-email: No token provided")
      return NextResponse.redirect(new URL("/franchise/verify-email?error=missing-token", request.url))
    }

    console.log("[v0] GET verify-email: Token received:", token.substring(0, 10) + "...")

    console.log("[v0] GET verify-email: Searching for franchisee profile")
    const { data: profile, error: fetchError } = await supabase
      .from("franchisee_profiles")
      .select("*")
      .eq("verification_token", token)
      .is("verified_at", null)
      .single()

    if (fetchError) {
      console.error("[v0] GET verify-email: Fetch error:", fetchError)
      return NextResponse.redirect(new URL("/franchise/verify-email?error=database-error", request.url))
    }

    if (!profile) {
      console.log("[v0] GET verify-email: No profile found or already verified")
      return NextResponse.redirect(new URL("/franchise/verify-email?error=invalid-token", request.url))
    }

    console.log("[v0] GET verify-email: Profile found:", profile.id)

    if (profile.verification_expires_at && new Date() > new Date(profile.verification_expires_at)) {
      console.log("[v0] GET verify-email: Token expired")
      return NextResponse.redirect(new URL("/franchise/verify-email?error=expired-token", request.url))
    }

    console.log("[v0] GET verify-email: Updating profile to verified")
    const { error: updateError } = await supabase
      .from("franchisee_profiles")
      .update({
        status: "active",
        verified_at: new Date().toISOString(),
        verification_token: null, // Clear the token
        verification_expires_at: null,
      })
      .eq("id", profile.id)

    if (updateError) {
      console.error("[v0] GET verify-email: Error updating profile:", updateError)
      return NextResponse.redirect(new URL("/franchise/verify-email?error=verification-failed", request.url))
    }

    console.log("[v0] GET verify-email: Logging activity")
    await supabase.from("franchise_activity_log").insert({
      franchisee_id: profile.id,
      activity_type: "account_verified",
      description: "Franchisee email verified and account activated",
    })

    console.log("[v0] GET verify-email: Verification completed successfully")
    return NextResponse.redirect(new URL("/franchise/verify-email?success=true", request.url))
  } catch (error) {
    console.error("[v0] GET verify-email: Unexpected error:", error)
    return NextResponse.redirect(new URL("/franchise/verify-email?error=server-error", request.url))
  }
}
