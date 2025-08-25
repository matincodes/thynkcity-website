import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RegistrationForm } from "./RegistrationForm"
import Link from "next/link"
import { ArrowLeft, Users, GraduationCap, Heart } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <Button variant="outline" asChild>
              <Link href="/services">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Link>
            </Button>

            <div className="text-center space-y-4">
              <Badge variant="outline" className="text-primary border-primary">
                Registration
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold font-montserrat text-foreground leading-tight">
                Start Your <span className="text-primary">Learning Journey</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Register yourself or your children for our world-class training programs. One-on-one classes with
                certified tutors, flexible scheduling, and comprehensive support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Options */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Registration Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-montserrat">Registration Form</CardTitle>
                  <CardDescription>
                    Fill out the form below to register for our training programs. We'll contact you within 24 hours to
                    discuss your learning goals and schedule.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RegistrationForm />
                </CardContent>
              </Card>
            </div>

            {/* Information Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="font-montserrat">Our Approach</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm">One-on-One Classes</h4>
                      <p className="text-sm text-muted-foreground">Personalized attention with certified tutors</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Flexible Scheduling</h4>
                      <p className="text-sm text-muted-foreground">2-3 classes per week at your convenience</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">24-Week Minimum</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive programs for real mastery</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="font-montserrat">For Parents</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Register multiple children with ease. Our system allows you to manage all your children's learning
                    journeys from one account.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-primary" />
                      <span>Family dashboard</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-primary" />
                      <span>Progress tracking</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-primary" />
                      <span>Sibling discounts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-montserrat">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Have questions about our programs or need assistance with registration?
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                      <Link href="/contact">Contact Support</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                      <Link href="/services/training">View All Courses</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
