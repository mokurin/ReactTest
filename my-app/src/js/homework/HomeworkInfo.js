import React from 'react';

// css引用
import styles from "../../css/SubjectInfo.module.css"

//工具模块
import * as Util from '../Util'

//组件引用
import InteractionTool from './InteractionTool'
import FilingModal from '../homepage/FilingModal'

// 单个作业
export const HomeworkInfo = (props) => {
    const { homeworkName, homeworkIntroduce, deadline, maxGrade } = props.data;
    const { interaction, id } = props;
    const index = Number(id.substring(8));

    return (<>
        <div className={`${styles.homeworkInfo} shadow`}>
            <div className={`${styles.homeworkInfoHeader}`}>
                <div className={`${styles.homeworkInfoHeaderLeft}`}>
                    <div className={`${styles.homeworkType}`}>
                        个人作业
                    </div>
                </div>
                {Util.isTeacher("0") &&
                    <>
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
                        }}
                        />
                        <FilingModal data={{
                            title: "要删除此作业吗？",
                            id: "deleteHomework" + index
                        }}
                        />
                    </>
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
                截止日期: {Util.getTime(deadline)}
            </div>
        </div>
    </>);
}