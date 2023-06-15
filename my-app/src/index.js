import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/App.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Link, useParams, Outlet } from 'react-router-dom';
import Forget from './js/Forget';
import Signup from './js/Signup';
import Login from './js/Login'
import Main from './js/Main'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import Connect from './js/Connect'


ReactDOM.createRoot(document.getElementById("root")).render((
  <BrowserRouter>
    <Routes>

      {/* <Route index element={<Page />} /> */}
      <Route path='/Login' element={<Login />} />
      <Route path="/Forget" element={<Forget />} />
      <Route path='/Signup' element={<Signup />} />
      <Route path='/Main' element={<Main />} />
    </Routes>
  </BrowserRouter >
));


// import Test from './js/Test'
// //Test
// ReactDOM.createRoot(document.getElementById("root")).render((
//   <BrowserRouter>
//     <Routes>
//       <Route path="/Test" element={<Test />} />
//     </Routes>
//   </BrowserRouter >
// ));



reportWebVitals();
