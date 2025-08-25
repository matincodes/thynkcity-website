import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Lightbulb, Users, Shield, Heart, Target, Eye, CheckCircle } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We constantly push boundaries and embrace cutting-edge technologies to create solutions that transform lives and businesses across Africa.",
    },
    {
      icon: Users,
      title: "Empowerment",
      description:
        "We believe in empowering individuals and communities with the skills, tools, and opportunities they need to thrive in the digital economy.",
    },
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We operate with transparency, honesty, and ethical practices in all our interactions, building trust with our students, clients, and partners.",
    },
    {
      icon: Heart,
      title: "Community",
      description:
        "We foster a supportive community where learners, educators, and businesses collaborate to create positive change across Africa.",
    },
  ]

  const teamMembers = [
    {
      name: "Abdulmatin Adeniji",
      role: "Founder & CEO",
      bio: "Visionary entrepreneur and tech leader passionate about transforming African education. With extensive experience in EdTech and a deep commitment to empowering the next generation of African innovators.",
      image: "/team/abdulmatin-adeniji.jpg",
    },
    {
      name: "Idris Muhammed",
      role: "Co-founder & Chief Operations Officer",
      bio: "Strategic operations leader with deep expertise in scaling educational programs across African markets and building sustainable business operations.",
      image: "/team/idris-muhammed.jpg",
    },
    {
      name: "Fawaz Adeniji",
      role: "Lead Developer",
      bio: "Full-stack engineer and technical architect leading the development of innovative educational technology solutions and AI-powered platforms.",
      image: "/team/fawaz-adeniji.jpg",
    },
    {
      name: "Divine Effiong",
      role: "Lead Designer",
      bio: "Creative design leader specializing in user experience and interface design for educational platforms, ensuring accessibility and engagement across diverse user bases.",
      image: "/team/divine-effiong.jpg",
    },
    {
      name: "Sarah Ikechukwu",
      role: "Chief Technology Officer",
      bio: "Full-stack engineer and AI specialist. Led development teams at top tech companies before joining Thynkcity's mission.",
      image: "/team/sarah-ikechukwu.jpg",
    },
    {
      name: "Michael Adeyemi",
      role: "Head of Education",
      bio: "Former university professor and curriculum designer with expertise in STEM education and youth development programs.",
      image: "/team/michael-adeyemi.jpg",
    },
    {
      name: "Fatima Al-Hassan",
      role: "Head of Business Development",
      bio: "Strategic partnerships expert with deep knowledge of African markets and extensive network across the continent.",
      image: "/team/fatima-al-hassan.jpg",
    },
  ]

  const milestones = [
    {
      year: "2020",
      title: "Foundation",
      description:
        "Thynkcity was founded by Abdulmatin Adeniji with a vision to bridge the digital skills gap in Africa.",
    },
    {
      year: "2021",
      title: "First Programs Launch",
      description: "Launched our first coding bootcamps and consulting services in Lagos, Nigeria.",
    },
    {
      year: "2022",
      title: "Expansion Across Nigeria",
      description: "Extended operations to Abuja, Port Harcourt, and Kano, training over 5,000 students.",
    },
    {
      year: "2023",
      title: "Continental Growth",
      description: "Expanded to Ghana, Kenya, and South Africa, establishing partnerships with 50+ schools.",
    },
    {
      year: "2024",
      title: "Ecosystem Launch",
      description: "Introduced the integrated Thynkcity ecosystem with Edustash as our flagship product.",
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
                  About Thynkcity
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold font-montserrat text-foreground leading-tight">
                  Empowering Africa's <span className="text-primary">Digital Renaissance</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  We are more than an EdTech company. We are catalysts of change, architects of dreams, and builders of
                  Africa's digital future. Our mission is to unlock the continent's vast potential through education,
                  innovation, and technology.
                </p>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Founded in 2020</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>15+ Countries</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>20,000+ Lives Impacted</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Diverse+African+team+collaborating+on+innovative+solutions"
                alt="Thynkcity team collaborating"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-4">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-montserrat">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To be Africa's leading interconnected EdTech and FinTech ecosystem, empowering millions of learners
                  and businesses to thrive in the global digital economy while preserving and celebrating our rich
                  African heritage and values.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-montserrat">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To democratize access to world-class education and innovative technology solutions across Africa,
                  fostering a generation of skilled professionals, successful entrepreneurs, and digitally empowered
                  communities that drive sustainable economic growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">
                  Our Story: From Vision to Reality
                </h2>
                <p className="text-xl text-muted-foreground">
                  Thynkcity was born from a simple yet powerful observation: Africa has incredible talent, but limited
                  access to world-class education and technology opportunities.
                </p>
              </div>

              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  In 2023, our founder Abdulmatin Adeniji, driven by a passion for education and technology, established
                  Thynkcity with a clear mission. Having witnessed firsthand the incredible potential of African talent
                  and the barriers they face in accessing quality education, he set out to create a platform that would
                  bridge this gap and unlock opportunities for millions across the continent.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  What started as a vision to democratize access to technology education has evolved into a
                  comprehensive ecosystem that addresses every aspect of personal and professional development. Under
                  Abdulmatin's leadership, alongside co-founder and Chief Operations Officer Idris Muhammed, Lead
                  Developer Fawaz Adeniji, and Lead Designer Divine Effiong, we've trained thousands of students, helped
                  hundreds of businesses transform digitally, and partnered with schools across the continent to
                  modernize education.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Today, Thynkcity stands as a testament to what's possible when African innovation meets global
                  standards. We're not just building a company; we're building the foundation for Africa's digital
                  future, one student, one business, and one community at a time.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold font-montserrat text-foreground">Our Journey</h3>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold font-montserrat">
                      {milestone.year}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold font-montserrat text-lg">{milestone.title}</h4>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These values guide every decision we make and every solution we create, ensuring we stay true to our
              mission of empowering Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
              >
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-montserrat">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">Meet Our Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate leaders with diverse backgrounds united by a common vision: transforming Africa through
              education and technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardTitle className="font-montserrat">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-semibold">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">Our Impact in Numbers</h2>
            <p className="text-xl text-muted-foreground">
              Measurable results that demonstrate our commitment to transforming lives across Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="text-4xl font-bold font-montserrat text-primary">20,000+</div>
                  <p className="text-muted-foreground">Students Trained</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="text-4xl font-bold font-montserrat text-primary">500+</div>
                  <p className="text-muted-foreground">Projects Delivered</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="text-4xl font-bold font-montserrat text-primary">50+</div>
                  <p className="text-muted-foreground">Partner Schools</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="text-4xl font-bold font-montserrat text-primary">15+</div>
                  <p className="text-muted-foreground">Countries Served</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold font-montserrat">
            Join Us in Building Africa's Digital Future
          </h2>
          <p className="text-xl opacity-90">
            Whether you're a learner, educator, business owner, or investor, there's a place for you in the Thynkcity
            community. Let's create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
              <Link href="/contact">Get in Touch</Link>
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
