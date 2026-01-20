import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createServerClient()

    const { data: registrations, error } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(registrations)
  } catch (error) {
    console.error("Error fetching registrations:", error)
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()
    const { id, status } = body

    const { data: registration, error } = await supabase
      .from("registrations")
      .update({ status })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(registration)
  } catch (error) {
    console.error("Error updating registration:", error)
    return NextResponse.json({ error: "Failed to update registration" }, { status: 500 })
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
      .from("registrations")
      .delete()
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({ message: "Registration deleted successfully" })
  } catch (error) {
    console.error("Error deleting registration:", error)
    return NextResponse.json({ error: "Failed to delete registration" }, { status: 500 })
  }
}