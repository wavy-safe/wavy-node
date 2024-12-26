import StatusDashboard from "@/components/dashboard/StatusDashboard";

export default async function AddressPage({ params }: { params: Promise<{ address: string }> }) {
	const { address } = await params

	return <div className="container mx-auto py-6 space-y-8">
		<StatusDashboard address={address} />
	</div>
} 
