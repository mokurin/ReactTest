import React, { useState } from 'react';

// 上传文件
import { Upload } from 'antd';

// 组件引用
import { SubjectCheckNav } from "./IndividualSubjectCheck"

// css引用
import styles from '../css/SubmitHomework.module.css'

//服务端连接
import {Send} from './Connect'


//上传文件 作业
export const UploadFiles = (props) => {
    const [fileList, setFileList] = useState([]);

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
                // userEmail: props.email,
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

    return (<>
        <div className={`${styles.UploadFiles} shadow`}>
            <Upload {...settings}>
                <button className={`btn btn-primary`}>导入作业</button>
            </Upload>
        </div>
    </>);
}

// 整个提交作业区域
const SubmitHomeworkMain = (props) => {
    return (<>
        <div className={`${styles.SubmitHomeworkMain} shadow`}>
            <div className={`${styles.SubmitHomeworkMainTitle}`}>
                <div className={`${styles.homeworkName} fs-2`}>
                    作业名{props.homeworkName}
                </div>
                <div className={`${styles.homeworkOtherInfo}`}>
                    <div>
                        截止日期{props.homeworkDeadline}
                    </div>
                    <div>
                        个人作业
                    </div>
                </div>
            </div>
            <div className={`${styles.SubmitHomeworkArea}`}>
                <UploadFiles />
                <div className={`${styles.otherActions}`}>
                    <div className={``}>
                        <label htmlFor="inputPassword" className=" col-form-label">作业留言：</label>
                        <input type="text" className="form-control" id="inputPassword" placeholder='点击添加留言' />
                    </div>
                    <button className={`btn btn-primary btn-sm`}
                        onClick={() => {
                        }}
                    >提交作业</button>
                </div>
            </div>
            {/* <SearchData /> */}
        </div>
    </>)
}


export default function SubmitHomework(props) {

    return (<>
        <SubjectCheckNav action="提交作业" />
        <SubmitHomeworkMain />
    </>)
}