import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createServerClient()

    const { data: testimonials, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()
    const { id, status } = body

    const { data: testimonial, error } = await supabase
      .from("testimonials")
      .update({ status })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error("Error updating testimonial:", error)
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({ message: "Testimonial deleted successfully" })
  } catch (error) {
    console.error("Error deleting testimonial:", error)
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 })
  }
}