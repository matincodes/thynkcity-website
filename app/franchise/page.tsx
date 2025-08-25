import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"

export default async function FranchisePage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/franchise/login")
  }

  // Check if user is a franchisee
  const { data: profile } = await supabase.from("franchisee_profiles").select("*").eq("user_id", user.id).single()

  if (!profile || profile.status !== "active") {
    redirect("/franchise/pending")
  }

  redirect("/franchise/dashboard")
}
