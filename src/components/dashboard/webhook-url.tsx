"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { WebhookUrlProps } from "@/types/WebhookUrl"
import axiosInstance from "@/lib/auth"

export function WebhookUrl({ url: initialUrl, baseUrl, apiKey, onUpdate }: WebhookUrlProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [url, setUrl] = useState(initialUrl)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpdate = async () => {
    if (!url.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await axiosInstance.post(`/webhooks?apiKey=${apiKey}`, {
        webhookUrl: url,
      })

      if (response.status === 200 || response.status === 201) {
        onUpdate(url)
        setIsEditing(false)
      } else {
        throw new Error(`Unexpected response status: ${response.status}`)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
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
            <Button onClick={handleUpdate} className="bg-primary hover:bg-primary/90" disabled={loading}>
              {loading ? "Saving..." : "Save"}
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
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
