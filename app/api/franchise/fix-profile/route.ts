import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Starting manual profile creation fix")

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Create service role client to bypass RLS
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    console.log("[v0] Looking up user by email:", email)

    // Get user from auth.users by email
    const {
      data: { users },
      error: userError,
    } = await supabase.auth.admin.listUsers()

    if (userError) {
      console.error("[v0] Error fetching users:", userError)
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
    }

    const user = users.find((u) => u.email === email)

    if (!user) {
      console.log("[v0] User not found in auth.users")
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    console.log("[v0] Found user:", user.id)

    // Check if profile already exists
    const { data: existingProfile } = await supabase
      .from("franchisee_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single()

    if (existingProfile) {
      console.log("[v0] Profile already exists")
      return NextResponse.json({
        message: "Profile already exists",
        profile: existingProfile,
      })
    }

    // Create the missing profile
    const profileData = {
      user_id: user.id,
      email: user.email,
      full_name: "Abdulmatin Adeniji", // Default name, can be updated later
      phone_number: "09025320287",
      country: "Nigeria",
      state_city: "Lagos",
      territory: "Lagos",
      statement: "Profile created via manual fix",
      status: "verified", // Set to verified since email is already confirmed
      verification_token: null,
      verification_expires_at: null,
      verified_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    console.log("[v0] Creating profile with data:", profileData)

    const { data: newProfile, error: profileError } = await supabase
      .from("franchisee_profiles")
      .insert(profileData)
      .select()
      .single()

    if (profileError) {
      console.error("[v0] Error creating profile:", profileError)
      return NextResponse.json(
        {
          error: "Failed to create profile",
          details: profileError,
        },
        { status: 500 },
      )
    }

    console.log("[v0] Profile created successfully:", newProfile)

    return NextResponse.json({
      message: "Profile created successfully",
      profile: newProfile,
    })
  } catch (error) {
    console.error("[v0] Manual profile creation error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
