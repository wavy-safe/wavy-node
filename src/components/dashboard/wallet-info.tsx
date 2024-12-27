"use client";

import { Card, CardContent } from "@/components/ui/card";

const DUMMY_WALLET = "0x64FeD9e56B548343E7bb47c49ecd7FFa9f1A34FE";
const DUMMY_TAG = "Tornado Cash Depositor";

export function WalletInfo() {
  return (
    <Card className="max-w-2xl">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="text-sm font-medium">Status</div>
            <div className="text-emerald-500">Clean</div>
          </div>
          <div className="space-y-1 text-right">
            <div className="text-xs text-muted-foreground break-all">
              {DUMMY_WALLET}
            </div>
            <div className="text-sm text-muted-foreground">wavynode.eth</div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm font-medium">Tags</div>
          <div className="text-muted-foreground">{DUMMY_TAG}</div>
        </div>
      </CardContent>
    </Card>
  );
}
