"use server"

import Header from "@/component/Header";
import Profile from "@/component/Profile";
import styles from "./page.module.css";

export default async function Home() {
    return (
        <div className={styles.Page}>
            <Header subtitle="index"/>
            <Profile/>
        </div>
    );
}
