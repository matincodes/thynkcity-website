import { type NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] POST verify-email: Starting verification process")
    const { token } = await request.json()

    if (!token) {
      console.log("[v0] POST verify-email: No token provided")
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

    console.log("[v0] POST verify-email: Token received:", token.substring(0, 10) + "...")

    const supabase = createServiceRoleClient()
    console.log("[v0] POST verify-email: Service role client created successfully")

    // Find the verification record
    console.log("[v0] POST verify-email: Searching for verification record")
    const { data: verification, error: fetchError } = await supabase
      .from("franchisee_verifications")
      .select("*")
      .eq("token", token)
      .eq("verified", false)
      .single()

    if (fetchError) {
      console.error("[v0] POST verify-email: Fetch error:", fetchError)
      return NextResponse.json({ error: "Database error: " + fetchError.message }, { status: 500 })
    }

    if (!verification) {
      console.log("[v0] POST verify-email: No verification record found")
      return NextResponse.json({ error: "Invalid or already used verification token" }, { status: 400 })
    }

    console.log("[v0] POST verify-email: Verification record found:", verification.id)

    // Check if token is expired
    if (new Date() > new Date(verification.expires_at)) {
      console.log("[v0] POST verify-email: Token expired")
      return NextResponse.json({ error: "Token expired" }, { status: 400 })
    }

    // Mark verification as completed
    console.log("[v0] POST verify-email: Updating verification record")
    const { error: updateVerificationError } = await supabase
      .from("franchisee_verifications")
      .update({ verified: true, verified_at: new Date().toISOString() })
      .eq("id", verification.id)

    if (updateVerificationError) {
      console.error("[v0] POST verify-email: Error updating verification:", updateVerificationError)
      return NextResponse.json(
        { error: "Failed to complete verification: " + updateVerificationError.message },
        { status: 500 },
      )
    }

    // Update franchisee status to active and set verified_at
    console.log("[v0] POST verify-email: Updating franchisee profile")
    const { error: updateFranchiseeError } = await supabase
      .from("franchisee_profiles")
      .update({
        status: "active",
        verified_at: new Date().toISOString(),
      })
      .eq("id", verification.franchisee_id)

    if (updateFranchiseeError) {
      console.error("[v0] POST verify-email: Error updating franchisee:", updateFranchiseeError)
      return NextResponse.json(
        { error: "Failed to activate franchise account: " + updateFranchiseeError.message },
        { status: 500 },
      )
    }

    // Log the verification activity
    console.log("[v0] POST verify-email: Logging activity")
    await supabase.from("franchise_activity_log").insert({
      franchisee_id: verification.franchisee_id,
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

    const supabase = createServiceRoleClient()
    console.log("[v0] GET verify-email: Service role client created successfully")

    // Find the verification record
    console.log("[v0] GET verify-email: Searching for verification record")
    const { data: verification, error: fetchError } = await supabase
      .from("franchisee_verifications")
      .select("*")
      .eq("token", token)
      .eq("verified", false)
      .single()

    if (fetchError) {
      console.error("[v0] GET verify-email: Fetch error:", fetchError)
      return NextResponse.redirect(new URL("/franchise/verify-email?error=database-error", request.url))
    }

    if (!verification) {
      console.log("[v0] GET verify-email: No verification record found")
      return NextResponse.redirect(new URL("/franchise/verify-email?error=invalid-token", request.url))
    }

    console.log("[v0] GET verify-email: Verification record found:", verification.id)

    // Check if token is expired
    if (new Date() > new Date(verification.expires_at)) {
      console.log("[v0] GET verify-email: Token expired")
      return NextResponse.redirect(new URL("/franchise/verify-email?error=expired-token", request.url))
    }

    // Mark verification as completed
    console.log("[v0] GET verify-email: Updating verification record")
    const { error: updateVerificationError } = await supabase
      .from("franchisee_verifications")
      .update({ verified: true, verified_at: new Date().toISOString() })
      .eq("id", verification.id)

    if (updateVerificationError) {
      console.error("[v0] GET verify-email: Error updating verification:", updateVerificationError)
      return NextResponse.redirect(new URL("/franchise/verify-email?error=verification-failed", request.url))
    }

    // Update franchisee status to active and set verified_at
    console.log("[v0] GET verify-email: Updating franchisee profile")
    const { error: updateFranchiseeError } = await supabase
      .from("franchisee_profiles")
      .update({
        status: "active",
        verified_at: new Date().toISOString(),
      })
      .eq("id", verification.franchisee_id)

    if (updateFranchiseeError) {
      console.error("[v0] GET verify-email: Error updating franchisee:", updateFranchiseeError)
      return NextResponse.redirect(new URL("/franchise/verify-email?error=activation-failed", request.url))
    }

    // Log the verification activity
    console.log("[v0] GET verify-email: Logging activity")
    await supabase.from("franchise_activity_log").insert({
      franchisee_id: verification.franchisee_id,
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
