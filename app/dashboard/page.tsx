"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import StatCard from "@/components/dashboard/stat-card"
import ActivityChart from "@/components/dashboard/activity-chart"
import QuickActions from "@/components/dashboard/quick-actions"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"
import { AlertCircle, CheckCircle2, TrendingUp, Zap } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const authToken = localStorage.getItem("authToken")
    if (!authToken) {
      router.push("/")
    }
  }, [router])

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64 overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Active Rules"
                value="24"
                description="of 32 total"
                trend="up"
                trendValue="+3 this week"
                icon={<Zap size={20} />}
              />
              <StatCard
                title="API Requests (24h)"
                value="12.4K"
                description="all successful"
                trend="up"
                trendValue="+2.1K vs yesterday"
                icon={<TrendingUp size={20} />}
              />
              <StatCard
                title="Average Latency"
                value="23ms"
                description="target: 50ms"
                trend="down"
                trendValue="-5ms vs yesterday"
                icon={<CheckCircle2 size={20} />}
              />
              <StatCard
                title="Webhook Success Rate"
                value="99.2%"
                description="global funnel"
                trend="neutral"
                trendValue="12 failures"
                icon={<AlertCircle size={20} />}
              />
            </div>

            {/* Activity Chart */}
            <ActivityChart />

            {/* Quick Actions */}
            <QuickActions />
          </div>
        </main>
      </div>
    </div>
  )
}
