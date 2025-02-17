export interface IStatus {
    status: "clean" | "dirty";
    tags: string[];
    lastTxs: ITransaction[];
    lastDapps: IDapp[];
  }
  
  export interface ITransaction {
    priority_fee: number | null;
    tx_burnt_fee: number | null;
    raw_input: string;
    result: string;
    hash: string;
    max_fee_per_gas: number | null;
    revert_reason: string | null;
    confirmation_duration: [number, number];
    transaction_burnt_fee: number | null;
    type: number;
    token_transfers_overflow: null;
    confirmations: number;
    position: number;
    max_priority_fee_per_gas: number | null;
    transaction_tag: null;
    created_contract: null;
    value: string;
    from: IAddress;
    to: IAddress;
    gas_used: string;
    status: string;
    authorization_list: string[];
    method: string;
    fee: IFee;
    actions: string[];
    gas_limit: string;
    gas_price: string;
    decoded_input: IDecodedInput;
  }
  
  export interface IAddress {
    ens_domain_name: string | null;
    hash: string;
    implementations: string[];
    is_contract: boolean;
    is_scam: boolean;
    is_verified: boolean;
    metadata: string | null;
    name: string | null;
    private_tags: string[];
    proxy_type: string | null;
    public_tags: string[];
    watchlist_names: string[];
  }
  
  export interface IFee {
    type: string;
    value: string;
  }
  
  export interface IDecodedInput {
    method_call: string;
    method_id: string;
    parameters: ITransactionParameter[];
  }
  
  export interface ITransactionParameter {
    name: string;
    type: string;
    value: string;
  }
  
  export interface IDapp {
    name?: string;
    hash: string;
  }
  