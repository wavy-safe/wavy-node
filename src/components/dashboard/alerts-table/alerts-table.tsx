"use client";

import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import axiosInstance from "@/lib/auth";

interface InflictedLaw {
  name: string;
  description: string;
  risk: string;
  country: string;
  source?: string;
}

interface Notification {
  id: number;
  userId?: string;
  tx_hash?: string;
  chain_id: number;
  address?: {
    id: number;
    address: string;
    description: string;
  };
  inflicted_laws?: InflictedLaw[];
  amount?: {
    value: number;
    usd: number;
  };
  token?: {
    symbol: string;
    name: string;
  };
  timestamp?: string;
}

function getRiskVariant(
  risk: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (risk) {
    case "high":
      return "destructive";
    case "warn":
      return "secondary";
    default:
      return "default";
  }
}

export default function TransactionsTable() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [openReport, setOpenReport] = useState(false);
  const [reportContent, setReportContent] = useState<any>(null);
  const [reportLoading, setReportLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get("/notifications");
      setNotifications(res.data?.data || []);
    } catch (err) {
      console.error("❌ Error fetching notifications:", err);
      setError("Error al cargar notificaciones");
    } finally {
      setLoading(false);
    }
  };
=======
import { useTransactions } from "./useTransactions";

export default function TransactionsTable() {
  const {
    notifications,
    error,
    loading,
    reportContent,
    reportLoading,
    openReport,
    handleOpenReport,
    setOpenReport,
  } = useTransactions();
>>>>>>> alerts

  useEffect(() => {
    console.log("🔍 Notificaciones:", notifications);
  }, [notifications]);

  if (loading) return <p className="text-center">Cargando notificaciones...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
      <Card className="h-[calc(100vh-80px)] border shadow-xl rounded-2xl bg-white dark:bg-zinc-950 flex flex-col">
        <div className="overflow-y-auto flex-1">
          <Table className="min-w-[1100px]">
            <TableHeader className="sticky top-0 z-10 bg-muted/40 backdrop-blur">
              <TableRow>
                <TableHead>TxHash</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>USD</TableHead>
                <TableHead>Token</TableHead>
                <TableHead>Wallet</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Riesgo</TableHead>
                <TableHead>Regulación</TableHead>
                <TableHead>Reporte</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <TableRow key={n.id} className="hover:bg-muted/20 transition">
                    <TableCell className="font-mono text-xs text-muted-foreground">
<<<<<<< HEAD
                      {n.tx_hash ? `${n.tx_hash.slice(0, 10)}...` : "—"}
=======
                      {n.txHash ? `${n.txHash.slice(0, 10)}...` : "—"}
>>>>>>> alerts
                    </TableCell>
                    <TableCell className="text-xs font-mono">
                      {n.amount?.value !== undefined
                        ? n.amount.value < 0.00001
                          ? "≪0.00001"
                          : n.amount.value.toFixed(6)
                        : "—"}
                    </TableCell>
                    <TableCell className="text-xs font-mono">
                      {n.amount?.usd !== undefined
                        ? `$${n.amount.usd.toFixed(2)}`
                        : "—"}
                    </TableCell>
                    <TableCell className="text-xs font-mono">
                      {n.token?.symbol || n.token?.name || "—"}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-primary">
                      {n.address?.address
                        ? `${n.address.address.slice(0, 6)}...${n.address.address.slice(-4)}`
                        : "—"}
                    </TableCell>
                    <TableCell className="text-xs font-mono">
                      {n.timestamp
                        ? new Date(n.timestamp).toLocaleString("es-MX", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })
                        : "—"}
                    </TableCell>
                    <TableCell className="space-x-1">
<<<<<<< HEAD
                      {n.inflicted_laws?.length ? (
                        n.inflicted_laws.map((law, i) => (
                          <Badge
                            key={i}
                            variant={getRiskVariant(law.risk)}
=======
                      {n.inflictedLaws?.length ? (
                        n.inflictedLaws.map((law, i) => (
                          <Badge
                            key={i}
                            variant={
                              law.risk === "high"
                                ? "destructive"
                                : law.risk === "warn"
                                ? "secondary"
                                : "default"
                            }
>>>>>>> alerts
                            className="capitalize text-[10px]"
                          >
                            {law.risk}
                          </Badge>
                        ))
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
<<<<<<< HEAD
                      {n.inflicted_laws?.length ? (
                        n.inflicted_laws.map((law, i) => (
=======
                      {n.inflictedLaws?.length ? (
                        n.inflictedLaws.map((law, i) => (
>>>>>>> alerts
                          <div key={i} className="text-xs text-muted-foreground">
                            {law.name}
                          </div>
                        ))
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      {n.address?.address ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenReport(n.address!.address)}
                          className="text-xs px-3 py-1"
                        >
                          Ver
                        </Button>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">
                    No se encontraron notificaciones.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={openReport} onOpenChange={setOpenReport}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Reporte de Wallet
            </DialogTitle>
          </DialogHeader>
          <div className="text-sm font-mono whitespace-pre-wrap break-all">
            {reportLoading ? (
              <p>Cargando reporte...</p>
            ) : typeof reportContent === "string" ? (
              <p>{reportContent}</p>
            ) : (
              <pre>{JSON.stringify(reportContent, null, 2)}</pre>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
<<<<<<< HEAD
=======

>>>>>>> alerts
