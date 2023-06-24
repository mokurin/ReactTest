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
    const { teaMembers, stuMembers, setTeaMember, setStuMembers } = props

    useEffect(() => {
    }, [teaMembers])


    //  ----- 检索 -----
    //  成员列表
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
                    >教师团队 ({teaMembers.length}) {/* 从后端拿数据提前渲染 */} </div>
                    <div className={`${styles.subjectMemberStudents}`}
                        onClick={(e) => {
                            setStatus(true)
                        }}
                    >全部学生 ({stuMembers.length}) {/* 从后端拿数据提前渲染 */} </div>
                </div>
                {/* 老师 和 学生 显示区域 */}
                {status ? <StuManaged stuMembers={stuMembers} stuMails={props.stuMails} /> : <TeacherManaged teaMembers={teaMembers} teaMails={props.teaMails} />}
            </div>
        </div>
    </>);
}
//学生管理区域
const StuManaged = (props) => {
    const { stuMembers } = props;
    const stuMemsEmails = props.stuMails;

    useEffect(() => {
        // console.log("--------------------------------------------------");
        // console.log(stuMembers);
    }, [stuMembers])

    function returnStuELes() {
        let list = []
        for (let i = 0; i < stuMembers.length; i++) {
            list.push(<SubjectMemberInfo info={stuMembers[i]} email={stuMemsEmails[i]} key={i} />)
        }

        const memberComponents = list.map(component => component)
        return memberComponents;
    }

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
                {returnStuELes()}
                {/* <SubjectMemberInfo info={createdStuInfo("12123020406", "许宏涛", "Yomiger@163.com")} />
                <SubjectMemberInfo info={createdStuInfo("12123020401", "宏涛", "Yomiger@163.com")} />
                <SubjectMemberInfo info={createdStuInfo("12123020402", "许", "Yomiger@163.com")} /> */}
            </div>
        </div>
    </>)
}
// 老师显示区域
const TeacherManaged = (props) => {
    const { teaMembers } = props;
    const teaMemEmails = props.teaMails;


    useEffect(() => {
        console.log("--------------------------------------------------");
        console.log(teaMembers);
    }, [teaMembers])

    function returnTeaELes() {
        let list = []
        for (let i = 0; i < teaMembers.length; i++) {
            if (i == teaMembers.length - 1)
                list.push(<SubjectTeacherInfo info={teaMembers[i]} email={teaMemEmails[i]} status="c" key={i} />)
            else {
                list.push(<SubjectTeacherInfo info={teaMembers[i]} email={teaMemEmails[i]} status="t" key={i} />)
            }
        }

        const memberComponents = list.map(component => component)
        return memberComponents;
    }


    return (<>
        <div className={`${styles.SubjectAllTeachers}`}>
            {/* <div className={`${styles.SubjectMemberInfoTableNav}`}>
                <button className={`btn btn-outline-secondary btn-sm ms-2`}>
                    添加 助教/老师
                </button>
            </div> */}
            {returnTeaELes()}
        </div>
    </>)
}

//单条学生成员信息
export const SubjectMemberInfo = (props) => {
    const location = useLocation();
    const state = (location.state == null || location.state === undefined) ? "" : location.state;

    //课程数据
    let subData = state.subData;
    console.log("-------------------------");
    console.log(subData.data.id);


    //删除按钮事件
    function deleteSelf(e) {
        let deletedEle = e.target.parentNode
        //删除存放和删除
        deletedMember.push(deletedEle)
        deletedEle.remove()
        checkNumsOfChecked()

        document.getElementsByClassName(styles.subjectMemberStudents)[0].innerHTML = "全部学生 (" + document.getElementsByClassName(styles.SubjectMemberInfo).length + ")";


        // 后端部分
        const msg = {
            api: "erasesubmember",
            sub_id: subData.data.id,
            user_email: props.email

        }
        Send(msg, (msg) => {
            if (msg.status) {
                console.log("删除成功");
            }
            else {
                console.log(msg.errcode);
            }
        })
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
                    {props.info.id}
                </div >
                <div className={`text-truncate`} id='stuName'>
                    {props.info.name}
                </div>
                <div className={`text-truncate`}>
                    {props.email}
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
    const location = useLocation();
    const state = (location.state == null || location.state === undefined) ? "" : location.state;

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
                    {props.info.name}
                </div >
                <div className={`text-truncate`}>
                    {props.email}
                </div>
                <div className={`text-truncate`}>
                    {props.status == "c" ? "管理员" : "助教管理员"}
                </div>
            </div>
            <button className={`btn btn-outline-secondary btn-sm ${styles.deleteThisMember}`} id='techerDeleted'
                onClick={(e) => {
                    if (document.getElementsByClassName(styles.teacherMemberInfo).length == 1)
                        return


                    deleteSelf(e)
                }}
            >删除</button>
        </div>
    </>)
}

export default function IndividualSubjectCheck(props) {
    const location = useLocation();
    const state = (location.state == null || location.state === undefined) ? "" : location.state;
    const user_Account = JSON.parse(localStorage.getItem('user_Account'));


    const [stuMems, setStuMems] = useState([]);
    const [teaMems, setTeaMems] = useState([]);

    //学生成员邮箱
    const stuMembers = state.subData.data.student_emails;
    //老师成员邮箱
    const teaMembers = state.subData.data.teacher_emails.concat(state.subData.data.creator_email)

    function getSubMem() {
        let temp1 = [];
        let temp2 = [];

        (async () => {
            await new Promise((resolve, reject) => {
                for (let i = 0; i < stuMembers.length; i++) {
                    const msg = {
                        api: "requserinfo",
                        email: stuMembers[i],
                    }
                    Send(msg, (msg) => {
                        if (msg.status) {
                            console.log("请求成功");
                            temp1.push(msg.userdata)
                            if (i == stuMembers.length - 1)
                                resolve();
                        }
                        else {
                            console.log(msg.errcode);
                        }
                    })

                }
            });

            setStuMems(temp1)
        })();


        (async () => {
            await new Promise((resolve, reject) => {
                for (let i = 0; i < teaMembers.length; i++) {
                    const msg = {
                        api: "requserinfo",
                        email: teaMembers[i],
                    }
                    Send(msg, (msg) => {
                        if (msg.status) {
                            console.log("请求成功");
                            temp2.push(msg.userdata)
                            if (i == teaMembers.length - 1)
                                resolve();
                        }
                        else {
                            console.log(msg.errcode);
                        }
                    })

                }
            });

            setTeaMems(temp2)
        })();
    }

    useEffect(() => {
        getSubMem()
    }, [])

    useEffect(() => {
        // console.log("-------------------------");
        // console.log(stuMems);
        // console.log(teaMems);
    }, [stuMems, teaMems])


    return (<>
        <div className={`${styles.subjectCheckPage}`}>
            <SubjectCheckNav action="成员" subData={state.subData} />
            (<SubjectCheckMainMembers stuMembers={stuMems} setStuMembers={setStuMems} teaMembers={teaMems} setTeaMembers={setTeaMems} stuMails={stuMembers} teaMails={teaMembers} />)
        </div>
    </>)
}

