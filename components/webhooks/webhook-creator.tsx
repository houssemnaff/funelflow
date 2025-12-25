"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Plus } from "lucide-react"

interface HeaderPair {
  id: string
  key: string
  value: string
}

const WebhookCreator =()=> {
  const [webhookType, setWebhookType] = useState("custom")
  const [endpoint, setEndpoint] = useState("")
  const [headers, setHeaders] = useState<HeaderPair[]>([{ id: "1", key: "Content-Type", value: "application/json" }])
  const [payload, setPayload] = useState(
    '{\n  "user_id": "{user_id}",\n  "email": "{email}",\n  "status": "{status}"\n}',
  )

  const webhookTypes = [
    { value: "custom", label: "Custom Webhook" },
    { value: "email", label: "Email Engine" },
    { value: "crm", label: "CRM" },
    { value: "slack", label: "Slack" },
  ]

  const addHeader = () => {
    setHeaders([...headers, { id: Date.now().toString(), key: "", value: "" }])
  }

  const removeHeader = (id: string) => {
    setHeaders(headers.filter((h) => h.id !== id))
  }

  const updateHeader = (id: string, field: "key" | "value", newValue: string) => {
    setHeaders(headers.map((h) => (h.id === id ? { ...h, [field]: newValue } : h)))
  }

  return (
    <div className="space-y-6">
      {/* Type Selection */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle>Webhook Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {webhookTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setWebhookType(type.value)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  webhookType === type.value ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                }`}
              >
                <p className="font-medium">{type.label}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Endpoint Configuration */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle>Endpoint Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="endpoint">Webhook URL</Label>
            <Input
              id="endpoint"
              placeholder="https://your-endpoint.com/webhook"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
            />
          </div>

          {/* Headers */}
          <div className="space-y-3">
            <Label>Headers (Optional)</Label>
            {headers.map((header, index) => (
              <div key={header.id} className="flex gap-2">
                <Input
                  placeholder="Header key"
                  value={header.key}
                  onChange={(e) => updateHeader(header.id, "key", e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Header value"
                  value={header.value}
                  onChange={(e) => updateHeader(header.id, "value", e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeHeader(header.id)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={addHeader}
              className="border-primary/50 hover:border-primary bg-transparent"
            >
              <Plus size={14} className="mr-2" />
              Add Header
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payload Template */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle>Payload Template</CardTitle>
          <CardDescription>
            Available variables: {"{user_id}"}, {"{email}"}, {"{status}"}, {"{score}"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Label htmlFor="payload">JSON Payload</Label>
          <Textarea
            id="payload"
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            className="font-mono text-sm min-h-[200px]"
          />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="flex-1 bg-primary hover:bg-primary/90">Save Webhook</Button>
        <Button variant="outline" className="flex-1 border-primary/50 bg-transparent">
          Test Configuration
        </Button>
      </div>
    </div>
  )
}
export default WebhookCreator;