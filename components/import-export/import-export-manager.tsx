"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Download, Upload, FileJson, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ImportExportManager() {
  const [exportFormat, setExportFormat] = useState<"all" | "selected">("all")
  const [selectedRules, setSelectedRules] = useState<string[]>([])
  const [includeWebhooks, setIncludeWebhooks] = useState(true)
  const [importFile, setImportFile] = useState<File | null>(null)

  const handleExport = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      format: "funnel-flow-orchestrator-v1",
      rules: [
        { id: "1", name: "Premium Quiz to CRM", priority: 1 },
        { id: "2", name: "Lead Scoring Rule", priority: 2 },
      ],
      webhooks: includeWebhooks
        ? [
            { id: "w1", endpoint: "https://api.crm.com/users", type: "crm" },
            { id: "w2", endpoint: "https://email-engine.app/send", type: "email" },
          ]
        : [],
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ffo-export-${Date.now()}.json`
    a.click()
  }

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImportFile(e.target.files[0])
    }
  }

  const handleImport = async () => {
    if (!importFile) return

    try {
      const text = await importFile.text()
      const data = JSON.parse(text)

      // Validation
      if (data.format !== "funnel-flow-orchestrator-v1" || !Array.isArray(data.rules)) {
        alert("Invalid file format")
        return
      }

      alert(`Import preview:\n- Rules: ${data.rules.length}\n- Webhooks: ${data.webhooks?.length || 0}`)
    } catch (error) {
      alert("Error reading file")
    }
  }

  return (
    <Tabs defaultValue="export" className="space-y-4">
      <TabsList>
        <TabsTrigger value="export">Export</TabsTrigger>
        <TabsTrigger value="import">Import</TabsTrigger>
      </TabsList>

      {/* Export Tab */}
      <TabsContent value="export" className="space-y-4">
        <Card className="bg-card/50 border-primary/20">
          <CardHeader>
            <CardTitle>Export Rules</CardTitle>
            <CardDescription>Backup your rules or migrate to another instance</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Export Options */}
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Export Scope</Label>
                <div className="space-y-3 mt-3">
                  <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary/50">
                    <input
                      type="radio"
                      checked={exportFormat === "all"}
                      onChange={() => setExportFormat("all")}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-medium">Export All Rules</p>
                      <p className="text-sm text-muted-foreground">32 rules</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary/50">
                    <input
                      type="radio"
                      checked={exportFormat === "selected"}
                      onChange={() => setExportFormat("selected")}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-medium">Export Selected Rules</p>
                      <p className="text-sm text-muted-foreground">Choose specific rules</p>
                    </div>
                  </label>
                </div>
              </div>

              {exportFormat === "selected" && (
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm font-medium mb-2">Selected rules (3 of 32)</p>
                  <div className="space-y-2">
                    {["Premium Quiz to CRM", "Lead Scoring Rule", "VIP User Redirect"].map((rule) => (
                      <label key={rule} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        {rule}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <input
                  type="checkbox"
                  id="webhooks"
                  checked={includeWebhooks}
                  onChange={(e) => setIncludeWebhooks(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="webhooks" className="font-medium cursor-pointer">
                  Include associated webhooks
                </Label>
              </div>
            </div>

            {/* Export Button */}
            <Button onClick={handleExport} className="w-full bg-primary hover:bg-primary/90">
              <Download size={16} className="mr-2" />
              Download Export (JSON)
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Import Tab */}
      <TabsContent value="import" className="space-y-4">
        <Card className="bg-card/50 border-primary/20">
          <CardHeader>
            <CardTitle>Import Rules</CardTitle>
            <CardDescription>Upload exported rules from another instance</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Alert className="border-blue-500/50 bg-blue-500/10">
              <AlertCircle className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-700 dark:text-blue-400">
                Importing will create new rules. Existing rules with the same names won't be overwritten unless you
                choose the merge option.
              </AlertDescription>
            </Alert>

            {/* File Upload */}
            <div className="space-y-3">
              <Label>Select File to Import</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <input type="file" accept=".json" onChange={handleImportFile} className="hidden" id="file-input" />
                <label htmlFor="file-input" className="cursor-pointer block">
                  <FileJson className="mx-auto text-muted-foreground mb-3" size={32} />
                  <p className="font-medium text-foreground">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">JSON format only</p>
                </label>
              </div>

              {importFile && (
                <div className="p-3 bg-secondary rounded-lg">
                  <p className="font-medium text-sm">{importFile.name}</p>
                  <p className="text-xs text-muted-foreground">{(importFile.size / 1024).toFixed(2)} KB</p>
                </div>
              )}
            </div>

            {/* Import Options */}
            <div className="space-y-3">
              <Label>Conflict Resolution</Label>
              <div className="space-y-2">
                {[
                  { value: "skip", label: "Skip Existing", desc: "Don't import if rule exists" },
                  { value: "merge", label: "Merge", desc: "Update existing rules" },
                  { value: "duplicate", label: "Create Duplicates", desc: "Import as new rules" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary/50"
                  >
                    <input
                      type="radio"
                      name="conflict"
                      value={option.value}
                      defaultChecked={option.value === "skip"}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-medium text-sm">{option.label}</p>
                      <p className="text-xs text-muted-foreground">{option.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Import Button */}
            <Button
              onClick={handleImport}
              disabled={!importFile}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50"
            >
              <Upload size={16} className="mr-2" />
              Preview and Import
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
