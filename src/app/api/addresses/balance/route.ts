import { useBlockscout } from "@/lib/blockscout"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {

	const query = request.nextUrl.searchParams
	const chainId = query.get('chainId') as string
	const address = query.get('address') as string

	const blockscout = useBlockscout(Number(chainId))

	if (!chainId) return Response.json({
		success: false,
		message: 'chainId param is required'
	}, { status: 400 })
	if (!address) return Response.json({
		success: false,
		message: 'address param is required'
	}, { status: 400 })

	// get tokens and balances of address
	const params = new URLSearchParams()
	params.set('type', 'ERC-20')

	const res = await blockscout.get(`/addresses/${address}/tokens?${params.toString()}`)

	return Response.json({
		success: true,
		data: res.data.items
	})
}
