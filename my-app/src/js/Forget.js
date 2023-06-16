import React, { useState } from 'react';
import styles from '../css/Forget.module.css'
import { Link, useNavigate } from 'react-router-dom';
import Connect from './Connect'

// 定义一个函数来检查表单的有效性
function check(e, flag) {
    e.preventDefault();
    const form = document.querySelector('#needs-validation');
    if (!form.checkValidity()) {
        e.stopPropagation()
    }
    form.classList.add('was-validated');

    if (form.checkValidity() && flag) {
        form.classList.remove('was-validated');
        return true;
    }
}

// 定义一个函数来处理表单提交
function onSubmit(e, data) {
    e.preventDefault();
    console.log(data); // 打印出表单数据
    // 根据不同的步骤，做不同的操作
    switch (data.step) {
        case 1:
            // 发送验证码到邮箱
            return new Promise((resolve, reject) => {
                resolve(true);
            })
        case 2:
            // 验证验证码是否正确
            console.log('验证' + data.code + '验证码是否正确');
            return new Promise((resolve, reject) => {
                resolve(true);
            });
        case 3:
            // 设置新密码
            console.log('设置新密码');
            return new Promise((resolve, reject) => {
                resolve(true);
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
                <div className="valid-feedback">
                    Looks good!
                </div>
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
            onClick={(e) => {
                let data = {
                    step: 1,
                    email: document.querySelector('#validationCustom01').value
                }
                onSubmit(e, data).then((result) => {
                    if (check(e, result)) {
                        handleData(data);
                        handleStep();
                    }
                })
            }}> 下一步</button >)
    } else if (step === 2) {
        button = (<button type='click' className={`btn btn-lg btn-primary ${styles.nextButton}`}
            onClick={(e) => {
                let dat = {
                    step: 2,
                    email: data.email,
                    code: document.querySelector('#validationCustom01').value
                }
                onSubmit(e, dat).then((result) => {
                    if (check(e, result))
                        handleStep()
                })
            }}>完成验证</button>)
    } else if (step === 3) {
        button = (<button type='click' className={`btn btn-lg btn-primary ${styles.nextButton}`}
            onClick={(e) => {
                let dat = {
                    step: 3,
                    newPwd: document.querySelector('#validationCustom01').value,
                    checkPwd: document.querySelector('#validationCustom02').value
                }
                onSubmit(e, dat).then((result) => {
                    if (check(e, result)) {
                        //跳转至登录页
                        navigate('/Login', {
                            state: {
                                email: data.email
                            }
                        })
                    }
                })
            }}>确认密码</button>)
    }

    return (
        (step === 1 && <Step1 button={button} />) ||
        (step === 2 && <Step2 button={button} data={data} />) ||
        (step === 3 && <Step3 button={button} />)
    )
}

export default Forget;
