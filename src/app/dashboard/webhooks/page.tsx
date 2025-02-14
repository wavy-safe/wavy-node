"use client"

import { useState } from "react"
import { WebhookSetup } from "@/components/dashboard/webhooks-setup"
import { WebhookUrl } from "@/components/dashboard/webhook-url"
import { AddressesTable } from "@/components/dashboard/addresses-table"

export default function WebhooksPage() {
  const [webhook, setWebhook] = useState("")
  const [isConfigured, setIsConfigured] = useState(false)

  const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const handleSaveWebhook = (url: string) => {
    setWebhook(url)
    setIsConfigured(true)
  }

  const handleUpdateWebhook = (url: string) => {
    setWebhook(url)
  }

  if (!isConfigured) {
    return <WebhookSetup onSave={handleSaveWebhook} />
  }

  return (
    <div className="space-y-8">
      <WebhookUrl url={webhook} baseUrl={baseUrl} apiKey={apiKey} onUpdate={handleUpdateWebhook} />
      <AddressesTable apiKey={apiKey} />
    </div>
  )
}
