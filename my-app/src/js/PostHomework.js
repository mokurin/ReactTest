import React, { useState } from 'react';

// css引用
import styles from '../css/PostHomework.module.css'

import { Upload } from 'antd';
import { Send } from './Connect'
import { useLocation } from 'react-router';
import { getTime, formatTimestamp } from './Util'


//发布作业组件
export default function PostHomework(props) {
    const { subData, fileListData, homeworkDetailsData, isEdit, handleInputChange, RefreshHomeworks } = props;
    const [fileList, setFileList] = useState([]);
    const [homeworkDetails, setHomeworkDetails] = useState((homeworkDetailsData === null || homeworkDetailsData === undefined) ?
        {
            homeworkName: '',
            homeworkIntroduce: '',
            deadline: NaN,
            maxGrade: '',
            fileNames: [],
            interaction: [0, 0, 0]
        } : homeworkDetailsData)

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

    //文件上传
    const handleUploadFiles = (filepath) => {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < fileList.length; i++) {
                // 把文件切成块
                const file = fileList[i].originFileObj;
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

    //上传作业信息
    function handleUploadHomeworkInfo() {
        if (isEdit) {//编辑作业
            const msg = {
                api: '',
                homeworkName: homeworkDetails.homeworkName,
                homeworkIntroduce: homeworkDetails.homeworkIntroduce,
                deadline: homeworkDetails.deadline,
                maxGrade: homeworkDetails.maxGrade
            }
            Send(msg, (msg) => {
                if (msg.status)
                    console.log('upload homeworkInfo finished');
            });
        } else {//创建作业
            homeworkDetails.fileNames = [];
            for (let i = 0; i < fileList.length; i++) {
                homeworkDetails.fileNames[i] = {
                    filename: fileList[i].originFileObj.name,
                    filesize: fileList[i].originFileObj.size
                };
            }
            const msg = {
                api: 'createhomework',
                homework: {
                    title: homeworkDetails.homeworkName,
                    desc: homeworkDetails.homeworkIntroduce,
                    deadline: homeworkDetails.deadline,
                    max_score: Number(homeworkDetails.maxGrade),
                    annex_files: homeworkDetails.fileNames
                },
                sub_id: subData.code
            }
            return new Promise((resolve, reject) => {
                Send(msg, res => {
                    resolve(res);
                })
            })
        }
    }

    function getFileList() {
        //请求文件列表（文件名、文件大小）

    }

    //提交作业
    function submitHomework() {
        (async () => {
            //提交作业信息
            const res = await handleUploadHomeworkInfo();
            if (res.status) {
                if (fileList.length !== 0)
                    await handleUploadFiles(res.filepaths);
            }

            //刷新作业
            RefreshHomeworks();
            //重置作业发布框
            reset();
        })();
    }

    //输入框变化
    const handleChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        setHomeworkDetails(prevState => {
            return {
                ...prevState,
                [id]: id === 'deadline' ? getTime(value) : value
            }
        })
        if (handleInputChange !== undefined && handleInputChange !== null) {
            handleInputChange(e);
        }
    }

    //重置内容
    function reset() {
        setHomeworkDetails({
            homeworkName: '',
            homeworkIntroduce: '',
            deadline: NaN,
            maxGrade: '',
            interaction: [0, 0, 0]
        });
        setFileList([]);
    }


    return (
        <div id='homeworkEditor' className={`${styles.postHomework} shadow`}>
            <div>
                <input value={isEdit ? homeworkDetailsData.homeworkName : homeworkDetails.homeworkName} onChange={handleChange}
                    id='homeworkName' type="text" className={`form-control`} placeholder='作业名称' />
            </div>
            <div className={`mt-2`}>
                <textarea value={isEdit ? homeworkDetailsData.homeworkIntroduce : homeworkDetails.homeworkIntroduce} onChange={handleChange}
                    id='homeworkIntroduce' className="form-control" placeholder='作业简介，作业格等要求'></textarea>
                <div className={`${styles.homeworkSettings} mt-3`}>
                    <div>
                        <label htmlFor="deadline">截止日期:</label>
                        <input value={formatTimestamp(isEdit ? homeworkDetailsData.deadline : homeworkDetails.deadline)} onChange={handleChange}
                            id='deadline' type="datetime-local" min={formatTimestamp(Date.now())} className='form-control' />
                    </div>
                    <div>
                        <label htmlFor="maxGrade">满分值: </label>
                        <input value={isEdit ? homeworkDetailsData.maxGrade : homeworkDetails.maxGrade} onChange={handleChange}
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
                {!isEdit &&
                    <div>
                        <button className={`btn btn-outline-primary m-2`} onClick={reset}>重置</button>
                        <button className={`btn btn-primary m-2`} onClick={submitHomework}>发布个人作业</button>
                    </div>}
            </div>
        </div>
    )
}


function createHomework(name, introduce, deadline, maxGrade, interaction) {
    return {
        homeworkName: name,
        homeworkIntroduce: introduce,
        deadline: deadline,
        maxGrade: maxGrade,
        interaction: interaction
    }
}