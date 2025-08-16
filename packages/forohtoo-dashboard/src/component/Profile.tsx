"use server"

import { getProfile } from '@/actions';
import styles from './Profile.module.css';
import Link from 'next/link';
import Address from './Address';

export default async function Profile(props: {}) {
    const profile = await getProfile({})

    return (
        <div className={styles.profile}>
            <div className={styles.history}>
                {profile.history.map((historyItem,i) =>
                    <div className={styles.history_item} key={i}>
                        <div className={styles.transaction_link}>
                            <Link href={historyItem.model.transaction_link}>transaction_link</Link>
                        </div>
                        <div className={styles.content_value}>
                            value: {historyItem.model.content.value}
                        </div>
                        <div className={styles.token_transfers}>
                            {historyItem.model.content.token_transfers.map((tokenTransfer, i) =>
                                <div className={styles.token_transfer} key={i}>
                                    <div className={styles.token_transfer_contract}>
                                        contract: <Address address={tokenTransfer.contract_address} />
                                    </div>
                                    <div className={styles.token_transfer_value}>
                                        value: {tokenTransfer.value}
                                    </div>
                                    <div className={styles.token_transfer_from}>
                                        from: {tokenTransfer.from_address}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
