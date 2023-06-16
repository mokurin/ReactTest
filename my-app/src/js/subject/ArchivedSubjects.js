import subjectInfo from '../subject/SubjectInfo'

//归档课程
export let archivedSubjects = [
    subjectInfo("第二学期", "离散数学离散数学离散数学离散数学离散数学离散数学离散数学", "121230202", "DDD", "sss")
];

//更新课程数据
export function updateArchivedSubjects(data) {
    archivedSubjects = data;
    //更新后端
    
}

//请求归档全部
export function requestArchiveAll(sub){
    
}