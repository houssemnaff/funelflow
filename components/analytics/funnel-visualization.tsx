"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FunnelStep {
  name: string
  users: number
  converted: number
  conversionRate: number
}

const funnelSteps: FunnelStep[] = [
  { name: "Landing Page", users: 5000, converted: 4200, conversionRate: 84 },
  { name: "Quiz Started", users: 4200, converted: 3600, conversionRate: 86 },
  { name: "Quiz Completed", users: 3600, converted: 2800, conversionRate: 78 },
  { name: "Lead Captured", users: 2800, converted: 2100, conversionRate: 75 },
  { name: "Checkout", users: 2100, converted: 1890, conversionRate: 90 },
  { name: "Purchase", users: 1890, converted: 1701, conversionRate: 90 },
]

const maxUsers = funnelSteps[0].users

const FunnelVisualization =()=> {
  return (
    <Card className="bg-card/50 border-primary/20">
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
        <CardDescription>User flow through your orchestration funnel</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {funnelSteps.map((step, index) => {
          const width = (step.users / maxUsers) * 100
          const dropOff = index === 0 ? 0 : funnelSteps[index - 1].users - step.users

          return (
            <div key={step.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">{step.name}</h3>
                <div className="flex gap-3 text-sm">
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {step.users.toLocaleString()} users
                  </Badge>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    {step.conversionRate}%
                  </Badge>
                </div>
              </div>

              {/* Funnel Bar */}
              <div className="relative h-12 bg-secondary rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent flex items-center pl-4 transition-all"
                  style={{ width: `${width}%` }}
                >
                  <span className="text-sm font-medium text-primary-foreground">{step.converted.toLocaleString()}</span>
                </div>
              </div>

              {/* Drop-off Info */}
              {dropOff > 0 && (
                <p className="text-xs text-muted-foreground">
                  {dropOff.toLocaleString()} users dropped off (
                  {Math.round((dropOff / funnelSteps[index - 1].users) * 100)}%)
                </p>
              )}
            </div>
          )
        })}

        {/* Summary */}
        <div className="mt-8 p-4 bg-secondary rounded-lg border border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-muted-foreground text-sm">Total Users</p>
              <p className="text-2xl font-bold text-foreground">5,000</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Conversions</p>
              <p className="text-2xl font-bold text-green-500">1,701</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Overall Rate</p>
              <p className="text-2xl font-bold text-primary">34.02%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
export default FunnelVisualization;