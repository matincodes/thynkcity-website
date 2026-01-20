import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  MessageSquare,
  BookOpen,
  ImageIcon,
  Briefcase,
  GraduationCap,
  Users,
  UserCheck,
} from "lucide-react"

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  stats: {
    pendingTestimonials: number
    pendingRegistrations: number
    pendingStaff: number
  }
}

export default function AdminSidebar({ activeTab, setActiveTab, stats }: AdminSidebarProps) {
  return (
    <aside className="w-full lg:w-64 border-r border-border bg-card lg:min-h-[calc(100vh-4rem)]">
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
          variant={activeTab === "testimonials" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("testimonials")}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Testimonials
          {stats.pendingTestimonials > 0 && (
            <Badge variant="destructive" className="ml-auto">
              {stats.pendingTestimonials}
            </Badge>
          )}
        </Button>

        <Button
          variant={activeTab === "blog" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("blog")}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Blog Posts
        </Button>
        <Button
          variant={activeTab === "gallery" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("gallery")}
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Gallery
        </Button>
        <Button
          variant={activeTab === "portfolio" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("portfolio")}
        >
          <Briefcase className="h-4 w-4 mr-2" />
          Portfolio
        </Button>
        <Button
          variant={activeTab === "courses" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("courses")}
        >
          <GraduationCap className="h-4 w-4 mr-2" />
          Courses
        </Button>
        <Button
          variant={activeTab === "registrations" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("registrations")}
        >
          <Users className="h-4 w-4 mr-2" />
          Registrations
          {stats.pendingRegistrations > 0 && (
            <Badge variant="destructive" className="ml-auto">
              {stats.pendingRegistrations}
            </Badge>
          )}
        </Button>

        <Button
          variant={activeTab === "staff" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("staff")}
        >
          <UserCheck className="h-4 w-4 mr-2" />
          Staff Management
          {stats.pendingStaff > 0 && (
            <Badge variant="destructive" className="ml-auto">
              {stats.pendingStaff}
            </Badge>
          )}
        </Button>
      </nav>
    </aside>
  )
}