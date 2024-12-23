import { generateReport } from "@/lib/ai";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

	const query = request.nextUrl.searchParams
	const address = query.get('address') as string

	if (!address) return Response.json({
		success: false,
		message: 'address param is required'
	}, { status: 400 })

	const report = await generateReport(address)

	return Response.json({
		success: true,
		data: report
	})
}
