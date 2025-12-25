"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Edit2, Trash2, Search, Filter } from "lucide-react"

interface Rule {
  id: string
  name: string
  status: "active" | "inactive"
  priority: number
  lastExecuted: string
  executions: number
}

const mockRules: Rule[] = [
  { id: "1", name: "Premium Quiz to CRM", status: "active", priority: 1, lastExecuted: "2 min ago", executions: 1250 },
  { id: "2", name: "Lead Scoring Rule", status: "active", priority: 2, lastExecuted: "5 min ago", executions: 892 },
  {
    id: "3",
    name: "Failed Payment Retry",
    status: "inactive",
    priority: 3,
    lastExecuted: "1 hour ago",
    executions: 125,
  },
  { id: "4", name: "VIP User Redirect", status: "active", priority: 1, lastExecuted: "just now", executions: 48 },
]

const RuleList  = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")

  const filteredRules = mockRules.filter((rule) => {
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || rule.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <Card className="bg-card/50 border-primary/20">
      <CardHeader>
        <CardTitle>Rules Library</CardTitle>
        <CardDescription>Manage your orchestration rules</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={16} />
            <Input
              placeholder="Search rules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "active", "inactive"] as const).map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="capitalize"
              >
                <Filter size={14} className="mr-2" />
                {status}
              </Button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr className="text-muted-foreground">
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Priority</th>
                <th className="text-left py-3 px-4 font-medium">Last Executed</th>
                <th className="text-left py-3 px-4 font-medium">Executions</th>
                <th className="text-right py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRules.map((rule) => (
                <tr key={rule.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">{rule.name}</td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={rule.status === "active" ? "default" : "secondary"}
                      className={rule.status === "active" ? "bg-green-500/20 text-green-500" : ""}
                    >
                      {rule.status === "active" ? "✓" : "○"} {rule.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{rule.priority}</td>
                  <td className="py-3 px-4 text-muted-foreground">{rule.lastExecuted}</td>
                  <td className="py-3 px-4 text-muted-foreground">{rule.executions}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="text-primary hover:bg-secondary">
                        <Edit2 size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRules.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No rules found matching your criteria</div>
        )}
      </CardContent>
    </Card>
  )
}
export default RuleList;