import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollAnimation } from "@/components/scroll-animation"
import Link from "next/link"
import {
  Building,
  GraduationCap,
  Users,
  Code,
  Bot,
  Palette,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
} from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-muted py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary border-primary">
                Our Services
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold font-montserrat text-foreground leading-tight">
                Comprehensive Solutions for <span className="text-primary">Your Success</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                From expert consulting to world-class training and strategic partnerships, we provide integrated
                solutions that empower individuals and businesses across Africa.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/register">Get Started Today</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-transparent">
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Consulting Services */}
            <ScrollAnimation className="animate-stagger-1">
              <Card className="group hover:shadow-xl hover-lift smooth-transition border-2 hover:border-primary/20 h-full">
                <CardHeader className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 smooth-transition">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-montserrat">Expert Consulting</CardTitle>
                  </div>
                  <CardDescription className="text-lg">
                    Transform your business with our comprehensive consulting services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    From web applications to AI solutions, we bring your digital vision to life with expertise tailored
                    for African markets.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Code className="h-5 w-5 text-primary" />
                      <span className="text-sm">Web & Mobile Apps</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bot className="h-5 w-5 text-primary" />
                      <span className="text-sm">AI Solutions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Palette className="h-5 w-5 text-primary" />
                      <span className="text-sm">UI/UX Design</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span className="text-sm">Digital Marketing</span>
                    </div>
                  </div>

                  <Button asChild className="w-full group-hover:bg-primary/90 smooth-transition">
                    <Link href="/services/consulting">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollAnimation>

            {/* Training Programs */}
            <ScrollAnimation className="animate-stagger-2">
              <Card className="group hover:shadow-xl hover-lift smooth-transition border-2 hover:border-primary/20 h-full">
                <CardHeader className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 smooth-transition">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-montserrat">Training Programs</CardTitle>
                  </div>
                  <CardDescription className="text-lg">
                    Master the skills of tomorrow with our comprehensive training
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    One-on-one classes with certified tutors, flexible scheduling, and 24-week minimum programs designed
                    for real-world success.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Code className="h-5 w-5 text-primary" />
                      <span className="text-sm">Frontend/Backend</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bot className="h-5 w-5 text-primary" />
                      <span className="text-sm">AI & Robotics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <span className="text-sm">Cybersecurity</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span className="text-sm">Data Science</span>
                    </div>
                  </div>

                  <Button asChild className="w-full group-hover:bg-primary/90 smooth-transition">
                    <Link href="/services/training">
                      Browse Courses
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollAnimation>

            {/* School Partnerships */}
            <ScrollAnimation className="animate-stagger-3">
              <Card className="group hover:shadow-xl hover-lift smooth-transition border-2 hover:border-primary/20 h-full">
                <CardHeader className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 smooth-transition">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-montserrat">School Partnerships</CardTitle>
                  </div>
                  <CardDescription className="text-lg">
                    Elevate your institution with our educational partnerships
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Comprehensive programs that integrate technology education into your curriculum with ongoing support
                    and teacher training.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-sm">Curriculum Integration</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-sm">Teacher Training</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-sm">Equipment & Resources</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-sm">Ongoing Support</span>
                    </div>
                  </div>

                  <Button asChild className="w-full group-hover:bg-primary/90 smooth-transition">
                    <Link href="/services/partnerships">
                      Partner With Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* AI Products Highlight */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-primary border-primary">
              Flagship AI Products
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">
              Powered by <span className="text-primary">ThynkAI & ThynkBot</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our core AI technologies power intelligent solutions across all our services, delivering personalized
              experiences and automated insights that drive real results.
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollAnimation className="animate-stagger-1">
              <Card className="group hover:shadow-xl hover-lift smooth-transition border-2 hover:border-primary/20">
                <CardHeader className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 smooth-transition">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-montserrat">ThynkAI</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Our flagship AI engine that powers intelligent matching in Edustash, personalized learning paths,
                    and automated business insights across all our platforms.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm">Smart Tutor-Student Matching</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm">Personalized Learning Analytics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm">Predictive Performance Insights</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation className="animate-stagger-2">
              <Card className="group hover:shadow-xl hover-lift smooth-transition border-2 hover:border-primary/20">
                <CardHeader className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 smooth-transition">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-montserrat">ThynkBot</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Advanced conversational AI that provides 24/7 support, automated customer service, and intelligent
                    assistance across all our platforms and client solutions.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm">Multi-language Support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm">Context-Aware Responses</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm">Seamless Human Handoff</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ScrollAnimation>
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat">Ready to Transform Your Future?</h2>
            <p className="text-xl opacity-90">
              Join thousands who have chosen Thynkcity as their partner in growth. Whether you're an individual looking
              to upskill or a business ready to innovate, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
                <Link href="/register">Register Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      <Footer />
    </div>
  )
}
