import styles from '../../css/workAnnex.module.css'

export default function File(props) {
    return (
        <div className={`${styles.workAnnex}`}>
            <img src={props.icon} alt="" />
            <div className={`text-truncate`}>
                {props.filename}alidhaldhaldhaldhaldksahajkdhahdladhl
            </div>
        </div>
    )
}