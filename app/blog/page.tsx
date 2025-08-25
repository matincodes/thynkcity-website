"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollAnimation } from "@/components/scroll-animation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowRight, BookOpen, TrendingUp, Briefcase, Building, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"

interface BlogPost {
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

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("status", "published")
          .order("published_at", { ascending: false })

        if (error) {
          console.error("Error fetching blog posts:", error)
          setHasError(true)
        } else {
          setBlogPosts(data || [])
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Loading blog posts...</p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  if (hasError || blogPosts.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />

        <section className="relative bg-gradient-to-br from-background via-background to-muted py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimation className="text-center space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-primary border-primary">
                  Thynkcity Blog
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold font-montserrat text-foreground leading-tight">
                  Insights, Stories, and <span className="text-primary">Innovation</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                  Stay updated with the latest trends in technology, education, and business across Africa.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card className="p-8 border-2 border-dashed border-muted-foreground/20">
              <div className="space-y-6">
                <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto" />
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold font-montserrat">Database Setup Required</h2>
                  <p className="text-muted-foreground">
                    The blog content is stored in Supabase. Please run the database setup scripts to see blog posts.
                  </p>
                </div>
                <div className="text-left bg-muted p-4 rounded-lg">
                  <p className="font-semibold mb-2">Run these SQL scripts in your Supabase dashboard:</p>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>scripts/001_create_database_schema.sql</li>
                    <li>scripts/002_create_profile_trigger.sql</li>
                    <li>scripts/003_populate_testimonials.sql</li>
                    <li>scripts/004_populate_blog_posts.sql</li>
                    <li>scripts/005_populate_gallery_images.sql</li>
                    <li>scripts/006_populate_portfolio_items.sql</li>
                    <li>scripts/007_populate_courses.sql</li>
                  </ol>
                </div>
                <Button asChild className="hover-lift smooth-transition">
                  <Link href="/">Return to Homepage</Link>
                </Button>
              </div>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  const categories = [
    { name: "All Posts", icon: BookOpen, count: blogPosts.length },
    {
      name: "EdTech Insights",
      icon: BookOpen,
      count: blogPosts.filter((post) => post.category === "EdTech Insights").length,
    },
    {
      name: "Career Advice",
      icon: TrendingUp,
      count: blogPosts.filter((post) => post.category === "Career Advice").length,
    },
    {
      name: "Business Strategy",
      icon: Briefcase,
      count: blogPosts.filter((post) => post.category === "Business Strategy").length,
    },
    {
      name: "FinTech Trends",
      icon: Building,
      count: blogPosts.filter((post) => post.category === "FinTech Trends").length,
    },
    {
      name: "Company News",
      icon: Building,
      count: blogPosts.filter((post) => post.category === "Company News").length,
    },
  ]

  const featuredPosts = blogPosts.slice(0, 3)
  const regularPosts = blogPosts.slice(3)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-muted py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary border-primary">
                Thynkcity Blog
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold font-montserrat text-foreground leading-tight">
                Insights, Stories, and <span className="text-primary">Innovation</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                Stay updated with the latest trends in technology, education, and business across Africa. Discover
                insights from our experts and learn from success stories that inspire.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant="outline"
                className="flex items-center space-x-2 bg-transparent smooth-transition hover-lift"
              >
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </ScrollAnimation>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              <ScrollAnimation className="text-center space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">Featured Articles</h2>
                <p className="text-xl text-muted-foreground">Our most popular and impactful content</p>
              </ScrollAnimation>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post, index) => (
                  <ScrollAnimation key={post.id} className={`animate-stagger-${index + 1}`}>
                    <Card
                      className={`group hover:shadow-xl hover-lift smooth-transition border-2 hover:border-primary/20 overflow-hidden ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
                    >
                      <div className="relative">
                        <Image
                          src={post.featured_image || "/placeholder.svg?height=400&width=600"}
                          alt={post.title}
                          width={600}
                          height={400}
                          className={`w-full object-cover group-hover:scale-105 smooth-transition ${index === 0 ? "h-80" : "h-48"}`}
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-background/90 text-foreground">
                            {post.category}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader className="space-y-4">
                        <CardTitle
                          className={`font-montserrat group-hover:text-primary smooth-transition ${index === 0 ? "text-2xl" : "text-xl"}`}
                        >
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </CardTitle>
                        <CardDescription className={index === 0 ? "text-base" : "text-sm"}>
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(post.published_at || post.created_at)}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button
                          asChild
                          className="w-full group-hover:bg-primary/90 smooth-transition btn-animate hover-lift"
                        >
                          <Link href={`/blog/${post.slug}`}>
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      {regularPosts.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              <ScrollAnimation className="text-center space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">Latest Articles</h2>
                <p className="text-xl text-muted-foreground">Stay updated with our newest content</p>
              </ScrollAnimation>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, index) => (
                  <ScrollAnimation key={post.id} className={`animate-stagger-${(index % 6) + 1}`}>
                    <Card className="group hover:shadow-lg hover-lift smooth-transition border-2 hover:border-primary/20 overflow-hidden">
                      <div className="relative">
                        <Image
                          src={post.featured_image || "/placeholder.svg?height=250&width=400"}
                          alt={post.title}
                          width={400}
                          height={250}
                          className="w-full h-48 object-cover group-hover:scale-105 smooth-transition"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-background/90 text-foreground">
                            {post.category}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader className="space-y-3">
                        <CardTitle className="font-montserrat text-lg group-hover:text-primary smooth-transition">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </CardTitle>
                        <CardDescription className="text-sm">{post.excerpt}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(post.published_at || post.created_at)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {post.tags.slice(0, 1).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button
                          asChild
                          size="sm"
                          className="w-full group-hover:bg-primary/90 smooth-transition btn-animate hover-lift"
                        >
                          <Link href={`/blog/${post.slug}`}>
                            Read More
                            <ArrowRight className="ml-2 h-3 w-3" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
