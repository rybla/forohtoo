"use server";

import Header from "@/component/Header";
import Profile from "@/component/Profile";
import styles from "./page.module.css";

// disabling @typescript-eslint/require-await since "use server" requires that this is an async function
// eslint-disable-next-line @typescript-eslint/require-await
export default async function Home() {
    return (
        <div className={styles.Page}>
            <Header subtitle="index"/>
            <Profile/>
        </div>
    );
}
