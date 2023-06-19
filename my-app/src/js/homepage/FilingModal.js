import React, { useState } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap'
import PostHomework from '../PostHomework'

// 课程操作对应的模态框
const buttonStyles = ["btn-outline-secondary", "btn-outline-primary", "btn-primary"]

//按钮小组件
const Button = (props) => {
    if (props.msg === "确认删除" || props.msg === '确认恢复') {
        return (
            <>
                <button
                    type="button"
                    className={`btn ${props.buttonStyle}`}
                    data-bs-dismiss="modal"
                    onClick={props.command}
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
                    className={`btn ${props.buttonStyle}`}
                    data-bs-dismiss="modal"
                    onClick={props.command.arc}
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
                    className={`btn ${props.buttonStyle}`}
                    data-bs-dismiss="modal"
                    onClick={props.command.arcAll}
                >
                    {props.msg}
                </button>
            </>
        );
    } else if (props.msg === '确认编辑') {
        return (
            <>
                <button
                    type="button"
                    className={`btn ${props.buttonStyle}`}
                    onClick={e => {
                        if (check(e, props.index)) {
                            new Promise((resolve, reject) => {
                                resolve(props.command(getSubDate(props.index)));
                            }).then((result) => {
                                const modal = new bootstrap.Modal('#editSubject' + props.index);
                                modal._hideModal();
                                document.getElementsByClassName('modal-backdrop')[0].remove();
                            })
                        }
                    }}
                >
                    {props.msg}
                </button>
            </>
        );
    } else if (props.msg === '确认编辑作业') {
        return (
            <>
                <button
                    type="button"
                    className={`btn ${props.buttonStyle}`}
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

//检查表单
function check(e, index) {
    const form = document.querySelector('#needs-validation' + index);
    if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation()
    }
    form.classList.add('was-validated');

    if (form.checkValidity()) {
        form.classList.remove('was-validated');
        return true;
    }
}

//获取表单数据
function getSubDate(index) {
    const node = document.getElementById('needs-validation-editSubject' + index);
    return {
        createdTime: node.querySelector('#BodyEdit1').value,
        name: node.querySelector('#BodyEdit2').value,
        class: node.querySelector('#BodyEdit3').value,
        code: node.querySelector('#BodyEdit4').value
    }
}

//课程编辑
const BodyEdit = (props) => {
    let content;
    if (props.mode === 'editSubject') {
        content = (<form id={'needs-validation-editSubject' + props.index} className="mt-1 mb-4 row g-3 container justify-content-center" noValidate>
            <div className="col-md-9">
                <label htmlFor="BodyEditSubject1" className="form-label">学期</label>
                <input onChange={props.handleInputChange} name="createdTime" type="text" className="form-control" id="BodyEditSubject1" value={props.sub.createdTime} required />
                <div className="invalid-feedback">
                    请输入学期
                </div>
            </div>
            <div className="col-md-9">
                <label htmlFor="BodyEditSubject2" className="form-label">课程名</label>
                <input onChange={props.handleInputChange} name="name" type="text" className="form-control" id="BodyEditSubject2" value={props.sub.name} required />
                <div className="invalid-feedback">
                    请输入课程名
                </div>
            </div>

            <div className="col-md-9">
                <label htmlFor="BodyEditSubject3" className="form-label">班级</label>
                <input onChange={props.handleInputChange} name="class" type="text" className="form-control" id="BodyEditSubject3" value={props.sub.class} required />
                <div className="invalid-feedback">
                    请输入班级
                </div>
            </div>
            <div className="col-md-9">
                <label htmlFor="BodyEditSubject4" className="form-label">课程代码</label>
                <input type="text" disabled className="form-control" id="BodyEditSubject4" required />
            </div>
        </form>)
    }
    //  else if (props.mode === 'editHomework') {
    //     content = (<form id={'needs-validation' + props.index} className="mt-1 mb-4 row g-3 container justify-content-center" noValidate>
    //         <div className="col-md-9">
    //             <label htmlFor="BodyEdit1" className="form-label">作业名</label>
    //             <input name="createdTime" type="text" className="form-control" id="BodyEdit1" required />
    //             <div className="invalid-feedback">
    //                 请输入作业名
    //             </div>
    //         </div>
    //         <div className="col-md-9">
    //             <label htmlFor="BodyEdit2" className="form-label">作业详情</label>
    //             <input onChange={props.handleInputChange} name="name" type="text" className="form-control" id="BodyEdit2" />
    //         </div>

    //         <div className="col-md-9">
    //             <label htmlFor="BodyEdit3" className="form-label">班级</label>
    //             <input onChange={props.handleInputChange} name="class" type="text" className="form-control" id="BodyEdit3" required />
    //             <div className="invalid-feedback">
    //                 请输入班级
    //             </div>
    //         </div>
    //         <div className="col-md-9">
    //             <label htmlFor="BodyEdit4" className="form-label">课程代码</label>
    //             <input type="text" disabled className="form-control" id="BodyEdit4" required />
    //         </div>
    //     </form>)
    else {
        content = (
            <PostHomework />
        )
    }
    return (
        content
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
                        {props.data.id.includes("filingSubject") && <BodyContent />}
                        {props.data.id.includes("editSubject") && <BodyEdit mode={'editSubject'} handleInputChange={props.handleInputChange} sub={props.sub} index={props.data.id.substring(11)} />}
                        {props.data.id.includes("editHomework") && <BodyEdit mode={'editHomework'} handleInputChange={props.handleInputChange} homework={props.homework} index={props.data.id.substring(12)} />}
                        <div className="modal-footer">
                            {/*未归档课程 删除 */}
                            {props.data.id.includes("deleteSubject") && <Button command={props.command} msg='确认删除' buttonStyle={buttonStyles[2]} />}
                            {/* 归档 */}
                            {props.data.id.includes("filingSubject") && <Button command={props.command} msg='归档自己' buttonStyle={buttonStyles[1]} />}
                            {props.data.id.includes("filingSubject") && <Button command={props.command} msg='归档全部' buttonStyle={buttonStyles[2]} />}
                            {/* 编辑 */}
                            {props.data.id.includes("editSubject") && <Button command={props.command} index={props.data.id.substring(11)} msg='确认编辑' buttonStyle={buttonStyles[2]} />}
                            {/* 恢复 */}
                            {props.data.id.includes("restoreSubject") && <Button command={props.command} msg='确认恢复' buttonStyle={buttonStyles[2]} />}
                            {/*归档课程 删除 */}
                            {props.data.id.includes("deleteArchiveSubject") && <Button command={props.command} msg='确认删除' buttonStyle={buttonStyles[2]} />}
                            {/* 作业编辑 */}
                            {props.data.id.includes("editHomework") && <Button command={props.command} msg='确认编辑作业' buttonStyle={buttonStyles[2]} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilingModal;


