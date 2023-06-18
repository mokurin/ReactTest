import React, { useEffect, useState } from 'react';

// css引用
import styles from "../css/SubjectInfo.module.css"
//图标引用
import icon_changeName from '../img/pencil-square.svg'
import icon_person from '../img/person.svg'
import icon_data from '../img/bar-chart-line-fill.svg'
import icon_grade from '../img/journal-text.svg'
import icon_download from '../img/download.svg'

// 组件引用
import PostHomework from './PostHomework';


//班级下面的 操作栏
export const infoButton = (name, data) => {
    if (name === "成员") {
        return (<>
            <div className={`${styles.infoButton}`}>
                <img src={icon_person} alt="" />
                {name} {data}
            </div>
        </>)
    }
    return (<>
        <div className={`${styles.infoButton}`}>
            {name}：{data}
        </div>
    </>)
}

export const interationTool = (name, nums) => {
    return (<>
        <div className={`${styles.interationTool}`}>
            <div className={`${styles.interationToolNums} fs-1`}>
                {nums}
            </div>
            <div className={`${styles.interationToolName} ${name == "未批" ? 'text-danger' : ''}`}>
                {name}
            </div>
        </div>
    </>);
}

//导航栏按钮
export const navButton = (name, isSelected) => {
    return (<>
        <div className={`${styles.navButton} ${isSelected ? styles.selected : ''}`}>
            {name}
        </div>
    </>);
}


//判断身份
function isTeacher(status) {
    if (status == "老师" || status == "0")
        return true;

    return false;
}
// 单个作业
export const homeworkInfo = (props) => {
    return (<>
        <div className={`${styles.homeworkInfo} shadow-sm`}>
            <div className={`${styles.homeworkInfoHeader}`}>
                <div className={`${styles.homeworkInfoHeaderLeft}`}>
                    <div className={`${styles.homeworkType}`}>
                        个人作业
                    </div>
                    <div className={`${styles.homeworkCreatedTime}`} >
                        2023/1/1 12:00
                    </div>
                </div>
                {isTeacher("0") &&
                    <div className={`${styles.homeworkInfoHeaderRight}`}>
                        ···
                    </div>
                }
            </div>
            <div className={`${styles.homeworkMainInfo}`}>
                <div className={`${styles.homeworkMainInfoLeft}`}>
                    <div className={`${styles.homeworkName} text-truncate fs-1`}>
                        作业名字作业名字作业名字作业名字作业名字作业名字作业名字作业名字作业名字作业名字
                    </div>
                    <div className={`${styles.homeworkInfoDesc} text-truncate`}>
                        作业描述作业描述作业描述作业描述作业描述作业描述作业描述作业描述作业描述作业描述
                    </div>
                </div>
                <div className={`${styles.homeworkMainInfoRight}`}>
                    {isTeacher("0") ?
                        <div className={`${styles.homeworkSubmissionInfo}`}>
                            {interationTool("已批", 0)}
                            {interationTool("未批", 0)}
                            {interationTool("未交", 0)}
                        </div>
                        :
                        <div className={`${styles.homeworkSubmitted}`}>
                            <button className={`btn btn-primary`}>上传作业</button>
                        </div>}
                </div>
            </div>
            {isTeacher("0") &&
                <div className={`${styles.homeworkAnnex}`}>
                    作业附件内容
                </div>
            }
            <div className={`${styles.homeworkDeadline}`}>
                截止日期：2022/1/1 12：00
            </div>
        </div>
    </>);
}

export default function SubjectDetailedInfo(props) {
    return (<>
        <div className={`${styles.subjectInfoPage} container shadow-lg`}>
            <div className={`${styles.subjectInfoPageHeader}`}>
                <div className={`${styles.subjectInfoPageHeaderLeft}`}>
                    <div className={`${styles.headerleftTitle} text-truncate fs-1`}>
                        <div className={`text-truncate fs-1`}>
                            课程名课程名课程名课程名课程名课程名课程名
                        </div>
                        <img src={icon_changeName} alt="" className={`${styles.subjectInfoChangeName}`} />
                    </div>
                    <div className={`${styles.headerleftClass} text-truncate fs-4`}>
                        课程班级课程班级课程班级课程班级
                    </div>
                    <div className={`${styles.headerleftActions}`}>
                        {infoButton("加课码", "ABCDE")}
                        {infoButton("成员", "128")}
                    </div>
                </div>
                {isTeacher("0") &&
                    <div className={`${styles.subjectInfoPageHeaderRight}`}>
                        {interationTool("互动个数", 0)}
                        {interationTool("发布作业", 0)}
                        {interationTool("发布测试", 0)}
                    </div>
                }
            </div>
            <div className={`${styles.navActions} shadow-sm`}>
                {navButton("课程互动")}
                {navButton("作业", true)}
                {navButton("话题")}
                {navButton("资料")}
                {navButton("测试")}
                {navButton("公告")}
            </div>
            <div className={`${styles.homeworkTable} shadow`}>
                <PostHomework />
                {homeworkInfo()}
            </div>
        </div>
    </>);
}