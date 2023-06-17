import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/App.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Forget from './js/Forget';
import Signup from './js/Signup';
import Login from './js/Login'
import Main from './js/Main'
import SubjectDetailedInfo from './js/SubjectDetailedInfo';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBFileUpload } from 'mdbreact';

import IndividualSubjectCheck from './js/IndividualSubjectCheck';
import SubmitHomework from './js/SubmitHomework';

import Connect from './js/Connect'


ReactDOM.createRoot(document.getElementById("root")).render((
  <BrowserRouter>
    <Routes>
      <Route index element={<Navigate to={'/Login'} replace={true} />} />
      <Route path='/Login' element={<Login />} />
      <Route path="/Forget" element={<Forget />} />
      <Route path='/Signup' element={<Signup />} />
      <Route path='/Main' element={<Main />} />
      <Route path='/SubjectInfo' element={<SubjectDetailedInfo info={{ subjectName: "" }} />} />
      <Route path='/IndividualSubjectCheck' element={<IndividualSubjectCheck data={{ subjectName: "" }} />} />
      <Route path='/summithomework' element={<SubmitHomework />} />
    </Routes>
  </BrowserRouter >
));

reportWebVitals();
