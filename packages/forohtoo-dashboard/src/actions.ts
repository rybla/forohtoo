"use server";

import { Address, Coinbase } from "@coinbase/coinbase-sdk";
import { network } from "forohtoo-common";
import env from "./env";

Coinbase.configure({
    apiKeyName: env.COINBASE_DEVELOPER_PLATFORM_API_KEY,
    privateKey: env.COINBASE_DEVELOPER_PLATFORM_SECRET,
});

export type Profile = {
    history: HistoryItem[]
}

export type HistoryItem = {
  model: HistoryModel;
};

export type HistoryModel = {
  block_hash: string;
  block_height: string;
  content: {
    block_timestamp: string;
    flattened_traces: unknown;
    from: string;
    gas: number;
    gas_price: number;
    hash: string;
    index: number;
    input: string;
    max_fee_per_gas: number;
    max_priority_fee_per_gas: number;
    mint: string;
    nonce: number;
    priority_fee_per_gas: number;
    to: string;
    token_transfers: TokenTransfer[];
    transaction_access_list: unknown;
    type: number;
    value: string;
  };
  from_address_id: string;
  network_id: string;
  status: string;
  to_address_id: string;
  transaction_hash: string;
  transaction_link: string;
  unsigned_payload: string;
};


export type TokenTransfer = {
  contract_address: string;
  from_address: string;
  log_index: number;
  to_address: string;
  token_transfer_type: string;
  value: string;
};

export async function getProfile(): Promise<Profile> {
    const address = new Address(network, env.RECEIVER_ADDRESS);
    const transactions = (await address.listTransactions({ limit: 10 })).data;
    return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        history: JSON.parse(JSON.stringify(transactions))
    }
}
