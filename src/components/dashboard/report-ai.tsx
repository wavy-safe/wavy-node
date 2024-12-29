// report-ai.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ReportAI({ address }: { address: string }) {
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateAIReport = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://fastapi-wallet-api-1015236466818.us-central1.run.app/analyze-wallet",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            wallet_address: address,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate the report");
      }

      const data = await response.json();
      setReport(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error generating report:", error);
      setReport("Error generating the report. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    if (!report) {
      alert("No report available to export");
      return;
    }

    const blob = new Blob([report], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "wallet_report.json";
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <main className="mx-auto max-w-5xl">
        <div className="mb-4 flex justify-end gap-2">
          <Button
            variant="secondary"
            className="bg-[#1a2942] text-white hover:bg-[#1a2942]/90"
            onClick={exportReport}
          >
            Export
          </Button>
          <Button
            variant="secondary"
            className="bg-[#1a2942] text-white hover:bg-[#1a2942]/90"
            onClick={() => alert("Status functionality not implemented yet")}
          >
            View status
          </Button>
        </div>

        <Card className="rounded-lg border border-slate-200 bg-white">
          <CardContent className="p-8">
            <div className="mb-6 flex justify-end space-x-2 text-sm text-slate-600">
              <span className="font-mono">{address}</span>
              <span>wavynode.eth</span>
            </div>

            <div className="space-y-8">
              {report ? (
                <section>
                  <h2 className="mb-3 text-lg font-semibold">AI Report</h2>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {report}
                  </p>
                </section>
              ) : (
                <>
                  <section>
                    <h2 className="mb-3 text-lg font-semibold">Report Info</h2>
                    <p className="text-slate-600 leading-relaxed">
                      Click "Generate AI Report" to retrieve wallet analysis.
                    </p>
                  </section>
                </>
              )}

              <Button
                variant="secondary"
                className="bg-[#1a2942] text-white hover:bg-[#1a2942]/90 w-full"
                onClick={generateAIReport}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate AI Report"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
