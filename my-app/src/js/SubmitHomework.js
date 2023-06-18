import React, { Component } from 'react';

// 上传文件
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

// 组件引用
import { SubjectCheckNav } from "./IndividualSubjectCheck"

// css引用
import styles from '../css/SubmitHomework.module.css'


// 测试部分
class SearchData extends Component {
    state = {
        file: [],
    }

    componentDidMount() {

    }

    // beforeUpload 返回 false 后，手动上传文件。
    beforeUpload = () => {
        return false;
    }


    //文件发送请求事件
    // getFilesHandle = () => {
    //     const { file } = this.state;
    //     const formData = new FormData();
    //     for (let i = 0; i < file.length; i++) {
    //         formData.append('file', file[i]);
    //     }
    //     commonConfig.ajaxUploadHttp(commonConfig.url + 'dataset/importExcel/_login', formData, res => {
    //         console.log(res)
    //     }, null, 'POST')
    // }

    //获取已经上传文件的列表
    uploadChange = (info) => {
        const { file } = this.state
        this.setState({ file: [info.file, ...file] })
        return false;
    }

    //点击确定按钮
    uploadConfirm = () => {
        const { file } = this.state
        if (file.length > 0) {
            console.log(file);
            console.log("nihao"); //调用请求接口
        } else {
            message.info('请上传文件')
        }
    }

    render() {
        const props = {
            multiple: true,
            action: null,
            onChange: this.uploadChange,
            beforeUpload: this.beforeUpload,
            showUploadList: false
        };
        return (
            <div>
                <h3>上传文件</h3>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                <button onClick={this.uploadConfirm}>确定</button>
            </div>
        );
    }
}

//上传文件 作业
export const UploadFiles = (props) => {
    return (<>
        <div className={`${styles.UploadFiles} shadow`}>

        </div>
    </>);
}

// 整个提交作业区域
const SubmitHomeworkMain = (props) => {
    return (<>
        <div className={`${styles.SubmitHomeworkMain} shadow`}>
            <div className={`${styles.SubmitHomeworkMainTitle}`}>
                <div className={`${styles.homeworkName} fs-2`}>
                    作业名{props.homeworkName}
                </div>
                <div className={`${styles.homeworkOtherInfo}`}>
                    <div>
                        截止日期{props.homeworkDeadline}
                    </div>
                    <div>
                        个人作业
                    </div>
                </div>
            </div>
            <div className={`${styles.SubmitHomeworkArea}`}>
                <UploadFiles />
                <div className={`${styles.otherActions}`}>
                    <div className={``}>
                        <label htmlFor="inputPassword" className=" col-form-label">作业留言：</label>
                        <input type="text" className="form-control" id="inputPassword" placeholder='点击添加留言' />
                    </div>
                    <button className={`btn btn-primary btn-sm`}
                        onClick={() => {
                        }}
                    >提交作业</button>
                </div>
            </div>
            {/* <SearchData /> */}
        </div>
    </>)
}


export default function SubmitHomework(props) {

    return (<>
        <SubjectCheckNav action="提交作业" />
        <SubmitHomeworkMain />
    </>)
}