import { getBlockscout } from "@/lib/blockscout";
import { IChain } from "@/types/chain.type";
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";

export async function GET(
	_request: NextRequest,
	{ params }: { params: Promise<{ chainId: string }> }
) {
	try {
		const chainId = Number((await params).chainId)

		const supabase = await createClient()
		const blockscout = getBlockscout(chainId)

		const { data: chain, error } = await supabase.from('chains')
			.select()
			.eq('id', chainId)
			.single<IChain>()

		if (error) throw new Error(error.message)

		const stats = await blockscout.get('/stats')

		return Response.json({
			success: true,
			data: {
				name: chain.name,
				chain_id: chainId,
				currency_symbol: chain.currency_symbol,
				market_cap: stats.data.market_cap,
				coin_price: stats.data.coin_price,
				coin_image: stats.data.coin_image,
				total_addresses: stats.data.total_addresses,
				total_blocks: stats.data.total_blocks,
				total_transactions: stats.data.total_transactions,
				tvl: stats.data.tvl
			}
		})
	} catch (error) {
		console.error(error)
		return Response.json({
			success: false,
			message: error instanceof Error ? error.message : error
		}, { status: 500 })
	}
} 
