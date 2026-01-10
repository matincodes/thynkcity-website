"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { Loader2, CheckCircle } from "lucide-react"

interface ClassReportFormProps {
  staffId: string
  onSuccess: () => void
}

export default function ClassReportForm({ staffId, onSuccess }: ClassReportFormProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [schools, setSchools] = useState<any[]>([])
  const [students, setStudents] = useState<any[]>([])
  const [formData, setFormData] = useState({
    classType: "1-on-1",
    schoolId: "",
    studentId: "",
    subject: "",
    date: new Date().toISOString().split("T")[0],
    startTime: "",
    endTime: "",
    hoursSpent: "",
    attendanceStatus: "held",
    feedback: "",
    nextSteps: "",
  })

  const supabase = createClient()

  useEffect(() => {
    fetchSchoolsAndStudents()
  }, [])

  const fetchSchoolsAndStudents = async () => {
    const [schoolsRes, studentsRes] = await Promise.all([
      supabase.from("schools").select("*").order("name"),
      supabase.from("students").select("*, school:schools(name)").order("full_name"),
    ])

    if (schoolsRes.data) setSchools(schoolsRes.data)
    if (studentsRes.data) setStudents(studentsRes.data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from("class_sessions").insert({
        staff_id: staffId,
        school_id: formData.classType === "group" ? formData.schoolId : null,
        student_id: formData.classType === "1-on-1" ? formData.studentId : null,
        class_type: formData.classType,
        subject: formData.subject,
        date: formData.date,
        start_time: formData.startTime,
        end_time: formData.endTime,
        hours_spent: Number.parseFloat(formData.hoursSpent),
        attendance_status: formData.attendanceStatus,
        feedback: formData.feedback,
        next_steps: formData.nextSteps,
      })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        setFormData({
          classType: "1-on-1",
          schoolId: "",
          studentId: "",
          subject: "",
          date: new Date().toISOString().split("T")[0],
          startTime: "",
          endTime: "",
          hoursSpent: "",
          attendanceStatus: "held",
          feedback: "",
          nextSteps: "",
        })
        onSuccess()
      }, 2000)
    } catch (error: any) {
      console.error("[v0] Error submitting class report:", error)
      alert("Failed to submit class report: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CheckCircle className="h-16 w-16 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Class Report Submitted!</h3>
          <p className="text-muted-foreground">Your report has been saved successfully.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Class Report</CardTitle>
        <CardDescription>Record details of the class you just conducted</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="classType">Class Type *</Label>
              <Select
                value={formData.classType}
                onValueChange={(value) => setFormData({ ...formData, classType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-on-1">1-on-1 Session</SelectItem>
                  <SelectItem value="group">Group Class</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.classType === "1-on-1" ? (
              <div className="space-y-2">
                <Label htmlFor="studentId">Student *</Label>
                <Select
                  value={formData.studentId}
                  onValueChange={(value) => setFormData({ ...formData, studentId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.full_name} ({student.school?.name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="schoolId">School *</Label>
                <Select
                  value={formData.schoolId}
                  onValueChange={(value) => setFormData({ ...formData, schoolId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select school" />
                  </SelectTrigger>
                  <SelectContent>
                    {schools.map((school) => (
                      <SelectItem key={school.id} value={school.id}>
                        {school.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

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
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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

            <div className="space-y-2">
              <Label htmlFor="hoursSpent">Hours Spent *</Label>
              <Input
                id="hoursSpent"
                type="number"
                step="0.5"
                required
                value={formData.hoursSpent}
                onChange={(e) => setFormData({ ...formData, hoursSpent: e.target.value })}
                placeholder="e.g., 2.5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attendanceStatus">Attendance Status *</Label>
              <Select
                value={formData.attendanceStatus}
                onValueChange={(value) => setFormData({ ...formData, attendanceStatus: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="held">Class Held</SelectItem>
                  <SelectItem value="missed">Student Missed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback">Class Feedback *</Label>
            <Textarea
              id="feedback"
              required
              rows={4}
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              placeholder="What did you cover in this class? How did the student(s) perform?"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nextSteps">Next Steps</Label>
            <Textarea
              id="nextSteps"
              rows={3}
              value={formData.nextSteps}
              onChange={(e) => setFormData({ ...formData, nextSteps: e.target.value })}
              placeholder="What should be covered in the next class?"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Class Report"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
