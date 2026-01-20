import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X } from "lucide-react"
import type { Testimonial } from "@/lib/supabase/queries"

interface TestimonialsTabProps {
  testimonials: Testimonial[]
  updateTestimonialStatus: (id: string, status: "approved" | "rejected") => void
  toggleTestimonialVisibility: (id: string, currentStatus: string) => void
  setDeleteConfirm: (confirm: { type: string; id: string } | null) => void
}

export default function TestimonialsTab({
  testimonials,
  updateTestimonialStatus,
  toggleTestimonialVisibility,
  setDeleteConfirm,
}: TestimonialsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-montserrat">Testimonials</h2>
          <p className="text-muted-foreground">Review and manage user testimonials</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Testimonials</CardTitle>
          <CardDescription>Review testimonials and approve them for public display</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">Name</TableHead>
                  <TableHead className="min-w-[100px]">Role</TableHead>
                  <TableHead className="min-w-[80px]">Rating</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[100px]">Date</TableHead>
                  <TableHead className="min-w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell className="font-medium">{testimonial.name}</TableCell>
                  <TableCell>{testimonial.role}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-primary">
                          ★
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        testimonial.status === "approved"
                          ? "default"
                          : testimonial.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {testimonial.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(testimonial.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {testimonial.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateTestimonialStatus(testimonial.id, "approved")}
                            className="hover-lift"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateTestimonialStatus(testimonial.id, "rejected")}
                            className="hover-lift"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {(testimonial.status === "approved" || testimonial.status === "rejected") && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleTestimonialVisibility(testimonial.id, testimonial.status)}
                          className="hover-lift bg-transparent"
                        >
                          {testimonial.status === "approved" ? "Reject" : "Approve"}
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteConfirm({ type: "testimonials", id: testimonial.id })}
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