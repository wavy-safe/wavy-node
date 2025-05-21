"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Lock } from "lucide-react"
import axiosInstance from "@/lib/auth"

interface WebhookSetupProps {
  apiKey: string
  onSave: (url: string) => void
}

export function WebhookSetup({ apiKey, onSave }: WebhookSetupProps) {
  const [url, setUrl] = useState("")
  const [secret, setSecret] = useState("")
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
      const response = await axiosInstance.post(`/webhooks?apiKey=${apiKey}`, { url, secret })

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
    <div className="w-full flex justify-center px-4">
      <Card className="w-full max-w-xl shadow-lg border border-gray-200 dark:border-gray-700 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold">
            Setup your webhook to continue
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label htmlFor="webhook-url" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">
              Webhook URL
            </label>
            <Input
              id="webhook-url"
              placeholder="https://yourdomain.com/webhook"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-background/50 backdrop-blur h-11 text-base"
            />
          </div>

          <div>
            <label htmlFor="secret" className="flex items-center gap-1 text-base font-medium text-gray-700 dark:text-gray-300 mb-1">
              Secret <Lock className="h-4 w-4 text-muted-foreground" />
            </label>
            <Input
              id="secret"
              placeholder="e.g. x-hub-signature key"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="bg-background/50 backdrop-blur h-11 text-base"
            />
          </div>

          <Button onClick={handleSave} className="w-full h-11 text-base" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
      </Card>
    </div>
  )
}
