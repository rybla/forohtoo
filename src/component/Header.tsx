import { appName } from "@/constant";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header(props: { subtitle: string }) {
    return (
        <div className={styles.Header}>
            <div className={styles.title}>
                <Link href="/">{appName}</Link>
            </div>
            <div className={styles.separator}>{"|"}</div>
            <div className={styles.subtitle}>{props.subtitle}</div>
        </div>
    );
}
