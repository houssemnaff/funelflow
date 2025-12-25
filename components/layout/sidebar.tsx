"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BarChart3, Settings, Users, Webhook, Upload, Home, Menu, X, LogOut, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/rules", label: "Rules Manager", icon: Zap },
  { href: "/webhooks", label: "Webhooks", icon: Webhook },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/monitoring", label: "Monitoring", icon: Settings },
  { href: "/users", label: "Users", icon: Users },
  { href: "/import-export", label: "Import/Export", icon: Upload },
]

const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    router.push("/")
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-sidebar border border-sidebar-border"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 z-40",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="h-10 w-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-bold">F</span>
              </div>
              <div className="hidden md:block">
                <p className="font-bold text-sidebar-foreground">Funnel Flow</p>
                <p className="text-xs text-sidebar-accent-foreground">Orchestrator</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-sidebar-border space-y-2">
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {typeof window !== "undefined" ? localStorage.getItem("userName") || "User" : "User"}
              </p>
              <p className="text-xs text-sidebar-accent-foreground truncate">
                {typeof window !== "undefined"
                  ? localStorage.getItem("userEmail") || "user@example.com"
                  : "user@example.com"}
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-destructive hover:text-destructive bg-transparent"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
export default Sidebar;