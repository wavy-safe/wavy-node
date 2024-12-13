export interface IEvent {
	id: number,
	contract: 'tornado' | 'usdc' | 'usdt' | 'ofac',
	address: string,
	timestamp: number,
	tx_hash: string,
	amount: string,
	chain_id: number
}
