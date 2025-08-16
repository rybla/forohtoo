"use client";

import { HistoryItem } from "@/actions";
import Address from "./Address";
import styles from "./FromAddressRanking.module.css";

type Props = {
    history: HistoryItem[];
};

export default function FromAddressRanking({ history }: Props) {
    const fromAddressData = history.reduce((acc, item) => {
        const from = item.model.content.from;
        const value = parseFloat(item.model.content.value);

        if (!acc[from]) {
            acc[from] = { address: from, totalValue: 0 };
        }
        acc[from].totalValue += value;

        return acc;
    }, {} as Record<string, { address: string; totalValue: number }>);

    const rankedAddresses = Object.values(fromAddressData).sort(
        (a, b) => b.totalValue - a.totalValue
    );

    return (
        <div className={styles.from_address_ranking}>
            <h2>From Address Ranking</h2>
            <table>
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Total Value</th>
                    </tr>
                </thead>
                <tbody>
                    {rankedAddresses.map((data, i) => (
                        <tr key={i}>
                            <td>
                                <Address address={data.address} />
                            </td>
                            <td>{data.totalValue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
