import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const data = await request.json()

    // Insert registration data
    const { error } = await supabase.from("registrations").insert({
      registration_type: data.registrationType,
      name: data.name,
      email: data.email,
      phone: data.phone,
      location: data.location,
      interests: data.interests,
      experience: data.experience,
      goals: data.goals,
      children: data.children ? JSON.stringify(data.children) : null,
      status: "pending",
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Registration error:", error)
      return NextResponse.json({ error: "Failed to submit registration" }, { status: 500 })
    }

    return NextResponse.json({ message: "Registration submitted successfully" })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Failed to submit registration" }, { status: 500 })
  }
}
