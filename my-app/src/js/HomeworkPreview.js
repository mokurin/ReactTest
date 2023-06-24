import React, { useEffect, useState } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import styles from '../css/HomeworkPreview.module.css'
import { useLocation, useNavigate } from 'react-router';
import { Send } from './Connect'
import icon_back from '../img/arrow-left.svg'

const WorkPreviewNav = (props) => {
    const [value, setValue] = useState(props.info.annexFile.score);
    const navigate = useNavigate();
    console.log(props);
    //页面刷新，重新加载
    useEffect(() => {

    }, [])

    // 发送该的作业分数
    function sendScore() {
        const msg = {
            api: 'gradework',
            user_email: props.info.email,                                           //学生ID
            work_id: props.info.workid,                                                            //作业ID
            grade: document.getElementById("score").value                               //分数
        }
        Send(msg, (msg) => {
            if (msg.status)
                console.log('success');
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
    </>)
}

function FileView() {
    const docs = [
        // { uri: ["url1 ","url2 ",] },                               //服务器文件?
        { uri: require("../file/sqlDetail.pdf") }                     // 本地文件
    ];

    return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
}

const ShowFiles = (props) => {
    const annexFile = props.annexFile

    return (<>
        <div className={`fs-1 ${styles.filePath} rounded shadow`}>
            {annexFile.annexfilepaths}
        </div>
    </>)
}


export default function HomeworkPreview() {
    const location = useLocation();
    //静态数据
    let staticData = {
        maxGrade: "100",
        annexFile: {
            annexfilepaths: "[AAA,BBB,CCC]",
            comments: "作业留言：ABCDEFG",
            graded: false,
            score: "80"
        },
        email: "xxx@qq.com",
        workid:"1"
    }

    const state = (location.state == null || location.state == undefined) ? staticData : location.state

    const [status, setStatus] = useState(false)

    return (<>
        <div className={`${styles.HomeworkPreview}`}>
            <WorkPreviewNav info={state} comments={state.annexFile.comments} />
            {/* <FileView filePath={state.annexFile} /> */}
            <ShowFiles annexFile={state.annexFile} />
        </div>
    </>)
}