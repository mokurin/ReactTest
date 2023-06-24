import React, { Children, useEffect, useMemo, useState } from 'react';


// 组件引用
import FilingModal from './homepage/FilingModal';
import { Send } from './Connect'

// css引用
import styles from '../css/IndividualSubjectCheck.module.css'

// 图标引用
import bell from '../img/bell.svg'
import ProfilePicture from '../img/profile.png'
import icon_back from '../img/arrow-left.svg'
import icon_search from '../img/search_info.svg'
import { useLocation, useNavigate } from 'react-router';

// 已删除的学生数据
let deletedMember = []
//监听人数
function checkNumsOfChecked(e) {
    let nums = 0;
    let membersChecked = document.getElementsByClassName(styles.individualMember)
    if (membersChecked) {
        for (let i = 0; i < membersChecked.length; i++) {
            if (membersChecked[i].checked)
                nums += 1;
        }
        document.getElementById("allMembers").checked = (nums == membersChecked.length)
        document.getElementById("homeworkNumsOfChecked").innerHTML = nums
    }
}
// 全选按钮
function checkedAll() {
    let allMembers = document.getElementById("allMembers");
    if (allMembers) {
        let membersChecked = document.getElementsByClassName(styles.individualMember)
        for (let i = 0; i < membersChecked.length; i++) {
            membersChecked[i].checked = allMembers.checked;
        }
        document.getElementById("homeworkNumsOfChecked").innerHTML = allMembers.checked ? membersChecked.length : 0;
    }
}
// 批量删除
function deletedMembers(e) {
    let membersChecked = document.getElementsByClassName(styles.individualMember)

    if (membersChecked) {

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
    const navigate = useNavigate()

    return (<>
        <div className={`${styles.subjectCheckNav} shadow-lg`}>
            <div className={`${styles.subjectCheckNavBack}`}>
                <img src={icon_back} alt="" onClick={(e) => {
                    navigate(-1);
                }} />
                <div className={`${styles.IndividualSubjectCheckName} text-truncate`}>
                    {(props.subData == null || props.subData == undefined) ? "" : props.subData.name}
                </div>
            </div>
            <div className={`${styles.IndividualSubjectCheckActions}`}>
                <div className={`${styles.IndividualSubjectMembers}`}
                    onClick={() => {
                    }
                    }>
                    {props.action}
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

//所有成员显示区域
export const SubjectCheckMainMembers = (props) => {
    // 老师成员和学生成员切换
    const [status, setStatus] = useState(true);

    // 老师 学生 数据
    const [teaMembers, setTeaMember] = useState([]);
    const [stuMembers, setStuMembers] = useState([]);

    // 请求成员
    function sendScore() {
        const msg = {
            api: '',
        }
        Send(msg, (msg) => {
            if (msg.status)
                console.log('success');
            // 数据接收部分

        });
    }

    // ---------- 渲染成员方法 ----------

    // 成员列表
    let listItems = []

    let stuItems = document.getElementsByClassName(styles.SubjectMemberInfo)

    function addItems() {
        if (stuItems == null || stuItems == undefined || stuItems.length == 0)
            return

        for (let i = 0; i < stuItems.length; i++) {
            listItems.push(stuItems[i]);
        }

    }
    useEffect(() => {
        if (status) {
            addItems()
        }
    }, [status])
    //输入框
    let inputValue = document.getElementsByClassName(styles.subjectMemberInfoSearchInput)[0];

    function searchItem(match) {
        listItems.forEach(item => {
            if (item.querySelector("#stuNum").innerHTML.includes(match) || item.querySelector("#stuName").innerHTML.includes(match)) {
                item.style.display = "flex"
            }
            else {
                item.style.display = "none"
            }
        })
    }

    return (<>
        <div className={`${styles.SubjectCheckMainMembers} shadow`}>
            {/* 搜索栏 */}
            <div className={`${styles.subjectMemberInfoSearch}`}>
                <input type="text" className={`form-control ${styles.subjectMemberInfoSearchInput}`} maxLength="30"
                    placeholder='姓名、学号' id="search"
                    onChange={(e) => {
                        // console.log(e.target.value);
                        searchItem(e.target.value)
                    }}
                />
                <label htmlFor="search"><img src={icon_search} alt="" /></label>
            </div>
            <div className='divider'></div>
            <div className={`${styles.SubjectMemberInfoMain}`}>
                {/* 左侧边栏区域 */}
                <div className={`${styles.SubjectMemberInfoActions}`}>
                    <div className={`${styles.subjectMemberTeachers}`}
                        onClick={(e) => {
                            setStatus(false)
                        }}
                    >教师团队 () {/* 从后端拿数据提前渲染 */} </div>
                    <div className={`${styles.subjectMemberStudents}`}
                        onClick={(e) => {
                            setStatus(true)
                        }}
                    >全部学生 () {/* 从后端拿数据提前渲染 */} </div>
                </div>
                {/* 老师 和 学生 显示区域 */}
                {status ? <StuManaged /> : <TeacherManaged />}
            </div>
        </div>
    </>);
}
//学生管理区域
const StuManaged = (props) => {
    return (<>
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
                    onClick={(e) => {
                        deletedMembers(e)
                    }}
                >
                    删除成员
                </div>
                {/* <FilingModal data={{ id: "deleteSubject", title: "是否确认删除这些信息?" }} /> */}
            </div>
            <div className={`${styles.SubjectAllMembers}`}>
                <SubjectMemberInfo info={createdStuInfo("12123020406", "许宏涛", "Yomiger@163.com")} />
                <SubjectMemberInfo info={createdStuInfo("12123020401", "宏涛", "Yomiger@163.com")} />
                <SubjectMemberInfo info={createdStuInfo("12123020402", "许", "Yomiger@163.com")} />
            </div>
        </div>
    </>)
}
// 老师显示区域
const TeacherManaged = (props) => {
    return (<>
        <div className={`${styles.SubjectAllTeachers}`}>
            <div className={`${styles.SubjectMemberInfoTableNav}`}>
                <button className={`btn btn-outline-secondary btn-sm ms-2`}>
                    添加 助教/老师
                </button>
            </div>
            <SubjectTeacherInfo />
            <SubjectTeacherInfo />
            <SubjectTeacherInfo />
            <SubjectTeacherInfo />
        </div>
    </>)
}

//单条学生成员信息
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
                <div className={`text-truncate`} id='stuNum'>
                    {props.info.stuNum}
                </div >
                <div className={`text-truncate`} id='stuName'>
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

//单条老师成员信息
export const SubjectTeacherInfo = (props) => {

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
        <div className={`${styles.teacherMemberInfo} shadow-sm`}>
            <div>
                <img src={ProfilePicture} alt="" />
                <div className={`text-truncate`}>
                    姓名姓名姓
                </div >
                <div className={`text-truncate`}>
                    邮箱邮箱邮箱邮箱邮箱邮箱邮箱邮箱邮箱邮箱邮箱
                </div>
                <div className={`text-truncate`}>
                    管理员/助教管理员
                </div>
            </div>
            <button className={`btn btn-outline-secondary btn-sm ${styles.deleteThisMember}`} id='techerDeleted'
                onClick={(e) => {
                    deleteSelf(e)
                }}
            >删除</button>
        </div>
    </>)
}

export default function IndividualSubjectCheck(props) {
    const location = useLocation();
    const subjectData = (location.state == null || location.state === undefined) ? "" : location.state;
    const user_Account = JSON.parse(localStorage.getItem('user_Account'));
    console.log(typeof (subjectData.name));

    return (<>
        <div className={`${styles.subjectCheckPage}`}>
            <SubjectCheckNav action="成员" info={{
                subName: subjectData.name
            }} />
            (<SubjectCheckMainMembers />)
        </div>
    </>)
}

