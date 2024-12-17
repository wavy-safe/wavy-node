import { Axios } from "axios"
import { createBlockscout } from "./factory"

// Map<ChainId, Blockscout>
const blockscouts = new Map<number, Axios>()
	.set(42161, createBlockscout('arbitrum', process.env.BLOCKSCOUT_ARBITRUM_APIKEY!))

export const useBlockscout = (chainId: number) => {
	const b = blockscouts.get(chainId)
	if (!b) throw new Error(`No compatible chain found with chainId ${chainId}`)
	return b
}
