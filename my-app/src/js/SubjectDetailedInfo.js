import React, { useEffect, useState } from 'react';

// css引用
import styles from "../css/SubjectInfo.module.css"

//图标引用
import icon_person from '../img/person.svg'
import icon_back from '../img/arrow-left.svg'

// 组件引用
import PostHomework from './PostHomework';
import HomeworkItems from './homework/HomeworkItems'
import InteractionTool from './homework/InteractionTool'
import { Send } from './Connect'

//工具模块
import * as Util from './Util'
import { useLocation, useNavigate } from 'react-router';


//课程详情
export default function SubjectDetailedInfo(props) {
    const location = useLocation();
    const s = location.state;
    const subData = (s !== null && s !== undefined) ? s.subData : null;//课程数据
    const user_Account = JSON.parse(localStorage.getItem('user_Account'));
    const [allHomeworkInfo, setAllHomeworkInfo] = useState([]);

    // 页面初始化
    useEffect(() => {
        if (user_Account !== null && user_Account !== undefined) {
            if (subData != null) {
                RefreshHomeworks();
            }
            else {
                //返回主页
                navigate('/Main');
            }
        } else {
            //返回主页
            navigate('/Main');
        }
    }, [])

    //成员信息跳转
    const navigate = useNavigate();

    //跳转成员管理
    function jumpToMngMem() {
        navigate('/IndividualSubjectCheck', {
            state: {
                subData: subData
            }
        })
    }

    //刷新作业
    function RefreshHomeworks(homework_id) {
        (async () => {
            await new Promise((resolve, reject) => {
                const msg = {
                    api: 'reqsubinfo',
                    sub_id: subData.data.id
                }
                Send(msg, res => {
                    if (res.status) {
                        subData.data = res.subject;
                        console.log('新课程数据');
                        console.log(subData.data);
                        resolve();
                    } else {
                        console.log(res.errcode);
                    }
                })
            })
            const homeworks = await getAllHomework(subData);
            setAllHomeworkInfo(homeworks);
        })();
    }

    return (<>
        <div className={`${styles.subjectInfoPage} container shadow-lg`}>
            <div className={`${styles.subjectInfoPageHeader}`}>
                <img onClick={(e) => {
                    navigate(-1)
                }} src={icon_back} className={`${styles.returnLastPage}`} alt="" />
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
                        {infoButton("成员", subData !== null ? subData.data.student_emails.length : '', jumpToMngMem)}
                    </div>
                </div>
                {Util.isTeacher(user_Account.data.identity) &&
                    <div className={`${styles.subjectInfoPageHeaderRight}`}>
                        <InteractionTool name={"发布作业"} nums={allHomeworkInfo.length} />
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
                {Util.isTeacher(user_Account.data.identity) && <PostHomework subData={subData} isEdit={false} RefreshHomeworks={RefreshHomeworks} />}
                <HomeworkItems subData={subData} setAllHomeworkInfo={setAllHomeworkInfo} allHomeworkInfo={allHomeworkInfo} />
            </div>
        </div>
    </>);
}

//班级下面的 操作栏
export const infoButton = (name, data, fuc) => {
    if (name === "成员") {
        return (<>
            <div className={`${styles.infoButton}`} onClick={(e) => { fuc() }}>
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

//作业构造器
export const HomeworkCreator = (homeworkName, homeworkIntroduce, deadline, maxGrade, interaction, data) => {
    return {
        homeworkName: homeworkName,
        homeworkIntroduce: homeworkIntroduce,
        deadline: deadline,
        maxGrade: maxGrade,
        interaction: interaction,
        data: data
    }
}

export const getAllHomework = (subData) => {
    return new Promise((resolve, reject) => {
        //获取所有作业信息
        const homework_ids = subData.data.homework_ids;

        //获取单个作业信息
        const getHomework = (id) => {
            return new Promise((resolve, reject) => {
                const msg = {
                    api: 'reqworkinfo',
                    work_id: id
                }
                Send(msg, res => {
                    resolve(res);
                })
            })
        }

        //获取所有作业
        (async () => {
            let homeworks = [];
            for (let id = homework_ids.length - 1; id >= 0; id--) {
                const res = await getHomework(subData.data.homework_ids[id])
                if (res.status) {
                    const hw = res.homework;
                    homeworks.push(HomeworkCreator(hw.title, hw.desc, hw.deadline, hw.max_score,
                        [hw.grade_user_emails.length, hw.submitted_emails.length - hw.grade_user_emails.length,
                        subData.data.student_emails.length - hw.submitted_emails.length], hw));
                    //已批、未批、未交
                }
            }
            resolve(homeworks);
        })();
    })
}
