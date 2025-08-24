"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import {
  ExternalLink,
  ArrowRight,
  TrendingUp,
  Users,
  Smartphone,
  Globe,
  ShoppingCart,
  GraduationCap,
} from "lucide-react"
import { useState } from "react"

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  const portfolioItems = [
    {
      id: 1,
      title: "PesaFlow Mobile Banking App",
      client: "PesaFlow Financials",
      industry: "FinTech",
      category: "mobile",
      services: ["Mobile App Development", "UI/UX Design", "Backend Development"],
      challenge:
        "PesaFlow needed a secure, user-friendly mobile banking solution that could serve Nigeria's diverse population, including users with limited smartphone experience.",
      solution:
        "We developed a comprehensive mobile banking app with intuitive navigation, biometric security, offline capabilities, and multi-language support for major Nigerian languages.",
      results: [
        "300,000+ downloads in first 6 months",
        "95% user satisfaction rating",
        "40% increase in digital transactions",
        "Reduced customer service calls by 60%",
      ],
      image: "/placeholder.svg?height=400&width=600&text=PesaFlow+mobile+banking+app+interface",
      technologies: ["React Native", "Node.js", "MongoDB", "AWS"],
      year: "2024",
    },
    {
      id: 2,
      title: "Ankara Designs E-commerce Platform",
      client: "Ankara Designs",
      industry: "Fashion & Retail",
      category: "web",
      services: ["E-commerce Development", "UI/UX Design", "Digital Marketing"],
      challenge:
        "A growing Nigerian fashion brand needed an online presence to reach customers beyond Lagos and compete with international fashion retailers.",
      solution:
        "We built a modern e-commerce platform with advanced product filtering, size guides, virtual try-on features, and integrated payment solutions for the African market.",
      results: [
        "500% increase in online sales",
        "Expanded to 12 African countries",
        "Average order value increased by 75%",
        "Customer acquisition cost reduced by 45%",
      ],
      image: "/placeholder.svg?height=400&width=600&text=Ankara+Designs+e-commerce+website+homepage",
      technologies: ["Next.js", "Shopify", "Tailwind CSS", "Stripe"],
      year: "2023",
    },
    {
      id: 3,
      title: "EduTrack School Management System",
      client: "Greenfield Academy",
      industry: "Education",
      category: "web",
      services: ["Web Application", "Database Design", "System Integration"],
      challenge:
        "A leading private school needed to digitize their operations, from student enrollment to grade management, while ensuring data security and ease of use for teachers.",
      solution:
        "We developed a comprehensive school management system with modules for admissions, attendance, grading, parent communication, and financial management.",
      results: [
        "Administrative efficiency improved by 80%",
        "Parent engagement increased by 200%",
        "Paper usage reduced by 90%",
        "Teacher productivity increased by 50%",
      ],
      image: "/placeholder.svg?height=400&width=600&text=EduTrack+school+management+dashboard",
      technologies: ["React", "Django", "PostgreSQL", "Redis"],
      year: "2023",
    },
    {
      id: 4,
      title: "AgriConnect Farmer Marketplace",
      client: "AgriConnect Nigeria",
      industry: "Agriculture",
      category: "mobile",
      services: ["Mobile App Development", "Marketplace Development", "Payment Integration"],
      challenge:
        "Small-scale farmers needed a platform to connect directly with buyers, eliminating middlemen and getting fair prices for their produce.",
      solution:
        "We created a mobile marketplace that connects farmers with buyers, includes weather forecasting, crop management tips, and secure payment processing.",
      results: [
        "15,000+ farmers onboarded",
        "Average farmer income increased by 35%",
        "Reduced post-harvest losses by 25%",
        "Connected farmers in 8 states",
      ],
      image: "/placeholder.svg?height=400&width=600&text=AgriConnect+farmer+marketplace+mobile+app",
      technologies: ["Flutter", "Firebase", "Google Maps API", "Paystack"],
      year: "2024",
    },
    {
      id: 5,
      title: "MedCare Telemedicine Platform",
      client: "MedCare Health Services",
      industry: "Healthcare",
      category: "web",
      services: ["Web Application", "Video Integration", "HIPAA Compliance"],
      challenge:
        "Healthcare provider wanted to offer remote consultations to patients in rural areas with limited access to medical facilities.",
      solution:
        "We built a secure telemedicine platform with video consultations, prescription management, appointment scheduling, and integration with existing medical records.",
      results: [
        "10,000+ remote consultations conducted",
        "Patient satisfaction score of 4.8/5",
        "Reduced travel time for patients by 70%",
        "Expanded healthcare access to 50+ rural communities",
      ],
      image: "/placeholder.svg?height=400&width=600&text=MedCare+telemedicine+platform+video+consultation",
      technologies: ["Vue.js", "WebRTC", "Node.js", "MySQL"],
      year: "2023",
    },
    {
      id: 6,
      title: "TechHub Coworking Space App",
      client: "TechHub Lagos",
      industry: "Real Estate & Coworking",
      category: "mobile",
      services: ["Mobile App Development", "IoT Integration", "Booking System"],
      challenge:
        "A modern coworking space needed a smart solution for space booking, access control, and community building among members.",
      solution:
        "We developed a comprehensive app with space booking, keyless entry, networking features, event management, and integrated billing.",
      results: [
        "Member satisfaction increased by 90%",
        "Space utilization improved by 60%",
        "Administrative costs reduced by 40%",
        "Community engagement increased by 150%",
      ],
      image: "/placeholder.svg?height=400&width=600&text=TechHub+coworking+space+mobile+app+interface",
      technologies: ["React Native", "IoT Sensors", "Express.js", "MongoDB"],
      year: "2024",
    },
  ]

  const categories = [
    { id: "all", name: "All Projects", icon: Globe },
    { id: "web", name: "Web Development", icon: Globe },
    { id: "mobile", name: "Mobile Apps", icon: Smartphone },
    { id: "ecommerce", name: "E-commerce", icon: ShoppingCart },
    { id: "education", name: "Education", icon: GraduationCap },
  ]

  const filteredItems =
    activeFilter === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === activeFilter)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-muted py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary border-primary">
                Our Work
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold font-montserrat text-foreground leading-tight">
                Transforming Ideas into <span className="text-primary">Digital Success Stories</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                Explore our portfolio of successful projects across various industries. Each case study demonstrates our
                commitment to delivering innovative solutions that drive real business results.
              </p>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>500+ Projects Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>200+ Happy Clients</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-primary" />
                <span>15+ Countries Served</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? "default" : "outline"}
                onClick={() => setActiveFilter(category.id)}
                className="flex items-center space-x-2"
              >
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-background/90 text-foreground">
                      {item.year}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="font-montserrat text-xl group-hover:text-primary transition-colors">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        <span className="font-semibold">{item.client}</span> • {item.industry}
                      </CardDescription>
                    </div>
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold font-montserrat mb-2">The Challenge</h4>
                      <p className="text-muted-foreground text-sm">{item.challenge}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold font-montserrat mb-2">Our Solution</h4>
                      <p className="text-muted-foreground text-sm">{item.solution}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold font-montserrat mb-2">Results Achieved</h4>
                      <ul className="space-y-1">
                        {item.results.map((result, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm">
                            <TrendingUp className="h-3 w-3 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full group-hover:bg-primary/90 transition-colors">
                      View Full Case Study
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold font-montserrat">Ready to Create Your Success Story?</h2>
          <p className="text-xl opacity-90">
            Let's discuss your project and explore how we can help you achieve similar results. Every great digital
            transformation starts with a conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
              <Link href="/contact">Start Your Project</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              <Link href="/services/consulting">View Our Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
