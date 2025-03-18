import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/auth";

interface Transaction {
  id: number;
  amount: string;
  user: string;
  address: string;
  date: string;
  time: string;
  risk: string;
  regulation: string;
  recommendation: string;
  status: string;
  reportAction: string;
}

async function fetchTransactions(): Promise<Transaction[]> {
  try {
    const res = await axiosInstance.get(`/addresses`);
    if (res.data.success) {
      const transactions: Transaction[] = await Promise.all(
        res.data.data.map(async (wallet: any) => {
          try {
            const [statusRes, balanceRes, reportRes] = await Promise.all([
              axiosInstance.get(`/wallets/${wallet.address}/status?chainId=1`),
              axiosInstance.get(`/wallets/${wallet.address}/balance?chainId=1`),
              axiosInstance.get(`/wallets/${wallet.address}/report`),
            ]);

            return {
              id: wallet.id,
              amount: `$${balanceRes.data.data.total_balance || 0} USD`,
              user: "Usuario Desconocido",
              address: wallet.address,
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString(),
              risk: statusRes.data.data.status || "Desconocido",
              regulation: "Ley LFPIORPI",
              recommendation: "Verificar actividad reciente",
              status: "Pendiente",
              reportAction: reportRes.data.data || "No disponible",
            };
          } catch (error: any) {
            console.error(`Error fetching data for ${wallet.address}:`, error?.response?.status, error?.response?.data);
            return null;
          }
        })
      );
      return transactions.filter((tx) => tx !== null) as Transaction[];
    }
  } catch (error: any) {
    console.error("Error fetching addresses:", error?.response?.status, error?.response?.data);
  }

  return [];
}

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTransactions() {
      setLoading(true);
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError("Error al cargar las transacciones.");
      }
      setLoading(false);
    }
    loadTransactions();
  }, []);

  if (loading) return <p className="text-center">Cargando datos...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <Card className="p-4 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {["ID", "Monto", "Usuario", "Wallet", "Fecha / Hora", "Riesgo", "Regulación", "Recomendaciones", "Estatus", "Reporte"].map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{tx.id}</TableCell>
              <TableCell>{tx.amount}</TableCell>
              <TableCell>{tx.user}</TableCell>
              <TableCell>{tx.address}</TableCell>
              <TableCell>{tx.date} {tx.time}</TableCell>
              <TableCell>{tx.risk}</TableCell>
              <TableCell>{tx.regulation}</TableCell>
              <TableCell>{tx.recommendation}</TableCell>
              <TableCell>{tx.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => alert(tx.reportAction || "Generando reporte...")}> 
                  {tx.reportAction ? "Ver" : "Generar"} 
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
