"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"

interface Address {
  id: string
  label: string
}

interface AddressesTableProps {
  addresses: Address[]
  onDelete: (id: string) => void
  onCreateClick: () => void
}

export function AddressesTable({ addresses, onDelete, onCreateClick }: AddressesTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-primary">Your addresses</h2>
        <Button className="bg-primary hover:bg-primary/90" onClick={onCreateClick}>
          <Plus className="mr-2 h-4 w-4" />
          Create address
        </Button>
      </div>
      <div className="rounded-lg border border-border bg-card/50 backdrop-blur overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Address</TableHead>
              <TableHead>Label</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {addresses.map((address) => (
              <TableRow key={address.id} className="hover:bg-transparent">
                <TableCell className="font-mono text-muted-foreground">{address.id}</TableCell>
                <TableCell className="text-muted-foreground">{address.label}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(address.id)}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

