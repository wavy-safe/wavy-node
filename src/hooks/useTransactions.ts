import { useEffect, useState } from "react";
import { fetchTransactions } from "@/api/transactions";
import type { Transaction } from "@/types/useTransactions";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError("Error al cargar las transacciones.");
      } finally {
        setLoading(false);
      }
    }
    
    loadTransactions();
  }, []);

  return { transactions, loading, error };
}
