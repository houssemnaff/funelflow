"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Edit2, Trash2, Search, Shield } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "marketer" | "viewer"
  lastLogin: string
  rulesCreated: number
  status: "active" | "inactive"
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@company.com",
    role: "admin",
    lastLogin: "2 min ago",
    rulesCreated: 24,
    status: "active",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@company.com",
    role: "marketer",
    lastLogin: "1 hour ago",
    rulesCreated: 12,
    status: "active",
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol@company.com",
    role: "viewer",
    lastLogin: "3 days ago",
    rulesCreated: 0,
    status: "active",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david@company.com",
    role: "marketer",
    lastLogin: "1 week ago",
    rulesCreated: 8,
    status: "inactive",
  },
]

const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-purple-500/20 text-purple-500"
    case "marketer":
      return "bg-blue-500/20 text-blue-500"
    case "viewer":
      return "bg-gray-500/20 text-gray-500"
    default:
      return ""
  }
}

const getRoleDescription = (role: string) => {
  switch (role) {
    case "admin":
      return "Full access"
    case "marketer":
      return "Create & modify rules"
    case "viewer":
      return "Read only"
    default:
      return ""
  }
}

export default function UserList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="bg-card/50 border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage administrator and user access</CardDescription>
          </div>
          <Button className="bg-primary hover:bg-primary/90">+ Invite User</Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-muted-foreground" size={16} />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr className="text-muted-foreground">
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-left py-3 px-4 font-medium">Email</th>
                <th className="text-left py-3 px-4 font-medium">Role</th>
                <th className="text-left py-3 px-4 font-medium">Rules Created</th>
                <th className="text-left py-3 px-4 font-medium">Last Login</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-right py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">{user.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Shield size={14} />
                      <div>
                        <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{getRoleDescription(user.role)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{user.rulesCreated}</td>
                  <td className="py-3 px-4 text-muted-foreground">{user.lastLogin}</td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={user.status === "active" ? "default" : "secondary"}
                      className={user.status === "active" ? "bg-green-500/20 text-green-500" : ""}
                    >
                      {user.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="text-primary hover:bg-secondary">
                        <Edit2 size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && <div className="text-center py-8 text-muted-foreground">No users found</div>}
      </CardContent>
    </Card>
  )
}
