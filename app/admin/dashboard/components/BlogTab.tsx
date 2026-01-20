import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Plus } from "lucide-react"
import type { BlogPost } from "@/lib/supabase/queries"

interface BlogTabProps {
  blogPosts: BlogPost[]
  updateBlogPostStatus: (id: string, status: "draft" | "published" | "archived") => void
  setShowAddModal: (show: boolean) => void
  setEditingItem: (item: any) => void
  setDeleteConfirm: (confirm: { type: string; id: string } | null) => void
}

export default function BlogTab({
  blogPosts,
  updateBlogPostStatus,
  setShowAddModal,
  setEditingItem,
  setDeleteConfirm,
}: BlogTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-montserrat">Blog Posts</h2>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        <Button
          className="hover-lift btn-animate"
          onClick={() => {
            setShowAddModal(true)
            setEditingItem({ type: "blog" })
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Blog Posts</CardTitle>
          <CardDescription>Create, edit, and publish blog articles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Title</TableHead>
                  <TableHead className="min-w-[100px]">Category</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[120px]">Published</TableHead>
                  <TableHead className="min-w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
            <TableBody>
              {blogPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{post.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        post.status === "published"
                          ? "default"
                          : post.status === "draft"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {post.published_at ? new Date(post.published_at).toLocaleDateString() : "Not published"}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover-lift bg-transparent"
                        onClick={() => {
                          setEditingItem({ ...post, type: "blog" })
                          setShowAddModal(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {post.status === "draft" && (
                        <Button
                          size="sm"
                          onClick={() => updateBlogPostStatus(post.id, "published")}
                          className="hover-lift"
                        >
                          Publish
                        </Button>
                      )}
                      {post.status === "published" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => updateBlogPostStatus(post.id, "archived")}
                          className="hover-lift"
                        >
                          Archive
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteConfirm({ type: "blog_posts", id: post.id })}
                        className="hover-lift"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}