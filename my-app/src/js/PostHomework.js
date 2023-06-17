import React, { Component } from 'react';

// css引用
import styles from '../css/PostHomework.module.css'

import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


export default function PostHomework(props) {
    let settings = {
        multiple: true,
        action: null,
    };

    return (<>
        <div className={`${styles.postHomework} shadow-sm`}>
            <div>
                <input type="text" className={`form-control`} placeholder='作业名称' />
            </div>
            <div className={`mt-2`}>
                <textarea class="form-control" placeholder='作业简介，作业格等要求'></textarea>
                <div className={`${styles.homeworkSettings} mt-3`}>
                    <div>
                        <label htmlFor="birthday">截止日期:</label>
                        <input type="date" id="birthday" value='' className='form-control' />
                    </div>
                    <div>
                        <label htmlFor="maxGrade">满分值: </label>
                        <input type="text" id="maxGrade" value='' className='form-control' />
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
                    <button className={`btn btn-outline-primary`}>取消</button>
                    <button className={`btn btn-primary`}>发布个人作业</button>
                </div>
            </div>
        </div>
    </>)
}