import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { createServerClient } from "@/lib/supabase/server"
import {
  Code,
  Database,
  Shield,
  Smartphone,
  Bot,
  Palette,
  ArrowRight,
  CheckCircle,
  Users,
  BookOpen,
  Briefcase,
  Clock,
  Star,
  Server,
  Cable as Cube,
  Settings,
  Cloud,
  Target,
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
  Target,
  Megaphone,
  Gamepad2,
  PenTool,
  Calculator,
}

export default async function TrainingPage() {
  const supabase = await createServerClient()
  let adultCourses: any[] = []
  let kidsCourses: any[] = []

  try {
    const { data: courses, error } = await supabase
      .from("courses")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: true })

    if (error) {
      console.error("Error fetching courses:", error)
    } else {
      adultCourses = courses?.filter((course) => course.category === "adults") || []
      kidsCourses = courses?.filter((course) => course.category === "kids") || []
    }
  } catch (error) {
    console.error("Error fetching courses:", error)
  }

  if (adultCourses.length === 0) {
    adultCourses = [
      {
        id: 1,
        title: "Frontend Development",
        duration: "24 weeks",
        level: "Beginner to Advanced",
        description:
          "Master HTML, CSS, JavaScript, React, and modern frontend frameworks to build stunning web applications.",
        skills: ["HTML/CSS", "JavaScript", "React", "TypeScript", "Tailwind CSS"],
        slug: "frontend-development",
        icon_name: "Code",
        category: "adults",
      },
      {
        id: 2,
        title: "Backend Development",
        duration: "28 weeks",
        level: "Intermediate to Advanced",
        description:
          "Learn server-side programming with Node.js, Python, databases, and API development to build robust backend systems.",
        skills: ["Node.js", "Python", "MongoDB", "PostgreSQL", "REST APIs"],
        slug: "backend-development",
        icon_name: "Server",
        category: "adults",
      },
      {
        id: 3,
        title: "Data Science & Analytics",
        duration: "32 weeks",
        level: "Intermediate",
        description:
          "Learn Python, machine learning, data visualization, and statistical analysis to become a data expert.",
        skills: ["Python", "Pandas", "Machine Learning", "SQL", "Tableau"],
        slug: "data-science",
        icon_name: "Database",
        category: "adults",
      },
      {
        id: 4,
        title: "Cybersecurity Fundamentals",
        duration: "26 weeks",
        level: "Beginner",
        description:
          "Understand network security, ethical hacking, and cybersecurity best practices to protect digital assets.",
        skills: ["Network Security", "Ethical Hacking", "Risk Assessment", "Compliance"],
        slug: "cybersecurity",
        icon_name: "Shield",
        category: "adults",
      },
      {
        id: 5,
        title: "Mobile App Development",
        duration: "30 weeks",
        level: "Intermediate",
        description: "Build native and cross-platform mobile applications using React Native and Flutter.",
        skills: ["React Native", "Flutter", "Mobile UI/UX", "App Store Deployment"],
        slug: "mobile-development",
        icon_name: "Smartphone",
        category: "adults",
      },
      {
        id: 6,
        title: "UI/UX Design",
        duration: "24 weeks",
        level: "Beginner",
        description: "Create user-centered designs with Figma, Adobe XD, and design thinking methodologies.",
        skills: ["Figma", "Design Thinking", "Prototyping", "User Research"],
        slug: "ui-ux-design",
        icon_name: "Palette",
        category: "adults",
      },
      {
        id: 7,
        title: "3D Animation",
        duration: "36 weeks",
        level: "Beginner to Advanced",
        description: "Master 3D modeling, animation, and rendering using Blender, Maya, and industry-standard tools.",
        skills: ["Blender", "Maya", "3D Modeling", "Animation", "Rendering"],
        slug: "3d-animation",
        icon_name: "Cube",
        category: "adults",
      },
      {
        id: 8,
        title: "DevOps Engineering",
        duration: "28 weeks",
        level: "Intermediate to Advanced",
        description:
          "Learn CI/CD, containerization, cloud deployment, and infrastructure automation for modern development.",
        skills: ["Docker", "Kubernetes", "AWS", "Jenkins", "Terraform"],
        slug: "devops",
        icon_name: "Settings",
        category: "adults",
      },
      {
        id: 9,
        title: "Cloud Computing",
        duration: "26 weeks",
        level: "Intermediate",
        description: "Master cloud platforms like AWS, Azure, and Google Cloud for scalable application deployment.",
        skills: ["AWS", "Azure", "Google Cloud", "Serverless", "Cloud Architecture"],
        slug: "cloud-computing",
        icon_name: "Cloud",
        category: "adults",
      },
      {
        id: 10,
        title: "Project Management",
        duration: "24 weeks",
        level: "Beginner to Intermediate",
        description: "Learn Agile, Scrum, and project management methodologies to lead successful tech projects.",
        skills: ["Agile", "Scrum", "Jira", "Risk Management", "Team Leadership"],
        slug: "project-management",
        icon_name: "Target",
        category: "adults",
      },
      {
        id: 11,
        title: "Digital Marketing",
        duration: "24 weeks",
        level: "Beginner to Intermediate",
        description:
          "Master SEO, social media marketing, content strategy, and digital advertising for business growth.",
        skills: ["SEO", "Social Media", "Google Ads", "Content Marketing", "Analytics"],
        slug: "digital-marketing",
        icon_name: "Megaphone",
        category: "adults",
      },
      {
        id: 12,
        title: "Artificial Intelligence",
        duration: "40 weeks",
        level: "Advanced",
        description: "Dive deep into AI, machine learning, and neural networks to build intelligent systems.",
        skills: ["Machine Learning", "Deep Learning", "TensorFlow", "Computer Vision"],
        slug: "artificial-intelligence",
        icon_name: "Bot",
        category: "adults",
      },
    ]
  }

  if (kidsCourses.length === 0) {
    kidsCourses = [
      {
        id: 1,
        title: "Scratch Programming",
        age_range: "8-12 years",
        duration: "24 weeks",
        description: "Introduction to programming concepts through visual, block-based coding with Scratch.",
        slug: "scratch-programming",
        icon_name: "Code",
        category: "kids",
      },
      {
        id: 2,
        title: "Robotics for Kids",
        age_range: "10-14 years",
        duration: "28 weeks",
        description: "Build and program robots using LEGO Mindstorms and Arduino platforms.",
        slug: "robotics-kids",
        icon_name: "Bot",
        category: "kids",
      },
      {
        id: 3,
        title: "Python for Kids",
        age_range: "12-16 years",
        duration: "30 weeks",
        description: "Learn Python programming through games, animations, and fun projects.",
        slug: "python-kids",
        icon_name: "Code",
        category: "kids",
      },
      {
        id: 4,
        title: "AI using Teachable Machine",
        age_range: "10-14 years",
        duration: "24 weeks",
        description:
          "Explore artificial intelligence concepts using Google's Teachable Machine and create smart projects.",
        slug: "ai-teachable-machine",
        icon_name: "Bot",
        category: "kids",
      },
      {
        id: 5,
        title: "App Inventor",
        age_range: "12-16 years",
        duration: "26 weeks",
        description: "Build mobile apps without complex coding using MIT's App Inventor visual programming platform.",
        slug: "app-inventor",
        icon_name: "Smartphone",
        category: "kids",
      },
      {
        id: 6,
        title: "3D Animation for Kids",
        age_range: "10-16 years",
        duration: "28 weeks",
        description: "Create 3D characters and animations using kid-friendly tools like Blender and Tinkercad.",
        slug: "3d-animation-kids",
        icon_name: "Cube",
        category: "kids",
      },
      {
        id: 7,
        title: "Game Development",
        age_range: "12-16 years",
        duration: "30 weeks",
        description: "Design and build your own video games using Scratch, Unity, and game design principles.",
        slug: "game-development-kids",
        icon_name: "Gamepad2",
        category: "kids",
      },
      {
        id: 8,
        title: "Creative Writing",
        age_range: "8-14 years",
        duration: "24 weeks",
        description: "Develop storytelling skills, creative writing techniques, and digital publishing abilities.",
        slug: "creative-writing-kids",
        icon_name: "PenTool",
        category: "kids",
      },
      {
        id: 9,
        title: "Mathematics",
        age_range: "8-16 years",
        duration: "32 weeks",
        description: "Build strong mathematical foundations with interactive learning and problem-solving techniques.",
        slug: "mathematics-kids",
        icon_name: "Calculator",
        category: "kids",
      },
      {
        id: 10,
        title: "Digital Art & Design",
        age_range: "8-14 years",
        duration: "24 weeks",
        description: "Create digital artwork and learn basic design principles using kid-friendly tools.",
        slug: "digital-art-kids",
        icon_name: "Palette",
        category: "kids",
      },
    ]
  }

  const benefits = [
    {
      icon: Users,
      title: "One-on-One Tutoring",
      description: "Each course features personalized one-on-one sessions with certified tutors provided by Thynkcity.",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description:
        "Classes held 2-3 times per week with flexible timing to fit your schedule. Minimum 24 weeks duration.",
    },
    {
      icon: BookOpen,
      title: "Project-Based Learning",
      description: "Build real projects and create a portfolio that showcases your skills to potential employers.",
    },
    {
      icon: Briefcase,
      title: "Career Support",
      description: "Get job placement assistance, resume reviews, and interview preparation support.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-muted py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-primary border-primary">
                  World-Class Training Programs
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold font-montserrat text-foreground leading-tight">
                  Master the Skills of Tomorrow. <span className="text-primary">Start Your Tech Journey</span> Today.
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Unlock your potential with our comprehensive one-on-one training programs designed for all ages. Each
                  course features personalized tutoring with certified instructors, flexible 2-3 times per week
                  scheduling, and a minimum 24-week duration for thorough skill development.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/contact">Enroll Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-transparent">
                  <Link href="#courses">Browse Courses</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>20,000+ Students Trained</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>95% Job Placement Rate</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Students+learning+technology+and+coding"
                alt="Students learning technology and coding"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section id="courses" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">
              Training Programs for Everyone
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Whether you're starting your career, switching fields, or introducing your child to technology, we have
              the perfect program for you. All courses feature one-on-one tutoring with certified instructors.
            </p>
          </div>

          <Tabs defaultValue="adults" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
              <TabsTrigger value="adults" className="text-lg">
                Adults & Teenagers
              </TabsTrigger>
              <TabsTrigger value="kids" className="text-lg">
                Kids Programs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="adults" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {adultCourses.map((course, index) => {
                  const IconComponent = iconMap[course.icon_name] || Code
                  const skills = course.skills || course.curriculum?.split(",") || []

                  return (
                    <Card
                      key={course.id || index}
                      className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
                    >
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-4">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="font-montserrat">{course.title}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4" />
                            <span>{course.level || "All Levels"}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{course.description}</p>
                        {skills.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-semibold">Key Skills:</p>
                            <div className="flex flex-wrap gap-2">
                              {skills.slice(0, 5).map((skill: string, skillIndex: number) => (
                                <Badge key={skillIndex} variant="secondary" className="text-xs">
                                  {skill.trim()}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                          <Link href={`/courses/${course.slug}`}>
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="kids" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {kidsCourses.map((course, index) => {
                  const IconComponent = iconMap[course.icon_name] || Code

                  return (
                    <Card
                      key={course.id || index}
                      className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-background to-muted/30"
                    >
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-4">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="font-montserrat text-lg">{course.title}</CardTitle>
                        <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                          <span>Ages: {course.age_range || course.age}</span>
                          <span>Duration: {course.duration}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground text-sm">{course.description}</p>
                        <Button size="sm" asChild className="w-full group-hover:bg-primary/90 transition-colors">
                          <Link href={`/courses/${course.slug}`}>
                            Learn More
                            <ArrowRight className="ml-2 h-3 w-3" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Why Train With Us */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">
              Why Train With Thynkcity?
            </h2>
            <p className="text-xl text-muted-foreground">
              We provide more than just training - we offer a complete learning ecosystem designed for your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-montserrat">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">Success Stories</h2>
            <p className="text-xl text-muted-foreground">
              See how our training programs have transformed careers and lives across Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground italic">
                  "The Frontend Development bootcamp at Thynkcity gave me the skills and confidence I needed to land my
                  first developer job. The instructors were amazing!"
                </blockquote>
                <div>
                  <p className="font-semibold">David Okoro</p>
                  <p className="text-sm text-muted-foreground">Frontend Developer at TechCorp</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground italic">
                  "The Data Science program opened up a whole new career path for me. I went from accounting to becoming
                  a data analyst at a major bank!"
                </blockquote>
                <div>
                  <p className="font-semibold">Sarah Adebayo</p>
                  <p className="text-sm text-muted-foreground">Data Analyst at FirstBank</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground italic">
                  "My son loves the robotics classes! He's building amazing projects and his confidence in STEM has
                  soared. Thank you Thynkcity!"
                </blockquote>
                <div>
                  <p className="font-semibold">Mrs. Adebayo</p>
                  <p className="text-sm text-muted-foreground">Parent</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold font-montserrat">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl opacity-90">
            Join thousands of successful learners who have transformed their careers with Thynkcity. Your future starts
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
              <Link href="/contact">Enroll Today</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              <Link href="/contact">Schedule a Call</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
