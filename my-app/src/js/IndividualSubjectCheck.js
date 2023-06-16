import React, { useEffect, useMemo, useState } from 'react';

// css引用
import styles from '../css/IndividualSubjectCheck.module.css'

// 图标引用
import bell from '../img/bell.svg'
import ProfilePicture from '../img/profile.png'
import icon_back from '../img/arrow-left.svg'
import icon_search from '../img/search_info.svg'


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
                        console.log(1);
                        props.setStatus(true)
                    }
                    }>
                    成员
                </div>
                <div className={`${styles.IndividualSubjectGrades}`}
                    onClick={() => {
                        console.log(2);
                        props.setStatus(false)
                    }
                    }>成绩</div>
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

export const SubjectInfoMain = (props) => {
    if (props.status.value) {
        return (<SubjectCheckMainMembers />);
    } else {
        return (<SubjectInfoGrades />)
    }
}
//成员
export const SubjectCheckMainMembers = (props) => {
    return (<>
        <div className={`${styles.SubjectCheckMainMembers} shadow`}>
            <div className={`${styles.subjectMemberInfoSearch}`}>
                <input type="text" className={`form-control ${styles.subjectMemberInfoSearchInput}`} maxLength="10" placeholder='姓名、学号' id="search" />
                <label htmlFor="search"><img src={icon_search} alt="" /></label>
            </div>
            <div className='divider'></div>
            <div className={`${styles.SubjectMemberInfoMain}`}>
                <div className={`${styles.SubjectMemberInfoActions}`}>
                    <div className={`${styles.subjectMemberTeachers}`}>教师团队（2）</div>
                    <div className={`${styles.subjectMemberStudents}`}>全部学生（学生200）</div>
                </div>
                <div className={`${styles.SubjectMemberInfoTable}`}>
                    <div className={`${styles.SubjectMemberInfoTableNav}`}>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="allMembers" />
                            <label class="form-check-label" htmlFor="allMembers">
                                本页全选 已选多少人（）
                            </label>
                        </div>
                        <div className={`${styles.subjectMembersDeleted}`}>
                            删除成员
                        </div>
                    </div>
                    <div className={`${styles.SubjectAllMembers}`}>
                        <SubjectMemberInfo />
                        <SubjectMemberInfo />
                        <SubjectMemberInfo />
                        <SubjectMemberInfo />
                        <SubjectMemberInfo />
                        <SubjectMemberInfo />
                        <SubjectMemberInfo />
                        <SubjectMemberInfo />
                        <SubjectMemberInfo />
                        <SubjectMemberInfo />
                        <SubjectMemberInfo />
                        <SubjectMemberInfo />
                        <SubjectMemberInfo />
                        <SubjectMemberInfo />
                        <SubjectMemberInfo />
                        <SubjectMemberInfo />
                        <SubjectMemberInfo />
                        <SubjectMemberInfo />
                        <SubjectMemberInfo />
                        <SubjectMemberInfo />
                        <SubjectMemberInfo />
                    </div>
                </div>
            </div>
        </div>
    </>);
}
export const SubjectMemberInfo = (props) => {
    return (<>
        <div className={`${styles.SubjectMemberInfo} shadow-sm`}>
            <div>
                <div className={`form-check mt-2`}>
                    <input class="form-check-input" type="checkbox" value="" id="individualMember" />
                </div>
                <img src={ProfilePicture} alt="" />
                <div className={`text-truncate`}>
                    学号学号学号学号学号学号学号学号学号学号学号学号学号学号学号学号学号学号学号学号学号学号学号学号
                </div >
                <div className={`text-truncate`}>
                    姓名
                </div>
                <div className={`text-truncate`}>
                    邮箱
                </div>
            </div>
            <button className={`btn btn-outline-secondary btn-sm ${styles.deleteThisMember}`}>删除</button>
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

