"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"


interface WebhookTestProps {
  url: string
}

export function WebhookTest({ url }: WebhookTestProps) {
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTest = async () => {
    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: "test_event",
          message: "This is a test payload from WavyNode",
          timestamp: new Date().toISOString(),
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json?.message || "Unexpected response")

      setResponse(json)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button variant="outline" onClick={handleTest} disabled={loading}>
        {loading ? "Sending..." : "Send test payload"}
      </Button>

      {response && (
        <Alert variant="default">
          <AlertTitle>Response</AlertTitle>
          <AlertDescription>
            <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
