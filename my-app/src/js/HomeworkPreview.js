import React, { useEffect, useState } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import styles from '../css/HomeworkPreview.module.css'
import { useLocation } from 'react-router';

const WorkPreviewNav = (props) => {
    const [value, setValue] = useState(props.info.grade);


    return (<>
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
            {/* <App filePath={state.filePath} /> */}
        </div>
    </>)
}