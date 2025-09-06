import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Starting franchise profile creation")

    const { userId, fullName, phoneNumber, country, stateCity, proposedTerritory, businessExperience, email } =
      await request.json()

    const { data: existingProfile } = await supabase
      .from("franchisee_profiles")
      .select("id")
      .eq("email", email)
      .single()

    if (existingProfile) {
      console.log("[v0] Duplicate email found:", email)
      return NextResponse.json({ error: "Email already registered as franchisee" }, { status: 400 })
    }

    const verificationToken = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    console.log("[v0] Creating franchisee profile with verification token")

    const { data: profile, error: profileError } = await supabase
      .from("franchisee_profiles")
      .insert({
        user_id: userId,
        full_name: fullName,
        phone_number: phoneNumber,
        email: email,
        country,
        state_city: stateCity,
        proposed_territory: proposedTerritory,
        business_experience: businessExperience,
        status: "pending",
        verification_token: verificationToken,
        verification_expires_at: expiresAt.toISOString(),
      })
      .select()
      .single()

    if (profileError) {
      console.error("[v0] Error creating franchise profile:", profileError)
      return NextResponse.json({ error: "Database error: " + profileError.message }, { status: 500 })
    }

    console.log("[v0] Profile created successfully, sending verification email")

    const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/franchise/verify-email?token=${verificationToken}`

    try {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: "ThynkCity <noreply@thynkcity.com>",
        to: [email],
        subject: "Welcome to ThynkCity Franchise Program - Verify Your Account",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1a365d; margin-bottom: 10px;">Welcome to ThynkCity!</h1>
              <p style="color: #4a5568; font-size: 18px;">Thank you for your Application to Partner with ThynkCity</p>
            </div>
            
            <div style="background-color: #f7fafc; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
              <h2 style="color: #2d3748; margin-bottom: 15px;">Verify Your Account</h2>
              <p style="color: #4a5568; margin-bottom: 20px;">
                We're excited to have you join our franchise network! Please verify your email address to activate your account and access your franchise dashboard.
              </p>
              <div style="text-align: center; margin: 25px 0;">
                <a href="${verificationUrl}" style="background-color: #3182ce; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  Verify Email Address
                </a>
              </div>
              <p style="color: #718096; font-size: 14px;">
                This verification link will expire in 24 hours. If you didn't request this, please ignore this email.
              </p>
            </div>

            <div style="border-left: 4px solid #3182ce; padding-left: 20px; margin-bottom: 25px;">
              <h3 style="color: #2d3748; margin-bottom: 10px;">What's Next?</h3>
              <p style="color: #4a5568; margin-bottom: 10px;">Once verified, you'll have access to:</p>
              <ul style="color: #4a5568; margin-left: 20px;">
                <li>School CRM and lead management system</li>
                <li>Professional proposal and contract generators</li>
                <li>Marketing materials and branding resources</li>
                <li>Training modules and support documentation</li>
                <li>Direct communication with our support team</li>
              </ul>
            </div>

            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #718096; font-size: 14px;">
                Need help? Contact us at <a href="mailto:franchise@thynkcity.com" style="color: #3182ce;">franchise@thynkcity.com</a>
              </p>
              <p style="color: #718096; font-size: 12px; margin-top: 10px;">
                © 2024 ThynkCity. All rights reserved.
              </p>
            </div>
          </div>
        `,
      })

      if (emailError) {
        console.error("[v0] Error sending verification email:", emailError)
        // Don't fail the request if email fails, just log it
      } else {
        console.log("[v0] Verification email sent successfully:", emailData?.id)
      }
    } catch (emailError) {
      console.error("[v0] Unexpected error sending email:", emailError)
    }

    console.log("[v0] Profile creation completed successfully")
    return NextResponse.json({
      message: "Profile created successfully",
      profileId: profile.id,
      verificationEmailSent: true,
    })
  } catch (error) {
    console.error("[v0] Unexpected error in profile creation:", error)
    return NextResponse.json({ error: "Internal server error: " + (error as Error).message }, { status: 500 })
  }
}
