import React, { useEffect, useState } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import styles from '../css/HomeworkPreview.module.css'
import { useLocation, useNavigate } from 'react-router';
import { Send } from './Connect'
import icon_back from '../img/arrow-left.svg'

const WorkPreviewNav = (props) => {
    const [value, setValue] = useState(props.info.grade);

    const navigate = useNavigate();

    // 发送该的作业分数
    function sendScore() {
        const msg = {
            api: '',
            homeworkId: "",                     //作业ID
            email: "",                          //学生ID
            isgraded: "true",                   //已批阅
            score: ""                           //分数
        }
        Send(msg, (msg) => {
            if (msg.status)
                console.log('成功批阅该作业');

            // 数据接收部分

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
        <div className={`${styles.workPreviewNav}`}>
            <div>打分</div>
            <input type="number" className="form-control" id="staticEmail" placeholder="请输入分数"
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
    </>)
}

function App() {
    const docs = [
        // { uri: ["url1 ","url2 ",] },                               //服务器文件?
        { uri: require("../file/sqlDetail.pdf") }    // 本地文件
    ];

    return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
}

export default function HomeworkPreview() {
    const location = useLocation();
    const state = (location.state == null || location.state == undefined) ? "" : location.state

    let info = {
        maxGrade: state.maxGrade,
        filePathL: state.filePath
    }

    return (<>
        <div className={`${styles.HomeworkPreview}`}>
            <WorkPreviewNav info={state} />
            <App filePath={state.filePath} />
        </div>
    </>)
}