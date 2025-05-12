"use client"

import { useState, useEffect } from "react"
import { WebhookSetup } from "@/components/dashboard/webhooks-setup"
import { WebhookUrl } from "@/components/dashboard/webhook-url"
import { AddressesTable } from "@/components/dashboard/addresses-table"
import axiosInstance from "@/lib/auth"

export default function WebhooksPage() {
  const [webhook, setWebhook] = useState("")

  const apiKey = process.env.NEXT_PUBLIC_API_KEY || ""
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ""

  useEffect(() => {
    const fetchWebhook = async () => {
      try {
        const response = await axiosInstance.get(`/webhooks?apiKey=${apiKey}`)
        if (response.data.success && response.data.data.length > 0) {
          setWebhook(response.data.data[0].url)
        }
      } catch (err) {
        console.error("Error fetching webhook:", err)
      }
    }

    fetchWebhook()
  }, [apiKey])

  const handleSaveWebhook = (url: string) => {
    setWebhook(url)
  }

  const handleUpdateWebhook = (url: string) => {
    setWebhook(url)
  }

  if (!webhook) {
    return <WebhookSetup apiKey={apiKey} onSave={handleSaveWebhook} />
  }

  return (
    <div className="w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-5xl space-y-6">
        <WebhookUrl url={webhook} baseUrl={baseUrl} apiKey={apiKey} onUpdate={handleUpdateWebhook} />
        <AddressesTable apiKey={apiKey} />
      </div>
    </div>
  )
}
