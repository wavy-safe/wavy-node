import { Input } from "@/components/ui/input";  

export function Search() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-2">
      <div className="relative">
        <Input
          type="text"
          placeholder="Wallet"
          className="w-full pl-4 pr-10 py-2 rounded-lg border"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          Search
        </span>
      </div>
      <p className="text-center text-muted-foreground">
        Find the status of an address
      </p>
    </div>
  );
}
