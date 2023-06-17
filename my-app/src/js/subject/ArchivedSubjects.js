import subjectInfo from '../subject/SubjectInfo'
import { Send } from '../Connect'

//归档课程
export let archivedSubjects = [
];

//更新课程数据
export function updateArchivedSubjects(data) {
    archivedSubjects = data;
    //更新后端
    const user_Account = JSON.parse(localStorage.getItem('user_Account'));
    let msg;
    if (user_Account !== undefined && user_Account !== null) {
        msg = {
            api: 'archiveAll',
            email: user_Account.email,
            archivedSubjects: data
        }
        Send(msg, msg => {
            if (!msg.status) {
                alert('归档出错');
            }
        })
    }
}

//请求归档全部
export function requestArchiveAll(sub) {
    const user_Account = JSON.parse(localStorage.getItem('user_Account'));
    let msg;
    if (user_Account !== undefined && user_Account !== null) {
        msg = {
            api: 'archiveAll',
            email: user_Account.email,
            code: sub.code
        }
        Send(msg, msg => {
            if (!msg.status) {
                alert('归档出错');
            }
        })
    }
}