"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DashboardNav() {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-[#EAF0F5]">
      <div className="w-full max-w-md mt-12">
        {/* Logo y título */}
        <div className="flex flex-col items-center mb-8">
          <img src="/wavyNode.svg" alt="Logo" className="h-12 mb-4" />
          <h1 className="text-3xl font-semibold text-gray-900">Wavy Node</h1>
        </div>

        {/* Input y botón */}
        <div className="w-full max-w-md">
          <div className="flex items-center bg-[#1F2937] rounded-full shadow-md">
            <Input
              type="text"
              placeholder="Address"
              className="flex-1 rounded-l-full border-none bg-[#1F2937] text-white px-4 py-3 focus:outline-none"
            />
            <Button className="rounded-r-full bg-[#111827] text-white px-6 py-3 hover:bg-[#374151] transition-all">
              Search
            </Button>
          </div>
          <p className="text-gray-500 mt-2 text-center">
            Find the status of an address
          </p>
        </div>
      </div>
    </div>
  );
}
