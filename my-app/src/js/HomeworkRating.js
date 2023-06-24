import React, { useEffect, useState } from 'react';

// css引用
import styles from "../css/HomeworkRating.module.css"

// 组件引用
import { SubjectCheckNav } from "./IndividualSubjectCheck"
import { useLocation, useNavigate } from 'react-router';
import bootstrap from 'bootstrap/dist/js/bootstrap'

//工具模块
import * as Util from './Util'
import { Send } from './Connect'

// -------------------------------------------------------分割线-------------------------------------------------------

//单个 作业人员
const HomeworkMemberInfo = (props) => {
    // console.log("aaaaaaaaaaa");
    // console.log(props.work.score);
    //             annexfilepaths: "",
    //             comments: "",
    //             graded: false,
    //             score: ""
    const navigate = useNavigate()

    return (<>
        <div className={`${styles.homeworkMemberInfo} shadow-sm`}>
            <div className='fs-5'>
                <div className={`text-truncate`}>
                    {props.info.id}
                </div >
                <div className={`text-truncate`}>
                    {props.info.name}
                </div>
                <div className={`text-truncate`} id="isSumitted">
                    {props.work.annexfilepaths.length == 0 ? "未交" : (props.work.graded ? props.work.score : "未批")}
                </div>
            </div>
            <button className={`btn btn-outline-secondary btn-sm ${styles.checkThisHomework}`}
                onClick={(e) => {
                    let node = e.target.parentNode;
                    const toastLiveExample = document.getElementById('liveToast')
                    const toast = new bootstrap.Toast(toastLiveExample, { delay: 3000 })
                    if (node.querySelector("#isSumitted").innerHTML == "未交") {
                        toast.show()
                        return;
                    }

                    navigate("/HomeworkPreview", {
                        state: { maxGrade: props.maxGrade, annexFile: props.workData, email: props.email, workid: props.workid }
                    })
                }}>
                进入批阅
            </button>
        </div>
        <div className={`toast-container position-fixed bottom-0 end-0 p-3`}>
            <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-body fs-5 shadow-lg">
                    该同学未交作业，无法批阅！！！
                </div>
            </div>
        </div>
    </>)
}

