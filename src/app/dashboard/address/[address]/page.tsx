import StatusDashboard from "@/components/dashboard/StatusDashboard";
import BalanceOverview from "@/components/dashboard/balance-overview";
import Link from "next/link";

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

      {/* Enlace a otra sección */}
      <div className="pt-4">
        <Link href={`/dashboard/address/${address}/agents`}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            View Agents
          </button>
        </Link>
      </div>
    </div>
  );
}
