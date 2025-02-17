"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Circle } from "lucide-react";

const COLORS = ["#8B5CF6", "#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#EC4899", "#6366F1"];

interface IAsset {
  token: {
    name: string;
    address: string;
    decimals: number;
  };
  value: string;
}

interface IBalanceData {
  total_balance: number;
  assets: IAsset[];
}

interface IProps {
  address: string;
}

export default function BalanceOverview({ address }: IProps) {
  const [balanceData, setBalanceData] = useState<IBalanceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) {
      setError("Wallet address is required.");
      setIsLoading(false);
      return;
    }

    const getBalanceData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`/wallets/${address}/balance?chainId=42161`);

        if (response.data?.success && response.data.data) {
          setBalanceData(response.data.data);
        } else {
          setError("Invalid API response.");
        }
      } catch {
        setError("Error fetching balance data.");
      } finally {
        setIsLoading(false);
      }
    };

    getBalanceData();
  }, [address]);

  if (isLoading) return <div className="text-center text-gray-500">🔄 Loading balance...</div>;
  if (error) return <div className="text-red-500">⚠️ {error}</div>;
  if (!balanceData) return <div className="text-gray-500">No balance data available.</div>;

  const { total_balance, assets } = balanceData;

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Total Balance Card */}
      <Card className="shadow-lg rounded-lg bg-white border-[#E2E8F0]">
        <CardContent className="p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold">Total Balance</h2>
          <p className="text-3xl text-green-600">${total_balance.toFixed(4)}</p>
        </CardContent>
      </Card>

      {/* Assets Table */}
      <Card className="shadow-lg rounded-lg bg-white border-[#E2E8F0]">
        <CardContent className="p-0">
          <ScrollArea className="h-[350px] w-full rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Holding</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.length > 0 ? (
                  assets.map((asset, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Circle className="h-4 w-4" fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} />
                          {asset.token.name || "Unknown Asset"}
                        </div>
                      </TableCell>
                      <TableCell>{asset.token.address || "N/A"}</TableCell>
                      <TableCell>
                        {(parseFloat(asset.value) / Math.pow(10, asset.token.decimals || 18)).toFixed(4)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500">
                      No assets available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
