"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", total: 1234 },
  { name: "Feb", total: 2234 },
  { name: "Mar", total: 1834 },
  { name: "Apr", total: 2534 },
  { name: "May", total: 2864 },
  { name: "Jun", total: 3134 },
];

export function Overview() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            total: {
              label: "Total",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="total"
                strokeWidth={2}
                activeDot={{
                  r: 6,
                  style: { fill: "var(--color-total)", opacity: 0.8 },
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
