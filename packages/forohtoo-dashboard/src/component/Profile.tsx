import { getProfile } from '@/actions';
import styles from './Profile.module.css';
import Link from 'next/link';
import Address from './Address';
import TransactionGraph from './TransactionGraph';
import RankedAddresses from './RankedAddresses';

export const dynamic = 'force-dynamic';

export default async function Profile() {
    const profile = await getProfile();

    return (
        <div className={styles.profile}>
            <TransactionGraph history={profile.history} />
            <RankedAddresses history={profile.history} />
            <h2>Transactions</h2>
            <table className={styles.transactionTable}>
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
                    {profile.history.map((historyItem, i) => (
                        <tr key={i}>
                            <td>{historyItem.model.status}</td>
                            <td>
                                <Link href={historyItem.model.transaction_link} target="_blank" rel="noopener noreferrer">
                                    View Transaction
                                </Link>
                            </td>
                            <td><Address address={historyItem.model.content.from} /></td>
                            <td>{new Date(historyItem.model.content.block_timestamp).toLocaleString()}</td>
                            <td>{historyItem.model.content.value}</td>
                            <td>
                                {historyItem.model.content.token_transfers.length > 0 ? (
                                    <ul className={styles.tokenTransferList}>
                                        {historyItem.model.content.token_transfers.map((tokenTransfer, j) => (
                                            <li key={j}>
                                                <p>Contract: <Address address={tokenTransfer.contract_address} /></p>
                                                <p>From: <Address address={tokenTransfer.from_address} /></p>
                                                <p>Type: {tokenTransfer.token_transfer_type}</p>
                                                <p>Value: {tokenTransfer.value}</p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    "No token transfers"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
