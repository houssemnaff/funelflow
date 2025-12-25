import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  icon?: React.ReactNode
}

export default function StatCard({ title, value, description, trend, trendValue, icon }: StatCardProps) {
  return (
    <Card className="bg-card/50 border-primary/20 hover:border-primary/40 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {icon && <div className="text-primary">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-foreground">{value}</div>
          {(description || trend) && (
            <div className="flex items-center gap-2">
              {trend && trendValue && (
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-muted-foreground"
                  }`}
                >
                  {trend === "up" ? <ArrowUp size={16} /> : trend === "down" ? <ArrowDown size={16} /> : null}
                  {trendValue}
                </div>
              )}
              {description && <span className="text-xs text-muted-foreground">{description}</span>}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
