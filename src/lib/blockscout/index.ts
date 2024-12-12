import axios, { Axios } from "axios"

export const blockscoutFactory = (subdomain: string, apiKey: string, version: string = "v2"): Axios => {
	if (!apiKey) throw new Error('No blockscout apiKey')
	return axios.create({
		baseURL: `https://${subdomain}.blockscout.com/api/${version}`,
		params: {
			apikey: apiKey
		}
	})
}
