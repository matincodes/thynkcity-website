import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Starting franchise profile creation")

    const body = await request.json()
    const { userId, email, fullName, phoneNumber, country, stateCity, proposedOperationalTerritory, statement } = body

    console.log("[v0] Received profile data:", {
      userId,
      email,
      fullName,
      country,
      stateCity,
      proposedOperationalTerritory,
    })

    if (!userId || !email || !fullName) {
      return NextResponse.json(
        {
          error: "Missing required fields: userId, email, fullName",
        },
        { status: 400 },
      )
    }

    // Create service role client to bypass RLS
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Check for duplicate email
    console.log("[v0] Checking for duplicate email")
    const { data: existingProfile } = await supabase
      .from("franchisee_profiles")
      .select("email")
      .eq("email", email)
      .single()

    if (existingProfile) {
      console.log("[v0] Duplicate email found")
      return NextResponse.json(
        {
          error: "An account with this email already exists",
        },
        { status: 409 },
      )
    }

    // Generate verification token
    const verificationToken = Math.random().toString(36).substring(2) + Date.now().toString(36)
    const verificationExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Create franchisee profile
    const profileData = {
      user_id: userId,
      email: email,
      full_name: fullName,
      phone_number: phoneNumber || "",
      country: country || "",
      state_city: stateCity || "",
      territory: proposedOperationalTerritory || "", // Map proposedOperationalTerritory to territory
      statement: statement || "",
      status: "pending", // Set initial status to pending for admin approval
      verification_token: verificationToken,
      verification_expires_at: verificationExpiresAt.toISOString(),
      verified_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    console.log("[v0] Creating franchisee profile with data:", profileData)

    const { data: profile, error: profileError } = await supabase
      .from("franchisee_profiles")
      .insert(profileData)
      .select()
      .single()

    if (profileError) {
      console.error("[v0] Database error creating profile:", profileError)
      return NextResponse.json(
        {
          error: "Database error: " + profileError.message,
        },
        { status: 500 },
      )
    }

    console.log("[v0] Profile created successfully:", profile.id)

    // Send verification email
    try {
      console.log("[v0] Sending verification email to:", email)

      const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/franchise/verify-email?token=${verificationToken}`

      const { data: emailData, error: emailError } = await resend.emails.send({
        from: "ThynkCity Franchise <franchise@thynkcity.com>",
        to: [email],
        subject: "Welcome to ThynkCity Franchise Program - Verify Your Email",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to ThynkCity Franchise</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #B8860B; margin-bottom: 10px;">Welcome to ThynkCity Franchise</h1>
                <p style="color: #666; font-size: 16px;">Thank you for your Application to Partner with ThynkCity</p>
              </div>
              
              <div style="background: #f9f9f9; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
                <h2 style="color: #333; margin-top: 0;">Dear ${fullName},</h2>
                <p>We're excited to welcome you to the ThynkCity franchise family! Your application has been received and is currently under review.</p>
                
                <p><strong>Next Steps:</strong></p>
                <ol>
                  <li><strong>Verify your email</strong> by clicking the button below</li>
                  <li><strong>Admin review</strong> - Our team will review your application</li>
                  <li><strong>Account activation</strong> - Once approved, you'll gain access to your franchise dashboard</li>
                </ol>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationUrl}" style="background: #B8860B; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Verify Email Address</a>
              </div>
              
              <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #333; margin-top: 0;">What's Next?</h3>
                <p>Once your email is verified and your application is approved, you'll have access to:</p>
                <ul>
                  <li>🏫 <strong>School CRM</strong> - Manage leads and track your sales pipeline</li>
                  <li>📄 <strong>Proposal Generator</strong> - Create professional proposals for schools</li>
                  <li>📊 <strong>Performance Dashboard</strong> - Track your franchise metrics</li>
                  <li>💰 <strong>Revenue Tracking</strong> - Monitor your earnings and commissions</li>
                  <li>📞 <strong>Support System</strong> - Direct access to franchise support</li>
                </ul>
              </div>
              
              <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #666; font-size: 14px;">
                <p>If you have any questions, please contact us at <a href="mailto:franchise@thynkcity.com" style="color: #B8860B;">franchise@thynkcity.com</a></p>
                <p>This verification link expires in 24 hours.</p>
                <p style="margin-top: 20px;">
                  <strong>ThynkCity Franchise Team</strong><br>
                  Building Africa's Educational Future
                </p>
              </div>
            </body>
          </html>
        `,
      })

      if (emailError) {
        console.error("[v0] Email sending error:", emailError)
        // Don't fail the entire request if email fails
      } else {
        console.log("[v0] Verification email sent successfully:", emailData?.id)
      }
    } catch (emailError) {
      console.error("[v0] Email sending exception:", emailError)
      // Continue even if email fails
    }

    // Log activity
    try {
      await supabase.from("franchise_activity_log").insert({
        franchisee_id: profile.id,
        activity_type: "registration",
        description: `New franchise application submitted by ${fullName}`,
        created_at: new Date().toISOString(),
      })
    } catch (logError) {
      console.error("[v0] Activity logging error:", logError)
      // Continue even if logging fails
    }

    console.log("[v0] Profile creation completed successfully")

    return NextResponse.json({
      message: "Profile created successfully",
      profileId: profile.id,
      status: "pending",
    })
  } catch (error) {
    console.error("[v0] Profile creation error:", error)
    return NextResponse.json(
      {
        error: "Internal server error: " + (error instanceof Error ? error.message : "Unknown error"),
      },
      { status: 500 },
    )
  }
}
