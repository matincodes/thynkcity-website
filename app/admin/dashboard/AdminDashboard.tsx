"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  MessageSquare,
  BookOpen,
  ImageIcon,
  Briefcase,
  GraduationCap,
  LogOut,
  Check,
  X,
  Edit,
  Plus,
  Loader2,
  Users,
  Building2,
  DollarSign,
  FileText,
} from "lucide-react"
import type { User } from "@supabase/supabase-js"
import type { Testimonial, BlogPost, GalleryImage, PortfolioItem, Course } from "@/lib/supabase/queries"
import BlogPostForm from "./forms/BlogPostForm"
import CourseForm from "./forms/CourseForm"
import ProjectForm from "./forms/ProjectForm"
import GalleryForm from "./forms/GalleryForm"

interface AdminDashboardProps {
  user: User
}

interface Registration {
  id: string
  type: "individual" | "parent"
  name: string
  email: string
  phone: string
  age?: number
  course_interest: string
  children?: Array<{
    name: string
    age: number
    course_interest: string
  }>
  status: "pending" | "contacted" | "enrolled" | "declined"
  created_at: string
}

interface Franchisee {
  id: string
  full_name: string
  email: string
  phone_number: string
  country: string
  state_city: string
  territory: string
  statement: string
  status: "pending" | "approved" | "rejected" | "suspended" | "active"
  created_at: string
  verified_at?: string
  user_id: string
}

interface DiscountRequest {
  id: string
  franchisee_id: string
  franchisee_name: string
  school_name: string
  original_amount: number
  requested_discount: number
  reason: string
  status: "pending" | "approved" | "rejected"
  created_at: string
}

