import React from 'react';
import styles from '../../css/Main.module.css'
import FilingModal from '../homepage/FilingModal'

// 归档排序的课程显示组件
export default function SmallSubject(props) {
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
                                data-bs-toggle="modal"
                                data-bs-target="#restoreSubject">
                                onClick={() => {

                                }}
                                恢复
                            </li>
                            <li className={`dropdown-item`}
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteArchiveSubject"
                                onClick={() => {
                                    
                                }}
                            >
                                删除
                            </li >
                        </ul>
                        {/* 对应操作的模态框显示 */}
                        <FilingModal data={{
                            title: "要恢复此课程吗？",
                            id: "restoreSubject"
                        }} />
                        <FilingModal data={{
                            title: "要删除此课程吗？",
                            id: "deleteArchiveSubject",
                        }} />
                    </span>
                </div>
            </div>
        </>
    );
}