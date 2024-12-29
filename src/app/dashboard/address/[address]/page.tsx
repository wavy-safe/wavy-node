import StatusDashboard from "@/components/dashboard/StatusDashboard";
import BalanceOverview from '@/components/dashboard/balance-overview';

export default function AddressPage({
  params,
}: {
  params: { address: string };
}) {
  const { address } = params;

  return (
    <div className="container mx-auto py-6 space-y-8">
      <StatusDashboard address={address} />
      <BalanceOverview address={address} />
    </div>
  );
}
