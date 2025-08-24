import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import {
  Code,
  Bot,
  Brain,
  Palette,
  DollarSign,
  Globe,
  Users,
  CheckCircle,
  Award,
  TrendingUp,
  BookOpen,
  Star,
  Building,
} from "lucide-react"

export default function PartnershipsPage() {
  const offerings = [
    {
      icon: Code,
      title: "Coding & Programming",
      description:
        "Comprehensive coding curriculum covering Scratch, Python, JavaScript, and web development for all age groups.",
      benefits: ["Age-appropriate curriculum", "Hands-on projects", "Industry-standard tools", "Progress tracking"],
    },
    {
      icon: Bot,
      title: "Robotics & Engineering",
      description: "STEM-focused robotics programs using LEGO Mindstorms, Arduino, and other cutting-edge platforms.",
      benefits: ["Build and program robots", "Engineering principles", "Problem-solving skills", "Team collaboration"],
    },
    {
      icon: Brain,
      title: "Artificial Intelligence",
      description: "Introduction to AI concepts, machine learning basics, and ethical AI for the next generation.",
      benefits: ["AI fundamentals", "Machine learning basics", "Ethical considerations", "Future-ready skills"],
    },
    {
      icon: Palette,
      title: "Digital Design & Creativity",
      description: "Creative technology programs including digital art, UI/UX design, and multimedia production.",
      benefits: ["Creative expression", "Design thinking", "Digital tools mastery", "Portfolio development"],
    },
    {
      icon: DollarSign,
      title: "Financial Literacy",
      description: "Age-appropriate financial education covering budgeting, saving, investing, and entrepreneurship.",
      benefits: ["Money management", "Investment basics", "Entrepreneurship", "Economic understanding"],
    },
    {
      icon: Globe,
      title: "Custom School Websites",
      description: "Professional website development and maintenance services tailored for educational institutions.",
      benefits: ["Professional design", "Easy content management", "Mobile responsive", "SEO optimized"],
    },
  ]

  const benefits = [
    {
      icon: Award,
      title: "Enhanced School Profile",
      description:
        "Position your school as a forward-thinking institution that prepares students for the digital future.",
    },
    {
      icon: TrendingUp,
      title: "Improved Student Outcomes",
      description:
        "Students develop critical thinking, problem-solving, and technical skills that boost academic performance.",
    },
    {
      icon: Users,
      title: "Teacher Training & Support",
      description: "Comprehensive training for your staff to ensure program sustainability and continuous improvement.",
    },
    {
      icon: BookOpen,
      title: "Modern Curriculum Integration",
      description: "Seamlessly integrate technology education into your existing curriculum and academic calendar.",
    },
  ]

  const partnerSchools = [
    {
      name: "Greenfield Academy",
      location: "Lagos, Nigeria",
      program: "Full STEM Integration",
      testimonial:
        "Partnering with Thynkcity has elevated our school's tech curriculum. Our students are now coding and building robots!",
    },
    {
      name: "Bright Future International",
      location: "Abuja, Nigeria",
      program: "Robotics & AI Program",
      testimonial:
        "The robotics program has been a game-changer. Students are more engaged and excited about learning.",
    },
    {
      name: "Excellence Primary School",
      location: "Port Harcourt, Nigeria",
      program: "Coding for Kids",
      testimonial:
        "Our young learners are now creating their own games and animations. The transformation is remarkable!",
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
                  Educational Partnerships
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold font-montserrat text-foreground leading-tight">
                  Empowering the Next Generation. <span className="text-primary">Partner with Thynkcity.</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Transform your school into a hub of innovation with our comprehensive technology education programs.
                  We provide everything you need to prepare your students for the digital future.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/contact">Partner With Us</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-transparent">
                  <Link href="#programs">View Programs</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>50+ Partner Schools</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>10,000+ Students Impacted</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Students+in+classroom+learning+technology+and+robotics"
                alt="Students in classroom learning technology and robotics"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Offerings for Schools */}
      <section id="programs" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">
              Comprehensive Programs for Schools
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From coding to robotics, financial literacy to custom websites, we offer everything your school needs to
              thrive in the digital age.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerings.map((offering, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-4">
                    <offering.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-montserrat">{offering.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{offering.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Key Benefits:</p>
                    <ul className="space-y-1">
                      {offering.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits of Partnership */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">
              Why Partner With Thynkcity?
            </h2>
            <p className="text-xl text-muted-foreground">
              We provide comprehensive support to ensure your technology education program succeeds and thrives.
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

      {/* Partner Success Stories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">
              Success Stories from Partner Schools
            </h2>
            <p className="text-xl text-muted-foreground">
              See how our partnerships have transformed education and student outcomes across Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnerSchools.map((school, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-montserrat">{school.name}</CardTitle>
                  <CardDescription>{school.location}</CardDescription>
                  <Badge variant="outline" className="text-primary border-primary">
                    {school.program}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground italic">"{school.testimonial}"</blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">
              How Our Partnership Works
            </h2>
            <p className="text-xl text-muted-foreground">
              A simple, structured approach to implementing technology education in your school.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl font-montserrat">
                1
              </div>
              <h3 className="text-xl font-semibold font-montserrat">Consultation</h3>
              <p className="text-muted-foreground">
                We assess your school's needs and design a customized program that fits your goals and budget.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl font-montserrat">
                2
              </div>
              <h3 className="text-xl font-semibold font-montserrat">Setup & Training</h3>
              <p className="text-muted-foreground">
                We provide all necessary equipment, materials, and comprehensive training for your teaching staff.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl font-montserrat">
                3
              </div>
              <h3 className="text-xl font-semibold font-montserrat">Implementation</h3>
              <p className="text-muted-foreground">
                Launch the program with ongoing support and guidance to ensure smooth integration into your curriculum.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl font-montserrat">
                4
              </div>
              <h3 className="text-xl font-semibold font-montserrat">Growth & Support</h3>
              <p className="text-muted-foreground">
                Continuous support, program updates, and expansion opportunities to keep your school at the forefront of
                education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold font-montserrat">Ready to Transform Your School?</h2>
          <p className="text-xl opacity-90">
            Join the growing network of forward-thinking schools that are preparing their students for the digital
            future. Let's discuss how we can customize a program for your institution.
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
              <Link href="/contact">Request Information</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
