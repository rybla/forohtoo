import { appName } from "forohtoo-common";
import styles from "./Header.module.css";

export default function Header(props: {subtitle:string}) {
    return (
        <div className={styles.Header}>
            <div className={styles.title}>
                {appName}-dashboard
            </div>
            <div className={styles.separator}>{"|"}</div>
            <div className={styles.subtitle}>
                {props.subtitle}
            </div>
        </div>
    )

}
