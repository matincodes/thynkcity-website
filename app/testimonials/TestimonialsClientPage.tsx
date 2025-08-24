"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Star, Quote, Send, Users, GraduationCap, Building, Heart, Loader2 } from "lucide-react"
import Image from "next/image"
import type { Testimonial } from "@/lib/supabase/queries"

export default function TestimonialsClientPage() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/testimonials")
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data)
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/submit-testimonial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          rating: Number.parseInt(formData.rating),
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          name: "",
          role: "",
          company: "",
          content: "",
          rating: "",
        })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const categories = [
    { id: "all", label: "All Testimonials", icon: Heart },
    { id: "student", label: "Students", icon: GraduationCap },
    { id: "parent", label: "Parents", icon: Users },
    { id: "institution", label: "Institutions", icon: Building },
  ]

  const filteredTestimonials =
    activeFilter === "all"
      ? testimonials
      : testimonials.filter((t) => {
          if (activeFilter === "student")
            return (
              t.role.toLowerCase().includes("student") ||
              t.role.toLowerCase().includes("developer") ||
              t.role.toLowerCase().includes("analyst") ||
              t.role.toLowerCase().includes("designer")
            )
          if (activeFilter === "parent") return t.role.toLowerCase().includes("parent")
          if (activeFilter === "institution")
            return (
              t.role.toLowerCase().includes("principal") ||
              t.role.toLowerCase().includes("school") ||
              t.company?.toLowerCase().includes("school") ||
              t.company?.toLowerCase().includes("university")
            )
          return true
        })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-muted py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary border-primary">
                Success Stories
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold font-montserrat text-foreground leading-tight">
                Hear From Our <span className="text-primary">Amazing Community</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                Discover how Thynkcity has transformed careers, empowered students, and strengthened communities across
                Africa. Read real stories from our graduates, parents, and partner institutions.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? "default" : "outline"}
                onClick={() => setActiveFilter(category.id)}
                className="flex items-center space-x-2 smooth-transition hover-lift"
              >
                <category.icon className="h-4 w-4" />
                <span>{category.label}</span>
              </Button>
            ))}
          </ScrollAnimation>

          {/* Testimonials Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading testimonials...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredTestimonials.map((testimonial, index) => (
                <ScrollAnimation key={testimonial.id} className={`animate-stagger-${(index % 6) + 1}`}>
                  <Card className="group hover:shadow-lg hover-lift smooth-transition">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                          <Image
                            src={testimonial.image_url || "/placeholder.svg?height=48&width=48"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold font-montserrat">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                            {testimonial.company && ` at ${testimonial.company}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <Quote className="h-8 w-8 text-primary/20 absolute -top-2 -left-2" />
                        <p className="text-muted-foreground italic pl-6">{testimonial.content}</p>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonial Submission Form */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">Share Your Success Story</h2>
            <p className="text-xl text-muted-foreground">
              Help inspire others by sharing your experience with Thynkcity. Your story could be the motivation someone
              needs to start their journey.
            </p>
          </ScrollAnimation>

          <ScrollAnimation className="animate-stagger-2">
            <Card className="border-2 hover:border-primary/20 smooth-transition">
              <CardHeader>
                <CardTitle className="text-2xl font-montserrat flex items-center space-x-2">
                  <Send className="h-6 w-6 text-primary" />
                  <span>Submit Your Testimonial</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800">
                      Thank you for sharing your story! Your testimonial has been submitted and will be reviewed before
                      being published.
                    </p>
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">
                      Sorry, there was an error submitting your testimonial. Please try again or contact us directly.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Your Role/Title *</Label>
                      <Input
                        id="role"
                        value={formData.role}
                        onChange={(e) => handleInputChange("role", e.target.value)}
                        placeholder="e.g., Software Developer, Student, Parent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company/School (Optional)</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="Where do you work or study?"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rating">Rating *</Label>
                      <Select value={formData.rating} onValueChange={(value) => handleInputChange("rating", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                          <SelectItem value="4">⭐⭐⭐⭐ Very Good</SelectItem>
                          <SelectItem value="3">⭐⭐⭐ Good</SelectItem>
                          <SelectItem value="2">⭐⭐ Fair</SelectItem>
                          <SelectItem value="1">⭐ Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Your Testimonial *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => handleInputChange("content", e.target.value)}
                      placeholder="Share your experience with Thynkcity. How did our programs help you? What would you tell someone considering our courses?"
                      rows={6}
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      Please share specific details about your experience, outcomes, and how Thynkcity helped you
                      achieve your goals.
                    </p>
                  </div>

                  <Button type="submit" size="lg" className="w-full btn-animate hover-lift" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Testimonial
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  )
}
