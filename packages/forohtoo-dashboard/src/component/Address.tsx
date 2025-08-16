import styles from "./Address.module.css"

export default function Address(props:{address:string}) {
    return (
        <div className={styles.Address}>
            {props.address}
        </div>
    )
}
