import React from 'react';
//组件
import SubjectSortedBar from '../../homepage/SubjectSortedBar'



export default function SubjectSortedBarItems(props) {
    const { noArchivedSub } = props;

    //获取排序课程的组件列表
    const getSubjectSortedBarItems = () => {
        let subjectSortedBarItems = noArchivedSub.map(
            (sub, index) => {
                return <SubjectSortedBar subjectName={sub.name} key={index} id={`label${index}`} />;
            }
        )
        return subjectSortedBarItems;
    }

    return (
        getSubjectSortedBarItems()
    )
}