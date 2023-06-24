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
                    const chunks = res.trunk_counts;

                    let file = new Blob([], { type: 'application/octet-stream' });

                    const getChunk = async (index) => {
                        const msg = {
                            api: 'downfile',
                            filepath: filePath,
                            trunk_id: index
                        }
                        Send(msg, res => {
                            if (res.status) {
                                const base64String = res.data;
                                const binaryString = atob(base64String);
                                const buffer = new Uint8Array(binaryString.length);
                                for (let i = 0; i < binaryString.length; i++) {
                                    buffer[i] = binaryString.charCodeAt(i);
                                }
                                const chunk = new Blob([buffer], { type: 'application/octet-stream' });

                                file = new Blob([file, chunk], { type: 'application/octet-stream' });

                                console.log('获取成功id:' + index);
                                setProgressBar(index, chunks);

                                if (index === chunks - 1) {
                                    setProgressBar(1, 1);
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
                }
            });
        })
    };

    //设置进度条
    const setProgressBar = (i, all) => {
        const inside = document.getElementById('progressBar-in-' + parentIndex + '-' + index);
        const outside = document.getElementById('progressBar-out-' + parentIndex + '-' + index);
        if (i < all) {
            inside.style.width = `${i / all * outside.scrollWidth}px`;
            inside.style.display = 'block';
            outside.style.display = 'block';
        } else {
            window.setTimeout(() => {
                inside.style.display = 'none';
                outside.style.display = 'none';
            }, 1000);
        }
    }


    return (
        <div onClick={handleClick} id={id} className={`${styles.workAnnex}`}>
            <img src={icon} alt="" />
            <div className={`text-truncate`}>
                {filename}
            </div>
            <div id={'progressBar-out-' + parentIndex + '-' + index} className={`${styles.progressBar}`}>
                <div id={'progressBar-in-' + parentIndex + '-' + index} className={`${styles.progressBar} ${styles.progressBarIn}`}></div>
            </div>
        </div>
    )
}