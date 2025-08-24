import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import {
  Code,
  Smartphone,
  Palette,
  BarChart3,
  Bot,
  Search,
  FileText,
  Monitor,
  ArrowRight,
  CheckCircle,
  Users,
  Lightbulb,
  Target,
  Rocket,
} from "lucide-react"

export default function ConsultingPage() {
  const services = [
    {
      icon: Code,
      title: "Websites & Web Applications",
      description:
        "Custom websites and powerful web applications built with modern technologies for optimal performance and user experience.",
    },
    {
      icon: Smartphone,
      title: "Mobile Applications",
      description:
        "Native and cross-platform mobile apps that engage users and drive business growth across iOS and Android platforms.",
    },
    {
      icon: Palette,
      title: "UI/UX & Product Design",
      description:
        "User-centered design solutions that create intuitive, beautiful, and conversion-focused digital experiences.",
    },
    {
      icon: Palette,
      title: "Graphics Design",
      description:
        "Professional visual identity, branding, and marketing materials that communicate your brand's unique story.",
    },
    {
      icon: BarChart3,
      title: "Project Management",
      description:
        "Expert project coordination and management services to ensure your initiatives are delivered on time and within budget.",
    },
    {
      icon: Bot,
      title: "Robotics & AI Solutions",
      description:
        "Cutting-edge artificial intelligence and robotics solutions to automate processes and drive innovation.",
    },
    {
      icon: Search,
      title: "SEO & Digital Marketing",
      description:
        "Comprehensive digital marketing strategies to increase your online visibility and drive qualified traffic.",
    },
    {
      icon: FileText,
      title: "Research & Development",
      description: "In-depth research and strategic development services to help you make informed business decisions.",
    },
    {
      icon: Monitor,
      title: "Desktop Applications",
      description: "Powerful desktop software solutions tailored to your specific business needs and workflows.",
    },
    {
      icon: FileText,
      title: "Content Assignment & Project Writing",
      description:
        "Professional content creation, technical writing, and documentation services for your business needs.",
    },
  ]

  const processSteps = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description: "We dive deep into understanding your business goals, target audience, and technical requirements.",
    },
    {
      number: "02",
      title: "Design & Development",
      description:
        "Our expert team creates and builds your solution using industry best practices and cutting-edge technologies.",
    },
    {
      number: "03",
      title: "Testing & Launch",
      description: "Rigorous testing ensures quality and performance before we launch your solution to the world.",
    },
    {
      number: "04",
      title: "Support & Growth",
      description:
        "Ongoing support, maintenance, and optimization to ensure your solution continues to deliver results.",
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
                  Expert Consulting Services
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold font-montserrat text-foreground leading-tight">
                  Your Strategic Partner in <span className="text-primary">Digital Innovation</span> and Growth
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Transform your business with our comprehensive consulting services. From web applications to AI
                  solutions, we bring your digital vision to life with expertise, innovation, and results-driven
                  approaches.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/contact">Request a Quote</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-transparent">
                  <Link href="/portfolio">View Our Work</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>500+ Projects Delivered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>98% Client Satisfaction</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Business+team+collaborating+on+digital+solutions"
                alt="Business team collaborating on digital solutions"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">
              Comprehensive Business Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From concept to completion, we offer end-to-end services to help your business thrive in the digital age.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-montserrat">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">Our Proven Process</h2>
            <p className="text-xl text-muted-foreground">
              A systematic approach that ensures successful project delivery every time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl font-montserrat mb-4">
                      {step.number}
                    </div>
                    <CardTitle className="font-montserrat">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">
                  Why Businesses Choose Thynkcity
                </h2>
                <p className="text-xl text-muted-foreground">
                  We combine technical expertise with deep understanding of the African market to deliver solutions that
                  truly work.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-montserrat mb-2">Expert Team</h3>
                    <p className="text-muted-foreground">
                      Our skilled professionals bring years of experience and cutting-edge knowledge to every project.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Lightbulb className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-montserrat mb-2">Innovation Focus</h3>
                    <p className="text-muted-foreground">
                      We stay ahead of technology trends to provide you with future-ready solutions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-montserrat mb-2">Results-Driven</h3>
                    <p className="text-muted-foreground">
                      Every solution is designed to deliver measurable business value and ROI.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Rocket className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-montserrat mb-2">Fast Delivery</h3>
                    <p className="text-muted-foreground">
                      Agile methodologies ensure quick turnaround without compromising quality.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600&text=Professional+team+delivering+digital+solutions"
                alt="Professional team delivering digital solutions"
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
          <h2 className="text-3xl lg:text-4xl font-bold font-montserrat">Ready to Transform Your Business?</h2>
          <p className="text-xl opacity-90">
            Let's discuss your project and explore how our expert consulting services can help you achieve your business
            goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              <Link href="/portfolio">View Our Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
