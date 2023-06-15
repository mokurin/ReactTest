import React from 'react';


// 课程操作对应的模态框
//
const buttonStyles = ["btn-outline-secondary", "btn-outline-primary", "btn-primary"]

const Button = (props) => {
    if (props.msg === "确认删除") {
        return (
            <>
                <button
                    type="button"
                    className={`btn ${props.buttonStyle} removeSubject`}
                    data-bs-dismiss="modal"
                >
                    {props.msg}
                </button>
            </>
        );
    } else if (props.msg === "归档自己") {
        return (
            <>
                <button
                    type="button"
                    className={`btn ${props.buttonStyle} archiveSelf`}
                    data-bs-dismiss="modal"
                >
                    {props.msg}
                </button>
            </>
        );
    } else if (props.msg === "归档全部") {
        return (
            <>
                <button
                    type="button"
                    className={`btn ${props.buttonStyle} archiveAll`}
                    data-bs-dismiss="modal"
                >
                    {props.msg}
                </button>
            </>
        );
    } else {
        return (
            <>
                <button
                    type="button"
                    className={`btn ${props.buttonStyle}`}
                    data-bs-dismiss="modal"
                >
                    {props.msg}
                </button>
            </>
        );
    }
}

//归档
const BodyContent = () => {
    return (
        <>
            <div className="modal-body">
                <p>你可以在“课堂”-“归档管理”中查看此课程</p>
                <p>【归档全部】，学生的课程也会一起被归档</p>
                <p>【归档自己】，学生的课程不会被归档</p>
            </div>
        </>
    );
}

//课程编辑
const BodyEdit = () => {
    return (
        <>
            课程编辑
        </>
    );
}


function FilingModal(props) {
    return (
        <>
            <div
                className="modal fade"
                id={props.data.id}
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                {props.data.title}
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        {props.data.id == "filingSubject" && BodyContent()}
                        {props.data.id == "editSubject" && BodyEdit()}
                        <div className="modal-footer">
                            {Button("取消", buttonStyles[0])}
                            {/* 删除 */}
                            {props.data.id == "deleteSubject" && <Button msg='确认删除' buttonStyle={buttonStyles[2]} />}
                            {/* 归档 */}
                            {props.data.id == "filingSubject" && <Button msg='归档自己' buttonStyle={buttonStyles[1]} />}
                            {props.data.id == "filingSubject" && <Button msg='归档全部' buttonStyle={buttonStyles[2]} />}
                            {/* 编辑 */}
                            {props.data.id == "editSubject" && <Button msg='确认编辑' buttonStyle={buttonStyles[2]} />}
                            {/* 恢复 */}
                            {props.data.id == "restoreSubject" && <Button msg='确认恢复' buttonStyle={buttonStyles[2]} />}
                            {/* 删除 */}
                            {props.data.id == "deleteArchiveSubject" && <Button msg='确认删除' buttonStyle={buttonStyles[2]} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilingModal;


