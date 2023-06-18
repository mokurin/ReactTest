import React from 'react';

//组件引用
import { HomeworkInfo } from './HomeworkInfo';

export default function HomeworkItems(props) {
    const { allHomeworkInfo, interactions } = props

    //获取作业组件列表
    const getItems = () => {
        let items = allHomeworkInfo.map(
            (info, index) => {
                return <HomeworkInfo data={info} interaction={interactions[index]} key={index} id={`homework${index}`} />;
            }
        )
        return items;
    }

    return (
        getItems()
    )
}