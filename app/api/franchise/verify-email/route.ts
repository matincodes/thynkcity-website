import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

    const supabase = await createServerClient()

    // Find the verification record
    const { data: verification, error: fetchError } = await supabase
      .from("franchisee_verifications")
      .select("*")
      .eq("token", token)
      .eq("verified", false)
      .single()

    if (fetchError || !verification) {
      return NextResponse.json({ error: "Invalid or already used verification token" }, { status: 400 })
    }

    // Check if token is expired
    if (new Date() > new Date(verification.expires_at)) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 })
    }

    // Mark verification as completed
    const { error: updateVerificationError } = await supabase
      .from("franchisee_verifications")
      .update({ verified: true, verified_at: new Date().toISOString() })
      .eq("id", verification.id)

    if (updateVerificationError) {
      console.error("Error updating verification:", updateVerificationError)
      return NextResponse.json({ error: "Failed to complete verification" }, { status: 500 })
    }

    // Update franchisee status to active and set verified_at
    const { error: updateFranchiseeError } = await supabase
      .from("franchisee_profiles")
      .update({
        status: "active",
        verified_at: new Date().toISOString(),
      })
      .eq("id", verification.franchisee_id)

    if (updateFranchiseeError) {
      console.error("Error updating franchisee:", updateFranchiseeError)
      return NextResponse.json({ error: "Failed to activate franchise account" }, { status: 500 })
    }

    // Log the verification activity
    await supabase.from("franchise_activity_log").insert({
      franchisee_id: verification.franchisee_id,
      activity_type: "account_verified",
      description: "Franchisee email verified and account activated",
    })

    return NextResponse.json({ message: "Email verified successfully" })
  } catch (error) {
    console.error("Verify email error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
