"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"
import UserList from "@/components/users/user-list"
import RolePermissions from "@/components/users/role-permissions"

export default function UsersPage() {
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
          <div className="p-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">User Management</h1>
              <p className="text-muted-foreground">Manage team members and permissions</p>
            </div>

            <UserList />
            <RolePermissions />
          </div>
        </main>
      </div>
    </div>
  )
}
