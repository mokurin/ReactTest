import React, { useState } from 'react';
import styles from '../../css/Main.module.css'
import FilingModal from './FilingModal'
import { noArchivedSubjects, updateNoArchivedSubjects } from '../subject/NoArchivedSubjects'


//课程组件
function Subject(props) {
    const [index] = useState(Number(props.id.substring(7)));

    // 删除课程
    function removeSubject() {
        let subs = noArchivedSubjects;
        let data = [];

        for (let i = 0; i < subs.length; i++) {
            if (i !== index)
                data.push(subs[i]);
        }

        updateNoArchivedSubjects(data);
        props.setNoArchivedSub(data)
    }

    //归档自己
    function archive() {
        
    }

    //归档全部
    function archiveAll() {
        
    }

    return (
        <>
            <div className={`${styles.subject} shadow`}>
                {/* 课程信息 */}
                <div className={styles.subjectTop}>
                    <div className={styles.subjectTime}>课程时间{props.data.createdTime}</div>
                    <div className={`${styles.subjectName} text-truncate`}>{props.data.name}</div>
                    <div className={styles.subjectClass}>课程班级：{props.data.class}</div>
                    <div className={styles.subjectCode}>课程代码：{props.data.code}</div>
                </div>
                {/* 课程负责人 操作组件 */}
                <div className={styles.subjectBottom}>
                    <div className={styles.subjectBottomTeacher}>
                        负责人：{props.data.teacher}
                    </div>
                    {/* 操作 */}
                    <div className={styles.subjectBottomAction}>
                        <span>置顶</span>
                        <span className={`dropup dropup-center`}>
                            <div
                                className={`${styles.dropdownHead}`}
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                ···
                            </div>
                            <ul className={`dropdown-menu`}>
                                <li className={`dropdown-item`}
                                    id={'edi-' + props.id}
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target={"#editSubject" + props.id}>
                                    编辑
                                </li>
                                <li className={`dropdown-item`}
                                    id={'del-' + props.id}
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target={"#deleteSubject" + props.id}
                                >
                                    删除
                                </li >
                                <li className={`dropdown-item`}
                                    id={'arc-' + props.id}
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target={"#filingSubject" + props.id}
                                >
                                    归档
                                </li>
                            </ul>
                            {/* 对应操作的模态框显示 */}
                            <FilingModal data={{
                                title: "要删除此课程吗？",
                                id: "deleteSubject" + props.id,
                            }}
                                command={{
                                    del: removeSubject
                                }}
                            />
                            <FilingModal data={{
                                title: "要归档此课程吗？",
                                id: "filingSubject" + props.id
                            }}
                                command={{
                                    arc: archive,
                                    arcAll: archiveAll
                                }}
                            />
                            <FilingModal data={{
                                title: "课程编辑",
                                id: "editSubject" + props.id
                            }} />
                        </span>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Subject