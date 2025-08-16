import styles from "./Address.module.css"

export default function Address(props:{address:string}) {
    return (
        <span className={styles.Address}>
            {props.address}
        </span>
    )
}
