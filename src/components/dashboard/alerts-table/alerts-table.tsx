"use client";

import { useEffect, useState } from "react";
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
import axiosInstance from "@/lib/auth";

interface InflictedLaw {
  name: string;
  description: string;
  risk: string;
  country: string;
  source?: string;
}

interface Address {
  id: number;
  address: string;
  description: string;
  user_id: string;
}

interface Notification {
  id: number;
  user_id?: string;
  tx_hash?: string;
  chain_id: number;
  address_id?: number;
  inflicted_laws?: InflictedLaw[];
  address?: string;
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
      const [notifRes, addrRes] = await Promise.all([
        axiosInstance.get("/notifications"),
        axiosInstance.get("/addresses"),
      ]);

      const addresses: Address[] = addrRes.data?.data || [];
      const notificationsRaw: Notification[] = notifRes.data?.data || [];

      const withWallets = notificationsRaw.map((n) => {
        const found = addresses.find((a) => a.id === n.address_id);
        return {
          ...n,
          address: found?.address || "—",
        };
      });

      setNotifications(withWallets);
    } catch (err) {
      console.error("❌ Error fetching data:", err);
      setError("Error al cargar notificaciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenReport = async (walletAddress: string) => {
    setOpenReport(true);
    setReportLoading(true);
    try {
      const res = await axiosInstance.get(`/wallets/${walletAddress}/report`);
      setReportContent(res.data?.data || "Reporte no disponible");
    } catch (err) {
      console.error("❌ Error al cargar reporte:", err);
      setReportContent("Error al cargar reporte.");
    } finally {
      setReportLoading(false);
    }
  };

  if (loading) return <p className="text-center">Cargando notificaciones...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
      <Card className="p-6 shadow-xl rounded-2xl border bg-white dark:bg-zinc-950 overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="text-xs text-zinc-400 uppercase tracking-widest">ID</TableHead>
              <TableHead className="text-xs text-zinc-400 uppercase tracking-widest">Usuario</TableHead>
              <TableHead className="text-xs text-zinc-400 uppercase tracking-widest">Wallet</TableHead>
              <TableHead className="text-xs text-zinc-400 uppercase tracking-widest">TxHash</TableHead>
              <TableHead className="text-xs text-zinc-400 uppercase tracking-widest">Riesgo</TableHead>
              <TableHead className="text-xs text-zinc-400 uppercase tracking-widest">Leyes</TableHead>
              <TableHead className="text-xs text-zinc-400 uppercase tracking-widest">Reporte</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <TableRow key={n.id} className="hover:bg-muted/20 transition">
                  <TableCell className="font-mono text-xs text-zinc-500">{n.id}</TableCell>
                  <TableCell className="font-mono text-xs max-w-[180px] truncate text-zinc-600">
                    {n.user_id || "—"}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-primary">
                    {n.address ? `${n.address.slice(0, 6)}...${n.address.slice(-4)}` : "—"}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {n.tx_hash ? `${n.tx_hash.slice(0, 10)}...` : "—"}
                  </TableCell>
                  <TableCell className="space-x-1">
                    {n.inflicted_laws?.length ? (
                      n.inflicted_laws.map((law: InflictedLaw, i: number) => (
                        <Badge
                          key={i}
                          variant={getRiskVariant(law.risk)}
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
                    {n.inflicted_laws?.length ? (
                      n.inflicted_laws.map((law: InflictedLaw, i: number) => (
                        <div key={i} className="text-xs text-muted-foreground">
                          {law.name}
                        </div>
                      ))
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>
                    {n.address && n.address !== "—" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenReport(n.address!)}
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
                <TableCell colSpan={7} className="text-center py-4">
                  No se encontraron notificaciones.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={openReport} onOpenChange={setOpenReport}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Reporte de Wallet</DialogTitle>
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