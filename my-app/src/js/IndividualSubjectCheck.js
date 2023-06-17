import React, { Children, useEffect, useMemo, useState } from 'react';


// 组件引用
import FilingModal from './homepage/FilingModal';
// css引用
import styles from '../css/IndividualSubjectCheck.module.css'

// 图标引用
import bell from '../img/bell.svg'
import ProfilePicture from '../img/profile.png'
import icon_back from '../img/arrow-left.svg'
import icon_search from '../img/search_info.svg'

// 已删除的学生数据
let deletedMember = []
//监听人数
function checkNumsOfChecked(e) {
    let nums = 0;
    let membersChecked = document.getElementsByClassName(styles.individualMember)
    for (let i = 0; i < membersChecked.length; i++) {
        if (membersChecked[i].checked)
            nums += 1;
    }
    document.getElementById("allMembers").checked = (nums == membersChecked.length)
    document.getElementById("homeworkNumsOfChecked").innerHTML = nums
}

//学生信息构建方法
function createdStuInfo(stuNum, name, eMail) {
    return {
        stuNum: stuNum,
        name: name,
        eMail: eMail
    }
}

//导航栏
export const SubjectCheckNav = (props) => {
    return (<>
        <div className={`${styles.subjectCheckNav} shadow-lg`}>
            <div className={`${styles.subjectCheckNavBack}`}>
                <img src={icon_back} alt="" />
                <div className={`${styles.IndividualSubjectCheckName} text-truncate`}>
                    课程名课程名课程名课程名课程名
                </div>
            </div>
            <div className={`${styles.IndividualSubjectCheckActions}`}>
                <div className={`${styles.IndividualSubjectMembers}`}
                    onClick={() => {
                        props.setStatus(true)
                    }
                    }>
                    成员
                </div>
            </div>
            <div className={`${styles.individualProfile}`}>
                <img src={bell} alt="" />
                <div className="">
                    <img src={ProfilePicture} alt="" className={styles.profile} />
                </div>
            </div>
        </div>
    </>)
}
//点击判断
export const SubjectInfoMain = (props) => {
    if (props.status.value) {
        return (<SubjectCheckMainMembers />);
    } else {
        return (<SubjectInfoGrades />)
    }
}

