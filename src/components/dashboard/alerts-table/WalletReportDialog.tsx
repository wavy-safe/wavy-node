"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface InflictedLaw {
  name: string;
  risk: string;
  source?: string;
  country?: string;
  description?: string;
}

interface Address {
  id: number;
  address: string;
  description?: string;
}

interface Token {
  symbol: string;
  name: string;
  address?: string;
  decimals?: number;
}

interface Notification {
  id: number;
  userId?: string;
  txHash?: string;
  chainId: number;
  addressId?: number;
  address?: Address;
  inflictedLaws?: InflictedLaw[];
  amount?: {
    value: number;
    usd: number;
  };
  token?: Token;
  date?: string;
}

interface WalletReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading: boolean;
  content: Notification | null;
}

export function WalletReportDialog({
  open,
  onOpenChange,
  loading,
  content,
}: WalletReportDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Reporte de Wallet
          </DialogTitle>
        </DialogHeader>

        {loading || !content ? (
          <p className="text-sm font-mono">Cargando reporte...</p>
        ) : (
          <div className="space-y-6 text-sm">
            <div>
              <h3 className="font-semibold">Wallet</h3>
              <p className="font-mono text-xs text-primary">
                {content.address?.address ?? "—"}
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Token</h3>
              <p className="font-mono text-xs">
                {content.token?.symbol || content.token?.name || "—"}
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Monto</h3>
              <p className="font-mono text-xs">
                {content.amount?.value !== undefined
                  ? `${content.amount.value} ETH`
                  : "—"} {" "}
                (
                {content.amount?.usd !== undefined
                  ? `$${content.amount.usd.toFixed(2)}`
                  : "—"}
                )
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Fecha</h3>
              <p className="font-mono text-xs">
                {content.date
                  ? new Date(content.date).toLocaleString("es-MX", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })
                  : "Pendiente"}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Leyes aplicadas</h3>
              {content.inflictedLaws?.length ? (
                content.inflictedLaws.map((law, i) => (
                  <div
                    key={i}
                    className="border border-muted rounded-md p-4 bg-muted/10 space-y-1 text-xs"
                  >
                    <p>
                      <strong>Nombre:</strong> {law.name}
                    </p>
                    <p>
                      <strong>Riesgo:</strong>{" "}
                      <span
                        className={
                          law.risk === "high"
                            ? "text-red-600 font-semibold"
                            : law.risk === "warn"
                            ? "text-yellow-600 font-medium"
                            : "text-gray-600"
                        }
                      >
                        {law.risk}
                      </span>
                    </p>
                    {law.source && (
                      <p>
                        <strong>Fuente:</strong> {law.source}
                      </p>
                    )}
                    {law.country && (
                      <p>
                        <strong>País:</strong> {law.country}
                      </p>
                    )}
                    {law.description && (
                      <p>
                        <strong>Descripción:</strong> {law.description}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">— Sin leyes registradas.</p>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
