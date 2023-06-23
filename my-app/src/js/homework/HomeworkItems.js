import React from 'react';

//组件引用
import { HomeworkInfo } from './HomeworkInfo';

export default function HomeworkItems(props) {
    const { allHomeworkInfo, subData, setAllHomeworkInfo } = props

    function updateHomeworkInfo(index, newInfo) {
        const infos = [...allHomeworkInfo]
        infos[index] = newInfo;
        setAllHomeworkInfo(infos)
    }

    function delHomeworkInfo(index) {
        const infos = [...allHomeworkInfo]
        infos.splice(index, 1);
        setAllHomeworkInfo(infos)
    }

    //获取作业组件列表
    const getItems = () => {
        let items = allHomeworkInfo.map(
            (info, index) => {
                // return <HomeworkInfo filePaths={info.data.annex_file_paths} delHomeworkInfo={delHomeworkInfo} allHomeworkInfo={allHomeworkInfo} updateHomeworkInfo={updateHomeworkInfo} subData={subData} data={info} key={index} id={`homework${index}`} />;
                return <HomeworkInfo filePaths={['asduh~hello.pdf', 'asd~world.xlsx', 'asd~!!!.doc']} delHomeworkInfo={delHomeworkInfo} allHomeworkInfo={allHomeworkInfo} updateHomeworkInfo={updateHomeworkInfo} subData={subData} data={info} key={index} id={`homework${index}`} />;
            }
        )
        return items;
    }

    return (
        getItems()
    )
}