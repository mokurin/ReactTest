import React, { useState } from 'react';
import styles from '../css/Login.module.css'
import { Link } from 'react-router-dom';
import { Send } from './Connect'
import bootstrap from 'bootstrap/dist/js/bootstrap';


window.onload = () => {
    const user_Account = JSON.parse(localStorage.getItem('user_Account'));
    if (user_Account !== undefined && user_Account !== null)
        if (user_Account.isAutoLogin) {
            //跳转主页
            loadHomePage(user_Account.user_data);
        } else {
            //自动填充账号密码
            document.querySelector('#email').value = user_Account.email;
            document.querySelector('#pwd').value = user_Account.passwd;
        }
}

const loadHomePage = (user_data) => {

}

export default function Login(props) {
    const [data, setDate] = useState({});
    const [msg, setMsg] = useState('');
    const [isAutoLogin, setIsAutoLogin] = useState(false);

    //登录函数
    const login = (e) => {
        e.preventDefault();
        const msg = {
            api: 'login',
            email: data.email,
            passwd: data.pwd
        }
        Send(msg, (msg) => {
            if (msg.status) {//登录成功
                //保存账户
                const user_Account = {
                    email: data.email,
                    passwd: data.passwd,
                    isAutoLogin: isAutoLogin,
                    data: msg.data
                }
                localStorage.setItem('user_Account', JSON.stringify(user_Account));
                //跳转主页
                loadHomePage(msg.user_data)
            } else {//登录失败
                new Promise((resolve, reject) => {
                    setMsg(msg.err_code);
                    resolve()
                }).then(() => {
                    const modal = new bootstrap.Modal('#exampleModal');
                    modal.show()
                })
            }
        })
    }

    const handleInput = () => {
        const email = document.querySelector('#email').value;
        const pwd = document.querySelector('#pwd').value;
        let data = {
            email: email,
            pwd: pwd
        }
        setDate(data);
    }

    const handleAutoLogin = () => {
        const isAutoLogin = document.querySelector('#flexCheckDefault').checked;
        setIsAutoLogin(isAutoLogin);
    }

    return (
        <>
            <form className={styles.Form} id='needs-validation'>
                <div className={`${styles.header} mt-1`}>账号登录</div>
                <input
                    onInput={handleInput}
                    id='email'
                    type="email"
                    className="form-control mb-3"
                    placeholder="请输入邮箱"
                    required
                />
                <input
                    onInput={handleInput}
                    id='pwd'
                    type="password"
                    className="form-control mb-3"
                    placeholder="请输入密码"
                    required
                />
                <div className={styles.LoginCtrl}>
                    <div className="form-check">
                        <input
                            onInput={handleAutoLogin}
                            className="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            id="flexCheckDefault"
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            下次自动登录
                        </label>
                    </div>
                    <div className={styles.forgetPwd}><Link to={'/Forget'}>忘记密码？</Link></div>
                </div>
                <button
                    onClick={(e) => {
                        if (check(e))
                            login(e);
                    }}
                    className={`btn btn-lg btn-primary ${styles.login}`}
                >登录</button>
                <p className="mt-4 otherCtrl">
                    还没有账号？<Link to={'/Signup'}><span className={styles.toSignup}>去注册</span></Link>
                </p>
            </form>
            <Modal title={'登录失败'} msg={msg} />
        </>
    );
}

//弹窗模态
function Modal(props) {
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{props.title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props.msg}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


//检查数据
function check(e) {
    e.preventDefault();
    const form = document.querySelector('#needs-validation');
    if (!form.checkValidity()) {
        e.stopPropagation()
    }
    form.classList.add('was-validated');

    if (form.checkValidity()) {
        form.classList.remove('was-validated');
        return true;
    }
}