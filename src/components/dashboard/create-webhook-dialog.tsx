"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function CreateWebhookDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Webhook</DialogTitle>
          <DialogDescription>Add a new webhook endpoint to receive event notifications.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="url">Webhook URL</Label>
            <Input id="url" placeholder="https://api.example.com/webhook" className="bg-background" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="events">Events</Label>
            <Input id="events" placeholder="payment.success, payment.failed" className="bg-background" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)} className="bg-primary hover:bg-primary/90">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

