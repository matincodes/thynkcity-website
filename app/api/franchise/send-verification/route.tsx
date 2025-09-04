import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email, franchiseeId, franchiseeName } = await request.json()

    console.log("[v0] Franchise verification email request:", { email, franchiseeId, franchiseeName })
    console.log("[v0] RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY)
    console.log("[v0] RESEND_API_KEY value:", process.env.RESEND_API_KEY?.substring(0, 10) + "...")

    if (!email || !franchiseeId) {
      console.log("[v0] Missing required fields:", { email: !!email, franchiseeId: !!franchiseeId })
      return NextResponse.json({ error: "Email and franchiseeId are required" }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("[v0] RESEND_API_KEY is not configured")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    const supabase = await createServerClient()

    // Generate verification token
    const token = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

    console.log("[v0] Generated verification token:", token.substring(0, 8) + "...")

    // Store verification token in franchisee_verifications table
    const { error: insertError } = await supabase.from("franchisee_verifications").insert({
      franchisee_id: franchiseeId,
      email,
      token,
      expires_at: expiresAt.toISOString(),
    })

    if (insertError) {
      console.error("[v0] Database insert error:", insertError)
      return NextResponse.json({ error: "Failed to create verification record" }, { status: 500 })
    }

    console.log("[v0] Verification record created successfully")

    const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/franchise/verify-email?token=${token}`
    console.log("[v0] Verification URL:", verificationUrl)

    console.log("[v0] Attempting to send email via Resend...")
    console.log("[v0] Email details:", {
      from: "Thynkcity Partnership <partnerships@thynkcity.com>",
      to: email,
      subject: "Welcome to the Thynkcity Franchise Network!",
    })

    const { data, error } = await resend.emails.send({
      from: "Thynkcity Partnership <partnerships@thynkcity.com>",
      to: [email],
      subject: "Welcome to the Thynkcity Franchise Network!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Thynkcity Franchise Network</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Thynkcity%20Main%20Logo-bcVE5HyamWS9SeUWcwQGUVGHkpQKQn.png" alt="Thynkcity" style="height: 60px;">
            </div>
            
            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 40px; border-radius: 15px; border-left: 5px solid #AE752C;">
              <h1 style="color: #AE752C; margin-top: 0; font-size: 28px;">🎉 Congratulations, ${franchiseeName || "Partner"}!</h1>
              
              <p style="font-size: 18px; color: #2c3e50; margin-bottom: 25px;"><strong>Thank you for your Application to Partner with Thynkcity!</strong></p>
              
              <p>We are thrilled to inform you that your franchise application has been <strong style="color: #27ae60;">APPROVED</strong>! Welcome to the Thynkcity family of educational innovators.</p>
              
              <div style="background: #fff; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 4px solid #27ae60;">
                <h3 style="color: #27ae60; margin-top: 0;">🚀 What's Next?</h3>
                <p>To activate your franchise account and access your comprehensive business dashboard, please verify your email address by clicking the button below:</p>
              </div>
              
              <div style="text-align: center; margin: 35px 0;">
                <a href="${verificationUrl}" style="background: linear-gradient(135deg, #AE752C 0%, #d4941e 100%); color: white; padding: 18px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(174, 117, 44, 0.3); transition: all 0.3s ease;">✨ Activate My Franchise Account</a>
              </div>
              
              <div style="background: #e8f4f8; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h4 style="color: #2c3e50; margin-top: 0;">🎯 Your Franchise Dashboard Includes:</h4>
                <ul style="color: #34495e; margin: 0; padding-left: 20px;">
                  <li><strong>School CRM System</strong> - Manage leads and track your sales pipeline</li>
                  <li><strong>Professional Document Generator</strong> - Create proposals, brochures, and contracts</li>
                  <li><strong>Revenue Analytics</strong> - Track your business performance and growth</li>
                  <li><strong>Marketing Resources</strong> - Access branded materials and campaigns</li>
                  <li><strong>Training Materials</strong> - Comprehensive business and technical training</li>
                </ul>
              </div>
              
              <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #f8f9fa; padding: 15px; border-radius: 8px; font-family: monospace; border: 1px solid #dee2e6;">${verificationUrl}</p>
              
              <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 25px 0;">
                <p style="margin: 0; color: #856404;"><strong>⏰ Important:</strong> This verification link will expire in 7 days. Please activate your account as soon as possible to begin your franchise journey.</p>
              </div>
              
              <hr style="border: none; border-top: 2px solid #eee; margin: 35px 0;">
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                <h4 style="color: #AE752C; margin-top: 0;">📞 Need Support?</h4>
                <p style="margin-bottom: 10px;">Our franchise support team is here to help you succeed:</p>
                <p style="margin: 5px 0;">📧 Email: <a href="mailto:franchise@thynkcity.com" style="color: #AE752C;">franchise@thynkcity.com</a></p>
                <p style="margin: 5px 0;">📱 WhatsApp: <a href="https://wa.me/2348123456789" style="color: #AE752C;">+234 812 345 6789</a></p>
                <p style="margin: 5px 0;">🌐 Portal: <a href="${process.env.NEXT_PUBLIC_SITE_URL}/franchise" style="color: #AE752C;">thynkcity.com/franchise</a></p>
              </div>
              
              <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #eee;">
                <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
                  Welcome to a partnership that transforms education across Africa! 🌍
                </p>
                <p style="font-size: 12px; color: #999; margin: 0;">
                  © 2024 Thynkcity. All rights reserved.<br>
                  10 Adeniji Street, Oregun, Ikeja, Lagos, Nigeria
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error("[v0] Resend API error:", error)
      console.error("[v0] Resend error details:", JSON.stringify(error, null, 2))
      return NextResponse.json({ error: "Failed to send verification email", details: error }, { status: 500 })
    }

    console.log("[v0] Resend API response:", data)
    console.log("[v0] Franchisee verification email sent successfully to:", email)
    return NextResponse.json({ message: "Verification email sent successfully", emailId: data?.id })
  } catch (error) {
    console.error("[v0] Send franchisee verification error:", error)
    console.error("[v0] Error stack:", error instanceof Error ? error.stack : "No stack trace")
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
