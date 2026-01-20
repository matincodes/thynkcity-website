import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StaffProfile } from "@/lib/supabase/queries"
import { Check, X } from "lucide-react"

interface StaffTabProps {
  staffProfiles: StaffProfile[]
  stats: {
    totalStaff: number
    pendingStaff: number
    approvedStaff: number
  }
  handleStaffAction: (staffId: string, action: "approve" | "reject") => void
}

export default function StaffTab({ staffProfiles, stats, handleStaffAction }: StaffTabProps) {
  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-montserrat">Staff Management</h2>
          <p className="text-muted-foreground">Review and approve staff applications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStaff}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingStaff}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Approved Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approvedStaff}</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Staff Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Applications</CardTitle>
          <CardDescription>Review and approve staff applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">Name</TableHead>
                  <TableHead className="min-w-[150px]">Email</TableHead>
                  <TableHead className="min-w-[120px]">Phone</TableHead>
                  <TableHead className="min-w-[120px]">Specialization</TableHead>
                  <TableHead className="min-w-[100px]">Applied</TableHead>
                  <TableHead className="min-w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staffProfiles.filter(staff => !staff.approved).map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell className="font-medium">{staff.full_name}</TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>{staff.phone_number}</TableCell>
                    <TableCell>{staff.specialization}</TableCell>
                    <TableCell>{new Date(staff.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleStaffAction(staff.id, "approve")}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleStaffAction(staff.id, "reject")}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
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

      {/* Registered Staff */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Staff</CardTitle>
          <CardDescription>View approved staff members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Bio</TableHead>
                <TableHead>Approved</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffProfiles.filter(staff => staff.approved).map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className="font-medium">{staff.full_name}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>{staff.phone_number}</TableCell>
                  <TableCell>{staff.specialization}</TableCell>
                  <TableCell>{staff.bio || "No bio provided"}</TableCell>
                  <TableCell>{new Date(staff.created_at).toLocaleDateString()}</TableCell>
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