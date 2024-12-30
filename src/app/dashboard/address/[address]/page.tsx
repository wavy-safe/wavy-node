import Link from "next/link";
import StatusDashboard from "@/components/dashboard/StatusDashboard";
import BalanceOverview from "@/components/dashboard/balance-overview";
import ReportAI from "@/components/dashboard/report-ai";
import { ArrowLeft } from 'lucide-react'

interface AddressPageProps {
	params: Promise<{ address: string }>
}

export default async function AddressPage({ params }: AddressPageProps) {
	const { address } = await params;

	return (
		<div className="container mx-auto py-6 space-y-8">
			<div className="flex justify-start items-center">
				<Link
					href="/dashboard"
					className="px-4 py-2 hover:bg-[#eeeeee] rounded-lg"
				>
					<ArrowLeft />
				</Link>
				<h1 className="text-xl ms-2 font-bold text-gray-800">Wallet Details</h1>
			</div>

			{/* Status Component */}
			<StatusDashboard address={address} />

			{/* Balance Component */}
			<BalanceOverview address={address} />

			{/* AI Report Component */}
			<ReportAI address={address} />
		</div>
	);
}
