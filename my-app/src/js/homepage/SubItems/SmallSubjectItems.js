import React from 'react';
//组件
import SmallSubject from '../../homepage/SmallSubject'




export default function SmallSubjectItems(props) {
    const { archivedSub } = props;

    //获取归档课程的组件列表
    const getSmallSubjectItems = () => {
        let smallSubjectItems = archivedSub.map(
            (sub, index) => {
                return <SmallSubject subject={sub} key={index} id={`small-subject${index}`} />;
            }
        )
        return smallSubjectItems;
    }

    return (
        getSmallSubjectItems()
    )
}