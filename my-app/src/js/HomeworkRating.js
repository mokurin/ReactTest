import React, { useState } from 'react';

// css引用
import styles from "../css/HomeworkRating.module.css"

// 组件引用
import { SubjectCheckNav } from "./IndividualSubjectCheck"

// 个人作业状态返回方法
function homeworkInfo(stuNum, name, workInfo) {
    return {
        stuNum: stuNum,
        name: name,
        workInfo: workInfo
    }
}

// 作业人员
const HomeworkMemberInfo = (props) => {
    return (<>
        <div className={`${styles.homeworkMemberInfo} shadow-sm`}>
            <div className='fs-5'>
                <div className={`form-check mb-2`}>
                    <input className={`form-check-input ${styles.individualMember}`} type="checkbox" value="" id="individualMember"
                    />
                </div>
                <div className={`text-truncate`}>
                    {props.info.stuNum}
                </div >
                <div className={`text-truncate`}>
                    {props.info.name}
                </div>
                <div className={`text-truncate`}>
                    作业批改状态
                </div>
            </div>
            <button className={`btn btn-outline-secondary btn-sm ${styles.checkThisHomework}`}            >进入批阅
            </button>
        </div>
    </>)
}
// 人员显示
const HomeworkDetailed = (props) => {
    return (<>
        <div className={`${styles.homeworkDetailed} shadow-lg container`}>
            <div className={`${styles.homeworkDetailedTitle}`}>
                <div className={`${styles.homeworkName} fs-2`}>
                    作业名
                </div>
                <div>
                    截止日期
                </div>
            </div>
            <div className={`divider`}></div>
            <div className={`${styles.filteringTools} fs-4 shadow-sm`}>
                <div>
                    已经筛选出<span id="stuFiltered">100</span>人 (全班共<span id='allStu'>100</span>人)
                </div>
                <div className={`${styles.filteredBar} fs-5`}>
                    <div>
                        成绩
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked />
                        <label className="form-check-label" htmlFor="inlineRadio1">不限</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                        <label className="form-check-label" htmlFor="inlineRadio1">已批</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                        <label className="form-check-label" htmlFor="inlineRadio1">未批</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                        <label className="form-check-label" htmlFor="inlineRadio1">未交</label>
                    </div>
                </div>
            </div>
            <div className={`${styles.homeworkMembersTable} shadow`}>
                <div className={`form-check`}>
                    <input className={`form-check-input ${styles.allMembers} mb-2 fs-4`} type="checkbox" value="" id="allMembers"
                    />
                    <label htmlFor="allMembers" className='fs-4'>已选 （ ） 人</label>

                </div>
                <HomeworkMemberInfo info={homeworkInfo("12123020406", "许宏涛")} />
                <HomeworkMemberInfo info={homeworkInfo("12123020406", "许宏涛")} />
                <HomeworkMemberInfo info={homeworkInfo("12123020406", "许宏涛")} />
                <HomeworkMemberInfo info={homeworkInfo("12123020406", "许宏涛")} />
                <HomeworkMemberInfo info={homeworkInfo("12123020406", "许宏涛")} />
                <HomeworkMemberInfo info={homeworkInfo("12123020406", "许宏涛")} />
                <HomeworkMemberInfo info={homeworkInfo("12123020406", "许宏涛")} />
                <HomeworkMemberInfo info={homeworkInfo("12123020406", "许宏涛")} />
                <HomeworkMemberInfo info={homeworkInfo("12123020406", "许宏涛")} />
                <HomeworkMemberInfo info={homeworkInfo("12123020406", "许宏涛")} />
                <HomeworkMemberInfo info={homeworkInfo("12123020406", "许宏涛")} />
                <HomeworkMemberInfo info={homeworkInfo("12123020406", "许宏涛")} />
                <HomeworkMemberInfo info={homeworkInfo("12123020406", "许宏涛")} />
                <HomeworkMemberInfo info={homeworkInfo("12123020406", "许宏涛")} />
                <HomeworkMemberInfo info={homeworkInfo("12123020406", "许宏涛")} />
            </div>
        </div>
    </>)
}


export default function HomeworkRating(props) {

    return (<>
        <SubjectCheckNav action="学生作业" />
        <HomeworkDetailed />
    </>)
}