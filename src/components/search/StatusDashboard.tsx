"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CheckCircle, ArrowUpRight } from "lucide-react";
import type { IStatus, ITransaction, IDapp } from "@/types/status";

interface IProps {
  address: string;
}

export default function StatusDashboard({ address }: IProps) {
  const [status, setStatus] = useState<IStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) {
      setError("Wallet address is required.");
      setLoading(false);
      return;
    }

    const getStatus = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axiosInstance.get(`/wallets/${address}/status?chainId=42161`);
        if (res.data?.success && res.data.data) {
          setStatus(res.data.data);
        } else {
          setError("Invalid response structure.");
        }
      } catch (err: any) {
        setError("Error fetching status. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getStatus();
  }, [address]);

  if (loading) return <div className="text-center text-gray-500">🔄 Loading status...</div>;
  if (error) return <div className="text-red-500">⚠️ {error}</div>;
  if (!status) return <div className="text-gray-500">No status available.</div>;

  const hasTags = status.tags.length > 0;
  const statusLabel = hasTags ? "Marked" : "Clean";
  const statusColor = hasTags ? "yellow" : "green";
  const statusIcon = hasTags ? <AlertCircle className="mr-1 h-5 w-5" /> : <CheckCircle className="mr-1 h-5 w-5" />;

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Status Card */}
      <Card className="shadow-lg rounded-lg bg-white border-[#E2E8F0]">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg font-medium">Status</span>
                <Badge className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm bg-${statusColor}-100 text-${statusColor}-800`}>
                  {statusIcon}
                  {statusLabel}
                </Badge>
              </div>
              <span className="text-sm text-gray-500 font-mono">{address}</span>
            </div>

            <div>
              <span className="font-medium text-lg">Tags:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {hasTags ? (
                  status.tags.map((tag: string, index: number) => (
                    <Badge key={index} className="rounded-full px-3 py-1 text-sm bg-gray-200 text-gray-800">
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500">No tags</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Latest Interacted dApps */}
        <Card className="shadow-lg rounded-lg bg-white border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Latest Interacted dApps</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[150px]">
              {status.lastDapps.length > 0 ? (
                status.lastDapps.map((dapp: IDapp, index: number) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#FE007A] rounded-full w-6 h-6" />
                      <span className="font-medium text-gray-700">{dapp.name || dapp.hash}</span>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-gray-500" />
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-center">No dApps found</div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Latest Transactions */}
        <Card className="shadow-lg rounded-lg bg-white border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Latest Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[250px] w-full">
              {status.lastTxs.length === 0 ? (
                <div className="text-gray-500 text-center py-4">No transactions found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left px-4 py-2 text-gray-600">TX Hash</th>
                        <th className="text-left px-4 py-2 text-gray-600">Status</th>
                        <th className="text-left px-4 py-2 text-gray-600">From</th>
                        <th className="text-left px-4 py-2 text-gray-600">To</th>
                      </tr>
                    </thead>
                    <tbody>
                      {status.lastTxs.map((tx: ITransaction, index: number) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="px-4 py-2 font-mono text-blue-600 truncate max-w-[200px]">
                            <a href={`https://arbiscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {tx.hash}
                            </a>
                          </td>
                          <td className="px-4 py-2">{tx.status}</td>
                          <td className="px-4 py-2 text-gray-700">{tx.from.hash}</td>
                          <td className="px-4 py-2 text-gray-700">{tx.to.hash}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
