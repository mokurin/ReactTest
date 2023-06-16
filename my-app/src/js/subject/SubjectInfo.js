import { Send } from '../Connect'
import { updateNoArchivedSubjects } from '../subject/NoArchivedSubjects'
import { updateArchivedSubjects } from '../subject/ArchivedSubjects'

//构造课程方法
export default function subjectInfo(CreatedTime, name, subClass, code, teacher, data) {
    return {
        createdTime: CreatedTime,//学期
        name: name,//姓名
        class: subClass,//班级
        code: code,//课程代码
        teacher: teacher,//老师
        data: data //该课程的所有数据
    };
}

//请求所有课程
export function getAllSubs(email) {
    const msg = {
        api: 'all-subs',
        email: email
    }
    Send(msg, (msg) => {
        if (msg.status) {
            updateNoArchivedSubjects(msg.archivedSubjects);
            updateArchivedSubjects(msg.noArchivedSubjects);
            return true;
        } else {
            return false;
        }
    })
}