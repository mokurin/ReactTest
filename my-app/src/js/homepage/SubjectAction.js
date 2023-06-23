import React, { useEffect, useState } from 'react';
import styles from '../../css/Main.module.css'
import { noArchivedSubjects, updateNoArchivedSubjects } from '../subject/NoArchivedSubjects'
//组件
import SubjectSortedBarItems from '../homepage/SubItems/SubjectSortedBarItems'
import SmallSubjectItems from '../homepage/SubItems/SmallSubjectItems'
import { Send } from '../Connect';

// 课程排序 和 归档管理 模态框（相互切换）
function SubjectAction(props) {
    const { setNoArchivedSub, noArchivedSub, archivedSub, setArchivedSub } = props
    const user_Account = JSON.parse(localStorage.getItem('user_Account'));


    //排序内容
    const [sortedContent, setSortedContent] = useState(noArchivedSub);
    //刷新排序内容
    useEffect(() => {
        setSortedContent(noArchivedSub)
    }, [noArchivedSub]);
    //确认排序
    const sortedOK = () => {
        let subsSorted_ids = [];// 排序后的课程码列表

        for (let i = 0; i < sortedContent.length; i++) {
            subsSorted_ids[i] = sortedContent[i].code;
        }

        //更新后端,成功后更新前端
        const msg = {
            api: 'updateuserinfo',
            user: {
                email: user_Account.email,
                name: user_Account.data.name,
                archived_subject_ids: user_Account.data.archived_subject_ids,
                unarchived_subject_ids: subsSorted_ids
            }
        }
        Send(msg, res => {
            if (res.status) {
                //更新拍好后的顺序
                user_Account.data.unarchived_subject_ids = subsSorted_ids;
                localStorage.setItem('user_Account', JSON.stringify(user_Account));
                updateNoArchivedSubjects(sortedContent);
                props.setNoArchivedSub(sortedContent);
            } else {
                console.log(res.errcode);
            }
        });
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
                            <div className={`${styles.subjectSorted} ${styles.selected}`}
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
                                <SubjectSortedBarItems noArchivedSub={sortedContent} setNoArchivedSub={setSortedContent} />
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
            </div >
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
                            <div className={`${styles.subjectManage} ${styles.selected}`}
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
                                <SmallSubjectItems setArchivedSub={setArchivedSub}
                                    archivedSub={archivedSub}
                                    setNoArchivedSub={setNoArchivedSub}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default SubjectAction