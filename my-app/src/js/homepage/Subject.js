import React, { useState } from 'react';
import styles from '../../css/Main.module.css'
import FilingModal from './FilingModal'
import { useNavigate } from 'react-router';
//课程信息
import * as NoArchivedSubjects from '../subject/NoArchivedSubjects'
import * as ArchivedSubjects from '../subject/ArchivedSubjects'
import { getAllSubs } from '../subject/SubjectInfo'
//工具模块
import * as Util from '../Util'


//课程组件
function Subject(props) {
    const [index] = useState(Number(props.id.substring(7)));
    const [subData, setSubData] = useState(props.noArchivedSub[index]);
    const navigate = useNavigate();
    const user_Account = JSON.parse(localStorage.getItem('user_Account'));

    // 删除课程
    function removeSubject() {
        let subs = NoArchivedSubjects.noArchivedSubjects;
        let data = [];

        (async () => {
            const flag = await NoArchivedSubjects.delSubject(subs[index]);
            if (flag !== true)
                alert(flag);

            for (let i = 0; i < subs.length; i++) {
                if (i !== index)
                    data.push(subs[i]);
            }

            var i = user_Account.data.unarchived_subject_ids.indexOf(subs[index].code);
            if (i !== -1)
                user_Account.data.unarchived_subject_ids.splice(i, 1);
            localStorage.setItem('user_Account', JSON.stringify(user_Account));
            NoArchivedSubjects.updateNoArchivedSubjects(data);
            props.setNoArchivedSub(data)
        })();
    }

    //归档自己
    function archive() {
        (async()=>{

        })();
        //获取未归档课程
        let subs = NoArchivedSubjects.noArchivedSubjects;
        //获取归档的课程
        let data = ArchivedSubjects.archivedSubjects;

        //添加新归档课程
        data[data.length] = subs[index]

        //更新归档课程
        ArchivedSubjects.updateArchivedSubjects(data)
        props.setArchivedSub(data)

        //删除未归档课程
        // removeSubject();
    }

    //归档全部
    function archiveAll() {
        (async () => {
            //获取未归档课程
            let subs = NoArchivedSubjects.noArchivedSubjects;
            const res = await ArchivedSubjects.requestArchiveAll(subs[index]);
            if (res.status) {
                //删除在未归档的课程
                var i = user_Account.data.unarchived_subject_ids.indexOf(subs[index].code);
                if (i !== -1)
                    user_Account.data.unarchived_subject_ids.splice(i, 1);

                //加入到归档课程
                user_Account.data.archived_subject_ids.push(subs[index].code);

                localStorage.setItem('user_Account', JSON.stringify(user_Account));
                await getAllSubs(user_Account.data.unarchived_subject_ids,
                    user_Account.data.archived_subject_ids);//重新获取所有信息

                //重新设置课程信息
                props.setNoArchivedSub(NoArchivedSubjects.noArchivedSubjects);
                props.setArchivedSub(ArchivedSubjects.archivedSubjects);
            } else console.log(res.errcode);
        })();
    }

    //编辑课程
    function editSubject(data) {
        (async () => {
            //获取旧课程信息
            let sub = { ...props.noArchivedSub[index] }

            //获取新课程信息
            sub.createdTime = data.createdTime;
            sub.data.term = data.createdTime;
            sub.name = data.name;
            sub.data.title = data.name;
            sub.class = data.class;
            sub.data.klass_ids = data.class.split(',');

            const flag = await NoArchivedSubjects.updateSubject(sub);

            if (flag) {
                //更新前端
                let subs = [];
                for (let i = 0; i < NoArchivedSubjects.noArchivedSubjects.length; i++)
                    if (NoArchivedSubjects.noArchivedSubjects[i].code === sub.code)
                        subs.push(sub);
                    else subs.push(NoArchivedSubjects.noArchivedSubjects[i]);
                NoArchivedSubjects.updateNoArchivedSubjects(subs);
                props.setNoArchivedSub(subs);
            }
        })();
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

    //单击课程
    function handleNav(e) {
        const parentNode = document.getElementById('subOption' + index);
        if (!parentNode.contains(e.target)) {
            //跳转课程详情页
            navigate('/SubjectInfo', {
                state: {
                    subData: subData
                }
            })
        }
    }

    return (
        <>
            <div onClick={handleNav} className={`${styles.subject} ${styles.no_select} shadow`}>
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
                    <div id={'subOption' + index} className={styles.subjectBottomAction}>
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
                                {(() => {
                                    if (Util.isTeacher(user_Account.data.identity)) {
                                        return (
                                            <>
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
                                            </>
                                        )
                                    }
                                })()}
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
                            {(() => {
                                if (Util.isTeacher(user_Account.data.identity)) {
                                    return (
                                        <>
                                            <FilingModal data={{
                                                title: "要删除此课程吗？",
                                                id: "deleteSubject" + index
                                            }}
                                                command={removeSubject}
                                            />
                                            <FilingModal data={{
                                                title: "课程编辑",
                                                id: "editSubject" + index
                                            }} sub={subData}
                                                handleInputChange={handleInputChange}
                                                command={editSubject}
                                            />
                                        </>
                                    )
                                }
                            })()}
                            <FilingModal data={{
                                title: "要归档此课程吗？",
                                id: "filingSubject" + index
                            }}
                                command={{
                                    arc: archive,
                                    arcAll: archiveAll
                                }}
                            />
                        </span>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Subject