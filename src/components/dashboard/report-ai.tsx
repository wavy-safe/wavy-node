"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import jsPDF from "jspdf";
import axios from "axios";
import { marked } from 'marked'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
	throw new Error("Base URL is not defined. Check your .env.local file.");
}

interface ReportAIProps {
	address: string;
}

export default function ReportAI({ address }: ReportAIProps) {
	const [report, setReport] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		generateAIReport()
	}, [])

	const generateAIReport = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`${baseUrl}/api/addresses/report`, {
				params: { address },
			});

			if (response.data.success) {
				setReport(response.data.data);
			} else {
				setReport("No se encontró información para esta dirección.");
			}
		} catch (error) {
			console.error("Error generating report:", error);
			setReport("Error generating the report. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	const exportReportAsPDF = () => {
		if (!report) {
			alert("No report available to export");
			return;
		}

		const doc = new jsPDF();
		const marginX = 10;
		const marginY = 10;
		const lineHeight = 10;

		const lines = doc.splitTextToSize(report, 190);
		lines.forEach((line: string, index: number) => {
			doc.text(line, marginX, marginY + index * lineHeight);
		});

		doc.save("wallet_report.pdf");
	};

	return (
		<div className="p-6 w-full">
			{/* <div className="mb-4 flex justify-end"> */}
			{/* 	<Button */}
			{/* 		variant="secondary" */}
			{/* 		className="bg-[#1a2942] text-white hover:bg-[#1a2942]/90" */}
			{/* 		onClick={exportReportAsPDF} */}
			{/* 		disabled={!report} */}
			{/* 	> */}
			{/* 		Export PDF */}
			{/* 	</Button> */}
			{/* </div> */}

			<Card className="rounded-lg border border-slate-200 bg-white">
				<CardContent className="p-8">
					<div className="mb-6 flex justify-end space-x-2 text-sm text-slate-600">
						<span className="font-mono">{address}</span>
						{/* <span>wavynode.eth</span> */}
					</div>

					<div className="space-y-8">
						{report ? (
							<section>
								<h2 className="mb-3 text-lg font-semibold">AI Report</h2>
								<p dangerouslySetInnerHTML={{ __html: marked(report) }} className="text-slate-600 leading-relaxed whitespace-pre-wrap">
									{/* {report.replace(/"/g, "&quot;")} */}
								</p>
							</section>
						) : (
							<p>Loading...
								{/* <> */}
								{/* <section> */}
								{/* 	<h2 className="mb-3 text-lg font-semibold">Report Info</h2> */}
								{/* 	<p className="text-slate-600 leading-relaxed"> */}
								{/* 		Click &quot;Generate AI Report&quot; to retrieve wallet analysis. */}
								{/* 	</p> */}
								{/* </section> */}
								{/* </> */}
							</p>
						)}

						{/* <Button */}
						{/* 	variant="secondary" */}
						{/* 	className="bg-[#1a2942] text-white hover:bg-[#1a2942]/90 w-full" */}
						{/* 	onClick={generateAIReport} */}
						{/* 	disabled={loading} */}
						{/* > */}
						{/* 	{loading ? "Generating..." : "Generate AI Report"} */}
						{/* </Button> */}
					</div>
				</CardContent>
			</Card>
		</div >
	);
}
