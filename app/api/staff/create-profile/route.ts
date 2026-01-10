import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, fullName, email, phoneNumber, specialization, bio } = body

    // Validate required fields
    if (!userId || !fullName || !email || !phoneNumber || !specialization) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create Supabase client with service role
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Check for duplicate email
    const { data: existing } = await supabase.from("staff_profiles").select("id").eq("email", email).single()

    if (existing) {
      return NextResponse.json({ error: "A staff profile with this email already exists" }, { status: 409 })
    }

    // Create staff profile
    const { data: profile, error: profileError } = await supabase
      .from("staff_profiles")
      .insert({
        user_id: userId,
        full_name: fullName,
        email,
        phone_number: phoneNumber,
        specialization,
        bio: bio || null,
        approved: false,
      })
      .select()
      .single()

    if (profileError) {
      console.error("[v0] Profile creation error:", profileError)
      return NextResponse.json({ error: "Failed to create staff profile: " + profileError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, profile })
  } catch (error: any) {
    console.error("[v0] Staff profile creation error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
