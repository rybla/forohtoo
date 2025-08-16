"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.page}>
            <Link href="/paid">/paid</Link>
            <Link href="/ssr-ex1">/ssr-ex1</Link>
        </div>
    );
}
