import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogOut } from "lucide-react"

interface AdminHeaderProps {
  onSignOut: () => void
}

export default function AdminHeader({ onSignOut }: AdminHeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold font-montserrat">Thynkcity Admin</h1>
          <Badge variant="secondary">Dashboard</Badge>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Welcome, Admin</span>
          <Button variant="outline" size="sm" onClick={onSignOut} className="hover-lift bg-transparent">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  )
}