"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Loader2 } from "lucide-react"

interface ProjectFormProps {
  project?: any
  onClose: () => void
  onSave: () => void
}

export default function ProjectForm({ project, onClose, onSave }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    client_name: "",
    industry: "",
    description: "",
    challenge: "",
    solution: "",
    results: "",
    technologies: [] as string[],
    project_url: "",
    image_url: "",
    status: "active",
    completion_date: "",
  })
  const [newTechnology, setNewTechnology] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        slug: project.slug || "",
        client_name: project.client_name || "",
        industry: project.industry || "",
        description: project.description || "",
        challenge: project.challenge || "",
        solution: project.solution || "",
        results: project.results || "",
        technologies: Array.isArray(project.technologies) ? project.technologies : [],
        project_url: project.project_url || "",
        image_url: project.image_url || "",
        status: project.status || "active",
        completion_date: project.completion_date ? project.completion_date.split("T")[0] : "",
      })
    }
  }, [project])

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
      slug: !project ? generateSlug(title) : prev.slug,
    }))
  }

  const addTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()],
      }))
      setNewTechnology("")
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const projectData = {
        ...formData,
        completion_date: formData.completion_date ? new Date(formData.completion_date).toISOString() : null,
      }

      const url = project ? `/api/admin/projects/${project.id}` : "/api/admin/projects"
      const method = project ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      })

      if (!response.ok) {
        throw new Error("Failed to save project")
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
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{project ? "Edit Project" : "Create New Project"}</h2>
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
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="project-slug"
                  required
                />
              </div>

              <div>
                <Label htmlFor="client_name">Client Name *</Label>
                <Input
                  id="client_name"
                  value={formData.client_name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, client_name: e.target.value }))}
                  placeholder="Client or company name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, industry: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FinTech">FinTech</SelectItem>
                    <SelectItem value="EdTech">EdTech</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                    <SelectItem value="Agriculture">Agriculture</SelectItem>
                    <SelectItem value="Fashion">Fashion</SelectItem>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Transportation">Transportation</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
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

              <div>
                <Label htmlFor="completion_date">Completion Date</Label>
                <Input
                  id="completion_date"
                  type="date"
                  value={formData.completion_date}
                  onChange={(e) => setFormData((prev) => ({ ...prev, completion_date: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief project description"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="project_url">Project URL</Label>
                <Input
                  id="project_url"
                  value={formData.project_url}
                  onChange={(e) => setFormData((prev) => ({ ...prev, project_url: e.target.value }))}
                  placeholder="https://project-url.com"
                />
              </div>

              <div>
                <Label htmlFor="image_url">Project Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label>Technologies Used</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                    placeholder="Add technology"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                  />
                  <Button type="button" onClick={addTechnology} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech)}
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

          <div className="space-y-4">
            <div>
              <Label htmlFor="challenge">Challenge *</Label>
              <Textarea
                id="challenge"
                value={formData.challenge}
                onChange={(e) => setFormData((prev) => ({ ...prev, challenge: e.target.value }))}
                placeholder="What challenges did the client face?"
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="solution">Solution *</Label>
              <Textarea
                id="solution"
                value={formData.solution}
                onChange={(e) => setFormData((prev) => ({ ...prev, solution: e.target.value }))}
                placeholder="How did you solve the challenges?"
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="results">Results *</Label>
              <Textarea
                id="results"
                value={formData.results}
                onChange={(e) => setFormData((prev) => ({ ...prev, results: e.target.value }))}
                placeholder="What were the outcomes and impact?"
                rows={4}
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {project ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
