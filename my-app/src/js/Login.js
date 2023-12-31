import React, { useState, useEffect } from 'react';
import styles from '../css/Login.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Send, afterOpen } from './Connect'
import bootstrap from 'bootstrap/dist/js/bootstrap';


export default function Login(props) {
    const [data, setDate] = useState({
        email: '',
        pwd: ''
    });
    const [msg, setMsg] = useState('');
    const [isAutoLogin, setIsAutoLogin] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const s = location.state;
    // localStorage.clear('user_Account');
    const user_Account = JSON.parse(localStorage.getItem('user_Account'));

    //加载内容
    useEffect(() => {
        console.log(user_Account);
        if (s === null) {
            if (user_Account !== undefined && user_Account !== null)
                if (user_Account.isAutoLogin) {
                    afterOpen(() => {
                        //自动登录
                        login(user_Account.email, user_Account.passwd);
                        //跳转主页
                        navigate('/Main');
                    })
                } else {
                    //自动填充账号密码
                    setDate({
                        email: user_Account.email,
                        pwd: user_Account.passwd
                    })
                }
        } else//填充账号
            if (s.email !== null && s.email !== undefined)
                setDate({
                    email: s.email,
                    pwd: ''
                })
    }, [])


    //登录函数
    const login = (email, pwd) => {
        const msg = {
            api: 'login',
            email: (email === undefined || email === null) ? data.email : email,
            passwd: (pwd === undefined || pwd === null) ? data.pwd : pwd
        }
        Send(msg, (msg) => {
            if (msg.status) {//登录成功
                //保存账户
                const user_Account = {
                    email: data.email,
                    passwd: data.pwd,
                    isAutoLogin: isAutoLogin,
                    data: msg.userdata
                }
                console.log(msg.userdata);
                localStorage.setItem('user_Account', JSON.stringify(user_Account));
                //跳转主页
                navigate('/Main', { state: user_Account.data });
            } else {//登录失败
                new Promise((resolve, reject) => {
                    setMsg(msg.errcode);
                    resolve();
                }).then(() => {
                    const modal = new bootstrap.Modal('#exampleModal');
                    modal.show();
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
                    onChange={handleInput}
                    value={data.email}
                    id='email'
                    type="email"
                    className="form-control mb-3"
                    placeholder="请输入邮箱"
                    required
                />
                <input
                    onChange={handleInput}
                    value={data.pwd}
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
                        if (check(e)) {
                            e.preventDefault();
                            login();
                        }
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