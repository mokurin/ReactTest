import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
// css
import styles from '../css/Main.module.css'
// 组件引用
import SubjectAction from './homepage/SubjectAction';
import SubjectItems from './homepage/SubItems/SubjectItems'

// 图标
import logo from '../img/logo.png'
import ProfilePicture from '../img/profile.png'
import addPerson from '../img/person-fill-add.svg'
import bell from '../img/bell.svg'
import Plus from '../img/plus-lg.svg'
import Msg from '../img/envelope.svg'
import help from '../img/question-circle.svg'
import Sort from '../img/sort-down-alt.svg'
import fileCtrl from '../img/files-alt.svg'

//课程信息引用
import { noArchivedSubjects, updateNoArchivedSubjects } from './subject/NoArchivedSubjects'
import { archivedSubjects, updateArchivedSubjects } from './subject/ArchivedSubjects'
import subjectInfo, { getAllSubs } from './subject/SubjectInfo'



function Main(props) {
    const [noArchivedSub, setNoArchivedSub] = useState(noArchivedSubjects);
    const [archivedSub, setArchivedSub] = useState(archivedSubjects);
    const navigate = useNavigate();
    const user_Account = JSON.parse(localStorage.getItem('user_Account'));

    //处理页面加载
    useEffect(() => {
        if (user_Account !== null && user_Account !== undefined) {
            updateNoArchivedSubjects([{
                createdTime: "第一学期",
                name: "软件工程软件工程软件工程软件工程软件工程",
                class: "121230204",
                code: "AAA",
                teacher: "xxx"
            },
            subjectInfo("第二学期", "应用数学应用数学应用数学应用数学应用数学", "121230202", "BBB", "vvv"),
            subjectInfo("第一学期", "爱德华拉到哈罗德了", "121230202", "CCC", "vvv")]);

            updateArchivedSubjects([subjectInfo("第二学期", "离散数学离散数学离散数学离散数学离散数学离散数学离散数学", "121230202", "DDD", "sss")])

            new Promise((resolve, reject) => {
                //请求所有课程数据
                if (getAllSubs(user_Account))
                    resolve();
                else reject();
            }).then(() => {
                //请求成功则加载内容
                setNoArchivedSub(noArchivedSubjects);
                setArchivedSub(archivedSubjects);
            }).catch(() => {
                //请求失败则加载到登录页面
                navigate('/Login');
            })
        } else {
            //未登录则加载到登录页面
            navigate('/Login');
        }
    }, [])



    return (
        (user_Account !== null) &&
        <>
            {/* 导航栏 */}
            <div className={`${styles.navigation} bg-body-tertiary container fixed-top shadow-lg rounded`}>
                <div className={styles.left}>
                    <div>
                        <img src={logo} alt="" className={styles.logo} />
                    </div>
                    <div className={`${styles.select} ${styles.selected}`}>课堂</div>
                </div>
                <div className={`${styles.right}`}>
                    <div className={`${styles.select}`}>
                        <img src={addPerson} alt="" />
                        邀请教师
                    </div>
                    <div>
                        <img src={bell} alt="" />
                    </div>
                    <div className="">
                        <img src={ProfilePicture} alt="" className={styles.profile} />
                    </div>
                </div>
            </div>
            {/* 课程显示 */}
            <div className={`${styles.content} container shadow-sm`}>
                <div className={styles.contentNav}>
                    <div className={styles.contentNavLeft}>
                        <div>全部课程</div>
                    </div>
                    <div className={styles.contentNavRight}>
                        <div
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#subjectSorted"
                            onClick={() => {
                                setNoArchivedSub(noArchivedSubjects);
                                setArchivedSub(archivedSubjects);
                            }}
                        >
                            <img src={Sort} alt="" />
                            课程排序
                        </div>
                        <div
                            type="button"
                            data-bs-target="#subjectManage"
                            data-bs-toggle="modal"
                            onClick={() => {
                                setNoArchivedSub(noArchivedSubjects);
                                setArchivedSub(archivedSubjects);
                            }}
                        >
                            <img src={fileCtrl} alt="" />
                            归档管理
                        </div>

                        {/* 课程排序 和 归档管理 的模态框 */}
                        <SubjectAction setNoArchivedSub={setNoArchivedSub} setArchivedSub={setArchivedSub}
                            noArchivedSub={noArchivedSub} archivedSub={archivedSub} />

                        <div className={`btn  btn-primary ${styles.contentNavRightBtn}`}>+创建/加入课程</div>
                    </div>
                </div>
                <div className={`${styles.divider} shadow-sm`} />
                {/* 课程框 */}
                <div className={styles.subjects}>
                    {/* 所有课程 */}
                    {/* {subjectItems} */}
                    <SubjectItems setNoArchivedSub={setNoArchivedSub} noArchivedSub={noArchivedSub}
                        archivedSub={archivedSub} setArchivedSub={setArchivedSub} />

                    {/* 创建课程 */}
                    <div className={`${styles.subject} ${styles.no_select} shadow`}>
                        <div className={styles.addSubjectTop}>

                        </div>
                        <div className={styles.addSubjectBottom}>
                            <img src={Plus} alt="" />
                            <div>创建课程</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 侧边栏 */}
            <div className={`${styles.sidebar} shadow-lg`}>
                <img src={Msg} alt="" />
                <img src={help} alt="" />
            </div>
        </>
    )
}

export default Main;