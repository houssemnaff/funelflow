"use client"

import { Bell, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const Header =()=> {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-30">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            System status: <span className="text-green-500 font-medium">Online</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Alerts */}
          <Button variant="ghost" size="icon" className="relative hover:bg-secondary">
            <AlertCircle size={20} className="text-yellow-500" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-yellow-500 rounded-full"></span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative hover:bg-secondary">
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
          </Button>
        </div>
      </div>
    </header>
  )
}
export default Header;