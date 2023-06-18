import React from 'react';
//组件
import Subject from '../../homepage/Subject'


export default function SubjectItems(props) {
    const { noArchivedSub, setNoArchivedSub, setArchivedSub } = props;

    //获取归档课程的组件列表
    const getSubjectItems = () => {
        let subjectItems = noArchivedSub.map(
            (sub, index) => {
                return <Subject noArchivedSub={noArchivedSub}
                 setNoArchivedSub={setNoArchivedSub} setArchivedSub={setArchivedSub}
                    data={sub} key={index} id={`subject${index}`} />;
            }
        )
        return subjectItems;
    }

    return (
        getSubjectItems()
    );
}