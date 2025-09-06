import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Starting franchise profile creation")

    const { userId, fullName, email, phoneNumber, country, stateCity, territory, statement } = await request.json()

    if (!userId || !fullName || !email || !phoneNumber || !country || !stateCity || !territory || !statement) {
      console.log("[v0] Missing required fields")
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    console.log("[v0] Checking for duplicate email")

    // Check for duplicate email
    const { data: existingProfile } = await supabase
      .from("franchisee_profiles")
      .select("id")
      .eq("email", email)
      .single()

    if (existingProfile) {
      console.log("[v0] Duplicate email found")
      return NextResponse.json({ error: "A franchisee application with this email already exists" }, { status: 409 })
    }

    console.log("[v0] Creating franchisee profile")

    // Create franchisee profile
    const { data: profile, error: profileError } = await supabase
      .from("franchisee_profiles")
      .insert({
        user_id: userId,
        full_name: fullName,
        email: email,
        phone_number: phoneNumber,
        country: country,
        state_city: stateCity,
        territory: territory,
        statement: statement,
        status: "pending",
      })
      .select()
      .single()

    if (profileError) {
      console.error("[v0] Profile creation error:", profileError)
      return NextResponse.json({ error: "Database error: " + profileError.message }, { status: 500 })
    }

    console.log("[v0] Profile created successfully:", profile.id)

    // Generate verification token
    const verificationToken = crypto.randomUUID()
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24) // 24 hours expiry

    console.log("[v0] Creating verification record")

    // Create verification record
    const { error: verificationError } = await supabase.from("franchisee_verifications").insert({
      franchisee_id: profile.id,
      email: email,
      token: verificationToken,
      expires_at: expiresAt.toISOString(),
      verified: false,
    })

    if (verificationError) {
      console.error("[v0] Verification record creation error:", verificationError)
      return NextResponse.json({ error: "Failed to create verification record" }, { status: 500 })
    }

    console.log("[v0] Sending verification email")

    // Send verification email
    const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/franchise/verify-email?token=${verificationToken}`

    try {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: "ThynkCity <noreply@thynkcity.com>",
        to: [email],
        subject: "Welcome to ThynkCity Franchise Program - Verify Your Application",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to ThynkCity Franchise Program</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to ThynkCity!</h1>
                <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Franchise Partnership Program</p>
              </div>
              
              <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                <h2 style="color: #333; margin-top: 0;">Thank you for your Application to Partner with ThynkCity</h2>
                
                <p>Dear ${fullName},</p>
                
                <p>We're excited to receive your application to become a ThynkCity franchisee! Your interest in bringing quality tech education to ${territory}, ${stateCity} is exactly what we're looking for.</p>
                
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                  <h3 style="margin-top: 0; color: #667eea;">Next Steps:</h3>
                  <ol style="padding-left: 20px;">
                    <li><strong>Verify your email</strong> by clicking the button below</li>
                    <li><strong>Application Review</strong> - Our team will review your application within 3-5 business days</li>
                    <li><strong>Interview Process</strong> - Qualified candidates will be invited for a virtual interview</li>
                    <li><strong>Franchise Agreement</strong> - Successful applicants will receive franchise documentation</li>
                  </ol>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${verificationUrl}" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Verify Your Email Address</a>
                </div>
                
                <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #2c5aa0;">What You'll Get Access To:</h3>
                  <ul style="padding-left: 20px;">
                    <li><strong>Franchise Dashboard</strong> - Manage your territory and track performance</li>
                    <li><strong>School CRM System</strong> - Lead management and pipeline tracking</li>
                    <li><strong>Document Generator</strong> - Professional proposals and contracts</li>
                    <li><strong>Training Materials</strong> - Comprehensive franchise training program</li>
                    <li><strong>Marketing Support</strong> - Branded materials and marketing guidance</li>
                    <li><strong>Ongoing Support</strong> - Dedicated franchise support team</li>
                  </ul>
                </div>
                
                <p><strong>Application Details:</strong></p>
                <ul style="background: white; padding: 15px; border-radius: 5px; list-style: none;">
                  <li><strong>Territory:</strong> ${territory}</li>
                  <li><strong>Location:</strong> ${stateCity}, ${country}</li>
                  <li><strong>Contact:</strong> ${phoneNumber}</li>
                </ul>
                
                <p>If you have any questions about the franchise program or need assistance, please don't hesitate to contact our franchise team at <a href="mailto:franchise@thynkcity.com">franchise@thynkcity.com</a>.</p>
                
                <p>We look forward to potentially welcoming you to the ThynkCity family!</p>
                
                <p style="margin-top: 30px;">
                  Best regards,<br>
                  <strong>The ThynkCity Franchise Team</strong><br>
                  <a href="https://thynkcity.com">thynkcity.com</a>
                </p>
                
                <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                <p style="font-size: 12px; color: #666; text-align: center;">
                  This verification link will expire in 24 hours. If you didn't apply for a ThynkCity franchise, please ignore this email.
                </p>
              </div>
            </body>
          </html>
        `,
      })

      if (emailError) {
        console.error("[v0] Email sending error:", emailError)
        return NextResponse.json({
          success: true,
          message: "Profile created successfully, but verification email failed to send. Please contact support.",
          profileId: profile.id,
        })
      }

      console.log("[v0] Verification email sent successfully:", emailData?.id)

      // Log activity
      await supabase.from("franchise_activity_log").insert({
        franchisee_id: profile.id,
        action: "application_submitted",
        details: {
          email: email,
          territory: territory,
          verification_email_sent: true,
        },
      })

      console.log("[v0] Franchise profile creation completed successfully")

      return NextResponse.json({
        success: true,
        message: "Franchise application submitted successfully! Please check your email for verification instructions.",
        profileId: profile.id,
      })
    } catch (emailError) {
      console.error("[v0] Email service error:", emailError)
      return NextResponse.json({
        success: true,
        message: "Profile created successfully, but verification email failed to send. Please contact support.",
        profileId: profile.id,
      })
    }
  } catch (error) {
    console.error("[v0] Unexpected error in franchise profile creation:", error)
    return NextResponse.json({ error: "Internal server error: " + (error as Error).message }, { status: 500 })
  }
}
