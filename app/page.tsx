import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollAnimation } from "@/components/scroll-animation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import {
  BookOpen,
  Users,
  Briefcase,
  TrendingUp,
  Code,
  Smartphone,
  Palette,
  Bot,
  GraduationCap,
  Building,
  Star,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Heart,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Thynkcity - Empowering Africa's Future Through Education & Innovation",
  description:
    "Your integrated platform for cutting-edge training, expert consulting, and transformative financial tools. Empowering learners and businesses across Africa with tech skills, robotics, AI solutions, and more.",
  keywords:
    "tech training Nigeria, web development agency Lagos, coding for kids Africa, robotics classes for children, AI solutions for business Africa, UI/UX design Nigeria, Edustash, Thynkcity, African EdTech, FinTech Africa, digital transformation Africa, data science training, cybersecurity courses",
  openGraph: {
    title: "Thynkcity - Empowering Africa's Future Through Education & Innovation",
    description:
      "Your integrated platform for cutting-edge training, expert consulting, and transformative financial tools. Empowering learners and businesses across Africa.",
    url: "https://thynkcity.com",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Thynkcity%20Main%20Logo-bcVE5HyamWS9SeUWcwQGUVGHkpQKQn.png",
        width: 1200,
        height: 630,
        alt: "Thynkcity - Africa's Leading EdTech & FinTech Ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thynkcity - Empowering Africa's Future Through Education & Innovation",
    description:
      "Your integrated platform for cutting-edge training, expert consulting, and transformative financial tools. Empowering learners and businesses across Africa.",
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-muted py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <Badge variant="outline" className="text-primary border-primary animate-fade-in animate-stagger-1">
                  Africa's Leading EdTech & FinTech Ecosystem
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold font-montserrat text-foreground leading-tight animate-fade-in animate-stagger-2">
                  Empowering Africa's Future. <span className="text-primary">One Skill, One Solution</span> at a Time.
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed animate-fade-in animate-stagger-3">
                  Your integrated platform for cutting-edge training, expert consulting, and transformative financial
                  tools. Join thousands of learners and businesses across Africa in building tomorrow's innovations
                  today.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animate-stagger-4">
                <Button size="lg" asChild className="text-lg px-8 py-6 btn-animate hover-lift">
                  <Link href="/services">Explore Our Services</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-lg px-8 py-6 bg-transparent btn-animate hover-lift"
                >
                  <Link href="/services/training">Start Learning Today</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground animate-fade-in animate-stagger-5">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>20,000+ Learners Empowered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>500+ Projects Delivered</span>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-right">
              <div className="relative z-10">
                <Image
                  src="/diverse-african-students-and-professionals-collabo.png"
                  alt="Diverse African students and professionals collaborating on technology projects in modern learning environment"
                  width={800}
                  height={600}
                  className="rounded-2xl shadow-2xl hover-scale smooth-transition"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-primary/10 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">
              Your Integrated Gateway to Learning, Earning, and Innovation
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Thynkcity is Africa's interconnected EdTech and FinTech ecosystem, designed to empower individuals and
              businesses through four core pillars.
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollAnimation className="animate-stagger-1">
              <Card className="text-center group hover:shadow-lg hover-lift smooth-transition">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 smooth-transition">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-montserrat">Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Comprehensive training programs in tech and non-tech skills for all ages.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation className="animate-stagger-2">
              <Card className="text-center group hover:shadow-lg hover-lift smooth-transition">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 smooth-transition">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-montserrat">Career</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Career development, job placement, and professional growth opportunities.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation className="animate-stagger-3">
              <Card className="text-center group hover:shadow-lg hover-lift smooth-transition">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 smooth-transition">
                    <Briefcase className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-montserrat">Entrepreneurship</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Business consulting and solutions to transform your innovative ideas into reality.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation className="animate-stagger-4">
              <Card className="text-center group hover:shadow-lg hover-lift smooth-transition">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 smooth-transition">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-montserrat">Finance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Financial tools and literacy programs to support your educational and business journey.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Core Offerings Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">Our Core Offerings</h2>
            <p className="text-xl text-muted-foreground">Choose your path to success with our comprehensive services</p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Expert Consulting Card */}
            <ScrollAnimation className="animate-stagger-1">
              <Card className="group hover:shadow-xl hover-lift smooth-transition border-2 hover:border-primary/20">
                <CardHeader className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 smooth-transition">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-montserrat">Expert Consulting</CardTitle>
                  </div>
                  <CardDescription className="text-lg">Build Your Vision with Our Expertise</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Transform your business with our comprehensive consulting services. From web applications to AI
                    solutions, we bring your digital vision to life.
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

                  <Button asChild className="w-full group-hover:bg-primary/90 smooth-transition btn-animate hover-lift">
                    <Link href="/services/consulting">
                      Get a Free Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollAnimation>

            {/* World-Class Training Card */}
            <ScrollAnimation className="animate-stagger-2">
              <Card className="group hover:shadow-xl hover-lift smooth-transition border-2 hover:border-primary/20">
                <CardHeader className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 smooth-transition">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-montserrat">World-Class Training</CardTitle>
                  </div>
                  <CardDescription className="text-lg">Unlock Your Potential with In-Demand Skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Master the skills of tomorrow with our comprehensive training programs. From coding to robotics, we
                    prepare you for the future of work.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Code className="h-5 w-5 text-primary" />
                      <span className="text-sm">Data Science</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-5 w-5 text-primary" />
                      <span className="text-sm">Frontend Dev</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <span className="text-sm">Cybersecurity</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bot className="h-5 w-5 text-primary" />
                      <span className="text-sm">Robotics for Kids</span>
                    </div>
                  </div>

                  <Button asChild className="w-full group-hover:bg-primary/90 smooth-transition btn-animate hover-lift">
                    <Link href="/services/training">
                      Browse Our Courses
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Featured Product: Edustash */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation>
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge variant="outline" className="text-primary border-primary">
                    Featured Product
                  </Badge>
                  <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">
                    Introducing Edustash: The Future of Tutoring in Africa
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Connect with expert tutors, manage payments securely, and access a thriving creator hub - all in one
                    revolutionary platform.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Zap className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold font-montserrat">AI-Powered Matching</h3>
                      <p className="text-muted-foreground">
                        Smart algorithms connect students with the perfect tutors based on learning style and needs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold font-montserrat">Secure Payments</h3>
                      <p className="text-muted-foreground">
                        Safe, transparent payment processing with built-in dispute resolution and escrow services.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Heart className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold font-montserrat">Creator Hub</h3>
                      <p className="text-muted-foreground">
                        Comprehensive tools for tutors to manage students, create content, and grow their teaching
                        business.
                      </p>
                    </div>
                  </div>
                </div>

                <Button size="lg" asChild className="btn-animate hover-lift">
                  <Link href="/products">
                    Learn More about Edustash
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </ScrollAnimation>

            <ScrollAnimation className="animate-stagger-2">
              <div className="relative">
                <Image
                  src="/modern-tutoring-app-dashboard-on-laptop-and-mobile.png"
                  alt="Edustash tutoring platform dashboard showing modern interface on laptop and mobile devices with African students"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-2xl hover-scale smooth-transition"
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* ThynkAI and ThynkBot Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-primary border-primary text-lg px-4 py-2">
              Flagship AI Products
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">
              Powered by <span className="text-primary">ThynkAI</span> & <span className="text-primary">ThynkBot</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our cutting-edge AI technologies power every aspect of the Thynkcity ecosystem, delivering intelligent
              solutions that transform education and business across Africa.
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* ThynkAI Card */}
            <ScrollAnimation className="animate-stagger-1">
              <Card className="group hover:shadow-2xl hover-lift smooth-transition border-2 hover:border-primary/30 bg-gradient-to-br from-background to-primary/5">
                <CardHeader className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center group-hover:scale-110 smooth-transition">
                      <Bot className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-montserrat text-primary">ThynkAI</CardTitle>
                      <CardDescription className="text-lg">Intelligent Learning Engine</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="relative">
                    <Image
                      src="/ai-brain-neural-network-visualization.png"
                      alt="AI brain with neural network connections representing ThynkAI's intelligent learning capabilities"
                      width={400}
                      height={250}
                      className="rounded-xl w-full object-cover hover-scale smooth-transition"
                    />
                  </div>
                  <p className="text-muted-foreground">
                    Our proprietary AI engine that personalizes learning experiences, matches students with ideal
                    tutors, and provides intelligent insights for educational success.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Personalized Learning Paths</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Smart Tutor Matching</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Predictive Analytics</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>

            {/* ThynkBot Card */}
            <ScrollAnimation className="animate-stagger-2">
              <Card className="group hover:shadow-2xl hover-lift smooth-transition border-2 hover:border-primary/30 bg-gradient-to-br from-background to-primary/5">
                <CardHeader className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center group-hover:scale-110 smooth-transition">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-montserrat text-primary">ThynkBot</CardTitle>
                      <CardDescription className="text-lg">AI Assistant & Automation</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="relative">
                    <Image
                      src="/chatbot-interface-african-students.png"
                      alt="Modern chatbot interface helping African students with educational queries and support"
                      width={400}
                      height={250}
                      className="rounded-xl w-full object-cover hover-scale smooth-transition"
                    />
                  </div>
                  <p className="text-muted-foreground">
                    An intelligent conversational AI that provides 24/7 support, automates administrative tasks, and
                    enhances user experience across all Thynkcity platforms.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">24/7 Student Support</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Automated Scheduling</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Intelligent Q&A</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>

          <ScrollAnimation className="text-center mt-12">
            <Button size="lg" asChild className="btn-animate hover-lift">
              <Link href="/products">
                Explore Our AI-Powered Ecosystem
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </ScrollAnimation>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">
              Trusted by Thousands Across Africa
            </h2>
            <p className="text-xl text-muted-foreground">See what our students, clients, and partners have to say</p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollAnimation className="animate-stagger-1">
              <Card className="text-center hover-lift smooth-transition">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground italic">
                    "The Frontend Development bootcamp at Thynkcity gave me the skills and confidence I needed to land
                    my first developer job. The instructors were amazing!"
                  </blockquote>
                  <div>
                    <p className="font-semibold">David Okoro</p>
                    <p className="text-sm text-muted-foreground">Frontend Developer</p>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation className="animate-stagger-2">
              <Card className="text-center hover-lift smooth-transition">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground italic">
                    "Thynkcity transformed our business with a beautiful e-commerce platform. Sales increased by 300% in
                    just 3 months!"
                  </blockquote>
                  <div>
                    <p className="font-semibold">Amina Hassan</p>
                    <p className="text-sm text-muted-foreground">CEO, Ankara Designs</p>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation className="animate-stagger-3">
              <Card className="text-center hover-lift smooth-transition">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground italic">
                    "My daughter loves the robotics classes! She's building amazing projects and her confidence in STEM
                    has soared."
                  </blockquote>
                  <div>
                    <p className="font-semibold">Mrs. Adebayo</p>
                    <p className="text-sm text-muted-foreground">Parent</p>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation className="animate-stagger-4">
              <Card className="text-center hover-lift smooth-transition">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground italic">
                    "Partnering with Thynkcity has elevated our school's tech curriculum. Our students are now coding
                    and building robots!"
                  </blockquote>
                  <div>
                    <p className="font-semibold">Principal Johnson</p>
                    <p className="text-sm text-muted-foreground">Greenfield Academy</p>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <ScrollAnimation>
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat animate-text-reveal">
              Ready to Transform Your Career or Business?
            </h2>
            <p className="text-xl opacity-90 animate-text-reveal animate-stagger-1">
              Join thousands of successful learners and businesses who have chosen Thynkcity as their partner in growth.
              Let's build the future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-stagger-2">
              <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6 btn-animate hover-lift">
                <Link href="/contact">Get Started Today</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent btn-animate hover-lift"
              >
                <Link href="/services">Explore All Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      <Footer />
    </div>
  )
}