// 人员显示
const HomeworkDetailed = (props) => {
    //不限 按钮 和 其状态
    const [all, setAll] = useState(true)
    const allMembers = document.getElementsByClassName(styles.homeworkMemberInfo);
    // 筛选条件
    const [filteredNums, setFilteredNums] = useState(0)
    const [condition, setCondition] = useState("")
    useEffect(() => {
        if (condition == "/") {
            searchItems("/")
        } else if (condition === "未批") {
            searchItems("未批")
        } else if (condition === "未交") {
            searchItems("未交")
        } else {
            showAllListItems()
        }
    }, [condition])

    // 渲染前接收数据
    useEffect(() => {
        if (props.subData == null || props.subData == undefined) {
            return
        }
        if (props.homeworkData == null || props.homeworkData == undefined) {
            return
        }

        getHomeworkMembers();
    }, [])

    // 发送请求 接收数据
    function getHomeworkMembers() {
        const msg = {
            api: 'reqworkinfo',
            subName: props.subData.subName,                     //课程名称
            name: props.homeworkData.homeworkName,              //作业名称
            id: ""                                              //作业id
        }
        Send(msg, (msg) => {
            if (msg.status)
                console.log('success');
            // 数据接收部分


        });
    }
    // 处理页面刷新/关闭事件
    function handleBeforeUnload(event) {
        event.preventDefault(); // 阻止默认行为
        // 执行你的逻辑，例如重新执行 getHomeworkMembers
    }


    // 接受 已批 未批 未交 人数 数组
    let nums = (props.homeworkData == null || props.homeworkData == undefined) ? [1, 1, 1] : props.homeworkData.interaction;
    // 筛选  ------------------------------------------------------------------------------------
    // 数组 存放每条成绩
    let listItems = [];

    // 获取列表中的所有列表项,存储到数组中
    for (let i = 0; i < allMembers.length; i++) {
        listItems.push(allMembers[i]);
    }

    // 遍历列表项,检查是否包含搜索值
    function searchItems(key) {
        listItems.forEach(listItem => {
            if (listItem.querySelector("#isSumitted").innerHTML.includes(key)) {
                listItem.style.display = "flex"
            }
            else {
                listItem.style.display = "none"
            }
        });
    }

    // 显示所有
    function showAllListItems() {
        listItems.forEach(item => {
            item.style.display = 'flex';
        });
    }
    //静态数据  所有成员成绩--------------------------------------------------------------------------------
    let allMemGrades = [{
        stuNum: "11111111",
        stuName: "许宏涛",
        submittedHW: "work1.file",
        isGraded: true,
        grade: "90",
        comment: ""
    },
    {
        stuNum: "22222222",
        stuName: "许宏",
        submittedHW: "work2.file",
        isGraded: false,
        grade: "",
        comment: ""
    },
    {
        stuNum: "33333333",
        stuName: "许",
        submittedHW: "",
        isGraded: false,
        grade: "",
        comment: ""
    }];
    // 作业信息
    let hwInfo = {
        has_graded: nums[0],                                  //已交成员
        no_graded: nums[1],                                   //未批成员
        no_summitted: nums[2],                                //未交成员
        max_score: (props.homeworkData == null || props.homeworkData == undefined) ? 100 : props.homeworkData.maxGrade                                         //满分值
    }

    //学生成员邮箱
    const stuMembers = props.subData.data.student_emails;
    // 学生信息
    const [stuMems, setStuMems] = useState([]);
    // 作业信息
    const [workData, setWorkData] = useState([]);

    function getSubMem() {
        let temp = [];

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
                            temp.push(msg.userdata)
                            if (i == stuMembers.length - 1)
                                resolve();
                        }
                        else {
                            console.log(msg.errcode);
                        }
                    })

                }
            });

            setStuMems(temp)
        })();
    }

    function getWorkData() {
        (async () => {
            let temp = [];
            //初始未交作业
            const workInfo = {
                annexfilepaths: "",
                comments: "",
                graded: false,
                score: ""
            };
            await new Promise((resolve, reject) => {
                for (let i = 0; i < stuMembers.length; i++) {
                    const msg = {
                        api: "reqsubedworkinfo",
                        work_id: props.homeworkData.data.id,
                        user_email: stuMembers[i],
                    }
                    Send(msg, (msg) => {
                        if (msg.status) {
                            console.log("所有作业请求成功");
                            temp.push(msg.workinfo)
                            if (i == stuMembers.length - 1)
                                resolve();
                        }
                        else {
                            temp.push({...workInfo})
                            console.log(msg.errcode);
                            if (i == stuMembers.length - 1)
                                resolve();
                        }
                    })

                }

            });

            setWorkData(temp)
        })();
    }

    useEffect(() => {
        getSubMem();
        getWorkData()
    }, [])

    useEffect(() => {
        console.log("----------------------------");
        console.log(workData);
    }, [workData])


    //分隔线---------------------------------------------------------
    // 渲染成员
    function renderMembers() {
        let list = []

        for (let i = 0; i < stuMems.length; i++) {
            list.push(<HomeworkMemberInfo info={stuMems[i]} work={workData[i]} maxGrade={hwInfo.max_score} email={stuMembers[i]} key={i} workid={props.homeworkData.data.id} />)
        }

        const memberComponents = list.map(component => component)
        return memberComponents
    }
    return (<>
        <div className={`${styles.homeworkDetailed} shadow-lg container`}>
            <div className={`${styles.homeworkDetailedTitle}`}>
                <div className={`${styles.homeworkName} fs-2`}>
                    {(props.homeworkData === null || props.homeworkData === undefined) ? "课程名" : props.homeworkData.homeworkName}
                </div>
                <div>
                    截止日期: {(props.homeworkData === null || props.homeworkData === undefined) ? "" : Util.formatTimestamp(props.homeworkData.deadline)}
                </div>
            </div>
            <div className={`divider`}></div>

            <div className={`${styles.filteringTools} fs-4 shadow-sm`}>
                <div>
                    已经筛选出<span id="stuFiltered">{filteredNums}</span>人 (全班共<span id='allStu'>{nums[0] + nums[1] + nums[2]}</span>人)
                </div>
                <div className={`${styles.filteredBar} fs-5`}>
                    <div>
                        成绩
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                            checked={all}
                            readOnly
                            onClick={(e) => {
                                setAll(true)
                                setCondition("")
                                setFilteredNums(nums[0] + nums[1] + nums[2])
                            }}

                        />
                        <label className="form-check-label" htmlFor="inlineRadio1">不限</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                            onClick={(e) => {
                                setAll(false)
                                setCondition("/")
                                setFilteredNums(nums[0])
                            }}
                        />
                        <label className="form-check-label" htmlFor="inlineRadio2">已批</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3"
                            onClick={(e) => {
                                setAll(false)
                                setCondition("未批")
                                setFilteredNums(nums[1])
                            }} />
                        <label className="form-check-label" htmlFor="inlineRadio3">未批</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4"
                            onClick={(e) => {
                                setAll(false)
                                setCondition("未交")
                                setFilteredNums(nums[2])
                            }} />
                        <label className="form-check-label" htmlFor="inlineRadio4">未交</label>
                    </div>
                </div>
            </div>

            <div className={`${styles.homeworkMembersTable} shadow`}>
                <div className={``}>
                    <button className={`btn btn-outline-secondary btn-lg`}
                        onClick={(e) => {
                            // renderMembers();

                            //发送消息


                        }}
                    >
                        一键催交
                    </button>
                </div>
                {renderMembers()}
            </div>
        </div>
    </>)
}

export default function HomeworkRating(props) {
    const location = useLocation();
    const state = (location.state == null || location.state === undefined) ? "" : location.state;;
    const subData = (state == null || state === undefined) ? null : state.subData;//课程数据
    const homeworkData = (state == null || state === undefined) ? null : state.homeworkData;//作业数据
    const user_Account = JSON.parse(localStorage.getItem('user_Account'));//用户数据

    return (<>
        <SubjectCheckNav subData={subData} homeworkData={homeworkData} action="学生作业" />
        <HomeworkDetailed subData={subData} homeworkData={homeworkData} />
    </>)
}