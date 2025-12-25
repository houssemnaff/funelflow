"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, X, Play, Code } from "lucide-react"

interface Condition {
  id: string
  type: "quizScore" | "userStatus" | "dateRange" | "custom"
  value: string
  operator: string
}

interface Action {
  id: string
  type: "redirect" | "webhook" | "status" | "email"
  value: string
}

export default function RuleEditor() {
  const [ruleName, setRuleName] = useState("New Rule")
  const [conditions, setConditions] = useState<Condition[]>([])
  const [actions, setActions] = useState<Action[]>([])
  const [logicOperator, setLogicOperator] = useState<"AND" | "OR">("AND")
  const [showJsonPreview, setShowJsonPreview] = useState(false)

  const addCondition = () => {
    setConditions([
      ...conditions,
      {
        id: Date.now().toString(),
        type: "custom",
        value: "",
        operator: "=",
      },
    ])
  }

  const removeCondition = (id: string) => {
    setConditions(conditions.filter((c) => c.id !== id))
  }

  const addAction = () => {
    setActions([
      ...actions,
      {
        id: Date.now().toString(),
        type: "redirect",
        value: "",
      },
    ])
  }

  const removeAction = (id: string) => {
    setActions(actions.filter((a) => a.id !== id))
  }

  const generateJson = () => {
    return {
      name: ruleName,
      priority: 1,
      enabled: true,
      conditions: conditions.map((c) => ({
        type: c.type,
        operator: c.operator,
        value: c.value,
      })),
      logicOperator,
      actions: actions.map((a) => ({
        type: a.type,
        value: a.value,
      })),
    }
  }

  const conditionTypes = [
    { value: "quizScore", label: "Quiz Score" },
    { value: "userStatus", label: "User Status" },
    { value: "dateRange", label: "Date Range" },
    { value: "custom", label: "Custom" },
  ]

  const actionTypes = [
    { value: "redirect", label: "Redirect to URL" },
    { value: "webhook", label: "Send Webhook" },
    { value: "status", label: "Change Status" },
    { value: "email", label: "Send Email" },
  ]

  return (
    <div className="space-y-6">
      {/* Rule Name */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle>Rule Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="ruleName">Rule Name</Label>
            <Input
              id="ruleName"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              placeholder="Enter rule name"
            />
          </div>
        </CardContent>
      </Card>

      {/* Conditions (IF) */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">IF</CardTitle>
              <CardDescription>Define conditions that trigger this rule</CardDescription>
            </div>
            {conditions.length > 1 && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Match:</span>
                <select
                  value={logicOperator}
                  onChange={(e) => setLogicOperator(e.target.value as "AND" | "OR")}
                  className="px-2 py-1 border border-input rounded-md bg-background text-foreground font-medium"
                >
                  <option value="AND">ALL</option>
                  <option value="OR">ANY</option>
                </select>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {conditions.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">No conditions added yet</p>
          ) : (
            conditions.map((condition, index) => (
              <div key={condition.id} className="space-y-3 p-4 border border-border rounded-lg">
                {index > 0 && (
                  <div className="flex items-center justify-center">
                    <div className="px-3 py-1 bg-secondary text-xs font-medium rounded-full">{logicOperator}</div>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-xs">Type</Label>
                    <select
                      value={condition.type}
                      onChange={(e) => {
                        const updated = [...conditions]
                        updated[index].type = e.target.value as any
                        setConditions(updated)
                      }}
                      className="w-full px-2 py-2 border border-input rounded-md bg-background text-foreground text-sm"
                    >
                      {conditionTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs">Operator</Label>
                    <select
                      value={condition.operator}
                      onChange={(e) => {
                        const updated = [...conditions]
                        updated[index].operator = e.target.value
                        setConditions(updated)
                      }}
                      className="w-full px-2 py-2 border border-input rounded-md bg-background text-foreground text-sm"
                    >
                      <option value="=">=</option>
                      <option value="!=">!=</option>
                      <option value=">">{">"}</option>
                      <option value="<">{"<"}</option>
                      <option value=">=">{"≥"}</option>
                      <option value="<=">{"≤"}</option>
                    </select>
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Label className="text-xs">Value</Label>
                      <Input
                        value={condition.value}
                        onChange={(e) => {
                          const updated = [...conditions]
                          updated[index].value = e.target.value
                          setConditions(updated)
                        }}
                        placeholder="Enter value"
                        className="text-sm"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCondition(condition.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}

          <Button
            variant="outline"
            onClick={addCondition}
            className="w-full border-primary/50 hover:border-primary bg-transparent"
          >
            <Plus size={16} className="mr-2" />
            Add Condition
          </Button>
        </CardContent>
      </Card>

      {/* Actions (THEN) */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">THEN</CardTitle>
          <CardDescription>Define actions to perform when conditions are met</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {actions.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">No actions added yet</p>
          ) : (
            actions.map((action, index) => (
              <div key={action.id} className="p-4 border border-border rounded-lg space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Action Type</Label>
                    <select
                      value={action.type}
                      onChange={(e) => {
                        const updated = [...actions]
                        updated[index].type = e.target.value as any
                        setActions(updated)
                      }}
                      className="w-full px-2 py-2 border border-input rounded-md bg-background text-foreground text-sm"
                    >
                      {actionTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Label className="text-xs">Value</Label>
                      <Input
                        value={action.value}
                        onChange={(e) => {
                          const updated = [...actions]
                          updated[index].value = e.target.value
                          setActions(updated)
                        }}
                        placeholder={action.type === "redirect" ? "https://example.com" : "Enter value"}
                        className="text-sm"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAction(action.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}

          <Button
            variant="outline"
            onClick={addAction}
            className="w-full border-primary/50 hover:border-primary bg-transparent"
          >
            <Plus size={16} className="mr-2" />
            Add Action
          </Button>
        </CardContent>
      </Card>

      {/* JSON Preview */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader className="pb-3">
          <Button
            variant="ghost"
            onClick={() => setShowJsonPreview(!showJsonPreview)}
            className="w-full justify-start text-lg font-semibold hover:bg-secondary"
          >
            <Code size={20} className="mr-2" />
            JSON Preview
          </Button>
        </CardHeader>

        {showJsonPreview && (
          <CardContent>
            <div className="bg-secondary p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre className="text-primary">{JSON.stringify(generateJson(), null, 2)}</pre>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="flex-1 bg-primary hover:bg-primary/90">
          <Plus size={16} className="mr-2" />
          Save Rule
        </Button>
        <Button variant="outline" className="flex-1 border-primary/50 bg-transparent">
          <Play size={16} className="mr-2" />
          Test Rule
        </Button>
      </div>
    </div>
  )
}
