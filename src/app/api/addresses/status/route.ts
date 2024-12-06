import { IStatus } from "@/types/address-status.type"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {

	const query = request.nextUrl.searchParams
	const networkId = query.get('networkId') as string
	const address = query.get('address') as string

	const status: IStatus = {
		status: "dirty",
		tags: ["tornado"],
		lastTxs: [],
		lastDapps: []
	}

	return Response.json({
		success: true,
		data: status
	})
}
