import React, { useState } from 'react';
import styles from '../../css/Main.module.css'
import FilingModal from './FilingModal'
//课程信息
import { noArchivedSubjects, updateNoArchivedSubjects, getSubByCode, updateSubject } from '../subject/NoArchivedSubjects'
import { archivedSubjects, updateArchivedSubjects, requestArchiveAll } from '../subject/ArchivedSubjects'
import { useNavigate } from 'react-router';


//课程组件
function Subject(props) {
    const [index] = useState(Number(props.id.substring(7)));
    const [subData, setSubData] = useState(props.noArchivedSub[index]);
    const navigate = useNavigate();

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
        //获取未归档课程
        let subs = noArchivedSubjects;
        //获取归档的课程
        let data = archivedSubjects;

        //添加新归档课程
        data[data.length] = subs[index]

        //更新归档课程
        updateArchivedSubjects(data)
        props.setArchivedSub(data)

        //删除未归档课程
        removeSubject();
    }

    //归档全部
    function archiveAll() {
        //获取未归档课程
        let subs = noArchivedSubjects;
        requestArchiveAll(subs[index]);
        //归档个人
        archive();
    }

    //编辑课程
    function editSubject(data) {
        //获取旧课程信息
        let sub = { ...props.noArchivedSub[index] }

        //更新课程信息
        sub.createdTime = data.createdTime;
        sub.name = data.name;
        sub.class = data.class;
        setSubData(sub);
        // updateSubject(sub);
        new Promise((resolve, reject) => {
            if (updateSubject(sub)) {
                let newSubs = []
                for (let i in noArchivedSubjects) {
                    newSubs[i] = noArchivedSubjects[i];
                }
                resolve(newSubs);
            }
            else reject();
        }).then((result) => {
            props.setNoArchivedSub(result);
            return true;
        }).catch(() => {
            return false;
        })
    }

    function getSubData() {
        return props.noArchivedSub[index];
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSubData((prevSubData) => ({
            ...prevSubData,
            [name]: value,
        }));
    };

    function handleNav() {
        // navigate('/')
    }

    return (
        <>
            <div className={`${styles.subject} ${styles.no_select} shadow`}>
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
                                    data-bs-target={"#editSubject" + index}
                                    onClick={() => {
                                        setSubData(getSubData);
                                    }}
                                >
                                    编辑
                                </li>
                                <li className={`dropdown-item`}
                                    id={'del-' + props.id}
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target={"#deleteSubject" + index}
                                >
                                    删除
                                </li >
                                <li className={`dropdown-item`}
                                    id={'arc-' + props.id}
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target={"#filingSubject" + index}
                                >
                                    归档
                                </li>
                            </ul>
                            {/* 对应操作的模态框显示 */}
                            <FilingModal data={{
                                title: "要删除此课程吗？",
                                id: "deleteSubject" + index
                            }}
                                command={removeSubject}
                            />
                            <FilingModal data={{
                                title: "要归档此课程吗？",
                                id: "filingSubject" + index
                            }}
                                command={{
                                    arc: archive,
                                    arcAll: archiveAll
                                }}
                            />
                            <FilingModal data={{
                                title: "课程编辑",
                                id: "editSubject" + index
                            }} sub={subData}
                                handleInputChange={handleInputChange}
                                command={editSubject}
                            />
                        </span>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Subject