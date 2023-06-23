import subjectInfo from '../subject/SubjectInfo'
import { Send } from '../Connect'

//未归档课程
export let noArchivedSubjects = [];

//更新所有课程
export function updateNoArchivedSubjects(data) {
    noArchivedSubjects = data;
}

//添加课程
export function addSubject(sub) {
    noArchivedSubjects.push(sub);
    //更新后端
    const user_Account = JSON.parse(localStorage.getItem('user_Account'));
    let msg;
    if (user_Account !== undefined && user_Account !== null) {
        msg = {
            api: 'add-subject',
            email: user_Account.email,
            subject: sub
        }
        Send(msg, msg => {
            if (!msg.status) {
                alert(msg.errcode);
            }
        })
    }
}

//删除课程
export function delSubject(sub) {
    return new Promise((resolve, reject) => {
        const msg = {
            api: 'delsub',
            sub_id: Number(sub.code)
        }
        Send(msg, msg => {
            if (msg.status) {
                resolve(true);
            } else {
                resolve(msg.errcode);
            }
        })
    })
}

//更新一门课程
export function updateSubject(sub) {
    return new Promise((resolve, reject) => {
        const msg = {
            api: 'updatesubinfo',
            subject: {
                id: sub.data.id,
                term: sub.createdTime,
                title: sub.name,
                klass_ids: sub.class.split(','),
                teacher_emails: sub.data.teacher_emails,
                student_emails: sub.data.student_emails,
                homework_ids: sub.data.homework_ids
            }
        }
        Send(msg, res => {
            if (res.status) {
                resolve(true);
            } else {
                resolve(res.errcode);
            }
        })
    })
}

//获取指定课程
export function getSubByCode(code) {
    for (let i = 0; i < noArchivedSubjects.length; i++) {
        if (noArchivedSubjects[i].code === code)
            return noArchivedSubjects[i];
    }
}