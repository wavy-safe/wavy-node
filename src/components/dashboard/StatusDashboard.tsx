'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, CircleX, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { IStatus } from "@/types/address-status.type";
import axios from "axios";


interface IProps {
	address: string
}
export default function StatusDashboard({ address }: IProps) {
	const [status, setStatus] = useState<IStatus | null>(null)

	useEffect(() => {
		getStatus()
	}, [])

	const getStatus = async () => {
		const res = await axios.get<IStatus>(`/api/addresses/status?address=${address}&chainId=42161`)
		setStatus(res.data)
	}

	if (!status) return null
	return (
		<div className="min-h-screen bg-[#F8FAFF] p-4">
			<Card className="mb-6">
				<CardContent className="p-4">
					<div className="flex flex-col gap-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<span className="font-medium">Status</span>
								{status.status == "clean"
									? <Badge className="bg-green-100 text-green-700 hover:bg-green-100" >
										<CheckCircle className="mr-1 h-3 w-3" />
										Clean
									</Badge>
									: <Badge className="bg-red-100 text-red-700 hover:bg-red-100" >
										<CircleX className="mr-1 h-3 w-3" />
										Dirty
									</Badge>
								}
							</div>
							<span className="text-sm text-muted-foreground">
								{address}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="font-medium">Tags</span>
							<Badge variant="secondary">Tornado Cash Depositor</Badge>
						</div>
						<div className="text-sm text-muted-foreground text-right">
							wavynode.eth
						</div>
					</div>
				</CardContent>
			</Card>

			<div className="grid md:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium">
							Latest Interacted dApps
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-[120px]">
							{[
								{ name: "Uniswap", time: "3 days ago" },
								{ name: "Uniswap", time: "3 days ago" },
							].map((app, index) => (
								<div
									key={index}
									className="flex items-center justify-between py-2"
								>
									<div className="flex items-center gap-2">
										<div className="bg-[#FE007A] rounded-full w-6 h-6" />
										<span>{app.name}</span>
									</div>
									<div className="flex items-center gap-1 text-sm text-muted-foreground">
										{app.time}
										<ArrowUpRight className="h-4 w-4" />
									</div>
								</div>
							))}
						</ScrollArea>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium">
							Latest transactions
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-[120px]">
							{[
								{
									icon: "a",
									name: "Binance Deposit",
									time: "3 days ago",
								},
								{
									icon: "a",
									name: "0x64...4FF",
									time: "3 days ago",
								},
							].map((tx, index) => (
								<div
									key={index}
									className="flex items-center justify-between py-2"
								>
									<div className="flex items-center gap-2">
										<div className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100">
											{tx.icon}
										</div>
										<span>{tx.name}</span>
									</div>
									<div className="flex items-center gap-1 text-sm text-muted-foreground">
										{tx.time}
										<ArrowUpRight className="h-4 w-4" />
									</div>
								</div>
							))}
						</ScrollArea>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
