import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Registration {
  id: string
  type: "individual" | "parent"
  name: string
  email: string
  phone: string
  age?: number
  course_interest: string
  children?: Array<{
    name: string
    age: number
    course_interest: string
  }>
  status: "pending" | "contacted" | "enrolled" | "declined"
  created_at: string
}

interface RegistrationsTabProps {
  registrations: Registration[]
  updateRegistrationStatus: (id: string, status: "pending" | "contacted" | "enrolled" | "declined") => void
  setDeleteConfirm: (confirm: { type: string; id: string } | null) => void
}

export default function RegistrationsTab({
  registrations,
  updateRegistrationStatus,
  setDeleteConfirm,
}: RegistrationsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-montserrat">Student Registrations</h2>
          <p className="text-muted-foreground">Manage course registration inquiries and enrollments</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Registrations</CardTitle>
          <CardDescription>Review and manage student registration requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">Name</TableHead>
                  <TableHead className="min-w-[80px]">Type</TableHead>
                  <TableHead className="min-w-[150px]">Contact</TableHead>
                  <TableHead className="min-w-[120px]">Course Interest</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[100px]">Date</TableHead>
                  <TableHead className="min-w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
            <TableBody>
              {registrations.map((registration) => (
                <TableRow key={registration.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{registration.name}</div>
                      {registration.type === "parent" && registration.children && (
                        <div className="text-sm text-muted-foreground">
                          Children: {registration.children.map((child) => child.name).join(", ")}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{registration.type === "individual" ? "Student" : "Parent"}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{registration.email}</div>
                      <div className="text-muted-foreground">{registration.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {registration.type === "individual" ? (
                        <Badge variant="secondary">{registration.course_interest}</Badge>
                      ) : (
                        <div className="space-y-1">
                          {registration.children?.map((child, index) => (
                            <Badge key={index} variant="secondary" className="mr-1">
                              {child.course_interest}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        registration.status === "enrolled"
                          ? "default"
                          : registration.status === "contacted"
                            ? "secondary"
                            : registration.status === "pending"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {registration.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(registration.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {registration.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => updateRegistrationStatus(registration.id, "contacted")}
                          className="hover-lift"
                        >
                          Contact
                        </Button>
                      )}
                      {registration.status === "contacted" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateRegistrationStatus(registration.id, "enrolled")}
                            className="hover-lift"
                          >
                            Enroll
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateRegistrationStatus(registration.id, "declined")}
                            className="hover-lift bg-transparent"
                          >
                            Decline
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteConfirm({ type: "registrations", id: registration.id })}
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