"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

interface UserJourney {
  id: string
  userId: string
  email: string
  stepsCompleted: string[]
  lastActivity: string
  status: "converted" | "in-progress" | "abandoned"
  source: string
  score: number
}

const mockUsers: UserJourney[] = [
  {
    id: "1",
    userId: "usr_123",
    email: "john@example.com",
    stepsCompleted: ["Landing", "Quiz", "Completed", "Lead", "Checkout", "Purchase"],
    lastActivity: "2 min ago",
    status: "converted",
    source: "Organic",
    score: 95,
  },
  {
    id: "2",
    userId: "usr_124",
    email: "jane@example.com",
    stepsCompleted: ["Landing", "Quiz", "Completed", "Lead"],
    lastActivity: "15 min ago",
    status: "in-progress",
    source: "Paid Ads",
    score: 72,
  },
  {
    id: "3",
    userId: "usr_125",
    email: "bob@example.com",
    stepsCompleted: ["Landing", "Quiz"],
    lastActivity: "2 hours ago",
    status: "abandoned",
    source: "Email Campaign",
    score: 35,
  },
  {
    id: "4",
    userId: "usr_126",
    email: "alice@example.com",
    stepsCompleted: ["Landing", "Quiz", "Completed", "Lead", "Checkout"],
    lastActivity: "30 min ago",
    status: "in-progress",
    source: "Organic",
    score: 88,
  },
]

const UserJourneyTable =()=> {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.userId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "converted":
        return "bg-green-500/20 text-green-500"
      case "in-progress":
        return "bg-blue-500/20 text-blue-500"
      case "abandoned":
        return "bg-red-500/20 text-red-500"
      default:
        return ""
    }
  }

  return (
    <Card className="bg-card/50 border-primary/20">
      <CardHeader>
        <CardTitle>User Journeys</CardTitle>
        <CardDescription>Track individual user progression through the funnel</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-muted-foreground" size={16} />
          <Input
            placeholder="Search by email or user ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr className="text-muted-foreground">
                <th className="text-left py-3 px-4 font-medium">User</th>
                <th className="text-left py-3 px-4 font-medium">Steps Completed</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Source</th>
                <th className="text-left py-3 px-4 font-medium">Score</th>
                <th className="text-left py-3 px-4 font-medium">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground">{user.userId}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1 flex-wrap">
                      {user.stepsCompleted.slice(0, 3).map((step, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {step}
                        </Badge>
                      ))}
                      {user.stepsCompleted.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{user.stepsCompleted.length - 3}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{user.source}</td>
                  <td className="py-3 px-4">
                    <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${user.score}%` }} />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{user.lastActivity}</td>
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
export default UserJourneyTable;