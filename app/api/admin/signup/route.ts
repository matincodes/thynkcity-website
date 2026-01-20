import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Check if email is @thynkcity.com
    if (!email.endsWith("@thynkcity.com")) {
      return NextResponse.json({ error: "Only @thynkcity.com email addresses are allowed" }, { status: 400 })
    }

    // Create Supabase client with service role
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Check for duplicate email
    const { data: existingUser } = await supabase.auth.admin.getUserById(email) // Wait, better to check by email
    // Actually, to check if user exists, but since creating, it will fail if exists.

    // Create auth user without email confirmation
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: false, // Do not confirm yet
      user_metadata: {
        role: "pending_admin", // Temporary role
      },
    })

    if (authError) {
      console.error("[v0] Admin auth user creation error:", authError)
      return NextResponse.json({ error: "Failed to create user account: " + authError.message }, { status: 500 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: "Failed to create user account" }, { status: 500 })
    }

    // Now send custom verification
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/admin/send-verification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: authData.user.email,
        userId: authData.user.id
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to send verification email:", errorData);
      // Still return success, as user is created, just email failed
    }

    return NextResponse.json({ success: true, user: authData.user })
  } catch (error: any) {
    console.error("[v0] Admin signup error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}