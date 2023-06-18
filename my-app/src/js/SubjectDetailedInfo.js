import React from 'react';

// css引用
import styles from "../css/SubjectInfo.module.css"

//图标引用
import icon_person from '../img/person.svg'

// 组件引用
import PostHomework from './PostHomework';
import HomeworkItems from './homework/HomeworkItems'
import InteractionTool from './homework/InteractionTool'

//工具模块
import * as Util from './Util'
import { useLocation } from 'react-router';


//课程详情
export default function SubjectDetailedInfo(props) {
    const location = useLocation();
    const s = location.state;
    const subData = (s !== null && s !== undefined) ? s.subData : null;//课程数据
    const allHomeworkInfo = [{
        homeworkName: 'aaa',
        homeworkIntroduce: 'asdawrdasregesASEF',
        deadline: new Date(),
        maxGrade: 100
    }, {
        homeworkName: 'bbb',
        homeworkIntroduce: 'wsedfal,asdsaasdsfdsafaeasasf',
        deadline: new Date(),
        maxGrade: 200
    }];
    
    const interactions = [[1, 2, 3], [2, 3, 4]];


    return (<>
        <div className={`${styles.subjectInfoPage} container shadow-lg`}>
            <div className={`${styles.subjectInfoPageHeader}`}>
                <div className={`${styles.subjectInfoPageHeaderLeft}`}>
                    <div className={`${styles.headerleftTitle} text-truncate fs-1`}>
                        <div className={`text-truncate fs-1`}>
                            {subData !== null ? subData.name : ''}
                        </div>
                    </div>
                    <div className={`${styles.headerleftClass} text-truncate fs-4`}>
                        {subData !== null ? subData.class : ''}
                    </div>
                    <div className={`${styles.headerleftActions}`}>
                        {infoButton("加课码", subData !== null ? subData.code : '')}
                        {infoButton("成员", "128")}
                    </div>
                </div>
                {Util.isTeacher("0") &&
                    <div className={`${styles.subjectInfoPageHeaderRight}`}>
                        <InteractionTool name={"互动个数"} nums={0} />
                        <InteractionTool name={"发布作业"} nums={0} />
                        <InteractionTool name={"发布测试"} nums={0} />
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
            <div className={`${styles.homeworkTable}`}>
                <PostHomework />
                <HomeworkItems allHomeworkInfo={allHomeworkInfo} interactions={interactions} />
            </div>
        </div>
    </>);
}

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
            {name}:{data}
        </div>
    </>)
}

//导航栏按钮
export const navButton = (name, isSelected) => {
    return (<>
        <div className={`${styles.navButton} ${isSelected ? styles.selected : ''}`}>
            {name}
        </div>
    </>);
}