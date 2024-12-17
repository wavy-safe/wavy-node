import { Button } from "@/components/ui/button";
import { Search } from "../../components/dashboard/search";
import { NetworkSelector } from "../../components/dashboard/network-selector.tsx";
import { ReportOutline } from "../../components/dashboard/report-outline.tsx";
import { WalletInfo } from "../../components/dashboard/wallet-info";

export default function Home() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <Search />
      <NetworkSelector />
	  {/* these buttons should trigger server actions */}
      <div className="flex justify-end gap-4 px-4">
        <Button variant="default">Generate report</Button>
        <Button variant="default">View status</Button>
      </div>
      <div className="grid md:grid-cols-2 gap-8 px-4">
        <ReportOutline />
        <WalletInfo />
      </div>
    </div>
  );
}
