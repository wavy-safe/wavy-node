"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axiosInstance from "@/lib/auth";

interface ReportAIProps {
  address: string;
}

export default function ReportAI({ address }: ReportAIProps) {
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      generateAIReport();
    }
  }, [address]);

  const generateAIReport = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/wallets/${address}/report`);
      if (response.data?.success && response.data.data) {
        setReport(response.data.data);
      } else {
        setError("No information found for this address.");
      }
    } catch (err: any) {
      setError("Error generating the report. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <Card className="rounded-lg border border-slate-200 bg-white">
        <CardContent className="p-8">
          <div className="mb-6 flex justify-end space-x-2 text-sm text-slate-600">
            <span className="font-mono">{address}</span>
          </div>

          <div className="space-y-8">
            {loading && <p className="text-gray-500">🔄 Generating report...</p>}
            {error && <p className="text-red-500">⚠️ {error}</p>}
            {!loading && !error && report ? (
              <section>
                <h2 className="mb-3 text-lg font-semibold">AI Report</h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{report}</p>
              </section>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
