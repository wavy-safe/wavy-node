"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CheckCircle, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface IProps {
  address: string;
}

export default function StatusDashboard({ address }: IProps) {
  const [status, setStatus] = useState<any | null>(null);

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    try {
      const res = await axios.get(
        `/api/addresses/status?address=${address}&chainId=42161`
      );
      if (res.data && res.data.success) {
        setStatus(res.data.data);
      } else {
        console.error("Invalid response structure", res.data);
      }
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  if (!status)
    return <div className="text-center text-gray-500"></div>;

  const hasTags = status.tags && status.tags.length > 0;
  const statusLabel = hasTags ? "Marked" : "Clean";
  const statusColor = hasTags ? "yellow" : "green";
  const statusIcon = hasTags ? (
    <AlertCircle className="mr-1 h-5 w-5" />
  ) : (
    <CheckCircle className="mr-1 h-5 w-5" />
  );

  return (
    <div className="min-h-screen bg-[#F8FAFF] p-6 flex flex-col gap-6">
      {/* Status Card */}
      <Card className="shadow-lg rounded-lg bg-white border-[#E2E8F0]">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg font-medium">Status</span>
                <Badge
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm bg-${statusColor}-100 text-${statusColor}-800`}
                >
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
                    <Badge
                      key={index}
                      className="rounded-full px-3 py-1 text-sm bg-gray-200 text-gray-800"
                    >
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

      {/* Grid Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Latest Interacted dApps */}
        <Card className="shadow-lg rounded-lg bg-white border-[#E2E8F0]">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Latest Interacted dApps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[150px]">
              {status.lastDapps?.length > 0 ? (
                status.lastDapps.map((dapp: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-[#FE007A] rounded-full w-6 h-6" />
                      <span className="font-medium text-gray-700">
                        {dapp.name || dapp.hash}
                      </span>
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
            <CardTitle className="text-sm font-semibold">
              Latest Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[150px]">
              {status.lastTxs?.length > 0 ? (
                status.lastTxs.map((tx: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-200 rounded-full w-6 h-6 flex items-center justify-center">
                        <span className="text-xs font-medium text-orange-600">
                          TX
                        </span>
                      </div>
                      <span className="font-medium text-gray-700">
                        {tx.hash}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(tx.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-center">
                  No transactions found
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
