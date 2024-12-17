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

	const addressData = await blockscout.get(`/addresses/${address}`)
	const tokens = await blockscout.get(`/addresses/${address}/tokens?${params.toString()}`)

	// main currency balance
	const coinBalance = Number(addressData.data.coin_balance) / Math.pow(10, 18)
	const coinBalanceInUSD = coinBalance * Number(addressData.data.exchange_rate)

	// get total balance
	const totalBalance = (tokens.data.items as any[]).reduce((prev, curr) => {
		if (curr.token.exchange_rate) {
			const owned = Number(curr.value) / Math.pow(10, Number(curr.token.decimals))
			const valueInUSD = owned * Number(curr.token.exchange_rate)
			return prev + valueInUSD
		}
		return prev
	}, coinBalanceInUSD || 0)

	return Response.json({
		success: true,
		data: {
			total_balance: totalBalance,
			assets: tokens.data.items,
		}
	})
}
