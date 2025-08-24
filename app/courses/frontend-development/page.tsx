import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Code, Clock, Users, Star, CheckCircle, BookOpen, Calendar, Target } from "lucide-react"

export default function FrontendDevelopmentPage() {
  const courseModules = [
    {
      week: "Weeks 1-4",
      title: "HTML & CSS Fundamentals",
      topics: ["HTML5 Structure", "CSS3 Styling", "Responsive Design", "Flexbox & Grid"],
    },
    {
      week: "Weeks 5-8",
      title: "JavaScript Essentials",
      topics: ["ES6+ Syntax", "DOM Manipulation", "Event Handling", "Async Programming"],
    },
    {
      week: "Weeks 9-12",
      title: "React Fundamentals",
      topics: ["Components & JSX", "State & Props", "Event Handling", "Conditional Rendering"],
    },
    {
      week: "Weeks 13-16",
      title: "Advanced React",
      topics: ["Hooks", "Context API", "React Router", "State Management"],
    },
    {
      week: "Weeks 17-20",
      title: "Modern Development",
      topics: ["TypeScript", "Tailwind CSS", "Build Tools", "Testing"],
    },
    {
      week: "Weeks 21-24",
      title: "Capstone Project",
      topics: ["Project Planning", "Full-Stack Integration", "Deployment", "Portfolio Development"],
    },
  ]

  const learningOutcomes = [
    "Build responsive, modern web applications from scratch",
    "Master HTML5, CSS3, and modern JavaScript (ES6+)",
    "Develop proficiency in React and component-based architecture",
    "Implement responsive design principles and mobile-first development",
    "Use modern development tools and workflows",
    "Deploy applications to production environments",
    "Create a professional portfolio showcasing your projects",
    "Prepare for frontend developer job interviews",
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
                  <Code className="h-4 w-4 mr-2" />
                  Frontend Development Course
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold font-montserrat text-foreground leading-tight">
                  Master <span className="text-primary">Frontend Development</span> with React
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Learn to build stunning, responsive web applications with HTML, CSS, JavaScript, and React. This
                  comprehensive 24-week program features one-on-one tutoring with certified instructors and flexible
                  scheduling 2-3 times per week.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-2">
                  <Clock className="h-8 w-8 text-primary mx-auto" />
                  <div>
                    <p className="font-semibold">24 Weeks</p>
                    <p className="text-sm text-muted-foreground">Duration</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Users className="h-8 w-8 text-primary mx-auto" />
                  <div>
                    <p className="font-semibold">1-on-1</p>
                    <p className="text-sm text-muted-foreground">Tutoring</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Calendar className="h-8 w-8 text-primary mx-auto" />
                  <div>
                    <p className="font-semibold">2-3x/Week</p>
                    <p className="text-sm text-muted-foreground">Flexible</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Star className="h-8 w-8 text-primary mx-auto" />
                  <div>
                    <p className="font-semibold">Beginner</p>
                    <p className="text-sm text-muted-foreground">Level</p>
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
                src="/placeholder.svg?height=600&width=800&text=Frontend+Development+Coding+Session"
                alt="Frontend Development Coding Session"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course Curriculum */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">Course Curriculum</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive 24-week journey from HTML basics to advanced React development, designed to make you
              job-ready as a frontend developer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseModules.map((module, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{module.week}</Badge>
                    <div className="text-sm text-muted-foreground">Module {index + 1}</div>
                  </div>
                  <CardTitle className="font-montserrat">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">What You'll Learn</h2>
                <p className="text-xl text-muted-foreground">
                  By the end of this course, you'll have the skills and portfolio to land your first frontend developer
                  job.
                </p>
              </div>

              <div className="space-y-4">
                {learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-montserrat flex items-center space-x-2">
                    <Target className="h-6 w-6 text-primary" />
                    <span>Course Highlights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Hands-on Projects</span>
                    <Badge>6+ Projects</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Industry Tools</span>
                    <Badge>Latest Tech Stack</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Career Support</span>
                    <Badge>Job Placement</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Certification</span>
                    <Badge>Industry Recognized</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-montserrat flex items-center space-x-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span>Prerequisites</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Basic computer literacy</li>
                    <li>• No prior programming experience required</li>
                    <li>• Commitment to 2-3 sessions per week</li>
                    <li>• Access to a computer with internet</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold font-montserrat">
            Ready to Start Your Frontend Development Journey?
          </h2>
          <p className="text-xl opacity-90">
            Join hundreds of successful graduates who have launched their careers in frontend development. Get
            personalized one-on-one training with our certified instructors.
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
              <Link href="/contact">Schedule Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export const metadata = {
  title: "Frontend Development Course - 24 Weeks | Thynkcity",
  description:
    "Master HTML, CSS, JavaScript, and React with our comprehensive 24-week frontend development course. One-on-one tutoring with certified instructors.",
  keywords:
    "frontend development course, React training, HTML CSS JavaScript, web development bootcamp, one-on-one tutoring",
}
