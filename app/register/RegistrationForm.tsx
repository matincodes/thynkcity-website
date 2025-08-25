"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, User, Users } from "lucide-react"

interface Child {
  id: string
  name: string
  age: string
  interests: string
}

export function RegistrationForm() {
  const [registrationType, setRegistrationType] = useState<"individual" | "parent" | "">("")
  const [children, setChildren] = useState<Child[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const addChild = () => {
    const newChild: Child = {
      id: Date.now().toString(),
      name: "",
      age: "",
      interests: "",
    }
    setChildren([...children, newChild])
  }

  const removeChild = (id: string) => {
    setChildren(children.filter((child) => child.id !== id))
  }

  const updateChild = (id: string, field: keyof Child, value: string) => {
    setChildren(children.map((child) => (child.id === id ? { ...child, [field]: value } : child)))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      registrationType,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      interests: formData.get("interests"),
      experience: formData.get("experience"),
      goals: formData.get("goals"),
      children: registrationType === "parent" ? children : undefined,
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitMessage("Registration successful! We'll contact you within 24 hours.")
        e.currentTarget.reset()
        setChildren([])
        setRegistrationType("")
      } else {
        setSubmitMessage("Registration failed. Please try again.")
      }
    } catch (error) {
      setSubmitMessage("Registration failed. Please try again.")
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Registration Type Selection */}
      <div className="space-y-4">
        <Label className="text-base font-medium">I am registering as:</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            className={`cursor-pointer transition-all ${registrationType === "individual" ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
            onClick={() => setRegistrationType("individual")}
          >
            <CardContent className="p-4 text-center">
              <User className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-medium">Individual Student</h3>
              <p className="text-sm text-muted-foreground">Register yourself for training</p>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer transition-all ${registrationType === "parent" ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
            onClick={() => setRegistrationType("parent")}
          >
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-medium">Parent/Guardian</h3>
              <p className="text-sm text-muted-foreground">Register your children</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {registrationType && (
        <>
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium font-montserrat">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" name="phone" type="tel" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location (City, Country) *</Label>
                <Input id="location" name="location" required />
              </div>
            </div>
          </div>

          {/* Individual Student Information */}
          {registrationType === "individual" && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium font-montserrat">Learning Information</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="interests">Areas of Interest *</Label>
                  <Select name="interests" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your primary interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend-development">Frontend Development</SelectItem>
                      <SelectItem value="backend-development">Backend Development</SelectItem>
                      <SelectItem value="data-science">Data Science & Analytics</SelectItem>
                      <SelectItem value="artificial-intelligence">Artificial Intelligence</SelectItem>
                      <SelectItem value="mobile-development">Mobile Development</SelectItem>
                      <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                      <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                      <SelectItem value="3d-animation">3D Animation</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                      <SelectItem value="cloud-computing">Cloud Computing</SelectItem>
                      <SelectItem value="project-management">Project Management</SelectItem>
                      <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Current Experience Level</Label>
                  <Select name="experience">
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Complete Beginner</SelectItem>
                      <SelectItem value="some-knowledge">Some Knowledge</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Children Information */}
          {registrationType === "parent" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium font-montserrat">Children Information</h3>
                <Button type="button" variant="outline" size="sm" onClick={addChild}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Child
                </Button>
              </div>

              {children.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Click "Add Child" to register your children for our programs</p>
                </div>
              )}

              {children.map((child, index) => (
                <Card key={child.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Child {index + 1}</CardTitle>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeChild(child.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Child's Name *</Label>
                        <Input
                          value={child.name}
                          onChange={(e) => updateChild(child.id, "name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Age *</Label>
                        <Select value={child.age} onValueChange={(value) => updateChild(child.id, "age", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select age" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 13 }, (_, i) => i + 6).map((age) => (
                              <SelectItem key={age} value={age.toString()}>
                                {age} years old
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Areas of Interest</Label>
                      <Select
                        value={child.interests}
                        onValueChange={(value) => updateChild(child.id, "interests", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select interests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ai-teachable-machine">AI with Teachable Machine</SelectItem>
                          <SelectItem value="app-inventor">App Inventor</SelectItem>
                          <SelectItem value="game-development">Game Development</SelectItem>
                          <SelectItem value="3d-animation">3D Animation</SelectItem>
                          <SelectItem value="creative-writing">Creative Writing</SelectItem>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="robotics">Robotics</SelectItem>
                          <SelectItem value="coding-basics">Coding Basics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Goals and Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium font-montserrat">Additional Information</h3>
            <div className="space-y-2">
              <Label htmlFor="goals">Learning Goals & Expectations</Label>
              <Textarea
                id="goals"
                name="goals"
                placeholder="Tell us about your learning goals, career aspirations, or what you hope to achieve..."
                rows={4}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="space-y-4">
            {submitMessage && (
              <div
                className={`p-4 rounded-lg ${submitMessage.includes("successful") ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}
              >
                {submitMessage}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              By submitting this form, you agree to be contacted by our team to discuss your learning journey and
              schedule your first consultation.
            </p>
          </div>
        </>
      )}
    </form>
  )
}
