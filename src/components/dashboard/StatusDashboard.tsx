'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CheckCircle, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface IProps {
	address: string;
}

export default function StatusDashboard({ address }: IProps) {
	const [status, setStatus] = useState<any | null>(null);

	useEffect(() => {
		getStatus();
	}, []);

	const getStatus = async () => {
		try {
			const res = await axios.get(`/api/addresses/status?address=${address}&chainId=42161`);
			if (res.data && res.data.success) {
				setStatus(res.data.data);
			} else {
				console.error("Invalid response structure", res.data);
			}
		} catch (error) {
			console.error("Error fetching status:", error);
		}
	};

	if (!status) return null;

	// Determinar el estado basado en las etiquetas
	const hasTags = status.tags && status.tags.length > 0;
	const statusLabel = hasTags ? "Marked" : "Clean";
	const statusColor = hasTags ? "yellow" : "green";
	const statusIcon = hasTags ? (
		<AlertCircle className="mr-1 h-3 w-3" />
	) : (
		<CheckCircle className="mr-1 h-3 w-3" />
	);

	return (
		<div className="min-h-screen bg-[#F8FAFF] p-4">
			<Card className={`mb-6 border-${statusColor}-500`}>
				<CardContent className="p-4">
					<div className="flex flex-col gap-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<span className="font-medium">Status</span>
								<Badge className={`bg-${statusColor}-100 text-${statusColor}-700 hover:bg-${statusColor}-100`}>
									{statusIcon}
									{statusLabel}
								</Badge>
							</div>
							<span className="text-sm text-muted-foreground">{address}</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="font-medium">Tags</span>
							{hasTags ? (
								status.tags.map((tag: string, index: number) => (
									<Badge key={index} className="bg-gray-100 text-gray-700">
										{tag}
									</Badge>
								))
							) : (
								<span>No tags</span>
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="grid md:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium">Latest Interacted dApps</CardTitle>
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-[120px]">
							{status.lastDapps?.length > 0 ? (
								status.lastDapps.map((dapp: any, index: number) => (
									<div key={index} className="flex items-center justify-between py-2">
										<div className="flex items-center gap-2">
											<div className="bg-[#FE007A] rounded-full w-6 h-6" />
											<span>{dapp.name || dapp.hash}</span>
										</div>
										<div className="flex items-center gap-1 text-sm text-muted-foreground">
											<ArrowUpRight className="h-4 w-4" />
										</div>
									</div>
								))
							) : (
								<span>No dApps</span>
							)}
						</ScrollArea>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium">Latest Transactions</CardTitle>
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-[120px]">
							{status.lastTxs?.length > 0 ? (
								status.lastTxs.map((tx: any, index: number) => (
									<div key={index} className="flex items-center justify-between py-2">
										<div className="flex items-center gap-2">
											<div className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100">
												{/* Icon placeholder */}
											</div>
											<span>{tx.hash}</span>
										</div>
										<div className="flex items-center gap-1 text-sm text-muted-foreground">
											{new Date(tx.timestamp).toLocaleString()}
											<ArrowUpRight className="h-4 w-4" />
										</div>
									</div>
								))
							) : (
								<span>No transactions</span>
							)}
						</ScrollArea>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
