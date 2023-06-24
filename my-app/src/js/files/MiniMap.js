import styles from '../../css/workAnnex.module.css'
import { Send } from '../Connect';
import { saveAs } from 'file-saver';

export default function File(props) {
    const { filePath, filename, icon, id, parentIndex, index } = props;

    const handleClick = (e) => {
        (async () => {
            const parentNode = document.getElementById(props.id);
            if (parentNode.contains(e.target)) {
                const file = await handleDownloadFiles();
                saveAs(file, filename);
            }
        })();
    }

    //下载文件
    // const downloadFile = () => {

    // }

    //文件下载
    const handleDownloadFiles = () => {
        return new Promise((resolve, reject) => {
            //请求文件信息
            const msg = {
                api: 'reqfiletrunkcount',
                filepath: filePath
            }
            Send(msg, res => {
                if (res.status) {
                    //获取文件块数
                    const chunks = res.trunk_counts;
                    console.log('总块数：' + chunks);

                    //创建一个空的文件对象
                    let file = new Blob([], { type: 'application/octet-stream' });

                    //获取每一块文件并拼接
                    const getChunk = async (index) => {
                        //请求文件块
                        const msg = {
                            api: 'downfile',
                            filepath: filePath,
                            trunk_id: index
                        }
                        Send(msg, res => {
                            if (res.status) {
                                //获取文件块数据
                                const base64String = res.data;
                                const binaryString = atob(base64String);
                                const buffer = new Uint8Array(binaryString.length);
                                for (let i = 0; i < binaryString.length; i++) {
                                    buffer[i] = binaryString.charCodeAt(i);
                                }
                                const chunk = new Blob([buffer], { type: 'application/octet-stream' });

                                //拼接文件对象
                                file = new Blob([file, chunk], { type: 'application/octet-stream' });

                                console.log('获取成功id:' + index);

                                if (index === chunks - 1) {
                                    const msg = {
                                        api: 'finishdownfile',
                                        filepath: filePath
                                    }
                                    //结束文件下载
                                    console.log('成功结束文件下载');
                                    resolve(file);
                                }
                            } else {
                                console.log('获取失败id:' + index);
                                //获取失败就重新获取
                                // getChunk(index);
                            }
                        });
                    };

                    (async () => {
                        //循环获取每一块文件
                        for (let i = 0; i < chunks; i++)
                            await getChunk(i);

                    })();

                } else {
                    console.log('请求文件信息失败');
                    reject();
                }
            });
        })
    };

    const setProgressBar = (i, all) => {
        if (i < all) {
            
        }
    }


    return (
        <div onClick={handleClick} id={id} className={`${styles.workAnnex}`}>
            <img src={icon} alt="" />
            <div className={`text-truncate`}>
                {filename}
            </div>
            <div id={'progressBar-out-' + parentIndex + '-' + index} className={`${styles.progressBar}`}>
                <div id={'progressBar-in-' + parentIndex + '-' + index} className={`${styles.progressBar}`}></div>
            </div>
        </div>
    )
}