import axiosInstance from "@/lib/auth";
import type { Transaction } from "@/types/useTransactions";

export async function fetchTransactions(): Promise<Transaction[]> {
  try {
    const response = await axiosInstance.get("/transactions");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las transacciones:", error);
    return [];
  }
}
