import React from 'react';

// css引用
import styles from "../../css/SubjectInfo.module.css"


//信息显示工具
export default function InterationTool(props) {
    const { name, nums } = props;

    return (<>
        <div className={`${styles.interationTool}`}>
            <div className={`${styles.interationToolNums} fs-1`}>
                {nums}
            </div>
            <div className={`${styles.interationToolName} ${name === "未批" ? 'text-danger' : ''}`}>
                {name}
            </div>
        </div>
    </>);
}