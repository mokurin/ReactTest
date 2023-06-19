import React from 'react';

// css引用
import styles from "../css/HomeworkRating.module.css"

// 组件引用
import { SubjectCheckNav } from "./IndividualSubjectCheck"
import { useLocation, useNavigate } from 'react-router';

//工具模块
import * as Util from './Util'
import { Send } from './Connect'

// 个人作业状态返回方法
function homeworkInfo(stuNum, name, workInfo) {
    return {
        stuNum: stuNum,
        name: name,
        workInfo: workInfo
    }
}
// -------------------------------------------------------分割线-------------------------------------------------------

//单个 作业人员
const HomeworkMemberInfo = (props) => {
    const navigate = useNavigate();

    return (<>
        <div className={`${styles.homeworkMemberInfo} shadow-sm`}>
            <div className='fs-5'>
                <div className={`text-truncate`}>
                    {props.info.stuNum}
                </div >
                <div className={`text-truncate`}>
                    {props.info.stuName}
                </div>
                <div className={`text-truncate`}>
                    {props.info.submittedHW.length != 0 ? (props.info.grade.length != 0 ? props.info.grade + "/" + props.maxGrade : "未批") : "未交"}
                </div>
            </div>
            <button className={`btn btn-outline-secondary btn-sm ${styles.checkThisHomework}`}
                onClick={(e) => {
                    navigate("/HomeworkPreview", {
                        state: { maxGrade: props.maxGrade, filePath: props.info.submittedHW, grade: props.info.grade }
                    })
                }}
            >
                进入批阅
            </button>
        </div>
    </>)
}
// 人员显示
const HomeworkDetailed = (props) => {
    //所有成员成绩
    let allMemGrades = [{
        stuNum: "121231111",
        stuName: "你好",
        submittedHW: "work.file",
        isGraded: true,
        grade: "90",
        comment: ""
    },
    {
        stuNum: "121231231",
        stuName: "你好啊",
        submittedHW: "work.file",
        isGraded: false,
        grade: "",
        comment: ""
    },
    {
        stuNum: "121233333",
        stuName: "好好好",
        submittedHW: "",
        isGraded: false,
        grade: "",
        comment: ""
    }];

    // 单条学生作业信息
    let stuGrade = {
        stuNum: "",                     //学号
        stuName: "",                    //学生名字
        submittedHW: "",                //作业 文件
        isGraded: "",                   //是否批阅
        grade: "",                      //成绩   
        comment: ""                     //留言
    }

    // 作业信息
    let hwInfo = {
        has_graded: props.homeworkData.interaction[0],                                  //已交成员
        no_graded: props.homeworkData.interaction[1],                                   //未批成员
        no_summitted: props.homeworkData.interaction[2],                                //未交成员
        max_score: props.homeworkData.maxGrade                                          //满分值
    }

    // 发送作业请求接受成员数据
    function getHomeworkMembers() {
        const msg = {
            api: '',
            subName: props.subData.subName,                     //课程名称
            name: props.homeworkData.homeworkName,              //作业名称
        }
        Send(msg, (msg) => {
            if (msg.status)
                console.log('成功发送请求');

            // 数据接收部分




        });
    }


    return (<>
        <div className={`${styles.homeworkDetailed} shadow-lg container`}>
            <div className={`${styles.homeworkDetailedTitle}`}>
                <div className={`${styles.homeworkName} fs-2`}>
                    {(props.homeworkData === null || props.homeworkData === undefined) ? "课程名" : props.homeworkData.homeworkName}
                </div>
                <div>
                    截止日期: {(props.homeworkData === null || props.homeworkData === undefined) ? "" : Util.getTime(props.homeworkData.deadline)}
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
                    <button className={`btn btn-outline-secondary btn-lg`}
                        onClick={(e) => {
                            //发送消息
                        }}
                    >
                        一键催交
                    </button>
                </div>
                <HomeworkMemberInfo info={allMemGrades[0]} maxGrade={hwInfo.max_score} />
                <HomeworkMemberInfo info={allMemGrades[1]} maxGrade={hwInfo.max_score} />
                <HomeworkMemberInfo info={allMemGrades[2]} maxGrade={hwInfo.max_score} />
            </div>
        </div>
    </>)
}

export default function HomeworkRating(props) {
    const location = useLocation();
    const state = (location.state == null || location.state === undefined) ? "" : location.state;;
    const subData = (state == null || state === undefined) ? null : state.subData;
    const homeworkData = (state == null || state === undefined) ? null : state.homeworkData;

    return (<>
        <SubjectCheckNav subData={subData} homeworkData={homeworkData} action="学生作业" />
        <HomeworkDetailed subData={subData} homeworkData={homeworkData} />
    </>)
}