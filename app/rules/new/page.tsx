"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"
import RuleEditor from "@/components/rules/rule-editor"

export default function NewRulePage() {
  const router = useRouter()

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
          <div className="p-6 max-w-4xl">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">Create New Rule</h1>
              <p className="text-muted-foreground">Design your IFTTT orchestration rule</p>
            </div>
            <RuleEditor />
          </div>
        </main>
      </div>
    </div>
  )
}
