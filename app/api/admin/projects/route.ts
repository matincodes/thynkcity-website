import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createServerClient()

    const { data: projects, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()

    const projectData = {
      ...body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data: project, error } = await supabase.from("portfolio_items").insert([projectData]).select().single()

    if (error) throw error

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
