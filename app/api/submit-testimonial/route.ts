import { type NextRequest, NextResponse } from "next/server"
import { submitTestimonial } from "@/lib/supabase/queries"

export async function POST(request: NextRequest) {
  try {
    const testimonialData = await request.json()

    if (!testimonialData.name || !testimonialData.role || !testimonialData.content || !testimonialData.rating) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const result = await submitTestimonial({
      name: testimonialData.name,
      role: testimonialData.role,
      company: testimonialData.company || null,
      content: testimonialData.content,
      rating: Number.parseInt(testimonialData.rating),
      image_url: undefined, // Will be added later when image upload is implemented
    })

    return NextResponse.json({
      success: true,
      message: "Testimonial submitted successfully and is pending review",
      data: result,
    })
  } catch (error) {
    console.error("Error submitting testimonial:", error)
    return NextResponse.json({ success: false, message: "Failed to submit testimonial" }, { status: 500 })
  }
}
