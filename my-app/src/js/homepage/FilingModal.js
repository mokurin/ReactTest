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
            <button
                type="button"
                className={`btn ${props.buttonStyle}`}
                onClick={e => {
                    if (check(e, props.index, 'editSubject')) {
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
        );
    } else if (props.msg === '确认编辑作业') {
        return (
            <>
                <button
                    type="button"
                    className={`btn ${props.buttonStyle}`}
                    onClick={e => {
                        new Promise((resolve, reject) => {
                            props.setIsOK(true);
                            resolve();
                        }).then((result) => {
                            const modal = new bootstrap.Modal('#editHomework' + props.index);
                            modal._hideModal();
                            document.getElementsByClassName('modal-backdrop')[0].remove();
                        }).then(() => {
                            props.setIsOK(false);
                        })
                    }}
                >
                    {props.msg}
                </button>
            </>
        );
    } else if (props.msg === '确认创建') {
        return (
            <button
                type="button"
                className={`btn ${props.buttonStyle}`}
                onClick={e => {
                    if (check(e, '', 'createSubject')) {
                        new Promise((resolve, reject) => {
                            resolve(props.command(getNewSubDate()));
                        }).then((result) => {
                            const modal = new bootstrap.Modal('#createSubject');
                            modal._hideModal();
                            document.getElementsByClassName('modal-backdrop')[0].remove();
                            resetNewSubDate();
                        })
                    }
                }}
            >
                {props.msg}
            </button>
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
function check(e, index, mode) {
    const form = document.querySelector('#needs-validation-' + mode + index);
    if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
    }
    form.classList.add('was-validated');

    if (form.checkValidity()) {
        form.classList.remove('was-validated');
        return true;
    }
}

//获取修改后的数据
function getSubDate(index) {
    const node = document.getElementById('needs-validation-editSubject' + index);
    return {
        createdTime: node.querySelector('#BodyEditSubject1').value,
        name: node.querySelector('#BodyEditSubject2').value,
        class: node.querySelector('#BodyEditSubject3').value,
        code: node.querySelector('#BodyEditSubject4').value
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
                <input type="text" defaultValue={props.sub.code} disabled className="form-control" id="BodyEditSubject4" required />
            </div>
        </form>)
    } else if (props.mode === 'editHomework') {
        content = (
            <PostHomework homeworkDetailsData={props.homework} isEdit={true} handleInputChange={props.handleInputChange} />
        )
    }
    return (
        content
    );
}

//获取新的课程数据
function getNewSubDate() {
    const node = document.getElementById('needs-validation-createSubject');
    return {
        createdTime: node.querySelector('#BodyCreateSubject1').value,
        name: node.querySelector('#BodyCreateSubject2').value,
        class: node.querySelector('#BodyCreateSubject3').value
    }
}

//清空表单
function resetNewSubDate() {
    const node = document.getElementById('needs-validation-createSubject');
    node.querySelector('#BodyCreateSubject1').value = '';
    node.querySelector('#BodyCreateSubject2').value = '';
    node.querySelector('#BodyCreateSubject3').value = '';
}

//课程创建
const BodyCreate = (props) => {
    return (<form id={'needs-validation-createSubject'} className="mt-1 mb-4 row g-3 container justify-content-center" noValidate>
        <div className="col-md-9">
            <label htmlFor="BodyCreateSubject1" className="form-label">学期</label>
            <input name="createdTime" type="text" className="form-control" id="BodyCreateSubject1" required />
            <div className="invalid-feedback">
                请输入学期
            </div>
        </div>

        <div className="col-md-9">
            <label htmlFor="BodyCreateSubject2" className="form-label">课程名</label>
            <input onChange={props.handleInputChange} name="name" type="text" className="form-control" id="BodyCreateSubject2" required />
            <div className="invalid-feedback">
                请输入课程名
            </div>
        </div>

        <div className="col-md-9">
            <label htmlFor="BodyCreateSubject3" className="form-label">班级</label>
            <input onChange={props.handleInputChange} name="class" type="text" className="form-control" id="BodyCreateSubject3" required />
            <div className="invalid-feedback">
                请输入班级
            </div>
        </div>
    </form>)
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
                        {props.data.id.includes("editHomework") && <BodyEdit mode={'editHomework'} handleInputChange={props.handleInputChange} homework={props.homeworkDetailsData} index={props.data.id.substring(12)} />}
                        {props.data.id.includes("createSubject") && <BodyCreate handleInputChange={props.handleInputChange} />}

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
                            {props.data.id.includes("editHomework") && <Button isOK={props.isOK} setIsOK={props.setIsOK} index={props.data.id.substring(12)} msg='确认编辑作业' buttonStyle={buttonStyles[2]} />}
                            {/* 作业删除 */}
                            {props.data.id.includes("deleteHomework") && <Button command={props.command} msg='确认删除' buttonStyle={buttonStyles[2]} />}
                            {/* 创建课程 */}
                            {props.data.id.includes('createSubject') && <Button command={props.command} msg='确认创建' buttonStyle={buttonStyles[2]} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilingModal;


