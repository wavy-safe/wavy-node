import { createAgent } from 'ts-swarm'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { analyzeRisk } from './tools/analyzeRisk'
import { summarizePrompt } from './prompts'

const gptModel = "gpt-4o-mini"

// not being used rn because of issues found related with agent.tools fields
export const riskAgent = createAgent({
	id: 'RiskSense',
	model: openai(gptModel),
	temperature: 0.3,
	maxTokens: 150,
	frequencyPenalty: 0.5,
	presencePenalty: 0.0,
	system: "Interpret the overall risk level based on interaction flags provided.",
	tools: [
		{
			id: 'AnalyzeRisk',
			description: 'Analyze risk level based on transaction data',
			parameters: z.object({
				event: z.object({
					tx_hash: z.string().describe('Transaction hash'),
					contract: z.string().describe('Contract used'),
					// event_type: z.string().describe('Event type of the transaction'),
					// block: z.string().describe('Block where the transaction can be found'),
				})
			}),
			execute: analyzeRisk
		}
	]
})

export const resultsAgent = createAgent({
	id: 'Summarize',
	model: openai(gptModel),
	temperature: 0.4,
	frequencyPenalty: 0.5,
	presencePenalty: 0.0,
	system: summarizePrompt,
})

export const mainAgent = createAgent({
	id: 'MainAgent',
	model: openai('gpt-4o-mini'),
	system: `Your job is to generate a report for blockchain addresses and determine the level of risk that each address represent.`,
	// todo: fix riskAgent
	tools: [resultsAgent],
})
