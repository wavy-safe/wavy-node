import { createClient } from "@/utils/supabase/server"
import { mainAgent } from "./agents"
import { IBlacklist } from "@/types/blacklist.type"
import { IEvent } from "@/types/event.type"

export const generateReport = async (address: string) => {
	const supabase = await createClient()

	const { data: events } = await supabase.from('events')
		.select()
		.eq('address', address)
		.returns<IEvent[]>()


	const { data: blacklists } = await supabase.from('blacklists')
		.select()
		.eq('address', address)
		.returns<IBlacklist[]>()

	let findings = ''

	if (events) findings = events.reduce((prev, curr) => {
		const { address, timestamp, id, amount, ...event } = curr
		return `${prev}\n${JSON.stringify(event)}`
	}, 'Malicious events:')

	if (blacklists) findings = blacklists!.reduce((prev, curr) => {
		return `${prev}\n${JSON.stringify(curr)}`
	}, `${findings}\n\nBlacklisted from:`)

	if (!blacklists && !events) return 'The address is clean'

	console.log(findings)

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
