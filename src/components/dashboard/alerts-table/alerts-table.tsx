import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTransactions } from "@/hooks/useTransactions";
import type { Transaction } from "@/types/useTransactions"

export default function TransactionsTable() {
  const { transactions, loading, error } = useTransactions();

  if (loading) return <p className="text-center">Cargando transacciones...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <Card className="p-4 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {[
              "Transacción",
              "Monto",
              "Usuario",
              "Fecha / Hora",
              "Riesgo",
              "Regulación",
              "Recomendaciones",
              "Estatus",
              "Reporte",
            ].map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.map((tx: Transaction) => (
            <TableRow key={tx.id}>
              <TableCell>{tx.id}</TableCell>
              <TableCell>{tx.amount}</TableCell>
              <TableCell>
                <span className="block text-gray-500">{tx.address}</span>
                <span className="font-bold">{tx.user}</span>
              </TableCell>
              <TableCell>
                {tx.date} <br />
                {tx.time}
              </TableCell>
              <TableCell className="font-semibold text-red-500">
                {tx.risk}
              </TableCell>
              <TableCell>{tx.regulation}</TableCell>
              <TableCell>{tx.recommendation}</TableCell>
              <TableCell
                className={`font-medium ${
                  tx.status === "Cerrado" ? "text-gray-500" : "text-yellow-500"
                }`}
              >
                {tx.status}
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  {tx.reportAction || "N/A"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
