"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  Building,
  GraduationCap,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [userType, setUserType] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    service: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const emailData = {
        to: "thynkcity@gmail.com",
        subject: `New Contact Form Submission - ${userType || "General Inquiry"}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>User Type:</strong> ${userType || "Not specified"}</p>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone || "Not provided"}</p>
          ${formData.company ? `<p><strong>${userType === "business" ? "Company" : "School"}:</strong> ${formData.company}</p>` : ""}
          ${formData.service ? `<p><strong>Service of Interest:</strong> ${formData.service}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${formData.message.replace(/\n/g, "<br>")}</p>
        `,
      }

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
          service: "",
        })
        setUserType("")
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "build@thynkcity.com",
      description: "Send us an email and we'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+234 902 532 0287",
      description: "Speak directly with our team during business hours",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "10 Adeniji Street, Oregun",
      description: "Ikeja, Lagos, Nigeria",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon - Fri: 9AM - 6PM",
      description: "West Africa Time (WAT)",
    },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ]

  const getServiceOptions = () => {
    switch (userType) {
      case "individual":
        return [
          "Frontend Development Training",
          "Backend Development Training",
          "Data Science Bootcamp",
          "Cybersecurity Course",
          "Mobile App Development",
          "UI/UX Design Training",
          "3D Animation Course",
          "DevOps Training",
          "Cloud Computing Course",
          "Project Management Training",
          "Digital Marketing Course",
          "Kids Coding Program",
          "AI using Teachable Machine (Kids)",
          "App Inventor (Kids)",
          "Game Development (Kids)",
          "Creative Writing (Kids)",
          "Mathematics (Kids)",
          "Other Training Program",
        ]
      case "business":
        return [
          "Web Development",
          "Mobile App Development",
          "UI/UX Design",
          "AI Solutions",
          "Digital Marketing",
          "E-commerce Development",
          "Custom Software",
          "Other Consulting Service",
        ]
      case "school":
        return [
          "Coding & Programming Curriculum",
          "Robotics Program",
          "AI Education",
          "Financial Literacy Workshop",
          "Custom School Website",
          "Teacher Training",
          "Full Partnership Program",
        ]
      default:
        return ["General Inquiry"]
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-muted py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary border-primary">
                Get in Touch
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold font-montserrat text-foreground leading-tight">
                Let's Start a <span className="text-primary">Conversation</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                Ready to transform your career, business, or school? We're here to help you take the next step. Reach
                out to us and let's discuss how we can work together to achieve your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-2 hover:border-primary/20 transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl font-montserrat flex items-center space-x-2">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    <span>Send Us a Message</span>
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitStatus === "success" && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800">
                        Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
                      </p>
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800">
                        Sorry, there was an error sending your message. Please try again or contact us directly at
                        build@thynkcity.com.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* User Type Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="userType">I am...</Label>
                      <Select value={userType} onValueChange={setUserType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4" />
                              <span>An Individual</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="business">
                            <div className="flex items-center space-x-2">
                              <Building className="h-4 w-4" />
                              <span>A Business</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="school">
                            <div className="flex items-center space-x-2">
                              <GraduationCap className="h-4 w-4" />
                              <span>A School</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      {userType && userType !== "individual" && (
                        <div className="space-y-2">
                          <Label htmlFor="company">{userType === "business" ? "Company Name" : "School Name"}</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleInputChange("company", e.target.value)}
                            placeholder={`Enter your ${userType === "business" ? "company" : "school"} name`}
                          />
                        </div>
                      )}
                    </div>

                    {userType && (
                      <div className="space-y-2">
                        <Label htmlFor="service">Service of Interest</Label>
                        <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {getServiceOptions().map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us about your project, goals, or questions..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                          <info.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold font-montserrat">{info.title}</h3>
                          <p className="text-primary font-medium">{info.details}</p>
                          <p className="text-sm text-muted-foreground">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-montserrat">Follow Us</CardTitle>
                  <CardDescription>Stay connected with us on social media for updates and insights.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-montserrat">Our Location</CardTitle>
                  <CardDescription>Visit us at our office in Oregun, Lagos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-64 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.378794315744!3d6.5276316950000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0x4e5f306c2b4b8b0!2sAdeniji%20St%2C%20Oregun%2C%20Ikeja%20101233%2C%20Lagos!5e0!3m2!1sen!2sng!4v1640995200000!5m2!1sen!2sng"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Thynkcity Office Location - 10 Adeniji Street, Oregun, Ikeja, Lagos"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      10 Adeniji Street, Oregun, Ikeja, Lagos, Nigeria
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions about our services and programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-montserrat">How long are your training programs?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All our courses have a minimum duration of 24 weeks with classes held flexibly 2-3 times per week.
                  Each course is one-on-one with a certified tutor provided by Thynkcity.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-montserrat">Do you offer job placement assistance?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! We provide career support including resume reviews, interview preparation, and connections to our
                  network of hiring partners.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-montserrat">Can you work with schools outside Nigeria?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We currently partner with schools across 15+ African countries and offer both in-person and virtual
                  program delivery.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-montserrat">What's included in your consulting services?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our consulting includes strategy, design, development, testing, launch, and ongoing support. We
                  provide end-to-end solutions tailored to your needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
