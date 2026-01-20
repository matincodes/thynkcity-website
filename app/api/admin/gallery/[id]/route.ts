import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()
    const { id } = await params

    const { data: image, error } = await supabase
      .from("gallery_images")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(image)
  } catch (error) {
    console.error("Error updating gallery image:", error)
    return NextResponse.json({ error: "Failed to update gallery image" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createServerClient()
    const { id } = await params

    const { error } = await supabase.from("gallery_images").delete().eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting gallery image:", error)
    return NextResponse.json({ error: "Failed to delete gallery image" }, { status: 500 })
  }
}
