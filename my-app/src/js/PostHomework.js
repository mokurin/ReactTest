import React, { useState } from 'react';

// css引用
import styles from '../css/PostHomework.module.css'

import { Upload } from 'antd';
import { Send } from './Connect'
import { useLocation } from 'react-router';
import { getTime } from './Util'


//发布作业组件
export default function PostHomework(props) {
    const { fileListData, homeworkDetailsData } = props;
    const [fileList, setFileList] = useState((fileListData === null || fileListData === undefined) ? [] : fileListData.fileList);
    const [homeworkDetails, setHomeworkDetails] = useState((homeworkDetailsData === null || homeworkDetailsData === undefined) ?
        {
            homeworkName: '',
            homeworkIntroduce: '',
            deadline: '',
            maxGrade: ''
        } : homeworkDetailsData)
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
                api: 'request_upload_file',
                filename: file.name,
                filesize: file.size,
            }
            //发送请求上传
            Send(msg, msg => {
                if (msg.status) {
                    const msg = {
                        api: '',
                        fileType: file.type,
                        chunkIndex: currentChunk,
                        chunkCount: chunks,
                        chunk: chunk
                    }
                    //发送文件
                    Send(msg, (msg) => {
                        if (msg.status)
                            if (currentChunk < chunks - 1) {
                                currentChunk++;
                                sendChunk();
                            } else {
                                console.log('upload file finished');
                            }
                    });
                }
            })

        };

        sendChunk();
    };

    //上传作业信息
    function handleUploadHomeworkInfo() {
        const msg = {
            api: '',
            userEmail: email,
            homeworkName: homeworkDetails.homeworkName,
            homeworkIntroduce: homeworkDetails.homeworkIntroduce,
            deadline: homeworkDetails.deadline,
            maxGrade: homeworkDetails.maxGrade
        }
        Send(msg, (msg) => {
            if (msg.status)
                console.log('upload homeworkInfo finished');
        });
    }

    //提交作业
    function submitHomework() {
        //提交作业代码
        new Promise((resolve, reject) => {
            //上传作业信息
            handleUploadHomeworkInfo();
            //上传作业文件
            handleUploadFiles();
            resolve();
        }).then(() => {
            //重置作业发布框
            reset();
        })
    }

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


    return (
        <div id='homeworkEditor' className={`${styles.postHomework} shadow`}>
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
                            id='deadline' type="datetime-local" min={getTime(new Date())} className='form-control' />
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
                        <button className={`btn btn-primary m-2`}>导入作业</button>
                    </Upload>
                </div>
                <div>
                    <button className={`btn btn-outline-primary m-2`} onClick={reset}>重置</button>
                    <button className={`btn btn-primary m-2`} onClick={submitHomework}>发布个人作业</button>
                </div>
            </div>
        </div>
    )
}

