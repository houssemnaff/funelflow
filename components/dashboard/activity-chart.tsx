"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { time: "00:00", rules: 12, webhooks: 8, requests: 1200 },
  { time: "04:00", rules: 18, webhooks: 12, requests: 1800 },
  { time: "08:00", rules: 25, webhooks: 18, requests: 2400 },
  { time: "12:00", rules: 32, webhooks: 28, requests: 3200 },
  { time: "16:00", rules: 28, webhooks: 24, requests: 2800 },
  { time: "20:00", rules: 22, webhooks: 19, requests: 2200 },
  { time: "23:59", rules: 15, webhooks: 11, requests: 1500 },
]

export default function ActivityChart() {
  return (
    <Card className="bg-card/50 border-primary/20">
      <CardHeader>
        <CardTitle>System Activity (24h)</CardTitle>
        <CardDescription>Rules execution and requests over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
            <XAxis dataKey="time" stroke="hsl(var(--color-muted-foreground))" />
            <YAxis stroke="hsl(var(--color-muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--color-card))",
                border: "1px solid hsl(var(--color-border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--color-foreground))" }}
            />
            <Line
              type="monotone"
              dataKey="rules"
              stroke="hsl(var(--color-chart-1))"
              strokeWidth={2}
              dot={false}
              name="Rules Triggered"
            />
            <Line
              type="monotone"
              dataKey="webhooks"
              stroke="hsl(var(--color-chart-2))"
              strokeWidth={2}
              dot={false}
              name="Webhooks Sent"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
