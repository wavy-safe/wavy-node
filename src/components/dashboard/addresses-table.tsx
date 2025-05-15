"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"
import axiosInstance from "@/lib/auth"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"

import type { Address, AddressesTableProps } from "@/types/addressesTable"

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
    <div className="flex items-center justify-center w-full px-4 mt-10">
      <Card className="w-full max-w-5xl shadow-lg border border-gray-200 dark:border-gray-700 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl text-center font-semibold">
            Manage allowed addresses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-3">
            <Input
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter wallet address..."
              className="flex-1 h-11 text-base"
            />
            <Button onClick={handleAddAddress} className="h-11 text-base px-6" disabled={adding}>
              <Plus className="mr-2 h-4 w-4" />
              {adding ? "Adding..." : "Add"}
            </Button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="rounded-lg border border-border bg-card/50 backdrop-blur overflow-y-auto max-h-[300px]">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>ID</TableHead>
                  <TableHead>Wallet Address</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[100px] text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {addresses.length > 0 ? (
                  addresses.map((address) => (
                    <TableRow key={address.id} className="hover:bg-transparent">
                      <TableCell className="font-mono text-muted-foreground">{address.id}</TableCell>
                      <TableCell className="text-muted-foreground">{address.address}</TableCell>
                      <TableCell className="text-muted-foreground">{address.description}</TableCell>
                      <TableCell className="text-center">
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
        </CardContent>
      </Card>
    </div>
  )
}
