import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Starting franchise profile creation API")

    const body = await request.json()
    console.log("[v0] Request body received:", { ...body, password: "[REDACTED]" })

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Check for duplicate email first
    console.log("[v0] Checking for duplicate email:", body.email)
    const { data: existingProfile, error: checkError } = await supabase
      .from("franchisee_profiles")
      .select("id")
      .eq("email", body.email)
      .single()

    if (existingProfile) {
      console.log("[v0] Duplicate email found")
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 })
    }

    // Create franchisee profile
    console.log("[v0] Creating franchisee profile for user:", body.user_id)
    const { data: profile, error: profileError } = await supabase
      .from("franchisee_profiles")
      .insert({
        user_id: body.user_id,
        full_name: body.full_name,
        email: body.email,
        phone_number: body.phone_number,
        country: body.country,
        state_city: body.state_city,
        proposed_territory: body.proposed_territory,
        business_experience: body.business_experience,
        status: "pending",
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (profileError) {
      console.error("[v0] Profile creation error:", profileError)
      return NextResponse.json({ error: `Database error: ${profileError.message}` }, { status: 500 })
    }

    console.log("[v0] Profile created successfully:", profile.id)

    // Send verification email
    try {
      console.log("[v0] Sending verification email to:", body.email)

      // Create verification token
      const verificationToken = crypto.randomUUID()
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

      // Store verification token
      const { error: tokenError } = await supabase.from("franchisee_verifications").insert({
        franchisee_id: profile.id,
        token: verificationToken,
        expires_at: expiresAt.toISOString(),
        created_at: new Date().toISOString(),
      })

      if (tokenError) {
        console.error("[v0] Token storage error:", tokenError)
      } else {
        // Send email with Resend
        const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/franchise/verify-email?token=${verificationToken}`

        const { data: emailData, error: emailError } = await resend.emails.send({
          from: "ThynkCity <noreply@thynkcity.com>",
          to: [body.email],
          subject: "Welcome to ThynkCity Franchise Program - Verify Your Account",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #B8860B; margin: 0;">ThynkCity</h1>
                <p style="color: #666; margin: 5px 0;">African EdTech & FinTech Excellence</p>
              </div>
              
              <h2 style="color: #333;">Thank you for your Application to Partner with ThynkCity!</h2>
              
              <p>Dear ${body.full_name},</p>
              
              <p>We're excited to receive your franchise application! To complete your registration, please verify your email address by clicking the button below:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationUrl}" style="background-color: #B8860B; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email Address</a>
              </div>
              
              <p>Once verified, our team will review your application and contact you within 2-3 business days.</p>
              
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Email verification (this step)</li>
                <li>Application review by our franchise team</li>
                <li>Initial consultation call</li>
                <li>Territory assignment and onboarding</li>
              </ul>
              
              <p>If you have any questions, please contact us at <a href="mailto:franchise@thynkcity.com">franchise@thynkcity.com</a></p>
              
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
                <p>This verification link expires in 24 hours.</p>
                <p>© 2024 ThynkCity. All rights reserved.</p>
              </div>
            </div>
          `,
        })

        if (emailError) {
          console.error("[v0] Email sending error:", emailError)
        } else {
          console.log("[v0] Verification email sent successfully:", emailData?.id)
        }
      }
    } catch (emailError) {
      console.error("[v0] Email process error:", emailError)
    }

    return NextResponse.json({
      success: true,
      profile_id: profile.id,
      message: "Profile created successfully. Please check your email for verification instructions.",
    })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
