import axios from "axios";
import dotenv from "dotenv";
import { getAccessToken } from "@privy-io/react-auth";

dotenv.config();

const baseUrl = process.env.BASE_URL;
const fastApiUrl = process.env.FASTAPI_URL;
const arbChainId = process.env.NEXT_PUBLIC_ARB_CHAIN_ID;

if (!baseUrl) {
    throw new Error("Missing environment variable: BASE_URL");
}
if (!fastApiUrl) {
    throw new Error("Missing environment variable: FASTAPI_URL");
}

export const apiUtils = {
    createRequest: async (endpoint, method = "GET", data = null, isFastApi = false) => {
        const accessToken = await getAccessToken();
        if (!accessToken) throw new Error("User not authenticated. No Privy token found.");

        const url = `${isFastApi ? fastApiUrl : baseUrl}${endpoint}`;
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
            "x-prvy-auth": accessToken,
        };

        try {
            const response = await axios({ url, method, data, headers, withCredentials: true });
            return response.data;
        } catch (error) {
            throw new Error(error?.response?.data || error.message || "API request failed");
        }
    },
    
    getLastExploits: () => apiUtils.createRequest(`/exploits?chainId=${arbChainId}`),
    analyzeWallet: (walletAddress) => apiUtils.createRequest(`/analyze-wallet`, "POST", { walletAddress }, true),
    getWalletBalance: (cleanAddress, apiKey) => apiUtils.createRequest(`/wallets/${cleanAddress}/balance?chainId=${arbChainId}&apiKey=${apiKey}`),
    getWalletStatus: (dirtyAddress, apiKey) => apiUtils.createRequest(`/wallets/${dirtyAddress}/status?chainId=${arbChainId}&apiKey=${apiKey}`),
    reportWallet: (dirtyAddress, apiKey) => apiUtils.createRequest(`/wallets/${dirtyAddress}/report?apiKey=${apiKey}`, "POST"),
};
