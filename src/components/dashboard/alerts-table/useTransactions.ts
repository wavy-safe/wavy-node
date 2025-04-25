import { useEffect, useState } from "react";
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
}

interface Notification {
  id: number;
  userId?: string;
  txHash?: string;
  chainId: number;
  address?: Address;
  addressId?: number;
  inflictedLaws?: InflictedLaw[];
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

export function useTransactions() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [openReport, setOpenReport] = useState(false);
  const [reportContent, setReportContent] = useState<any>(null);
  const [reportLoading, setReportLoading] = useState(false);

  const normalizeNotification = (raw: any): Notification => ({
    id: raw.id,
    userId: raw.userId ?? raw.user_id,
    txHash: raw.txHash ?? raw.tx_hash,
    chainId: raw.chainId ?? raw.chain_id,
    addressId: raw.addressId ?? raw.address_id,
    address: raw.address, // se reemplazará si no viene
    amount: {
      value: raw.amount?.value ?? raw.amount?.token ?? 0,
      usd: raw.amount?.usd ?? 0,
    },
    token: raw.token,
    timestamp: raw.timestamp,
    inflictedLaws: raw.inflictedLaws ?? raw.inflicted_laws ?? [],
  });

  const fetchNotifications = async () => {
    try {
      const [notifRes, addrRes] = await Promise.all([
        axiosInstance.get("/notifications"),
        axiosInstance.get("/addresses"),
      ]);

      const rawNotifications = notifRes.data?.data || [];
      const addresses = addrRes.data?.data || [];

      const addressMap = new Map<number, Address>(
        addresses.map((a: Address) => [a.id, a])
      );

      const normalized = rawNotifications.map((raw: any) => {
        const base = normalizeNotification(raw);
        return {
          ...base,
          address: base.address ?? addressMap.get(base.addressId || 0),
        };
      });

      setNotifications(normalized);
    } catch (err) {
      console.error("❌ Error fetching notifications o addresses:", err);
      setError("Error al cargar notificaciones");
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  return {
    notifications,
    error,
    loading,
    reportContent,
    reportLoading,
    openReport,
    handleOpenReport,
    setOpenReport,
  };
}
