"use client"

import { useState, useEffect } from "react"
import { Pencil, Trash } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"
import { WebhookUrlProps } from "@/types/WebhookUrl"
import axiosInstance from "@/lib/auth"

export function WebhookUrl({ baseUrl, apiKey, onUpdate }: WebhookUrlProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [url, setUrl] = useState<string | null>(null)
  const [secret, setSecret] = useState<string | null>(null)
  const [originalUrl, setOriginalUrl] = useState<string | null>(null)
  const [originalSecret, setOriginalSecret] = useState<string | null>(null)
  const [showSecretInput, setShowSecretInput] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [webhookId, setWebhookId] = useState<number | null>(null)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    const fetchWebhook = async () => {
      setIsFetching(true)
      try {
        const response = await axiosInstance.get(`/webhooks?apiKey=${apiKey}`)
        if (response.data.success && response.data.data.length > 0) {
          const webhook = response.data.data[0]
          setWebhookId(webhook.id)
          setUrl(webhook.url)
          setSecret(webhook.secret || "")
          setOriginalUrl(webhook.url)
          setOriginalSecret(webhook.secret || "")
        } else {
          setWebhookId(null)
          setUrl(null)
          setSecret(null)
        }
      } catch (err) {
        console.error("Error fetching webhook:", err)
        setError("Failed to load webhook")
      } finally {
        setIsFetching(false)
      }
    }

    fetchWebhook()
  }, [apiKey])

  const handleUpdate = async () => {
    if (!url?.trim()) {
      setError("Webhook URL cannot be empty")
      return
    }

    setLoading(true)
    setError(null)

    try {
      if (!webhookId) throw new Error("No existing webhook found")

      const response = await axiosInstance.patch(`/webhooks/${webhookId}?apiKey=${apiKey}`, {
        url,
        secret: showSecretInput ? secret : undefined,
      })

      if (response.data.success) {
        setOriginalUrl(url)
        if (showSecretInput) setOriginalSecret(secret)
        onUpdate(url)
        setIsEditing(false)
        setShowSecretInput(false)
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

  const handleDelete = async () => {
    if (!webhookId) {
      setError("No webhook to delete")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axiosInstance.delete(`/webhooks/${webhookId}?apiKey=${apiKey}`)

      if (response.data.success) {
        setWebhookId(null)
        setUrl(null)
        setSecret(null)
        setOriginalUrl(null)
        setOriginalSecret(null)
        onUpdate("")
      } else {
        throw new Error(response.data.message || "Failed to delete webhook")
      }
    } catch (err: any) {
      console.error("Error deleting webhook:", err.response?.data || err)
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full flex justify-center px-4">
      <Card className="w-full max-w-xl shadow-lg border border-gray-200 dark:border-gray-700 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold">
            Your webhook
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isFetching ? (
            <p className="text-muted-foreground">Loading webhook...</p>
          ) : originalUrl ? (
            isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Webhook URL
                  </label>
                  <Input
                    value={url || ""}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://yourdomain.com/webhook"
                    className="bg-background/50 backdrop-blur h-11 text-base"
                  />
                </div>

                {originalSecret && !showSecretInput && (
                  <div className="p-4 rounded-md bg-yellow-50 border border-yellow-300 text-sm text-yellow-800 space-y-2">
                    <p>There is currently a secret configured for this webhook.</p>
                    <p className="text-xs text-muted-foreground">
                      If you've lost or forgotten this secret, you can change it. Just be aware that any services using the current secret will need to update.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2"
                      onClick={() => setShowSecretInput(true)}
                    >
                      Change secret
                    </Button>
                  </div>
                )}

                {showSecretInput && (
                  <div>
                    <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1">
                      New Secret
                    </label>
                    <Input
                      value={secret || ""}
                      onChange={(e) => setSecret(e.target.value)}
                      placeholder="e.g. x-hub-signature key"
                      className="bg-background/50 backdrop-blur h-11 text-base"
                    />
                  </div>
                )}

                <Button onClick={handleUpdate} className="w-full h-11 text-base" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <span className="font-mono text-muted-foreground">{originalUrl}</span>
                {originalSecret && (
                  <span className="text-muted-foreground text-sm flex items-center gap-1">
                    🔐 Secret configured
                  </span>
                )}
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditing(true)}
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDelete}
                    className="hover:bg-red-100 hover:text-red-500"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          ) : (
            <p className="text-muted-foreground">No webhook configured.</p>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
      </Card>
    </div>
  )
}
