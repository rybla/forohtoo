"use client";

import { HistoryItem } from '@/actions';
import Address from './Address';
import styles from './RankedAddresses.module.css';

interface RankedAddressesProps {
    history: HistoryItem[];
}

export default function RankedAddresses({ history }: RankedAddressesProps) {
    const getRankedAddresses = () => {
        const addressTotals: { [address: string]: number } = {};

        history.forEach(item => {
            const from = item.model.content.from;
            const value = parseFloat(item.model.content.value);
            if (!isNaN(value)) {
                addressTotals[from] = (addressTotals[from] || 0) + value;
            }
        });

        return Object.entries(addressTotals)
            .sort(([, totalA], [, totalB]) => totalB - totalA)
            .map(([address, total]) => ({ address, total }));
    };

    const rankedAddresses = getRankedAddresses();

    return (
        <div className={styles.container}>
            <h2>Top Senders</h2>
            <table className={styles.rankedTable}>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Address</th>
                        <th>Total Value</th>
                    </tr>
                </thead>
                <tbody>
                    {rankedAddresses.map((item, index) => (
                        <tr key={item.address}>
                            <td>{index + 1}</td>
                            <td><Address address={item.address} /></td>
                            <td>{item.total.toFixed(18)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
