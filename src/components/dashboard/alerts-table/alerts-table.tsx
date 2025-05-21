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
import { Button } from "@/components/ui/button";
import { useTransactions } from "./useTransactions";
import { WalletReportDialog } from "@/components/dashboard/alerts-table/WalletReportDialog";

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

  useEffect(() => {
    console.log("Notificaciones:", notifications);
  }, [notifications]);

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
                      {n.txHash ? `${n.txHash.slice(0, 10)}...` : "—"}
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
                      {n.date
                        ? new Date(n.date).toLocaleString("es-MX", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })
                        : "Pendiente"}
                    </TableCell>
                    <TableCell className="space-x-1">
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
                      {n.inflictedLaws?.length ? (
                        n.inflictedLaws.map((law, i) => (
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

      <WalletReportDialog
        open={openReport}
        onOpenChange={setOpenReport}
        loading={reportLoading}
        content={reportContent}
      />
    </>
  );
}
