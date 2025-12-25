"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, RotateCw, Trash2, Eye } from "lucide-react"

interface Webhook {
  id: string
  endpoint: string
  status: number
  triggeringRule: string
  lastSent: string
  responseTime: number
  failures: number
}

const mockWebhooks: Webhook[] = [
  {
    id: "1",
    endpoint: "https://api.crm.com/users",
    status: 200,
    triggeringRule: "Premium Quiz to CRM",
    lastSent: "2 min ago",
    responseTime: 145,
    failures: 0,
  },
  {
    id: "2",
    endpoint: "https://email-engine.app/send",
    status: 200,
    triggeringRule: "Lead Scoring Rule",
    lastSent: "5 min ago",
    responseTime: 234,
    failures: 0,
  },
  {
    id: "3",
    endpoint: "https://slack.com/api/chat.postMessage",
    status: 500,
    triggeringRule: "VIP User Redirect",
    lastSent: "15 min ago",
    responseTime: 0,
    failures: 3,
  },
  {
    id: "4",
    endpoint: "https://webhook.site/unique-id",
    status: 404,
    triggeringRule: "Failed Payment Retry",
    lastSent: "1 hour ago",
    responseTime: 0,
    failures: 12,
  },
]

const getStatusColor = (status: number) => {
  if (status === 200) return "bg-green-500/20 text-green-500"
  if (status >= 400 && status < 500) return "bg-yellow-500/20 text-yellow-500"
  return "bg-red-500/20 text-red-500"
}

const getStatusLabel = (status: number) => {
  return status === 0 ? "Timeout" : status
}

const WebhookList =()=> {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredWebhooks = mockWebhooks.filter((w) => w.endpoint.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Card className="bg-card/50 border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Webhooks Monitor</CardTitle>
            <CardDescription>Track and manage webhook endpoints</CardDescription>
          </div>
          <Button className="bg-primary hover:bg-primary/90">+ Add Webhook</Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input placeholder="Search webhooks..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr className="text-muted-foreground">
                <th className="text-left py-3 px-4 font-medium">Endpoint</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Triggering Rule</th>
                <th className="text-left py-3 px-4 font-medium">Response Time</th>
                <th className="text-left py-3 px-4 font-medium">Failures</th>
                <th className="text-left py-3 px-4 font-medium">Last Sent</th>
                <th className="text-right py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWebhooks.map((webhook) => (
                <tr key={webhook.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-secondary px-2 py-1 rounded max-w-[300px] truncate">
                        {webhook.endpoint}
                      </code>
                      <ExternalLink size={14} className="text-muted-foreground" />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={getStatusColor(webhook.status)}>{getStatusLabel(webhook.status)}</Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{webhook.triggeringRule}</td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {webhook.responseTime > 0 ? `${webhook.responseTime}ms` : "-"}
                  </td>
                  <td className="py-3 px-4">
                    {webhook.failures > 0 ? (
                      <Badge className="bg-red-500/20 text-red-500">{webhook.failures}</Badge>
                    ) : (
                      <span className="text-green-500">0</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{webhook.lastSent}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-primary hover:bg-secondary"
                        title="Retry"
                      >
                        <RotateCw size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-primary hover:bg-secondary"
                        title="View details"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredWebhooks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No webhooks found</div>
        )}
      </CardContent>
    </Card>
  )
}
export default WebhookList;