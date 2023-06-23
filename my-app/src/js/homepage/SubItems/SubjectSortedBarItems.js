import React, { createElement } from 'react';
//组件
import SubjectSortedBar from '../../homepage/SubjectSortedBar'



export default function SubjectSortedBarItems(props) {
    const { noArchivedSub, setNoArchivedSub } = props;

    //获取排序课程的组件列表
    const getSubjectSortedBarItems = () => {
        let subjectSortedBarItems = noArchivedSub.map(
            (sub, index) => {
                return <SubjectSortedBar noArchivedSub={noArchivedSub} setNoArchivedSub={setNoArchivedSub} subjectName={sub.name} key={index} id={`label${index}`} />;
            }
        )
        return subjectSortedBarItems;
    }

    return (
        getSubjectSortedBarItems()
    )
}