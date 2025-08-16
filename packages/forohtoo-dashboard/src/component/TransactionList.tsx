"use client";

import { HistoryItem } from "@/actions";
import Link from "next/link";
import Address from "./Address";
import styles from "./TransactionList.module.css";

type Props = {
    history: HistoryItem[];
};

export default function TransactionList({ history }: Props) {
    return (
        <div className={styles.transaction_list}>
            <h2>Transactions</h2>
            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Link</th>
                        <th>From</th>
                        <th>Time</th>
                        <th>Value</th>
                        <th>Token Transfers</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((historyItem, i) => (
                        <tr key={i}>
                            <td>{historyItem.model.status}</td>
                            <td>
                                <Link href={historyItem.model.transaction_link}>
                                    link
                                </Link>
                            </td>
                            <td>
                                <Address address={historyItem.model.content.from} />
                            </td>
                            <td>
                                {new Date(
                                    historyItem.model.content.block_timestamp
                                ).toLocaleString()}
                            </td>
                            <td>{historyItem.model.content.value}</td>
                            <td>
                                <ul>
                                    {historyItem.model.content.token_transfers.map(
                                        (tokenTransfer, j) => (
                                            <li key={j}>
                                                <p>
                                                    Contract:{" "}
                                                    <Address
                                                        address={
                                                            tokenTransfer.contract_address
                                                        }
                                                    />
                                                </p>
                                                <p>
                                                    From:{" "}
                                                    <Address
                                                        address={
                                                            tokenTransfer.from_address
                                                        }
                                                    />
                                                </p>
                                                <p>
                                                    Type: {tokenTransfer.token_transfer_type}
                                                </p>
                                                <p>Value: {tokenTransfer.value}</p>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
