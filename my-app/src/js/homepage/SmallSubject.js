import React, { useState } from 'react';
import styles from '../../css/Main.module.css'
import FilingModal from '../homepage/FilingModal'
import bootStrap from 'bootstrap/dist/js/bootstrap'
//课程信息
import { noArchivedSubjects, updateNoArchivedSubjects } from '../subject/NoArchivedSubjects'
import { archivedSubjects, updateArchivedSubjects } from '../subject/ArchivedSubjects'
import { Send } from '../Connect';

// 归档排序的课程显示组件
export default function SmallSubject(props) {
    const [index] = useState(Number(props.id.substring(13)));
    const user_Account = JSON.parse(localStorage.getItem('user_Account'));

    //删除课程
    function removeSubject() {
        let subs = archivedSubjects;
        let ids = [];//删除后的未归档课程码
        let data = [];//删除后的未归档课程

        for (let i = 0; i < subs.length; i++) {
            if (i !== index) {
                data.push(subs[i]);
                ids.push(subs[i].code);
            }
        }

        //更新后端，成功则更新前端
        const msg = {
            api: 'updateuserinfo',
            user: {
                email: user_Account.email,
                name: user_Account.data.name,
                archived_subject_ids: ids,
                unarchived_subject_ids: user_Account.data.unarchived_subject_ids
            }
        }
        Send(msg, res => {
            if (res.status) {
                //更新前端
                user_Account.data.archived_subject_ids = ids;
                localStorage.setItem('user_Account', JSON.stringify(user_Account));
                updateArchivedSubjects(data);
                props.setArchivedSub(data)
            } else {
                console.log(res.errcode);
            }
        })
    }

    //恢复课程
    function restore() {
        //获取未归档课程
        let subs = noArchivedSubjects;
        //获取归档的课程
        let data = archivedSubjects;

        //新未归档ids
        let newNoArchivedSub_ids = [];
        //新归档ids
        let newArchivedSub_ids = [];

        //恢复归档课程
        subs[subs.length] = data[index];
        for (let i in subs) {
            newNoArchivedSub_ids.push(subs[i].code);
        }
        data.splice(index, 1);
        for (let i in data) {
            newArchivedSub_ids.push(data[i].code);
        }

        //更新后端，成功的话更新前端
        const msg = {
            api: 'updateuserinfo',
            user: {
                email: user_Account.email,
                name: user_Account.data.name,
                archived_subject_ids: newArchivedSub_ids,
                unarchived_subject_ids: newNoArchivedSub_ids
            }
        }
        Send(msg, res => {
            if (res.status) {
                //更新前端
                user_Account.data.archived_subject_ids = newArchivedSub_ids;
                user_Account.data.unarchived_subject_ids = newNoArchivedSub_ids;
                localStorage.setItem('user_Account', JSON.stringify(user_Account));
                updateNoArchivedSubjects([...subs]);
                props.setNoArchivedSub([...subs]);
                updateArchivedSubjects([...data]);
                props.setArchivedSub([...data]);
            }
        })


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