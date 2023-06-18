import React from 'react';

// css引用
import styles from '../css/PostHomework.module.css'

import { Upload, message, Button } from 'antd';


//发布作业组件
export default function PostHomework(props) {
    let settings = {
        multiple: true,
        action: null,
    };

    //重置内容
    function reset() {
        const input = document.getElementById('homeworkEditor').getElementsByTagName('INPUT');
        for (let i of input)
            i.value = '';
        document.getElementById('homeworkIntroduce').value = '';
    }

    //提交作业
    function submitHomework() {
        //提交作业代码
    }

    return (
        <div id='homeworkEditor' className={`${styles.postHomework} shadow-sm`}>
            <div>
                <input id='homeworkName' type="text" className={`form-control`} placeholder='作业名称' />
            </div>
            <div className={`mt-2`}>
                <textarea id='homeworkIntroduce' className="form-control" placeholder='作业简介，作业格等要求'></textarea>
                <div className={`${styles.homeworkSettings} mt-3`}>
                    <div>
                        <label htmlFor="deadline">截止日期:</label>
                        <input id='deadline' type="datetime-local" min={getNow()} className='form-control' />
                    </div>
                    <div>
                        <label htmlFor="maxGrade">满分值: </label>
                        <input id="maxGrade" type="number" className='form-control' />
                    </div>
                </div>
            </div>
            <div className={`${styles.postHomeworkButtons}`}>
                <div>
                    <Upload {...settings}>
                        <button className={`btn btn-primary`}>导入作业</button>
                    </Upload>
                </div>
                <div>
                    <button className={`btn btn-outline-primary`} onClick={reset}>重置</button>
                    <button className={`btn btn-primary`} onClick={() => {
                        new Promise((resolve, reject) => {
                            if (submitHomework())
                                resolve();
                            else reject();
                        }).then(() => {
                            reset();
                        })
                    }}>发布个人作业</button>
                </div>
            </div>
        </div>
    )
}

//获取当前时间
function getNow() {
    const date = new Date();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + (date.getDate())).slice(-2);
    const year = date.getFullYear();
    const hour = ("0" + (date.getHours())).slice(-2);
    const min = ("0" + (date.getMinutes())).slice(-2);
    return year + "-" + month + "-" + day + " " + hour + ":" + min;
}