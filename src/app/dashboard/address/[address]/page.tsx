import Link from "next/link";
import StatusDashboard from "@/components/dashboard/StatusDashboard";
import BalanceOverview from "@/components/dashboard/balance-overview";
import ReportAI from "@/components/dashboard/report-ai";

export default function AddressPage({
  params,
}: {
  params: { address: string };
}) {
  const { address } = params;

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Wallet Details</h1>
        <Link
          href="/dashboard"
          className="px-4 py-2 text-white bg-[#1B2B3A] hover:bg-[#14222C] rounded-lg"
        >
          New Search
        </Link>
      </div>

      {/* Componente de estado */}
      <StatusDashboard address={address} />

      {/* Componente de balance */}
      <BalanceOverview address={address} />

      {/* Componente AI */}
      <ReportAI address={address} />
    </div>
  );
}
