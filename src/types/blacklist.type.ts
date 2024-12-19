type Blacklist = "usdt" | "usdc" | "ofac"

export interface IBlacklist {
	id: number,
	blacklist: Blacklist,
	address: string,
	timestamp: number
}
