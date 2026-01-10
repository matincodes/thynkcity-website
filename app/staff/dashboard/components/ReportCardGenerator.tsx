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
import { FileText, Download } from "lucide-react"

interface ReportCardGeneratorProps {
  staffId: string
}

export default function ReportCardGenerator({ staffId }: ReportCardGeneratorProps) {
  const [students, setStudents] = useState<any[]>([])
  const [formData, setFormData] = useState({
    studentId: "",
    subject: "",
    term: "",
    overallFeedback: "",
    strengths: "",
    areasOfImprovement: "",
    recommendations: "",
    grade: "",
  })

  const supabase = createClient()

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    const { data } = await supabase.from("students").select("*, school:schools(name)").order("full_name")

    if (data) setStudents(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { error } = await supabase.from("report_cards").insert({
        student_id: formData.studentId,
        subject: formData.subject,
        term: formData.term,
        overall_feedback: formData.overallFeedback,
        strengths: formData.strengths,
        areas_of_improvement: formData.areasOfImprovement,
        recommendations: formData.recommendations,
        grade: formData.grade,
        created_by: staffId,
      })

      if (error) throw error

      alert("Report card created successfully!")
      setFormData({
        studentId: "",
        subject: "",
        term: "",
        overallFeedback: "",
        strengths: "",
        areasOfImprovement: "",
        recommendations: "",
        grade: "",
      })
    } catch (error: any) {
      console.error("[v0] Error creating report card:", error)
      alert("Failed to create report card: " + error.message)
    }
  }

  const generatePDF = () => {
    alert("PDF generation feature coming soon! For now, report cards are saved to the database.")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Report Card</CardTitle>
        <CardDescription>Create comprehensive student performance reports</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="term">Term/Period *</Label>
              <Input
                id="term"
                required
                value={formData.term}
                onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                placeholder="e.g., Term 1 2024, Q1 2024"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">Grade *</Label>
              <Select value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+ (Excellent)</SelectItem>
                  <SelectItem value="A">A (Very Good)</SelectItem>
                  <SelectItem value="B+">B+ (Good)</SelectItem>
                  <SelectItem value="B">B (Above Average)</SelectItem>
                  <SelectItem value="C">C (Average)</SelectItem>
                  <SelectItem value="D">D (Below Average)</SelectItem>
                  <SelectItem value="F">F (Needs Improvement)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="overallFeedback">Overall Feedback *</Label>
            <Textarea
              id="overallFeedback"
              required
              rows={3}
              value={formData.overallFeedback}
              onChange={(e) => setFormData({ ...formData, overallFeedback: e.target.value })}
              placeholder="Summarize the student's overall performance during this period..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="strengths">Strengths *</Label>
            <Textarea
              id="strengths"
              required
              rows={3}
              value={formData.strengths}
              onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
              placeholder="What are the student's key strengths and achievements?"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="areasOfImprovement">Areas of Improvement *</Label>
            <Textarea
              id="areasOfImprovement"
              required
              rows={3}
              value={formData.areasOfImprovement}
              onChange={(e) => setFormData({ ...formData, areasOfImprovement: e.target.value })}
              placeholder="What areas need more focus and development?"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recommendations">Recommendations *</Label>
            <Textarea
              id="recommendations"
              required
              rows={3}
              value={formData.recommendations}
              onChange={(e) => setFormData({ ...formData, recommendations: e.target.value })}
              placeholder="What steps should be taken for continued growth?"
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Save Report Card
            </Button>
            <Button type="button" variant="outline" onClick={generatePDF}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
