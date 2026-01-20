import { createClient } from "@/lib/supabase/server"

export interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  content: string
  rating: number
  image_url?: string
  status: "pending" | "approved" | "rejected"
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image?: string
  category: string
  tags: string[]
  status: "draft" | "published" | "archived"
  published_at?: string
  created_at: string
}

export interface GalleryImage {
  id: string
  title: string
  description?: string
  image_url: string
  category: string
  tags: string[]
  status: "active" | "inactive"
  created_at: string
}

export interface PortfolioItem {
  id: string
  title: string
  client_name: string
  industry: string
  challenge: string
  solution: string
  results: string
  image_url?: string
  project_url?: string
  technologies: string[]
  category: string
  status: "active" | "inactive"
  created_at: string
}

export interface Course {
  id: string
  title: string
  slug: string
  description: string
  curriculum: any
  duration_weeks: number
  sessions_per_week: number
  price?: number
  category: "adults" | "kids"
  level: "beginner" | "intermediate" | "advanced"
  prerequisites: string[]
  learning_outcomes: string[]
  image_url?: string
  status: "active" | "inactive"
  created_at: string
}

export interface Registration {
  id: string
  type: 'individual' | 'parent'
  name: string
  email: string
  phone: string
  age?: number
  course_interest: string
  children?: any
  status: 'pending' | 'contacted' | 'enrolled' | 'declined'
  created_at: string
  updated_at: string
}

export interface StaffProfile {
  id: string
  user_id: string
  full_name: string
  email: string
  phone_number: string
  specialization: string
  bio?: string
  approved: boolean
  created_at: string
}

// Testimonials
export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching testimonials:", error)
    return []
  }

  return data || []
}

export async function submitTestimonial(testimonialData: Omit<Testimonial, "id" | "created_at" | "status">) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("testimonials")
    .insert([{ ...testimonialData, status: "pending" }])
    .select()

  if (error) {
    throw new Error(`Failed to submit testimonial: ${error.message}`)
  }

  return data[0]
}

// Blog Posts
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }

  return data || []
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (error) {
    console.error("Error fetching blog post:", error)
    return null
  }

  return data
}

// Gallery Images
export async function getActiveGalleryImages(): Promise<GalleryImage[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching gallery images:", error)
    return []
  }

  return data || []
}

// Portfolio Items
export async function getActivePortfolioItems(): Promise<PortfolioItem[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching portfolio items:", error)
    return []
  }

  return data || []
}

// Courses
export async function getActiveCourses(): Promise<Course[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching courses:", error)
    return []
  }

  return data || []
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("courses").select("*").eq("slug", slug).eq("status", "active").single()

  if (error) {
    console.error("Error fetching course:", error)
    return null
  }

  return data
}

export async function getCoursesByCategory(category: "adults" | "kids"): Promise<Course[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("category", category)
    .eq("status", "active")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching courses by category:", error)
    return []
  }

  return data || []
}
