import { IEvent } from "@/types/event.type";

// we use async to make this function compliant with the execute field of the agent's tools
export const analyzeRisk = async (event: IEvent) => `
	Risk analysis completed for transaction ${event.tx_hash}:\n\n
	Contract: ${event.contract},
`

// export const analyzeRisk = async (event: IEvent) => `
// 	Risk analysis completed for transaction ${event.tx_hash}:\n\n
// 	Contract: ${event.contract},
// 	Event type: ${event.event_type},
// 	Tornado Cash: Found in block ${event.block}
// `
