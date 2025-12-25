"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"
import WebhookList from "@/components/webhooks/webhook-list"
import WebhookStats from "@/components/webhooks/webhook-stats"
import WebhookCreator from "@/components/webhooks/webhook-creator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WebhooksPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("monitor")

  useEffect(() => {
    const authToken = localStorage.getItem("authToken")
    if (!authToken) {
      router.push("/")
    }
  }, [router])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">Webhooks Manager</h1>
              <p className="text-muted-foreground">Monitor and manage webhook endpoints</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="monitor">Monitor</TabsTrigger>
                <TabsTrigger value="create">Create</TabsTrigger>
              </TabsList>

              <TabsContent value="monitor" className="space-y-4">
                <WebhookStats />
                <WebhookList />
              </TabsContent>

              <TabsContent value="create" className="space-y-4">
                <WebhookCreator />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
