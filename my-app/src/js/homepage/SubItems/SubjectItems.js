import React from 'react';
//组件
import Subject from '../../homepage/Subject'


export default function SubjectItems(props) {
    const { noArchivedSub, setNoArchivedSub } = props;

    //获取归档课程的组件列表
    const getSubjectItems = () => {
        let subjectItems = noArchivedSub.map(
            (sub, index) => {
                return <Subject setNoArchivedSub={setNoArchivedSub} data={sub} key={index} id={`subject${index}`} />;
            }
        )
        return subjectItems;
    }

    return (
        getSubjectItems()
    );
}