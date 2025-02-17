"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import axiosInstance from "@/lib/auth"

interface WebhookSetupProps {
  apiKey: string
  onSave: (url: string) => void
}

export function WebhookSetup({ apiKey, onSave }: WebhookSetupProps) {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    if (!url.trim()) {
      setError("Webhook URL cannot be empty")
      return
    }

    setLoading(true)
    setError(null)

    try {
     
      const response = await axiosInstance.post(`/webhooks?apiKey=${apiKey}`, { url }) 

      if (response.data.success) {
        onSave(url)
      } else {
        throw new Error(response.data.message || "Failed to create webhook")
      }
    } catch (err: any) {
      console.error("Error creating webhook:", err.response?.data || err)
      setError(err.response?.data?.message || "Failed to create webhook")
    } finally {
      setLoading(false)
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
        <Button onClick={handleSave} className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  )
}
