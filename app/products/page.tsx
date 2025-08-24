import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import {
  Zap,
  Shield,
  Heart,
  Users,
  TrendingUp,
  Briefcase,
  CreditCard,
  BookOpen,
  Bot,
  ArrowRight,
  CheckCircle,
  Smartphone,
  Globe,
} from "lucide-react"

export default function ProductsPage() {
  const ecosystemProducts = [
    {
      icon: TrendingUp,
      name: "SkillSprint",
      category: "Career Development",
      description:
        "Accelerated skill development platform with personalized learning paths and industry certifications.",
    },
    {
      icon: Users,
      name: "NextGen",
      category: "Youth Development",
      description:
        "Comprehensive youth empowerment platform focusing on leadership, entrepreneurship, and life skills.",
    },
    {
      icon: Briefcase,
      name: "Talent AQ",
      category: "Talent Management",
      description:
        "Advanced talent acquisition and management system connecting skilled professionals with opportunities.",
    },
    {
      icon: Bot,
      name: "Technic",
      category: "Technical Solutions",
      description: "AI-powered technical support and automation platform for businesses and educational institutions.",
    },
    {
      icon: CreditCard,
      name: "ThynkPay",
      category: "FinTech",
      description: "Secure payment processing and financial management solution designed for the African market.",
    },
    {
      icon: BookOpen,
      name: "ThynkEd",
      category: "Education Management",
      description:
        "Comprehensive school management system with student tracking, curriculum management, and analytics.",
    },
  ]

  const edustashFeatures = [
    {
      icon: Zap,
      title: "AI-Powered Matching",
      description:
        "Smart algorithms connect students with the perfect tutors based on learning style, subject needs, and personality compatibility.",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description:
        "Safe, transparent payment processing with built-in dispute resolution, escrow services, and multiple payment options.",
    },
    {
      icon: Heart,
      title: "Creator Hub",
      description:
        "Comprehensive tools for tutors to manage students, create content, track progress, and grow their teaching business.",
    },
    {
      icon: Users,
      title: "Community Learning",
      description:
        "Interactive study groups, peer-to-peer learning, and collaborative projects that enhance the educational experience.",
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Seamless experience across all devices with offline capabilities and real-time synchronization.",
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description:
        "Support for major African languages and dialects to ensure accessibility across diverse communities.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-muted py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary border-primary">
                Thynkcity Ecosystem
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold font-montserrat text-foreground leading-tight">
                Interconnected Solutions for <span className="text-primary">Africa's Digital Future</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                Discover our comprehensive suite of products designed to work together seamlessly, creating an
                integrated ecosystem that empowers learners, educators, and businesses across Africa.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="#edustash">Explore Edustash</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-transparent">
                <Link href="#ecosystem">View All Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product: Edustash */}
      <section id="edustash" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-primary border-primary">
                  Flagship Product
                </Badge>
                <h2 className="text-3xl lg:text-5xl font-bold font-montserrat text-foreground">
                  Edustash: Revolutionizing Tutoring in Africa
                </h2>
                <p className="text-xl text-muted-foreground">
                  The most comprehensive tutoring platform designed specifically for African learners, connecting
                  students with expert tutors while providing powerful tools for educational success.
                </p>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>10,000+ Active Students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>2,000+ Expert Tutors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>15+ Countries</span>
                </div>
              </div>

              <Button size="lg" asChild>
                <Link href="/contact">
                  Get Early Access
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Edustash+platform+interface+showing+tutor+matching+and+learning+dashboard"
                alt="Edustash platform interface"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Edustash Features */}
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <h3 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">
                Powerful Features for Modern Learning
              </h3>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Every feature is designed with African learners in mind, addressing unique challenges and opportunities
                in our educational landscape.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {edustashFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-montserrat">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Products */}
      <section id="ecosystem" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">
              The Complete Thynkcity Ecosystem
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our interconnected suite of products works together to create a comprehensive platform for education,
              career development, and business growth across Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ecosystemProducts.map((product, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <product.icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  <CardTitle className="font-montserrat">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{product.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Badge variant="outline" className="text-primary border-primary">
                      Coming Soon
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Benefits */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">
                  Why an Integrated Ecosystem Matters
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our products are designed to work together, creating synergies that amplify the impact of each
                  individual solution.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-montserrat mb-2">Seamless Data Flow</h3>
                    <p className="text-muted-foreground">
                      Information flows seamlessly between products, creating a unified experience and eliminating data
                      silos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-montserrat mb-2">Holistic Development</h3>
                    <p className="text-muted-foreground">
                      Address every aspect of personal and professional growth from education to career to
                      entrepreneurship.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-montserrat mb-2">Cost Efficiency</h3>
                    <p className="text-muted-foreground">
                      Integrated solutions reduce costs and complexity while maximizing value for users and
                      institutions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-montserrat mb-2">African-Centric Design</h3>
                    <p className="text-muted-foreground">
                      Every product is designed with African contexts, challenges, and opportunities in mind.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600&text=Interconnected+ecosystem+diagram+showing+product+integration"
                alt="Thynkcity ecosystem integration diagram"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold font-montserrat">
            Ready to Experience the Future of Education?
          </h2>
          <p className="text-xl opacity-90">
            Join the thousands of learners, educators, and businesses who are already part of the Thynkcity ecosystem.
            Be among the first to access our revolutionary products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
              <Link href="/contact">Get Early Access</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              <Link href="/services">Explore Our Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
