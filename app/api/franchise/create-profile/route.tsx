import { type NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Starting franchise profile creation")

    const body = await request.json()
    const { userId, fullName, email, phoneNumber, country, stateCity, territory, statement } = body

    console.log("[v0] Creating service client for profile creation")

    const supabase = await createServiceClient()

    console.log("[v0] Inserting franchisee profile into database")

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
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (profileError) {
      console.error("[v0] Database error creating profile:", profileError)
      return NextResponse.json({ error: `Database error: ${profileError.message}` }, { status: 500 })
    }

    console.log("[v0] Franchisee profile created successfully:", profile.id)

    // Send verification email
    try {
      console.log("[v0] Generating verification token")

      const token = Math.random().toString(36).substring(2) + Date.now().toString(36)
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

      console.log("[v0] Storing verification token in database")

      const { error: verificationError } = await supabase.from("franchisee_verifications").insert({
        franchisee_id: profile.id,
        token: token,
        expires_at: expiresAt.toISOString(),
        created_at: new Date().toISOString(),
      })

      if (verificationError) {
        console.error("[v0] Error storing verification token:", verificationError)
        // Continue without email verification if token storage fails
      } else {
        console.log("[v0] Sending verification email via Resend")

        const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/franchise/verify-email?token=${token}`

        const { data: emailData, error: emailError } = await resend.emails.send({
          from: "ThynkCity <noreply@thynkcity.com>",
          to: [email],
          subject: "Welcome to ThynkCity - Verify Your Franchise Application",
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
                
                <p>We're excited to receive your franchise application! Your journey to becoming a ThynkCity partner has begun.</p>
                
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                  <h3 style="margin-top: 0; color: #667eea;">Next Steps:</h3>
                  <ol style="padding-left: 20px;">
                    <li><strong>Verify your email</strong> by clicking the button below</li>
                    <li><strong>Application Review</strong> - Our team will review your application</li>
                    <li><strong>Interview Process</strong> - Qualified candidates will be contacted for an interview</li>
                    <li><strong>Partnership Agreement</strong> - Successful applicants will receive partnership details</li>
                  </ol>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${verificationUrl}" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Verify Email Address</a>
                </div>
                
                <div style="background: #e8f2ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <h4 style="margin-top: 0; color: #1a5490;">What You'll Get Access To:</h4>
                  <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Comprehensive franchise dashboard</li>
                    <li>School partnership management tools</li>
                    <li>Professional proposal and contract generators</li>
                    <li>Marketing materials and brand assets</li>
                    <li>Ongoing training and support</li>
                  </ul>
                </div>
                
                <p style="margin-top: 30px;"><strong>Application Details:</strong></p>
                <ul style="background: white; padding: 15px; border-radius: 5px; list-style: none; margin: 10px 0;">
                  <li><strong>Territory:</strong> ${territory}</li>
                  <li><strong>Location:</strong> ${stateCity}, ${country}</li>
                  <li><strong>Application Date:</strong> ${new Date().toLocaleDateString()}</li>
                </ul>
                
                <p style="font-size: 14px; color: #666; margin-top: 30px;">
                  This verification link will expire in 24 hours. If you didn't apply for a ThynkCity franchise, please ignore this email.
                </p>
                
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                
                <div style="text-align: center; color: #666; font-size: 14px;">
                  <p><strong>ThynkCity</strong><br>
                  Empowering Africa's Digital Future<br>
                  <a href="mailto:franchise@thynkcity.com" style="color: #667eea;">franchise@thynkcity.com</a></p>
                </div>
              </div>
            </body>
            </html>
          `,
        })

        if (emailError) {
          console.error("[v0] Resend email error:", emailError)
        } else {
          console.log("[v0] Verification email sent successfully:", emailData?.id)
        }
      }
    } catch (emailError) {
      console.error("[v0] Error in email verification process:", emailError)
      // Continue without failing the entire process
    }

    return NextResponse.json({
      success: true,
      message: "Franchisee profile created successfully",
      profileId: profile.id,
    })
  } catch (error: any) {
    console.error("[v0] Error in franchise profile creation:", error)
    return NextResponse.json({ error: error.message || "Failed to create franchisee profile" }, { status: 500 })
  }
}
