import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createServerClient()

    const { data: staff, error } = await supabase
      .from("staff_profiles")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    console.log("Fetched staff profiles:", staff)
    return NextResponse.json(staff)
  } catch (error) {
    console.error("Error fetching staff profiles:", error)
    return NextResponse.json({ error: "Failed to fetch staff profiles" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()
    const { id, approved } = body

    const { data: staff, error } = await supabase
      .from("staff_profiles")
      .update({ approved })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(staff)
  } catch (error) {
    console.error("Error updating staff profile:", error)
    return NextResponse.json({ error: "Failed to update staff profile" }, { status: 500 })
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
      .from("staff_profiles")
      .delete()
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({ message: "Staff profile deleted successfully" })
  } catch (error) {
    console.error("Error deleting staff profile:", error)
    return NextResponse.json({ error: "Failed to delete staff profile" }, { status: 500 })
  }
}