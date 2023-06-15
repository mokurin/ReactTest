import React from 'react';
import styles from '../css/Forget.module.css'
import { Link } from 'react-router-dom';

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
                setTimeout(() => {
                    // 执行成功
                    resolve(true)
                }, 200)
            })
        case 2:
            // 验证验证码是否正确
            console.log('验证' + data.code + '验证码是否正确');
            // return true;s
            break;
        case 3:
            // 设置新密码
            console.log('设置新密码');
            // return true;
            break;
        default:
        // return false;
    }
};

// 定义组件
const Step1 = (props) => {
    const validateEmail = e => {
        if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(e.target.value)) {
            console.log('ok');
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
    console.log(props);
    return (
        <form className={`${styles.Form} shadow-lg row`} id='needs-validation' >
            <div className={`${styles.header} mt-1`}>安全验证</div>
            <div className={styles.codeAddress}>动态验证码已经发送至 {props.data.email}</div>
            <div className="col-md-4">
                <label htmlFor="validationCustom01" className="form-label">请输入验证码</label>
                <input type="text" className="form-control" id="validationCustom01" required />
                <div className="valid-feedback">
                    验证码正确
                </div>
                <div className="invalid-feedback">
                    验证码有误
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
    return (
        <form className={`${styles.Form} shadow-lg row`} id='needs-validation'>
            <div className={`${styles.header} mt-1`}>设置新密码</div>
            <div className="col-md-4">
                <label htmlFor="validationCustom01" className="form-label">请输入密码</label>
                <input type="password" className="form-control" id="validationCustom01" required />
                <div className="valid-feedback">
                    密码有效
                </div>
                <div className="invalid-feedback">
                    密码无效
                </div>
            </div>
            <div className="col-md-4">
                <label htmlFor="validationCustom02" className="form-label">请再次输入密码确认</label>
                <input type="password" className="form-control" id="validationCustom02" required />
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

class Forget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 1
        }
        this.handleData.bind(this)
        this.handleClick.bind(this)
    }

    handleClick = () => {
        this.setState(prevState => ({
            step: prevState.step + 1
        }));
    }

    handleData = (data) => {
        this.setState({ data });
        console.log(this.state);
    }

    render() {
        let button;
        if (this.state.step === 1) {
            button = (<button type='click' className={`btn btn-lg btn-primary ${styles.nextButton}`}
                onClick={(e) => {
                    let data = {
                        step: 1,
                        email: document.querySelector('#validationCustom01').value
                    }
                    onSubmit(e, data).then((result) => {
                        if (check(e, result)) {
                            this.handleData(data);
                            this.handleClick();
                        }
                    })
                }}> 下一步</button >)
        } else if (this.state.step === 2) {
            button = (<button type='click' className={`btn btn-lg btn-primary ${styles.nextButton}`}
                onClick={(e) => {
                    let data = {
                        step: 2,
                        code: document.querySelector('#validationCustom01').value
                    }
                    if (check(e, data))
                        this.handleClick()
                }}>完成验证</button>)
        } else if (this.state.step === 3) {
            button = (<button type='click' className={`btn btn-lg btn-primary ${styles.nextButton}`}
                onClick={(e) => {
                    let data = {
                        step: 3,
                        newPwd: document.querySelector('#validationCustom01').value,
                        checkPwd: document.querySelector('#validationCustom03').value
                    }
                    if (check(e, data))
                        this.handleClick()
                }}>完成验证</button>)
        }

        return (
            (this.state.step === 1 && <Step1 button={button} />) ||
            (this.state.step === 2 && <Step2 button={button} data={this.state.data} />) ||
            (this.state.step === 3 && <Step3 button={button} />)
        )
    }
}

export default Forget;