interface FranchiseActivity {
  id: string
  franchisee_id: string
  franchisee_name: string
  activity_type: string
  description: string
  created_at: string
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(true)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [franchisees, setFranchisees] = useState<Franchisee[]>([])
  const [discountRequests, setDiscountRequests] = useState<DiscountRequest[]>([])
  const [franchiseActivities, setFranchiseActivities] = useState<FranchiseActivity[]>([])

  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: string; id: string } | null>(null)
  const [stats, setStats] = useState({
    totalTestimonials: 0,
    pendingTestimonials: 0,
    totalBlogPosts: 0,
    publishedBlogPosts: 0,
    totalGalleryImages: 0,
    totalPortfolioItems: 0,
    totalCourses: 0,
    totalRegistrations: 0,
    pendingRegistrations: 0,
    totalFranchisees: 0,
    pendingFranchisees: 0,
    activeFranchisees: 0,
    pendingDiscountRequests: 0,
    totalRevenue: 0,
  })

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch testimonials
      const { data: testimonialsData } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false })

      // Fetch blog posts
      const { data: blogPostsData } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false })

      // Fetch gallery images
      const { data: galleryData } = await supabase
        .from("gallery_images")
        .select("*")
        .order("created_at", { ascending: false })

      // Fetch portfolio items
      const { data: portfolioData } = await supabase
        .from("portfolio_items")
        .select("*")
        .order("created_at", { ascending: false })

      // Fetch courses
      const { data: coursesData } = await supabase.from("courses").select("*").order("created_at", { ascending: false })

      const { data: registrationsData } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false })

      const [
        testimonialsRes,
        blogPostsRes,
        galleryRes,
        portfolioRes,
        coursesRes,
        registrationsRes,
        franchiseesRes,
        discountRequestsRes,
        activitiesRes,
      ] = await Promise.all([
        supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
        supabase.from("blog_posts").select("*").order("created_at", { ascending: false }),
        supabase.from("gallery_images").select("*").order("created_at", { ascending: false }),
        supabase.from("portfolio_items").select("*").order("created_at", { ascending: false }),
        supabase.from("courses").select("*").order("created_at", { ascending: false }),
        supabase.from("registrations").select("*").order("created_at", { ascending: false }),
        supabase.from("franchisee_profiles").select("*").order("created_at", { ascending: false }),
        supabase
          .from("discount_requests")
          .select(`
          *,
          franchisee:franchisee_profiles(full_name)
        `)
          .order("created_at", { ascending: false }),
        supabase
          .from("franchise_activity_log")
          .select(`
          *,
          franchisee:franchisee_profiles(full_name)
        `)
          .order("created_at", { ascending: false })
          .limit(50),
      ])

      setTestimonials(testimonialsData || [])
      setBlogPosts(blogPostsData || [])
      setGalleryImages(galleryData || [])
      setPortfolioItems(portfolioData || [])
      setCourses(coursesData || [])
      setRegistrations(registrationsData || []) // Set registrations data
      if (testimonialsRes.data) setTestimonials(testimonialsRes.data)
      if (blogPostsRes.data) setBlogPosts(blogPostsRes.data)
      if (galleryRes.data) setGalleryImages(galleryRes.data)
      if (portfolioRes.data) setPortfolioItems(portfolioRes.data)
      if (coursesRes.data) setCourses(coursesRes.data)
      if (registrationsRes.data) setRegistrations(registrationsRes.data)
      if (franchiseesRes.data) setFranchisees(franchiseesRes.data)
      if (discountRequestsRes.data) setDiscountRequests(discountRequestsRes.data)
      if (activitiesRes.data) setFranchiseActivities(activitiesRes.data)

      // Calculate stats
      const pendingTestimonials = testimonialsRes.data?.filter((t) => t.status === "pending").length || 0
      const publishedBlogPosts = blogPostsRes.data?.filter((b) => b.status === "published").length || 0
      const pendingRegistrations = registrationsRes.data?.filter((r) => r.status === "pending").length || 0
      const pendingFranchisees = franchiseesRes.data?.filter((f) => f.status === "pending").length || 0
      const activeFranchisees = franchiseesRes.data?.filter((f) => f.status === "approved").length || 0
      const pendingDiscountRequests = discountRequestsRes.data?.filter((d) => d.status === "pending").length || 0
      const totalRevenue = franchiseesRes.data?.reduce((sum, f) => sum + (f.monthly_revenue || 0), 0) || 0

      // Calculate stats
      setStats({
        totalTestimonials: testimonialsData?.length || 0,
        pendingTestimonials: testimonialsData?.filter((t) => t.status === "pending").length || 0,
        totalBlogPosts: blogPostsData?.length || 0,
        publishedBlogPosts: blogPostsData?.filter((p) => p.status === "published").length || 0,
        totalGalleryImages: galleryData?.length || 0,
        totalPortfolioItems: portfolioData?.length || 0,
        totalCourses: coursesData?.length || 0,
        totalRegistrations: registrationsData?.length || 0, // Added registration stats
        pendingRegistrations: registrationsData?.filter((r) => r.status === "pending").length || 0,
        totalFranchisees: franchiseesRes.data?.length || 0,
        pendingFranchisees,
        activeFranchisees,
        pendingDiscountRequests,
        totalRevenue,
      })
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFranchiseeAction = async (franchiseeId: string, action: "approve" | "reject" | "suspend") => {
    try {
      const status = action === "approve" ? "active" : action === "reject" ? "rejected" : "suspended"
      const updateData: any = { status }

      if (action === "approve") {
        updateData.verified_at = new Date().toISOString()
      }

      const { error } = await supabase.from("franchisee_profiles").update(updateData).eq("id", franchiseeId)

      if (error) throw error

      // Just log the activity
      await supabase.from("franchise_activity_log").insert({
        franchisee_id: franchiseeId,
        activity_type: "status_change",
        description: `Franchisee ${action}d by admin`,
        admin_id: user.id,
      })

      fetchData()
    } catch (error) {
      console.error(`Error ${action}ing franchisee:`, error)
    }
  }

  const handleDiscountRequest = async (requestId: string, action: "approve" | "reject") => {
    try {
      const { error } = await supabase
        .from("discount_requests")
        .update({
          status: action === "approve" ? "approved" : "rejected",
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", requestId)

      if (error) throw error
      fetchData()
    } catch (error) {
      console.error(`Error ${action}ing discount request:`, error)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const updateTestimonialStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const { error } = await supabase.from("testimonials").update({ status }).eq("id", id)

      if (error) throw error

      setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)))
    } catch (error) {
      console.error("Error updating testimonial:", error)
    }
  }

  const updateBlogPostStatus = async (id: string, status: "draft" | "published" | "archived") => {
    try {
      const updateData: any = { status }
      if (status === "published") {
        updateData.published_at = new Date().toISOString()
      }

      const { error } = await supabase.from("blog_posts").update(updateData).eq("id", id)

      if (error) throw error

      setBlogPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status, published_at: updateData.published_at || p.published_at } : p)),
      )
    } catch (error) {
      console.error("Error updating blog post:", error)
    }
  }

  const deleteItem = async (type: string, id: string) => {
    try {
      const { error } = await supabase.from(type).delete().eq("id", id)
      if (error) throw error

      // Update local state
      switch (type) {
        case "testimonials":
          setTestimonials((prev) => prev.filter((item) => item.id !== id))
          break
        case "blog_posts":
          setBlogPosts((prev) => prev.filter((item) => item.id !== id))
          break
        case "gallery_images":
          setGalleryImages((prev) => prev.filter((item) => item.id !== id))
          break
        case "portfolio_items":
          setPortfolioItems((prev) => prev.filter((item) => item.id !== id))
          break
        case "courses":
          setCourses((prev) => prev.filter((item) => item.id !== id))
          break
        case "registrations":
          setRegistrations((prev) => prev.filter((item) => item.id !== id))
          break
      }

      setDeleteConfirm(null)
      await fetchData() // Refresh stats
    } catch (error) {
      console.error(`Error deleting ${type}:`, error)
    }
  }

  const toggleTestimonialVisibility = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "approved" ? "rejected" : "approved"
    try {
      const { error } = await supabase.from("testimonials").update({ status: newStatus }).eq("id", id)
      if (error) throw error
      setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)))
    } catch (error) {
      console.error("Error toggling testimonial visibility:", error)
    }
  }

  const updateRegistrationStatus = async (id: string, status: "pending" | "contacted" | "enrolled" | "declined") => {
    try {
      const { error } = await supabase.from("registrations").update({ status }).eq("id", id)

      if (error) throw error

      setRegistrations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
      await fetchData() // Refresh stats
    } catch (error) {
      console.error("Error updating registration:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="text-lg">Loading dashboard...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold font-montserrat">Thynkcity Admin</h1>
            <Badge variant="secondary">Dashboard</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Welcome, Admin</span>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="hover-lift bg-transparent">
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
              variant={activeTab === "franchisees" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("franchisees")}
            >
              <Building2 className="h-4 w-4 mr-2" />
              Franchisees
              {stats.pendingFranchisees > 0 && (
                <Badge variant="destructive" className="ml-auto">
                  {stats.pendingFranchisees}
                </Badge>
              )}
            </Button>
            <Button
              variant={activeTab === "discount-requests" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("discount-requests")}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Discount Requests
              {stats.pendingDiscountRequests > 0 && (
                <Badge variant="destructive" className="ml-auto">
                  {stats.pendingDiscountRequests}
                </Badge>
              )}
            </Button>
            <Button
              variant={activeTab === "franchise-activities" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("franchise-activities")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Franchise Activities
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

            {/* ... existing navigation items ... */}
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
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-montserrat mb-2">Dashboard Overview</h2>
                <p className="text-muted-foreground">Manage your Thynkcity content and monitor activity</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover-lift smooth-transition">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Franchisees</CardTitle>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalFranchisees}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.activeFranchisees} active, {stats.pendingFranchisees} pending
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover-lift smooth-transition">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₦{stats.totalRevenue.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">From all franchisees</p>
                  </CardContent>
                </Card>

                <Card className="hover-lift smooth-transition">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Discount Requests</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.pendingDiscountRequests}</div>
                    <p className="text-xs text-muted-foreground">Pending approval</p>
                  </CardContent>
                </Card>

                {/* ... existing overview cards ... */}
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
          )}

          {activeTab === "franchisees" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold font-montserrat mb-2">Franchisee Management</h2>
                  <p className="text-muted-foreground">Manage franchise applications and active franchisees</p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Franchisees</CardTitle>
                  <CardDescription>Review and manage franchise applications and active franchisees</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Territory</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Applied</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {franchisees.map((franchisee) => (
                        <TableRow key={franchisee.id}>
                          <TableCell className="font-medium">{franchisee.full_name}</TableCell>
                          <TableCell>{franchisee.email}</TableCell>
                          <TableCell>{franchisee.territory}</TableCell>
                          <TableCell className="capitalize">{franchisee.country}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                franchisee.status === "active" || franchisee.status === "approved"
                                  ? "default"
                                  : franchisee.status === "pending"
                                    ? "secondary"
                                    : franchisee.status === "rejected"
                                      ? "destructive"
                                      : "outline"
                              }
                            >
                              {franchisee.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(franchisee.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {franchisee.status === "pending" && (
                                <>
                                  <Button size="sm" onClick={() => handleFranchiseeAction(franchisee.id, "approve")}>
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleFranchiseeAction(franchisee.id, "reject")}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              {(franchisee.status === "active" || franchisee.status === "approved") && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleFranchiseeAction(franchisee.id, "suspend")}
                                >
                                  Suspend
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  alert(
                                    `Franchisee Details:\n\nName: ${franchisee.full_name}\nEmail: ${franchisee.email}\nPhone: ${franchisee.phone_number}\nTerritory: ${franchisee.territory}\nCountry: ${franchisee.country}\nState/City: ${franchisee.state_city}\n\nStatement:\n${franchisee.statement}`,
                                  )
                                }}
                              >
                                View Details
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "discount-requests" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-montserrat mb-2">Discount Requests</h2>
                <p className="text-muted-foreground">Review and approve discount requests from franchisees</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Discount Requests</CardTitle>
                  <CardDescription>Review discount requests that need approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Franchisee</TableHead>
                        <TableHead>School</TableHead>
                        <TableHead>Original Amount</TableHead>
                        <TableHead>Requested Discount</TableHead>
                        <TableHead>Final Amount</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {discountRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.franchisee_name}</TableCell>
                          <TableCell>{request.school_name}</TableCell>
                          <TableCell>₦{request.original_amount.toLocaleString()}</TableCell>
                          <TableCell>{request.requested_discount}%</TableCell>
                          <TableCell>
                            ₦{(request.original_amount * (1 - request.requested_discount / 100)).toLocaleString()}
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{request.reason}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                request.status === "approved"
                                  ? "default"
                                  : request.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {request.status === "pending" && (
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => handleDiscountRequest(request.id, "approve")}>
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDiscountRequest(request.id, "reject")}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "franchise-activities" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-montserrat mb-2">Franchise Activities</h2>
                <p className="text-muted-foreground">Monitor all franchise activities and system events</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest activities from all franchisees</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Franchisee</TableHead>
                        <TableHead>Activity Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {franchiseActivities.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell className="font-medium">{activity.franchisee_name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{activity.activity_type.replace("_", " ")}</Badge>
                          </TableCell>
                          <TableCell>{activity.description}</TableCell>
                          <TableCell>{new Date(activity.created_at).toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold font-montserrat">Testimonials</h2>
                  <p className="text-muted-foreground">Review and manage user testimonials</p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Testimonials</CardTitle>
                  <CardDescription>Review testimonials and approve them for public display</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {testimonials.map((testimonial) => (
                        <TableRow key={testimonial.id}>
                          <TableCell className="font-medium">{testimonial.name}</TableCell>
                          <TableCell>{testimonial.role}</TableCell>
                          <TableCell>
                            <div className="flex">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <span key={i} className="text-primary">
                                  ★
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                testimonial.status === "approved"
                                  ? "default"
                                  : testimonial.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {testimonial.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(testimonial.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {testimonial.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => updateTestimonialStatus(testimonial.id, "approved")}
                                    className="hover-lift"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => updateTestimonialStatus(testimonial.id, "rejected")}
                                    className="hover-lift"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              {(testimonial.status === "approved" || testimonial.status === "rejected") && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => toggleTestimonialVisibility(testimonial.id, testimonial.status)}
                                  className="hover-lift bg-transparent"
                                >
                                  {testimonial.status === "approved" ? "Reject" : "Approve"}
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => setDeleteConfirm({ type: "testimonials", id: testimonial.id })}
                                className="hover-lift"
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "blog" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold font-montserrat">Blog Posts</h2>
                  <p className="text-muted-foreground">Manage your blog content</p>
                </div>
                <Button
                  className="hover-lift btn-animate"
                  onClick={() => {
                    setShowAddModal(true)
                    setEditingItem({ type: "blog" })
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Post
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Blog Posts</CardTitle>
                  <CardDescription>Create, edit, and publish blog articles</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Published</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blogPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{post.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                post.status === "published"
                                  ? "default"
                                  : post.status === "draft"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {post.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {post.published_at ? new Date(post.published_at).toLocaleDateString() : "Not published"}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="hover-lift bg-transparent"
                                onClick={() => {
                                  setEditingItem({ ...post, type: "blog" })
                                  setShowAddModal(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              {post.status === "draft" && (
                                <Button
                                  size="sm"
                                  onClick={() => updateBlogPostStatus(post.id, "published")}
                                  className="hover-lift"
                                >
                                  Publish
                                </Button>
                              )}
                              {post.status === "published" && (
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => updateBlogPostStatus(post.id, "archived")}
                                  className="hover-lift"
                                >
                                  Archive
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => setDeleteConfirm({ type: "blog_posts", id: post.id })}
                                className="hover-lift"
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold font-montserrat">Gallery Management</h2>
                  <p className="text-muted-foreground">Organize and manage gallery images</p>
                </div>
                <Button
                  className="hover-lift btn-animate"
                  onClick={() => {
                    setShowAddModal(true)
                    setEditingItem({ type: "gallery" })
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Images
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Gallery Images</CardTitle>
                  <CardDescription>Manage images displayed in the gallery section</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryImages.map((image) => (
                      <div key={image.id} className="border rounded-lg p-4 space-y-3">
                        <img
                          src={image.image_url || "/placeholder.svg"}
                          alt={image.title}
                          className="w-full h-48 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-medium">{image.title}</h3>
                          <p className="text-sm text-muted-foreground">{image.description}</p>
                          <Badge variant="outline" className="mt-1">
                            {image.category}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingItem({ ...image, type: "gallery" })
                              setShowAddModal(true)
                            }}
                            className="hover-lift bg-transparent"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setDeleteConfirm({ type: "gallery_images", id: image.id })}
                            className="hover-lift"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "portfolio" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold font-montserrat">Portfolio Management</h2>
                  <p className="text-muted-foreground">Manage portfolio projects and case studies</p>
                </div>
                <Button
                  className="hover-lift btn-animate"
                  onClick={() => {
                    setShowAddModal(true)
                    setEditingItem({ type: "portfolio" })
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Projects</CardTitle>
                  <CardDescription>Showcase your successful projects and case studies</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Industry</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {portfolioItems.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium">{project.title}</TableCell>
                          <TableCell>{project.client_name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{project.industry}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={project.status === "active" ? "default" : "secondary"}>
                              {project.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingItem({ ...project, type: "portfolio" })
                                  setShowAddModal(true)
                                }}
                                className="hover-lift bg-transparent"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => setDeleteConfirm({ type: "portfolio_items", id: project.id })}
                                className="hover-lift"
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "courses" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold font-montserrat">Course Management</h2>
                  <p className="text-muted-foreground">Create and manage training courses</p>
                </div>
                <Button
                  className="hover-lift btn-animate"
                  onClick={() => {
                    setShowAddModal(true)
                    setEditingItem({ type: "course" })
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Course
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Courses</CardTitle>
                  <CardDescription>Manage your educational course offerings</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Target</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">{course.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{course.target_audience}</Badge>
                          </TableCell>
                          <TableCell>{course.duration_weeks} weeks</TableCell>
                          <TableCell>₦{course.price?.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={course.status === "active" ? "default" : "secondary"}>
                              {course.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(course.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingItem({ ...course, type: "course" })
                                  setShowAddModal(true)
                                }}
                                className="hover-lift bg-transparent"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => setDeleteConfirm({ type: "courses", id: course.id })}
                                className="hover-lift"
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "registrations" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold font-montserrat">Student Registrations</h2>
                  <p className="text-muted-foreground">Manage course registration inquiries and enrollments</p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Registrations</CardTitle>
                  <CardDescription>Review and manage student registration requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Course Interest</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registrations.map((registration) => (
                        <TableRow key={registration.id}>
                          <TableCell className="font-medium">
                            <div>
                              <div>{registration.name}</div>
                              {registration.type === "parent" && registration.children && (
                                <div className="text-sm text-muted-foreground">
                                  Children: {registration.children.map((child) => child.name).join(", ")}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{registration.type === "individual" ? "Student" : "Parent"}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{registration.email}</div>
                              <div className="text-muted-foreground">{registration.phone}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {registration.type === "individual" ? (
                                <Badge variant="secondary">{registration.course_interest}</Badge>
                              ) : (
                                <div className="space-y-1">
                                  {registration.children?.map((child, index) => (
                                    <Badge key={index} variant="secondary" className="mr-1">
                                      {child.course_interest}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                registration.status === "enrolled"
                                  ? "default"
                                  : registration.status === "contacted"
                                    ? "secondary"
                                    : registration.status === "pending"
                                      ? "outline"
                                      : "destructive"
                              }
                            >
                              {registration.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(registration.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {registration.status === "pending" && (
                                <Button
                                  size="sm"
                                  onClick={() => updateRegistrationStatus(registration.id, "contacted")}
                                  className="hover-lift"
                                >
                                  Contact
                                </Button>
                              )}
                              {registration.status === "contacted" && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => updateRegistrationStatus(registration.id, "enrolled")}
                                    className="hover-lift"
                                  >
                                    Enroll
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateRegistrationStatus(registration.id, "declined")}
                                    className="hover-lift bg-transparent"
                                  >
                                    Decline
                                  </Button>
                                </>
                              )}
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => setDeleteConfirm({ type: "registrations", id: registration.id })}
                                className="hover-lift"
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Existing modals */}
      {showAddModal && editingItem && (
        <>
          {editingItem.type === "blog" && (
            <BlogPostForm
              post={editingItem.id ? editingItem : null}
              onClose={() => {
                setShowAddModal(false)
                setEditingItem(null)
              }}
              onSave={fetchData}
            />
          )}
          {editingItem.type === "course" && (
            <CourseForm
              course={editingItem.id ? editingItem : null}
              onClose={() => {
                setShowAddModal(false)
                setEditingItem(null)
              }}
              onSave={fetchData}
            />
          )}
          {editingItem.type === "portfolio" && (
            <ProjectForm
              project={editingItem.id ? editingItem : null}
              onClose={() => {
                setShowAddModal(false)
                setEditingItem(null)
              }}
              onSave={fetchData}
            />
          )}
          {editingItem.type === "gallery" && (
            <GalleryForm
              image={editingItem.id ? editingItem : null}
              onClose={() => {
                setShowAddModal(false)
                setEditingItem(null)
              }}
              onSave={fetchData}
            />
          )}
        </>
      )}

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className="flex space-x-3 justify-end">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => deleteItem(deleteConfirm.type, deleteConfirm.id)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
