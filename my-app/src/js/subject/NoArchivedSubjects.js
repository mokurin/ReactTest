import subjectInfo from '../subject/SubjectInfo'
import { Send } from '../Connect'

//未归档课程
export let noArchivedSubjects = [];

//更新数据
export function updateNoArchivedSubjects(data) {
    noArchivedSubjects = data;
    //更新后端
    const user_Account = JSON.parse(localStorage.getItem('user_Account'));
    let msg;
    if (user_Account !== undefined && user_Account !== null) {
        msg = {
            api: 'update-noArchivedSubjects',
            email: user_Account.email,
            noArchivedSubjects: data
        }
        Send(msg, msg => {
            if (!msg.status) {
                alert(msg.err_code);
            }
        })
    }
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
                alert(msg.err_code);
            }
        })
    }
}

//更新课程
export function updateSubject(sub) {
    //更新前端
    for (let i = 0; i < noArchivedSubjects.length; i++) {
        if (noArchivedSubjects[i].code === sub.code) {
            noArchivedSubjects[i] = sub;
            break;
        }
    }
    return true;
    //更新后端
    // const user_Account = JSON.parse(localStorage.getItem('user_Account'));
    // let msg;
    // if (user_Account !== undefined && user_Account !== null) {
    //     msg = {
    //         api: 'update-subject',
    //         email: user_Account.email,
    //         code: sub.code,
    //         subject: sub
    //     }
    //     Send(msg, msg => {
    //         if (!msg.status) {
    //             alert(msg.err_code);
    //             return false;
    //         } else {
    //             return true;
    //         }
    //     })
    // }
    // return false;
}

//获取指定课程
export function getSubByCode(code) {
    for (let i = 0; i < noArchivedSubjects.length; i++) {
        if (noArchivedSubjects[i].code === code)
            return noArchivedSubjects[i];
    }
}