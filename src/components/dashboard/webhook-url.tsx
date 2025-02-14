"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil } from "lucide-react"
import { useState } from "react"

interface WebhookUrlProps {
  url: string
  onUpdate: (url: string) => void
}

export function WebhookUrl({ url: initialUrl, onUpdate }: WebhookUrlProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [url, setUrl] = useState(initialUrl)

  const handleUpdate = () => {
    if (url.trim()) {
      onUpdate(url)
      setIsEditing(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-primary">Your webhook</h2>
      <div className="flex items-center gap-4">
        {isEditing ? (
          <div className="flex-1 flex gap-2">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-background/50 backdrop-blur"
            />
            <Button onClick={handleUpdate} className="bg-primary hover:bg-primary/90">
              Save
            </Button>
          </div>
        ) : (
          <>
            <span className="flex-1 font-mono text-muted-foreground">{url}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="hover:bg-primary/10 hover:text-primary"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

