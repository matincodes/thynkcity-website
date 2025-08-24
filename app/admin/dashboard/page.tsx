import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import AdminDashboard from "./AdminDashboard"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/admin/login")
  }

  // Check if user has admin role
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).single()

  if (profile?.role !== "admin") {
    redirect("/admin/login")
  }

  return <AdminDashboard user={data.user} />
}
