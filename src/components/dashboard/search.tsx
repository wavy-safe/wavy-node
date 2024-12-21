"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import LastExploits from "./exploit";

export function Search() {
  return (
    <div className="w-full bg-[#ffffff]">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-2">
        <div className="relative">
          <Input
            type="text"
            placeholder=""
            className="w-full h-12 pl-6 pr-20 rounded-full border-[#E2E8F0] bg-white placeholder:text-black"
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-black">
            Search
          </span>
        </div>
        <p className="text-center text-gray-700 text-lg">
          Find the status of an address
        </p>
        <div className="pt-4">
          <Separator className="bg-gradient-to-r from-transparent via-[#E2E8F0] to-transparent h-[1px]" />
        </div>
        <div>
          <LastExploits />
        </div>
      </div>
    </div>
  );
}
