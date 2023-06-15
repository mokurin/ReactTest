import React, { useState } from 'react';
// css
import styles from '../css/Main.module.css'
// 组件引用
import SubjectAction from './homepage/SubjectAction';
import SubjectItems from './homepage/SubItems/SubjectItems'
import SubjectSortedBarItems from './homepage/SubItems/SubjectSortedBarItems'
import SmallSubjectItems from './homepage/SubItems/SmallSubjectItems'

// 图标
import logo from '../img/logo.png'
import ProfilePicture from '../img/profile.png'
import CheckForPlagiarism from '../img/search.svg'
import addPerson from '../img/person-fill-add.svg'
import bell from '../img/bell.svg'
import Plus from '../img/plus-lg.svg'
import Msg from '../img/envelope.svg'
import help from '../img/question-circle.svg'
import Sort from '../img/sort-down-alt.svg'
import fileCtrl from '../img/files-alt.svg'

//课程信息引用
import { noArchivedSubjects } from './subject/NoArchivedSubjects'
import { archivedSubjects, updateArchivedSubjects } from './subject//ArchivedSubjects'



function Main(props) {
    const [noArchivedSub, setNoArchivedSub] = useState(noArchivedSubjects);
    const [archivedSub, setArchivedSub] = useState(archivedSubjects);
    // //排序元素
    // const [listItems, setListItems] = useState(getListItems());
    // //课程元素
    // const [subjectItems, setSubjectItems] = useState(getSubjectItems());
    // //归档课程
    // const [archivedItems, setArchivedItems] = useState(getArchivedSubjects());

    // // 会按当前的 课程排序 渲染到课程排序的模态框中
    // function addSortedContent() {
    //     setListItems(getListItems());
    // }

    // // 会按当前的 归档课程 渲染到课程排序的模态框中
    // function addArchivedSubjects() {
    //     setArchivedItems(getArchivedSubjects());
    // }

    // //把课程放入表中
    // function addSubjects(data) {
    //     if (data !== null)
    //         updateArchivedSubjects(data);
    //     setSubjectItems(getSubjectItems());
    // }


    return (
        <>
            {/* 导航栏 */}
            <div className={`${styles.navigation} bg-body-tertiary container fixed-top shadow-lg rounded`}>
                <div className={styles.left}>
                    <div>
                        <img src={logo} alt="" className={styles.logo} />
                    </div>
                    <div className={`${styles.select}`}>课堂</div>
                    <div className={`${styles.select}`}>备课区</div>
                    <div className={`${styles.select}`}>精品专区</div>
                    <div className={`${styles.select}`}>我的精品</div>
                </div>
                <div className={`${styles.right}`}>
                    <div className={`${styles.select}`}>
                        <img src={CheckForPlagiarism} alt="" className={styles.checkForPlagiarism} />
                        论文查重
                    </div>
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
                                // addSortedContent();
                                // addArchivedSubjects();
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
                                // addSortedContent();
                                // addArchivedSubjects();
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
                    <SubjectItems setNoArchivedSub={setNoArchivedSub}
                        noArchivedSub={noArchivedSub} />

                    {/* 创建课程 */}
                    <div className={`${styles.addSubject} shadow`}>
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