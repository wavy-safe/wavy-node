import { useBlockscout } from "@/lib/blockscout";
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
		const blockscout = useBlockscout(chainId)

		const { data: chain, error } = await supabase.from('chains')
			.select()
			.eq('id', chainId)
			.single<IChain>()

		if (error) throw new Error(error.message)

		const stats = await blockscout.get('/stats')
		console.log({ stats })

		return Response.json({
			success: true,
			data: {
				name: chain.name,
				chainId,
				currencySymbol: chain.currency_symbol,
				marketCap: stats.data.market_cap,
				coinPrice: stats.data.coin_price,
				coinImage: stats.data.coin_image,
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
