import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Plus } from "lucide-react"
import type { PortfolioItem } from "@/lib/supabase/queries"

interface PortfolioTabProps {
  portfolioItems: PortfolioItem[]
  setShowAddModal: (show: boolean) => void
  setEditingItem: (item: any) => void
  setDeleteConfirm: (confirm: { type: string; id: string } | null) => void
}

export default function PortfolioTab({
  portfolioItems,
  setShowAddModal,
  setEditingItem,
  setDeleteConfirm,
}: PortfolioTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-montserrat">Portfolio Management</h2>
          <p className="text-muted-foreground">Manage portfolio projects and case studies</p>
        </div>
        <Button
          className="hover-lift btn-animate"
          onClick={() => {
            setShowAddModal(true)
            setEditingItem({ type: "portfolio" })
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Projects</CardTitle>
          <CardDescription>Showcase your successful projects and case studies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Project</TableHead>
                  <TableHead className="min-w-[120px]">Client</TableHead>
                  <TableHead className="min-w-[100px]">Industry</TableHead>
                  <TableHead className="min-w-[80px]">Status</TableHead>
                  <TableHead className="min-w-[100px]">Date</TableHead>
                  <TableHead className="min-w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
            <TableBody>
              {portfolioItems.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.client_name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{project.industry}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={project.status === "active" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingItem({ ...project, type: "portfolio" })
                          setShowAddModal(true)
                        }}
                        className="hover-lift bg-transparent"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteConfirm({ type: "portfolio_items", id: project.id })}
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