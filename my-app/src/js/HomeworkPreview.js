import React, { useEffect, useState } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import styles from '../css/HomeworkPreview.module.css'
import { useLocation, useNavigate } from 'react-router';
import { Send } from './Connect'
import icon_back from '../img/arrow-left.svg'
import bootstrap from 'bootstrap/dist/js/bootstrap';

const WorkPreviewNav = (props) => {
    const [value, setValue] = useState(props.info.annexFile.score);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    //页面刷新，重新加载
    useEffect(() => {

    }, [])

    // 发送该的作业分数
    function sendScore() {
        const msg = {
            api: 'gradework',
            user_email: props.info.email,                                           //学生ID
            work_id: props.info.workid,                                             //作业ID
            grade: Number(document.getElementById("score").value)                   //分数
        }
        Send(msg, (msg) => {
            if (msg.status)
                setMsg('评分完成！');
            else {
                setMsg(msg.errcode)
            }
            const modal = new bootstrap.Modal('#exampleModal');
            modal.show();
        });
    }

    return (<>
        <div className={`${styles.returnLastPage} box-shadow-inset`}
            onClick={
                (e) => {
                    navigate(-1)
                }}
        >
            <img src={icon_back} alt="" />
            <div>返回</div>
        </div>
        <div className={`${styles.stuComments} shadow rounded`}>
            <div className={`dropdown-toggle fs-5 shadow-lg `} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                学生留言信息
            </div>
            <div className="collapse shadow-lg" id="collapseExample">
                <div className="card card-body">
                    {props.comments}
                </div>
            </div>
        </div>
        <div className={`${styles.workPreviewNav}`}>
            <div><button className='btn btn-outline-primary btn-sm'
                onClick={() => {
                    console.log(props.info.email);
                    console.log(document.getElementById("score").value);
                    sendScore()
                }}
            >确认打分</button></div>
            <input type="number" className="form-control" id="score" placeholder="请输入分数"
                min={0}
                max={100}
                value={value}
                onChange={(e) => {
                    if (e.target.value < 0 || e.target.value > 100) {
                        e.target.value = ''
                    }
                    setValue(e.target.value)
                }}
            />
            <div className={`ms-2`}>
                满分: {props.info.maxGrade}
            </div>
        </div>
        <Modal title='提示' msg={msg} />
    </>)
}

function FileView(props) {
    const [docs, setDocs] = useState([
        // { uri: URL.createObjectURL(new Blob(["Hello world"], { type: "text/plain" })) },   //服务器文件
        // { uri: require("../file/sqlDetail.pdf") }                     // 本地文件
    ]);
    const { filePaths } = props;
    const MIME = {
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        pdf: 'application/pdf',
        png: 'image/png',
        gif: 'image/gif',
        jpeg: 'image/jpeg',
        jpg: 'image/jpeg',
        txt: 'text/plain',
    }

    useEffect(() => {
        for (let i = 0; i < filePaths.length; i++) {
            (async () => {
                const fileName = filePaths[i].split('~')[1];
                const fileType = fileName.split('.')[fileName.split('.').length - 1];
                const type = (fileType in MIME) ? MIME[fileType] : 'application/octet-stream';
                const file = await handleDownloadFiles(filePaths[i], type);
                // docs.push({
                //     uri: URL.createObjectURL(file),
                //     fileName: fileName
                // })
                setDocs(prevState => ([
                    ...prevState,
                    {
                        uri: URL.createObjectURL(file),
                        fileName: fileName
                    }
                ]))
                // docs.push(file);
                // setSelectedDocs(docs);
                console.log(docs);
            })();
        }
    }, [])

    const handleDownloadFiles = (filePath, type) => {
        return new Promise((resolve, reject) => {
            //请求文件信息
            const msg = {
                api: 'reqfiletrunkcount',
                filepath: filePath
            }
            Send(msg, res => {
                if (res.status) {
                    const chunks = res.trunk_counts;

                    let file = new Blob([], { type: type });

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
                                const chunk = new Blob([buffer], { type: type });

                                file = new Blob([file, chunk], { type: type });

                                console.log('获取成功id:' + index);

                                if (index === chunks - 1) {
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

    return (
        <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
    );
}

const ShowFiles = (props) => {
    const annexFile = props.annexFile

    const getPathsItems = () => {
        let items = annexFile.filepaths.map(
            (filePath, index) => {
                const filename = filePath.split('~')[1];
                return filename + '; ';
            }
        )
        return items;
    }

    return (<>
        <div className={`${styles.filePath} rounded shadow`}>
            {getPathsItems()}
        </div>
    </>)
}


export default function HomeworkPreview() {
    const location = useLocation();
    //静态数据
    let staticData = {
        maxGrade: "100",
        annexFile: {
            filepaths: ['AAA', 'BBB', 'CCC'],
            comments: "作业留言：ABCDEFG",
            graded: false,
            score: "80"
        },
        email: "xxx@qq.com",
        workid: "1"
    }

    const state = (location.state == null || location.state == undefined) ? staticData : location.state
    console.log(state);
    const [status, setStatus] = useState(false)

    return (<>
        <div className={`${styles.HomeworkPreview}`}>
            <WorkPreviewNav info={state} comments={state.annexFile.comments} />
            <FileView filePaths={state.annexFile.filepaths} />
            <ShowFiles annexFile={state.annexFile} />
        </div>
    </>)
}

//弹窗模态
function Modal(props) {
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{props.title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props.msg}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    );
}