"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

interface Permission {
  feature: string
  admin: boolean
  marketer: boolean
  viewer: boolean
}

const permissions: Permission[] = [
  { feature: "View Dashboard", admin: true, marketer: true, viewer: true },
  { feature: "Create Rules", admin: true, marketer: true, viewer: false },
  { feature: "Edit Rules", admin: true, marketer: true, viewer: false },
  { feature: "Delete Rules", admin: true, marketer: false, viewer: false },
  { feature: "View Analytics", admin: true, marketer: true, viewer: true },
  { feature: "Export Data", admin: true, marketer: true, viewer: false },
  { feature: "Manage Users", admin: true, marketer: false, viewer: false },
  { feature: "Configure Webhooks", admin: true, marketer: true, viewer: false },
  { feature: "View Webhooks", admin: true, marketer: true, viewer: true },
  { feature: "System Settings", admin: true, marketer: false, viewer: false },
]

export default function RolePermissions() {
  const PermissionIcon = ({ hasPermission }: { hasPermission: boolean }) => (
    <div className="flex justify-center">
      {hasPermission ? (
        <Check className="text-green-500" size={20} />
      ) : (
        <X className="text-muted-foreground" size={20} />
      )}
    </div>
  )

  return (
    <Card className="bg-card/50 border-primary/20">
      <CardHeader>
        <CardTitle>Role Permissions Matrix</CardTitle>
        <CardDescription>Fine-grained access control for different user roles</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr className="text-muted-foreground">
                <th className="text-left py-3 px-4 font-medium">Feature</th>
                <th className="text-center py-3 px-4 font-medium">
                  <Badge className="bg-purple-500/20 text-purple-500">Admin</Badge>
                </th>
                <th className="text-center py-3 px-4 font-medium">
                  <Badge className="bg-blue-500/20 text-blue-500">Marketer</Badge>
                </th>
                <th className="text-center py-3 px-4 font-medium">
                  <Badge className="bg-gray-500/20 text-gray-500">Viewer</Badge>
                </th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((perm) => (
                <tr key={perm.feature} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">{perm.feature}</td>
                  <td className="py-3 px-4">
                    <PermissionIcon hasPermission={perm.admin} />
                  </td>
                  <td className="py-3 px-4">
                    <PermissionIcon hasPermission={perm.marketer} />
                  </td>
                  <td className="py-3 px-4">
                    <PermissionIcon hasPermission={perm.viewer} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
