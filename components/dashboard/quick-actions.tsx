import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Zap, AlertCircle, Download } from "lucide-react"
import Link from "next/link"

export default function QuickActions() {
  const actions = [
    {
      icon: Plus,
      label: "Create New Rule",
      description: "Set up a new orchestration rule",
      href: "/rules/new",
      color: "text-blue-500",
    },
    {
      icon: Zap,
      label: "Test Rule",
      description: "Execute a rule with test data",
      href: "/rules?action=test",
      color: "text-yellow-500",
    },
    {
      icon: AlertCircle,
      label: "Failed Webhooks",
      description: "View and retry failed webhooks",
      href: "/webhooks?filter=failed",
      color: "text-red-500",
    },
    {
      icon: Download,
      label: "Export Logs",
      description: "Download system logs",
      href: "/import-export?action=export",
      color: "text-green-500",
    },
  ]

  return (
    <Card className="bg-card/50 border-primary/20">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and operations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Link key={action.href} href={action.href}>
                <Button
                  variant="outline"
                  className="w-full h-auto flex flex-col items-start p-4 border-primary/20 hover:border-primary/40 hover:bg-secondary transition-all group bg-transparent"
                >
                  <Icon className={`${action.color} mb-2 group-hover:scale-110 transition-transform`} size={24} />
                  <span className="font-medium text-foreground text-left">{action.label}</span>
                  <span className="text-xs text-muted-foreground text-left mt-1">{action.description}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
