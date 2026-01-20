import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

// Initialize Supabase Admin Client
// We do this outside the function to reuse the instance if possible
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

export async function sendVerificationEmail(email: string, userId: string) {
  console.log("[Internal] Sending verification for:", { email, userId })

  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured")
  }

  // 1. Generate verification token
  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  // 2. Store verification token in your custom table
  const { error: insertError } = await supabase.from("admin_verifications").insert({
    user_id: userId,
    email,
    token,
    expires_at: expiresAt.toISOString(),
  })

  if (insertError) {
    console.error("[Internal] Database insert error:", insertError)
    throw new Error("Failed to create verification record in DB")
  }

  // 3. Construct URL
  // Ensure NEXT_PUBLIC_SITE_URL is set in your .env (e.g., http://localhost:3000)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const verificationUrl = `${baseUrl}/admin/verify-email?token=${token}`

  // 4. Send Email via Resend
  const { data, error } = await resend.emails.send({
    from: "Thynkcity Admin <admin@thynkcity.com>", // Make sure this domain is verified in Resend
    to: [email],
    subject: "Verify Your Thynkcity Admin Account",
    html: `
      <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify Your Admin Account</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="/images/thynkcity-20main-20logo.png" alt="Thynkcity" style="height: 50px;">
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; border-left: 4px solid #AE752C;">
              <h1 style="color: #AE752C; margin-top: 0;">Welcome to Thynkcity Admin!</h1>
              
              <p>Hello,</p>
              
              <p>Thank you for creating an admin account with Thynkcity. To complete your registration and gain access to the admin dashboard, please verify your email address.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationUrl}" style="background: #AE752C; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Verify Email Address</a>
              </div>
              
              <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #f1f1f1; padding: 10px; border-radius: 5px; font-family: monospace;">${verificationUrl}</p>
              
              <p><strong>Important:</strong> This verification link will expire in 24 hours for security reasons.</p>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
              
              <p style="font-size: 14px; color: #666;">
                If you didn't create this account, please ignore this email.<br>
                For support, contact us at <a href="mailto:build@thynkcity.com">build@thynkcity.com</a>
              </p>
              
              <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #999;">
                <p>© 2026 Thynkcity. All rights reserved.</p>
                <p>10 Adeniji Street, Oregun, Ikeja, Lagos</p>
              </div>
            </div>
          </body>
        </html>
    `,
  })

  if (error) {
    console.error("[Internal] Resend error:", error)
    throw new Error("Failed to send email via Resend")
  }

  return { success: true, data }
}