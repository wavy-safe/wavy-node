"use client";

import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import LastExploits from "./exploit";

export function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const searchResults = await fetch(`/api/search?query=${query}`).then(
        (res) => res.json()
      );
      setResults(searchResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="w-full min-h-[120px] bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search Wallet"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full h-12 pl-6 pr-12 rounded-full border-slate-200 bg-[#1a2942] text-white placeholder:text-slate-400 focus-visible:ring-slate-400"
          />
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white cursor-pointer"
            onClick={handleSearch}
          >
            <SearchIcon className="h-5 w-5" />
          </div>
        </div>
        <p className="text-center text-slate-600 text-lg font-medium">
          Find the status of an address
        </p>
        <div className="pt-4">
          <Separator className="bg-gradient-to-r from-transparent via-slate-200 to-transparent h-[1px]" />
        </div>
        <div>
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="p-4 bg-slate-100 rounded-md shadow-sm text-slate-800"
                >
                  {result}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-400"></p>
          )}
          <LastExploits />
        </div>
      </div>
    </div>
  );
}
