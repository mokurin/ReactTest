import { Send } from '../Connect'
import { updateNoArchivedSubjects, noArchivedSubjects } from '../subject/NoArchivedSubjects'
import { updateArchivedSubjects } from '../subject/ArchivedSubjects'

//构造课程方法
export default function subjectInfo(CreatedTime, name, subClass, code, teacher, data) {
    return {
        createdTime: CreatedTime,//学期
        name: name,//课程名
        class: subClass,//班级
        code: code,//课程代码
        teacher: teacher,//老师
        data: data //该课程的所有数据
    };
}

//请求所有课程
export function getAllSubs(noArchived_ids, archived_ids) {
    return new Promise((resolve, reject) => {
        //请求单个课程信息
        const getSubject = (msg) => {
            return new Promise((resolve, reject) => {
                Send(msg, res => {
                    if (res.status) {
                        resolve(res);
                    } else {
                        reject(res);
                    }
                })
            })
        }

        //获取所有课程信息
        const getAllSubjects = async (sub_ids) => {
            const subs = [];
            //获取单个课程信息
            for (let i = 0; i < sub_ids.length; i++) {
                const msg = {
                    api: 'reqsubinfo',
                    sub_id: sub_ids[i]
                }
                const res = await getSubject(msg);
                subs[i] = res.subject;
            }
            return subs;
        }

        //处理未归档的所有课程
        let noArchived;
        let archived;

        let subs = [];

        //获取创建者姓名
        const getTeacherName = (msg) => {
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

        const getTeacherNameAndSubjectInfo = async (allSubs, i) => {
            const msg = {
                api: "requserinfo",
                email: allSubs[i].creator_email,
            };
            // 等待Send函数返回msg
            const res = await getTeacherName(msg);
            if (res.status) {
                subs[i] = subjectInfo(
                    allSubs[i].term,
                    allSubs[i].title,
                    allSubs[i].klass_ids,
                    allSubs[i].id,
                    res.userdata.name,
                    allSubs[i]
                );
            }
        };

        const getAllTeacherNamesAndSubjectInfos = async () => {
            for (let i = 0; i < noArchived.length; i++) {
                await getTeacherNameAndSubjectInfo(noArchived, i);
            }
            updateNoArchivedSubjects(subs);
            subs = []
            for (let i = 0; i < archived.length; i++) {
                await getTeacherNameAndSubjectInfo(archived, i)
            }
            updateArchivedSubjects(subs);
        };

        //运行
        (async () => {
            noArchived = await getAllSubjects(noArchived_ids);
            archived = await getAllSubjects(archived_ids);
            await getAllTeacherNamesAndSubjectInfos();
            resolve();
        })();

    })
}