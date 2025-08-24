import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createServerClient()

    const { data: images, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(images)
  } catch (error) {
    console.error("Error fetching gallery images:", error)
    return NextResponse.json({ error: "Failed to fetch gallery images" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()

    const imageData = {
      ...body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data: image, error } = await supabase.from("gallery_images").insert([imageData]).select().single()

    if (error) throw error

    return NextResponse.json(image)
  } catch (error) {
    console.error("Error creating gallery image:", error)
    return NextResponse.json({ error: "Failed to create gallery image" }, { status: 500 })
  }
}
