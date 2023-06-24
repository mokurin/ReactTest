import React, { useEffect, useState } from 'react';

// css引用
import styles from "../../css/SubjectInfo.module.css"

//工具模块
import * as Util from '../Util'

//组件引用
import InteractionTool from './InteractionTool'
import FilingModal from '../homepage/FilingModal'
import { useNavigate } from 'react-router';
import FileItems from '../files/FileItems'
import { Send } from '../Connect';

// 单个作业
export const HomeworkInfo = (props) => {
    const [isOK, setIsOK] = useState(false);
    const { homeworkName, homeworkIntroduce, deadline, maxGrade, interaction, data } = props.homeworkData;
    const { id, allHomeworkInfo, subData, RefreshHomeworks } = props;
    const index = Number(id.substring(8));
    const navigate = useNavigate();
    const user_Account = JSON.parse(localStorage.getItem('user_Account'));

    //单击作业
    function handleNav(e) {
        if (Util.isTeacher(user_Account.data.identity)) {
            const parentNode1 = document.getElementById('homeworkMore' + index);//三个点更多功能
            const parentNode2 = document.getElementById('homeworkAnnex' + index);//点击作业附件框内
            const parentNode3 = document.getElementById('submitHomeworkBt' + index)//提交作业按钮
            if (((parentNode1 !== null && parentNode2 !== null && parentNode3 == null) && (parentNode1 === null || !parentNode1.contains(e.target)) && (parentNode2 === null || !parentNode2.contains(e.target)))
                || ((parentNode1 == null && parentNode2 == null && parentNode3 !== null) && (parentNode3 === null || !parentNode3.contains(e.target)))) {
                //跳转作业详情页
                navigate('/HomeworkRating', {
                    state: {
                        subData: props.subData,
                        homeworkData: props.homeworkData
                    }
                })
            }
        }
    }

    //跳转提交作业页面
    const handleSubmitHomework = () => {
        navigate('/SubmitHomework', {
            state: {
                subData: props.subData,
                homeworkData: props.homeworkData
            }
        })
    }

    //删除当前作业
    function delHomework() {
        const msg = {
            api: 'delhomework',
            work_id: data.id,
            sub_id: subData.code
        };
        (async () => {
            const res = await new Promise((resolve, reject) => {
                Send(msg, res => {
                    resolve(res);
                })
            });
            if (res.status) {
                RefreshHomeworks();
            }
        })();

    }

    const [editHomework, setEditHomework] = useState(props.homeworkData);


    return (<>
        <div onClick={handleNav} className={`${styles.homeworkInfo} shadow`}>
            <div className={`${styles.homeworkInfoHeader}`}>
                <div className={`${styles.homeworkInfoHeaderLeft}`}>
                    <div className={`${styles.homeworkType}`}>
                        个人作业
                    </div>
                </div>
                {Util.isTeacher(user_Account.data.identity) &&
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
                                    console.log(props.homeworkData);
                                    setEditHomework({ ...props.homeworkData });
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
                            setIsOK={setIsOK}
                            isOK={isOK}
                            RefreshHomeworks={props.RefreshHomeworks}
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
                    {Util.isTeacher(user_Account.data.identity) ?
                        <div className={`${styles.homeworkSubmissionInfo}`}>
                            <InteractionTool name={'已批'} nums={interaction[0]} />
                            <InteractionTool name={'未批'} nums={interaction[1]} />
                            <InteractionTool name={'未交'} nums={interaction[2]} />
                        </div>
                        :
                        <div className={`${styles.homeworkSubmitted}`}>
                            <button id={'submitHomeworkBt' + index} onClick={handleSubmitHomework} className={`btn btn-primary`}>上传作业</button>
                        </div>}
                </div>
            </div>
            {Util.isTeacher(user_Account.data.identity) &&
                <div id={'homeworkAnnex' + index} className={`${styles.homeworkAnnex}`}>
                    <FileItems index={index} filePaths={data.annex_file_paths} />
                </div>
            }
            <div className={`${styles.homeworkDeadline}`}>
                截止日期: {Util.formatTimestamp(deadline)}
            </div>
        </div>
    </>);
}