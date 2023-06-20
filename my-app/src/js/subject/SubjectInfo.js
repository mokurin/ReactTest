import { Send } from '../Connect'
import { updateNoArchivedSubjects } from '../subject/NoArchivedSubjects'
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
export function getAllSubs() {
    return new Promise((resolve, reject) => {
        const msg = {
            api: 'reqsubinfo'
        }
        Send(msg, (msg) => {
            if (msg.status) {
                //处理未归档的所有课程
                const noArchived = msg.unarchived_subjects;
                let subs = [];
                for (const i in noArchived) {
                    subs[i] = subjectInfo(noArchived[i].term, noArchived[i].title,
                        noArchived[i].klass_ids, noArchived[i].id, '',/* 老师名字 ,*/noArchived[i]);
                }
                updateNoArchivedSubjects(subs);

                //处理归档的所有课程
                const archived = msg.archived_subjects;
                subs = [];
                for (const i in archived) {
                    subs[i] = subjectInfo(archived[i].term, archived[i].title,
                        archived[i].klass_ids, archived[i].id, '',/* 老师名字 ,*/archived[i]);
                }
                updateArchivedSubjects(subs);
                resolve();
            } else {
                reject();
            }
        })
    })
}