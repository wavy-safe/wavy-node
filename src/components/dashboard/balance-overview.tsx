'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Circle } from "lucide-react";

// Colores para los assets
const COLORS = [
  "#8B5CF6",
  "#10B981",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
  "#6366F1",
];

function DonutChart({ assets }: { assets: any[] }) {
  const totalValue = assets.reduce(
    (acc, asset) =>
      acc + parseFloat(asset.value) / Math.pow(10, asset.token.decimals || 18),
    0
  );

  let cumulativePercentage = 0; // Acumulador del porcentaje para los segmentos

  return (
    <div className="relative w-[120px] h-[120px]">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Fondo del círculo */}
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="white"
          stroke="#E2E8F0"
          strokeWidth="12"
        />
        {assets.map((asset, index) => {
          const assetValue =
            parseFloat(asset.value) / Math.pow(10, asset.token.decimals || 18);
          const percentage = (assetValue / totalValue) * 100;
          const strokeDasharray = (percentage / 100) * 339.29; // 339.29 es el perímetro total
          const strokeDashoffset = cumulativePercentage * 3.3929;

          cumulativePercentage += percentage; // Actualiza el acumulador

          return (
            <circle
              key={index}
              cx="60"
              cy="60"
              r="54"
              fill="transparent"
              stroke={COLORS[index % COLORS.length]}
              strokeWidth="12"
              strokeDasharray={`${strokeDasharray} 339.29`}
              strokeDashoffset={`-${strokeDashoffset}`}
              transform="rotate(-90 60 60)" // Rotar para iniciar en la parte superior
            />
          );
        })}
      </svg>
    </div>
  );
}

interface IProps {
  address: string;
}

export default function BalanceOverview({ address }: IProps) {
  const [balanceData, setBalanceData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBalanceData();
  }, [address]);

  const getBalanceData = async () => {
    try {
      const url = `/api/addresses/balance?chainId=42161&address=${address}`;
      const res = await axios.get(url);

      if (res.data && res.data.success) {
        setBalanceData(res.data.data);
      } else {
        setError("Invalid response structure.");
      }
    } catch (error: any) {
      setError("Error fetching balance data.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading Balance...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!balanceData) {
    return (
      <div className="text-gray-500">
        No balance data available for this address.
      </div>
    );
  }

  const totalBalance = balanceData.total_balance || 0;
  const assets = balanceData.assets || [];

  return (
    <div className="min-h-screen bg-[#F8FAFF] p-4">
      {/* Resumen del balance */}
      <Card className="mb-4 border-[#E2E8F0]">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-medium">
                Total balance:{" "}
                <span className="text-xl">
                  ${totalBalance.toFixed(2).toLocaleString()}
                </span>
              </div>
              <div className="text-sm text-muted-foreground font-mono">
                {address}
              </div>
            </div>

            <div className="flex justify-center">
              <DonutChart assets={assets} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de activos */}
      <Card className="border-[#E2E8F0]">
        <CardContent className="p-0">
          <ScrollArea className="h-[300px] w-full rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="bg-white">Asset</TableHead>
                  <TableHead className="bg-white">Address</TableHead>
                  <TableHead className="bg-white">Holding</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.length > 0 ? (
                  assets.map((asset: any, index: number) => (
                    <TableRow key={index} className="hover:bg-transparent">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Circle
                            className="h-4 w-4"
                            fill={COLORS[index % COLORS.length]}
                            stroke={COLORS[index % COLORS.length]}
                          />
                          {asset.token.name || "Unknown Asset"}
                        </div>
                      </TableCell>
                      <TableCell>{asset.token.address || "N/A"}</TableCell>
                      <TableCell>
                        {(
                          parseFloat(asset.value) /
                          Math.pow(10, asset.token.decimals || 18)
                        ).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No assets found.
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
