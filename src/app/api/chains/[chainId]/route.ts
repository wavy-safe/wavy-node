import { NextRequest } from "next/server";

interface IChainData {
	name: string,
	chainId: number,
	tvl: number,
	token: {
		name: string,
		symbol: string,
		price: number,
		marketCap: number
	}
}

export async function GET(
	_request: NextRequest,
	{ params }: { params: Promise<{ chainId: string }> }
) {
	const chainId = Number((await params).chainId)

	// TVL
	// token price
	const data: IChainData = {
		name: "Arbitrum",
		chainId,
		tvl: 322,
		token: {
			name: "Arbitrum",
			symbol: "ARB",
			price: 0.45,
			marketCap: 43
		}
	}

	return Response.json({ success: true, data, })
} 
