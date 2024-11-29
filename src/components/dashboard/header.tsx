import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-[#D6D6ED] bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search..."
            className="pl-8 border-[#D6D6ED] bg-white"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border-[#2D2E89] text-[#2D2E89] hover:bg-[#C8E1EE] hover:text-[#2D2E89] hover:border-[#2D2E89]"
          >
            Documentation
          </Button>
          <Button className="bg-[#2D2E89] text-white hover:bg-[#394754]">
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
}
