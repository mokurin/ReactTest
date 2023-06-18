import React, { useState } from 'react';

// css引用
import styles from '../css/PostHomework.module.css'

import { Upload, message, Button } from 'antd';
import { Send } from './Connect'
import { useLocation } from 'react-router';


//发布作业组件
export default function PostHomework(props) {
    const [fileList, setFileList] = useState([]);
    const [homeworkDetails, setHomeworkDetails] = useState({
        homeworkName: '',
        homeworkIntroduce: '',
        deadline: '',
        maxGrade: ''
    })
    const location = useLocation();
    const s = location.state;
    const email = (s !== null && s !== undefined) ? s.email : '';

    //更改上传的文件列表
    const handleFilesChange = ({ fileList }) => {
        console.log(fileList);
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

    //文件上传
    const handleUploadFiles = () => {
        // 把文件切成块
        const file = fileList[0].originFileObj;
        const chunkSize = 1024 * 1024; // 1MB
        const chunks = Math.ceil(file.size / chunkSize);
        let currentChunk = 0;

        // 把每一块发给服务端
        const sendChunk = () => {
            const start = currentChunk * chunkSize;
            const end = Math.min((currentChunk + 1) * chunkSize, file.size);
            const chunk = file.slice(start, end);
            const msg = {
                api: '',
                userEmail: email,
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
                chunkIndex: currentChunk,
                chunkCount: chunks,
                chunk: chunk
            }
            Send(msg, (msg) => {
                if (msg.status)
                    if (currentChunk < chunks - 1) {
                        currentChunk++;
                        sendChunk();
                    } else {
                        console.log('upload finished');
                    }
            });
        };

        sendChunk();
    };

    //输入框变化
    const handleChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        setHomeworkDetails(prevState => {
            return {
                ...prevState,
                [id]: value
            }
        })
    }

    //重置内容
    function reset() {
        setHomeworkDetails({
            homeworkName: '',
            homeworkIntroduce: '',
            deadline: '',
            maxGrade: ''
        })
        setFileList([]);
    }

    //提交作业
    function submitHomework() {
        //提交作业代码
        new Promise((resolve, reject) => {
            //上传作业信息

            //上传作业文件
            handleUploadFiles();
            resolve();
        }).then(() => {
            //重置作业发布框
            reset();
        })
    }

    return (
        <div id='homeworkEditor' className={`${styles.postHomework} shadow-sm`}>
            <div>
                <input value={homeworkDetails.homeworkName} onChange={handleChange}
                    id='homeworkName' type="text" className={`form-control`} placeholder='作业名称' />
            </div>
            <div className={`mt-2`}>
                <textarea value={homeworkDetails.homeworkIntroduce} onChange={handleChange}
                    id='homeworkIntroduce' className="form-control" placeholder='作业简介，作业格等要求'></textarea>
                <div className={`${styles.homeworkSettings} mt-3`}>
                    <div>
                        <label htmlFor="deadline">截止日期:</label>
                        <input value={homeworkDetails.deadline} onChange={handleChange}
                            id='deadline' type="datetime-local" min={getNow()} className='form-control' />
                    </div>
                    <div>
                        <label htmlFor="maxGrade">满分值: </label>
                        <input value={homeworkDetails.maxGrade} onChange={handleChange}
                            id="maxGrade" type="number" className='form-control' />
                    </div>
                </div>
            </div>
            <div className={`${styles.postHomeworkButtons}`}>
                <div>
                    <Upload {...settings}>
                        <button className={`btn btn-primary`}>导入作业</button>
                    </Upload>
                </div>
                <div>
                    <button className={`btn btn-outline-primary`} onClick={reset}>重置</button>
                    <button className={`btn btn-primary`} onClick={submitHomework}>发布个人作业</button>
                </div>
            </div>
        </div>
    )
}

//获取当前时间
function getNow() {
    const date = new Date();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + (date.getDate())).slice(-2);
    const year = date.getFullYear();
    const hour = ("0" + (date.getHours())).slice(-2);
    const min = ("0" + (date.getMinutes())).slice(-2);
    return year + "-" + month + "-" + day + " " + hour + ":" + min;
}