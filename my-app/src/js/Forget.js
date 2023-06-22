import React, { useState } from 'react';
import styles from '../css/Forget.module.css'
import { Link, useNavigate } from 'react-router-dom';
import Connect, { Send } from './Connect'
import bootstrap from 'bootstrap/dist/js/bootstrap';

// 定义一个函数来检查表单的有效性
function check(e, flag) {
    e.preventDefault();
    const form = document.querySelector('#needs-validation');
    if (!form.checkValidity()) {
        e.stopPropagation()
    }
    form.classList.add('was-validated');
    if (!flag)
        for (let i of form.getElementsByTagName('INPUT'))
            i.setCustomValidity('错误');
    if (flag) {
        for (let i of form.getElementsByTagName('INPUT'))
            i.setCustomValidity('');
    }

    if (form.checkValidity()) {

        form.classList.remove('was-validated');
        return true;
    }
}

// 定义一个函数来处理表单提交
function onSubmit(e, data) {
    e.preventDefault();
    // 根据不同的步骤，做不同的操作
    switch (data.step) {
        case 1:
            // 发送验证码到邮箱
            return new Promise((resolve, reject) => {
                const msg = {
                    api: 'repwdverify',
                    email: data.email
                }
                Send(msg, res => {
                    if (res.status)
                        resolve(true);
                    else {
                        document.getElementById('tip').innerHTML = res.errcode;
                        const modal = new bootstrap.Modal('#tip-modal');
                        modal.show();
                        resolve(false);
                    }
                })
            })
        case 2:
            // 验证验证码是否正确
            console.log('验证' + data.code + '验证码是否正确');
            return new Promise((resolve, reject) => {
                const msg = {
                    api: 'verrepassver',
                    vercode: data.code
                }
                Send(msg, res => {
                    if (res.status) {
                        resolve(true);
                    } else {
                        document.getElementById('tip').innerHTML = res.errcode;
                        const modal = new bootstrap.Modal('#tip-modal');
                        modal.show();
                        resolve(false);
                    }
                })

            });
        case 3:
            // 设置新密码
            console.log('设置新密码');
            return new Promise((resolve, reject) => {
                console.log(data.checkPwd);
                console.log(data.newPwd);
                if (data.checkPwd !== data.newPwd) {
                    resolve(false);
                } else {
                    const msg = {
                        api: 'repasswd',
                        passwd: data.newPwd
                    }
                    Send(msg, res => {
                        if (res.status) {
                            resolve(true);
                        } else {
                            document.getElementById('tip').innerHTML = res.errcode;
                            const modal = new bootstrap.Modal('#tip-modal');
                            modal.show();
                            resolve(false);
                        }
                    })
                }
            });
        default:
            return false;
    }
};

// 定义组件
const Step1 = (props) => {
    const validateEmail = e => {
        if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(e.target.value)) {
            e.target.setCustomValidity("邮箱格式不正确");
        } else {
            //没有错误。清除任何错误消息
            e.target.setCustomValidity("");
        }
    }

    return (
        <form className={`${styles.Form} shadow-lg row`} id='needs-validation'>
            <div className={`${styles.header} mt-1`}>忘记密码</div>
            <div className="col-md-4">
                <label htmlFor="validationCustom01" className="form-label">邮箱</label>
                <input onInput={validateEmail} type="email" className="form-control" id="validationCustom01" required />
                <div className="invalid-feedback">
                    邮箱有误或未注册
                </div>
            </div>
            <div className="col-12">
                {props.button}
            </div>
            <p className="mt-4 otherCtrl">
                <Link to={'/Login'}><span className={styles.toLogin}>返回</span></Link>
            </p>
        </form>
    );
}

