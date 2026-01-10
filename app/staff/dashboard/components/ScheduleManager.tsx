"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { Plus, Trash2, LinkIcon } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface ScheduleManagerProps {
  staffId: string
}

export default function ScheduleManager({ staffId }: ScheduleManagerProps) {
  const [schedules, setSchedules] = useState<any[]>([])
  const [schools, setSchools] = useState<any[]>([])
  const [students, setStudents] = useState<any[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    studentId: "",
    schoolId: "",
    dayOfWeek: "Monday",
    startTime: "",
    endTime: "",
    subject: "",
    googleMeetLink: "",
    reminderEnabled: true,
    reminderTime: 30,
  })

  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const [schedulesRes, schoolsRes, studentsRes] = await Promise.all([
      supabase
        .from("virtual_class_schedules")
        .select("*, student:students(full_name), school:schools(name)")
        .eq("staff_id", staffId)
        .eq("is_active", true)
        .order("day_of_week"),
      supabase.from("schools").select("*").order("name"),
      supabase.from("students").select("*").order("full_name"),
    ])

    if (schedulesRes.data) setSchedules(schedulesRes.data)
    if (schoolsRes.data) setSchools(schoolsRes.data)
    if (studentsRes.data) setStudents(studentsRes.data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { error } = await supabase.from("virtual_class_schedules").insert({
        staff_id: staffId,
        student_id: formData.studentId || null,
        school_id: formData.schoolId || null,
        day_of_week: formData.dayOfWeek,
        start_time: formData.startTime,
        end_time: formData.endTime,
        subject: formData.subject,
        google_meet_link: formData.googleMeetLink,
        reminder_enabled: formData.reminderEnabled,
        reminder_time: formData.reminderTime,
        is_active: true,
      })

      if (error) throw error

      setShowAddForm(false)
      setFormData({
        studentId: "",
        schoolId: "",
        dayOfWeek: "Monday",
        startTime: "",
        endTime: "",
        subject: "",
        googleMeetLink: "",
        reminderEnabled: true,
        reminderTime: 30,
      })
      fetchData()
    } catch (error: any) {
      console.error("[v0] Error creating schedule:", error)
      alert("Failed to create schedule: " + error.message)
    }
  }

  const deleteSchedule = async (scheduleId: string) => {
    if (!confirm("Are you sure you want to delete this schedule?")) return

    try {
      const { error } = await supabase.from("virtual_class_schedules").update({ is_active: false }).eq("id", scheduleId)

      if (error) throw error
      fetchData()
    } catch (error: any) {
      console.error("[v0] Error deleting schedule:", error)
      alert("Failed to delete schedule: " + error.message)
    }
  }

  const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Virtual Class Schedules</CardTitle>
              <CardDescription>Manage recurring virtual class sessions with WhatsApp reminders</CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Schedule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <form onSubmit={handleSubmit} className="border rounded-lg p-4 mb-6 space-y-4 bg-muted/50">
              <h3 className="font-semibold">New Virtual Class Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student (optional)</Label>
                  <Select
                    value={formData.studentId}
                    onValueChange={(value) => setFormData({ ...formData, studentId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None (Group Class)</SelectItem>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.full_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolId">School (optional)</Label>
                  <Select
                    value={formData.schoolId}
                    onValueChange={(value) => setFormData({ ...formData, schoolId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select school" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {schools.map((school) => (
                        <SelectItem key={school.id} value={school.id}>
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dayOfWeek">Day of Week *</Label>
                  <Select
                    value={formData.dayOfWeek}
                    onValueChange={(value) => setFormData({ ...formData, dayOfWeek: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOrder.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g., Python Programming"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input
                    id="startTime"
                    type="time"
                    required
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time *</Label>
                  <Input
                    id="endTime"
                    type="time"
                    required
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="googleMeetLink">Google Meet Link</Label>
                  <Input
                    id="googleMeetLink"
                    type="url"
                    value={formData.googleMeetLink}
                    onChange={(e) => setFormData({ ...formData, googleMeetLink: e.target.value })}
                    placeholder="https://meet.google.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="reminderEnabled"
                      checked={formData.reminderEnabled}
                      onCheckedChange={(checked) => setFormData({ ...formData, reminderEnabled: checked })}
                    />
                    <Label htmlFor="reminderEnabled">WhatsApp Reminder</Label>
                  </div>
                </div>

                {formData.reminderEnabled && (
                  <div className="space-y-2">
                    <Label htmlFor="reminderTime">Reminder (minutes before)</Label>
                    <Input
                      id="reminderTime"
                      type="number"
                      value={formData.reminderTime}
                      onChange={(e) => setFormData({ ...formData, reminderTime: Number.parseInt(e.target.value) })}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button type="submit">Create Schedule</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Student/School</TableHead>
                <TableHead>Meet Link</TableHead>
                <TableHead>Reminder</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No schedules created yet. Click "Add Schedule" to get started.
                  </TableCell>
                </TableRow>
              ) : (
                schedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>
                      <Badge variant="outline">{schedule.day_of_week}</Badge>
                    </TableCell>
                    <TableCell>
                      {schedule.start_time} - {schedule.end_time}
                    </TableCell>
                    <TableCell className="font-medium">{schedule.subject}</TableCell>
                    <TableCell>{schedule.student?.full_name || schedule.school?.name || "Group Class"}</TableCell>
                    <TableCell>
                      {schedule.google_meet_link ? (
                        <a
                          href={schedule.google_meet_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1"
                        >
                          <LinkIcon className="h-3 w-3" />
                          Join
                        </a>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {schedule.reminder_enabled ? (
                        <Badge variant="secondary">{schedule.reminder_time}min before</Badge>
                      ) : (
                        <span className="text-muted-foreground">Off</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="destructive" onClick={() => deleteSchedule(schedule.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
