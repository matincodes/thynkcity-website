import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()
    const { id } = await params

    const validFields = {
      title: body.title,
      slug: body.slug,
      description: body.description,
      curriculum: body.curriculum,
      duration_weeks: body.duration_weeks,
      sessions_per_week: body.sessions_per_week,
      price: body.price,
      category: body.category,
      level: body.level,
      prerequisites: body.prerequisites,
      learning_outcomes: body.learning_outcomes,
      image_url: body.image_url,
      status: body.status,
      updated_at: new Date().toISOString(),
    }

    // Remove undefined fields
    const updateData = Object.fromEntries(Object.entries(validFields).filter(([_, value]) => value !== undefined))

    const { data: course, error } = await supabase
      .from("courses")
      .update(updateData)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(course)
  } catch (error) {
    console.error("Error updating course:", error)
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createServerClient()
    const { id } = await params

    const { error } = await supabase.from("courses").delete().eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting course:", error)
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 })
  }
}
