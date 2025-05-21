"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WalletReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading: boolean;
  content: any;
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
          <p className="text-sm font-mono whitespace-pre-wrap">
            {typeof content === "string"
              ? content
              : JSON.stringify(content, null, 2)}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
  