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

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
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
  })

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    setLoading(true)
    try {
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

      setTestimonials(testimonialsData || [])
      setBlogPosts(blogPostsData || [])
      setGalleryImages(galleryData || [])
      setPortfolioItems(portfolioData || [])
      setCourses(coursesData || [])

      // Calculate stats
      setStats({
        totalTestimonials: testimonialsData?.length || 0,
        pendingTestimonials: testimonialsData?.filter((t) => t.status === "pending").length || 0,
        totalBlogPosts: blogPostsData?.length || 0,
        publishedBlogPosts: blogPostsData?.filter((p) => p.status === "published").length || 0,
        totalGalleryImages: galleryData?.length || 0,
        totalPortfolioItems: portfolioData?.length || 0,
        totalCourses: coursesData?.length || 0,
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
      }

      setDeleteConfirm(null)
      await fetchAllData() // Refresh stats
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
                    <CardTitle className="text-sm font-medium">Gallery Images</CardTitle>
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalGalleryImages}</div>
                    <p className="text-xs text-muted-foreground">Active images</p>
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
        </main>
      </div>

      {showAddModal && editingItem && (
        <>
          {editingItem.type === "blog" && (
            <BlogPostForm
              post={editingItem.id ? editingItem : null}
              onClose={() => {
                setShowAddModal(false)
                setEditingItem(null)
              }}
              onSave={fetchAllData}
            />
          )}
          {editingItem.type === "course" && (
            <CourseForm
              course={editingItem.id ? editingItem : null}
              onClose={() => {
                setShowAddModal(false)
                setEditingItem(null)
              }}
              onSave={fetchAllData}
            />
          )}
          {editingItem.type === "portfolio" && (
            <ProjectForm
              project={editingItem.id ? editingItem : null}
              onClose={() => {
                setShowAddModal(false)
                setEditingItem(null)
              }}
              onSave={fetchAllData}
            />
          )}
          {editingItem.type === "gallery" && (
            <GalleryForm
              image={editingItem.id ? editingItem : null}
              onClose={() => {
                setShowAddModal(false)
                setEditingItem(null)
              }}
              onSave={fetchAllData}
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
