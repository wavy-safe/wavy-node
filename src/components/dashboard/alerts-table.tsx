import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const transactions = [
  {
    id: 1234,
    amount: "$123,456 MXN",
    user: "USER NAME",
    address: "0x50...67a",
    date: "30-04-00",
    time: "00:00 h",
    risk: "Alto",
    regulation: "Artículo 17, fracción XVI Ley LFPIORPI",
    recommendation: "Reportar operaciones sospechosas a la UIF",
    status: "En revisión",
    reportAction: "Generar",
  },
  {
    id: 1234,
    amount: "$123,456 MXN",
    user: "USER NAME",
    address: "0x50...67a",
    date: "30-04-00",
    time: "00:00 h",
    risk: "Alto",
    regulation: "Artículo 17, fracción XVI Ley LFPIORPI",
    recommendation: "Reportar operaciones sospechosas a la UIF",
    status: "En revisión",
    reportAction: "Generar",
  },
  {
    id: 1234,
    amount: "$123,456 MXN",
    user: "USER NAME",
    address: "0x50...67a",
    date: "30-04-00",
    time: "00:00 h",
    risk: "Alto",
    regulation: "Artículo 17, fracción XVI Ley LFPIORPI",
    recommendation: "Reportar operaciones sospechosas a la UIF",
    status: "Cerrado",
    reportAction: "Ver",
  },
  {
    id: 1234,
    amount: "$123,456 MXN",
    user: "USER NAME",
    address: "0x50...67a",
    date: "30-04-00",
    time: "00:00 h",
    risk: "Alto",
    regulation: "Artículo 17, fracción XVI Ley LFPIORPI",
    recommendation: "Reportar operaciones sospechosas a la UIF",
    status: "Cerrado",
    reportAction: "Ver",
  },
];

export default function TransactionsTable() {
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
          {transactions.map((tx, index) => (
            <TableRow key={index}>
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
                  {tx.reportAction}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
