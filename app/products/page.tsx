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
  Brain,
  MessageSquare,
} from "lucide-react"

export default function ProductsPage() {
  const flagshipProducts = [
    {
      icon: Brain,
      name: "ThynkAI",
      category: "AI Engine",
      description:
        "Our proprietary AI engine that personalizes learning experiences, matches students with ideal tutors, and provides intelligent insights for educational success.",
      features: ["Personalized Learning Paths", "Smart Tutor Matching", "Predictive Analytics", "Performance Insights"],
      image: "/ai-brain-neural-network-visualization.png",
      alt: "AI brain with neural network connections representing ThynkAI's intelligent learning capabilities",
    },
    {
      icon: MessageSquare,
      name: "ThynkBot",
      category: "AI Assistant",
      description:
        "An intelligent conversational AI that provides 24/7 support, automates administrative tasks, and enhances user experience across all Thynkcity platforms.",
      features: ["24/7 Student Support", "Automated Scheduling", "Intelligent Q&A", "Multi-language Support"],
      image: "/chatbot-interface-african-students.png",
      alt: "Modern chatbot interface helping African students with educational queries and support",
    },
  ]

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
                AI-Powered Solutions for <span className="text-primary">Africa's Digital Future</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                Discover our comprehensive suite of AI-powered products designed to work together seamlessly, creating
                an integrated ecosystem that empowers learners, educators, and businesses across Africa.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="#flagship">Explore AI Products</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-transparent">
                <Link href="#edustash">View Edustash</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="flagship" className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-primary border-primary text-lg px-4 py-2">
              Flagship AI Products
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">
              The AI Engine Behind Everything We Do
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              ThynkAI and ThynkBot are the core technologies powering our entire ecosystem, delivering intelligent
              solutions that transform education and business across Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {flagshipProducts.map((product, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30 bg-gradient-to-br from-background to-primary/5"
              >
                <CardHeader className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <product.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-montserrat text-primary">{product.name}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {product.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.alt}
                      width={500}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-muted-foreground text-lg">{product.description}</p>

                  <div className="space-y-3">
                    <h4 className="font-semibold font-montserrat">Key Capabilities:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {product.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link href="/contact">
                Learn More About Our AI Technology
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
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
                  Powered by ThynkAI & ThynkBot
                </Badge>
                <h2 className="text-3xl lg:text-5xl font-bold font-montserrat text-foreground">
                  Edustash: Revolutionizing Tutoring in Africa
                </h2>
                <p className="text-xl text-muted-foreground">
                  The most comprehensive tutoring platform designed specifically for African learners, connecting
                  students with expert tutors while providing AI-powered tools for educational success.
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
                src="/modern-tutoring-app-dashboard-on-laptop-and-mobile.png"
                alt="Edustash tutoring platform dashboard showing modern interface on laptop and mobile devices with African students"
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
                AI-Enhanced Features for Modern Learning
              </h3>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Every feature is powered by ThynkAI and enhanced by ThynkBot, designed with African learners in mind,
                addressing unique challenges and opportunities in our educational landscape.
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
              Our interconnected suite of products, all powered by ThynkAI and enhanced by ThynkBot, works together to
              create a comprehensive platform for education, career development, and business growth across Africa.
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
                  Why an AI-Powered Ecosystem Matters
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our products are designed to work together with ThynkAI and ThynkBot at the core, creating synergies
                  that amplify the impact of each individual solution through intelligent automation and
                  personalization.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-montserrat mb-2">Intelligent Data Flow</h3>
                    <p className="text-muted-foreground">
                      ThynkAI processes information seamlessly between products, creating personalized experiences and
                      eliminating data silos through intelligent automation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-montserrat mb-2">AI-Enhanced Development</h3>
                    <p className="text-muted-foreground">
                      Address every aspect of personal and professional growth with AI-powered insights from education
                      to career to entrepreneurship.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-montserrat mb-2">Smart Automation</h3>
                    <p className="text-muted-foreground">
                      ThynkBot automates routine tasks and provides 24/7 support, reducing costs and complexity while
                      maximizing value for users and institutions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-montserrat mb-2">African-Centric AI</h3>
                    <p className="text-muted-foreground">
                      Every AI model is trained with African contexts, languages, and cultural nuances in mind, ensuring
                      relevance and effectiveness.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/ai-ecosystem-integration-diagram.png"
                alt="Thynkcity AI-powered ecosystem integration diagram showing ThynkAI and ThynkBot connecting all products"
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
          <h2 className="text-3xl lg:text-4xl font-bold font-montserrat">Ready to Experience AI-Powered Education?</h2>
          <p className="text-xl opacity-90">
            Join the thousands of learners, educators, and businesses who are already part of the Thynkcity AI
            ecosystem. Be among the first to access our revolutionary AI-powered products.
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
