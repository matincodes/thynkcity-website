"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Loader2 } from "lucide-react"

interface GalleryFormProps {
  image?: any
  onClose: () => void
  onSave: () => void
}

export default function GalleryForm({ image, onClose, onSave }: GalleryFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    category: "",
    alt_text: "",
    status: "active",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [imagePreview, setImagePreview] = useState("")

  useEffect(() => {
    if (image) {
      setFormData({
        title: image.title || "",
        description: image.description || "",
        image_url: image.image_url || "",
        category: image.category || "",
        alt_text: image.alt_text || "",
        status: image.status || "active",
      })
      setImagePreview(image.image_url || "")
    }
  }, [image])

  const handleImageUrlChange = (url: string) => {
    setFormData((prev) => ({ ...prev, image_url: url }))
    setImagePreview(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const url = image ? `/api/admin/gallery/${image.id}` : "/api/admin/gallery"
      const method = image ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to save gallery image")
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
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{image ? "Edit Gallery Image" : "Add New Gallery Image"}</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">{error}</div>}

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Image Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter image title"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the image"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="image_url">Image URL *</Label>
              <div className="space-y-2">
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => handleImageUrlChange(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Upload your image to a hosting service and paste the URL here
                </p>
              </div>
            </div>

            {imagePreview && (
              <div>
                <Label>Image Preview</Label>
                <div className="mt-2 border rounded-lg p-4">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded"
                    onError={() => setImagePreview("")}
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="training">Training Sessions</SelectItem>
                    <SelectItem value="graduation">Graduations</SelectItem>
                    <SelectItem value="workspace">Workspace</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="projects">Student Projects</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
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
            </div>

            <div>
              <Label htmlFor="alt_text">Alt Text *</Label>
              <Input
                id="alt_text"
                value={formData.alt_text}
                onChange={(e) => setFormData((prev) => ({ ...prev, alt_text: e.target.value }))}
                placeholder="Descriptive text for accessibility"
                required
              />
              <p className="text-sm text-muted-foreground mt-1">
                Describe what's in the image for screen readers and SEO
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {image ? "Update Image" : "Add Image"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
