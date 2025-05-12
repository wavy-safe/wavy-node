export interface InflictedLaw {
    country: string;
    name: string;
    risk: "warn" | "high" | "info" | string;
    description: string;
    source?: string;
  }
  
  export interface Address {
    id: number;
    address: string;
    description: string;
  }
  
  export interface Amount {
    value: number;
    usd: number;
  }
  
  export interface Token {
    address: string | null;
    decimals: number;
    name: string;
    symbol: string;
  }
  
  export interface Notification {
    id: number;
    userId: string;
    chainId: number;
    txHash: string;
    address: Address;
    amount: Amount;
    token: Token;
    timestamp: string;
    inflictedLaws: InflictedLaw[];
  }
  