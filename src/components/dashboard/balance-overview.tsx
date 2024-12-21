i"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Circle } from 'lucide-react'

function DonutChart() {
  return (
    <div className="relative w-[120px] h-[120px]">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Background circle */}
        <circle 
          cx="60" 
          cy="60" 
          r="54" 
          fill="white" 
          stroke="#1B2B3A" 
          strokeWidth="12"
        />
        {/* Purple segments - all 100% */}
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="transparent"
          stroke="#1B2B3A"
          strokeWidth="12"
          strokeDasharray="339.29"
          strokeDashoffset="0"
          transform="rotate(-90 60 60)"
        />
      </svg>
    </div>
  )
}

export default function BalanceOverview() {
  const assets = [
    { symbol: "ARB", price: 123456, holding: 123.456, value: 123456 },
    { symbol: "ARB", price: 123456, holding: 123.456, value: 123456 },
    { symbol: "ARB", price: 123456, holding: 123.456, value: 123456 },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFF] p-4">
      <Card className="mb-4 border-[#E2E8F0]">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-medium">
                Total balance: <span className="text-xl">${(123456).toLocaleString()}</span>
              </div>
              <div className="text-sm text-muted-foreground font-mono">
                0x64Fe09e588B483438E7bb47c49ecd9FF09f1A4ff
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <DonutChart />
              <div className="text-sm text-muted-foreground">
                wavynode.eth
              </div>
            </div>

            <div className="grid gap-1.5">
              {assets.map((_, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Circle className="h-3 w-3 fill-[#1B2B3A] stroke-[#33516d]" />
                  <span>ARB</span>
                  <span className="text-muted-foreground">100.01%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#E2E8F0]">
        <CardContent className="p-0">
          <ScrollArea className="h-[200px] w-full rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[140px] bg-white">Asset</TableHead>
                  <TableHead className="w-[140px] bg-white">Network</TableHead>
                  <TableHead className="w-[140px] bg-white">Price</TableHead>
                  <TableHead className="w-[140px] bg-white">Holding</TableHead>
                  <TableHead className="w-[140px] bg-white">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset, index) => (
                  <TableRow key={index} className="hover:bg-transparent">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Circle className="h-4 w-4 fill-[#8B5CF6] stroke-[#8B5CF6]" />
                        {asset.symbol}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-5 h-5 rounded-full bg-[#0052FF] flex items-center justify-center">
                        <span className="text-white text-xs">N</span>
                      </div>
                    </TableCell>
                    <TableCell>${asset.price.toLocaleString()}</TableCell>
                    <TableCell>{asset.holding.toLocaleString()}</TableCell>
                    <TableCell>${asset.value.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

