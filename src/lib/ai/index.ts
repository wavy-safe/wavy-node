import { createClient } from "@/utils/supabase/server"
import { mainAgent } from "./agents"
import { IBlacklist } from "@/types/blacklist.type"
import { IEvent } from "@/types/event.type"

/**
	* Generates a report for the given address using generative ai 
*/
export const generateReport = async (address: string) => {
	const supabase = await createClient()

	// get all malicious events from db for that address 
	const { data: events } = await supabase.from('events')
		.select()
		.eq('address', address)
		.returns<IEvent[]>()

	// get where it has been blacklisted
	const { data: blacklists } = await supabase.from('blacklists')
		.select()
		.eq('address', address)
		.returns<IBlacklist[]>()

	if (blacklists?.length == 0 && events?.length == 0) return 'The address is clean'

	// Will end up with the following structure:
	// Malicious events:
	// {malicious event 1}
	// {malicious event 2}
	//
	// Blacklisted from:
	// {blacklist 1}
	// {blacklist 2}
	let findings = ''

	if (events && events.length > 0) findings = events.reduce((prev, curr) => {
		const { address, timestamp, id, amount, ...event } = curr
		return `${prev}\n${JSON.stringify(event)}`
	}, 'Malicious events:')

	if (blacklists && blacklists.length > 0) findings = blacklists.reduce((prev, curr) => {
		return `${prev}\n${JSON.stringify(curr)}`
	}, `${findings}\n\nBlacklisted from:`)

	const res = await mainAgent.run({
		messages: [
			{
				role: 'user',
				content: `For address: ${address}, the following situations where found\n${findings}`
			}
		]
	})

	return res.messages.at(-1)?.content
}
