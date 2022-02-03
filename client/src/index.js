import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; 

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/auth/login' element={<Login />} />
      <Route path='/auth/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
