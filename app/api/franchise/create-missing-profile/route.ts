import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Creating missing profile for existing user")

    // Create service role client to bypass RLS
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Create profile for the existing user
    const existingUserId = "c9c3147c-1255-458a-a8b1-96091e1613e4"
    const email = "abdulmatinadeniji@gmail.com"

    const profileData = {
      user_id: existingUserId,
      email: email,
      full_name: "Abdulmatin Adeniji",
      phone_number: "09025320287",
      country: "Nigeria",
      state_city: "Lagos",
      territory: "Lagos",
      statement: "NIL",
      status: "pending",
      verification_token: null,
      verification_expires_at: null,
      verified_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    console.log("[v0] Creating profile with data:", profileData)

    const { data: profile, error: profileError } = await supabase
      .from("franchisee_profiles")
      .insert(profileData)
      .select()
      .single()

    if (profileError) {
      console.error("[v0] Profile creation error:", profileError)
      return NextResponse.json({ error: "Failed to create profile", details: profileError }, { status: 500 })
    }

    console.log("[v0] Profile created successfully:", profile.id)

    // Log activity
    await supabase.from("franchise_activity_log").insert({
      franchisee_id: profile.id,
      activity_type: "profile_created",
      description: "Franchisee profile created for existing user",
      created_at: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      profile: profile,
      message: "Profile created successfully for existing user",
    })
  } catch (error) {
    console.error("[v0] Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error", details: error }, { status: 500 })
  }
}
