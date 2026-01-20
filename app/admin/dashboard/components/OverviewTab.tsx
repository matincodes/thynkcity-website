import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart3,
  MessageSquare,
  BookOpen,
  Users,
  GraduationCap,
} from "lucide-react"

interface OverviewTabProps {
  stats: {
    totalTestimonials: number
    pendingTestimonials: number
    totalBlogPosts: number
    publishedBlogPosts: number
    totalRegistrations: number
    pendingRegistrations: number
    totalCourses: number
  }
}

export default function OverviewTab({ stats }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">Manage your Thynkcity content and monitor activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-lift smooth-transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Testimonials</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTestimonials}</div>
            <p className="text-xs text-muted-foreground">{stats.pendingTestimonials} pending approval</p>
          </CardContent>
        </Card>

        <Card className="hover-lift smooth-transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBlogPosts}</div>
            <p className="text-xs text-muted-foreground">{stats.publishedBlogPosts} published</p>
          </CardContent>
        </Card>

        <Card className="hover-lift smooth-transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registrations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRegistrations}</div>
            <p className="text-xs text-muted-foreground">{stats.pendingRegistrations} pending review</p>
          </CardContent>
        </Card>

        <Card className="hover-lift smooth-transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">Available courses</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}