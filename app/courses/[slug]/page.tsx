import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { createServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import {
  Clock,
  Users,
  BookOpen,
  CheckCircle,
  ArrowLeft,
  Star,
  Calendar,
  Target,
  Award,
  Code,
  Database,
  Shield,
  Smartphone,
  Bot,
  Palette,
  Server,
  Cable as Cube,
  Settings,
  Cloud,
  Megaphone,
  Gamepad2,
  PenTool,
  Calculator,
} from "lucide-react"

const iconMap: { [key: string]: any } = {
  Code,
  Database,
  Shield,
  Smartphone,
  Bot,
  Palette,
  Server,
  Cube,
  Settings,
  Cloud,
  Target: Target,
  Megaphone,
  Gamepad2,
  PenTool,
  Calculator,
}

interface CoursePageProps {
  params: {
    slug: string
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const supabase = await createServerClient()

  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", params.slug)
    .eq("status", "active")
    .single()

  if (error || !course) {
    notFound()
  }

  const IconComponent = iconMap[course.icon_name] || Code
  const curriculumModules =
    course.curriculum && typeof course.curriculum === "object" ? course.curriculum.modules || [] : []

  const learningOutcomes = course.learning_outcomes
    ? Array.isArray(course.learning_outcomes)
      ? course.learning_outcomes
      : course.learning_outcomes.split("\n").filter((item: string) => item.trim())
    : []

  const prerequisites = course.prerequisites
    ? Array.isArray(course.prerequisites)
      ? course.prerequisites
      : course.prerequisites.split("\n").filter((item: string) => item.trim())
    : []

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-muted py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/services/training">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Courses
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <Badge variant="outline" className="text-primary border-primary mb-2">
                      {course.category === "kids" ? "Kids Program" : "Professional Training"}
                    </Badge>
                    <h1 className="text-4xl lg:text-5xl font-bold font-montserrat text-foreground leading-tight">
                      {course.title}
                    </h1>
                  </div>
                </div>

                <p className="text-xl text-muted-foreground leading-relaxed">{course.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold">Duration</p>
                      <p className="text-muted-foreground">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold">Format</p>
                      <p className="text-muted-foreground">One-on-One</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold">Schedule</p>
                      <p className="text-muted-foreground">2-3x/week</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-semibold">Level</p>
                      <p className="text-muted-foreground">{course.level || "All Levels"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/contact">Enroll Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-transparent">
                  <Link href="/contact">Schedule Consultation</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <Image
                src={
                  course.image_url ||
                  `/placeholder.svg?height=600&width=800&text=${encodeURIComponent(course.title + " Course") || "/placeholder.svg"}`
                }
                alt={course.title}
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Learning Outcomes */}
              {learningOutcomes.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-6 w-6 text-primary" />
                      <span>What You'll Learn</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {learningOutcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{outcome.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Curriculum */}
              {curriculumModules.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-6 w-6 text-primary" />
                      <span>Course Curriculum</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {curriculumModules.map((module: any, index: number) => (
                        <div key={index} className="border rounded-lg p-6 bg-muted/30">
                          <div className="flex items-start space-x-4 mb-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-semibold text-primary">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2">{module.title}</h3>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                                <span className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{module.weeks} weeks</span>
                                </span>
                              </div>
                              {module.topics && module.topics.length > 0 && (
                                <div className="space-y-2">
                                  <p className="font-medium text-sm">Topics covered:</p>
                                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {module.topics.map((topic: string, topicIndex: number) => (
                                      <li key={topicIndex} className="flex items-start space-x-2 text-sm">
                                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                        <span>{topic}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Prerequisites */}
              {prerequisites.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="h-6 w-6 text-primary" />
                      <span>Prerequisites</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {prerequisites.map((prereq, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{prereq.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Course Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-semibold">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Format:</span>
                      <span className="font-semibold">One-on-One Tutoring</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Schedule:</span>
                      <span className="font-semibold">2-3 times/week</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Level:</span>
                      <span className="font-semibold">{course.level || "All Levels"}</span>
                    </div>
                    {course.age_range && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Age Range:</span>
                        <span className="font-semibold">{course.age_range}</span>
                      </div>
                    )}
                    {course.price && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-semibold">{course.price}</span>
                      </div>
                    )}
                  </div>
                  <div className="pt-4 border-t">
                    <Button className="w-full" size="lg" asChild>
                      <Link href="/contact">Enroll Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Why Choose This Course */}
              <Card>
                <CardHeader>
                  <CardTitle>Why Choose This Course?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Users className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold">Certified Tutors</p>
                        <p className="text-sm text-muted-foreground">
                          Learn from industry experts with proven track records
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold">Flexible Schedule</p>
                        <p className="text-sm text-muted-foreground">Classes scheduled around your availability</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold">Hands-on Projects</p>
                        <p className="text-sm text-muted-foreground">Build real projects for your portfolio</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Award className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold">Certificate</p>
                        <p className="text-sm text-muted-foreground">Receive a certificate upon completion</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
