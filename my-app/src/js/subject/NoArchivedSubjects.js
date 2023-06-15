import subjectInfo from '../subject/SubjectInfo'

//未归档课程
export let noArchivedSubjects = [
    {
        createdTime: "第一学期",
        name: "软件工程软件工程软件工程软件工程软件工程",
        class: "121230204",
        code: "AAA",
        teacher: "xxx"
    },
    subjectInfo("第二学期", "应用数学应用数学应用数学应用数学应用数学", "121230202", "BBB", "vvv"),
    subjectInfo("第一学期", "爱德华拉到哈罗德了", "121230202", "CCC", "vvv")
];

//更新数据
export function updateNoArchivedSubjects(data) {
    noArchivedSubjects = data;
    //更新后端
    
}