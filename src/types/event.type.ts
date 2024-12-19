type Contract = 'tornado'

export interface IEvent {
	id: number,
	chain_id: number,
	contract: Contract,
	address: string,
	timestamp: number,
	tx_hash: string,
	block: number,
	event_type: string,
	amount: string | null,
}
