import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"
import { WavyCreateDialog } from "@/components/dashboard/wavy-create-dialogo"

export default function ApiKeysPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">API Keys</h1>
        <WavyCreateDialog title="Create API Key" description="Create a new API key to authenticate your requests.">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Create Key
          </Button>
        </WavyCreateDialog>
      </div>
      <div className="rounded-lg border border-border bg-card/50 backdrop-blur">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono">sk_test_123...</TableCell>
              <TableCell>2024-02-04</TableCell>
              <TableCell>Never</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

