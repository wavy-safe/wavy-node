"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil } from "lucide-react"
import { useState, useEffect } from "react"
import { WebhookUrlProps } from "@/types/WebhookUrl"
import axiosInstance from "@/lib/auth"

export function WebhookUrl({ baseUrl, apiKey, onUpdate }: WebhookUrlProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [webhookId, setWebhookId] = useState<number | null>(null)

 
  useEffect(() => {
    const fetchWebhook = async () => {
      try {
        const response = await axiosInstance.get(`/webhooks?apiKey=${apiKey}`)
        if (response.data.success && response.data.data.length > 0) {
          setWebhookId(response.data.data[0].id) 
          setUrl(response.data.data[0].url) 
        }
      } catch (err) {
        console.error("Error fetching webhook:", err)
        setError("Failed to load webhook")
      }
    }

    fetchWebhook()
  }, [apiKey])

  const handleUpdate = async () => {
    if (!url.trim()) {
      setError("Webhook URL cannot be empty")
      return
    }

    setLoading(true)
    setError(null)

    try {
      if (!webhookId) {
        throw new Error("No existing webhook found")
      }

      
      const response = await axiosInstance.patch(`/webhooks/${webhookId}?apiKey=${apiKey}`, {
        url, 
      })

      if (response.data.success) {
        onUpdate(url) 
        setIsEditing(false)
      } else {
        throw new Error(response.data.message || "Failed to update webhook")
      }
    } catch (err: any) {
      console.error("Error updating webhook:", err.response?.data || err)
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-primary">Your webhook</h2>
      {url ? (
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
      ) : (
        <p className="text-muted-foreground">No webhook configured.</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
