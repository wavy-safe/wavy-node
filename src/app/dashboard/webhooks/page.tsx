"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { WebhookSetup } from "@/components/dashboard/webhooks-setup"
import { WebhookUrl } from "@/components/dashboard/webhook-url"
import { AddressesTable } from "@/components/dashboard/addresses-table"

interface Address {
  id: string
  label: string
}

export default function WebhooksPage() {
  const [webhook, setWebhook] = useState<string>("")
  const [isConfigured, setIsConfigured] = useState(false)
  const [addresses, setAddresses] = useState<Address[]>([
    { id: crypto.randomUUID(), label: "Mi address 1" },
    { id: crypto.randomUUID(), label: "Mi address 2" },
    { id: crypto.randomUUID(), label: "Mi address 3" },
  ])
  const { toast } = useToast()

  const handleSaveWebhook = (url: string) => {
    setWebhook(url)
    setIsConfigured(true)
  }

  const handleUpdateWebhook = (url: string) => {
    setWebhook(url)
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses((prevAddresses) => prevAddresses.filter((addr) => addr.id !== id))
    toast({
      title: "Address deleted",
      description: "The address has been successfully removed.",
    })
  }

  const handleCreateAddress = () => {
    const newAddress: Address = {
      id: crypto.randomUUID(), 
      label: "New address",
    }
    setAddresses((prevAddresses) => [...prevAddresses, newAddress]) 
    toast({
      title: "Address created",
      description: "A new address has been added.",
    })
  }

  if (!isConfigured) {
    return <WebhookSetup onSave={handleSaveWebhook} />
  }

  return (
    <div className="space-y-8">
      <WebhookUrl url={webhook} onUpdate={handleUpdateWebhook} />
      <AddressesTable addresses={addresses} onDelete={handleDeleteAddress} onCreateClick={handleCreateAddress} />
    </div>
  )
}
