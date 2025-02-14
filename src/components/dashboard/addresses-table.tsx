"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"
import axiosInstance from "@/lib/auth"

interface Address {
  id: number
  address: string
  description: string
}

interface AddressesTableProps {
  apiKey: string
}

export function AddressesTable({ apiKey }: AddressesTableProps) {
  const [addresses, setAddresses] = useState<Address[]>([]) // Estado inicial vacío
  const [newAddress, setNewAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  
  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axiosInstance.get(`/addresses?apiKey=${apiKey}`)

        if (response.data?.success && Array.isArray(response.data.data)) {
          setAddresses(response.data.data)
        } else {
          setAddresses([]) // Asegurar un estado seguro
          setError("Invalid response format")
        }
      } catch (err) {
        console.error("Error fetching addresses:", err)
        setError("Failed to load addresses")
      } finally {
        setLoading(false)
      }
    }

    fetchAddresses()
  }, [apiKey])

  
  const handleAddAddress = async () => {
    if (!newAddress.trim()) {
      setError("Address cannot be empty")
      return
    }

    setLoading(true)
    try {
      const newEntry = {
        address: newAddress,
        description: "Added from UI",
      }
      const response = await axiosInstance.post(`/addresses?apiKey=${apiKey}`, newEntry)

      if (response.data?.success && response.data.data) {
        setAddresses([...addresses, response.data.data]) 
        setNewAddress("") 
      } else {
        setError("Failed to add address")
      }
    } catch (err) {
      console.error("Error adding address:", err)
      setError("Failed to add address")
    } finally {
      setLoading(false)
    }
  }

  
  const handleDeleteAddress = async (id: number) => {
    setLoading(true)
    try {
      await axiosInstance.delete(`/addresses/${id}?apiKey=${apiKey}`)
      setAddresses(addresses.filter((addr) => addr.id !== id)) 
    } catch (err) {
      console.error("Error deleting address:", err)
      setError("Failed to delete address")
    } finally {
      setLoading(false)
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
        <Button className="bg-primary hover:bg-primary/90" onClick={handleAddAddress} disabled={loading}>
          <Plus className="mr-2 h-4 w-4" />
          Add
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  Loading addresses...
                </TableCell>
              </TableRow>
            ) : addresses.length > 0 ? (
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
