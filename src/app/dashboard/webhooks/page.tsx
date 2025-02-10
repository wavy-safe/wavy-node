import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { WavyCreateDialog} from "@/components/dashboard/wavy-create-dialogo"

export default function WebhooksPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Webhooks</h1>
        <WavyCreateDialog
          title="Create Webhook"
          description="Add a new webhook endpoint to receive event notifications."
        >
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Create Webhook
          </Button>
        </WavyCreateDialog>
      </div>
      <div className="rounded-lg border border-border bg-card/50 backdrop-blur">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Events</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono">https://api.example.com/webhook</TableCell>
              <TableCell>payment.success, payment.failed</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-primary/20 text-primary hover:bg-primary/30">
                  Active
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

