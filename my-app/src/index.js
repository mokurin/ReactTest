//工具模块
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

//样式
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'

//组件
import Forget from './js/Forget'; //忘记密码
import Signup from './js/Signup'; //注册
import Login from './js/Login'; //登录
import Main from './js/Main'; //主页
import SubjectDetailedInfo from './js/SubjectDetailedInfo'; //课程详情页
import IndividualSubjectCheck from './js/IndividualSubjectCheck'; //课程成员页
import SubmitHomework from './js/SubmitHomework'; //学生提交作业
import HomeworkRating from './js/HomeworkRating';
import Test from './js/Test'

//服务器连接模块
import Connect from './js/Connect'


ReactDOM.createRoot(document.getElementById("root")).render((
  <BrowserRouter>
    <Routes>
      {/* <Route index element={<Navigate to={'/Login'} replace={true} />} /> */}
      <Route path='/Login' element={<Login />} />
      <Route path="/Forget" element={<Forget />} />
      <Route path='/Signup' element={<Signup />} />
      {/* 主页 */}
      <Route path='/Main' element={<Main />} />
      {/* 课程详情页 */}
      <Route path='/SubjectInfo' element={<SubjectDetailedInfo />} />
      {/* 作业批改详情页 */}
      <Route path='/HomeworkRating' element={<HomeworkRating />} />
      <Route path='/IndividualSubjectCheck' element={<IndividualSubjectCheck />} />
      <Route path='/SummitHomework' element={<SubmitHomework />} />
      <Route index element={<Navigate to={'/Test'} replace={true} />} />
      <Route path='/Test' element={<Test />} />
    </Routes>
  </BrowserRouter >
));

// ReactDOM.createRoot(document.getElementById("root")).render((
//   <BrowserRouter>
//     <Routes>
//       <Route index element={<Navigate to={'/Test'} replace={true} />} />
//       <Route path='/Test' element={<Test />} />
//     </Routes>
//   </BrowserRouter >
// ));

reportWebVitals();
