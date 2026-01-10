import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import StaffDashboard from "./StaffDashboard"

export default async function StaffDashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/staff/login")
  }

  // Check if staff profile exists and is approved
  const { data: profile } = await supabase.from("staff_profiles").select("*").eq("user_id", data.user.id).single()

  if (!profile) {
    redirect("/staff/register")
  }

  if (!profile.approved) {
    redirect("/staff/pending")
  }

  return <StaffDashboard user={data.user} profile={profile} />
}
