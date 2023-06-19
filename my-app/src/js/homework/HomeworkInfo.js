import React, { useEffect, useState } from 'react';

// css引用
import styles from "../../css/SubjectInfo.module.css"

//工具模块
import * as Util from '../Util'

//组件引用
import InteractionTool from './InteractionTool'
import FilingModal from '../homepage/FilingModal'
import { useNavigate } from 'react-router';

// 单个作业
export const HomeworkInfo = (props) => {
    const [isOK, setIsOK] = useState(false);
    const { homeworkName, homeworkIntroduce, deadline, maxGrade, interaction } = props.data;
    const { id, updateHomeworkInfo, delHomeworkInfo, allHomeworkInfo } = props;
    const index = Number(id.substring(8));
    const navigate = useNavigate();

    //单击作业
    function handleNav(e) {
        const parentNode = document.getElementById('homeworkMore' + index);
        if (!parentNode.contains(e.target)) {
            //跳转作业详情页
            navigate('/HomeworkRating', {
                state: {
                    subData: props.subData,
                    homeworkData: props.data
                }
            })
        }
    }

    //删除当前作业
    function delHomework() {
        delHomeworkInfo(index);
    }

    const [editHomework, setEditHomework] = useState(props.data);
    function handleInputChange(e) {
        const value = e.target.value;
        const id = e.target.id;
        setEditHomework(prevState => {
            return {
                ...prevState,
                [id]: value
            }
        });
    }

    useEffect(() => {
        //当isOK为true时，保存编辑后的信息
        if (isOK) {
            new Promise((resolve, reject) => {
                updateHomeworkInfo(index, editHomework);
                resolve();
            }).then(() => {
                console.log(allHomeworkInfo);
                console.log(props.data);
            })
        }
    }, [isOK])

    return (<>
        <div onClick={handleNav} className={`${styles.homeworkInfo} shadow`}>
            <div className={`${styles.homeworkInfoHeader}`}>
                <div className={`${styles.homeworkInfoHeaderLeft}`}>
                    <div className={`${styles.homeworkType}`}>
                        个人作业
                    </div>
                </div>
                {Util.isTeacher("0") &&
                    <div id={'homeworkMore' + index}>
                        <div className={`${styles.homeworkInfoHeaderRight}`}
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                            ···
                        </div>
                        <ul className={`dropdown-menu`}>
                            <li className={`dropdown-item`}
                                id={'edi-' + props.id}
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target={"#editHomework" + index}
                                onClick={() => {
                                    setEditHomework(props.data);
                                }}
                            >
                                编辑
                            </li>
                            <li className={`dropdown-item`}
                                id={'del-' + props.id}
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target={"#deleteHomework" + index}
                            >
                                删除
                            </li >
                        </ul>
                        {/* 对应操作的模态框显示 */}
                        <FilingModal data={{
                            title: "作业编辑",
                            id: "editHomework" + index
                        }} homeworkDetailsData={editHomework}
                            handleInputChange={handleInputChange}
                            setIsOK={setIsOK}
                        />
                        <FilingModal data={{
                            title: "要删除此作业吗？",
                            id: "deleteHomework" + index
                        }} command={delHomework}
                        />
                    </div>
                }
            </div>
            <div className={`${styles.homeworkMainInfo}`}>
                <div className={`${styles.homeworkMainInfoLeft}`}>
                    <div className={`${styles.homeworkName} text-truncate fs-1`}>
                        {homeworkName}
                    </div>
                    <div className={`${styles.homeworkInfoDesc} text-truncate`}>
                        {homeworkIntroduce}
                    </div>
                </div>
                <div className={`${styles.homeworkMainInfoRight}`}>
                    {Util.isTeacher("0") ?
                        <div className={`${styles.homeworkSubmissionInfo}`}>
                            <InteractionTool name={'已批'} nums={interaction[0]} />
                            <InteractionTool name={'未批'} nums={interaction[1]} />
                            <InteractionTool name={'未交'} nums={interaction[2]} />
                        </div>
                        :
                        <div className={`${styles.homeworkSubmitted}`}>
                            <button className={`btn btn-primary`}>上传作业</button>
                        </div>}
                </div>
            </div>
            {Util.isTeacher("0") &&
                <div className={`${styles.homeworkAnnex}`}>
                    作业附件内容
                </div>
            }
            <div className={`${styles.homeworkDeadline}`}>
                截止日期: {Util.formatTimestamp(deadline)}
            </div>
        </div>
    </>);
}