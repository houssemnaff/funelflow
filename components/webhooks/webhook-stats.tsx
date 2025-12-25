"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { time: "00:00", success: 120, failed: 4 },
  { time: "04:00", success: 180, failed: 12 },
  { time: "08:00", success: 240, failed: 8 },
  { time: "12:00", success: 320, failed: 5 },
  { time: "16:00", success: 280, failed: 18 },
  { time: "20:00", success: 220, failed: 3 },
  { time: "23:59", success: 150, failed: 2 },
]

const WebhookStats =()=> {
  return (
    <Card className="bg-card/50 border-primary/20">
      <CardHeader>
        <CardTitle>Webhook Success Rate (24h)</CardTitle>
        <CardDescription>Successful vs failed webhook deliveries</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
            <XAxis dataKey="time" stroke="hsl(var(--color-muted-foreground))" />
            <YAxis stroke="hsl(var(--color-muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--color-card))",
                border: "1px solid hsl(var(--color-border))",
              }}
              labelStyle={{ color: "hsl(var(--color-foreground))" }}
            />
            <Legend />
            <Bar dataKey="success" fill="hsl(var(--color-chart-1))" name="Successful" />
            <Bar dataKey="failed" fill="hsl(var(--color-destructive))" name="Failed" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
export default WebhookStats;