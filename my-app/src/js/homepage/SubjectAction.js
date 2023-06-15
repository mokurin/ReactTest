import React, { useState } from 'react';
import styles from '../../css/Main.module.css'
import { noArchivedSubjects } from '../subject/NoArchivedSubjects'

// 课程排序 和 归档管理 模态框（相互切换）
function SubjectAction(props) {
    const [listItems] = useState(props.listItems);
    const [archivedItems] = useState(props.archivedItems);

    const sortedOK = () => {
        let subs = document.getElementById('sortedTable').childNodes;
        let subsSorted = [];//排序后的列表
        // 所有课程
        let subjects = noArchivedSubjects;

        for (let i = 0; i < subs.length; i++) {
            let index = Number(subs[i].id.substring(5));
            subsSorted[i] = subjects[index];
        }

        //更新拍好后的顺序
        props.addSubjects(subsSorted);
    }

    return (
        <>
            {/* 课程排序 */}
            <div
                className="modal modal-lg"
                id="subjectSorted"
                aria-hidden="true"
                tabIndex={-1}
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className={`modal-content ${styles.modalHeight}`}>
                        <div className={`${styles.SubjectActionHeader} shadow`}>
                            <div className={styles.subjectSorted}
                                data-bs-target="#subjectSorted"
                                data-bs-toggle="modal"
                            >
                                课程排序
                            </div>
                            <div className={styles.subjectManage}
                                data-bs-target="#subjectManage"
                                data-bs-toggle="modal">
                                归档管理
                            </div>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className={`${styles.myModalBodySorted} shadow rounded`} id='sortedTable'>
                                {/* 排序内容显示 */}
                                {listItems}
                            </div>
                        </div>
                        {/* 确认排序按钮 */}
                        <div className='modal-footer'>
                            <button className="btn btn-primary"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={sortedOK}
                            >
                                确认排序
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* 归档管理 */}
            <div
                className="modal"
                id="subjectManage"
                aria-hidden="true"
                tabIndex={-1}
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className={`modal-content ${styles.modalHeight}`}>
                        <div className={`${styles.SubjectActionHeader} shadow-lg`}>
                            <div className={styles.subjectSorted}
                                data-bs-target="#subjectSorted"
                                data-bs-toggle="modal">
                                课程排序
                            </div>
                            <div className={styles.subjectManage}
                                data-bs-target="#subjectManage"
                                data-bs-toggle="modal">
                                归档管理
                            </div>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className={`${styles.myModalBodyManage} shadow rounded`}>
                                {/* 已归档的课程显示 */}
                                {archivedItems}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SubjectAction