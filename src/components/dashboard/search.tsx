"use client";

import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import LastExploits from "./exploit";
import { useRouter } from "next/navigation";

const isValidEthereumAddressOrENS = (input: string) => {
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/; // Dirección Ethereum
  const ensRegex = /^[a-zA-Z0-9-]+\.eth$/; // ENS que termina en .eth
  return ethAddressRegex.test(input) || ensRegex.test(input);
};

export function Search() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a valid address or ENS.");
      return;
    }

    if (!isValidEthereumAddressOrENS(query)) {
      setError("Invalid Ethereum address or ENS (must end with .eth).");
      return;
    }

    setError(null); // Resetea el mensaje de error si todo está correcto
    router.push(`/dashboard/address/${query}`);
  };

  return (
    <div className="w-full min-h-[120px] bg-gradient-to-b from-white to-[#f8fafc]">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Input de búsqueda */}
        <div className="relative">
          <Input
            type="search"
            placeholder="Search Wallet or ENS (e.g., 0x... or example.eth)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full h-12 pl-6 pr-12 rounded-full border border-gray-300 bg-white text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
          />
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-blue-500 cursor-pointer hover:text-blue-700"
            onClick={handleSearch}
          >
            <SearchIcon className="h-5 w-5" />
          </div>
        </div>
        {/* Mensaje de error */}
        {error && (
          <p className="text-center text-red-500 text-sm font-medium">
            {error}
          </p>
        )}
        {/* Título descriptivo */}
        <p className="text-center text-gray-600 text-lg font-medium">
          Search the status of a wallet or ENS
        </p>
        <div className="pt-4">
          <Separator className="bg-gradient-to-r from-transparent via-blue-300 to-transparent h-[1px]" />
        </div>
        {/* Resultados o Exploits */}
        <div className="pt-6">
          <LastExploits />
        </div>
      </div>
    </div>
  );
}
