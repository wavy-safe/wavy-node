"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axiosInstance from "@/lib/auth";
import { marked } from "marked";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

interface ReportAIProps {
  address: string;
}

export default function ReportAI({ address }: ReportAIProps) {
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateAIReport();
  }, [address]);

  const generateAIReport = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${baseUrl}/wallets/${address}/report?apiKey=${apiKey}`
      );

      if (response.data.success) {
        const htmlReport = await marked(response.data.data);
        setReport(htmlReport);
      } else {
        setReport("No se encontró información para esta dirección.");
      }
    } catch (error) {
      console.error("Error generating report:", error);
      setReport("Error generating the report. Please try again later.");
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
            {loading ? (
              <p>Loading...</p>
            ) : report ? (
              <section>
                <h2 className="mb-3 text-lg font-semibold">AI Report</h2>
                <p
                  dangerouslySetInnerHTML={{ __html: report }}
                  className="text-slate-600 leading-relaxed whitespace-pre-wrap"
                ></p>
              </section>
            ) : (
              <p>No report available.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
