import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { sendVerificationEmail } from "@/lib/send-verification"

export async function POST(request: NextRequest) {
  try {
    console.log("=== HIT ADMIN SIGNUP ROUTE ===")

    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    if (!email.endsWith("@thynkcity.com")) {
      return NextResponse.json({ error: "Only @thynkcity.com emails allowed" }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    // 1. Create User (Blocked until verified)
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: false, // Don't send Supabase's default email
      user_metadata: { role: "pending_admin" },
    })

    if (authError) {
      // Handle "User already exists"
      if (authError.status === 422 || authError.message.includes("already registered")) {
         return NextResponse.json({ error: "User already exists" }, { status: 409 })
      }
      return NextResponse.json({ error: authError.message }, { status: 500 })
    }

    if (!authData.user) {
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    // 2. Call your helper function directly
    // This runs on the server, so it's fast and secure.
    try {
        console.log("=== HIT ADMIN SIGNUP ROUTE ===")

        await sendVerificationEmail(authData.user.email!, authData.user.id)
    } catch (emailErr) {
        console.error("User created, but email helper failed:", emailErr)
        // Return 200 but with a warning, or 500 depending on your preference
        return NextResponse.json({ 
            success: true, 
            user: authData.user,
            warning: "Account created but email failed to send. Contact support."
        })
    }

    return NextResponse.json({ success: true, user: authData.user })

  } catch (error: any) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}