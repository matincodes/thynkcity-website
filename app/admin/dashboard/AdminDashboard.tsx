"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import type { User } from "@supabase/supabase-js"
import type { Testimonial, BlogPost, GalleryImage, PortfolioItem, Course, Registration, StaffProfile } from "@/lib/supabase/queries"
import AdminHeader from "./components/AdminHeader"
import AdminSidebar from "./components/AdminSidebar"
import OverviewTab from "./components/OverviewTab"
import TestimonialsTab from "./components/TestimonialsTab"
import BlogTab from "./components/BlogTab"
import GalleryTab from "./components/GalleryTab"
import PortfolioTab from "./components/PortfolioTab"
import CoursesTab from "./components/CoursesTab"
import RegistrationsTab from "./components/RegistrationsTab"
import StaffTab from "./components/StaffTab"
import BlogPostForm from "./forms/BlogPostForm"
import CourseForm from "./forms/CourseForm"
import ProjectForm from "./forms/ProjectForm"
import GalleryForm from "./forms/GalleryForm"

interface AdminDashboardProps {
  user: User
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
  const [staffProfiles, setStaffProfiles] = useState<StaffProfile[]>([])

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
    totalStaff: 0,
    pendingStaff: 0,
    approvedStaff: 0,
  })

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch all data using API routes
      const [
        testimonialsRes,
        blogPostsRes,
        galleryRes,
        portfolioRes,
        coursesRes,
        registrationsRes,
        staffRes,
      ] = await Promise.all([
        fetch("/api/admin/testimonials"),
        fetch("/api/admin/blog-posts"),
        fetch("/api/admin/gallery"),
        fetch("/api/admin/projects"),
        fetch("/api/admin/courses"),
        fetch("/api/admin/registrations"),
        fetch("/api/admin/staff"),
      ])

      const [
        testimonialsData,
        blogPostsData,
        galleryData,
        portfolioData,
        coursesData,
        registrationsData,
        staffData,
      ] = await Promise.all([
        testimonialsRes.json(),
        blogPostsRes.json(),
        galleryRes.json(),
        portfolioRes.json(),
        coursesRes.json(),
        registrationsRes.json(),
        staffRes.json(),
      ])

      setTestimonials(testimonialsData)
      setBlogPosts(blogPostsData)
      setGalleryImages(galleryData)
      setPortfolioItems(portfolioData)
      setCourses(coursesData)
      setRegistrations(registrationsData)
      setStaffProfiles(staffData)


      console.log("Fetched data:", {
        testimonialsData,
        blogPostsData,
        galleryData,
        staffData,
      })
      // Calculate stats
      const pendingTestimonials = testimonialsData?.filter((t: any) => t.status === "pending").length || 0
      const publishedBlogPosts = blogPostsData?.filter((b: any) => b.status === "published").length || 0
      const pendingRegistrations = registrationsData?.filter((r: any) => r.status === "pending").length || 0
      const pendingStaff = staffData?.filter((s: any) => !s.approved).length || 0
      const approvedStaff = staffData?.filter((s: any) => s.approved).length || 0

      setStats({
        totalTestimonials: testimonialsData?.length || 0,
        pendingTestimonials,
        totalBlogPosts: blogPostsData?.length || 0,
        publishedBlogPosts,
        totalGalleryImages: galleryData?.length || 0,
        totalPortfolioItems: portfolioData?.length || 0,
        totalCourses: coursesData?.length || 0,
        totalRegistrations: registrationsData?.length || 0,
        pendingRegistrations,
        totalStaff: staffData?.length || 0,
        pendingStaff,
        approvedStaff,
      })
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const updateTestimonialStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const response = await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      })

      if (!response.ok) throw new Error("Failed to update testimonial")

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

      const response = await fetch(`/api/admin/blog-posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })

      if (!response.ok) throw new Error("Failed to update blog post")

      setBlogPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status, published_at: updateData.published_at || p.published_at } : p)),
      )
    } catch (error) {
      console.error("Error updating blog post:", error)
    }
  }

  const deleteItem = async (type: string, id: string) => {
    try {
      let endpoint = ""
      switch (type) {
        case "testimonials":
          endpoint = `/api/admin/testimonials?id=${id}`
          break
        case "blog_posts":
          endpoint = `/api/admin/blog-posts/${id}`
          break
        case "gallery_images":
          endpoint = `/api/admin/gallery/${id}`
          break
        case "portfolio_items":
          endpoint = `/api/admin/projects/${id}`
          break
        case "courses":
          endpoint = `/api/admin/courses/${id}`
          break
        case "registrations":
          endpoint = `/api/admin/registrations?id=${id}`
          break
        default:
          throw new Error(`Unknown type: ${type}`)
      }

      const response = await fetch(endpoint, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error(`Failed to delete ${type}`)

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
      const response = await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
      })

      if (!response.ok) throw new Error("Failed to update testimonial")

      setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)))
    } catch (error) {
      console.error("Error toggling testimonial visibility:", error)
    }
  }

  const updateRegistrationStatus = async (id: string, status: "pending" | "contacted" | "enrolled" | "declined") => {
    try {
      const response = await fetch("/api/admin/registrations", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      })

      if (!response.ok) throw new Error("Failed to update registration")

      setRegistrations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
      await fetchData() // Refresh stats
    } catch (error) {
      console.error("Error updating registration:", error)
    }
  }

  const handleStaffAction = async (staffId: string, action: "approve" | "reject") => {
    try {
      if (action === "approve") {
        const response = await fetch("/api/admin/staff", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: staffId, approved: true }),
        })

        if (!response.ok) throw new Error("Failed to approve staff")
      } else {
        // For reject, we delete the staff profile
        const response = await fetch(`/api/admin/staff?id=${staffId}`, {
          method: "DELETE",
        })

        if (!response.ok) throw new Error("Failed to reject staff")
      }

      fetchData()
    } catch (error) {
      console.error(`Error ${action}ing staff:`, error)
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
      <AdminHeader onSignOut={handleSignOut} />

      <div className="flex flex-col lg:flex-row">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} stats={stats} />

        <main className="flex-1 p-4 lg:p-6">
          {activeTab === "overview" && <OverviewTab stats={stats} />}
          {activeTab === "testimonials" && (
            <TestimonialsTab
              testimonials={testimonials}
              updateTestimonialStatus={updateTestimonialStatus}
              toggleTestimonialVisibility={toggleTestimonialVisibility}
              setDeleteConfirm={setDeleteConfirm}
            />
          )}
          {activeTab === "blog" && (
            <BlogTab
              blogPosts={blogPosts}
              updateBlogPostStatus={updateBlogPostStatus}
              setShowAddModal={setShowAddModal}
              setEditingItem={setEditingItem}
              setDeleteConfirm={setDeleteConfirm}
            />
          )}
          {activeTab === "gallery" && (
            <GalleryTab
              galleryImages={galleryImages}
              setShowAddModal={setShowAddModal}
              setEditingItem={setEditingItem}
              setDeleteConfirm={setDeleteConfirm}
            />
          )}
          {activeTab === "portfolio" && (
            <PortfolioTab
              portfolioItems={portfolioItems}
              setShowAddModal={setShowAddModal}
              setEditingItem={setEditingItem}
              setDeleteConfirm={setDeleteConfirm}
            />
          )}
          {activeTab === "courses" && (
            <CoursesTab
              courses={courses}
              setShowAddModal={setShowAddModal}
              setEditingItem={setEditingItem}
              setDeleteConfirm={setDeleteConfirm}
            />
          )}
          {activeTab === "registrations" && (
            <RegistrationsTab
              registrations={registrations}
              updateRegistrationStatus={updateRegistrationStatus}
              setDeleteConfirm={setDeleteConfirm}
            />
          )}
          {activeTab === "staff" && (
            <StaffTab
              staffProfiles={staffProfiles}
              stats={stats}
              handleStaffAction={handleStaffAction}
            />
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