//所有成员显示区域
export const SubjectCheckMainMembers = (props) => {
    // 老师成员和学生成员切换
    const [status, setStatus] = useState(true);
    // 全选按钮
    function checkedAll() {
        let allMembers = document.getElementById("allMembers");
        let membersChecked = document.getElementsByClassName(styles.individualMember)
        for (let i = 0; i < membersChecked.length; i++) {
            membersChecked[i].checked = allMembers.checked;
        }
        document.getElementById("homeworkNumsOfChecked").innerHTML = allMembers.checked ? membersChecked.length : 0;
        console.log(document.getElementsByClassName(styles.SubjectAllMembers)[0].childNodes.length);
    }
    // 批量删除
    function deletedMembers(e) {
        let membersChecked = document.getElementsByClassName(styles.individualMember)

        for (let i = membersChecked.length - 1; i >= 0; i--) {
            if (membersChecked[i].checked) {
                let info = membersChecked[i].parentNode.parentNode.parentNode
                // 删除的学生数据
                deletedMember.push(info)

                info.remove()
            }
        }

        document.getElementById("homeworkNumsOfChecked").innerHTML = 0;
        document.getElementById("allMembers").checked = false;
        //后端
    }

    return (<>
        <div className={`${styles.SubjectCheckMainMembers} shadow`}>
            <div className={`${styles.subjectMemberInfoSearch}`}>
                <input type="text" className={`form-control ${styles.subjectMemberInfoSearchInput}`} maxLength="10" placeholder='姓名、学号' id="search" />
                <label htmlFor="search"><img src={icon_search} alt="" /></label>
            </div>
            <div className='divider'></div>
            <div className={`${styles.SubjectMemberInfoMain}`}>
                <div className={`${styles.SubjectMemberInfoActions}`}>
                    <div className={`${styles.subjectMemberTeachers}`}
                        onClick={(e) => {
                            setStatus(false)
                        }}
                    >教师团队 ()</div>
                    {/* 从后端拿数据提前渲染 */}
                    <div className={`${styles.subjectMemberStudents}`}
                        onClick={(e) => {
                            setStatus(true)
                        }}
                    >全部学生 ()</div>
                </div>
                <div className={`${styles.SubjectMemberInfoTable}`}>
                    <div className={`${styles.SubjectMemberInfoTableNav}`}>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="allMembers"
                                onClick={() => {
                                    checkedAll();
                                }}
                            />
                            <label className="form-check-label" htmlFor="allMembers">
                                本页全选 已选多少人 (
                                <span id={`homeworkNumsOfChecked`}>0</span>
                                )
                            </label>
                        </div>
                        <div className={`${styles.subjectMembersDeleted} btn btn-outline-secondary`}
                            // data-bs-toggle="modal"
                            // data-bs-target="#deleteSubject"
                            onClick={(e) => {
                                deletedMembers(e)
                            }}
                        >
                            删除成员
                        </div>
                        {/* <FilingModal data={{ id: "deleteSubject", title: "是否确认删除这些信息?" }} /> */}
                    </div>
                    <div className={`${styles.SubjectAllMembers}`}>
                        {status ?
                            <>
                                <SubjectMemberInfo info={createdStuInfo("12123020406", "许宏涛", "Yomiger@163.com")} />
                                <SubjectMemberInfo info={createdStuInfo("12123020401", "宏涛", "Yomiger@163.com")} />
                                <SubjectMemberInfo info={createdStuInfo("12123020402", "许", "Yomiger@163.com")} />
                                <SubjectMemberInfo info={createdStuInfo("12123020402", "许111", "Yomiger@163.com")} />
                                <SubjectMemberInfo info={createdStuInfo("12123020402", "2222许", "Yomiger@163.com")} />
                                <SubjectMemberInfo info={createdStuInfo("12123020402", "2222许", "Yomiger@163.com")} />
                                <SubjectMemberInfo info={createdStuInfo("12123020402", "2222许", "Yomiger@163.com")} />
                                <SubjectMemberInfo info={createdStuInfo("12123020402", "2222许", "Yomiger@163.com")} />
                                <SubjectMemberInfo info={createdStuInfo("12123020402", "2222许", "Yomiger@163.com")} />
                                <SubjectMemberInfo info={createdStuInfo("12123020402", "2222许", "Yomiger@163.com")} />
                                <SubjectMemberInfo info={createdStuInfo("12123020402", "2222许", "Yomiger@163.com")} />
                                <SubjectMemberInfo info={createdStuInfo("12123020402", "2222许", "Yomiger@163.com")} />
                            </>
                            :
                            <>
                                <SubjectMemberInfo info={createdStuInfo("12123020406", "老师1", "Yomiger@163.com")} />
                                <SubjectMemberInfo info={createdStuInfo("12123020401", "老师2", "Yomiger@163.com")} />
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    </>);
}

//单条成员信息
export const SubjectMemberInfo = (props) => {

    //删除按钮事件
    function deleteSelf(e) {
        let deletedEle = e.target.parentNode
        //删除存放和删除
        deletedMember.push(deletedEle)
        deletedEle.remove()
        checkNumsOfChecked()
        // 后端部分
    }
    return (<>
        <div className={`${styles.SubjectMemberInfo} shadow-sm`}>
            <div>
                <div className={`form-check mt-2`}>
                    <input className={`form-check-input ${styles.individualMember}`} type="checkbox" value="" id="individualMember"
                        onClick={(e) => {
                            checkNumsOfChecked(e)
                        }}
                    />
                </div>
                <img src={ProfilePicture} alt="" />
                <div className={`text-truncate`}>
                    {props.info.stuNum}
                </div >
                <div className={`text-truncate`}>
                    {props.info.name}
                </div>
                <div className={`text-truncate`}>
                    {props.info.eMail}
                </div>
            </div>
            <button className={`btn btn-outline-secondary btn-sm ${styles.deleteThisMember}`}
                // data-bs-toggle="modal"
                // data-bs-target="#deleteSubject"
                onClick={(e) => {
                    deleteSelf(e)
                }}
            >删除</button>
        </div>
    </>)
}

//成绩
export const SubjectInfoGrades = (props) => {
    return (<>
        <div className={`${styles.SubjectCheckMainMembers}`}>什么都没有

        </div>
    </>)
}

export default function IndividualSubjectCheck(props) {
    const [status, setStatus] = useState(true);

    const statusInfo = useMemo(() => ({
        value: status
    }), [status])

    return (<>
        <div className={`${styles.subjectCheckPage}`}>
            <SubjectCheckNav setStatus={setStatus} />
            <SubjectInfoMain status={statusInfo} />
        </div>
    </>)
}

