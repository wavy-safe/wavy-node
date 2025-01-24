import { IChain } from "@/types/chain.type";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
	const supabase = await createClient()

	const { data: chains, error } = await supabase.from('chains')
		.select()
		.returns<IChain[]>()

	if (error) return Response.json({
		success: false,
		message: error.message
	}, { status: 500 })

	return Response.json({
		success: true,
		data: chains || []
	})
}
