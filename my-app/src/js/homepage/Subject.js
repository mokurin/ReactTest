import React from 'react';
import styles from '../../css/Main.module.css'
import FilingModal from './FilingModal'
import { archivedSubjects } from '../subject/ArchivedSubjects'


// 删除课程
function removeSubject(ele) {
    //前端
    let aimSubject = ele.target.parentNode.parentNode.parentNode.parentNode.parentNode;
    let btn = document.querySelector(".removeSubject")
    function removeSub() {
        aimSubject.remove();
        this.removeEventListener("click", removeSub);
    }
    btn.addEventListener("click", removeSub)

    //后端

}

//归档元素
function archiveCourse(ele, status) {
    let aimSubject = ele.target.parentNode.parentNode.parentNode.parentNode.parentNode;
    let btn = document.querySelector(".archiveSelf")
    function HideSub() {
        archivedSubjects.push(aimSubject)
        aimSubject.remove()
        this.removeEventListener("click", HideSub);
    }
    btn.addEventListener("click", HideSub)
}


//课程组件
function Subject(props) {
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
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#editSubject">
                                    编辑
                                </li>
                                <li className={`dropdown-item`}
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteSubject"
                                    onClick={
                                        removeSubject
                                    }
                                >
                                    删除
                                </li >
                                <li className={`dropdown-item`}
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#filingSubject"
                                    onClick={
                                        archiveCourse
                                    }
                                >
                                    归档
                                </li>
                            </ul>
                            {/* 对应操作的模态框显示 */}
                            <FilingModal data={{
                                title: "要删除此课程吗？",
                                id: "deleteSubject",
                            }} />
                            <FilingModal data={{
                                title: "要归档此课程吗？",
                                id: "filingSubject"
                            }} />
                            <FilingModal data={{
                                title: "课程编辑",
                                id: "editSubject"
                            }} />
                        </span>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Subject