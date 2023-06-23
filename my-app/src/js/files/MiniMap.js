import styles from '../../css/workAnnex.module.css'
import { Send } from '../Connect';

export default function File(props) {
    const { filePath, filename, icon, id, parentIndex, index } = props;

    const handleClick = (e) => {
        const parentNode = document.getElementById(props.id);
        if (parentNode.contains(e.target)) {
            console.log(id);
        }
    }

    //下载文件
    const downloadFile = () => {
        //获取文件块数量
        const msg = {
            api: 'reqfiletrunkcount',
            filepath: filePath
        }
        Send(msg, res => {
            if(res.status){
                //下载每一块文件
            }
        })
    }

    return (
        <div onClick={handleClick} id={id} className={`${styles.workAnnex}`}>
            <img src={icon} alt="" />
            <div className={`text-truncate`}>
                {filename}
            </div>
        </div>
    )
}