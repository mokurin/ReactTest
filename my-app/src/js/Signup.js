import React from 'react';
import signup from '../css/Signup.module.css'
import icon_student from '../img/ic_student.svg'
import icon_teacher from '../img/ic_teacher.svg'
import { Link } from 'react-router-dom';
import { Send } from './Connect'

// 定义一个函数来检查表单的有效性
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

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: '',//邮箱
                identity: 'student',//身份
                pwd: '',//密码
                checkpwd: '',//确认密码
                name: '',//姓名
                institution: '',//机构
                id: ''//学号
            }
        }
    }

    updataState = () => {
        const email = document.querySelector('#email').value;
        const pwd = document.querySelector('#pwd').value;
        const checkpwd = document.querySelector('#checkpwd').value;
        const name = document.querySelector('#name').value;
        const institution = document.querySelector('#institution').value;
        const ID = document.querySelector('#id').value;
        const code = document.querySelector('#code').value;

        let identity = '';
        const teacher_bt = document.querySelector('#teacher-bt');
        const student_bt = document.querySelector('#student-bt');
        if (teacher_bt.classList.contains('btn-primary'))
            identity = 'teacher';
        else if (student_bt.classList.contains('btn-primary'))
            identity = 'student';

        this.setState({
            data: {
                email: email,//邮箱
                identity: identity,//身份
                pwd: pwd,//密码
                checkpwd: checkpwd,//确认密码
                name: name,//姓名
                institution: institution,//机构
                id: ID,//学号
                vercode: code//填入的验证码
            }
        })
        document.querySelector('#checkpwd').setAttribute('pattern', '^' + pwd + '$')
    }

    //选择身份
    handleSelect = (e) => {
        const teacher_bt = document.querySelector('#teacher-bt');
        const student_bt = document.querySelector('#student-bt');
        if (e.target.id === teacher_bt.id || e.target.parentNode.id === teacher_bt.id) {
            //选择老师
            document.querySelector('#id').setAttribute('placeholder', '请输入工号');
            teacher_bt.classList.remove('btn-outline-primary');
            teacher_bt.classList.add('btn-primary');
            student_bt.classList.remove('btn-primary');
            student_bt.classList.add('btn-outline-primary');
            this.updataState();
        } else if (e.target.id === student_bt.id || e.target.parentNode.id === student_bt.id) {
            //选择学生
            document.querySelector('#id').setAttribute('placeholder', '请输入学号');
            student_bt.classList.remove('btn-outline-primary');
            student_bt.classList.add('btn-primary');
            teacher_bt.classList.remove('btn-primary');
            teacher_bt.classList.add('btn-outline-primary');
            this.updataState();
        }
    };

    //注册
    handleSignup = () => {
        new Promise((resolve, reject) => {
            this.updataState();
            resolve();
        }).then(() => {
            //向服务器发送请求
            const msg = {
                api: 'signup',
                email: this.state.email,//邮箱
                identity: this.state.identity,//身份
                passwd: this.state.pwd,//密码
                name: this.state.name,//姓名
                school: this.state.institution,//机构
                id: this.state.ID,//学号/工号
                vercode: this.state.code//填入的验证码
            }
            Send(msg, (msg) => {
                if (msg.status) {
                    alert('注册成功');
                    window.open('/Login');
                } else {
                    alert(msg.err_code);
                }
            })
        })
    }

    validateEmail(e) {
        if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(e.target.value)) {
            console.log('ok');
            e.target.setCustomValidity("邮箱格式不正确");
        } else {
            //没有错误。清除任何错误消息
            e.target.setCustomValidity("");
        }
    }

    render() {
        return (
            <form className={`${signup.Form}`} id='needs-validation'>
                <div className={`${signup.header} mt-1`}>注册账号</div>
                <input
                    onInput={this.validateEmail}
                    onKeyUp={this.updataState} id='email' type="email"
                    className="form-control mb-3" placeholder="请输入邮箱" required />
                <input onKeyUp={this.updataState} id='pwd' type="password"
                    className="form-control mb-3" placeholder="密码" required />
                <input
                    id='checkpwd'
                    type="password"
                    className="form-control mb-3"
                    placeholder="请再次输入密码确认"
                    required
                />
                <div>
                    <div className={signup.buttonsHeader}>
                        <b>选择身份</b>
                    </div>
                    <div className={signup.idBtn} required>
                        <div onClick={this.handleSelect} id='teacher-bt'
                            className={`btn btn-outline-primary btn-lg ${signup.idCtrl}`} >
                            <img src={icon_teacher} alt="" />
                            老师
                        </div>
                        <div onClick={this.handleSelect} id='student-bt'
                            className={`btn btn-primary btn-lg ${signup.idCtrl}`} >
                            <img src={icon_student} alt="" />
                            学生
                        </div>
                    </div>
                </div>
                <input onKeyUp={this.updataState} id='name' type="text" className="form-control mb-3" placeholder="请输入姓名" required />
                <input
                    onKeyUp={this.updataState}
                    id='institution'
                    type="text"
                    className="form-control mb-3"
                    placeholder="请输入学校/机构"
                    required
                />
                <input onKeyUp={this.updataState} id='id' type="text" className="form-control mb-3" placeholder="请输入学号" required />
                <GetCode email={this.state.data.email} />
                <button onClick={(e) => {
                    check(e);
                }} className={`btn btn-primary ${signup.signup}`}>注册</button>
                <p className={`mt-4 ${signup.otherCtrl}`}>已有账号？<Link to={'/Login'}><span className={signup.toLogin} >去登录</span></Link></p>
            </form>

        );
    }
}


class GetCode extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            email: props.email,
            lastTime: 0,
            time: 0
        })
    }

    tick() {
        this.setState((prevState) => ({
            lastTime: prevState.lastTime > 0 ? prevState.lastTime - 1 : 0
        }));
    }

    handleClick = () => {
        let tip = document.querySelector('#tip');
        if (this.state.lastTime === 0 && /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.props.email)) {
            this.setState((prevState) => ({
                lastTime: 30,
                time: prevState.time + 1
            }));
            this.timerID = setInterval(
                () => this.tick(),
                1000
            );
            //向服务器请求验证码
            tip.classList.add(`${signup.displayNone}`)
        } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.props.email)) {
            tip.classList.remove(`${signup.displayNone}`)
        } else {
            tip.classList.add(`${signup.displayNone}`)
        }
    }

    render() {
        let content = '';
        if (this.state.lastTime === 0 && this.state.time === 0) {
            clearInterval(this.timerID);
            content = '发送验证码';
        } else if (this.state.lastTime !== 0) {
            content = '已发送 ' + this.state.lastTime + 's';
        } else if (this.state.time !== 0) {
            clearInterval(this.timerID);
            content = '重新发送';
        }

        return (
            <div>
                <div className={signup.codeCtrl}>
                    <input
                        id='code'
                        type="text"
                        className={`form-control mb-3 ${signup.verCode}`}
                        placeholder="请输入验证码"
                        required
                    />
                    <div onClick={this.handleClick} className={`btn btn-outline-primary ${signup.sendCode}`}>{content}</div>
                </div>
                <span id='tip' className={`${signup.tip} ${signup.displayNone}`}>未输入邮箱或邮箱格式不正确</span>
            </div>
        );
    }
}