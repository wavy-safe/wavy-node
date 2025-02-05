"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Circle } from "lucide-react";

const COLORS = [
	"#8B5CF6",
	"#10B981",
	"#3B82F6",
	"#F59E0B",
	"#EF4444",
	"#EC4899",
	"#6366F1",
];

function DonutChart({ assets }: { assets: any[] }) {
	const totalValue = assets.reduce(
		(acc, asset) =>
			acc + parseFloat(asset.value) / Math.pow(10, asset.token.decimals || 18),
		0
	);

	let cumulativePercentage = 0;

	return (
		<div className="relative w-[150px] h-[150px]">
			<svg width="150" height="150" viewBox="0 0 150 150">
				<circle
					cx="75"
					cy="75"
					r="68"
					fill="white"
					stroke="#E2E8F0"
					strokeWidth="10"
				/>
				{assets.map((asset, index) => {
					const assetValue =
						parseFloat(asset.value) / Math.pow(10, asset.token.decimals || 18);
					const percentage = (assetValue / totalValue) * 100;
					const strokeDasharray = (percentage / 100) * 427.89;
					const strokeDashoffset = cumulativePercentage * 4.2789;
					cumulativePercentage += percentage;

					return (
						<circle
							key={index}
							cx="75"
							cy="75"
							r="68"
							fill="transparent"
							stroke={COLORS[index % COLORS.length]}
							strokeWidth="10"
							strokeDasharray={`${strokeDasharray} 427.89`}
							strokeDashoffset={`-${strokeDashoffset}`}
							transform="rotate(-90 75 75)"
						/>
					);
				})}
			</svg>
		</div>
	);
}

interface IProps {
	address: string;
}

export default function BalanceOverview({ address }: IProps) {
	const [balanceData, setBalanceData] = useState<any | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const getBalanceData = useCallback(async () => {
		setIsLoading(true);
		try {
			const res = await axios.get(
				`/api/addresses/balance?chainId=42161&address=${address}`
			);	
			if (res.data && res.data.success) {
				setBalanceData(res.data.data);
				setError(null); 
			} else {
				setError("Invalid response structure.");
			}
		} catch (err) {
			setError("Error fetching balance data.");
		} finally {
			setIsLoading(false);
		}
	}, [address]);

	useEffect(() => {
		getBalanceData();
	}, [getBalanceData]);

	if (isLoading)
		return <div className="text-center text-gray-500">Loading...</div>;
	if (error)
		return <div className="text-red-500">Error: {error}</div>;
	if (!balanceData) {
		return (
			<div className="text-gray-500">
				No balance data available for this address.
			</div>
		);
	}

	const totalBalance = balanceData.total_balance || 0;
	const assets = balanceData.assets || [];

	return (
		<div className="p-6 flex flex-col gap-6">
			{/* Total Balance Card */}
			<Card className="shadow-lg rounded-lg bg-white border-[#E2E8F0]">
				<CardContent className="p-6 flex items-center justify-between">
					<div>
						<h2 className="text-2xl font-semibold">Total Balance</h2>
						<p className="text-3xl text-green-600">
							${totalBalance.toFixed(2).toLocaleString()}
						</p>
					</div>
					<DonutChart assets={assets} />
				</CardContent>
			</Card>

			{/* Asset Table Card */}
			<Card className="shadow-lg rounded-lg bg-white border-[#E2E8F0]">
				<CardContent className="p-0">
					<ScrollArea className="h-[350px] w-full rounded-lg">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Asset</TableHead>
									<TableHead>Address</TableHead>
									<TableHead>Holding</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{assets.map((asset: any, index: number) => (
									<TableRow key={index}>
										<TableCell>
											<div className="flex items-center gap-2">
												<Circle
													className="h-4 w-4"
													fill={COLORS[index % COLORS.length]}
													stroke={COLORS[index % COLORS.length]}
												/>
												{asset.token.name || "Unknown Asset"}
											</div>
										</TableCell>
										<TableCell>{asset.token.address || "N/A"}</TableCell>
										<TableCell>
											{(
												parseFloat(asset.value) /
												Math.pow(10, asset.token.decimals || 18)
											).toFixed(2)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						<ScrollBar orientation="vertical" />
					</ScrollArea>
				</CardContent>
			</Card>
		</div>
	);
}
