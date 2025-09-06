import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

const resend = new Resend(process.env.RESEND_API_KEY!)

function generateVerificationToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Starting franchise profile creation")

    const body = await request.json()
    console.log("[v0] Request body:", body)

    const { userId, fullName, email, phoneNumber, country, stateCity, territory, statement } = body

    if (!userId || !fullName || !email || !phoneNumber || !country || !stateCity || !territory || !statement) {
      console.error("[v0] Missing required fields:", {
        userId: !!userId,
        fullName: !!fullName,
        email: !!email,
        phoneNumber: !!phoneNumber,
        country: !!country,
        stateCity: !!stateCity,
        territory: !!territory,
        statement: !!statement,
      })
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    console.log("[v0] Checking for duplicate email")
    const { data: existingProfile } = await supabase
      .from("franchisee_profiles")
      .select("id")
      .eq("email", email)
      .single()

    if (existingProfile) {
      console.log("[v0] Duplicate email found")
      return NextResponse.json({ error: "A franchisee application with this email already exists" }, { status: 409 })
    }

    const verificationToken = generateVerificationToken()
    const verificationExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    console.log("[v0] Creating franchisee profile in database")
    const { data: profile, error: profileError } = await supabase
      .from("franchisee_profiles")
      .insert({
        user_id: userId,
        full_name: fullName,
        email: email,
        phone_number: phoneNumber,
        country: country,
        state_city: stateCity,
        territory: territory, // This was missing and causing the null constraint violation
        statement: statement,
        status: "pending",
        verification_token: verificationToken,
        verification_expires_at: verificationExpiresAt.toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (profileError) {
      console.error("[v0] Database error creating profile:", profileError)
      return NextResponse.json({ error: `Database error: ${profileError.message}` }, { status: 500 })
    }

    console.log("[v0] Franchisee profile created successfully:", profile.id)

    try {
      console.log("[v0] Sending verification email via Resend")

      const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/franchise/verify-email?token=${verificationToken}`

      const emailResult = await resend.emails.send({
        from: "Thynkcity Franchise <franchise@thynkcity.com>",
        to: [email],
        subject: "Welcome to Thynkcity Franchise Program - Verify Your Application",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to Thynkcity Franchise Program</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Thynkcity!</h1>
                <p style="color: #f0f0f0; margin: 10px 0 0 0; font-size: 16px;">Franchise Partnership Program</p>
              </div>
              
              <div style="background: #ffffff; padding: 40px; border: 1px solid #e0e0e0; border-top: none;">
                <h2 style="color: #333; margin-top: 0;">Thank you for your Application to Partner with Thynkcity</h2>
                
                <p>Dear ${fullName},</p>
                
                <p>We're excited to receive your application to become a Thynkcity franchisee! Your application is now under review by our team.</p>
                
                <p><strong>Application Details:</strong></p>
                <ul style="background: #f8f9fa; padding: 20px; border-radius: 5px; list-style: none;">
                  <li><strong>Territory:</strong> ${territory}</li>
                  <li><strong>Location:</strong> ${stateCity}, ${country}</li>
                  <li><strong>Email:</strong> ${email}</li>
                  <li><strong>Phone:</strong> ${phoneNumber}</li>
                </ul>
                
                <p>To complete your application, please verify your email address by clicking the button below:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${verificationUrl}" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Verify Email Address</a>
                </div>
                
                <p><strong>What happens next?</strong></p>
                <ol>
                  <li>Verify your email address using the button above</li>
                  <li>Our team will review your application (typically 2-3 business days)</li>
                  <li>If approved, you'll receive access to your franchise dashboard</li>
                  <li>Begin your journey as a Thynkcity franchise partner!</li>
                </ol>
                
                <p><strong>Your Franchise Dashboard will include:</strong></p>
                <ul>
                  <li>🏫 School CRM for managing leads and partnerships</li>
                  <li>📄 Professional proposal and contract generators</li>
                  <li>💰 Discount request and approval system</li>
                  <li>📊 Performance analytics and reporting</li>
                  <li>🎓 Access to Thynkcity's complete course catalog</li>
                </ul>
                
                <div style="background: #e8f4fd; padding: 20px; border-radius: 5px; margin: 20px 0;">
                  <p style="margin: 0;"><strong>💡 Pro Tip:</strong> While waiting for approval, start identifying potential schools in your territory. Our CRM will help you manage these leads once you're approved!</p>
                </div>
                
                <p>If you have any questions, please don't hesitate to contact our franchise support team at <a href="mailto:franchise@thynkcity.com">franchise@thynkcity.com</a>.</p>
                
                <p>Welcome to the Thynkcity family!</p>
                
                <p style="margin-top: 30px;">
                  Best regards,<br>
                  <strong>The Thynkcity Franchise Team</strong><br>
                  <a href="https://thynkcity.com">thynkcity.com</a>
                </p>
              </div>
              
              <div style="background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; color: #666;">
                <p>This verification link expires in 24 hours. If you didn't apply for a Thynkcity franchise, please ignore this email.</p>
                <p>© 2024 Thynkcity. All rights reserved.</p>
              </div>
            </body>
          </html>
        `,
      })

      console.log("[v0] Verification email sent successfully:", emailResult.data?.id)
    } catch (emailError) {
      console.error("[v0] Failed to send verification email:", emailError)
      // Don't fail the entire request if email fails
    }

    try {
      await supabase.from("franchise_activity_log").insert({
        franchisee_id: profile.id,
        action: "application_submitted",
        details: {
          territory: territory,
          country: country,
          state_city: stateCity,
        },
      })
    } catch (logError) {
      console.error("[v0] Failed to log activity:", logError)
      // Don't fail the request if logging fails
    }

    return NextResponse.json({
      success: true,
      message: "Franchisee profile created successfully",
      profileId: profile.id,
    })
  } catch (error) {
    console.error("[v0] Unexpected error in create-profile API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
