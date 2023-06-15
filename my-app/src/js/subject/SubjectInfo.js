//构造课程方法
export default function subjectInfo(CreatedTime, name, subClass, code, teacher) {
    return {
        createdTime: CreatedTime,//学期
        name: name,//姓名
        class: subClass,//班级
        code: code,//课程代码
        teacher: teacher//老师
    };
}