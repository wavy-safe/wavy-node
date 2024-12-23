"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TransactionView() {
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateAIReport = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transaction: "0x64feD5e56B54834E7bb47c49ecd7fFa9f1A34FE",
        }),
      });

      const data = await response.json();
      setReport(data.report);
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <main className="mx-auto max-w-5xl">
        <div className="mb-4 flex justify-end gap-2">
          <Button
            variant="secondary"
            className="bg-[#1a2942] text-white hover:bg-[#1a2942]/90"
          >
            Export
          </Button>
          <Button
            variant="secondary"
            className="bg-[#1a2942] text-white hover:bg-[#1a2942]/90"
          >
            View status
          </Button>
        </div>

        <Card className="rounded-lg border border-slate-200 bg-white">
          <CardContent className="p-8">
            <div className="mb-6 flex justify-end space-x-2 text-sm text-slate-600">
              <span className="font-mono">
                0x64feD5e56B54834E7bb47c49ecd7fFa9f1A34FE
              </span>
              <span>wavynode.eth</span>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="mb-3 text-lg font-semibold">Lorem ipsum</h2>
                <p className="text-slate-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque et ante nec lorem blandit posuere et eu nulla.
                  Suspendisse rhoncus erat nec gravida suscipit. Integer et
                  mollis metus. Aliquam id justo accumsan, ornare metus congue,
                  pulvinar orci. Fusce elementum faucibus aliquam. Nunc eu
                  pellentesque mauris, sed elementum magna. In hac habitasse
                  platea dictumst. Nam non tellus eget tellus ullamcorper
                  posuere. Maecenas consequat tempor dui nec venenatis. Etiam a
                  sagittis magna. Vestibulum aliquet arcu et mi dictum maximus.
                  Mauris pharetra venenatis eleifend. Aliquam vulputate, sapien
                  sed vulputate porta, enim orci malesuada tellus, in auctor dui
                  leo posuere felis. Cras eu consequat lorem. Ut nec pretium
                  orci. Vivamus sed mattis nisi.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-lg font-semibold">Lorem ipsum</h2>
                <p className="text-slate-600 leading-relaxed">
                  Praesent et vehicula eros, sit amet feugiat nulla. Nulla non
                  odio lacus. Donec porta, mi eu elementum feugiat, libero
                  mauris fermentum nisi, quis eleifend mi tellus sit amet justo.
                  Proin elementum nibh nec commodo dignissim. Cras sapien lacus
                  sodales eu et libero torquent per conubia nostra, per inceptos
                  himenaeos. Nam in velit vitae est laoreet suscipit. Mauris
                  vitae magna sed quam viverra porta eu id odio. Aliquam erat
                  volutpat. Fusce quam nibh, volutpat a sodales in, efficitur
                  quis tortor. Maecenas et sagittis velit, vitae varius turpis.
                  Quisque venenatis egestas est sed blandit. Cras purus lorem,
                  molestie eu mattis lacinia, eleifend in nunc. Cras sodales
                  vitae neque eget rhoncus. Vivamus pretium, neque vitae
                  hendrerit rhoncus, nulla odio aliquet nulla, ut venenatis
                  metus nisl viverra magna.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-lg font-semibold">Lorem ipsum</h2>
                <p className="text-slate-600 leading-relaxed">
                  Sed vel commodo ante. Ut dictum urna non metus eleifend,
                  lobortis luctus nulla efficitur. Vestibulum vitae neque
                  mattis, sagittis urna ut, porta lectus. Donec vitae turpis
                  eros. Aliquam quis mauris ut diam lobortis placerat. Quisque a
                  tempus libero. Praesent eleifend libero eros, quis commodo
                  enim varius non. Maecenas eget justo ut tortor aliquet
                  interdum. Nunc at velit eu nisi pharetra gravida eu nec ipsum.
                  Mauris ultrices justo a quam vulputate, ut imperdiet neque
                  scelerisque.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
