"use server";

import { getProfile } from "@/actions";
import styles from "./Profile.module.css";
import TransactionList from "./TransactionList";
import TransactionSummary from "./TransactionSummary";
import FromAddressRanking from "./FromAddressRanking";

export default async function Profile() {
    const profile = await getProfile();

    return (
        <div className={styles.profile}>
            <TransactionSummary history={profile.history} />
            <FromAddressRanking history={profile.history} />
            <TransactionList history={profile.history} />
        </div>
    );
}
