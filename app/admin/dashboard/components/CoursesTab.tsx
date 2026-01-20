import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Plus } from "lucide-react"
import type { Course } from "@/lib/supabase/queries"

interface CoursesTabProps {
  courses: Course[]
  setShowAddModal: (show: boolean) => void
  setEditingItem: (item: any) => void
  setDeleteConfirm: (confirm: { type: string; id: string } | null) => void
}

export default function CoursesTab({
  courses,
  setShowAddModal,
  setEditingItem,
  setDeleteConfirm,
}: CoursesTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-montserrat">Course Management</h2>
          <p className="text-muted-foreground">Create and manage training courses</p>
        </div>
        <Button
          className="hover-lift btn-animate"
          onClick={() => {
            setShowAddModal(true)
            setEditingItem({ type: "course" })
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Course
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
          <CardDescription>Manage your educational course offerings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Course</TableHead>
                  <TableHead className="min-w-[80px]">Target</TableHead>
                  <TableHead className="min-w-[100px]">Duration</TableHead>
                  <TableHead className="min-w-[100px]">Price</TableHead>
                  <TableHead className="min-w-[80px]">Status</TableHead>
                  <TableHead className="min-w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{course.category}</Badge>
                    </TableCell>
                    <TableCell>{course.duration_weeks} weeks</TableCell>
                    <TableCell>₦{course.price?.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={course.status === "active" ? "default" : "secondary"}>
                        {course.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(course.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingItem({ ...course, type: "course" })
                            setShowAddModal(true)
                          }}
                          className="hover-lift bg-transparent"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setDeleteConfirm({ type: "courses", id: course.id })}
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