import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

// 上传文件
import { Upload } from 'antd';

// 组件引用
import { SubjectCheckNav } from "./IndividualSubjectCheck"
import bootstrap from 'bootstrap/dist/js/bootstrap'

// css引用
import styles from '../css/SubmitHomework.module.css'

//服务端连接
import { Send } from './Connect'

//图片引用
import icon_upload from '../img/plus-circle-fill.svg'


//上传文件 作业
export const UploadFiles = (props) => {
    const { fileList, setFileList } = props;

    //更改上传的文件列表
    const handleFilesChange = ({ fileList }) => {
        setFileList(fileList);
    };

    //文件上传设置
    let settings = {
        multiple: true,
        action: null,
        onChange: handleFilesChange,
        beforeUpload: () => false,
        fileList: fileList
    };

    return (<>
        <div className={`${styles.UploadFilesArea} shadow`}>
            <Upload {...settings}>
                <div className={`${styles.UploadFiles}`}>
                    <div className={`fs-1`}>
                        <img src={icon_upload} alt="" />
                        添加作业文件
                    </div>
                    <div className={`fs-5`}>
                        支持各类文件格式
                    </div>
                </div>
            </Upload>
        </div>
    </>);
}

// 整个提交作业区域
const SubmitHomeworkMain = (props) => {
    const [msg, setMsg] = useState('');
    const [fileList, setFileList] = useState([]);
    const [message, setMessage] = useState('');
    const location = useLocation();
    const s = location.state;
    const homeworkData = (s !== null && s !== undefined) ? s.homeworkData : '';


    //文件上传
    const handleUploadFiles = (filepath) => {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < fileList.length; i++) {
                // 把文件切成块
                const file = fileList[i].originFileObj;
                if (file === undefined) {
                    if (i !== fileList.length - 1)
                        continue;
                    else resolve();
                }
                const chunkSize = 1024 * 1024; // 1MB
                const chunks = Math.ceil(file.size / chunkSize);
                console.log('总块数：' + chunks);

                // 把每一块发给服务端
                const sendChunk = async (index) => {
                    const start = index * chunkSize;
                    console.log('start:' + start);
                    const end = Math.min((index + 1) * chunkSize, file.size);
                    console.log('end:' + end);
                    const chunk = file.slice(start, end);
                    const buffer = await chunk.arrayBuffer();
                    const binaryString = new Uint8Array(buffer).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
                    const base64String = btoa(binaryString);

                    //上传
                    const msg = {
                        api: 'upfile',
                        trunk: {
                            id: index,
                            data: base64String
                        },
                        filepath: filepath[i]
                    }
                    //发送文件
                    Send(msg, (msg) => {
                        if (msg.status)
                            console.log('发送成功id:' + index);
                        else
                            console.log('发送失败id:' + index);
                        //发送失败就重新发送
                        // sendChunk(index);
                    });

                    if (index === chunks - 1) {
                        //结束文件上传
                        const msg = {
                            api: 'finishupfile',
                            filepath: filepath[i]
                        }
                        Send(msg, res => {
                            if (res.status) {
                                console.log('成功结束文件上传');
                                resolve();
                            }
                        })
                    }
                };

                //循环发送每一块文件
                for (let i = 0; i < chunks; i++)
                    sendChunk(i);
            }
        })
    };

    // 请求提交作业
    function submitAll() {
        return new Promise((resolve, reject) => {
            //获取文件列表
            let fileNames = [];
            for (let i = 0; i < fileList.length; i++) {
                fileNames.push({
                    filename: fileList[i].originFileObj.name,
                    filesize: fileList[i].originFileObj.size
                });
            }
            const msg = {
                api: 'subwork',
                homework: {
                    work_id: homeworkData.data.id,
                    comments: message,
                    annex_files: fileNames
                }
            }
            Send(msg, (msg) => {
                if (msg.status) {
                    (async () => {
                        await handleUploadFiles(msg.filepaths);
                        resolve(true);
                    })();
                    console.log('submit finished');
                } else {
                    new Promise((resolve, reject) => {
                        setMsg(msg.errcode);
                        resolve();
                    }).then(() => {
                        const modal = new bootstrap.Modal('#exampleModal');
                        modal.show();
                        resolve(false);
                    })
                }
            });
        })
    }

    // 提交作业
    function submitHomework() {
        (async () => {
            const flag = await submitAll();

            if (flag) {
                //清空文件列表和留言
                setFileList([]);
                setMessage("");
            }
        })();
    }

    // 提交作业 间隔
    let count = 5;
    let stopCount;
    function setTime(btn) {
        if (count !== 0) {
            btn.setAttribute("disabled", true);
            btn.innerHTML = "已提交 " + count;
            count -= 1;
            stopCount = setTimeout(() => {
                setTime(btn)
            }, 1000);
        }
        else {
            btn.removeAttribute("disabled")
            btn.innerHTML = "提交作业"
            count = 5;
            clearTimeout(stopCount)
        }
    }

    //输入框变化
    const handleChange = (e) => {
        const value = e.target.value;
        setMessage(value)
    }

    return (<>
        <div className={`${styles.SubmitHomeworkMain} shadow`}>
            <div className={`${styles.SubmitHomeworkMainTitle}`}>
                <div className={`${styles.homeworkName} fs-2`}>
                    作业名{props.homeworkName}
                </div>
                <div className={`${styles.homeworkOtherInfo}`}>
                    <div className='shadow rounded'>
                        截止日期{props.homeworkDeadline}
                    </div>
                    <div className='shadow rounded'>
                        个人作业
                    </div>
                </div>
            </div>
            <div className={`${styles.SubmitHomeworkArea}`}>
                <UploadFiles fileList={fileList} setFileList={setFileList} />
                <div className={`${styles.otherActions}`}>
                    <div className={``}>
                        <label htmlFor="inputPassword" className=" col-form-label">作业留言：</label>
                        <input value={message} onChange={handleChange}
                            type="text" className="form-control" id="inputPassword" placeholder='点击添加留言' />
                    </div>
                    <div>
                        <button className={`btn btn-primary btn-sm`} id='liveToastBtn' type='button'
                            onClick={(e) => {
                                const toastLiveExample = document.getElementById('liveToast')
                                const toast = new bootstrap.Toast(toastLiveExample, { delay: 1000 })
                                // 上传文件为空
                                if (fileList.length === 0) {
                                    toast.show()
                                    return;
                                }
                                setTime(e.target);
                                submitHomework();
                            }}
                        >提交作业</button>
                        <div className={`toast-container ${styles.myToast}`}>
                            <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div className="toast-body">
                                    请上传文件！
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
        <Modal title={'提交失败'} msg={msg} />
    </>)
}

export default function SubmitHomework(props) {
    const location = useLocation();
    const state = (location.state == null || location.state === undefined) ? "" : location.state;;
    const subData = (state == null || state === undefined) ? null : state.subData;//课程数据
    const homeworkData = (state == null || state === undefined) ? null : state.homeworkData;//作业数据
    const user_Account = JSON.parse(localStorage.getItem('user_Account'));//用户数据

    return (<>
        <SubjectCheckNav action="提交作业" subData={subData} homeworkData={homeworkData} />
        <SubmitHomeworkMain />
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