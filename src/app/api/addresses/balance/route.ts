import { IAsset } from "@/types/held-asset.type"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {

	const query = request.nextUrl.searchParams
	const networkId = query.get('networkId') as string
	const address = query.get('address') as string

	// mock data
	const assets: IAsset[] = [
		{ network: 'arbitrum', name: 'arbitrum', symbol: 'ARB', held: 7.43, contract: '0x01e2919679362dFBC9ee1644Ba9C6da6D6245BB1' },
		{ network: 'arbitrum', name: 'ether', symbol: 'ETH', held: 0.004, contract: '0x01e2919679362dFBC9ee1644Ba9C6da6D6245BB1' },
	]

	return Response.json({
		success: true,
		data: assets
	})
}
