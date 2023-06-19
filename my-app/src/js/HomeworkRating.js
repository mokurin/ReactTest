import React from 'react';

// css引用
import styles from "../css/HomeworkRating.module.css"

// 组件引用
import { SubjectCheckNav } from "./IndividualSubjectCheck"
import { useLocation, useNavigate } from 'react-router';

// 个人作业状态返回方法
function homeworkInfo(stuNum, name, workInfo) {
    return {
        stuNum: stuNum,
        name: name,
        workInfo: workInfo
    }
}

function isCheckAll() {
    let nums = 0;
    let checkboxes = document.getElementsByClassName(styles.individualMember);
    let allChecked = document.getElementById("allMembers");
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            nums++
        }
        console.log(checkboxes[i]);
    }

    if (nums == checkboxes.length)
        allChecked.checked = true;

    // document.getElementById("selectedNums").innerHTML = nums;
    checkNums(nums);
}

function checkAll() {
    let allChecked = document.getElementById("allMembers");

    let checkboxes = document.getElementsByClassName(styles.individualMember);
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = allChecked.checked;
        console.log(checkboxes[i]);
    }
    if (allChecked.checked)
        checkNums(-1)
    else
        checkNums(0)
}

function checkNums(status) {
    if (status == -1) {
        document.getElementById("selectedNums").innerHTML = document.getElementsByClassName(styles.individualMember).length
    }
    else {
        document.getElementById("selectedNums").innerHTML = status;
    }
}

//单个 作业人员
const HomeworkMemberInfo = (props) => {
    return (<>
        <div className={`${styles.homeworkMemberInfo} shadow-sm`}>
            <div className='fs-5'>
                {/* <div className={`form-check mb-2`}>
                    <input className={`form-check-input ${styles.individualMember}`} type="checkbox" id="individualMember"
                        onClick={(e) => {
                            isCheckAll()
                        }}

                    />
                </div> */}
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
            <button className={`btn btn-outline-secondary btn-sm ${styles.checkThisHomework}`}>
                进入批阅
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
                    {(props.state.subName == "" || props.state.subName == undefined) ? "课程名" : props.state.subName}
                </div>
                <div>
                    {(props.state.deadLine == "" || props.state.deadLine == undefined) ? "截止日期" : props.state.deadLine}
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
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" />
                        <label className="form-check-label" htmlFor="inlineRadio1">不限</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" />
                        <label className="form-check-label" htmlFor="inlineRadio2">已批</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" />
                        <label className="form-check-label" htmlFor="inlineRadio3">未批</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" />
                        <label className="form-check-label" htmlFor="inlineRadio4">未交</label>
                    </div>
                </div>
            </div>

            <div className={`${styles.homeworkMembersTable} shadow`}>
                <div className={``}>
                    {/* <input className={`form-check-input ${styles.allMembers} mb-2 fs-4`} type="checkbox" id="allMembers" onClick={(e) => {
                        checkAll()
                    }}
                    />
                    <label htmlFor="allMembers" className='fs-4'>已选 （<span id='selectedNums'>0</span>） 人</label> */}
                    <button className={`btn btn-outline-secondary btn-lg`}
                        onClick={(e) => {
                            console.log(props.state);
                        }}
                    >
                        一键催交
                    </button>
                </div>
                <HomeworkMemberInfo info={homeworkInfo("12123020406", "许宏涛")} />
                <HomeworkMemberInfo info={homeworkInfo("12123020406", "许宏涛")} />
                <HomeworkMemberInfo info={homeworkInfo("12123020406", "许宏涛")} />
            </div>
        </div>
    </>)
}

const exp = {
    subName: "ABC",
    deadLine: "2023/1/1"
}


export default function HomeworkRating(props) {
    const location = useLocation();
    let state = (location.state == null || location.state == undefined) ? "" : location.state;;

    // state = exp;

    return (<>
        <SubjectCheckNav action="学生作业" />
        <HomeworkDetailed state={state} />
    </>)
}