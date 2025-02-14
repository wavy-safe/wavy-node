"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import axiosInstance from "@/lib/auth";
import { ApiKey } from "@/types/apikey";

export default function ApiKeys() {
  const [keys, setKeys] = useState<ApiKey[]>([]);

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      const response = await axiosInstance.get<{ success: boolean; data: ApiKey[] }>("/keys");
      
      if (response.data.success && Array.isArray(response.data.data)) {
        setKeys(response.data.data);
      } else {
        console.error("La respuesta de la API no contiene un array válido.");
        setKeys([]);
        
      }
    } catch (error) {
      console.error("Error fetching API keys:", error);
      setKeys([]); 
    }
  };

  const createKey = async () => {
    try {
      const response = await axiosInstance.post("/keys", { label: "New API Key" });
      console.log("Respuesta del servidor:", response.data);
      fetchKeys(); 
    } catch (error: any) {
      console.error("Error creating API key:", error.response?.data || error.message);
    }
  };

  const deleteKey = async (keyId: string) => { 
    try {
      await axiosInstance.delete(`/keys/${keyId}`);
      fetchKeys(); 
    } catch (error) {
      console.error("Error deleting API key:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">API Keys</h1>
        <Button onClick={createKey} variant="outline">
          <Plus className="h-4 w-4 mr-2" /> Create Key
        </Button>
      </div>
      <div className="rounded-lg border border-border bg-card/50 backdrop-blur">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(keys) ? keys.map((key) => (
              <TableRow key={key.id}>
                <TableCell className="font-mono">{key.key}</TableCell>
                <TableCell>{key.created_at}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteKey(key.id)} variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            )) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
