import subjectInfo from '../subject/SubjectInfo'
import { Send } from '../Connect'

//归档课程
export let archivedSubjects = [
];

//更新课程数据
export function updateArchivedSubjects(data) {
    archivedSubjects = data;
}

//请求归档全部
export function requestArchiveAll(sub) {
    return new Promise((resolve, reject) => {
        const msg = {
            api: 'archivesub',
            sub_id: sub.code
        }
        Send(msg, msg => {
            if (msg.status) {
                resolve(msg)
            } else reject(msg);
        })
    });
}