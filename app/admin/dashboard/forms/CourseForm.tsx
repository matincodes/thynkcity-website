"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Loader2, Trash2 } from "lucide-react"

interface CourseFormProps {
  course?: any
  onClose: () => void
  onSave: () => void
}

interface Module {
  title: string
  weeks: number
  topics: string[]
}

export default function CourseForm({ course, onClose, onSave }: CourseFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    duration_weeks: 24,
    sessions_per_week: 3,
    price: 0,
    target_audience: "adults",
    difficulty_level: "beginner",
    prerequisites: [] as string[],
    learning_outcomes: [] as string[],
    featured_image: "",
    status: "active",
  })
  const [curriculum, setCurriculum] = useState<Module[]>([])
  const [newPrerequisite, setNewPrerequisite] = useState("")
  const [newOutcome, setNewOutcome] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || "",
        slug: course.slug || "",
        description: course.description || "",
        duration_weeks: course.duration_weeks || 24,
        sessions_per_week: course.sessions_per_week || 3,
        price: course.price || 0,
        target_audience: course.target_audience || "adults",
        difficulty_level: course.difficulty_level || "beginner",
        prerequisites: Array.isArray(course.prerequisites) ? course.prerequisites : [],
        learning_outcomes: Array.isArray(course.learning_outcomes) ? course.learning_outcomes : [],
        featured_image: course.featured_image || "",
        status: course.status || "active",
      })

      if (course.curriculum && typeof course.curriculum === "object" && course.curriculum.modules) {
        setCurriculum(course.curriculum.modules)
      }
    }
  }, [course])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: !course ? generateSlug(title) : prev.slug,
    }))
  }

  const addPrerequisite = () => {
    if (newPrerequisite.trim() && !formData.prerequisites.includes(newPrerequisite.trim())) {
      setFormData((prev) => ({
        ...prev,
        prerequisites: [...prev.prerequisites, newPrerequisite.trim()],
      }))
      setNewPrerequisite("")
    }
  }

  const removePrerequisite = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      prerequisites: prev.prerequisites.filter((p) => p !== item),
    }))
  }

  const addOutcome = () => {
    if (newOutcome.trim() && !formData.learning_outcomes.includes(newOutcome.trim())) {
      setFormData((prev) => ({
        ...prev,
        learning_outcomes: [...prev.learning_outcomes, newOutcome.trim()],
      }))
      setNewOutcome("")
    }
  }

  const removeOutcome = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      learning_outcomes: prev.learning_outcomes.filter((o) => o !== item),
    }))
  }

  const addModule = () => {
    setCurriculum((prev) => [...prev, { title: "", weeks: 4, topics: [] }])
  }

  const updateModule = (index: number, field: keyof Module, value: any) => {
    setCurriculum((prev) => prev.map((module, i) => (i === index ? { ...module, [field]: value } : module)))
  }

  const removeModule = (index: number) => {
    setCurriculum((prev) => prev.filter((_, i) => i !== index))
  }

  const addTopicToModule = (moduleIndex: number, topic: string) => {
    if (topic.trim()) {
      setCurriculum((prev) =>
        prev.map((module, i) => (i === moduleIndex ? { ...module, topics: [...module.topics, topic.trim()] } : module)),
      )
    }
  }

  const removeTopicFromModule = (moduleIndex: number, topicIndex: number) => {
    setCurriculum((prev) =>
      prev.map((module, i) =>
        i === moduleIndex ? { ...module, topics: module.topics.filter((_, ti) => ti !== topicIndex) } : module,
      ),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const courseData = {
        ...formData,
        curriculum: { modules: curriculum },
      }

      const url = course ? `/api/admin/courses/${course.id}` : "/api/admin/courses"
      const method = course ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      })

      if (!response.ok) {
        throw new Error("Failed to save course")
      }

      onSave()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{course ? "Edit Course" : "Create New Course"}</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter course title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="course-slug"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration_weeks">Duration (weeks) *</Label>
                  <Input
                    id="duration_weeks"
                    type="number"
                    min="1"
                    value={formData.duration_weeks}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, duration_weeks: Number.parseInt(e.target.value) }))
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="sessions_per_week">Sessions/Week *</Label>
                  <Input
                    id="sessions_per_week"
                    type="number"
                    min="1"
                    max="7"
                    value={formData.sessions_per_week}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, sessions_per_week: Number.parseInt(e.target.value) }))
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="price">Price (₦) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) }))}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="target_audience">Target Audience</Label>
                  <Select
                    value={formData.target_audience}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, target_audience: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adults">Adults</SelectItem>
                      <SelectItem value="kids">Kids</SelectItem>
                      <SelectItem value="teenagers">Teenagers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="difficulty_level">Difficulty Level</Label>
                  <Select
                    value={formData.difficulty_level}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, difficulty_level: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Course description"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="featured_image">Featured Image URL</Label>
                <Input
                  id="featured_image"
                  value={formData.featured_image}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured_image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label>Prerequisites</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newPrerequisite}
                    onChange={(e) => setNewPrerequisite(e.target.value)}
                    placeholder="Add prerequisite"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addPrerequisite())}
                  />
                  <Button type="button" onClick={addPrerequisite} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.prerequisites.map((prereq) => (
                    <Badge key={prereq} variant="secondary" className="flex items-center gap-1">
                      {prereq}
                      <button
                        type="button"
                        onClick={() => removePrerequisite(prereq)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Learning Outcomes</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newOutcome}
                    onChange={(e) => setNewOutcome(e.target.value)}
                    placeholder="Add learning outcome"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addOutcome())}
                  />
                  <Button type="button" onClick={addOutcome} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.learning_outcomes.map((outcome) => (
                    <Badge key={outcome} variant="secondary" className="flex items-center gap-1">
                      {outcome}
                      <button
                        type="button"
                        onClick={() => removeOutcome(outcome)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <Label>Curriculum Modules</Label>
              <Button type="button" onClick={addModule} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Module
              </Button>
            </div>
            <div className="space-y-4">
              {curriculum.map((module, moduleIndex) => (
                <div key={moduleIndex} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <Input
                          value={module.title}
                          onChange={(e) => updateModule(moduleIndex, "title", e.target.value)}
                          placeholder="Module title"
                        />
                      </div>
                      <div>
                        <Input
                          type="number"
                          min="1"
                          value={module.weeks}
                          onChange={(e) => updateModule(moduleIndex, "weeks", Number.parseInt(e.target.value))}
                          placeholder="Weeks"
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeModule(moduleIndex)}
                      className="ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="Add topic"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addTopicToModule(moduleIndex, e.currentTarget.value)
                            e.currentTarget.value = ""
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {module.topics.map((topic, topicIndex) => (
                        <Badge key={topicIndex} variant="outline" className="flex items-center gap-1">
                          {topic}
                          <button
                            type="button"
                            onClick={() => removeTopicFromModule(moduleIndex, topicIndex)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {course ? "Update Course" : "Create Course"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
