import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";

type Transaction = {
  app: string;
  icon: string;
  timeAgo: string;
};

type PortfolioSummaryProps = {
  address: string;
  ens: string;
  status: string;
  tags: string[];
  latestDapps: Transaction[];
  latestTransactions: Transaction[];
};

export default function PortfolioSummary({
  address,
  ens,
  status,
  tags,
  latestDapps,
  latestTransactions,
}: PortfolioSummaryProps) {
  return (
    <Card className="p-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Status</CardTitle>
            <p className="text-green-600 text-lg font-semibold">{status}</p>
          </div>
          <Button className="ml-auto">View portfolio</Button>
        </div>
        <p className="text-sm text-muted-foreground">{address}</p>
        <p className="text-sm text-muted-foreground">{ens}</p>
      </CardHeader>

      <CardContent>
        <div className="mb-4">
          <CardTitle>Tags</CardTitle>
          <div className="flex gap-2">
            {tags.map((tag, index) => (
              <Badge key={index}>{tag}</Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="w-1/2">
            <CardTitle>Latest interacted dApps</CardTitle>
            <ScrollArea className="h-32">
              {latestDapps.map((dapp, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={dapp.icon}
                      alt={dapp.app}
                      className="h-6 w-6"
                    />
                    <p>{dapp.app}</p>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {dapp.timeAgo}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </div>

          <div className="w-1/2">
            <CardTitle>Latest transactions</CardTitle>
            <ScrollArea className="h-32">
              {latestTransactions.map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={transaction.icon}
                      alt={transaction.app}
                      className="h-6 w-6"
                    />
                    <p>{transaction.app}</p>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {transaction.timeAgo}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
