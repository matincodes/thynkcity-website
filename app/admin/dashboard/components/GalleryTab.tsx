import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Plus } from "lucide-react"
import type { GalleryImage } from "@/lib/supabase/queries"

interface GalleryTabProps {
  galleryImages: GalleryImage[]
  setShowAddModal: (show: boolean) => void
  setEditingItem: (item: any) => void
  setDeleteConfirm: (confirm: { type: string; id: string } | null) => void
}

export default function GalleryTab({
  galleryImages,
  setShowAddModal,
  setEditingItem,
  setDeleteConfirm,
}: GalleryTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-montserrat">Gallery Management</h2>
          <p className="text-muted-foreground">Organize and manage gallery images</p>
        </div>
        <Button
          className="hover-lift btn-animate"
          onClick={() => {
            setShowAddModal(true)
            setEditingItem({ type: "gallery" })
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Upload Images
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Images</CardTitle>
          <CardDescription>Manage images displayed in the gallery section</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((image) => (
              <div key={image.id} className="border rounded-lg p-4 space-y-3">
                <img
                  src={image.image_url || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-48 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{image.title}</h3>
                  <p className="text-sm text-muted-foreground">{image.description}</p>
                  <Badge variant="outline" className="mt-1">
                    {image.category}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingItem({ ...image, type: "gallery" })
                      setShowAddModal(true)
                    }}
                    className="hover-lift bg-transparent"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setDeleteConfirm({ type: "gallery_images", id: image.id })}
                    className="hover-lift"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}