"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { BarChart3, Building2, FileText, DollarSign, Plus, LogOut, CheckCircle, User } from "lucide-react"

export default function FranchiseDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [franchisee, setFranchisee] = useState<any>(null)
  const [schools, setSchools] = useState<any[]>([])
  const [proposals, setProposals] = useState<any[]>([])
  const [discountRequests, setDiscountRequests] = useState<any[]>([])
  const [showForm, setShowForm] = useState<string | null>(null)

  const [stats, setStats] = useState({
    totalSchools: 0,
    activeLeads: 0,
    proposalsSent: 0,
    closedDeals: 0,
    monthlyRevenue: 0,
    conversionRate: 0,
  })

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/franchise/login")
        return
      }

      const { data: franchiseeData } = await supabase
        .from("franchisee_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single()

      if (!franchiseeData) {
        router.push("/franchise/login")
        return
      }

      if (franchiseeData.status !== "active") {
        router.push("/franchise/pending")
        return
      }

      setUser(user)
      setFranchisee(franchiseeData)
      fetchData(franchiseeData.id)
    } catch (error) {
      console.error("Auth error:", error)
      router.push("/franchise/login")
    }
  }

  const fetchData = async (franchiseeId: string) => {
    try {
      setLoading(true)

      const [schoolsRes, proposalsRes, discountRequestsRes] = await Promise.all([
        supabase
          .from("franchise_schools")
          .select("*")
          .eq("franchisee_id", franchiseeId)
          .order("created_at", { ascending: false }),
        supabase
          .from("franchise_documents")
          .select("*")
          .eq("franchisee_id", franchiseeId)
          .eq("type", "proposal")
          .order("created_at", { ascending: false }),
        supabase
          .from("discount_requests")
          .select("*")
          .eq("franchisee_id", franchiseeId)
          .order("created_at", { ascending: false }),
      ])

      if (schoolsRes.data) setSchools(schoolsRes.data)
      if (proposalsRes.data) setProposals(proposalsRes.data)
      if (discountRequestsRes.data) setDiscountRequests(discountRequestsRes.data)

      // Calculate stats
      const totalSchools = schoolsRes.data?.length || 0
      const activeLeads =
        schoolsRes.data?.filter((s) => ["lead", "contacted", "proposal_sent", "negotiating"].includes(s.status))
          .length || 0
      const proposalsSent = proposalsRes.data?.filter((p) => p.status !== "draft").length || 0
      const closedDeals = schoolsRes.data?.filter((s) => s.status === "closed_won").length || 0
      const monthlyRevenue =
        schoolsRes.data
          ?.filter((s) => s.status === "closed_won")
          .reduce((sum, s) => sum + (s.estimated_value || 0), 0) || 0
      const conversionRate = totalSchools > 0 ? (closedDeals / totalSchools) * 100 : 0

      setStats({
        totalSchools,
        activeLeads,
        proposalsSent,
        closedDeals,
        monthlyRevenue,
        conversionRate,
      })
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/franchise/login")
  }

  const addSchool = async (schoolData: any) => {
    try {
      const { error } = await supabase.from("franchise_schools").insert({
        ...schoolData,
        franchisee_id: franchisee.id,
        status: "lead",
      })

      if (error) throw error

      // Log activity
      await supabase.from("franchise_activity_log").insert({
        franchisee_id: franchisee.id,
        activity_type: "school_added",
        description: `Added new school: ${schoolData.name}`,
      })

      fetchData(franchisee.id)
      setShowForm(null)
    } catch (error) {
      console.error("Error adding school:", error)
    }
  }

  const updateSchoolStatus = async (schoolId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("franchise_schools")
        .update({ status, last_contact: new Date().toISOString() })
        .eq("id", schoolId)

      if (error) throw error

      // Log activity
      await supabase.from("franchise_activity_log").insert({
        franchisee_id: franchisee.id,
        activity_type: "status_update",
        description: `Updated school status to: ${status}`,
      })

      fetchData(franchisee.id)
    } catch (error) {
      console.error("Error updating school status:", error)
    }
  }

  const generateProposal = async (schoolId: string, type: "detailed" | "brochure" | "contract") => {
    try {
      const school = schools.find((s) => s.id === schoolId)
      if (!school) return

      const { error } = await supabase.from("franchise_documents").insert({
        franchisee_id: franchisee.id,
        school_id: schoolId,
        type: "proposal",
        title: `${type} proposal for ${school.name}`,
        content: `Generated ${type} proposal`,
        status: "draft",
      })

      if (error) throw error

      // Log activity
      await supabase.from("franchise_activity_log").insert({
        franchisee_id: franchisee.id,
        activity_type: "proposal_generated",
        description: `Generated ${type} proposal for ${school.name}`,
      })

      fetchData(franchisee.id)
    } catch (error) {
      console.error("Error generating proposal:", error)
    }
  }

  const requestDiscount = async (schoolId: string, discountData: any) => {
    try {
      const school = schools.find((s) => s.id === schoolId)
      if (!school) return

      const { error } = await supabase.from("discount_requests").insert({
        franchisee_id: franchisee.id,
        school_name: school.name,
        original_amount: school.estimated_value || 0,
        requested_discount: discountData.discount,
        reason: discountData.reason,
        status: "pending",
      })

      if (error) throw error

      // Log activity
      await supabase.from("franchise_activity_log").insert({
        franchisee_id: franchisee.id,
        activity_type: "discount_requested",
        description: `Requested ${discountData.discount}% discount for ${school.name}`,
      })

      fetchData(franchisee.id)
    } catch (error) {
      console.error("Error requesting discount:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold font-montserrat">Thynkcity Franchise Portal</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {franchisee?.full_name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={activeTab === "schools" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("schools")}
            >
              <Building2 className="h-4 w-4 mr-2" />
              School CRM
            </Button>
            <Button
              variant={activeTab === "proposals" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("proposals")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </Button>
            <Button
              variant={activeTab === "discounts" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("discounts")}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Discount Requests
            </Button>
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("profile")}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-montserrat mb-2">Dashboard Overview</h2>
                <p className="text-muted-foreground">Track your franchise performance and manage your pipeline</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="hover-lift smooth-transition">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalSchools}</div>
                    <p className="text-xs text-muted-foreground">{stats.activeLeads} active leads</p>
                  </CardContent>
                </Card>

                <Card className="hover-lift smooth-transition">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Documents Created</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.proposalsSent}</div>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>

                <Card className="hover-lift smooth-transition">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Closed Deals</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.closedDeals}</div>
                    <p className="text-xs text-muted-foreground">{stats.conversionRate.toFixed(1)}% conversion rate</p>
                  </CardContent>
                </Card>

                <Card className="hover-lift smooth-transition">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₦{stats.monthlyRevenue.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">From closed deals</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Schools</CardTitle>
                  <CardDescription>Your latest school interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  {schools.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>School Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Last Contact</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {schools.slice(0, 5).map((school) => (
                          <TableRow key={school.id}>
                            <TableCell className="font-medium">{school.name}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  school.status === "closed_won"
                                    ? "default"
                                    : school.status === "closed_lost"
                                      ? "destructive"
                                      : school.status === "negotiating"
                                        ? "secondary"
                                        : "outline"
                                }
                              >
                                {school.status?.replace("_", " ") || "lead"}
                              </Badge>
                            </TableCell>
                            <TableCell>₦{(school.estimated_value || 0).toLocaleString()}</TableCell>
                            <TableCell>
                              {new Date(school.last_contact || school.created_at).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        No schools added yet. Start by adding your first school lead!
                      </p>
                      <Button className="mt-4" onClick={() => setActiveTab("schools")}>
                        Add Your First School
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "schools" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold font-montserrat mb-2">School CRM</h2>
                  <p className="text-muted-foreground">Manage your school leads and pipeline</p>
                </div>
                <Button onClick={() => setShowForm("school")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add School
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Schools</CardTitle>
                  <CardDescription>Track and manage your school relationships</CardDescription>
                </CardHeader>
                <CardContent>
                  {schools.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>School Name</TableHead>
                          <TableHead>Contact Person</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Estimated Value</TableHead>
                          <TableHead>Last Contact</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {schools.map((school) => (
                          <TableRow key={school.id}>
                            <TableCell className="font-medium">{school.name}</TableCell>
                            <TableCell>{school.contact_person}</TableCell>
                            <TableCell>
                              <Select
                                value={school.status || "lead"}
                                onValueChange={(value) => updateSchoolStatus(school.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="lead">Lead</SelectItem>
                                  <SelectItem value="contacted">Contacted</SelectItem>
                                  <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                                  <SelectItem value="negotiating">Negotiating</SelectItem>
                                  <SelectItem value="closed_won">Closed Won</SelectItem>
                                  <SelectItem value="closed_lost">Closed Lost</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>₦{(school.estimated_value || 0).toLocaleString()}</TableCell>
                            <TableCell>
                              {new Date(school.last_contact || school.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => generateProposal(school.id, "detailed")}
                                >
                                  Generate Proposal
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        No schools added yet. Add your first school to get started!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-montserrat mb-2">Franchise Profile</h2>
                <p className="text-muted-foreground">Your franchise information and settings</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Your franchise details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <p className="text-sm text-muted-foreground mt-1">{franchisee?.full_name}</p>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <p className="text-sm text-muted-foreground mt-1">{franchisee?.email}</p>
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <p className="text-sm text-muted-foreground mt-1">{franchisee?.phone_number}</p>
                    </div>
                    <div>
                      <Label>Country</Label>
                      <p className="text-sm text-muted-foreground mt-1">{franchisee?.country}</p>
                    </div>
                    <div>
                      <Label>State/City</Label>
                      <p className="text-sm text-muted-foreground mt-1">{franchisee?.state_city}</p>
                    </div>
                    <div>
                      <Label>Territory</Label>
                      <p className="text-sm text-muted-foreground mt-1">{franchisee?.territory}</p>
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Badge className="mt-1" variant={franchisee?.status === "active" ? "default" : "secondary"}>
                        {franchisee?.status}
                      </Badge>
                    </div>
                    <div>
                      <Label>Joined</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(franchisee?.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {franchisee?.statement && (
                    <div>
                      <Label>Business Statement</Label>
                      <p className="text-sm text-muted-foreground mt-1">{franchisee.statement}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Add other tabs content here... */}
        </main>
      </div>

      {/* Add School Form Modal */}
      {showForm === "school" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add New School</CardTitle>
              <CardDescription>Add a new school to your pipeline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.target as HTMLFormElement)
                  addSchool({
                    name: formData.get("name"),
                    contact_person: formData.get("contact_person"),
                    email: formData.get("email"),
                    phone: formData.get("phone"),
                    address: formData.get("address"),
                    estimated_value: Number(formData.get("estimated_value")) || 0,
                    notes: formData.get("notes"),
                    last_contact: new Date().toISOString(),
                  })
                }}
              >
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">School Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div>
                    <Label htmlFor="contact_person">Contact Person</Label>
                    <Input id="contact_person" name="contact_person" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" required />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" required />
                  </div>
                  <div>
                    <Label htmlFor="estimated_value">Estimated Value (₦)</Label>
                    <Input id="estimated_value" name="estimated_value" type="number" />
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" name="notes" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <Button type="button" variant="outline" onClick={() => setShowForm(null)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add School</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
