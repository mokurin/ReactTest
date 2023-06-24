import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
// css
import styles from '../css/Main.module.css'
// 组件引用
import SubjectAction from './homepage/SubjectAction';
import SubjectItems from './homepage/SubItems/SubjectItems'
import FilingModal from './homepage/FilingModal'

// 图标
import logo from '../img/logo.png'
import ProfilePicture from '../img/profile.png'
import bell from '../img/bell.svg'
import Plus from '../img/plus-lg.svg'
import Msg from '../img/envelope.svg'
import help from '../img/question-circle.svg'
import Sort from '../img/sort-down-alt.svg'
import fileCtrl from '../img/files-alt.svg'

//课程信息引用
import { noArchivedSubjects, updateNoArchivedSubjects } from './subject/NoArchivedSubjects'
import { archivedSubjects, updateArchivedSubjects } from './subject/ArchivedSubjects'
import subjectInfo, { getAllSubs } from './subject/SubjectInfo'
import { Send, afterOpen } from './Connect';

//工具模块
import * as Util from './Util'



function Main(props) {
    const [noArchivedSub, setNoArchivedSub] = useState(noArchivedSubjects);
    const [archivedSub, setArchivedSub] = useState(archivedSubjects);
    const navigate = useNavigate();
    const user_Account = JSON.parse(localStorage.getItem('user_Account'));


    //处理页面加载
    useEffect(() => {
        console.log(user_Account);
        if (user_Account !== null && user_Account !== undefined) {
            afterOpen(() => {
                const msg = {
                    api: 'login',
                    email: user_Account.email,
                    passwd: user_Account.passwd
                }
                Send(msg, (msg) => {
                    if (msg.status) {//登录成功
                        (async () => {
                            try {
                                //请求所有课程数据
                                await getAllSubs(user_Account.data.unarchived_subject_ids,
                                    user_Account.data.archived_subject_ids);
                                //请求完成则加载内容
                                setNoArchivedSub(noArchivedSubjects);
                                setArchivedSub(archivedSubjects);
                            } catch (error) {
                                //请求失败则加载到登录页面
                                navigate('/Login');
                            }
                        })();
                    } else {//登录失败
                        alert(msg.errcode);
                    }
                })
            });
        } else {
            //未登录则加载到登录页面
            navigate('/Login');
        }
    }, [])


    //创建课程
    function handleCreateSub(sub) {
        (async () => {
            const msg = {
                api: 'createsub',
                term: sub.createdTime,  //学期
                title: sub.name,        //课程名
                klass_ids: sub.class.split(',')    //班级
            }

            //发送创建
            const create = (msg) => {
                return new Promise((resolve, reject) => {
                    Send(msg, (res) => {
                        if (res.status) {
                            resolve(res);
                        } else {
                            reject(res);
                        }
                    });
                });
            };

            //向服务端发送创建课程请求
            const res = await create(msg);
            if (res.status) {
                user_Account.data.unarchived_subject_ids.push(res.id);
                localStorage.setItem('user_Account', JSON.stringify(user_Account));
                await getAllSubs(user_Account.data.unarchived_subject_ids,
                    user_Account.data.archived_subject_ids);//重新获取所有信息
            }

            //重新设置课程信息
            setNoArchivedSub(noArchivedSubjects);
            setArchivedSub(archivedSubjects);
        })();
    }

    //加入课程
    function joinSubject() {
        (async () => {
            const subCode = Number(document.getElementById('SubCode').value);

            const join = () => {
                return new Promise((resolve, reject) => {
                    const msg = {
                        api: 'joinsub',
                        sub_id: subCode
                    }
                    Send(msg, res => {
                        resolve(res);
                    });
                })
            }

            const res = await join();
            if (res.status) {
                user_Account.data.unarchived_subject_ids.push(subCode);
                localStorage.setItem('user_Account', JSON.stringify(user_Account));
                await getAllSubs(user_Account.data.unarchived_subject_ids,
                    user_Account.data.archived_subject_ids);//重新获取所有信息

                document.getElementById('joinTip').innerHTML = '加入成功';
            }
            document.getElementById('joinTip').innerHTML = res.errcode;
        })();
    }


    return (
        <>
            {/* 导航栏 */}
            <div className={`${styles.navigation} bg-body-tertiary container fixed-top shadow-lg rounded`}>
                <div className={styles.left}>
                    <div>
                        <img src={logo} alt="" className={styles.logo} />
                    </div>
                    <div className={`${styles.select} ${styles.selected}`}>课堂</div>
                </div>
                <div className={`${styles.right}`}>
                    <div>
                        <img src={bell} alt="" />
                        <span id='haveMsg' className="position-relative translate-middle badge border border-light rounded-circle bg-danger p-1"><span></span></span>
                    </div>
                    <div className="">
                        <img src={ProfilePicture} alt="" className={styles.profile} />
                    </div>
                </div>
            </div>
            {/* 课程显示 */}
            <div className={`${styles.content} container shadow-sm`}>
                <div className={styles.contentNav}>
                    <div className={styles.contentNavLeft}>
                        <div>全部课程</div>
                    </div>
                    <div className={styles.contentNavRight}>
                        <div
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#subjectSorted"
                            onClick={() => {
                                console.log(noArchivedSub);
                                // setNoArchivedSub([...noArchivedSubjects]);
                                // setArchivedSub([...archivedSubjects]);
                            }}
                        >
                            <img src={Sort} alt="" />
                            课程排序
                        </div>
                        <div
                            type="button"
                            data-bs-target="#subjectManage"
                            data-bs-toggle="modal"
                            onClick={() => {
                                setNoArchivedSub(noArchivedSubjects);
                                setArchivedSub(archivedSubjects);
                            }}
                        >
                            <img src={fileCtrl} alt="" />
                            归档管理
                        </div>

                        {/* 课程排序 和 归档管理 的模态框 */}
                        <SubjectAction setNoArchivedSub={setNoArchivedSub} setArchivedSub={setArchivedSub}
                            noArchivedSub={noArchivedSub} archivedSub={archivedSub} />

                        <div className={`btn btn-primary ${styles.contentNavRightBtn}`}
                            data-bs-toggle="modal" data-bs-target="#joinSub-modal">
                            +加入课程
                        </div>

                        {/* 加入课程模态框 */}
                        <div className="modal fade" tabIndex="-1" id='joinSub-modal'>
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">加入课程</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="col-md-4">
                                            <label htmlFor="validationCustom01" className="form-label">请输入课程码</label>
                                            <input type="text" className="form-control" id="SubCode" required />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                                        <button onClick={joinSubject} type="button" className="btn btn-primary"
                                            data-bs-target="#tip-modal" data-bs-toggle="modal"
                                        >
                                            加入课程
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 加入课程提示模态框 */}
                        <div className="modal fade" id="tip-modal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">提示</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <span id='joinTip'></span>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-primary" data-bs-target="#joinSub-modal" data-bs-toggle="modal">确定</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.divider} shadow-sm`} />
                {/* 课程框 */}
                <div className={styles.subjects}>
                    {/* 所有课程 */}
                    <SubjectItems setNoArchivedSub={setNoArchivedSub} noArchivedSub={noArchivedSub}
                        archivedSub={archivedSub} setArchivedSub={setArchivedSub} />


                    {/* 创建课程 */}
                    {(() => {
                        if (Util.isTeacher((user_Account === null || user_Account === undefined) ? 's' : user_Account.data.identity)) {
                            return (
                                <>
                                    <div className={`${styles.subject} ${styles.no_select} shadow`}
                                        data-bs-toggle="modal"
                                        data-bs-target={"#createSubject"}>
                                        <div className={styles.addSubjectTop}>
                                        </div>
                                        <div className={styles.addSubjectBottom}>
                                            <img src={Plus} alt="" />
                                            <div>创建课程</div>
                                        </div>
                                    </div>
                                    <FilingModal data={{
                                        title: "课程编辑",
                                        id: "createSubject"
                                    }}
                                        command={handleCreateSub}
                                    />
                                </>
                            )
                        }
                    })()}

                </div>
            </div>

        </>
    )
}

export default Main;