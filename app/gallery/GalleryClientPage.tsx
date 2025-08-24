"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Camera, Users, GraduationCap, Building, Award, Code } from "lucide-react"
import Image from "next/image"

export default function GalleryClientPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  const categories = [
    { id: "all", label: "All Photos", icon: Camera },
    { id: "training", label: "Training Sessions", icon: Users },
    { id: "graduation", label: "Graduations", icon: GraduationCap },
    { id: "workspace", label: "Our Workspace", icon: Building },
    { id: "events", label: "Events & Awards", icon: Award },
    { id: "projects", label: "Student Projects", icon: Code },
  ]

  const galleryImages = [
    {
      id: 1,
      src: "/gallery/african-students-coding-classroom.png",
      alt: "African students learning coding in a modern classroom",
      category: "training",
      title: "Frontend Development Class",
      description: "Students working on their first React project",
    },
    {
      id: 2,
      src: "/gallery/graduation-ceremony-thynkcity.png",
      alt: "Thynkcity graduation ceremony with students and certificates",
      category: "graduation",
      title: "Data Science Bootcamp Graduation",
      description: "Celebrating our latest cohort of data scientists",
    },
    {
      id: 3,
      src: "/gallery/modern-office-space-lagos.png",
      alt: "Modern office space in Lagos with collaborative work areas",
      category: "workspace",
      title: "Thynkcity Lagos Office",
      description: "Our collaborative workspace in Oregun, Lagos",
    },
    {
      id: 4,
      src: "/gallery/kids-robotics-workshop.png",
      alt: "Children building robots in a workshop setting",
      category: "training",
      title: "Kids Robotics Workshop",
      description: "Young innovators building their first robots",
    },
    {
      id: 5,
      src: "/gallery/tech-conference-presentation.png",
      alt: "Thynkcity team presenting at a technology conference",
      category: "events",
      title: "Tech Conference 2024",
      description: "Sharing our vision for African tech education",
    },
    {
      id: 6,
      src: "/gallery/mobile-app-development-session.png",
      alt: "Students developing mobile applications on laptops",
      category: "training",
      title: "Mobile App Development",
      description: "Building the next generation of African apps",
    },
    {
      id: 7,
      src: "/gallery/student-project-showcase.png",
      alt: "Students presenting their final projects to industry experts",
      category: "projects",
      title: "Project Showcase Day",
      description: "Students presenting innovative solutions",
    },
    {
      id: 8,
      src: "/gallery/team-collaboration-meeting.png",
      alt: "Diverse team collaborating on educational curriculum",
      category: "workspace",
      title: "Curriculum Development",
      description: "Our team designing cutting-edge courses",
    },
    {
      id: 9,
      src: "/gallery/cybersecurity-training-lab.png",
      alt: "Cybersecurity training session with multiple monitors",
      category: "training",
      title: "Cybersecurity Bootcamp",
      description: "Training the next generation of security experts",
    },
    {
      id: 10,
      src: "/gallery/award-ceremony-recognition.png",
      alt: "Thynkcity receiving education innovation award",
      category: "events",
      title: "Education Innovation Award",
      description: "Recognition for our impact on African education",
    },
    {
      id: 11,
      src: "/gallery/ui-ux-design-workshop.png",
      alt: "Students working on user interface designs",
      category: "training",
      title: "UI/UX Design Workshop",
      description: "Creating beautiful and functional user experiences",
    },
    {
      id: 12,
      src: "/gallery/final-project-presentations.png",
      alt: "Students presenting their capstone projects",
      category: "projects",
      title: "Capstone Project Presentations",
      description: "Showcasing real-world solutions to African challenges",
    },
  ]

  const filteredImages =
    activeFilter === "all" ? galleryImages : galleryImages.filter((image) => image.category === activeFilter)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-muted py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary border-primary">
                Our Journey
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold font-montserrat text-foreground leading-tight">
                Gallery of <span className="text-primary">Innovation</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                Explore moments from our journey of transforming lives through technology education. From training
                sessions to graduations, see the impact we're making across Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? "default" : "outline"}
                onClick={() => setActiveFilter(category.id)}
                className="flex items-center space-x-2"
              >
                <category.icon className="h-4 w-4" />
                <span>{category.label}</span>
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h3 className="text-white font-semibold font-montserrat text-sm">{image.title}</h3>
                          <p className="text-white/80 text-xs mt-1">{image.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                  </div>
                  <div className="space-y-2 mt-4">
                    <h3 className="text-xl font-bold font-montserrat">{image.title}</h3>
                    <p className="text-muted-foreground">{image.description}</p>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No images found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-foreground">
                Ready to Be Part of Our Story?
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Join thousands of students, businesses, and schools who have transformed their future with Thynkcity.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/services/training">Start Your Journey</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/contact">Partner With Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
