import React, { useState } from 'react';
import styles from '../../css/Main.module.css'
import FilingModal from '../homepage/FilingModal'
import bootStrap from 'bootstrap/dist/js/bootstrap'
//课程信息
import { noArchivedSubjects, updateNoArchivedSubjects } from '../subject/NoArchivedSubjects'
import { archivedSubjects, updateArchivedSubjects } from '../subject/ArchivedSubjects'

// 归档排序的课程显示组件
export default function SmallSubject(props) {
    const [index] = useState(Number(props.id.substring(13)));

    //删除课程
    function removeSubject() {
        let subs = archivedSubjects;
        let data = [];

        for (let i = 0; i < subs.length; i++) {
            if (i !== index)
                data.push(subs[i]);
        }

        console.log(data);
        updateArchivedSubjects(data);
        props.setArchivedSub(data)
    }

    //恢复课程
    function restore() {
        //获取未归档课程
        let subs = noArchivedSubjects;
        //获取归档的课程
        let data = archivedSubjects;

        //恢复归档课程
        subs[subs.length] = data[index];

        //更新未归档课程
        updateNoArchivedSubjects(subs)
        props.setNoArchivedSub(subs)

        //删除归档课程
        removeSubject();
    }


    return (
        <>
            <div className={`${styles.smallSubject} shadow-sm`}>
                <div className={`${styles.smallSubjectTop}`}>
                    课程名：
                    <span className={`${styles.subName}`}>
                        {props.subject.name}
                    </span>
                </div>
                <div className={`${styles.subjectBottom} ${styles.subjectBottomTeacher}`}>
                    <span className={`${styles.teacherName}`}>
                        负责人： {props.subject.teacher}
                    </span>

                    <span className={`dropup dropup-center ${styles}`}>
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
                                type="button"
                                onClick={() => {
                                    const modal = new bootStrap.Modal('#restoreSubject' + props.id);
                                    modal.show();
                                }}
                            >
                                恢复
                            </li>
                            <li className={`dropdown-item`}
                                type="button"
                                onClick={() => {
                                    const modal = new bootStrap.Modal('#deleteArchiveSubject' + props.id);
                                    modal.show();
                                }}
                            >
                                删除
                            </li >
                        </ul>
                        {/* 对应操作的模态框显示 */}
                        <FilingModal data={{
                            title: "要恢复此课程吗？",
                            id: "restoreSubject" + props.id
                        }} command={restore}
                        />
                        <FilingModal data={{
                            title: "要删除此课程吗？",
                            id: "deleteArchiveSubject" + props.id
                        }} command={removeSubject}
                        />
                    </span>
                </div>
            </div>
        </>
    );
}