const Step2 = (props) => {
    return (
        <form className={`${styles.Form} shadow-lg row`} id='needs-validation' >
            <div className={`${styles.header} mt-1`}>安全验证</div>
            <div className={styles.codeAddress}>动态验证码已经发送至 {props.data.email}</div>
            <div className="col-md-4">
                <label htmlFor="validationCustom01" className="form-label">请输入验证码</label>
                <input type="text" className="form-control" id="validationCustom01" required />
                <div className="invalid-feedback">
                    验证码未填写或有误
                </div>
            </div>
            <div className="col-12">
                {props.button}
            </div>
            <p className="mt-4 otherCtrl">
                <Link to={'/Login'}><span className={styles.toLogin}>返回</span></Link>
            </p>
        </form >
    );
}

const Step3 = (props) => {
    const [data, setDate] = useState({});

    function handleClick() {
        const pwd = document.getElementById('validationCustom01').value;
        const checkPwd = document.getElementById('validationCustom02').value;
        setDate({
            pwd: pwd,
            checkPwd: checkPwd
        })

        document.querySelector('#validationCustom02').setAttribute('pattern', '^' + pwd + '$')
    }

    return (
        <form className={`${styles.Form} shadow-lg row`} id='needs-validation'>
            <div className={`${styles.header} mt-1`}>设置新密码</div>
            <div className="col-md-4">
                <label htmlFor="validationCustom01" className="form-label">请输入密码</label>
                <input onKeyUp={handleClick} type="password" className="form-control" id="validationCustom01" required />
                <div className="invalid-feedback">
                    未输入密码
                </div>
            </div>
            <div className="col-md-4">
                <label htmlFor="validationCustom02" className="form-label">请再次输入密码确认</label>
                <input onKeyUp={handleClick} type="password" className="form-control" id="validationCustom02" required />
                <div className="invalid-feedback">
                    密码不一致
                </div>
            </div>
            <div className="col-12">
                {props.button}
            </div>
            <p className="mt-4 otherCtrl">
                <Link to={'/Login'}><span className={styles.toLogin}>返回</span></Link>
            </p>
        </form>
    );
}

function Forget(props) {
    const [step, setStep] = useState(1);
    const [data, setDate] = useState();
    const navigate = useNavigate();

    //更改步数
    const handleStep = () => {
        setStep(step + 1);
    }

    //更改信息
    const handleData = (data) => {
        setDate(data);
    }

    let button;
    if (step === 1) {
        button = (<button type='click' className={`btn btn-lg btn-primary ${styles.nextButton}`}
            onClick={async (e) => {
                let data = {
                    step: 1,
                    email: document.querySelector('#validationCustom01').value
                }
                const result = await onSubmit(e, data);
                if (check(e, result)) {
                    handleData(data);
                    handleStep();
                }
            }}> 下一步</button >)
    } else if (step === 2) {
        button = (<button type='click' className={`btn btn-lg btn-primary ${styles.nextButton}`}
            onClick={async (e) => {
                let dat = {
                    step: 2,
                    email: data.email,
                    code: document.querySelector('#validationCustom01').value
                }
                const result = await onSubmit(e, dat);
                if (check(e, result)) {
                    handleStep();
                }
            }}>完成验证</button>)
    } else if (step === 3) {
        button = (<button type='click' className={`btn btn-lg btn-primary ${styles.nextButton}`}
            onClick={async (e) => {
                let dat = {
                    step: 3,
                    email: data.email,
                    newPwd: document.querySelector('#validationCustom01').value,
                    checkPwd: document.querySelector('#validationCustom02').value
                }
                const result = await onSubmit(e, dat);
                if (check(e, result)) {
                    await new Promise((resolve, reject) => {
                        handleData(dat);
                        resolve()
                    })
                    console.log(data.email);

                    //跳转至登录页
                    navigate('/Login', {
                        state: {
                            email: data.email
                        }
                    })
                }
            }}>确认密码</button>)
    }

    return ([
        (step === 1 && <Step1 button={button} key={1} />) ||
        (step === 2 && <Step2 button={button} key={1} data={data} />) ||
        (step === 3 && <Step3 button={button} key={1} />),

        // 模态框提示
        (<div className="modal fade" tabIndex="-1" id='tip-modal' key={2}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">提示</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="col-md-4">
                            <span id='tip'></span>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div >)
    ])
}

export default Forget;
