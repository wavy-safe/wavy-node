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
      <h1 className="text-xl font-bold text-gray-800">Wallet Details</h1>
      
      {/* Componente de estado */}
      <StatusDashboard address={address} />
      
      {/* Componente de balance */}
      <BalanceOverview address={address} />

    {/* Componente AI*/}
      <ReportAI address={address} />

    </div>
  );
}