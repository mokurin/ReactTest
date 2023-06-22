export default function File(props) {
    return (
        <div>
            <img src={props.icon} alt="" />
            <div>
                {props.filename}
            </div>
        </div>
    )
}