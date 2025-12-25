"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const performanceData = [
  { time: "00:00", latency: 25, errorRate: 0.2, requests: 1200 },
  { time: "04:00", latency: 32, errorRate: 0.5, requests: 1800 },
  { time: "08:00", latency: 45, errorRate: 1.2, requests: 2400 },
  { time: "12:00", latency: 52, errorRate: 1.5, requests: 3200 },
  { time: "16:00", latency: 48, errorRate: 0.8, requests: 2800 },
  { time: "20:00", latency: 38, errorRate: 0.3, requests: 2200 },
  { time: "23:59", latency: 28, errorRate: 0.1, requests: 1500 },
]

const PerformanceMetrics =()=> {
  return (
    <div className="space-y-4">
      {/* Alert */}
      <Alert className="border-yellow-500/50 bg-yellow-500/10">
        <AlertCircle className="h-4 w-4 text-yellow-500" />
        <AlertDescription className="text-yellow-700 dark:text-yellow-400">
          Latency spike detected at 12:00 (52ms) - exceeds target of 50ms. Investigate API performance.
        </AlertDescription>
      </Alert>

      {/* Charts */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle>API Performance (24h)</CardTitle>
          <CardDescription>Latency and error rate monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
              <XAxis dataKey="time" stroke="hsl(var(--color-muted-foreground))" />
              <YAxis yAxisId="left" stroke="hsl(var(--color-muted-foreground))" />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--color-muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--color-card))",
                  border: "1px solid hsl(var(--color-border))",
                }}
                labelStyle={{ color: "hsl(var(--color-foreground))" }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="latency"
                stroke="hsl(var(--color-chart-1))"
                strokeWidth={2}
                dot={false}
                name="Latency (ms)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="errorRate"
                stroke="hsl(var(--color-destructive))"
                strokeWidth={2}
                dot={false}
                name="Error Rate (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Average Latency</p>
            <p className="text-2xl font-bold text-foreground">38ms</p>
            <p className="text-xs text-green-500 mt-2">✓ Within target (50ms)</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Error Rate</p>
            <p className="text-2xl font-bold text-foreground">0.76%</p>
            <p className="text-xs text-green-500 mt-2">✓ Below threshold (1%)</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Requests (24h)</p>
            <p className="text-2xl font-bold text-foreground">16.4K</p>
            <p className="text-xs text-muted-foreground mt-2">Average per interval</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Uptime</p>
            <p className="text-2xl font-bold text-green-500">99.97%</p>
            <p className="text-xs text-muted-foreground mt-2">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default PerformanceMetrics;