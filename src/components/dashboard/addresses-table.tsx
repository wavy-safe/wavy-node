"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"
import axiosInstance from "@/lib/auth"
import type { Address } from "@/types/addressesTable"
import {AddressesTableProps} from "@/types/addressesTable"


export function AddressesTable({ apiKey }: AddressesTableProps) {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [newAddress, setNewAddress] = useState("")
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAddresses()
  }, [apiKey])

  const fetchAddresses = async () => {
    try {
      const response = await axiosInstance.get(`/addresses?apiKey=${apiKey}`)
      if (response.data?.success && Array.isArray(response.data.data)) {
        setAddresses(response.data.data)
      }
    } catch (err) {
      console.error("Error fetching addresses:", err)
      setError("Failed to load addresses")
    }
  }

  const handleAddAddress = async () => {
    if (!newAddress.trim()) {
      setError("Address cannot be empty")
      return
    }

    setAdding(true)
    setError(null)

    try {
      const newEntry = {
        address: newAddress,
        description: "Added from UI",
      }
      const response = await axiosInstance.post(`/addresses?apiKey=${apiKey}`, newEntry)

      if (response.data?.success) {
        if (response.data.data) {
          setAddresses((prev) => [...prev, response.data.data])
        } else {
          console.warn("API returned success but no data, refetching addresses...")
          fetchAddresses() 
        }
        setNewAddress("")
        setError(null)
      } else {
        console.error("API response error:", response.data)
        setError(response.data?.message || "Failed to add address")
      }
    } catch (err: any) {
      console.error("Error adding address:", err.response?.data || err)
      setError(err.response?.data?.message || "Failed to add address")
    } finally {
      setAdding(false)
    }
  }

  const handleDeleteAddress = async (id: number) => {
    try {
      await axiosInstance.delete(`/addresses/${id}?apiKey=${apiKey}`)
      setAddresses((prev) => prev.filter((addr) => addr.id !== id))
    } catch (err) {
      console.error("Error deleting address:", err)
      setError("Failed to delete address")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          placeholder="Enter wallet address..."
          className="flex-1"
        />
        <Button className="bg-primary hover:bg-primary/90" onClick={handleAddAddress} disabled={adding}>
          <Plus className="mr-2 h-4 w-4" />
          {adding ? "Adding..." : "Add"}
        </Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="rounded-lg border border-border bg-card/50 backdrop-blur overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>ID</TableHead>
              <TableHead>Wallet Address</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <TableRow key={address.id} className="hover:bg-transparent">
                  <TableCell className="font-mono text-muted-foreground">{address.id}</TableCell>
                  <TableCell className="text-muted-foreground">{address.address}</TableCell>
                  <TableCell className="text-muted-foreground">{address.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteAddress(address.id)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No addresses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
