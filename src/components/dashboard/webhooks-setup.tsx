"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface WebhookSetupProps {
  onSave: (url: string) => void
}

export function WebhookSetup({ onSave }: WebhookSetupProps) {
  const [url, setUrl] = useState("")

  const handleSave = () => {
    if (url.trim()) {
      onSave(url)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <h2 className="text-xl font-medium text-primary">Setup your webhook to continue</h2>
      <div className="w-full max-w-md space-y-4">
        <Input
          placeholder="Enter webhook URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="bg-background/50 backdrop-blur"
        />
        <Button onClick={handleSave} className="w-full bg-primary hover:bg-primary/90">
          Save
        </Button>
      </div>
    </div>
  )
}

