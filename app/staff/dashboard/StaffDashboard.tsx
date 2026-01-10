"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { BarChart3, LogOut, Calendar, FileText, Users, Clock, BookOpen, Video } from "lucide-react"
import type { User } from "@supabase/supabase-js"
import ClassReportForm from "./forms/ClassReportForm"
import ScheduleManager from "./components/ScheduleManager"
import ReportCardGenerator from "./components/ReportCardGenerator"

interface StaffDashboardProps {
  user: User
  profile: any
}

export default function StaffDashboard({ user, profile }: StaffDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState({
    totalSessions: 0,
    thisWeekSessions: 0,
    totalStudents: 0,
    upcomingClasses: 0,
  })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Fetch total sessions
      const { count: totalSessions } = await supabase
        .from("class_sessions")
        .select("*", { count: "exact", head: true })
        .eq("staff_id", profile.id)

      // Fetch this week's sessions
      const startOfWeek = new Date()
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
      const { count: thisWeekSessions } = await supabase
        .from("class_sessions")
        .select("*", { count: "exact", head: true })
        .eq("staff_id", profile.id)
        .gte("date", startOfWeek.toISOString().split("T")[0])

      // Fetch unique students
      const { data: sessions } = await supabase
        .from("class_sessions")
        .select("student_id")
        .eq("staff_id", profile.id)
        .not("student_id", "is", null)

      const uniqueStudents = new Set(sessions?.map((s) => s.student_id)).size

      // Fetch upcoming virtual classes
      const { count: upcomingClasses } = await supabase
        .from("virtual_class_schedules")
        .select("*", { count: "exact", head: true })
        .eq("staff_id", profile.id)
        .eq("is_active", true)

      setStats({
        totalSessions: totalSessions || 0,
        thisWeekSessions: thisWeekSessions || 0,
        totalStudents: uniqueStudents || 0,
        upcomingClasses: upcomingClasses || 0,
      })
    } catch (error) {
      console.error("[v0] Error fetching stats:", error)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/staff/login")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold font-montserrat">Thynkcity Staff Portal</h1>
            <Badge variant="secondary">Instructor Dashboard</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Welcome, {profile.full_name}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={activeTab === "submit-report" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("submit-report")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Submit Class Report
            </Button>
            <Button
              variant={activeTab === "schedules" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("schedules")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Virtual Class Schedules
            </Button>
            <Button
              variant={activeTab === "report-cards" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("report-cards")}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Generate Report Cards
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-montserrat mb-2">Dashboard Overview</h2>
                <p className="text-muted-foreground">Track your teaching activity and manage classes</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalSessions}</div>
                    <p className="text-xs text-muted-foreground">All time</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">This Week</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.thisWeekSessions}</div>
                    <p className="text-xs text-muted-foreground">Sessions conducted</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Students</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalStudents}</div>
                    <p className="text-xs text-muted-foreground">Unique students taught</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Classes</CardTitle>
                    <Video className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.upcomingClasses}</div>
                    <p className="text-xs text-muted-foreground">Virtual schedules</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button onClick={() => setActiveTab("submit-report")} className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    Submit Class Report
                  </Button>
                  <Button onClick={() => setActiveTab("schedules")} variant="outline" className="h-20 flex-col gap-2">
                    <Calendar className="h-6 w-6" />
                    Manage Schedules
                  </Button>
                  <Button
                    onClick={() => setActiveTab("report-cards")}
                    variant="outline"
                    className="h-20 flex-col gap-2"
                  >
                    <BookOpen className="h-6 w-6" />
                    Create Report Card
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "submit-report" && <ClassReportForm staffId={profile.id} onSuccess={fetchStats} />}

          {activeTab === "schedules" && <ScheduleManager staffId={profile.id} />}

          {activeTab === "report-cards" && <ReportCardGenerator staffId={profile.id} />}
        </main>
      </div>
    </div>
  )
}
